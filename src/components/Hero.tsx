"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Profile, SocialLink } from "@/lib/types";
import SocialButtons from "./SocialButtons";
import { playClickSound } from "@/lib/sounds";

interface HeroProps {
  profile: Profile;
  socials: SocialLink[];
}

export default function Hero({ profile, socials }: HeroProps) {
  const bgUrl = profile.backgroundUrl || "/assets/Bg.png";
  const avatarUrl = profile.avatarUrl || "/assets/Vtuber.png";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-24">
      {/* Background with soothing overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-pink-soft/30 via-pink-soft/10 to-pink-soft/85" />
      <div className="absolute inset-0 bg-[radial-gradient(#F7A8C0_1px,transparent_1px)] [background-size:22px_22px] opacity-35 pointer-events-none" />

      {/* Wide Horizontal Soothing Retro Window Card (Image 1 + Image 2 Hybrid) */}
      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Scrapbook stickers pinned on outer corners */}
        <motion.div
          className="absolute -top-10 -left-6 sm:-left-8 z-30 pointer-events-none select-none"
          animate={{ rotate: [-6, 0, -6], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image src="/assets/element1.gif" alt="" width={96} height={96} unoptimized className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md select-none pointer-events-none" draggable={false} onContextMenu={(e) => e.preventDefault()} aria-hidden />
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -right-4 sm:-right-8 z-30 pointer-events-none select-none"
          animate={{ rotate: [10, 16, 10], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image src="/assets/element3.gif" alt="" width={72} height={72} unoptimized className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm select-none pointer-events-none" draggable={false} onContextMenu={(e) => e.preventDefault()} aria-hidden />
        </motion.div>

        {/* Retro OS Window Title Bar (Image 2 style) */}
        <div className="flex items-center justify-between rounded-t-[2.5rem] border-2 border-b-0 border-pink-deep/30 bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent px-6 py-3 shadow-md">
          <div className="flex items-center gap-2.5 text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-white shadow-inner opacity-90" />
            <span className="font-display text-sm sm:text-base font-bold tracking-wider drop-shadow-sm">
              {profile.heroWindowTitle || "mmmeisa_profile.exe"}
            </span>
            <span className="ml-2 hidden rounded-full bg-white/25 px-2.5 py-0.5 font-sans text-xs font-medium tracking-wide text-white sm:inline-block">
              {profile.heroStatusLabel || "● ONLINE — LIVE STREAMING STUDIO"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: 10 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/30 text-xs font-bold text-white transition hover:bg-white hover:text-pink-deep"
              title="Minimize"
            >
              _
            </motion.button>
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: -10 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/30 text-xs font-bold text-white transition hover:bg-white hover:text-pink-deep"
              title="Maximize"
            >
              □
            </motion.button>
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: 90 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-deep/80 text-xs font-bold text-white transition hover:bg-red-500"
              title="Close"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Inner Wide Card Content (Clean Opaque White Background) */}
        <div className="relative rounded-b-[2.5rem] border-4 border-t-0 border-white bg-white p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(255,140,180,0.35)] overflow-hidden">
          {/* Gentle white stationery grid inside the card */}
          <div className="absolute inset-0 bg-[radial-gradient(#F7A8C0_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

          {/* Subtle decorative pastel cloud shapes inside corners */}
          <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-[#FFF5F8] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[#FFF8FA] blur-2xl pointer-events-none" />

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Script Name, Bio, Badges & Socials (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left z-10">
              {/* Top status tag */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-primary/40 bg-[#FFF5F8] px-3.5 py-1 font-sans text-xs sm:text-sm font-medium tracking-wide text-pink-deep shadow-2xs">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <span>{profile.heroTopBadge || "LIVE STREAMER • THAI VTUBER"}</span>
              </div>

              {/* Soothing Elegant Script Name (Image 1 feel) */}
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3">
                <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl font-bold text-pink-deep tracking-normal drop-shadow-sm">
                  {profile.displayName}
                </h1>
              </div>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap justify-center lg:justify-start gap-2.5">
                {(profile.heroBadges
                  ? profile.heroBadges.split(",").map((s) => s.trim()).filter(Boolean)
                  : ["#CozyGamer", "#Chat&Chill", "#ThaiVTuber"]
                ).map((badge, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, y: -3, backgroundColor: "#FF6FA5", color: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playClickSound()}
                    className="rounded-full bg-[#FFF5F8] px-3.5 py-1 font-sans text-xs font-medium tracking-wide text-pink-deep border border-pink-primary/30 shadow-2xs cursor-pointer transition-colors"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              {/* Soothing Tagline */}
              <motion.div
                className="mt-4 max-w-lg rounded-2xl border border-pink-primary/30 bg-[#FFF5F8]/80 p-4 shadow-inner transition-all duration-300 hover:border-pink-glow hover:bg-white hover:shadow-neon-sm cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => playClickSound()}
              >
                <p className="font-thai text-base sm:text-lg leading-relaxed text-navy-night/85 whitespace-pre-line">
                  {profile.tagline}
                </p>
              </motion.div>

              {/* Social Buttons below on left */}
              <div className="mt-6 w-full pt-4 border-t border-dashed border-pink-primary/30">
                <div className="mb-2.5 flex items-center justify-between font-sans text-xs tracking-wider uppercase text-navy-night/60 font-semibold">
                  <span>OFFICIAL CHANNELS • ช่องทางการติดตาม</span>
                  <span className="text-pink-deep font-mono">SELECT ↘</span>
                </div>
                <SocialButtons socials={socials} />
              </div>
            </div>

            {/* Right Column: Full VTuber Showcase (5 cols - Image 1 style) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px] w-full max-w-[380px] mx-auto z-10">
              {/* Dreamy Cloud / Aura background behind avatar */}
              <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#FFF5F8] via-white to-white blur-xl -z-10 shadow-inner" />
              <div className="absolute inset-0 m-auto w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-pink-primary/30 -z-10 animate-[spin_40s_linear_infinite]" />

              {/* VTuber Large Character Portrait / Avatar */}
              <motion.div
                className="relative flex items-center justify-center select-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onContextMenu={(e) => e.preventDefault()}
              >
                <div
                  className="relative overflow-hidden rounded-[3rem] border-4 border-pink-primary/40 shadow-2xl bg-gradient-to-t from-[#FFF5F8] to-white p-2 select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={avatarUrl}
                    alt={profile.displayName}
                    width={320}
                    height={380}
                    className="h-72 sm:h-96 md:h-[400px] w-auto max-w-full object-cover object-top rounded-[2.5rem] select-none pointer-events-none"
                    priority
                    draggable={false}
                    unoptimized={avatarUrl.startsWith("http") || avatarUrl.startsWith("/uploads")}
                  />
                </div>

                {/* Floating tag next to VTuber */}
                <motion.div
                  className="absolute -bottom-4 -left-4 sm:-left-6 z-20 bg-white rounded-2xl px-3.5 py-2 shadow-md border border-pink-primary/30 flex items-center gap-2 font-display text-xs font-bold tracking-wide text-pink-deep select-none"
                  animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-primary" />
                  <span>{profile.avatarTag || "@mmmeisa.vtuber"}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Marquee / Status Banner inside card footer */}
          <motion.div
            className="mt-8 flex items-center gap-2.5 rounded-2xl border border-pink-primary/40 bg-[#FFF5F8] px-4 py-2.5 font-thai text-xs sm:text-sm text-pink-deep relative z-10 transition-all duration-300 hover:border-pink-glow hover:bg-white hover:shadow-neon-sm cursor-pointer"
            whileHover={{ scale: 1.015, y: -2 }}
            onClick={() => playClickSound()}
          >
            <span className="shrink-0 font-bold tracking-wide uppercase font-sans text-xs">STATUS :</span>
            <p className="truncate font-medium text-navy-night/85">
              {profile.statusBannerText || "ยินดีต้อนรับเข้าสู่สตูดิโอสีชมพูของ mmmeisa (เมล เมลิส) ฝากติดตามและมาคุยเล่นกันในไลฟ์สตรีมได้เลยค๊าบ"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
