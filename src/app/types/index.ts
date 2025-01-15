
export interface IChampionship {
  year: number;
  grandPrixes: IGrandPrix[];
}

export interface IGrandPrix {
  name: string;
  eventName: string;
  circuitName: string;
  eventDate: IEventDate;
  sessions: ISession[];
}

export interface IEventDate {
  start: Date;
  end: Date;
}

export interface ISession {
  name: string;
  result: SessionResult[];
}

export type SessionResult = Record<string, string>;
