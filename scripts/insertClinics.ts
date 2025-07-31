import mongoose from "mongoose";
import dotenv from "dotenv";
import Clinic from "../src/models/Clinic"; // adjust if path is different
import clinics from "./clinics.json"; // assuming you have data in a JSON file

dotenv.config(); // adjust path if necessary
console.log("Mongo URI:", process.env.MONGODB_URI);
async function insertClinics() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Clinic.insertMany(clinics);
    console.log("Clinics inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting clinics:", error);
    process.exit(1);
  }
}

insertClinics();
