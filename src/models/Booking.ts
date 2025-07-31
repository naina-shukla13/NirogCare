import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  patientName: { type: String, required: true },
  date: { type: String, required: true }, // or Date type
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
