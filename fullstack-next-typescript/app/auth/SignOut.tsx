"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
type User = {
  image: string;
};
export default function SignOut({ image }: User) {
  return (
    <div className=" flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className=" bg-teal-500 text-white py-2 px-6 rounded-md"
      >
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image
          src={image}
          alt={"user img"}
          width={70}
          height={70}
          className="rounded-full"
        />
      </Link>
    </div>
  );
}
