import { Goal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import Link from "next/link";

import { getServerSession } from "@/lib/server/utils";
import { redirect } from "next/navigation";
import { NavUser } from "./nav-user";

export async function AppSidebar() {
  const session = await getServerSession();
  if (!session) redirect("/");
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href={"/"} className="mx-auto">
          <Goal className="text-primary size-8" />
        </Link>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
