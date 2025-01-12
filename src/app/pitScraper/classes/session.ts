export class Session {
  private readonly _sessionName: string;
  private readonly _result: Record<string, string>[];

  constructor(sessionName: string, result: Record<string, string>[]) {
    this._sessionName = sessionName;
    this._result = result;
  }

  get sessionName(): string {
    return this._sessionName;
  }

  get result(): Record<string, string>[] {
    return this._result;
  }
}