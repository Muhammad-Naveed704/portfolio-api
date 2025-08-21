import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 120 },
    email: { type: String, required: true },
    message: { type: String, required: true, minlength: 10, maxlength: 4000 },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);


