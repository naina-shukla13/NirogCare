"use client";

import { useEffect, useState } from "react";
import { getUserLocation } from "@/utils/location";
import { fetchNearbyClinics } from "@/utils/fetchClinics";
import BookingModal from "@/components/BookingModal";

interface Clinic {
  _id: string;
  name: string;
  specialization: string;
  address: string;
  phone?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

export default function NearbyClinics({ specialization }: { specialization: string }) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    async function loadClinics() {
      try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        const nearby = await fetchNearbyClinics(latitude, longitude, specialization);
        setClinics(nearby);
      } catch (error) {
        console.error("Error getting clinics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadClinics();
  }, [specialization]);

  if (loading) return <p>Loading nearby clinics...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {clinics.map((clinic) => (
        <div key={clinic._id} className="bg-white shadow p-4 rounded-xl">
          <h3 className="text-xl font-semibold">{clinic.name}</h3>
          <p className="text-sm text-gray-600">{clinic.specialization}</p>
          <p className="text-sm">{clinic.address}</p>
          <p className="text-sm">{clinic.phone || "Phone not available"}</p>
          <div className="flex gap-2 mt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${clinic.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              View on Map
            </a>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                setSelectedClinic({ id: clinic._id, name: clinic.name });
                setShowModal(true);
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      ))}

      {showModal && selectedClinic && (
        <BookingModal
          clinicId={selectedClinic.id}
          clinicName={selectedClinic.name}
          closeModalAction={() => {
            setShowModal(false);
            setSelectedClinic(null);
          }}
        />
      )}
    </div>
  );
}
