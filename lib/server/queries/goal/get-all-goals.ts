import { PRISMA_CACHE_KEY } from "@/lib/cache/cache";
import prisma from "@/prisma";
import { unstable_cache } from "next/cache";

export async function _getAllGoals() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { order: "asc" },
      include: {
        tasks: true,
      },
    });
    return goals;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getAllGoals = unstable_cache(_getAllGoals, undefined, {
  tags: [PRISMA_CACHE_KEY.GOALS],
});
