"use client";

import { useState, useRef, useEffect } from "react";
import { TaskWithPriority } from "@/lib/types/task";
import { Button } from "@/components/ui/button";

import { Priority } from "@prisma/client";
import { TaskCard } from "../task/task-card";

export default function GoalTasks({
  tasks,
  priorities,
}: {
  tasks: TaskWithPriority[];
  priorities: Priority[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>(315);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3;

  useEffect(() => {
    if (containerRef.current && tasks.length > 0) {
      const children = Array.from(
        containerRef.current.children
      ) as HTMLElement[];
      const height = children
        .slice(0, visibleCount)
        .reduce(
          (sum, el) =>
            sum +
            el.offsetHeight +
            parseFloat(getComputedStyle(el).marginBottom),
          0
        );
      setCollapsedHeight(height);
    }
  }, [tasks]);

  const handleToggle = () => {
    if (containerRef.current) {
      const container = containerRef.current;

      if (showAll) {
        // العودة للوضع المختصر ونرجع لأعلى
        setShowAll(false);
        requestAnimationFrame(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
        });
      } else {
        setShowAll(true);
      }
    }
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 relative"
    >
      <div className="relative">
        <div
          ref={containerRef}
          className="flex flex-col gap-2 p-1 rounded-b-md transition-[max-height] duration-300"
          style={{
            maxHeight: showAll
              ? "350px"
              : tasks.length > visibleCount
              ? `${collapsedHeight}px`
              : undefined,
            overflowY: showAll
              ? "auto"
              : tasks.length > visibleCount
              ? "hidden"
              : undefined,
          }}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} priorities={priorities} taskInfo={task} />
          ))}

          {!showAll && tasks.length > visibleCount && (
            <div
              className="absolute bottom-0 left-0 right-0 h-20 rounded-b-md"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            />
          )}
        </div>
      </div>

      {tasks.length > visibleCount && (
        <Button
          variant="secondary"
          onClick={handleToggle}
          className="self-center rounded-full shadow-2xl border-1 mt-1 cursor-pointer"
        >
          {showAll
            ? "Show less ▲"
            : `Show ${tasks.length - visibleCount} more tasks ▼`}
        </Button>
      )}
    </div>
  );
}
