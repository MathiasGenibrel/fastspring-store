export enum MessageType {
  STOREFRONT = "storefront",
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
