'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        required
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Subscribe
      </button>
      {message && <p className="text-sm text-center text-gray-600">{message}</p>}
    </form>
  );
}
