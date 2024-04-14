import { z } from "zod";
import { MessageType } from "@/src/services/message/extension-service.type.ts";

export const MESSAGE_SCHEMA = z.object({
  type: z.nativeEnum(MessageType),
  payload: z.instanceof(Object),
});
