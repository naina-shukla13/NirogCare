import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getAuth, adminApp } from "@/utils/firebaseAdmin";
import User from "@/models/User";
import MedicalHistory from "@/models/MedicalHistory";

// Connect to DB
await connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const history = await MedicalHistory.find({ userId: user._id }).sort({ date: -1 });

    return NextResponse.json(history);
  } catch (err) {
    console.error("GET /api/history error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const user = await User.findOne({ uid: firebaseUid });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { symptom, date, notes } = await req.json();

    const newEntry = new MedicalHistory({
      userId: user._id,
      symptom,
      date,
      notes,
    });

    await newEntry.save();

    return NextResponse.json({ message: "Saved!" }, { status: 201 });
  } catch (err) {
    console.error("POST /api/history error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
