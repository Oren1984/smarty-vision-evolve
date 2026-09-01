import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { SmartyShellProvider } from "@/lib/smarty-shell";
import { ConsoleSidebar } from "@/components/smarty/sidebar";
import { ConsoleTopbar } from "@/components/smarty/topbar";
import { AssistantPanel } from "@/components/smarty/assistant";

export const Route = createFileRoute("/app")({
  component: ConsoleLayout,
});

function ConsoleLayout() {
  const [assistant, setAssistant] = useState(false);

  return (
    <SmartyShellProvider>
      <div className="flex min-h-screen w-full bg-ground">
        <ConsoleSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <ConsoleTopbar onAssistant={() => setAssistant(true)} />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <AssistantPanel open={assistant} onClose={() => setAssistant(false)} />
      </div>
    </SmartyShellProvider>
  );
}
