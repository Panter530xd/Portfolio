import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignOut from "./SignOut";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center mx-5 pt-3">
      <Link href={"/"}>Post it.</Link>
      <div>
        {session ? <SignOut image={session.user?.image || ""} /> : <Login />}
      </div>
    </nav>
  );
}
