import prisma from "@/prisma";

export async function getAllPriorities() {
  try {
    return await prisma.priority.findMany();
  } catch (error) {
    console.error(error);
    return [];
  }
}
