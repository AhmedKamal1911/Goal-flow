import prisma from "@/prisma";

export async function getAllGoals() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        tasks: {
          include: { priority: true },
          orderBy: [{ status: "desc" }, { createdAt: "asc" }],
        },
      },
    });

    return goals;
  } catch (error) {
    console.error(error);
    return [];
  }
}
