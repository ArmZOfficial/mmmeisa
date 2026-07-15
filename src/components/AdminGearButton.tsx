"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { playClickSound } from "@/lib/sounds";

export default function AdminGearButton() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link
        href="/admin"
        onClick={() => playClickSound()}
        className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-pink-primary/60 bg-pink-soft/95 text-pink-deep shadow-neon-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-pink-glow hover:bg-white hover:shadow-neon"
        aria-label="Admin settings"
        title="Admin settings"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </Link>
    </motion.div>
  );
}
