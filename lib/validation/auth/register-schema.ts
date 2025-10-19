import z from "zod";

// ✅ Schema validation
export const registerSchema = z
  .object({
    name: z
      .string({ error: "The field name must be text, not a number." })
      .min(2, "Name must be at least 2 characters."),
    email: z.email("Please enter a valid email address."),
    password: z
      .string({ error: "The field password must be text, not a number." })
      .min(6, "Password must be at least 6 characters.")
      .superRefine((value, ctx) => {
        const rules = [
          {
            test: /[A-Z]/,
            message: "Must contain at least one uppercase letter.",
          },
          {
            test: /[a-z]/,
            message: "Must contain at least one lowercase letter.",
          },
          { test: /\d/, message: "Must contain at least one number." },
          {
            test: /[!@#$%^&*(),.?":{}|<>]/,
            message: "Must contain at least one special character.",
          },
        ];

        for (const rule of rules) {
          if (!rule.test.test(value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: rule.message,
            });
          }
        }
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterInputs = z.infer<typeof registerSchema>;
