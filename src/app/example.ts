import { PitScraper } from "@/app/pitScraper/pitScraper";

(async () => {
  const pitScraper = new PitScraper();
  console.time("Time-taken");
  const latestYear = await pitScraper.getLatestChampionshipYear();
  console.log(`Latest Year: ${latestYear}`);
  console.timeEnd("Time-taken");

  console.time("Time-taken");
  const championshipResult = await pitScraper.getChampionshipResultByYear(2019);
  console.log(`\n${championshipResult!.year} Championship`);
  console.log(`Total GrandPrix: ${championshipResult!.grandPrixes.length}`);
  console.timeEnd("Time-taken");

  console.log("\nRace Winners: ")
  const result: { grandPrix: string, winner: string }[] = [];
  for (const grandPrix of championshipResult!.grandPrixes) {
    const raceSession = grandPrix.sessions.filter((session) => session.sessionName === "RACE RESULT");
    result.push({
      grandPrix: grandPrix.name,
      winner: raceSession[0]?.result[0]['driver']
    })
  }
  console.table(result);
})();