"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface RetroToastProps {
  message: string;
  type: "success" | "error";
  visible: boolean;
  onClose: () => void;
}

export default function RetroToast({
  message,
  type,
  visible,
  onClose,
}: RetroToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none px-4">
          <motion.div
            className="pointer-events-auto w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 450, damping: 26 }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl border-4 px-6 py-6 shadow-neon backdrop-blur-md ${
                type === "success"
                  ? "border-pink-primary/80 bg-white/95"
                  : "border-red-400 bg-red-50/95"
              }`}
            >
              {/* Retro Window Title Bar */}
              <div className="absolute left-0 right-0 top-0 flex h-7 items-center justify-between bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent px-3">
                <div className="flex items-center gap-1.5 font-display text-xs font-bold text-white tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span>mmmeisa.exe — Notification</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-4 w-4 items-center justify-center rounded bg-pink-deep/80 text-[10px] font-bold text-white hover:bg-red-500"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Toast Message Body */}
              <div className="mt-5 flex flex-col items-center justify-center text-center gap-3 py-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [-6, 6, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Image
                    src="/assets/element2.gif"
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="w-12 h-12 drop-shadow-sm"
                    aria-hidden
                  />
                </motion.div>
                <p className="font-thai text-base sm:text-lg font-bold text-pink-deep drop-shadow-2xs">
                  {message}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-pink-primary/20 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3.2, ease: "linear" }}
                  onAnimationComplete={onClose}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
