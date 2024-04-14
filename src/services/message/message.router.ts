import {
  Message,
  MessageType,
} from "@/src/services/message/extension-service.type.ts";
import { StorageService } from "@/src/services/storage/storage.service.ts";
import { STOREFRONT_KEY } from "@/src/storefront/constants.ts";

export class MessageRouter {
  constructor(private readonly sessionStorageService: StorageService) {}

  public async handle(message: Message): Promise<void> {
    switch (message.type) {
      case MessageType.STOREFRONT:
        await this.sessionStorageService.save(STOREFRONT_KEY, message.payload);
        break;
      case MessageType.ERROR:
        await this.sessionStorageService.save(STOREFRONT_KEY, message.payload);
        break;
      default:
        throw new Error(`Unknown message type: ${message.type}`);
    }
  }
}
