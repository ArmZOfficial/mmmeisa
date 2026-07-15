import type { Metadata } from "next";
import { Kanit, Baloo_2 } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mmmeisa.vercel.app"
  ),
  title: "mmmeisa — VTuber & Live Streamer",
  description:
    "Personal profile and live streaming room for mmmeisa — VTuber สายชิลล์ ชอบพูดคุยและเล่นเกมกับทุกคนในสตูดิโอสีชมพู",
  openGraph: {
    title: "mmmeisa — VTuber & Live Streamer",
    description:
      "Personal profile and live streaming room for mmmeisa — VTuber สายชิลล์ ชอบพูดคุยและเล่นเกมกับทุกคนในสตูดิโอสีชมพู",
    images: [{ url: "/og-image.png", width: 730, height: 730, alt: "mmmeisa" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mmmeisa — VTuber & Live Streamer",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${baloo.variable} font-thai`}>
        {children}
      </body>
    </html>
  );
}
