import { z } from "zod";
import {
  MessageRouterType,
  MessageRuntimeType,
} from "@/src/services/message/extension-service.type.ts";

export const MESSAGE_SCHEMA = z.object({
  type: z.nativeEnum(MessageRouterType),
  payload: z.instanceof(Object),
});

export const MESSAGE_RUNTIME_SCHEMA = z.object({
  type: z.nativeEnum(MessageRuntimeType),
  payload: z.instanceof(Object),
});
