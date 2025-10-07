"use client";

import { Checkbox } from "@/components/ui/checkbox";
import TaskOptionsMenu from "./task-options-menu";
import { TaskWithPriority } from "@/lib/types/task";
import { memo, useState } from "react";
import { Priority } from "@prisma/client";

export const TaskCard = memo(function TaskCard({
  taskInfo,
  priorities,
}: {
  taskInfo: TaskWithPriority;
  priorities: Priority[];
}) {
  return (
    <div className="p-2 bg-primary-foreground rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <span className="capitalize text-primary max-w-[250px]  line-clamp-1 sm:line-clamp-2 overflow-hidden">
          {taskInfo.name}
        </span>
        <TaskOptionsMenu taskInfo={taskInfo} priorities={priorities} />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Checkbox className="size-5 border-accent-foreground" />

        <div className={`inline-flex items-center gap-1 text-sm font-medium`}>
          {taskInfo.priority.icon}
          <span
            style={{
              color: taskInfo.priority.color,
            }}
          >
            {taskInfo.priority.name}
          </span>
        </div>
      </div>
      {taskInfo.desc && <TaskDesc desc={taskInfo.desc} />}
    </div>
  );
});

function TaskDesc({ desc }: { desc: string }) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descMaxLength = 100; // عدد الأحرف الظاهرة في الوضع المختصر

  const isLongDesc = desc.length > descMaxLength;
  return (
    <p className="text-sm text-gray-500 break-words mt-1">
      {isLongDesc && !showFullDesc
        ? `${desc.slice(0, descMaxLength)}...`
        : desc}
      {isLongDesc && (
        <button
          onClick={() => setShowFullDesc((prev) => !prev)}
          className="ml-1 text-blue-600 hover:underline text-xs"
        >
          {showFullDesc ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
}
