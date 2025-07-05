import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import mongoose from 'mongoose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    await connectToDB();

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    await Subscriber.create({ email });

    await resend.emails.send({
      from: 'newsletter@yourdomain.com',
      to: email,
      subject: 'Thanks for subscribing!',
      html: '<p>You are now subscribed to our newsletter! 🎉</p>',
    });

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
