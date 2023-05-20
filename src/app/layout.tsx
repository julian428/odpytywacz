import MainNav from "@/layouts/main";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ToasterProviders from "@/providers/toast";

export const metadata = {
  title: "Odpytywacz",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <ToasterProviders>
        <body className="bg-color0 text-white min-h-screen">
          <header>
            <MainNav />
          </header>
          <main>{children}</main>
        </body>
      </ToasterProviders>
    </html>
  );
}
