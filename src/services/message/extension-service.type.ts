import {
  FASTSPRING_CHECKOUT_BUILDER,
  STOREFRONT_KEY,
} from "@/src/storefront/constants.ts";
import {
  StorefrontPayload,
  StorefrontPayloadProduct,
} from "@/src/storefront/storefront.type.ts";

export enum MessageRouterType {
  STOREFRONT = STOREFRONT_KEY,
  ERROR = "error",
}

export enum MessageRuntimeType {
  FASTSPRING_BUILD_CHECKOUT = FASTSPRING_CHECKOUT_BUILDER,
}

export type Message =
  | {
      type: MessageRouterType.STOREFRONT;
      payload: StorefrontPayload;
    }
  | {
      type: MessageRouterType.ERROR;
      payload: {
        message: string;
        stack: string;
      };
    };

export type MessageRuntime = {
  type: MessageRuntimeType.FASTSPRING_BUILD_CHECKOUT;
  payload: Record<StorefrontPayloadProduct["path"], number>;
};

type SendMethod = (message: Message) => Promise<void>;

export interface ExtensionService {
  send: SendMethod;
}
