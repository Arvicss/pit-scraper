import { Queue } from "@/app/lib/queue";

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it("should initialize an empty queue", () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  it("should enqueue items into the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.isEmpty()).toBe(false);
    expect(queue.size()).toBe(2);
  });

  it("should dequeue items from the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    const dequeuedItem = queue.dequeue();

    expect(dequeuedItem).toBe(1);
    expect(queue.size()).toBe(1);
    expect(queue.isEmpty()).toBe(false);
  });

  it("should return undefined when dequeue is called on an empty queue", () => {
    const dequeuedItem = queue.dequeue();

    expect(dequeuedItem).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  it("should peek the first item without removing it", () => {
    queue.enqueue(1);
    queue.enqueue(2);

    const peekedItem = queue.peek();

    expect(peekedItem).toBe(1);
    expect(queue.size()).toBe(2);
  });

  it("should return undefined when peek is called on an empty queue", () => {
    const peekedItem = queue.peek();

    expect(peekedItem).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  it("should correctly report size after multiple enqueue and dequeue operations", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    queue.enqueue(3);

    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(2);
  });

  it("should work with a prefilled queue", () => {
    const prefilledQueue = new Queue<number>([1, 2, 3]);

    expect(prefilledQueue.size()).toBe(3);
    expect(prefilledQueue.peek()).toBe(1);

    const dequeuedItem = prefilledQueue.dequeue();
    expect(dequeuedItem).toBe(1);
    expect(prefilledQueue.size()).toBe(2);
  });

  it("should handle generic types", () => {
    const stringQueue = new Queue<string>();
    stringQueue.enqueue("a");
    stringQueue.enqueue("b");

    expect(stringQueue.size()).toBe(2);
    expect(stringQueue.peek()).toBe("a");

    const dequeuedItem = stringQueue.dequeue();
    expect(dequeuedItem).toBe("a");
    expect(stringQueue.peek()).toBe("b");
  });
});
