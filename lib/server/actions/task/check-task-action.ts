"use server";

import { ActionResponse } from "@/lib/types/shared";

import prisma from "@/prisma";
import { Prisma, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function checkTaskAction(formData: FormData): ActionResponse {
  const taskId = formData.get("taskId");
  const taskStatus = formData.get("taskStatus");
  console.log({ taskId, taskStatus });
  const result = z
    .object({
      taskId: z.string().min(1, { error: "task id is required" }),
      taskStatus: z.enum(Object.values(TaskStatus)),
    })
    .safeParse({ taskId, taskStatus });
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
    await prisma.task.update({
      where: { id: result.data.taskId },
      data: { status: result.data.taskStatus },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "Task status updated successfully.",
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
        statusText: "Something went wrong while updating the task.",
      },
    };
  }
}
