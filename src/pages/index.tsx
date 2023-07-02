import Link from "next/link";
import { text, Button } from "@/components";

export default function Page() {
  return (
    <main className="container mx-auto mt-8 flex flex-col">
      <nav className="flex justify-between items-center">
        <h1 className={text({ variant: "h1" })}>Jikan</h1>
        <Button asChild>
          <Link href="/dashboard/posts">Sign in</Link>
        </Button>
      </nav>
    </main>
  );
}
