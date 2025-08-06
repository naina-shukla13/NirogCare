import { NextRequest, NextResponse } from "next/server";
import { adminApp, getAuth } from "@/utils/firebaseAdmin";
import { connectToDatabase } from "@/lib/mongodb";
import MedicalHistory, { IMedicalHistory } from "@/models/MedicalHistory";

// Connect to MongoDB once on cold start
await connectToDatabase();

// 🔐 Verify Firebase Token from headers
async function verifyUser(req: NextRequest): Promise<string> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (!token) throw new Error("Missing or invalid token");

  // ✅ Use getAuth(adminApp) — adminApp is required for verification
  const decodedToken = await getAuth(adminApp).verifyIdToken(token);
  return decodedToken.uid;
}

// 📥 GET: Fetch medical history for logged-in user
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const uid = await verifyUser(req);

    const entries: IMedicalHistory[] = await MedicalHistory.find({ uid }).sort({ date: -1 });

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("GET /api/history error:", message);
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

// 📝 POST: Save a new medical history entry
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const uid = await verifyUser(req);
    const body = await req.json();

    const {
      symptom,
      date,
      notes,
      careFor,
    }: {
      symptom: string;
      date: string;
      notes?: string;
      careFor: string;
    } = body;

    if (!symptom || !date || !careFor) {
      return NextResponse.json(
        { error: "Missing required fields: symptom, date, or careFor" },
        { status: 400 }
      );
    }

    const newEntry = await MedicalHistory.create({
      uid,
      symptom,
      date,
      notes,
      careFor,
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("POST /api/history error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
