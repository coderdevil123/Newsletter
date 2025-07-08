import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import { connectToDB } from '@/lib/db';

// Define Mongoose Schema
const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

// Reuse model to avoid OverwriteModelError in dev
const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Received POST /api/subscribe body:", body);

    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.error("❌ Invalid email received:", email);
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDB();

    // Check if email already subscribed
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      console.log("ℹ️ Email already subscribed:", email);
      return NextResponse.json({ message: 'Already subscribed' });
    }

    // Save subscriber to DB
    await Subscriber.create({ email });
    console.log("✅ Email saved to DB:", email);

    // Send welcome email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'newsletter@yourdomain.com', // Make sure this domain is verified on Resend
      to: email,
      subject: 'Thanks for subscribing!',
      html: '<p>You are now subscribed to our newsletter! 🎉</p>',
    });

    console.log("📨 Welcome email sent to:", email);
    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (err) {
    console.error('🔥 Error in POST /api/subscribe:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
