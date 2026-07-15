"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-pink-soft"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 800);
      }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/element5.gif"
          alt="Loading"
          width={120}
          height={120}
          unoptimized
          priority
        />
      </motion.div>
      <motion.p
        className="mt-6 font-display text-xl text-pink-deep"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        กำลังโหลด...
      </motion.p>
      <div className="mt-4 h-2 w-48 overflow-hidden rounded-full bg-pink-primary/30">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-primary to-pink-glow"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
