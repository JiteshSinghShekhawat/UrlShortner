import mongoose from 'mongoose';
import { UrlModel } from './models/url.model';


const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortner';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectToDatabase, UrlModel };