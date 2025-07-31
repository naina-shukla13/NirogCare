// src/app/api/test-mongo/route.ts
import { connectToDatabase } from '@/lib/mongodb'; // ✅ Correct import
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    return NextResponse.json(
      { error: 'MongoDB connection failed', details: String(error) },
      { status: 500 }
    );
  }
}
