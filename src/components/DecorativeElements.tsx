"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const decorations = [
  {
    src: "/assets/element8.gif",
    className: "top-8 left-4 sm:left-8 w-16 sm:w-20 opacity-90",
    delay: 0,
  },
  {
    src: "/assets/element7.gif",
    className: "top-16 right-4 sm:right-10 w-14 sm:w-18 opacity-85",
    delay: 0.7,
  },
  {
    src: "/assets/element3.gif",
    className: "bottom-8 left-6 sm:left-12 w-12 sm:w-16 opacity-80",
    delay: 1.4,
  },
];

export default function DecorativeElements() {
  return (
    <>
      {decorations.map((d, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none fixed z-[3] select-none ${d.className} hidden sm:block`}
          animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
          transition={{
            duration: 3.5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image src={d.src} alt="" width={80} height={80} unoptimized draggable={false} onContextMenu={(e) => e.preventDefault()} className="select-none pointer-events-none" aria-hidden />
        </motion.div>
      ))}
    </>
  );
}
