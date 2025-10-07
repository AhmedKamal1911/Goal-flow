import BoardColumns from "./_components/board-columns";
import GoalBoardHeader from "./_components/goal/goal-board-header";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home() {
  return (
    <main className="relative  bg-[#E9ECF2] p-3 sm:p-5 flex min-h-screen overflow-hidden">
      <div className="flex flex-col gap-8 bg-primary-foreground p-3 sm:p-4 rounded-md flex-1">
        <GoalBoardHeader />
        <BoardColumns />
      </div>
    </main>
  );
}
