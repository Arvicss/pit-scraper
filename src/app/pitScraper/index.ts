import type { IChampionship } from "@/app";
import { PitScraper } from "@/app/pitScraper/pitScraper";

const pitScraper = new PitScraper();

export const getChampionshipByYear = async (year: number): Promise<IChampionship | null> => {
  return pitScraper.getChampionshipResultByYear(year);
}

export const getLatestChampionshipYear = async (): Promise<number> => {
  return pitScraper.getLatestChampionshipYear();
}
