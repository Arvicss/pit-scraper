import { Queue } from "@/app/lib/queue";
import axios, { type AxiosInstance } from "axios";

export class HTMLService {
  private _queue: Queue<() => void>;
  private _activeCount = 0;
  private _axiosInstance: AxiosInstance;
  private static _instance: HTMLService;
  private readonly _LIMIT  = 50;
  private readonly _REQUEST_TIMEOUT_MS = 15000;

  private constructor() {
    this._queue = new Queue<() => void>();
    this._axiosInstance = axios.create({
      timeout: this._REQUEST_TIMEOUT_MS
    });
  }

  public static getInstance(): HTMLService {
    if (!HTMLService._instance) {
      HTMLService._instance = new HTMLService();
    }

    return HTMLService._instance;
  }

  public async getHTML(url: string): Promise<string> {
    if (this._activeCount >= this._LIMIT) {
      await new Promise<void>((resolve) => {
        this._queue.enqueue(resolve);
      });
    }
    this._activeCount++;

    try {
      const response = await this._axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch: ${url}\nMessage: ${(error as Error).message}`);
    } finally {
      this._activeCount--;

      if (this._queue.size() > 0) {
        const nextTask = this._queue.dequeue();
        if (nextTask) nextTask();
      }
    }
  }
}
