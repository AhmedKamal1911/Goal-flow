"use client";

import { useState } from "react";
import AddTaskForm from "../task/add-task-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Plus, Settings } from "lucide-react";

export default function GoalOptionsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer p-1 bg-primary text-white rounded transition">
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="capitalize p-1 text-center">
            goal options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="capitalize font-medium text-shadow-primary-foreground cursor-pointer">
            <Edit /> edit goal
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium text-shadow-primary-foreground cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <Plus className="size-4" />
            Add Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddTaskForm
        title="test"
        desc="teststststs"
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
