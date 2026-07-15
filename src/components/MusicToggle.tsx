/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playClickSound } from "@/lib/sounds";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

const YOUTUBE_VIDEO_ID = "7PvYu-1iEbY"; // https://www.youtube.com/watch?v=7PvYu-1iEbY

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desiredPlayRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;

    // Dynamically load the YouTube IFrame Player API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current || !container) return;
      
      // Create a dedicated inner DOM node so YT.Player replacement doesn't break React DOM tree
      const targetDiv = document.createElement("div");
      container.innerHTML = "";
      container.appendChild(targetDiv);

      playerRef.current = new window.YT.Player(targetDiv, {
        height: "1",
        width: "1",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(10); // Exactly 10% volume as requested!
            setIsReady(true);
            if (desiredPlayRef.current) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // Loop playback if ended
            if (event.data === 0 && playerRef.current) {
              try {
                playerRef.current.playVideo();
              } catch {}
            }
          },
        },
      });
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {}
      }
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  const toggle = () => {
    playClickSound();
    const nextState = !playing;
    setPlaying(nextState);
    desiredPlayRef.current = nextState;

    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      if (nextState) {
        try {
          playerRef.current.setVolume(10); // Ensure 10% volume every time it plays
          playerRef.current.playVideo();
        } catch {}
      } else {
        try {
          playerRef.current.pauseVideo();
        } catch {}
      }
    }
  };

  return (
    <>
      {/* Stable React Container for YouTube IFrame */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-[1px] w-[1px] overflow-hidden opacity-0"
        aria-hidden
      />

      {/* Music Toggle Floating Button */}
      <motion.button
        type="button"
        onClick={toggle}
        className={`group fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 md:left-6 md:top-6 ${
          playing
            ? "border-pink-glow bg-white shadow-neon scale-105"
            : "border-pink-primary/60 bg-pink-soft/95 shadow-neon-sm hover:border-pink-glow hover:bg-white hover:shadow-neon"
        }`}
        whileHover={{ scale: 1.12, rotate: [-10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "ปิดเพลง BGM" : "เปิดเพลง BGM (YouTube 10% Volume)"}
        title={playing ? "ปิดเพลง BGM" : "เปิดเพลง BGM (YouTube 10% Volume)"}
      >
        {playing ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-pink-glow drop-shadow-[0_0_6px_rgba(255,111,165,0.8)] animate-bounce"
          >
            <path d="M19 3H9v11.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h10v7.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-pink-deep opacity-85 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:opacity-100"
          >
            <path d="M19 3H9v11.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h10v7.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}


