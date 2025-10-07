"use client";

import AddTaskForm from "../task/add-task-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Trash } from "lucide-react";
import EditGoalForm from "./edit-goal-form";
import { GoalWithTasks } from "@/lib/types/goal";

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
import { deleteGoalAction } from "@/lib/server/actions/goal/delete-goal-action";
import { useState } from "react";
import { toast } from "sonner";
import { Priority } from "@prisma/client";
type Props = {
  goalInfo: GoalWithTasks;
  priorities: Priority[];
};
export default function GoalOptionsMenu({ goalInfo, priorities }: Props) {
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

          <DeleteGoalButton goalId={goalInfo.id} />

          <EditGoalForm goalInfo={goalInfo} />

          <AddTaskForm goalId={goalInfo.id} priorities={priorities} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function DeleteGoalButton({ goalId }: { goalId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteGoal() {
    try {
      setIsDeleting(true);

      const response = await deleteGoalAction(goalId);

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
          delete goal
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-sm:py-6 max-sm:px-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the goal
            and all its tasks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={deleteGoal}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? "Confirming.." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
