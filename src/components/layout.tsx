import { ReactNode } from "react";
import { FileTextIcon, ExitIcon, CalendarIcon } from "@radix-ui/react-icons";

import { text, Button } from "@/components";
import { useRouter } from "next/router";

export function Dashboard({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <main className="flex items-start min-h-screen h-full w-full min-w-screen">
      <nav className="flex flex-col p-4 h-full justify-between w-40 min-h-screen">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <h1 className={"font-semibold"}>Jikan</h1>
          </div>

          <Button variant={"secondary"} className="gap-2 w-full justify-start">
            <FileTextIcon />
            Home
          </Button>
        </div>

        <Button
          onClick={() => router.push("/")}
          variant={"default"}
          className="gap-2"
        >
          <ExitIcon />
          Logout
        </Button>
      </nav>
      <div className="flex-1 bg-stone-50 h-full min-h-screen">{children}</div>
    </main>
  );
}

export const getDashboardLayout = (page: ReactNode) => (
  <Dashboard>{page}</Dashboard>
);
