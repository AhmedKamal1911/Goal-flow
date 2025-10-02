"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTaskForm from "./edit-task-form";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function EditTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit cursor-pointer border p-1.5 rounded-sm">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <EditTaskForm title="test" desc="teststststs" />
      </DialogContent>
    </Dialog>
  );
}
