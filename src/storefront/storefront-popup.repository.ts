import {
  MessageRuntime,
  MessageRuntimeType,
} from "@/src/services/message/extension-service.type.ts";
import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { Tabs } from "webextension-polyfill";

export class StorefrontPopupRepository {
  constructor(private readonly tabService: Tabs.Static) {}

  public async build(
    storeContent: Record<StorefrontPayloadProduct["path"], number>,
  ) {
    try {
      await this.sendToExtension(storeContent);
    } catch (error) {
      console.error("Unknown error", error);
    }
  }

  private async sendToExtension(
    storeContent: Record<StorefrontPayloadProduct["path"], number>,
  ) {
    const message: MessageRuntime = {
      type: MessageRuntimeType.FASTSPRING_BUILD_CHECKOUT,
      payload: storeContent,
    };

    await this.tabService.sendMessage(await this.getTabID(), message);
    window.close();
  }

  private async getTabID(): Promise<number> {
    const [currentTab] = await this.tabService.query({
      active: true,
      currentWindow: true,
    });

    if (!currentTab.id) throw new Error("Active tab not found");
    return currentTab.id;
  }
}
