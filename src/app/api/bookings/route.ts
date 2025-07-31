import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const { clinicId, patientName, date, time } = body;

  try {
    // Optional: Check for double booking
    const existing = await Booking.findOne({ clinicId, date, time });
    if (existing) {
      return NextResponse.json({ message: "Slot already booked" }, { status: 409 });
    }

    const newBooking = await Booking.create({ clinicId, patientName, date, time });
    return NextResponse.json(newBooking, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Booking failed", error: err }, { status: 500 });
  }
}
