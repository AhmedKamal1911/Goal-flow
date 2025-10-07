import { Prisma } from "@prisma/client";

export type GoalWithTasks = Prisma.GoalGetPayload<{
  include: {
    tasks: {
      include: {
        priority: true;
      };
    };
  };
}>;
