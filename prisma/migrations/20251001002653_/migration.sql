-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_goalId_fkey";

-- AlterTable
CREATE SEQUENCE goal_order_seq;
ALTER TABLE "Goal" ALTER COLUMN "order" SET DEFAULT nextval('goal_order_seq');
ALTER SEQUENCE goal_order_seq OWNED BY "Goal"."order";

-- AlterTable
CREATE SEQUENCE task_order_seq;
ALTER TABLE "Task" ALTER COLUMN "order" SET DEFAULT nextval('task_order_seq');
ALTER SEQUENCE task_order_seq OWNED BY "Task"."order";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
