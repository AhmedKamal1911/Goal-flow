"use client";

import CustomInputField from "../custom-input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { Input } from "@/components/ui/input";
import {
  goalSchema,
  GoalSchemaInputs,
} from "@/lib/validation/goal/create-goal-schema";
import { Dispatch, SetStateAction, useTransition } from "react";
import { createGoalAction } from "@/lib/server/actions/goal/create-goal-action";
import { toast } from "sonner";

export default function AddGoalForm({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<GoalSchemaInputs>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      color: "",
    },
  });
  console.log(form.getValues());

  function onSubmit(values: GoalSchemaInputs) {
    startTransition(async () => {
      try {
        const actionRes = await createGoalAction(values);

        if (actionRes.status === "success") {
          console.log("success", actionRes.message);
          setOpenModal(false);
          toast.success(actionRes.message);
        } else {
          toast.error(actionRes.error.statusText);
        }
      } catch (error) {
        console.log(error);
        toast.error("A network error occurred!");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 gap-2 flex flex-col"
      >
        <CustomInputField
          control={form.control}
          name="title"
          placeholder="goal title"
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

        <Button
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="capitalize cursor-pointer"
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
