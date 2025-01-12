
export class Queue<T> {
  private readonly _queue: Array<T>;

  public constructor(queue: Array<T> = new Array<T>()) {
    this._queue = queue;
  }

  public enqueue(item: T): void {
    this._queue.push(item);
  }

  public dequeue(): T | undefined {
    return this._queue.shift();
  }

  public peek(): T | undefined {
    return this._queue[0];
  }

  public isEmpty(): boolean {
    return this._queue.length === 0;
  }

  public size(): number {
    return this._queue.length;
  }
}
