"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Profile } from "@/lib/types";
import { playClickSound } from "@/lib/sounds";

interface AboutProps {
  profile: Profile;
}

const deskProps = [
  {
    src: "/assets/Keyboard_Day.png",
    alt: "Pink Keyboard",
    className: "left-[3%] top-[12%] w-24 sm:w-32 rotate-[-8deg] drop-shadow-md",
    delay: 0,
  },
  {
    src: "/assets/Mouse_Day.png",
    alt: "Gaming Mouse",
    className: "right-[5%] top-[16%] w-16 sm:w-24 rotate-[12deg] drop-shadow-md",
    delay: 0.3,
  },
  {
    src: "/assets/Milk_Day.png",
    alt: "Strawberry Milk",
    className: "left-[8%] bottom-[14%] w-16 sm:w-22 rotate-[6deg] drop-shadow-md",
    delay: 0.6,
  },
  {
    src: "/assets/Books_Day.png",
    alt: "Manga Books",
    className: "right-[8%] bottom-[18%] w-20 sm:w-28 rotate-[-10deg] drop-shadow-md",
    delay: 0.9,
  },
  {
    src: "/assets/Plant_Pot_Day.png",
    alt: "Desk Plant",
    className: "right-[18%] top-[38%] w-18 sm:w-24 rotate-[4deg] drop-shadow-md hidden lg:block",
    delay: 1.2,
  },
];

export default function About({ profile }: AboutProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-soft/90 via-pink-cream to-pink-soft py-24 px-4">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#F7A8C0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* Desk Props around the notepad */}
      {deskProps.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute z-[2] cursor-pointer ${p.className}`}
          animate={{ y: [0, -8, 0], rotate: p.className.includes("rotate-[-") ? [-8, -4, -8] : [8, 12, 8] }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          whileHover={{ scale: 1.15, rotate: 0 }}
          onClick={() => playClickSound()}
          title={p.alt}
        >
          <Image src={p.src} alt={p.alt} width={128} height={128} className="w-full h-auto" />
        </motion.div>
      ))}

      {/* Diary Notepad Window */}
      <motion.div
        className="relative z-10 mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Washi Tape Sticker corner */}
        <motion.div
          className="absolute -top-6 -left-4 z-30 hidden sm:block pointer-events-none select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image src="/assets/element7.gif" alt="" width={56} height={56} unoptimized className="w-14 h-14 drop-shadow-md rotate-[-15deg] select-none pointer-events-none" draggable={false} onContextMenu={(e) => e.preventDefault()} aria-hidden />
        </motion.div>

        {/* Notepad Title Bar */}
        <div className="flex items-center justify-between rounded-t-2xl border-2 border-b-0 border-pink-deep/40 bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent px-4 py-2.5 shadow-md">
          <div className="flex items-center gap-2 text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-white shadow-inner opacity-90 animate-pulse" />
            <span className="font-display text-sm sm:text-base font-bold tracking-wide drop-shadow-sm">
              {profile.notepadTitle || "mmmeisa_diary.txt — Notepad"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: 10 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-5 w-5 items-center justify-center rounded bg-white/30 text-[10px] font-bold text-white transition hover:bg-white hover:text-pink-deep"
              title="Minimize"
            >
              _
            </motion.button>
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: -10 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-5 w-5 items-center justify-center rounded bg-white/30 text-[10px] font-bold text-white transition hover:bg-white hover:text-pink-deep"
              title="Maximize"
            >
              □
            </motion.button>
            <motion.button
              type="button"
              onClick={() => playClickSound()}
              whileHover={{ scale: 1.25, rotate: 90 }}
              whileTap={{ scale: 0.85 }}
              className="flex h-5 w-5 items-center justify-center rounded bg-pink-deep/80 text-[10px] font-bold text-white transition hover:bg-red-500"
              title="Close"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Notepad Paper Content */}
        <div className="relative rounded-b-2xl border-2 border-t-0 border-pink-deep/40 bg-white/95 p-6 sm:p-10 shadow-[0_12px_0_rgba(232,105,140,0.25)] backdrop-blur-lg transition-all duration-300 hover:shadow-[0_18px_25px_rgba(255,111,165,0.3)]">
          {/* Metadata stamp */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-pink-primary/30 pb-4 font-sans text-xs sm:text-sm text-navy-night/60 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-pink-deep uppercase tracking-wider text-xs">Location:</span>
              <span>{profile.aboutLocation || "Pink Room Studio"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-pink-deep uppercase tracking-wider text-xs">Last Updated:</span>
              <span>{profile.aboutLastUpdated || "Live Profile"}</span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6 flex items-center justify-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-pink-deep transition-transform duration-300 hover:scale-105">
              {profile.aboutHeading || "เกี่ยวกับ mmmeisa"} <span className="ml-1 text-base sm:text-lg font-normal text-navy-night/50 font-sans">{profile.aboutSubHeading || "(About Me)"}</span>
            </h2>
          </div>

          {/* Biography content styled as diary paper with interactive hover */}
          <motion.div
            className="rounded-2xl border border-pink-primary/40 bg-pink-soft/50 p-5 sm:p-6 shadow-inner transition-all duration-300 hover:border-pink-glow hover:bg-white hover:shadow-neon-sm cursor-pointer"
            whileHover={{ scale: 1.015, y: -2 }}
            onClick={() => playClickSound()}
          >
            <p className="font-thai text-center text-base sm:text-lg leading-relaxed text-navy-night/85 whitespace-pre-line">
              {profile.bio}
            </p>
          </motion.div>

          {/* Diary sign-off */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-dashed border-pink-primary/40 pt-6 sm:flex-row">
            <div className="font-thai text-sm text-pink-deep/90 italic">
              {profile.diaryQuote || '"มาร่วมสร้างความทรงจำดีๆ ไปด้วยกันในสตูดิโอสีชมพูแห่งนี้นะคะ ขอบคุณทุกคนที่คอยซัพพอร์ตกันเสมอค๊าบ"'}
            </div>
            <div className="font-display text-lg font-bold text-pink-deep">
              {profile.diarySignature || "— mmmeisa"}
            </div>
          </div>

          {/* Mascot sitting on the bottom right corner */}
          <motion.div
            className="absolute -bottom-10 -right-6 z-20 pointer-events-none select-none"
            animate={{ y: [0, -6, 0], rotate: [6, 10, 6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src="/assets/element6.gif"
              alt=""
              width={112}
              height={112}
              unoptimized
              className="w-24 sm:w-28 h-auto drop-shadow-md select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              aria-hidden
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
