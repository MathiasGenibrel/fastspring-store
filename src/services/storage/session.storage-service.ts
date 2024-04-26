import {
  StorageService,
  StorageWatchCallback,
} from "@/src/services/storage/storage.service.ts";
import { Unwatch, WxtStorage } from "wxt/storage";
import { MESSAGE_SCHEMA } from "@/src/services/message/message.schema.ts";
import { Message } from "@/src/services/message/extension-service.type.ts";

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

  public async save(
    key: string,
    value: Record<string, any>,
    currentHostname?: string,
  ): Promise<void> {
    const hostname = currentHostname ?? (await this.getHostname());

    return this.storageService.setItem(`session:${key}-${hostname}`, value);
  }

  public watch(
    key: string,
    hostname: string,
    callback: StorageWatchCallback,
  ): Unwatch {
    return this.storageService.watch(`session:${key}-${hostname}`, (value) => {
      const validateMessage = MESSAGE_SCHEMA.parse(value) as Message;
      callback(validateMessage);
    });
  }

  public async remove(key: string, currentHostname?: string): Promise<void> {
    const hostname = currentHostname ?? (await this.getHostname());

    return this.storageService.removeItem(`session:${key}-${hostname}`);
  }

  private async getHostname(): Promise<string> {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tabs[0]) throw new ActiveTabNotFoundError();
    if (!tabs[0].url) throw new ActiveTabWithoutUrlError();

    return new URL(tabs[0].url).hostname;
  }
}
