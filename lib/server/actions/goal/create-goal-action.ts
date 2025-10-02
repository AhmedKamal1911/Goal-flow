"use server";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache";
import { ActionResponse } from "@/lib/types/shared";
import {
  createGoalSchema,
  GoalSchemaInputs,
} from "@/lib/validation/goal/create-goal-schema";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function createGoalAction(
  inputs: GoalSchemaInputs
): ActionResponse {
  const result = createGoalSchema.safeParse(inputs);
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
    revalidateTag(PRISMA_CACHE_KEY.GOALS);
    return {
      status: "success",
      message: "Goal Created Successfully.",
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
        statusText: "Something went wrong while saving your goal.",
      },
    };
  }
}
