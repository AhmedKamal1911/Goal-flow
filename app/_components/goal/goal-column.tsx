"use client";
import { GoalWithTasks } from "@/lib/types/goal";
import { getContrastColor, getGoalProgress, getShades } from "@/lib/utils";

import GoalOptionsMenu from "./goal-options-menu";

import GoalTasks from "./goal-tasks";
import { Priority } from "@prisma/client";

export default function GoalColumn({
  goalInfo,
  priorities,
}: {
  goalInfo: GoalWithTasks;
  priorities: Priority[];
}) {
  const { lighter, darker } = getShades(goalInfo.color || "#3498db");
  const textColor = getContrastColor(goalInfo.color || "#3498db");

  const percentage = getGoalProgress(goalInfo.tasks);
  console.log({ tasks: goalInfo.tasks });
  return (
    <div
      style={{
        background: `linear-gradient(55deg, ${lighter}, ${darker})`,
      }}
      className="p-2 sm:p-3 rounded-xl shadow-md 
"
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
          <GoalOptionsMenu priorities={priorities} goalInfo={goalInfo} />
        </div>

        <span
          style={{ color: textColor }}
          className="text-base font-semibold flex items-center gap-1"
        >
          {percentage}%
          <span
            style={{ color: textColor, opacity: 0.8 }}
            className="text-sm font-normal"
          >
            tasks completed
          </span>
        </span>
      </div>
      <GoalTasks tasks={goalInfo.tasks} priorities={priorities} />
    </div>
  );
}
