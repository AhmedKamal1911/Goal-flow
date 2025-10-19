import prisma from "@/prisma";

export async function checkEmailExists(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
