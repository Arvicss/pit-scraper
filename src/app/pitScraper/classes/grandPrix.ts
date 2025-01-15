import type { IEventDate, IGrandPrix, ISession } from "@/app/types";

export class GrandPrix implements IGrandPrix {
  public readonly name: string;
  public readonly eventName: string;
  public readonly circuitName: string;
  public readonly eventDate: IEventDate;
  public readonly sessions: ISession[];

  constructor({
    name,
    eventName,
    sessions,
    circuitName,
    eventDate,
  }: {
    name: string,
    eventName: string,
    circuitName: string,
    eventDate: IEventDate,
    sessions: ISession[]
  }) {
    this.name = name;
    this.eventName = eventName;
    this.circuitName = circuitName;
    this.eventDate = eventDate;
    this.sessions = sessions;
  }
}
