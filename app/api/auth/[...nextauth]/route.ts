import { signIn } from "next-auth/react";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/prisma/prisma";
import { Session } from "next-auth";

export const authOptions: any = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({
      session,
    }: {
      session: Session & { user: { id?: string } };
    }) {
      if (session.user && session.user.email) {
        const sessionUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        session.user.id = sessionUser?.id?.toString();
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
