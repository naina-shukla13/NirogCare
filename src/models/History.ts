import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  symptom: String,
  diagnosis: String,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: String, // optional for now
});

export default mongoose.models.History || mongoose.model("History", HistorySchema);
