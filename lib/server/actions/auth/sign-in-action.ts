"use server";

import { auth } from "@/lib/auth";
import { ActionResponse } from "@/lib/types/shared";

import { LoginInputs, loginSchema } from "@/lib/validation/auth/login-schema";

import {
  isAPIError,
  isBetterAuthError,
  isPrismaError,
} from "@/lib/error-guards";

export async function signInAction(values: LoginInputs): ActionResponse {
  const result = loginSchema.safeParse(values);
  if (!result.success) {
    const firstError = result.error.issues[0].message ?? "Validation error";
    console.log(result.error);
    return {
      status: "validationError",
      error: {
        statusCode: 400,
        statusText: firstError,
      },
    };
  }

  const email = result.data.email;
  const password = result.data.password;
  try {
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      message: `Welcome back ${session.user.name}.`,
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
        statusText: "Something went wrong during sign in.",
      },
    };
  }
}
