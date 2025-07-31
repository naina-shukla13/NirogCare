"use client";

import { useState } from "react";

interface BookingModalProps {
  clinicId: string;
  clinicName: string;
  closeModalAction: () => void; // ✅ renamed to follow convention
}

export default function BookingModal({ clinicId, clinicName, closeModalAction }: BookingModalProps) {
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  async function handleBooking() {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clinicId, patientName, date, time }),
    });

    if (res.status === 201) {
      setStatus("✅ Booking successful!");
    } else if (res.status === 409) {
      setStatus("⚠️ Slot already booked.");
    } else {
      setStatus("❌ Booking failed.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Book at {clinicName}</h2>
        <input
          className="w-full border px-3 py-2 mb-2 rounded"
          placeholder="Your name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="date"
          className="w-full border px-3 py-2 mb-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="w-full border px-3 py-2 mb-2 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={handleBooking}
          className="w-full bg-green-600 text-white py-2 mt-2 rounded"
        >
          Confirm Booking
        </button>
        <p className="text-sm text-gray-700 mt-2">{status}</p>
        <button
          onClick={closeModalAction}
          className="w-full text-red-500 mt-4 underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
