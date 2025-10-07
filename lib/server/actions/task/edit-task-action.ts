"use server";

import { ActionResponse } from "@/lib/types/shared";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

import { getTaskById } from "../../queries";
import { revalidatePath } from "next/cache";
import { TaskInputs, taskSchema } from "@/lib/validation/task/task";

export async function editTaskAction({
  inputs,
  taskId,
}: {
  inputs: TaskInputs;
  taskId: string;
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
    const taskFromDb = await getTaskById(taskId);

    if (!taskFromDb) {
      return {
        status: "error",
        error: {
          statusCode: 404,
          statusText: "Task not found after update.",
        },
      };
    }

    if (
      taskFromDb.name === result.data.title &&
      taskFromDb.priorityId === taskId &&
      taskFromDb.desc === result.data.desc
    ) {
      return {
        status: "success",
        message: "Task Updated Successfully.",
      };
    }

    await prisma.task.update({
      where: {
        id: taskFromDb.id,
      },
      data: {
        name: result.data.title,
        desc: result.data?.desc ?? "",
        priorityId: result.data.priorityId,
      },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "Task Updated Successfully.",
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
