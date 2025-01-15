import type { ISession } from "@/app";

export class Session implements ISession {
  public readonly name: string;
  public readonly result: Record<string, string>[];

  constructor(sessionName: string, result: Record<string, string>[]) {
    this.name = sessionName;
    this.result = result;
  }
}