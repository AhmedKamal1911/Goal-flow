"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInputField from "@/app/flow/_components/custom-input-field";
import { LoginInputs, loginSchema } from "@/lib/validation/auth/login-schema";
import { useTransition } from "react";
import { signInAction } from "@/lib/server/actions/auth/sign-in-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInputs) {
    startTransition(async () => {
      try {
        const loginResponse = await signInAction(values);
        if (loginResponse.status === "success") {
          toast.success(loginResponse.message);
          router.replace("/flow");
          return;
        }
        toast.error(loginResponse.error.statusText);
        form.setError("root", {
          type: "server",
          message: loginResponse.error.statusText,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("A network error occurred!");
      }
    });
    console.log("✅ Submitted values:", values);
  }

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
          name="email"
          placeholder="example@email.com"
          type="email"
          className="p-3"
        />

        <CustomInputField
          control={form.control}
          name="password"
          placeholder="••••••••"
          type="password"
          className="p-3"
        />

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
