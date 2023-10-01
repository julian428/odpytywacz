import Profile from "@/components/layout/profile";
import Link from "next/link";
import { Suspense } from "react";
import Script from "next/script";

export default function MainNav() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        crossOrigin="anonymous"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4380127333839117"
      />
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
    </>
  );
}
