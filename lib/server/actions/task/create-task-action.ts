"use server";

import { isPrismaError } from "@/lib/error-guards";
import { ActionResponse } from "@/lib/types/shared";
import { TaskInputs, taskSchema } from "@/lib/validation/task/task";

import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export async function createTaskAction({
  inputs,
  goalId,
}: {
  inputs: TaskInputs;
  goalId: string;
}): ActionResponse {
  const result = taskSchema.safeParse(inputs);
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
    await prisma.task.create({
      data: {
        name: result.data.title,
        desc: result.data.desc ?? "",
        priorityId: result.data.priorityId,
        goalId,
      },
    });
    console.log("created tasl");
    revalidatePath("/flow");
    return {
      status: "success",
      message: "Task Added Successfully.",
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
        statusText: "Something went wrong while adding your task.",
      },
    };
  }
}
