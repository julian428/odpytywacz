"use client";

import type { Session } from "next-auth";
import { ReactNode, createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null);

interface Props {
  session: Session | null;
  children: ReactNode;
}

export default function SessionProvider({ session, children }: Props) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
