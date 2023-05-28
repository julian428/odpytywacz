import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/db";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLEAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLEAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (!profile) return false;

      const isUser = await prisma.user.count({
        where: {
          AND: {
            email: profile.email,
            name: profile.name,
          },
        },
      });

      if (isUser < 1) {
        await prisma.user.create({
          data: {
            name: profile.name || "",
            email: profile.email || "",
            image: profile.image || "",
          },
        });
      }

      return true;
    },
    jwt: async ({ token, account, profile }) => {
      if (account) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
          select: {
            id: true,
            type: true,
          },
        });

        token.id = user?.id;
        token.name = profile?.name;
        token.email = profile?.email;
        token.picture = profile?.image;
        token.type = user?.type;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = token.id as string | null | undefined;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.type = token.type as string | null | undefined;
      }
      return session;
    },
  },
};

export default authOptions;
