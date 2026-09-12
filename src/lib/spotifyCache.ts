/** Per-process TTL cache with request coalescing and bounded memory. */
export class AsyncCache<T> {
  private values = new Map<string, { value: T; expiresAt: number }>();
  private pending = new Map<string, Promise<T>>();
  constructor(private limit = 16) {}
  async get(
    key: string,
    ttlMs: number | ((value: T) => number),
    load: () => Promise<T>,
  ): Promise<T> {
    const hit = this.values.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value;
    const pending = this.pending.get(key);
    if (pending) return pending;
    const work = load()
      .then((value) => {
        this.values.delete(key);
        this.values.set(key, {
          value,
          expiresAt:
            Date.now() + (typeof ttlMs === "function" ? ttlMs(value) : ttlMs),
        });
        while (this.values.size > this.limit)
          this.values.delete(this.values.keys().next().value!);
        return value;
      })
      .finally(() => this.pending.delete(key));
    this.pending.set(key, work);
    return work;
  }
}
