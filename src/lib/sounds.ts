"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playSynthClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

let clickAudio: HTMLAudioElement | null = null;
let useSynth = false;

export function playClickSound() {
  if (typeof window === "undefined") return;

  if (useSynth) {
    playSynthClick();
    return;
  }

  try {
    if (!clickAudio) {
      clickAudio = new Audio("/audio/click.mp3");
      clickAudio.volume = 0.35;
      clickAudio.addEventListener("error", () => {
        useSynth = true;
      });
    }
    clickAudio.currentTime = 0;
    void clickAudio.play().catch(() => {
      useSynth = true;
      playSynthClick();
    });
  } catch {
    playSynthClick();
  }
}

export function createLofiAudio(): HTMLAudioElement {
  const audio = new Audio("/audio/lofi.mp3");
  audio.loop = true;
  audio.volume = 0.25;
  return audio;
}
