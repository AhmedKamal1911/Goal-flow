import { Prisma } from "@prisma/client";
import { BetterAuthError, APIError } from "better-auth";

// ✅ Prisma Error Guard
export function isPrismaError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

// ✅ BetterAuth Error Guard
export function isBetterAuthError(error: unknown): error is BetterAuthError {
  return error instanceof BetterAuthError;
}

// ✅ API Error Guard
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}
