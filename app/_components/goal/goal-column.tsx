import { useShades } from "@/hooks/useShades";

import TaskCard from "../task/task-card";
import { GoalWithTasks } from "@/lib/types/goal";
import { getContrastColor } from "@/lib/utils";

import GoalOptionsMenu from "./goal-options-menu";

export default function GoalColumn({ goalInfo }: { goalInfo: GoalWithTasks }) {
  const { lighter, darker } = useShades(goalInfo.color || "#3498db");
  const textColor = getContrastColor(goalInfo.color || "#3498db");

  return (
    <div
      style={{
        background: `linear-gradient(55deg, ${lighter}, ${darker})`,
      }}
      className="p-2.5 sm:p-4 rounded-2xl shadow-md 
                 transition-all duration-300 
                 hover:shadow-xl hover:scale-[1.02] hover:brightness-105"
    >
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between gap-4 items-center">
          <span
            style={{
              color: textColor,
            }}
            className="capitalize text-lg font-semibold max-w-[250px]  line-clamp-1 sm:line-clamp-2 overflow-hidden tracking-wide"
          >
            {goalInfo.name}
          </span>
          <GoalOptionsMenu />
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
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((task, i) => (
          <TaskCard key={i} level="medium" title="test" />
        ))}
      </div>
    </div>
  );
}
