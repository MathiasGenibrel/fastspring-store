import { STOREFRONT_KEY } from "@/src/storefront/constants.ts";

export enum MessageType {
  STOREFRONT = STOREFRONT_KEY,
  ERROR = "error",
}

export interface Message {
  type: MessageType;
  payload: any;
}

type SendMethod = (message: Message) => Promise<void>;

export interface ExtensionService {
  send: SendMethod;
}
