import { HTMLService } from "@/app/lib/HTMLService";
import { load } from "cheerio";

export interface ChampionshipPageLink {
  championshipYear: number;
  grandPrixLinks: GrandPrixPageLink[];
}

export interface GrandPrixPageLink {
  grandPrixName: string;
  baseGrandPrixLink: string;
  sessions: GrandPrixSessionPageLink[];
}

export interface GrandPrixSessionPageLink {
  sessionName: string;
  link: string;
}

export class ResultLinkService {
  private readonly _BASE_SITE_URL = "https://www.formula1.com";
  private readonly _RESULT_PAGE_URL = `${this._BASE_SITE_URL}/en/results`;
  private readonly _GRAND_PRIX_RESULT_SELECTOR = "tbody tr td p a"
  private readonly _GRAND_PRIX_SESSION_SELECTOR = ".f1-grid div ul li a";
  private readonly _htmlService: HTMLService;

  public constructor(htmlService = HTMLService.getInstance()) {
    this._htmlService = htmlService;
  }

  public async getChampionshipResultsLinks(year: number): Promise<ChampionshipPageLink | null> {
    const championshipYearPage = await this._htmlService.getHTML(`${this._RESULT_PAGE_URL}/${year}/races`);
    if (!championshipYearPage || year < 1950) {
      return null;
    }
    const grandPrixLinks = await this._scrapeChampionshipGrandPrixPageLinks(championshipYearPage, year);

    return {
      championshipYear: year,
      grandPrixLinks: grandPrixLinks,
    }
  }

  private async _scrapeChampionshipGrandPrixPageLinks(html: string, year: number): Promise<GrandPrixPageLink[]> {
    const $ = load(html);
    const races: { name: string, link: string }[] = [];

    $(this._GRAND_PRIX_RESULT_SELECTOR).each((_index, anchorElement) => {
      const element = $(anchorElement);
      const elementHref = element.attr("href");
      const grandPrixName = element.text();

      races.push({
        name: grandPrixName,
        link: `${this._RESULT_PAGE_URL}/${year}/${elementHref}`
      });
    });

    return await Promise.all(races.map(async race => {
      const grandPrixSessions = await this._scrapeGrandPrixSessionsLink(race.link);

      return {
        grandPrixName: race.name,
        baseGrandPrixLink: race.link,
        sessions: grandPrixSessions
      }
    }));
  }

  private async _scrapeGrandPrixSessionsLink(baseGrandPrixResultLink: string): Promise<GrandPrixSessionPageLink[]> {
    const baseGrandPrixPage = await this._htmlService.getHTML(baseGrandPrixResultLink);
    const $ = load(baseGrandPrixPage);
    const result: GrandPrixSessionPageLink[] = [];

    $(this._GRAND_PRIX_SESSION_SELECTOR).each((_index, anchor) => {
      const element = $(anchor);
      const sessionName = element.text().replaceAll(" ", "");
      const resultLink = element.attr("href");

      result.push({
        sessionName: sessionName,
        link: `${this._BASE_SITE_URL}${resultLink}`
      });
    });

    return result;
  }
}
