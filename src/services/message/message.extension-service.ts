import {
  ExtensionService,
  Message,
} from "@/src/services/message/extension-service.type.ts";
import { WxtRuntime } from "wxt/browser";

export class MessageExtensionService implements ExtensionService {
  constructor(private readonly runtimeService: WxtRuntime) {}

  public send(message: Message): Promise<void> {
    return this.runtimeService.sendMessage(message);
  }
}
