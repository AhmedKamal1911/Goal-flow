import { Prisma } from "@prisma/client";

export type GoalWithTasks = Prisma.GoalGetPayload<{
  include: { tasks: true };
}>;
