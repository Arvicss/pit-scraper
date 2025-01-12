import { ResultLinkService } from "@/app/pitScraper/service/resultLinkService";

describe('ResultLinkService', () => {
  let resultLinkService: ResultLinkService;

  beforeAll(() => {
    resultLinkService = new ResultLinkService();
  })

  it('should return all grand prix and their session links for the given year', async () => {
    const championshipYear = 1950;
    const resultLinks = await resultLinkService.getChampionshipResultsLinks(championshipYear);

    expect(resultLinks).not.toBeNull();
    expect(resultLinks!.championshipYear).toBe(championshipYear);
    expect(resultLinks!.grandPrixLinks.length).toBeGreaterThanOrEqual(7);

    for (const grandPrix of resultLinks!.grandPrixLinks) {
      grandPrix.baseGrandPrixLink

      expect(grandPrix.grandPrixName).toBeTruthy();
      expect(grandPrix.baseGrandPrixLink).toBeTruthy();
      expect(grandPrix.sessions.length).toBeGreaterThan(0);

      for (const session of grandPrix.sessions) {
        expect(session.link).toBeTruthy();
        expect(session.sessionName).toBeTruthy();
      }
    }
  });

  it('should return null when given invalid year', async () => {
    const championshipYear = 1949;
    const resultLinks = await resultLinkService.getChampionshipResultsLinks(championshipYear);

    expect(resultLinks).toBeNull();
  });
});
