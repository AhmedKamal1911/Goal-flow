import { getAllGoals } from "@/lib/server/queries";
import BoardColumns from "./_components/board-columns";
import GoalBoardHeader from "./_components/goal/goal-board-header";

export default async function Home() {
  const goalsList = await getAllGoals();
  return (
    <main className="relative  bg-[#E9ECF2] p-3 sm:p-5 flex min-h-screen overflow-hidden">
      <div className="flex flex-col gap-8 bg-primary-foreground p-3 sm:p-4 rounded-md flex-1">
        <GoalBoardHeader />
        <BoardColumns goalsList={goalsList} />
      </div>
    </main>
  );
}
