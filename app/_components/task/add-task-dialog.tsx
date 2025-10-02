"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTaskForm from "./add-task-form";

type Props = {};
export default function AddTaskDialog({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit bg-primary cursor-pointer border capitalize">
          add task
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">create task</DialogTitle>
        </DialogHeader>
        <AddTaskForm title="test" desc="teststststs" />
      </DialogContent>
    </Dialog>
  );
}
