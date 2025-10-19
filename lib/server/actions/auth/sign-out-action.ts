"use server";

import { auth } from "@/lib/auth";
import { ActionResponse } from "@/lib/types/shared";

import {
  isAPIError,
  isBetterAuthError,
  isPrismaError,
} from "@/lib/error-guards";
import { headers } from "next/headers";

export async function signOutAction(): ActionResponse {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      message: `You Have Logged Out.`,
      status: "success",
    };
  } catch (error) {
    if (isPrismaError(error)) {
      console.error("Prisma error:", {
        code: error.code,
        meta: error.meta,
        message: error.message,
      });

      return {
        status: "error",
        error: {
          statusCode: 500,
          statusText: "Database error occurred.",
        },
      };
    }
    if (isBetterAuthError(error)) {
      return {
        status: "error",
        error: {
          statusCode: 401,
          statusText: error.message,
        },
      };
    }
    if (isAPIError(error)) {
      const message = error.message;
      console.log({ error });

      return {
        status: "error",
        error: {
          statusCode: error.statusCode,
          statusText: message,
        },
      };
    }

    // 🧭 Catch-all
    console.error("Unexpected error:", error);
    return {
      status: "error",
      error: {
        statusCode: 500,
        statusText: "Something went wrong during sign out.",
      },
    };
  }
}
