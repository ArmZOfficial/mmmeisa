"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global right-click and drag protection for all images, GIFs, PNGs, and artwork
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === "IMG" ||
        target.tagName === "CANVAS" ||
        target.tagName === "VIDEO" ||
        target.closest("img") ||
        target.querySelector("img") ||
        target.getAttribute("src")?.includes(".gif") ||
        target.getAttribute("src")?.includes(".png") ||
        target.style.backgroundImage !== "" ||
        target.closest("[data-protected='true']") ||
        target.closest(".select-none") ||
        window.getSelection()?.toString() !== ""
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "IMG" || target.closest("img"))) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return () => {
        window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
        window.removeEventListener("dragstart", handleDragStart, { capture: true });
      };
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const down = () => cursor.classList.add("cursor-click");
    const up = () => cursor.classList.remove("cursor-click");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed z-[9999] hidden md:block"
      aria-hidden
    >
      <Image
        src="/assets/cursor.gif"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 -translate-x-1 translate-y-1 object-contain select-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        unoptimized
      />
    </div>
  );
}

