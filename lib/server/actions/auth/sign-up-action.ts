"use server";

import { auth } from "@/lib/auth";
import { ActionResponse } from "@/lib/types/shared";
import {
  RegisterInputs,
  registerSchema,
} from "@/lib/validation/auth/register-schema";

import { checkEmailExists } from "../../queries/user/check-email-exists";
import {
  isAPIError,
  isBetterAuthError,
  isPrismaError,
} from "@/lib/error-guards";

export async function signUpAction(values: RegisterInputs): ActionResponse {
  const result = registerSchema.safeParse(values);
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
  const name = result.data.name;
  const email = result.data.email;
  const password = result.data.password;
  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return {
        status: "error",
        error: {
          statusCode: 409,
          statusText: "Email already exists. Please use another email.",
        },
      };
    }

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return {
      message: "Registered Successfully.",
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
    return {
      status: "error",
      error: {
        statusCode: 500,
        statusText: "Something went wrong while signup.",
      },
    };
  }
}
