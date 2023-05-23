import "./globals.css";
import MainNav from "@/layouts/main";
import { ReactNode } from "react";
import ToasterProviders from "@/providers/toast";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Odpytywacz",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl">
      <ToasterProviders>
        <body className="bg-color0 text-white min-h-screen scroll-smooth">
          <header>
            <MainNav />
          </header>
          <main>{children}</main>
        </body>
      </ToasterProviders>
    </html>
  );
}
