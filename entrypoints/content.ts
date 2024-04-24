import { StorefrontRepository } from "@/src/storefront/storefront.repository.ts";
import { MessageExtensionService } from "@/src/services/message/message.extension-service.ts";
import { browser } from "wxt/browser";

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

      // const tempScript = document.createElement("script");
      // tempScript.id = "fsc-api";
      // tempScript.type = "text/javascript";
      // Object.entries(store.dataset).forEach(([key, value]) => {
      //   tempScript.dataset[key] = value;
      // });
      // document.head.appendChild(tempScript);
      //
      // console.log(fastspringSDK);

      // browser.runtime.onMessage.addListener((message: unknown) => {
      //   const validatedMessage = MESSAGE_RUNTIME_SCHEMA.parse(message);
      //
      //   switch (validatedMessage.type) {
      //     case MessageRuntimeType.FASTSPRING_BUILD_CHECKOUT:
      //       FastspringRepository.buildCheckout(
      //         validatedMessage.payload as Record<string, number>,
      //       ).then(() => {
      //         console.log("Checkout built");
      //       });
      //       break;
      //     default:
      //       throw new Error(`Unknown message type`);
      //   }
      // });
    });
  },
});
