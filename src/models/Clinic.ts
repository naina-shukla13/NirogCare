import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialization: {
    type: String,
    required: true,
    enum: ["General", "Cardiology", "ENT", "Dermatology", "Pediatrics", "Orthopedics", "Neurology", "Gastroenterology", "Obstetrics", "Gynecology", "Ophthalmology", "Psychiatry", "Urology", "Oncology"],
  },
  address: { type: String, required: true },
  phone: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  availableSlots: [
    {
      date: { type: String, required: true }, // Consider using Date type
      time: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
    },
  ],
});

ClinicSchema.index({ location: "2dsphere" });

export default mongoose.models.Clinic || mongoose.model("Clinic", ClinicSchema);
