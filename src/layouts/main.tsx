import Profile from "@/components/layout/profile";
import Link from "next/link";
import { Suspense } from "react";

export default function MainNav() {
  return (
    <nav className="flex lg:justify-around justify-between py-4 px-1 items-center">
      <Link href="/">
        <h1 className="font-black text-2xl">ODPYTYWACZ</h1>
      </Link>
      <section className="flex lg:gap-4 gap-2 items-center">
        <Link href="/quizes">quizy</Link>
        <Link href="/blogs">blogi</Link>
        <Suspense
          fallback={
            <div className="btn btn-circle btn-sm">
              <div className="rounded-full avatar animate-pulse" />
            </div>
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <Profile />
        </Suspense>
      </section>
    </nav>
  );
}
