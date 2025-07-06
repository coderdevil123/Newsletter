"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
      "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
      "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
      "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    ];

    return (
      <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
        {/* Main SVG with animated paths */}
        <svg
          className="pointer-events-none absolute h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for the base paths */}
            {paths.map((_, i) => (
              <linearGradient
                id={`linearGradient-${i}`}
                key={`gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop offset="20%" stopColor="#6344F5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#AE48FF" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#6344F5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
              </linearGradient>
            ))}
            
            {/* Beam gradients for animated beams */}
            {paths.map((_, i) => (
              <linearGradient
                id={`beamGradient-${i}`}
                key={`beamGradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#6344F5" stopOpacity="1" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
              </linearGradient>
            ))}
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Base paths - always visible with low opacity */}
          <g>
            {paths.map((path, index) => (
              <motion.path
                key={`base-path-${index}`}
                d={path}
                stroke={`url(#linearGradient-${index})`}
                strokeOpacity="0.2"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>

          {/* Animated beam paths */}
          <g filter="url(#glow)">
            {paths.map((path, index) => (
              <motion.path
                key={`beam-path-${index}`}
                d={path}
                stroke={`url(#beamGradient-${index})`}
                strokeOpacity="0"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, strokeOpacity: 0 }}
                animate={{
                  pathLength: [0, 0.8, 0],
                  strokeOpacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  repeatDelay: Math.random() * 5 + 2,
                }}
              />
            ))}
          </g>
        </svg>

        {/* Additional background elements for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-purple-50/5 to-pink-50/5 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";