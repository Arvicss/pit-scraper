import type { GrandPrix } from "@/app/pitScraper/classes/grandPrix";

export class Championship {
  private readonly _year: number;
  private readonly _grandPrixes: GrandPrix[];

  public constructor(year: number, grandPrixes: GrandPrix[]) {
    this._year = year;
    this._grandPrixes = grandPrixes;
  }

  public get year(): number {
    return this._year;
  }

  public get grandPrixes(): GrandPrix[] {
    return this._grandPrixes;
  }
}