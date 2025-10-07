"use server";

import { ActionResponse } from "@/lib/types/shared";
import {
  goalSchema,
  GoalSchemaInputs,
} from "@/lib/validation/goal/create-goal-schema";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

import { getGoalById } from "../../queries";
import { revalidatePath } from "next/cache";

export async function editGoalAction(
  inputs: GoalSchemaInputs & { goalId: string }
): ActionResponse {
  const result = goalSchema.safeParse({
    title: inputs.title,
    color: inputs.color,
  });
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
    const goalFromDb = await getGoalById(inputs.goalId);

    if (!goalFromDb) {
      return {
        status: "error",
        error: {
          statusCode: 404,
          statusText: "Goal not found after update.",
        },
      };
    }

    if (
      goalFromDb.name === result.data.title &&
      goalFromDb.color === result.data.color
    ) {
      return {
        status: "success",
        message: "Goal Updated Successfully.",
      };
    }

    await prisma.goal.update({
      where: {
        id: goalFromDb.id,
      },
      data: {
        color: result.data.color,
        name: result.data.title,
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "Goal Updated Successfully.",
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
        statusText: "Something went wrong while saving your edits.",
      },
    };
  }
}
