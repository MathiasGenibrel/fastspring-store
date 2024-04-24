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
   * @param key - The key to save and retrieve the value
   * @param value - The value to save
   * @param hostname - The hostname to save the value under
   */
  save(key: string, value: any, hostname?: string): Promise<void>;

  /**
   * Watch a key for changes
   * @param key - The key to watch
   * @param hostname - The hostname to watch the key under
   * @param callback - The callback to call when the key changes
   */
  watch(key: string, hostname: string, callback: StorageWatchCallback): Unwatch;

  /**
   * Remove a key-value pair
   * @param key
   * @param currentHostname
   */
  remove(key: string, currentHostname?: string): Promise<void>;
}
