import { Message } from "@/src/services/message/extension-service.type.ts";
import { Unwatch } from "wxt/storage";

export type StorageWatchCallback = (value: Message) => void;

export interface StorageService {
  /**
   * Get a value by key
   * @param key
   */
  get(key: string): Promise<any>;

  /**
   * Create or update a key-value pair
   * @param key
   * @param value
   */
  save(key: string, value: any): Promise<void>;

  /**
   * Watch a key for changes
   * @param key - The key to watch
   * @param callback - The callback to call when the key changes
   */
  watch(key: string, callback: StorageWatchCallback): Unwatch;

  /**
   * Remove a key-value pair
   * @param key
   */
  remove(key: string): Promise<void>;
}
