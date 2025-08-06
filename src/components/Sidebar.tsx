"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4 border-b border-blue-700">
          🏥 NirogCare
        </h2>
        <nav className="flex flex-col mt-4 space-y-2 px-4">
          <Link
            href="/dashboard/profile"
            className="hover:bg-blue-700 px-4 py-2 rounded"
          >
            👤 Profile
          </Link>
          <Link
            href="/dashboard/history"
            className="hover:bg-blue-700 px-4 py-2 rounded"
          >
            📜 Medical History
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
