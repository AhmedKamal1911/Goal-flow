"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInputField from "@/app/flow/_components/custom-input-field";
import {
  RegisterInputs,
  registerSchema,
} from "@/lib/validation/auth/register-schema";
import { useTransition } from "react";
import { signUpAction } from "@/lib/server/actions/auth/sign-up-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: RegisterInputs) => {
    startTransition(async () => {
      try {
        const registerRes = await signUpAction(values);

        if (registerRes.status === "error") {
          toast.error(registerRes.error.statusText);

          form.setError("root", {
            type: "server",
            message: registerRes.error.statusText,
          });
          return;
        }

        toast.success("Registered Successfully.");
        router.replace("/flow");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("A network error occurred!");
      }
    });
  };

  return (
    <Form {...form}>
      {form.formState.errors.root && (
        <p className="text-center  text-red-500 font-medium mb-5 capitalize">
          {form.formState.errors.root.message}
        </p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInputField
          control={form.control}
          name="name"
          placeholder="John Doe"
          type="text"
        />

        <CustomInputField
          control={form.control}
          name="email"
          placeholder="example@email.com"
          type="email"
        />

        <CustomInputField
          control={form.control}
          name="password"
          placeholder="••••••••"
          type="password"
        />

        <CustomInputField
          control={form.control}
          name="confirmPassword"
          placeholder="••••••••"
          type="password"
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
        >
          {isPending ? "Loading..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
