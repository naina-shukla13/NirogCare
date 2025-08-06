"use client";

import { useState, useEffect } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
interface HistoryEntry {
  _id: string;
  symptom: string;
  date: string;
  notes?: string;
}

export default function MedicalHistoryForm() {
  const [symptom, setSymptom] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [uid, setUid] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const router = useRouter();

  // ✅ Fetch history entries
  const fetchHistory = async () => {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch("/api/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setHistory(data);
  };

  // ✅ Check auth + fetch history
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);            // ✅ Save uid
        fetchHistory();              // ✅ Load history
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Save a new entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uid) return alert("User not logged in.");

    const token = await auth.currentUser?.getIdToken();

    const res = await fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ symptom, date, notes }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Entry added!");
      setSymptom("");
      setNotes("");
      fetchHistory(); // ✅ refresh list
    } else {
      alert("Failed to save: " + data.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Medical History</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Symptom (e.g. fever, sore throat)"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes (optional)"
          className="w-full border px-4 py-2 rounded"
        ></textarea>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Entry
        </button>
      </form>

      {/* ✅ Show past entries */}
      {history.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">🩺 Your Medical History</h3>
          <ul className="space-y-3">
            {history.map((entry) => (
              <li key={entry._id} className="border p-4 rounded shadow">
                <p><strong>Symptom:</strong> {entry.symptom}</p>
                <p><strong>Date:</strong> {entry.date}</p>
                {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
