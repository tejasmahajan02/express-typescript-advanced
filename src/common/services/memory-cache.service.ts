export class MemoryCacheService {
  private static cache = new Map<string, any>();

  static set(key: string, value: any, ttlInSeconds?: number) {
    this.cache.set(key, value);

    if (ttlInSeconds) {
      setTimeout(() => this.cache.delete(key), ttlInSeconds * 1000);
    }
  }

  static get<T = any>(key: string): T | undefined {
    return this.cache.get(key);
  }

  static delete(key: string) {
    this.cache.delete(key);
  }

  static clear() {
    this.cache.clear();
  }
}
