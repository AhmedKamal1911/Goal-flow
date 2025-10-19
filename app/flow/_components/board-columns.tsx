"use client";

import { useEffect, useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import clsx from "clsx";

import GoalColumn from "./goal/goal-column";
import { GoalWithTasks } from "@/lib/types/goal";
import { Priority } from "@prisma/client";
import { reorderGoalsAction } from "@/lib/server/actions/goal/reorder-goals-action";
import { TaskWithPriority } from "@/lib/types/task";
import { TaskCard } from "./task/task-card";

export default function BoardColumns({
  goalsList,
  priorities,
}: {
  goalsList: GoalWithTasks[];
  priorities: Priority[];
}) {
  const [goals, setGoals] = useState(goalsList);
  const [activeGoal, setActiveGoal] = useState<GoalWithTasks | null>(null);
  const [activeTask, setActiveTask] = useState<TaskWithPriority | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setGoals(goalsList);
  }, [goalsList]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const type = active.data.current?.type;

    if (type === "goal") {
      const goal = goals.find((g) => g.id === active.id);
      setActiveGoal(goal || null);
    }

    if (type === "task") {
      const task = goals
        .flatMap((g) => g.tasks)
        .find((t) => t.id === active.id);
      setActiveTask(task || null);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // ✅ Reorder goals
    if (activeType === "goal" && overType === "goal") {
      if (active.id === over.id) return;

      const oldIndex = goals.findIndex((g) => g.id === active.id);
      const newIndex = goals.findIndex((g) => g.id === over.id);
      const newOrder = arrayMove(goals, oldIndex, newIndex);

      setGoals(newOrder);
      setActiveGoal(null);

      startTransition(async () => {
        const newGoalsOrder = newOrder.map((g, index) => ({
          id: g.id,
          order: index + 1,
        }));
        const response = await reorderGoalsAction(newGoalsOrder);
        if (response.status !== "success")
          toast.error(response.error.statusText);
      });
    }

    // ✅ Move task between goals
    if (activeType === "task" && overType === "goal") {
      const fromGoalId = active.data.current?.goalId;
      const toGoalId = over.id;

      if (fromGoalId === toGoalId) return;

      setGoals((prev) =>
        prev.map((goal) => {
          // Remove task from old goal
          if (goal.id === fromGoalId) {
            return {
              ...goal,
              tasks: goal.tasks.filter((t) => t.id !== active.id),
            };
          }
          // Add to new goal
          if (goal.id === toGoalId && activeTask) {
            return {
              ...goal,
              tasks: [...goal.tasks, { ...activeTask, goalId: toGoalId }],
            };
          }
          return goal;
        })
      );

      toast.success("Task moved successfully ✅");
    }

    setActiveGoal(null);
    setActiveTask(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={goals.map((g) => g.id)}
        strategy={rectSortingStrategy}
      >
        <div
          className={`grid grid-cols-1 min-[996px]:grid-cols-2 xl:grid-cols-3 gap-4 transition-opacity ${
            isPending ? "opacity-60" : ""
          }`}
        >
          {goals.map((goal) => (
            <SortableGoal
              key={goal.id}
              goalInfo={goal}
              priorities={priorities}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeGoal ? (
          <div className="grow-0 shadow-2xl opacity-85 bg-white rounded-xl p-4 transition-transform duration-200">
            <GoalColumn goalInfo={activeGoal} priorities={priorities} />
          </div>
        ) : activeTask ? (
          <div className="grow-0 shadow-lg opacity-70 bg-white rounded-md p-3 w-[250px] transition-transform duration-200">
            <TaskCard priorities={priorities} taskInfo={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function SortableGoal({
  goalInfo,
  priorities,
}: {
  goalInfo: GoalWithTasks;
  priorities: Priority[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: goalInfo.id,
    data: { type: "goal" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : isOver ? 10 : 0,
  };

  const goalClass = clsx(
    "rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-md transition-all duration-300 ease-out",
    "hover:shadow-lg hover:-translate-y-[2px]",
    {
      "cursor-grabbing opacity-90 scale-[0.99] border-primary/60 shadow-xl bg-gradient-to-br from-white via-primary/5 to-primary/10":
        isDragging,
      "border-2 border-rose-400/60 bg-gradient-to-br from-rose-50 to-rose-100 scale-[1.01] shadow-inner":
        isOver && !isDragging,
      "cursor-grab": !isDragging,
    }
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={goalClass}
    >
      <GoalColumn goalInfo={goalInfo} priorities={priorities} />
    </div>
  );
}
