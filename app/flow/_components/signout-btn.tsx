"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/server/actions/auth/sign-out-action";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        const res = await signOutAction();

        if (res.status === "success") {
          toast.success(res.message);
          router.push("/");
          return;
        }

        toast.error(res.error.statusText);
      } catch (error) {
        toast.error("A network error occurred!");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      disabled={isPending}
      className="text-sm font-medium w-full"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
