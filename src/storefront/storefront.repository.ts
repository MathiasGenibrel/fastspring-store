import {
  Storefront,
  StorefrontPayload,
} from "@/src/storefront/storefront.type.ts";
import {
  ExtensionService,
  MessageType,
} from "@/src/services/message/extension-service.type.ts";
import { z } from "zod";
import { InvalidEndpointError } from "@/src/storefront/errors/InvalidEndpoint.error.ts";

export class StorefrontRepository {
  private endpointSchema = z.string().regex(/.*\.onfastspring\.com\/.*/);
  constructor(private readonly extensionService: ExtensionService) {}

  /**
   * Send storefront to extension
   * @param endpoint Storefront endpoint
   * - e.g. => "example.onfastspring.com/pop-up-storefront"
   */
  public async build(endpoint: string) {
    try {
      const store = await this.getStoreContent(endpoint);
      await this.sendToExtension(this.preparePayloadMessage(store));
    } catch (error) {
      if (error instanceof InvalidEndpointError) {
        return this.sendInvalidEndpointErrorToExtension(error);
      }

      console.error("Unknown error", error);
    }
  }

  /**
   * Prepare a storefront format to send to the extension
   * @param store - Storefront content
   * @private
   */
  private preparePayloadMessage(store: Storefront) {
    const payload: StorefrontPayload = {
      currency: store.currency,
      discountTotalPercentValue: store.discountTotalPercentValue,
      discountTotalValue: store.discountTotalValue,
      totalWithTaxValue: store.totalWithTaxValue,
      products: store.groups
        .map((group) =>
          group.items.map((item) => ({
            discountTotalValue: item.discountTotalValue,
            autoRenew: item.autoRenew,
            display: item.display,
            sku: item.sku,
            image: item.image,
            path: item.path,
            priceTotalValue: item.priceTotalValue,
            totalValue: item.totalValue,
            description: item.description,
            discountPercentValue: item.discountPercentValue,
            subscription: item.subscription
              ? {
                  nextChargeDateValue: item.subscription.nextChargeDateValue,
                  intervalUnit: item.subscription.intervalUnit,
                  intervalLength: item.subscription.intervalLength,
                  nextChargeCurrency: item.subscription.nextChargeCurrency,
                  nextChargeTotalValue: item.subscription.nextChargeTotalValue,
                }
              : null,
          })),
        )
        .flat(),
    };
    return payload;
  }

  /**
   * Get storefront content from FastSpring API
   * @param endpoint - Storefront endpoint e.g. ***"example.onfastspring.com/pop-up-storefront"***
   * @private
   */
  private async getStoreContent(endpoint: string): Promise<Storefront> {
    const validateEndpoint = this.endpointSchema.safeParse(endpoint);

    if (!validateEndpoint.success) {
      throw new InvalidEndpointError(
        "Endpoint does not match the required format",
        endpoint,
        validateEndpoint.error,
      );
    }

    const response = await fetch(`https://${validateEndpoint.data}/builder`);
    return await response.json();
  }

  /**
   * Send storefront to service worker for extension popup
   * @param store - Storefront content
   * @private
   */
  private async sendToExtension(store: StorefrontPayload) {
    try {
      await this.extensionService.send({
        type: MessageType.STOREFRONT,
        payload: store,
      });
    } catch (error) {
      console.error("Failed to send storefront to extension", error);
    }
  }

  /**
   * Send invalid endpoint error to the extension, to show an error message in popup
   * @param error - Invalid endpoint error
   * @private
   */
  private async sendInvalidEndpointErrorToExtension(
    error: InvalidEndpointError,
  ) {
    try {
      await this.extensionService.send({
        type: MessageType.ERROR,
        payload: error,
      });
    } catch (error) {
      console.error("Failed to send error to extension", error);
    }
  }
}
