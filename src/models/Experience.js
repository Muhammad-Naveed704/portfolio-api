import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    period: { type: String, required: true },
    logo: { type: String },
    bullets: { type: [String], default: [] },
    location: { type: String },
    website: { type: String },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);


