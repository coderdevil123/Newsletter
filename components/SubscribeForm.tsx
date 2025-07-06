"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export function VanishInput({
  placeholder = "Enter your email",
  onSubmit,
  className,
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
      setValue("");
    }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSubmit();
    };
  
    return (
      <div className={cn("w-full sm:w-96 space-y-2", className)}>
        <motion.input
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
          )}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Subscribe
        </motion.button>
      </div>
    );
  }

export function SubscribeForm() {
  const handleSubscribe = async (email: string) => {
    try {
      const res = await axios.post("/api/subscribe", { email });

      if (res.status === 201) {
        toast.success("Subscribed successfully!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Try again.");
    }
  };
  return (
    <VanishInput
      placeholder="Enter your email"
      onSubmit={handleSubscribe}
      className="my-4"
    />
  );
}

import React from "react";

type SubscribeFormProps = {
  className?: string;
};
