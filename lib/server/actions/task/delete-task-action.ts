"use server";

import { ActionResponse } from "@/lib/types/shared";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

import { getTaskById } from "../../queries";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(taskId: string): ActionResponse {
  try {
    const taskExist = await getTaskById(taskId);
    if (!taskExist) {
      return {
        status: "error",
        error: {
          statusCode: 404,
          statusText: "task not found",
        },
      };
    }
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "task Deleted Successfully.",
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
        statusText: "Something went wrong while deleting your task.",
      },
    };
  }
}
