import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
