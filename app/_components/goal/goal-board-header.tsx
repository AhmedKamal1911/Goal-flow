import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import AddGoalDialog from "./add-goal-dialog";

export default function GoalBoardHeader({
  averageProgress,
}: {
  averageProgress: number;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-6">
        <h2 className="text-xl sm:text-3xl font-bold capitalize">
          goal planning dashboard
        </h2>
        <HeaderActions />
      </div>
      <GoalsProgress percentage={averageProgress} />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-6">
      <AddGoalDialog />
      <Button variant={"outline"} className="cursor-pointer">
        <Settings2 className="size-6" />
      </Button>
    </div>
  );
}

function GoalsProgress({ percentage }: { percentage: number }) {
  return (
    <div className="relative bg-gray-300 h-4 rounded-md overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-secondary transition-[width] duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
        {percentage}%
      </span>
    </div>
  );
}
