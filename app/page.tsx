"use client";

import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { VanishInput } from "@/components/ui/VanishInput";

export default function Home() {
  const placeholders = [
    "Enter your email address",
    "Get the latest updates", 
    "Subscribe to our newsletter",
    "Stay informed with us",
    "Join our community",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = async (email: string) => {
  console.log("Sending email to API:", email);

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error calling /api/subscribe:", error);
  }
};


  return (
    <div className="min-h-screen w-full bg-black relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <BackgroundBeams />
      
      {/* Enhanced beam effects */}
      {/* Enhanced beam effects */}
      {/* Enhanced beam effects */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-80"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="30%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Moving diagonal beams */}
          <path
            d="M-10 10 L 110 40"
            stroke="url(#beam1)"
            strokeWidth="0.2"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M-10 25 L 110 55"
            stroke="url(#beam1)"
            strokeWidth="0.25"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="7s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M-10 40 L 110 70"
            stroke="url(#beam1)"
            strokeWidth="0.2"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M-10 55 L 110 85"
            stroke="url(#beam1)"
            strokeWidth="0.25"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="9s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M-10 70 L 110 100"
            stroke="url(#beam1)"
            strokeWidth="0.2"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M-10 85 L 110 115"
            stroke="url(#beam1)"
            strokeWidth="0.15"
            fill="none"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-120 0; 120 0; -120 0"
              dur="11s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      <div className="max-w-2xl mx-auto p-4 relative z-20">
        <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-4">
          Join Our Newsletter
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center mb-8">
          Subscribe to get the latest updates directly in your inbox.
        </p>
        <VanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}