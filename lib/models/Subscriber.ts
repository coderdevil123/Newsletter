import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

export const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
