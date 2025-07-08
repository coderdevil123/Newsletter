import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import { connectToDB } from '@/lib/db'; // Make sure this file exists and works

// Define Mongoose Schema
const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

// Reuse model if it exists (important for hot reloads in dev)
const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

// POST /api/subscribe
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDB();

    // Check if already subscribed
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    // Save subscriber to DB
    await Subscriber.create({ email });

    // Send welcome email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'newsletter@yourdomain.com', // Replace with a verified domain if needed
      to: email,
      subject: 'Thanks for subscribing!',
      html: '<p>You are now subscribed to our newsletter! 🎉</p>',
    });

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (err) {
    console.error('Error in POST /api/subscribe:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
