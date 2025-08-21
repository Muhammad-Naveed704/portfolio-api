import mongoose from 'mongoose';

export default async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is required');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'portfolio' });
  console.log('MongoDB connected');
}


