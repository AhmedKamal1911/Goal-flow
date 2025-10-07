import { Prisma } from "@prisma/client";

export type TaskWithPriority = Prisma.TaskGetPayload<{
  include: {
    priority: true;
  };
}>;
