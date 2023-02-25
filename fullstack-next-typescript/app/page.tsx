import Link from "next/link";

export default function Home() {
  return (
    <main className="py-4 px-48">
      <Link
        className="bg-teal-500 text-white px-4 py-2 rounded-md font-semibold"
        href="/dashboard"
      >
        Go to the dashboard
      </Link>
    </main>
  );
}
