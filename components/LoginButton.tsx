"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }
  return <Link href={"/login"}>Login</Link>;
};

export default LoginButton;
