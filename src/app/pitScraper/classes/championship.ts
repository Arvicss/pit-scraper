import type { IChampionship, IGrandPrix } from "@/app";

export class Championship implements IChampionship {
  public readonly year: number;
  public readonly grandPrixes: IGrandPrix[];

  public constructor(year: number, grandPrixes: IGrandPrix[]) {
    this.year = year;
    this.grandPrixes = grandPrixes;
  }
}
