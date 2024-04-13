import { ZodError } from "zod";

export class InvalidEndpointError extends Error {
  constructor(
    message: string,
    public readonly endpoint: string,
    public readonly error: ZodError,
  ) {
    super(message);
  }
}
