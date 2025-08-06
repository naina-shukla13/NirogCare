import mongoose, { Schema, Document, models } from "mongoose";

export interface IMedicalHistory extends Document {
  uid: string; // Firebase UID
  symptom: string;
  date: string;
  notes?: string;
  careFor: string; // NEW: who the log is for
}

const MedicalHistorySchema = new Schema<IMedicalHistory>({
  uid: { type: String, required: true },
  careFor: { type: String, required: true },
  symptom: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String },
});

const MedicalHistory =
  models.MedicalHistory ||
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);

export default MedicalHistory;
