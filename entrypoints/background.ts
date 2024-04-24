import { SessionStorageService } from "@/src/services/storage/session.storage-service.ts";
import { MessageRouter } from "@/src/services/message/message.router.ts";
import { MESSAGE_SCHEMA } from "@/src/services/message/message.schema.ts";
import { Message } from "@/src/services/message/extension-service.type.ts";
import { browser } from "wxt/browser";

const testScripting = async () => {
  const [currentTab] = await browser.tabs.query({
    active: true,
  });

  console.log("Current tab", currentTab);

  if (!currentTab.id) throw new Error("Active tab not found");

  await browser.scripting.executeScript({
    target: { tabId: currentTab.id, allFrames: true },
    func: () => {
      document.body.style.backgroundColor = "red";
      alert("Hello from background script");
    },
  });

  console.log("Script executed");
};

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
