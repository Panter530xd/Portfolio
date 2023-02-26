"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn()}
      className=" text-lg text-white bg-teal-500 rounded-md px-6 py-2"
    >
      Sign In
    </button>
  );
}
