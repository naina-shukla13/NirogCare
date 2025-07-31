export async function fetchNearbyClinics(lat: number, lon: number, specialization: string) {
  try {
    const res = await fetch(`/api/clinics?lat=${lat}&lon=${lon}&specialization=${specialization}`);
    const data = await res.json();
    console.log("Fetched clinics from API:", data); // <--- Add this
    return data;
  } catch (err) {
    console.error("Error fetching clinics:", err);
    return [];
  }
}
