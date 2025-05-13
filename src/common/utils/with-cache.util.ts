import { MemoryCacheService } from "../services/memory-cache.service";

type Fetcher<T> = () => Promise<T> | T;

export async function withCache<T>(
  key: string,
  ttlInSeconds: number,
  fetcher: Fetcher<T>
): Promise<{ data: T; fromCache: boolean }> {
  const cached = MemoryCacheService.get<T>(key);

  if (cached !== undefined) {
    return { data: cached, fromCache: true };
  }

  const data = await fetcher();
  MemoryCacheService.set(key, data, ttlInSeconds);

  return { data, fromCache: false };
}
