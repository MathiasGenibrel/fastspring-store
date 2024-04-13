import { StorefrontRepository } from "@/src/storefront/storefront.repository.ts";
import { MessageExtensionService } from "@/src/services/message.extension-service.ts";

export default defineContentScript({
  matches: ["https://*/*"],
  runAt: "document_start",

  registration: "manifest",

  main() {
    document.addEventListener("DOMContentLoaded", () => {
      const store = document.getElementById("fsc-api");
      const extensionService = new MessageExtensionService(browser.runtime);
      const storefrontRepository = new StorefrontRepository(extensionService);

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
    });
  },
});
