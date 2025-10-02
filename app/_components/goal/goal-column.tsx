import { useShades } from "@/hooks/useShades";
import AddTaskDialog from "../task/add-task-dialog";
import TaskCard from "../task/task-card";
import { GoalWithTasks } from "@/lib/types/goal";
import { getContrastColor } from "@/lib/utils";

export default function GoalColumn({ goalInfo }: { goalInfo: GoalWithTasks }) {
  const { lighter, darker } = useShades(goalInfo.color || "#3498db");
  const textColor = getContrastColor(goalInfo.color || "#3498db");

  return (
    <div
      style={{
        background: `linear-gradient(55deg, ${lighter}, ${darker})`,
      }}
      className="p-4 rounded-2xl shadow-md text-white 
                 backdrop-blur-sm bg-opacity-90
                 border border-white/20 
                 transition-all duration-300 
                 hover:shadow-xl hover:scale-[1.02] hover:brightness-105"
    >
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <span
            style={{
              color: textColor,
            }}
            className="capitalize text-lg font-semibold tracking-wide"
          >
            {goalInfo.name}
          </span>
          <AddTaskDialog />
        </div>

        <span style={{ color: textColor }} className="text-base font-semibold">
          50%{" "}
          <span
            style={{ color: textColor, opacity: 0.8 }}
            className="text-sm font-normal"
          >
            tasks completed
          </span>
        </span>
      </div>

      <div className="border-t border-white/20 my-2" />

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((task, i) => (
          <TaskCard key={i} level="medium" title="test" />
        ))}
      </div>
    </div>
  );
}
