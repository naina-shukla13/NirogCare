// src/app/api/seed-clinics/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Clinic from "@/models/Clinic";

export async function GET() {
  try {
    await connectToDatabase();

    const existing = await Clinic.find({});
    if (existing.length > 0) {
      return NextResponse.json({ message: "Clinics already seeded" });
    }

    const hospitals = [
     
     {
      name: "Max Super Specialty Hospital",
      specialization: "Cardiology",
      address: "Gomti Nagar, Lucknow",
      phone: "0522-xxxxxxx",
      location: { type: "Point", coordinates: [81.0243433, 26.8505055] },
      city: "Lucknow",
      state: "Uttar Pradesh",
      availableSlots: [
        { date: "2025-08-05", time: "10:00", isBooked: false },
        { date: "2025-08-05", time: "11:00", isBooked: false },
      ],
    },
    {
      name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences",
      specialization: "Neurology",
      address: "Raebareli Road, Lucknow",
      phone: "0522-xxxxx",
      location: { type: "Point", coordinates: [80.94, 26.85] },
      city: "Lucknow",
      state: "Uttar Pradesh",
      availableSlots: [{ date: "2025-08-05", time: "10:00", isBooked: false }],
    },

  {
    name: "King George’s Medical University",
    specialization: "General",
    address: "Chowk, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.9460, 26.8460] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-05", time: "09:00", isBooked: false }]
  },
  {
    name: "RML Institute of Medical Sciences",
    specialization: "Pediatrics",
    address: "Gomti Nagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.9310, 26.8590] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [
      { date: "2025-08-05", time: "10:30", isBooked: false },
      { date: "2025-08-05", time: "11:30", isBooked: false }
    ]
  },
  {
    name: "Dr Gupta’s Skin & Hair Hospital",
    specialization: "Dermatology",
    address: "Hazratganj, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.9450, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [
      { date: "2025-08-06", time: "14:00", isBooked: false }
    ]
  },
  {
    name: "Avadh Hospital & Heart Center",
    specialization: "Cardiology",
    address: "Alambagh, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.94, 26.84] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-06", time: "15:00", isBooked: false }]
  },
  {
    name: "Neera Hospital",
    specialization: "General",
    address: "Mahanagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.96, 26.84] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-06", time: "16:00", isBooked: false }]
  },
  {
    name: "Devishiv Hospital",
    specialization: "Gastroenterology",
    address: "Mahanagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.958, 26.842] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-06", time: "09:00", isBooked: false }]
  },
  {
    name: "Gomti Hospital & Maternity Centre",
    specialization: "Obstetrics",
    address: "Chowk, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.945, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-06", time: "11:00", isBooked: false }]
  },
  {
    name: "Jwala Hospital",
    specialization: "Gynecology",
    address: "Indira Nagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.955, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-07", time: "10:00", isBooked: false }]
  },
  {
    name: "Queen Mary Hospital",
    specialization: "Pediatrics",
    address: "Chowk, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.946, 26.846] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [
      { date: "2025-08-07", time: "14:00", isBooked: false }
    ]
  },
  {
    name: "Sewa Hospital & Research Center",
    specialization: "General",
    address: "Sitapur Road, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.83, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [
      { date: "2025-08-07", time: "09:00", isBooked: false }
    ]
  },
  {
    name: "Apollomedics Super Specialty Hospital",
    specialization: "Orthopedics",
    address: "LDA Colony, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.95, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-07", time: "15:00", isBooked: false }]
  },
  {
    name: "Eye Q Super Specialty",
    specialization: "Ophthalmology",
    address: "Rajajipuram, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.95, 26.837] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-07", time: "10:30", isBooked: false }]
  },
  {
    name: "Mothercare Children’s Hospital",
    specialization: "Pediatrics",
    address: "Gomti Nagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.94, 26.851] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-08", time: "11:00", isBooked: false }]
  },
  {
    name: "Charak Hospital",
    specialization: "Gastroenterology",
    address: "Dubagga, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.92, 26.86] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-08", time: "12:00", isBooked: false }]
  },
  {
    name: "Radius Joint Surgery Hospital",
    specialization: "Orthopedics",
    address: "Gomti Nagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.93, 26.85] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-08", time: "09:00", isBooked: false }]
  },
  {
    name: "Cloudnine Hospital",
    specialization: "Obstetrics",
    address: "Gomti Nagar, Lucknow",
    phone: "0522-xxxxxxx",
    location: { type: "Point", coordinates: [80.936, 26.853] },
    city: "Lucknow",
    state: "Uttar Pradesh",
    availableSlots: [{ date: "2025-08-08", time: "14:00", isBooked: false }]
  }
];


    await Clinic.insertMany(hospitals);

    return NextResponse.json({ message: "Clinics seeded successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to seed clinics", error },
      { status: 500 }
    );
  }
}
