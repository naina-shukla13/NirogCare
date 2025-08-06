'use client';

import { useEffect, useState } from 'react';
import groupBy from '@/utils/groupBy';

interface HistoryEntry {
  _id: string;
  symptom: string;
  date: string;
  notes?: string;
  careFor: string;
}

export default function HistoryPage() {
  const [symptom, setSymptom] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [careFor, setCareFor] = useState('Self');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptom, date, notes, careFor }),
    });

    if (res.ok) {
      alert('Saved!');
      setSymptom('');
      setNotes('');
      setCareFor('Self');
      setDate(new Date().toISOString().slice(0, 10));
      fetchHistory();
    } else {
      const data = await res.json();
      alert('Error: ' + data.error);
    }
  };

  const fetchHistory = async () => {
    const res = await fetch('/api/history');
    const data: HistoryEntry[] = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Medical History</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Symptom"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          value={careFor}
          onChange={(e) => setCareFor(e.target.value)}
          placeholder="Who is this for? (e.g. Self, Mom, Dad)"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Entry
        </button>
      </form>

      {history.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Your Timeline</h3>
          {Object.entries(groupBy<HistoryEntry>(history, 'careFor') as Record<string, HistoryEntry[]>).map(
            ([person, entries]) => (
              <div key={person} className="mb-6">
                <h4 className="text-lg font-bold mb-2">👤 {person}</h4>
                <ul className="space-y-3">
                  {entries.map((entry) => (
                    <li key={entry._id} className="border p-4 rounded shadow bg-gray-50">
                      <p><strong>Symptom:</strong> {entry.symptom}</p>
                      <p><strong>Date:</strong> {entry.date}</p>
                      {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
