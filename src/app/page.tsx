"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  const signIN = async () => {
    await signIn("google");
  };
  return (
    <>
      <button onClick={signIN}>login</button>
    </>
  );
}
