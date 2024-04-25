import { StorefrontRepository } from "@/src/storefront/storefront.repository.ts";
import { MessageExtensionService } from "@/src/services/message/message.extension-service.ts";
import { browser } from "wxt/browser";
import { FastspringRepository } from "@/src/fastspring/fastspring.repository.ts";
import { MESSAGE_RUNTIME_SCHEMA } from "@/src/services/message/message.schema.ts";
import { MessageRuntimeType } from "@/src/services/message/extension-service.type.ts";
import FastspringSdk from "@/src/fastspring/fastspring.sdk.ts";

export default defineContentScript({
  matches: ["https://*/*"],

  main() {
    document.addEventListener("DOMContentLoaded", () => {
      const store = document.getElementById("fsc-api");
      const storefrontRepository = new StorefrontRepository(
        new MessageExtensionService(browser.runtime),
      );

      if (!store) {
        return console.info("This website does not contain Fastspring store");
      }

      if (store.dataset.storefront) {
        storefrontRepository
          .build(store.dataset.storefront)
          .then(() => {
            console.log("storefront sent");
          })
          .catch((error) => {
            console.error("Failed to send storefront", error);
          });
      }

      const fastspringScript = document.createElement("script");
      // Use for SBL version
      fastspringScript.src = "0.8.9";
      fastspringScript.id = "fsc-api";
      fastspringScript.type = "text/javascript";

      Object.entries(store.dataset).forEach(([key, value]) => {
        fastspringScript.dataset[key] = value;
      });
      document.head.appendChild(fastspringScript);

      browser.runtime.onMessage.addListener((message: unknown) => {
        const validatedMessage = MESSAGE_RUNTIME_SCHEMA.parse(message);
        FastspringSdk();

        switch (validatedMessage.type) {
          case MessageRuntimeType.FASTSPRING_BUILD_CHECKOUT:
            FastspringRepository.buildCheckout(
              validatedMessage.payload as Record<string, number>,
            ).then(() => {});
            break;
          default:
            throw new Error(`Unknown message type`);
        }
      });
    });
  },
});
