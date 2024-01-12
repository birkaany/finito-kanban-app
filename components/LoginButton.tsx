"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }
  return <Button onClick={() => signIn()}>Login</Button>;
};

export default LoginButton;
