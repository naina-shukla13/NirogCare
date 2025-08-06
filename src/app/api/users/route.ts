import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { uid, email } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({ uid, email });
    }

    return NextResponse.json({ message: "User saved", user }, { status: 200 });
  } catch (error) {
    console.error("User save error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
