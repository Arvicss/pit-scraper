import { PitScraper } from "@/app/pitScraper/pitScraper";

describe('PitScraper', () => {
  let pitScraper: PitScraper;

  beforeAll(() => {
    pitScraper = new PitScraper();
  });

  it('should return the latest championship year', async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const validRange: number[] = [currentYear];
    if (currentMonth >= 0 && currentMonth <= 2) {
      validRange.push(currentYear - 1);
    }

    const latestYear = await pitScraper.getLatestChampionshipYear();

    expect(validRange).toContain(latestYear);
  });

  it('should return complete result for year given', async () => {
    const championshipYear = 1950;
    const championshipResult = await pitScraper.getChampionshipResultByYear(championshipYear);

    expect(championshipResult).not.toBeNull();
    expect(championshipResult!.year).toBe(championshipYear);
    expect(championshipResult!.grandPrixes.length).toBeGreaterThanOrEqual(7);

    for (const grandPrix of championshipResult!.grandPrixes) {
      expect(grandPrix.name.length).toBeGreaterThan(0);
      expect(grandPrix.sessions.length).toBeGreaterThan(0);
      expect(grandPrix.eventName.length).toBeGreaterThan(0);
      expect(grandPrix.circuitName.length).toBeGreaterThan(0);
      expect(grandPrix.eventDate).not.toBeNull();
      expect(grandPrix.eventDate!.start).not.toBeNull();
      expect(grandPrix.eventDate!.end).not.toBeNull();

      for (const session of grandPrix.sessions) {
        expect(session.sessionName.length).toBeGreaterThan(0);
        expect(session.result.length).toBeGreaterThan(0);

        for (const result of session.result) {
          expect(result['driver']).toBeDefined();
        }
      }
    }
  });

  it('should return empty grand prix result when given a non existing championship year', async () => {
    const noResultYear = 1949;
    const resultData = await pitScraper.getChampionshipResultByYear(noResultYear);

    expect(resultData).toBeNull();
  });
});
