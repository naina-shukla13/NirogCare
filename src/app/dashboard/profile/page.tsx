"use client";

import { useEffect, useState } from "react";
import { auth  } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [entryCount, setEntryCount] = useState<number | null>(null);
  const router = useRouter();

  // Fetch auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await currentUser.getIdToken();

        // Fetch user's medical history
        const res = await fetch("/api/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setEntryCount(data.length || 0);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">👤 User Profile</h2>

      {user ? (
        <div className="space-y-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <p><strong>Medical History Entries:</strong> {entryCount !== null ? entryCount : "Loading..."}</p>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading user info...</p>
      )}
    </div>
  );
}
