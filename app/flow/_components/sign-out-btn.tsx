"use client";

import { useTransition } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/server/actions/auth/sign-out-action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

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
    <DropdownMenuItem
      disabled={isPending}
      variant="destructive"
      onClick={handleSignOut}
    >
      <LogOut />
      {isPending ? "Signing out..." : "Sign out"}
    </DropdownMenuItem>
  );
}
