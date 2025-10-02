"use client";

import EditTaskForm from "./edit-task-form";
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskOptionsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
          <Edit className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="min-w-[160px] rounded-xl shadow-md border border-gray-200 p-1"
          align="end"
        >
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
            Task Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-600 hover:text-white rounded-md cursor-pointer transition-colors">
            <Delete className="size-4" />
            Delete Task
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-600 hover:text-white rounded-md cursor-pointer transition-colors"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <Edit className="size-4" />
            Edit Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskForm
        open={open}
        onOpenChange={setOpen}
        title="test"
        desc="teststststs"
      />
    </>
  );
}
