import { signIn } from "next-auth/react";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import { Account, User as AuthUser } from "next-auth";

export const authOptions: any = {
  providers: [
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials: any) {
    //     await connect();
    //     try {
    //       const user = await User.findOne({ email: credentials.email });
    //       if (user) {
    //         const isPasswordCorrect = await bcrypt.compare(
    //           credentials.password,
    //           user.password
    //         );
    //         if (isPasswordCorrect) {
    //           return user;
    //         }
    //       }
    //     } catch (err: any) {
    //       throw new Error(err);
    //     }
    //   },
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account }: { user: AuthUser; account: Account }) {
  //     if (account?.provider == "credentials") {
  //       return true;
  //     }
  //     if (account.provider == "github") {
  //       await connect();
  //       try {
  //         const existingUser = await User.findOne({ email: user.email });
  //         if (!existingUser) {
  //           const newUser = new User({
  //             email: user.email,
  //           });
  //           await newUser.save();
  //           return true;
  //         }
  //       } catch (err) {
  //         console.log("error saving user", err);
  //       }
  //     }
  //   },
  // },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
