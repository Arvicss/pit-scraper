import { HTMLService } from "@/app/lib/HTMLService";
import { DateConverter, type EventDate } from "@/app/lib/dateConverter";
import { Championship } from "@/app/pitScraper/classes/championship";
import { GrandPrix } from "@/app/pitScraper/classes/grandPrix";
import { Session } from "@/app/pitScraper/classes/session";
import { type GrandPrixPageLink, ResultLinkService } from "@/app/pitScraper/service/resultLinkService";
import { load } from "cheerio";
import lodash from "lodash";

export class PitScraper {
  private readonly _htmlService: HTMLService;
  private readonly _resultLinkService: ResultLinkService;
  private readonly _GRAND_PRIX_EVENT_DETAILS_SELECTOR = ".f1-container .f1-text.f1-text__micro";
  private readonly _GRAND_PRIX_EVENT_NAME_SELECTOR = "h1";
  private readonly _SESSION_RESULT_HEADER_SELECTOR = "table thead tr th p";
  private readonly _SESSION_RESULT_ROW_SELECTOR = "table tbody tr";
  private readonly _SESSION_RESULT_ROW_CELL_SELECTOR = "td p";
  private readonly _LATEST_CHAMPIONSHIP_YEAR_SELECTOR = ".f1-menu-wrapper li a";

  public constructor(resultLinkService: ResultLinkService = new ResultLinkService(), htmlService = HTMLService.getInstance()) {
    this._resultLinkService = resultLinkService;
    this._htmlService = htmlService;
  }

  public async getChampionshipResultByYear(year: number): Promise<Championship | null> {
    const championshipResultPageLink = await this._resultLinkService.getChampionshipResultsLinks(year);
    if (!championshipResultPageLink) {
      return null;
    }
    const grandPrixesResult = await Promise.all(championshipResultPageLink.grandPrixLinks.map((grandPrix) => {
      return this._getGrandPrixResult(grandPrix);
    }));

    return new Championship(year, grandPrixesResult);
  };

  public async getLatestChampionshipYear(): Promise<number> {
    const html = await this._htmlService.getHTML("https://www.formula1.com/en/results");
    const $ = load(html);
    const latestYearString = $(this._LATEST_CHAMPIONSHIP_YEAR_SELECTOR).first().text();
    if (!latestYearString) {
      throw new Error("Failed to get Latest Championship Year");
    }

    return Number(latestYearString);
  }

  /**
   * GrandPrix
   * */

  private async _getGrandPrixResult(grandPrixPageLink: GrandPrixPageLink): Promise<GrandPrix> {
    const html = await this._htmlService.getHTML(grandPrixPageLink.baseGrandPrixLink);
    const circuitName = this._scrapeCircuit(html);
    const eventName = this._scrapeEventName(html);
    const eventDate = this._scrapeEventDate(html);
    const grandPrixSessionResults = await Promise.all(grandPrixPageLink.sessions.map((session) => {
      return this._getSessionResult(session.link);
    }));

    return new GrandPrix({
      name: grandPrixPageLink.grandPrixName,
      eventName: eventName,
      eventDate: eventDate,
      circuitName: circuitName,
      sessions: grandPrixSessionResults
    });
  }

  private _scrapeEventDate(html: string): EventDate | null{
    const $ = load(html);
    const eventDate = $(this._GRAND_PRIX_EVENT_DETAILS_SELECTOR).first().text();
    if (!eventDate) {
      return null;
    }

    return DateConverter.convertEventDate(eventDate);
  }

  private _scrapeCircuit(html: string): string {
    const $ = load(html);
    const circuitName = $(this._GRAND_PRIX_EVENT_DETAILS_SELECTOR).first().next().text();
    if (!circuitName) {
      return "";
    }

    return circuitName;
  }

  private _scrapeEventName(html: string): string {
    const $ = load(html);
    const pageTitle = $(this._GRAND_PRIX_EVENT_NAME_SELECTOR).text();
    if (!pageTitle) {
      return "";
    }

    return pageTitle.split(" - ")[0];
  }

  /**
   * Session
   * */

  private async _getSessionResult(grandPrixSessionPageLink: string): Promise<Session> {
    const html = await this._htmlService.getHTML(grandPrixSessionPageLink);
    const sessionName = this._scrapeSessionName(html);
    const sessionResult = this._scrapeSessionResult(html);

    return new Session(sessionName, sessionResult);
  }

  private _scrapeSessionName(html: string): string {
    const $ = load(html);
    const pageTitle = $(this._GRAND_PRIX_EVENT_NAME_SELECTOR).text();
    if (!pageTitle) {
      return "";
    }

    return pageTitle.split(" - ")[1] ?? "";
  }

  private _scrapeSessionResult(html: string): Record<string, string>[] {
    const $ = load(html);
    const keys: string[] = [];
    const sessionResult: Record<string, string>[] = [];

    $(this._SESSION_RESULT_HEADER_SELECTOR).each((_index, header) => {
      const element = $(header);
      const textContent = lodash.camelCase(element.text());

      keys.push(textContent);
    });

    $(this._SESSION_RESULT_ROW_SELECTOR).each((_, element) => {
      const resultData: Record<string, string> = {};
      $(element).find(this._SESSION_RESULT_ROW_CELL_SELECTOR).each((cellIndex, cell) => {
        const key = keys[cellIndex];
        const cellContent = $(cell).text().toString();
        resultData[key] = key.toLowerCase() === "driver" ? cellContent.replaceAll(/\u00A0/g, ' ').slice(0, -3) : cellContent;
      });

      sessionResult.push(resultData);
    });

    return sessionResult;
  }
}
