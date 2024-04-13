import { Storefront } from "@/src/storefront/storefront.type.ts";
import {
  ExtensionService,
  MessageType,
} from "@/src/services/extension-service.type.ts";
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
      await this.sendToExtension(store);
    } catch (error) {
      if (error instanceof InvalidEndpointError) {
        return this.sendInvalidEndpointErrorToExtension(error);
      }

      console.error("Unknown error", error);
    }
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
  private async sendToExtension(store: Storefront) {
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
