import z from "zod";

export const taskSchema = z.object({
  title: z
    .string({ error: "title is required" })
    .min(1, { error: "task title is required" }),
  desc: z.string().optional(),
  priorityId: z
    .string({ error: "task priority is required" })
    .min(1, { error: "task priority is required" }),
});

export type TaskInputs = z.infer<typeof taskSchema>;
