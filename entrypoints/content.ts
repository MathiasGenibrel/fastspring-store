import { StorefrontRepository } from "@/src/storefront/storefront.repository.ts";
import { MessageExtensionService } from "@/src/services/message/message.extension-service.ts";
import { browser } from "wxt/browser";
import { FastspringRepository } from "@/src/fastspring/fastspring.repository.ts";
import { MESSAGE_RUNTIME_SCHEMA } from "@/src/services/message/message.schema.ts";
import { MessageRuntimeType } from "@/src/services/message/extension-service.type.ts";
import FastspringSdk from "@/src/fastspring/fastspring.sdk.ts";
import { StorefrontCache } from "@/src/storefront/storefront.cache.ts";

export default defineContentScript({
  matches: ["https://*/*"],

  main() {
    const cacheStorefront = new StorefrontCache(storage);

    document.addEventListener("DOMContentLoaded", async () => {
      const cache = await cacheStorefront.get(window.location.hostname);
      const store = document.getElementById("fsc-api");
      const storefrontRepository = new StorefrontRepository(
        new MessageExtensionService(browser.runtime),
      );

      const dataset: DOMStringMap | undefined =
        cache?.dataset ?? store?.dataset;

      if (!dataset) {
        return console.info("This website does not contain Fastspring store");
      }

      if (dataset.storefront) {
        await storefrontRepository.build(dataset.storefront);
        await cacheStorefront.set(window.location.hostname, {
          hostname: window.location.hostname,
          dataset,
        });
      }

      const fastspring = document.createElement("section");
      fastspring.dataset.sbl = "0.8.9"; // Required by sdk
      fastspring.id = "fsc-api";

      Object.entries(dataset).forEach(([key, value]) => {
        fastspring.dataset[key] = value;
      });
      document.head.appendChild(fastspring);

      browser.runtime.onMessage.addListener(async (message: unknown) => {
        const validatedMessage = MESSAGE_RUNTIME_SCHEMA.parse(message);
        FastspringSdk();

        switch (validatedMessage.type) {
          case MessageRuntimeType.FASTSPRING_BUILD_CHECKOUT:
            await FastspringRepository.buildCheckout(
              validatedMessage.payload as Record<string, number>,
            );
            break;
          default:
            throw new Error(`Unknown message type`);
        }
      });
    });
  },
});
