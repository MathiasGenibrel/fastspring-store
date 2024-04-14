import {
  StorageService,
  StorageWatchCallback,
} from "@/src/services/storage/storage.service.ts";
import { Unwatch, WxtStorage } from "wxt/storage";
import { MESSAGE_SCHEMA } from "@/src/services/message/message.schema.ts";

class ActiveTabNotFoundError extends Error {
  constructor() {
    super("Active tab not found");
  }
}

class ActiveTabWithoutUrlError extends Error {
  constructor() {
    super("Active tab without url");
  }
}

export class SessionStorageService implements StorageService {
  constructor(private readonly storageService: WxtStorage) {}

  public async get<T extends Record<string, any>>(
    key: string,
  ): Promise<T | null> {
    const hostname = await this.getHostname();

    return await this.storageService.getItem(`session:${key}-${hostname}`);
  }

  public async save(key: string, value: Record<string, any>): Promise<void> {
    const hostname = await this.getHostname();

    return this.storageService.setItem(`session:${key}-${hostname}`, value);
  }

  public watch(key: string, callback: StorageWatchCallback): Unwatch {
    return this.storageService.watch(`session:${key}`, (value) => {
      const validateMessage = MESSAGE_SCHEMA.parse(value);
      callback(validateMessage);
    });
  }

  public async remove(key: string): Promise<void> {
    return this.storageService.removeItem(`session:${key}`);
  }

  private async getHostname(): Promise<string> {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!activeTab) throw new ActiveTabNotFoundError();
    if (!activeTab.url) throw new ActiveTabWithoutUrlError();

    return new URL(activeTab.url).hostname;
  }
}
