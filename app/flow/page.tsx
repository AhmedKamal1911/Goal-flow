import { getAllGoals, getAllPriorities } from "@/lib/server/queries";
import BoardColumns from "./_components/board-columns";
import GoalBoardHeader from "./_components/goal/goal-board-header";
import { getGoalProgress } from "@/lib/utils";
export const metadata = {
  title: "Flow | Goal Flow",
  description: "Access your Goal Flow.",
};
export default async function Home() {
  const [goalsList, priorities] = await Promise.all([
    getAllGoals(),
    getAllPriorities(),
  ]);

  const averageProgress =
    goalsList.reduce((sum, goal) => sum + getGoalProgress(goal.tasks), 0) /
    goalsList.length;

  return (
    <main className="relative  bg-[#E9ECF2] p-3 lg:p-5 flex min-h-screen">
      <div className="flex flex-col gap-8 bg-primary-foreground p-3 sm:p-4 rounded-md flex-1">
        <GoalBoardHeader averageProgress={averageProgress} />
        <BoardColumns priorities={priorities} goalsList={goalsList} />
      </div>
    </main>
  );
}
