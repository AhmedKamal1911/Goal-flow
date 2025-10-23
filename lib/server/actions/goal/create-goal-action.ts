"use server";

import { isPrismaError } from "@/lib/error-guards";
import { ActionResponse } from "@/lib/types/shared";
import {
  goalSchema,
  GoalSchemaInputs,
} from "@/lib/validation/goal/create-goal-schema";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export async function createGoalAction(
  inputs: GoalSchemaInputs
): ActionResponse {
  const result = goalSchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        statusCode: 400,
        statusText: "invalid inputs",
      },
    };
  }

  try {
    await prisma.goal.create({
      data: {
        name: result.data.title,
        color: result.data.color ?? "#163276",
      },
    });
    revalidatePath("/flow");
    return {
      status: "success",
      message: "Goal Created Successfully.",
    };
  } catch (error) {
    console.error(error);
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
    return {
      status: "error",
      error: {
        statusCode: 500,
        statusText: "Something went wrong while creating your goal.",
      },
    };
  }
}
