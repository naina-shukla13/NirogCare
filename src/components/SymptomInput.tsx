"use client";

import { useState } from "react";

type DiagnosisResponse = {
  diagnosis: string;
  remedy: string;
  precautions: string;
};

export default function SymptomInput() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/symptom-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch diagnosis.");
      }

      const data: DiagnosisResponse = await res.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">AI Symptom Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your symptom..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Check"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">
          <h2 className="text-xl font-semibold text-green-600">Diagnosis</h2>
          <p><strong>Possible Issue:</strong> {result.diagnosis}</p>
          <p><strong>Home Remedy:</strong> {result.remedy}</p>
          <p><strong>Precautions:</strong> {result.precautions}</p>
        </div>
      )}
    </div>
  );
}
