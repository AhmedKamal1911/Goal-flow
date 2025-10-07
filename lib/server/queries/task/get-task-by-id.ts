import prisma from "@/prisma";

export async function getTaskById(id: string) {
  try {
    return await prisma.task.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
