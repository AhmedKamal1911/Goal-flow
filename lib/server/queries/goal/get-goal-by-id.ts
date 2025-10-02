import prisma from "@/prisma";

export async function getGoalById(id: string) {
  try {
    return await prisma.goal.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
