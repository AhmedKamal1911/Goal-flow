"use client";

import CustomInputField from "../custom-input-field";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { TaskInputs, taskSchema } from "@/lib/validation/task/task";
import { Priority } from "@prisma/client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { editTaskAction } from "@/lib/server/actions/task/edit-task-action";
import { TaskWithPriority } from "@/lib/types/task";

export default function EditTaskForm({
  priorities,
  taskInfo,
}: {
  priorities: Priority[];
  taskInfo: TaskWithPriority;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<TaskInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: taskInfo.name,
      desc: taskInfo.desc ?? undefined,
      priorityId: taskInfo.priorityId,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(inputs: TaskInputs) {
    startTransition(async () => {
      try {
        const response = await editTaskAction({ inputs, taskId: taskInfo.id });
        if (response.status === "success") {
          toast.success(response.message);
          setOpenModal(false);
          form.reset();
        } else {
          toast.error(response.error.statusText);
        }
      } catch (error) {
        console.error(error);
        toast.error("A network error occurred!");
      } finally {
        setOpenModal(false);
      }
    });
  }
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <div className="flex items-center text-sm gap-2 px-2 py-1.5 text-primary font-medium hover:bg-primary/90 hover:text-white cursor-pointer transition-colors capitalize">
          <Edit className="size-4" />
          edit task
        </div>
      </DialogTrigger>
      <DialogContent className="max-sm:py-6 max-sm:px-4">
        <DialogHeader>
          <DialogTitle className="capitalize">create task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              <CustomInputField
                control={form.control}
                name="title"
                placeholder={"enter task title"}
                className="border p-2 rounded"
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize w-fit">
                      description
                    </FormLabel>
                    <Textarea
                      className="max-h-[300px]"
                      placeholder="Enter task description"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priorityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize w-fit">priority</FormLabel>
                    <Select
                      defaultValue={taskInfo.priorityId}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.id} value={priority.id}>
                            {priority.icon}
                            <span style={{ color: priority.color }}>
                              {priority.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                variant={"secondary"}
                className="capitalize cursor-pointer"
              >
                {isPending ? "Confirming..." : "confirm"}
              </Button>
            </div>
          </form>
        </Form>
        <DialogDescription className="sr-only">
          dialog for adding task
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
