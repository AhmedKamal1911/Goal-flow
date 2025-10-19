import { AppSidebar } from "@/components/common/app-side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function FlowLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <header className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm sticky top-0 z-20">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Goal Flow</h1>
          </header>

          <div className="flex-1 overflow-hidden">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
