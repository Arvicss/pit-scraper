import type { EventDate } from "@/app/lib/dateConverter";
import type { Session } from "@/app/pitScraper/classes/session";

export class GrandPrix {
  private readonly _name: string;
  private readonly _eventName: string;
  private readonly _circuitName: string;
  private readonly _eventDate: EventDate | null;
  private readonly _sessions: Session[];

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
    eventDate: EventDate | null,
    sessions: Session[]
  }) {
    this._name = name;
    this._eventName = eventName;
    this._circuitName = circuitName;
    this._eventDate = eventDate;
    this._sessions = sessions;
  }

  get circuitName(): string {
    return this._circuitName;
  }

  get eventDate(): EventDate | null {
    return this._eventDate;
  }

  get name(): string {
    return this._name;
  }

  get eventName(): string {
    return this._eventName;
  }

  get sessions(): Session[] {
    return this._sessions;
  }
}