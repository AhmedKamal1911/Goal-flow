"use client";

import EditTaskForm from "./edit-task-form";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteTaskAction } from "@/lib/server/actions/task/delete-task-action";

import { Priority } from "@prisma/client";
import { TaskWithPriority } from "@/lib/types/task";

export default function TaskOptionsMenu({
  taskInfo,
  priorities,
}: {
  taskInfo: TaskWithPriority;
  priorities: Priority[];
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
          <Edit className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          onPointerDown={(e) => e.stopPropagation()}
          className="min-w-[160px] rounded-md shadow-md border border-gray-200 p-1"
          align="end"
        >
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
            Task Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DeleteTaskButton taskId={taskInfo.id} />

          <EditTaskForm priorities={priorities} taskInfo={taskInfo} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function DeleteTaskButton({ taskId }: { taskId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteGoal() {
    try {
      setIsDeleting(true);

      const response = await deleteTaskAction(taskId);

      if (response.status === "success") {
        console.log(response.message);

        toast.success(response.message);
      } else {
        console.error(response.error);
        toast.error(response.error.statusText);
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("A network error occurred!");
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-600 hover:text-white  cursor-pointer transition-colors capitalize">
          <Trash className="size-4" />
          delete task
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-sm:py-6 max-sm:px-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={deleteGoal}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting.." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
