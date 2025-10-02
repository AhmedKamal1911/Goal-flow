"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ClockAlert, TriangleAlert, Zap } from "lucide-react";
import { ReactElement } from "react";
import EditTaskDialog from "./edit-task-dialog";
type PriorityType = "low" | "medium" | "high" | "critical";

const priority: Record<
  PriorityType,
  { color: string; name: string; icon: ReactElement }
> = {
  low: {
    color: "text-green-600",
    name: "Low",
    icon: <Zap className="size-4" />,
  },
  medium: {
    color: "text-yellow-600",
    name: "Medium",
    icon: <Zap className="size-4" />,
  },
  high: {
    color: "text-orange-600",
    name: "High",
    icon: <ClockAlert className="size-4" />,
  },
  critical: {
    color: "text-red-600",
    name: "Critical",
    icon: <TriangleAlert className="size-4" />,
  },
};

export default function TaskCard({
  title = "finish hooks tutorial",
  level = "critical",
}: {
  title: string;
  level: PriorityType;
}) {
  const p = priority[level];

  return (
    <div className="p-3 bg-primary-foreground rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <span className="capitalize text-primary">{title}</span>
        <EditTaskDialog />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Checkbox className="size-5 border-accent-foreground" />
        <div
          className={`inline-flex items-center gap-1 text-sm font-medium ${p.color}`}
        >
          {p.icon}
          <span>{p.name}</span>
        </div>
      </div>
    </div>
  );
}
