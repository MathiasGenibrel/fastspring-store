import {
  StorageService,
  StorageWatchCallback,
} from "@/src/services/storage/storage.service.ts";
import { Unwatch, WxtStorage } from "wxt/storage";
import { MESSAGE_SCHEMA } from "@/src/services/message/message.schema.ts";

export class SessionStorageService implements StorageService {
  constructor(private readonly storageService: WxtStorage) {}

  public async get<T extends Record<string, any>>(
    key: string,
  ): Promise<T | null> {
    return await this.storageService.getItem(`session:${key}`);
  }

  public async save(key: string, value: Record<string, any>): Promise<void> {
    return this.storageService.setItem(`session:${key}`, value);
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
}
