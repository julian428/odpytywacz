"use client";

import { signIn, signOut } from "next-auth/react";

interface Props {
  isLoggedIn: boolean;
  loggedIn?: string;
  loggedOut?: string;
}

export default function GoogleSignInButton({
  isLoggedIn,
  loggedIn,
  loggedOut,
}: Props) {
  const login = loggedOut || "login";
  const logout = loggedIn || "logout";

  const loginHandler = async () => {
    if (!isLoggedIn) {
      await signIn("google");
    } else {
      await signOut();
    }
  };
  return <button onClick={loginHandler}>{isLoggedIn ? logout : login}</button>;
}
