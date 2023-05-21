import MainNav from "@/layouts/main";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ToasterProviders from "@/providers/toast";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export const metadata = {
  title: "Odpytywacz",
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <ToasterProviders>
        <body className="bg-color0 text-white min-h-screen scroll-smooth">
          <header>
            <MainNav isLoggedIn={Boolean(session?.user?.id)} />
          </header>
          <main>{children}</main>
        </body>
      </ToasterProviders>
    </html>
  );
}
