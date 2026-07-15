"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteData } from "@/lib/types";
import { SOCIAL_LABELS, DEFAULT_SITE_DATA } from "@/lib/types";
import RetroToast from "./RetroToast";
import { playClickSound } from "@/lib/sounds";

interface AdminPanelProps {
  initialData: SiteData;
}

export default function AdminPanel({ initialData }: AdminPanelProps) {
  const [data, setData] = useState<SiteData>({
    ...initialData,
    profile: {
      ...DEFAULT_SITE_DATA.profile,
      ...initialData.profile,
    },
    socials: initialData.socials || DEFAULT_SITE_DATA.socials,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({ message: "", type: "success", visible: false });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3200);
  };

  const uploadImage = async (file: File, type: "avatar" | "background") => {
    const form = new FormData();
    form.append("file", file);
    form.append("type", type);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "อัปโหลดรูปไม่สำเร็จ (ตรวจสอบขนาดไฟล์ไม่เกิน 3MB)");
    }
    const { url } = await res.json();
    return url as string;
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file, type);
      setData((d) => ({
        ...d,
        profile: {
          ...d.profile,
          [type === "avatar" ? "avatarUrl" : "backgroundUrl"]: url,
        },
      }));
      showToast("อัปโหลดรูปสำเร็จ!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "อัปโหลดรูปไม่สำเร็จ";
      showToast(message, "error");
    }
  };

  const updateProfileField = (key: keyof typeof data.profile, value: string) => {
    setData((d) => ({
      ...d,
      profile: {
        ...d.profile,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    playClickSound();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Save failed");
      showToast("บันทึกข้อมูลสำเร็จ!", "success");
    } catch {
      showToast("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    playClickSound();
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-soft via-pink-cream to-pink-primary/20 px-4 py-8">
      <RetroToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div className="mx-auto max-w-4xl">
        {/* Top Header & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-primary/50 bg-white/90 px-5 py-2.5 font-thai text-sm font-bold text-pink-deep shadow-sm transition hover:border-pink-glow hover:shadow-neon-sm"
          >
            ⬅ กลับหน้าหลัก
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-navy-night/20 bg-white/60 px-5 py-2.5 font-thai text-sm font-semibold text-navy-night/80 transition hover:bg-white"
          >
            ออกจากระบบ
          </button>
        </div>

        <motion.div
          className="rounded-[2.5rem] border-4 border-pink-primary/50 bg-white/95 p-6 shadow-neon backdrop-blur-md md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 border-b border-pink-primary/30 pb-6 text-center sm:text-left">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-pink-deep drop-shadow-sm">
              Admin Panel — ระบบจัดการหน้าเว็บ
            </h1>
            <p className="mt-2 font-thai text-sm sm:text-base text-navy-night/70">
              แก้ไขข้อความ ลิงก์ และรูปภาพของทุกส่วนได้ที่นี่ โดยแต่ละกล่องจะมีตัวอย่างอธิบายว่าข้อความนั้นปรากฏอยู่ตรงไหนของหน้าเว็บไซต์
            </p>
          </div>

          {/* Section 1: Hero Profile Window (mmmeisa_profile.exe) */}
          <section className="mb-10 rounded-3xl border-2 border-pink-primary/40 bg-pink-soft/30 p-6 sm:p-8 shadow-inner">
            <div className="mb-6 flex items-center gap-3 border-b border-pink-primary/30 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-primary text-white font-bold text-sm">
                1
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-pink-deep">
                หน้าต่างโปรไฟล์หลัก (Hero Window: mmmeisa_profile.exe)
              </h2>
            </div>

            {/* Visual Header Mockup / Hint */}
            <div className="mb-6 rounded-2xl border border-pink-primary/40 bg-[#FFF5F8] p-4 text-xs font-thai text-navy-night/80 shadow-2xs">
              <span className="font-bold text-pink-deep">📌 คำอธิบายส่วนที่ 1:</span> คือหน้าต่างสีชมพูกรอบบนสุดของเว็บไซต์ ที่มีชื่อใหญ่ Tagline แฮชแท็ก ป้ายสถานะ และกรอบรูปตัวละคร VTuber
            </div>

            {/* Live Visual Mockup Preview Box */}
            <div className="mb-8 rounded-3xl border-2 border-pink-glow/60 bg-gradient-to-br from-[#FFF5F8] via-white to-pink-cream/40 p-4 sm:p-6 shadow-md">
              <div className="mb-3 flex items-center justify-between font-thai text-xs sm:text-sm font-bold text-pink-deep">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 animate-ping rounded-full bg-pink-glow" />
                  👁️ ตัวอย่างจำลองหน้าจอจริง (Live Preview) — พิมพ์แก้ไขด้านล่างแล้วข้อความในกรอบนี้จะเปลี่ยนทันที:
                </span>
              </div>

              {/* Miniature Hero Window Card */}
              <div className="overflow-hidden rounded-2xl border-2 border-pink-deep/30 bg-white shadow-lg">
                {/* Title bar */}
                <div className="flex items-center justify-between bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent px-4 py-2 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-display truncate">
                    <span className="h-2 w-2 rounded-full bg-white shrink-0" />
                    <span className="truncate">{data.profile.heroWindowTitle || "mmmeisa_profile.exe"}</span>
                    <span className="ml-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-sans font-normal hidden sm:inline-block shrink-0">
                      {data.profile.heroStatusLabel || "● ONLINE — LIVE STREAMING STUDIO"}
                    </span>
                  </div>
                  <div className="flex gap-1 text-[10px] font-bold shrink-0">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-white/30">_</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-white/30">□</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-pink-deep/80">✕</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3.5">
                    {/* Top Tag */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/40 bg-[#FFF5F8] px-3 py-1 text-xs text-pink-deep font-medium shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{data.profile.heroTopBadge || "LIVE STREAMER • THAI VTUBER"}</span>
                    </div>

                    {/* Display Name */}
                    <h3 className="font-serif italic text-3xl sm:text-5xl font-bold text-pink-deep drop-shadow-2xs leading-none">
                      {data.profile.displayName || "mmmeisa"}
                    </h3>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {(data.profile.heroBadges
                        ? data.profile.heroBadges.split(",").map((s) => s.trim()).filter(Boolean)
                        : ["#CozyGamer", "#Chat&Chill", "#ThaiVTuber"]
                      ).map((b, idx) => (
                        <span key={idx} className="rounded-full bg-[#FFF5F8] px-3 py-0.5 text-xs font-medium text-pink-deep border border-pink-primary/30 shadow-2xs">
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Tagline Box */}
                    <div className="rounded-xl border border-pink-primary/30 bg-[#FFF5F8]/90 p-3.5 font-thai text-xs sm:text-sm text-navy-night/85 whitespace-pre-line shadow-inner">
                      {data.profile.tagline || "VTuber สายชิลล์ สตรีมเมอร์สไตล์สบายๆ ชอบพูดคุยและเล่นเกมกับทุกคนในสตูดิโอสีชมพู"}
                    </div>
                  </div>

                  {/* Right Avatar Preview */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                    <div className="overflow-hidden rounded-3xl border-4 border-pink-primary/40 bg-gradient-to-t from-[#FFF5F8] to-white p-1.5 shadow-lg">
                      <Image
                        src={data.profile.avatarUrl || "/assets/Vtuber.png"}
                        alt="Avatar preview"
                        width={140}
                        height={160}
                        className="h-36 sm:h-44 w-32 sm:w-36 object-cover object-top rounded-2xl"
                        unoptimized
                      />
                    </div>
                    <div className="mt-2.5 rounded-full border border-pink-primary/30 bg-white px-3.5 py-1 font-display text-xs font-bold text-pink-deep shadow-sm flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-primary" />
                      <span>{data.profile.avatarTag || "@mmmeisa.vtuber"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Marquee Banner */}
                <div className="border-t border-pink-primary/30 bg-[#FFF5F8] px-4 py-2.5 font-thai text-xs text-pink-deep flex items-center gap-2">
                  <span className="font-bold uppercase font-sans shrink-0">STATUS :</span>
                  <p className="truncate font-medium text-navy-night/85">
                    {data.profile.statusBannerText || "ยินดีต้อนรับเข้าสู่สตูดิโอสีชมพูของ mmmeisa (เมล เมลิส) ฝากติดตามและมาคุยเล่นกันในไลฟ์สตรีมได้เลยค๊าบ"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ชื่อหน้าต่างแถบข้างบน (Window Title)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">แถบหัวกรอบ</span>
                </div>
                <input
                  type="text"
                  value={data.profile.heroWindowTitle || ""}
                  onChange={(e) => updateProfileField("heroWindowTitle", e.target.value)}
                  placeholder="mmmeisa_profile.exe"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-display text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: <span className="font-mono text-pink-deep">mmmeisa_profile.exe</span> (ตรงแถบสีชมพูบนสุดของกรอบแรก)</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ป้ายสถานะบนแถบหัวกรอบ (Online Status)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">แถบหัวกรอบขวา</span>
                </div>
                <input
                  type="text"
                  value={data.profile.heroStatusLabel || ""}
                  onChange={(e) => updateProfileField("heroStatusLabel", e.target.value)}
                  placeholder="● ONLINE — LIVE STREAMING STUDIO"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: <span className="font-sans text-pink-deep">● ONLINE — LIVE STREAMING STUDIO</span></p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ป้ายแท็กด้านบนสุดของกรอบ (Top Tag Badge)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">แคปซูลบนสุด</span>
                </div>
                <input
                  type="text"
                  value={data.profile.heroTopBadge || ""}
                  onChange={(e) => updateProfileField("heroTopBadge", e.target.value)}
                  placeholder="LIVE STREAMER • THAI VTUBER"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ป้ายทรงแคปซูลเล็กๆ ก่อนถึงชื่อใหญ่ <span className="text-pink-deep font-semibold">LIVE STREAMER • THAI VTUBER</span></p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ชื่อหลักที่แสดง (Display Name)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">ชื่อขนาดใหญ่</span>
                </div>
                <input
                  type="text"
                  value={data.profile.displayName}
                  onChange={(e) => updateProfileField("displayName", e.target.value)}
                  placeholder="mmmeisa"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-serif text-lg italic font-bold focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ตัวอักษรสไตล์ตัวเขียนสีชมพูขนาดใหญ่ <span className="font-serif italic font-bold text-pink-deep">mmmeisa</span></p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">แฮชแท็กสไตล์ (Badges / Hashtags)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">คั่นด้วยลูกน้ำ ( , )</span>
                </div>
                <input
                  type="text"
                  value={data.profile.heroBadges || ""}
                  onChange={(e) => updateProfileField("heroBadges", e.target.value)}
                  placeholder="#CozyGamer, #Chat&Chill, #ThaiVTuber"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ป้ายแฮชแท็กใต้ชื่อ <span className="text-pink-deep font-medium">#CozyGamer  #Chat&Chill  #ThaiVTuber</span></p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ป้ายลอยใต้รูป VTuber (Avatar Tag)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">ป้ายบนรูปฝั่งขวา</span>
                </div>
                <input
                  type="text"
                  value={data.profile.avatarTag || ""}
                  onChange={(e) => updateProfileField("avatarTag", e.target.value)}
                  placeholder="@mmmeisa.vtuber"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-display text-sm font-bold focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ป้ายข้อความบนมุมซ้ายล่างของกรอบรูปตัวละคร <span className="font-bold text-pink-deep">@mmmeisa.vtuber</span></p>
              </label>

              <label className="block sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">คำโปรยใต้แฮชแท็ก (Tagline)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">กล่องคำอธิบายซ้าย</span>
                </div>
                <textarea
                  rows={2}
                  value={data.profile.tagline}
                  onChange={(e) => updateProfileField("tagline", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-thai text-sm leading-relaxed focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ข้อความแนะนำตัวสั้นๆ ในกรอบสีชมพูอ่อนเหนือช่องทางติดตาม</p>
              </label>

              <label className="block sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">แถบข้อความประกาศด้านล่าง (Status Banner Text)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">แถบล่างสุดของกรอบ</span>
                </div>
                <input
                  type="text"
                  value={data.profile.statusBannerText || ""}
                  onChange={(e) => updateProfileField("statusBannerText", e.target.value)}
                  placeholder="ยินดีต้อนรับเข้าสู่สตูดิโอสีชมพูของ mmmeisa..."
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-thai text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ปรากฏหลังคำว่า <span className="font-bold text-pink-deep">STATUS :</span> ตรงขอบล่างสุดของหน้าต่างโปรไฟล์หลัก</p>
              </label>
            </div>
          </section>

          {/* Section 2: About Notepad Window (mmmeisa_diary.txt) */}
          <section className="mb-10 rounded-3xl border-2 border-pink-primary/40 bg-pink-soft/30 p-6 sm:p-8 shadow-inner">
            <div className="mb-6 flex items-center gap-3 border-b border-pink-primary/30 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-primary text-white font-bold text-sm">
                2
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-pink-deep">
                หน้าต่างสมุดบันทึกเกี่ยวกับเมล (About Notepad: mmmeisa_diary.txt)
              </h2>
            </div>

            {/* Visual Notepad Mockup / Hint */}
            <div className="mb-6 rounded-2xl border border-pink-primary/40 bg-[#FFF5F8] p-4 text-xs font-thai text-navy-night/80 shadow-2xs">
              <span className="font-bold text-pink-deep">📌 คำอธิบายส่วนที่ 2:</span> คือหน้าต่างกระดาษสมุดบันทึกสไตล์ Notepad ถัดลงมาจากหน้าต่างแรก ที่มีสถานที่ หัวข้อใหญ่ ประวัติคำอธิบาย และลายเซ็นท้ายไดอารี่
            </div>

            {/* Live Visual Notepad Mockup Preview Box */}
            <div className="mb-8 rounded-3xl border-2 border-pink-glow/60 bg-gradient-to-br from-[#FFF5F8] via-white to-pink-cream/40 p-4 sm:p-6 shadow-md">
              <div className="mb-3 flex items-center justify-between font-thai text-xs sm:text-sm font-bold text-pink-deep">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 animate-ping rounded-full bg-pink-glow" />
                  👁️ ตัวอย่างจำลองหน้าจอสมุดบันทึก (Live Notepad Preview) — เปลี่ยนตามข้อความที่คุณพิมพ์ทันที:
                </span>
              </div>

              {/* Miniature Notepad Card */}
              <div className="overflow-hidden rounded-2xl border-2 border-pink-deep/40 bg-white shadow-lg">
                {/* Title bar */}
                <div className="flex items-center justify-between bg-gradient-to-r from-pink-primary via-pink-glow to-pink-accent px-4 py-2.5 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-display truncate">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse shrink-0" />
                    <span className="truncate">{data.profile.notepadTitle || "mmmeisa_diary.txt — Notepad"}</span>
                  </div>
                  <div className="flex gap-1 text-[10px] font-bold shrink-0">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-white/30">_</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-white/30">□</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-pink-deep/80">✕</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 bg-white/95">
                  {/* Stamps */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-pink-primary/30 pb-3 font-sans text-xs text-navy-night/60 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-pink-deep uppercase tracking-wider text-xs">Location:</span>
                      <span>{data.profile.aboutLocation || "Pink Room Studio"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-pink-deep uppercase tracking-wider text-xs">Last Updated:</span>
                      <span>{data.profile.aboutLastUpdated || "Live Profile"}</span>
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="mb-5 text-center">
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-pink-deep">
                      {data.profile.aboutHeading || "เกี่ยวกับ mmmeisa"} <span className="text-sm font-normal text-navy-night/50 font-sans">{data.profile.aboutSubHeading || "(About Me)"}</span>
                    </h4>
                  </div>

                  {/* Bio Box */}
                  <div className="rounded-xl border border-pink-primary/40 bg-pink-soft/60 p-4 sm:p-5 font-thai text-xs sm:text-sm leading-relaxed text-navy-night/85 whitespace-pre-line text-center shadow-inner">
                    {data.profile.bio || "สวัสดีค่ะ เมล เมลิส (mmmeisa) นะคะ เป็น VTuber ที่ชอบสตรีมเกม เล่นไปคุยไปในบรรยากาศสบายๆ ฝากเนื้อฝากตัวด้วยนะคะ แวะมาทักทายและเล่นเกมด้วยกันได้ในไลฟ์สตรีมเสมอเลยค๊าบ"}
                  </div>

                  {/* Quote and Signature */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-dashed border-pink-primary/40 pt-4">
                    <div className="font-thai text-xs sm:text-sm text-pink-deep/90 italic text-center sm:text-left">
                      {data.profile.diaryQuote || '"มาร่วมสร้างความทรงจำดีๆ ไปด้วยกันในสตูดิโอสีชมพูแห่งนี้นะคะ ขอบคุณทุกคนที่คอยซัพพอร์ตกันเสมอค๊าบ"'}
                    </div>
                    <div className="font-display text-base sm:text-lg font-bold text-pink-deep shrink-0">
                      {data.profile.diarySignature || "— mmmeisa"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ชื่อหน้าต่างสมุดบันทึก (Notepad Window Title)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">แถบหัว Notepad</span>
                </div>
                <input
                  type="text"
                  value={data.profile.notepadTitle || ""}
                  onChange={(e) => updateProfileField("notepadTitle", e.target.value)}
                  placeholder="mmmeisa_diary.txt — Notepad"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-display text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: <span className="font-mono text-pink-deep">mmmeisa_diary.txt — Notepad</span> ตรงแถบหัวหน้าต่างสมุดบันทึก</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">สถานที่ (Location Stamp)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">หลังคำว่า LOCATION:</span>
                </div>
                <input
                  type="text"
                  value={data.profile.aboutLocation || ""}
                  onChange={(e) => updateProfileField("aboutLocation", e.target.value)}
                  placeholder="Pink Room Studio"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ปรากฏหลังคำว่า <span className="font-bold text-pink-deep">LOCATION:</span> ทางซ้ายบนของสมุดบันทึก</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">สถานะการอัปเดต (Last Updated Stamp)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">หลังคำว่า LAST UPDATED:</span>
                </div>
                <input
                  type="text"
                  value={data.profile.aboutLastUpdated || ""}
                  onChange={(e) => updateProfileField("aboutLastUpdated", e.target.value)}
                  placeholder="Live Profile"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ปรากฏหลังคำว่า <span className="font-bold text-pink-deep">LAST UPDATED:</span> ทางขวาบนของสมุดบันทึก</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">หัวข้อใหญ่กลางสมุด (About Heading)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">หัวข้อใหญ่</span>
                </div>
                <input
                  type="text"
                  value={data.profile.aboutHeading || ""}
                  onChange={(e) => updateProfileField("aboutHeading", e.target.value)}
                  placeholder="เกี่ยวกับ mmmeisa"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-display text-base font-bold focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: <span className="font-bold text-pink-deep">เกี่ยวกับ mmmeisa</span> ตรงกลางหน้ากระดาษ</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">หัวข้อรองภาษาอังกฤษ (Sub Heading)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">ต่อท้ายหัวข้อใหญ่</span>
                </div>
                <input
                  type="text"
                  value={data.profile.aboutSubHeading || ""}
                  onChange={(e) => updateProfileField("aboutSubHeading", e.target.value)}
                  placeholder="(About Me)"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-sans text-sm focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ข้อความ <span className="text-navy-night/60">(About Me)</span> ต่อท้ายหัวข้อเกี่ยวกับ mmmeisa</p>
              </label>

              <label className="block sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">เนื้อหาประวัติ / แนะนำตัว (Biography Content)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">กล่องกระดาษตรงกลาง</span>
                </div>
                <textarea
                  rows={4}
                  value={data.profile.bio}
                  onChange={(e) => updateProfileField("bio", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-thai text-sm sm:text-base leading-relaxed focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ข้อความยาวแนะนำตัวในกล่องกระดาษสีชมพูอ่อนกลางสมุดบันทึก</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">คำคมท้ายไดอารี่ (Diary Quote)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">ซ้ายล่างของสมุด</span>
                </div>
                <input
                  type="text"
                  value={data.profile.diaryQuote || ""}
                  onChange={(e) => updateProfileField("diaryQuote", e.target.value)}
                  placeholder='"มาร่วมสร้างความทรงจำดีๆ ไปด้วยกัน..."'
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-thai text-sm italic focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ข้อความเอียงมุมซ้ายล่างก่อนถึงลายเซ็น</p>
              </label>

              <label className="block sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="font-thai text-sm font-bold text-pink-deep">ลายเซ็นท้ายสมุดบันทึก (Diary Signature)</span>
                  <span className="rounded bg-pink-primary/20 px-2 py-0.5 font-sans text-[11px] text-pink-deep font-semibold">ขวาล่างของสมุด</span>
                </div>
                <input
                  type="text"
                  value={data.profile.diarySignature || ""}
                  onChange={(e) => updateProfileField("diarySignature", e.target.value)}
                  placeholder="— mmmeisa"
                  className="mt-1.5 w-full rounded-xl border-2 border-pink-primary/40 bg-white px-4 py-2.5 font-display text-base font-bold focus:border-pink-glow focus:outline-none"
                />
                <p className="mt-1 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ชื่อลายเซ็นมุมขวาล่างของสมุดบันทึก <span className="font-bold text-pink-deep">— mmmeisa</span></p>
              </label>
            </div>
          </section>

          {/* Section 3: Social Channels */}
          <section className="mb-10 rounded-3xl border-2 border-pink-primary/40 bg-pink-soft/30 p-6 sm:p-8 shadow-inner">
            <div className="mb-6 flex items-center gap-3 border-b border-pink-primary/30 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-primary text-white font-bold text-sm">
                3
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-pink-deep">
                ช่องทางการติดตามและโดเนท (Official Channels)
              </h2>
            </div>

            <div className="mb-6 rounded-2xl border border-pink-primary/40 bg-[#FFF5F8] p-4 text-xs font-thai text-navy-night/80 shadow-2xs">
              <span className="font-bold text-pink-deep">📌 คำอธิบายส่วนที่ 3:</span> คือปุ่มการ์ด 4 ช่องทางด้านซ้ายล่างของหน้าต่างแรก (X, Twitch, Discord, EasyDonate) สามารถกดติ๊ก <span className="text-pink-deep font-semibold">&quot;แสดงปุ่ม&quot;</span> เพื่อเปิด/ปิดการแสดงผลได้
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.socials.map((social, i) => (
                <div
                  key={social.platform}
                  className="rounded-2xl border-2 border-pink-primary/30 bg-white p-4 shadow-2xs transition hover:border-pink-glow"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-display text-base font-bold text-pink-deep">
                      {SOCIAL_LABELS[social.platform]}
                    </span>
                    <label className="flex items-center gap-2 font-thai text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={social.enabled}
                        onChange={(e) => {
                          const socials = [...data.socials];
                          socials[i] = { ...social, enabled: e.target.checked };
                          setData((d) => ({ ...d, socials }));
                        }}
                        className="h-4 w-4 rounded border-pink-primary accent-pink-glow"
                      />
                      <span className="font-medium text-navy-night/80">แสดงปุ่ม</span>
                    </label>
                  </div>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => {
                      const socials = [...data.socials];
                      socials[i] = { ...social, url: e.target.value };
                      setData((d) => ({ ...d, socials }));
                    }}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-pink-primary/40 bg-pink-cream/20 px-3 py-2 text-sm font-sans focus:border-pink-glow focus:outline-none"
                  />
                  <p className="mt-1.5 font-thai text-[11px] text-navy-night/50 truncate">ลิงก์ปัจจุบัน: {social.url || "ยังไม่ได้ระบุ"}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Images and Backgrounds */}
          <section className="mb-10 rounded-3xl border-2 border-pink-primary/40 bg-pink-soft/30 p-6 sm:p-8 shadow-inner">
            <div className="mb-6 flex items-center gap-3 border-b border-pink-primary/30 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-primary text-white font-bold text-sm">
                4
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-pink-deep">
                รูปภาพและพื้นหลังสตูดิโอ (Avatar & Background)
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-pink-primary/30 bg-white p-5 shadow-2xs">
                <p className="mb-1 font-thai text-sm font-bold text-pink-deep">รูปตัวละคร VTuber (Avatar Portrait)</p>
                <p className="mb-4 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: กรอบรูปตัวละครขนาดใหญ่ทางด้านขวาของหน้าต่างแรก</p>
                <div className="mb-4 flex justify-center">
                  <div className="overflow-hidden rounded-2xl border-2 border-pink-primary bg-pink-soft p-1">
                    <Image
                      src={data.profile.avatarUrl || "/assets/Vtuber.png"}
                      alt="Avatar preview"
                      width={120}
                      height={120}
                      className="h-28 w-28 rounded-xl object-cover object-top"
                      unoptimized
                    />
                  </div>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "avatar")}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-full rounded-xl bg-pink-primary/90 py-2.5 font-thai text-sm font-bold text-white shadow-sm transition hover:bg-pink-deep"
                >
                  📁 เลือกไฟล์อัปโหลด Avatar
                </button>
                <div className="mt-3">
                  <span className="font-thai text-xs text-navy-night/60">หรือใส่เป็น URL รูปภาพ:</span>
                  <input
                    type="text"
                    value={data.profile.avatarUrl}
                    onChange={(e) => updateProfileField("avatarUrl", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-pink-primary/40 bg-pink-cream/20 px-3 py-1.5 text-xs font-sans focus:border-pink-glow focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border-2 border-pink-primary/30 bg-white p-5 shadow-2xs">
                <p className="mb-1 font-thai text-sm font-bold text-pink-deep">ภาพพื้นหลังสตูดิโอ (Background Wallpaper)</p>
                <p className="mb-4 font-thai text-xs text-navy-night/60">ตัวอย่างบนเว็บ: ภาพห้องสตูดิโอสีชมพูที่อยู่ด้านหลังหน้าต่างทั้งหมด</p>
                <div className="mb-4 h-28 overflow-hidden rounded-2xl border-2 border-pink-primary bg-pink-soft">
                  <Image
                    src={data.profile.backgroundUrl || "/assets/Bg.png"}
                    alt="Background preview"
                    width={240}
                    height={112}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <input
                  ref={bgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "background")}
                />
                <button
                  type="button"
                  onClick={() => bgInputRef.current?.click()}
                  className="w-full rounded-xl bg-pink-primary/90 py-2.5 font-thai text-sm font-bold text-white shadow-sm transition hover:bg-pink-deep"
                >
                  📁 เลือกไฟล์อัปโหลด Background
                </button>
                <div className="mt-3">
                  <span className="font-thai text-xs text-navy-night/60">หรือใส่เป็น URL พื้นหลัง:</span>
                  <input
                    type="text"
                    value={data.profile.backgroundUrl}
                    onChange={(e) => updateProfileField("backgroundUrl", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-pink-primary/40 bg-pink-cream/20 px-3 py-1.5 text-xs font-sans focus:border-pink-glow focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <motion.button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="sticky bottom-4 w-full rounded-2xl bg-gradient-to-r from-pink-primary via-pink-glow to-pink-deep py-4 font-display text-xl font-bold text-white shadow-neon transition hover:opacity-95 disabled:opacity-60 z-30"
            whileHover={{ scale: saving ? 1 : 1.015 }}
            whileTap={{ scale: saving ? 1 : 0.985 }}
          >
            {saving ? "⏳ กำลังบันทึกข้อมูล..." : "💾 บันทึกและอัปเดตข้อมูลทั้งหมด (Save / Update)"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

