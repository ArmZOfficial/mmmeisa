"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { playClickSound } from "@/lib/sounds";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("รหัสผ่านไม่ถูกต้อง");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-soft via-pink-cream to-pink-primary/30 px-4">
      <motion.div
        className="w-full max-w-md rounded-3xl border-2 border-pink-primary/40 bg-white/90 p-8 shadow-neon backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6 flex justify-center">
          <Image
            src="/assets/element6.gif"
            alt=""
            width={80}
            height={80}
            unoptimized
            aria-hidden
          />
        </div>
        <h1 className="mb-2 text-center font-display text-2xl font-bold text-pink-deep">
          Admin Login
        </h1>
        <p className="mb-6 text-center font-thai text-sm text-navy-night/60">
          กรอกรหัสผ่านเพื่อเข้าสู่ระบบจัดการ
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่าน"
            className="w-full rounded-xl border-2 border-pink-primary/30 bg-pink-cream/50 px-4 py-3 font-thai focus:border-pink-glow focus:outline-none"
            required
          />
          {error && (
            <p className="text-center font-thai text-sm text-red-500">{error}</p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-pink-primary to-pink-glow py-3 font-display font-bold text-white shadow-neon-sm disabled:opacity-60"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "🔐 เข้าสู่ระบบ"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
