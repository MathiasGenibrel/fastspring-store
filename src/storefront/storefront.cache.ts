import { WxtStorage } from "wxt/storage";

interface Cache {
  hostname: string;
  dataset: DOMStringMap;
}

export class StorefrontCache {
  constructor(private cache: WxtStorage) {}

  public async get(hostname: string): Promise<Cache | null> {
    return (await this.cache.getItem(`local:${hostname}`)) as any as Cache;
  }

  public async set(hostname: string, cache: Cache) {
    await this.cache.setItem(`local:${hostname}`, {
      hostname,
      dataset: { ...cache.dataset },
    });
  }
}
