import { GoalWithTasks } from "@/lib/types/goal";
import { getContrastColor, getShades } from "@/lib/utils";

import GoalOptionsMenu from "./goal-options-menu";
import { getAllPriorities } from "@/lib/server/queries";
import GoalTasks from "./goal-tasks";

export default async function GoalColumn({
  goalInfo,
}: {
  goalInfo: GoalWithTasks;
}) {
  const { lighter, darker } = getShades(goalInfo.color || "#3498db");
  const textColor = getContrastColor(goalInfo.color || "#3498db");
  const priorities = await getAllPriorities();
  console.log({ tasks: goalInfo.tasks });
  return (
    <div
      style={{
        background: `linear-gradient(55deg, ${lighter}, ${darker})`,
      }}
      className="p-2 sm:p-3 rounded-xl shadow-md 
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
          <GoalOptionsMenu priorities={priorities} goalInfo={goalInfo} />
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
      <GoalTasks tasks={goalInfo.tasks} priorities={priorities} />
    </div>
  );
}
