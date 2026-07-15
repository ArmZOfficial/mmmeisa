"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 247, 250, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}

interface HeartProps {
  delay: number;
  left: string;
  duration: number;
  size: number;
}

function FloatingHeart({ delay, left, duration, size }: HeartProps) {
  return (
    <motion.img
      src="/assets/element2.gif"
      alt=""
      className="pointer-events-none fixed bottom-0 z-[2] opacity-60"
      style={{ left, width: size, height: size }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-20vh", opacity: [0, 0.6, 0.4, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      aria-hidden
    />
  );
}

export function FloatingHearts() {
  const hearts = [
    { delay: 0, left: "10%", duration: 8, size: 24 },
    { delay: 2, left: "25%", duration: 10, size: 20 },
    { delay: 4, left: "45%", duration: 9, size: 28 },
    { delay: 1, left: "65%", duration: 11, size: 22 },
    { delay: 3, left: "80%", duration: 8, size: 26 },
    { delay: 5, left: "90%", duration: 10, size: 18 },
    { delay: 6, left: "35%", duration: 12, size: 24 },
    { delay: 7, left: "55%", duration: 9, size: 20 },
  ];

  return (
    <>
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}
    </>
  );
}
