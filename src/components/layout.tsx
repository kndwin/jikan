import { ReactNode } from "react";
import {
  FileTextIcon,
  ExitIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export function Dashboard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  return (
    <main className="flex items-start min-h-screen h-full w-full min-w-screen">
      <nav className="flex flex-col p-4 h-full justify-between w-40 min-h-screen">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <h1 className={"font-semibold"}>Jikan</h1>
          </div>

          <Button
            size="sm"
            variant={"secondary"}
            className="gap-2 w-full justify-start"
          >
            <FileTextIcon />
            Home
          </Button>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size={"icon"}
            className="ml-auto"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant={"secondary"}
            size="sm"
            className="gap-2 w-full justify-start"
          >
            <ExitIcon />
            Logout
          </Button>
        </div>
      </nav>
      <div className="flex-1  h-full min-h-screen">{children}</div>
    </main>
  );
}

export const getDashboardLayout = (page: ReactNode) => (
  <Dashboard>{page}</Dashboard>
);
