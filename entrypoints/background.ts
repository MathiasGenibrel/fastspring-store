import { SessionStorageService } from "@/src/services/storage/session.storage-service.ts";
import { MessageRouter } from "@/src/services/message/message.router.ts";
import { MESSAGE_SCHEMA } from "@/src/services/message/message.schema.ts";
import { Message } from "@/src/services/message/extension-service.type.ts";
import { browser } from "wxt/browser";

export default defineBackground(() => {
  const sessionStorage = new SessionStorageService(storage);

  browser.runtime.onMessage.addListener((message: unknown) => {
    const router = new MessageRouter(sessionStorage);
    try {
      const parsedMessage = MESSAGE_SCHEMA.parse(message) as Message;
      router.handle(parsedMessage).then(() => {
        console.log("Message handled");
      });
    } catch (error) {
      console.error("Message not corresponding to attempts format", error);
    }

    console.log("Message received", message);
  });
});
