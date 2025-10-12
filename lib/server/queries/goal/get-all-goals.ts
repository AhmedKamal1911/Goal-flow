import prisma from "@/prisma";

export async function getAllGoals() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { order: "asc" },
      include: {
        tasks: {
          include: { priority: true },
          orderBy: [{ status: "desc" }, { updatedAt: "desc" }],
        },
      },
    });
    console.log({ goals });
    return goals;
  } catch (error) {
    console.error(error);
    return [];
  }
}
