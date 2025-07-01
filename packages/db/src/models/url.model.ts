import mongoose from 'mongoose';
import { CounterModel } from './counter.model';

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: Number,
    unique: true,
  },
});

urlSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const counter = await CounterModel.findByIdAndUpdate(
    { _id: 'url' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.shortId = counter.seq;
  next();
});

export const UrlModel = mongoose.model('Url', urlSchema);