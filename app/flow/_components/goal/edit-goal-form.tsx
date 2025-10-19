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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  goalSchema,
  GoalSchemaInputs,
} from "@/lib/validation/goal/create-goal-schema";
import { Input } from "@/components/ui/input";
import { GoalWithTasks } from "@/lib/types/goal";
import { Pen } from "lucide-react";
import { useState, useTransition } from "react";
import { editGoalAction } from "@/lib/server/actions/goal/edit-goal-action";
import { toast } from "sonner";

type Props = {
  goalInfo: GoalWithTasks;
};

export default function EditGoalForm({ goalInfo }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<GoalSchemaInputs>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: goalInfo.name,
      color: goalInfo.color,
    },
  });
  console.log("opend edit");
  // 2. Define a submit handler.
  function onSubmit(values: GoalSchemaInputs) {
    startTransition(async () => {
      try {
        const response = await editGoalAction({
          title: values.title,
          color: values.color,
          goalId: goalInfo.id,
        });

        if (response.status === "success") {
          console.log(response.message);

          toast.success(response.message);
          setOpen(false);
        } else {
          console.error(response.error);
          toast.error(response.error.statusText);
        }
      } catch (error) {
        console.error(error);
        toast.error("A network error occurred!");
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center text-sm gap-2 px-2 py-1.5 text-secondary font-medium hover:bg-secondary/90 hover:text-white  cursor-pointer transition-colors capitalize">
          <Pen className="size-4" />
          edit Goal
        </div>
      </DialogTrigger>

      <DialogContent className="max-sm:py-6 max-sm:px-4">
        <DialogHeader>
          <DialogTitle className="capitalize">edit goal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              <CustomInputField
                control={form.control}
                name="title"
                placeholder={"enter goal title"}
                className="border p-2 rounded"
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize w-fit">Color</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        className="p-0 size-6 rounded-none cursor-pointer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* أزرار */}
              <Button
                disabled={isPending}
                variant={"secondary"}
                className="capitalize cursor-pointer"
              >
                {isPending ? "confirming.." : "confirm"}
              </Button>
            </div>
          </form>
        </Form>
        <DialogDescription className="sr-only">
          dialog for editing goal info
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
