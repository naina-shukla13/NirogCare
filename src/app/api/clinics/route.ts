import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Clinic from "@/models/Clinic";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");
  const specialization = searchParams.get("specialization");

  // If location & specialization provided, run geo-filtered query
  if (!isNaN(lat) && !isNaN(lng) && specialization) {
    const clinics = await Clinic.find({
      specialization: { $regex: new RegExp(specialization, "i") },
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 10000, // 10 km radius
        },
      },
    });

    return NextResponse.json(clinics);
  }

  // Otherwise, return all clinics
  const allClinics = await Clinic.find();
  return NextResponse.json(allClinics);
}
