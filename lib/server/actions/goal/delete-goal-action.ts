"use server";

import { ActionResponse } from "@/lib/types/shared";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

import { getGoalById } from "../../queries";
import { revalidatePath } from "next/cache";

export async function deleteGoalAction(id: string): ActionResponse {
  try {
    const goalExist = await getGoalById(id);
    if (!goalExist) {
      return {
        status: "error",
        error: {
          statusCode: 404,
          statusText: "Goal not found",
        },
      };
    }
    await prisma.goal.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "Goal Deleted Successfully.",
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
        statusText: "Something went wrong while deleting your goal.",
      },
    };
  }
}
