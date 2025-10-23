"use server";
import { isPrismaError } from "@/lib/error-guards";
import { ActionResponse } from "@/lib/types/shared";
import prisma from "@/prisma";

import { revalidatePath } from "next/cache";

import z from "zod";
type Order = {
  id: string;
  order: number;
};

const schema = z.array(
  z.object({
    id: z.string(),
    order: z.number(),
  })
);
export async function reorderGoalsAction(newOrders: Order[]): ActionResponse {
  const result = schema.safeParse(newOrders);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        statusCode: 400,
        statusText: "Validation failed",
      },
    };
  }
  const parsedOrders = result.data;
  try {
    const updatePromises = parsedOrders.map(({ id, order }) =>
      prisma.goal.update({
        where: { id },
        data: { order },
      })
    );
    await Promise.all(updatePromises);

    revalidatePath("/flow");
    return { status: "success", message: "Order Updated" };
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
        statusText: "Something went wrong while Ordering your Goals.",
      },
    };
  }
}
