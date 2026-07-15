"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { SiteData } from "@/lib/types";
import LoadingScreen from "./LoadingScreen";
import Hero from "./Hero";
import About from "./About";
import DustParticles, { FloatingHearts } from "./AmbientEffects";
import DecorativeElements from "./DecorativeElements";
import CustomCursor from "./CustomCursor";
import MusicToggle from "./MusicToggle";
import AdminGearButton from "./AdminGearButton";

interface HomeClientProps {
  data: SiteData;
}

export default function HomeClient({ data }: HomeClientProps) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={() => {}} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <DustParticles />
          <FloatingHearts />
          <DecorativeElements />
          <MusicToggle />
          <AdminGearButton />

          <main>
            <Hero profile={data.profile} socials={data.socials} />
            <About profile={data.profile} />
          </main>

          <footer className="relative border-t-2 border-dashed border-pink-primary/40 bg-navy-night py-10 text-center shadow-inner">
            <motion.div
              className="mx-auto mb-3 flex justify-center pointer-events-none select-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/assets/element8.gif"
                alt=""
                width={72}
                height={72}
                unoptimized
                className="h-18 w-18 drop-shadow-[0_0_12px_rgba(255,111,165,0.6)] select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                aria-hidden
              />
            </motion.div>
            <div className="mb-3.5 flex items-center justify-center">
              <motion.div
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-pink-glow/60 bg-gradient-to-r from-pink-primary/20 via-navy-night to-pink-glow/20 px-5 py-1.5 shadow-[0_0_15px_rgba(255,111,165,0.4)] backdrop-blur-md transition-all duration-300 hover:border-pink-glow hover:shadow-[0_0_25px_rgba(255,111,165,0.8)] hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-glow opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-glow drop-shadow-[0_0_6px_rgba(255,111,165,1)]" />
                </span>
                <span className="font-display text-xs sm:text-sm font-extrabold tracking-[0.2em] text-white">
                  WEB BY <span className="bg-gradient-to-r from-pink-glow via-[#ff9ebb] to-white bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,111,165,0.9)]">ArmZ</span>
                </span>
                <span className="text-pink-glow/80 font-mono text-xs">//</span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-pink-cream/90 group-hover:text-white">
                  CRAFTED WITH ♥
                </span>
              </motion.div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-pink-cream/75">
              © {new Date().getFullYear()} {data.profile.displayName} — All rights reserved.
            </p>
          </footer>
        </>
      )}
    </>
  );
}
