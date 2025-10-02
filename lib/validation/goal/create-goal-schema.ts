import z from "zod";

export const createGoalSchema = z.object({
  title: z
    .string({ error: "title requierd" })
    .min(1, { error: "You Must Add a Title" }),
  color: z.string().optional(),
});

export type GoalSchemaInputs = z.infer<typeof createGoalSchema>;
