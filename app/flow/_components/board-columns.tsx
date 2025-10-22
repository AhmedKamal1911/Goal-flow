"use client";

import { memo, useEffect, useState, useTransition } from "react";
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
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import clsx from "clsx";
import { useSortable } from "@dnd-kit/sortable";

import { GoalWithTasks } from "@/lib/types/goal";
import { Priority } from "@prisma/client";
import { reorderGoalsAction } from "@/lib/server/actions/goal/reorder-goals-action";
import { GoalColumn } from "./goal/goal-column";

export default function BoardColumns({
  goalsList,
  priorities,
}: {
  goalsList: GoalWithTasks[];
  priorities: Priority[];
}) {
  const [goals, setGoals] = useState(goalsList);
  const [activeGoal, setActiveGoal] = useState<GoalWithTasks | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setGoals(goalsList);
  }, [goalsList]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const goal = goals.find((g) => g.id === active.id);
    setActiveGoal(goal || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = goals.findIndex((g) => g.id === active.id);
    const newIndex = goals.findIndex((g) => g.id === over.id);

    const updatedGoals = [...goals];
    [updatedGoals[oldIndex], updatedGoals[newIndex]] = [
      updatedGoals[newIndex],
      updatedGoals[oldIndex],
    ];

    setGoals(updatedGoals);
    setActiveGoal(null);

    startTransition(async () => {
      const newGoalsOrder = updatedGoals.map((g, index) => ({
        id: g.id,
        order: index + 1,
      }));
      const response = await reorderGoalsAction(newGoalsOrder);
      if (response.status !== "success") toast.error(response.error.statusText);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`grid grid-cols-1 min-[996px]:grid-cols-2 xl:grid-cols-3 gap-4 transition-opacity ${
          isPending ? "opacity-60" : ""
        }`}
      >
        {goals.map((goal) => (
          <MemoizedDraggableGoal
            key={goal.id}
            goalInfo={goal}
            priorities={priorities}
          />
        ))}
      </div>

      {activeGoal && (
        <DragOverlay adjustScale={false}>
          <div
            className="shadow-2xl bg-white rounded-xl p-4 w-[100%] transition-transform duration-200"
            style={{
              maxWidth: "320px",
              transformOrigin: "center",
            }}
          >
            <GoalColumn goalInfo={activeGoal} priorities={priorities} />
          </div>
        </DragOverlay>
      )}
    </DndContext>
  );
}

// 🎯 نسخة محسّنة من DraggableGoal
const DraggableGoal = ({
  goalInfo,
  priorities,
}: {
  goalInfo: GoalWithTasks;
  priorities: Priority[];
}) => {
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
  });

  const style = {
    transform: isDragging ? CSS.Transform.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 50 : 0,
    willChange: "transform", // ✅ تحسين للأداء
  } as React.CSSProperties;

  const goalClass = clsx(
    "rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-md transition-all duration-300 ease-out",
    "hover:shadow-lg hover:-translate-y-[2px]",
    {
      // 🎯 العنصر اللي بيتسحب
      "cursor-grabbing opacity-90 border-primary/60 shadow-xl scale-[1.01] drag-active-glow":
        isDragging,

      // 🔥 العنصر اللي هيتبدل معاه
      "border-2 border-rose-400/70 bg-gradient-to-br from-rose-50 to-rose-100 shadow-inner scale-[1.01] animate-glow":
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
};

const MemoizedDraggableGoal = memo(DraggableGoal);
