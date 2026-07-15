export type SocialPlatform = "x" | "twitch" | "discord" | "easydonate";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  enabled: boolean;
}

export interface Profile {
  displayName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  backgroundUrl: string;
  // Hero Window (`mmmeisa_profile.exe`)
  heroWindowTitle?: string;
  heroStatusLabel?: string;
  heroTopBadge?: string;
  heroBadges?: string;
  avatarTag?: string;
  statusBannerText?: string;
  // About Window (`mmmeisa_diary.txt`)
  notepadTitle?: string;
  aboutLocation?: string;
  aboutLastUpdated?: string;
  aboutHeading?: string;
  aboutSubHeading?: string;
  diaryQuote?: string;
  diarySignature?: string;
}

export interface SiteData {
  profile: Profile;
  socials: SocialLink[];
}

export const DEFAULT_SITE_DATA: SiteData = {
  profile: {
    displayName: "mmmeisa",
    tagline: "VTuber สายชิลล์ สตรีมเมอร์สไตล์สบายๆ ชอบพูดคุยและเล่นเกมกับทุกคนในสตูดิโอสีชมพู",
    bio: "สวัสดีค่ะ เมล เมลิส (mmmeisa) นะคะ เป็น VTuber ที่ชอบสตรีมเกม เล่นไปคุยไปในบรรยากาศสบายๆ ฝากเนื้อฝากตัวด้วยนะคะ แวะมาทักทายและเล่นเกมด้วยกันได้ในไลฟ์สตรีมเสมอเลยค๊าบ",
    avatarUrl: "/assets/Vtuber.png",
    backgroundUrl: "/assets/Bg.png",
    heroWindowTitle: "mmmeisa_profile.exe",
    heroStatusLabel: "● ONLINE — LIVE STREAMING STUDIO",
    heroTopBadge: "LIVE STREAMER • THAI VTUBER",
    heroBadges: "#CozyGamer, #Chat&Chill, #ThaiVTuber",
    avatarTag: "@mmmeisa.vtuber",
    statusBannerText: "ยินดีต้อนรับเข้าสู่สตูดิโอสีชมพูของ mmmeisa (เมล เมลิส) ฝากติดตามและมาคุยเล่นกันในไลฟ์สตรีมได้เลยค๊าบ",
    notepadTitle: "mmmeisa_diary.txt — Notepad",
    aboutLocation: "Pink Room Studio",
    aboutLastUpdated: "Live Profile",
    aboutHeading: "เกี่ยวกับ mmmeisa",
    aboutSubHeading: "(About Me)",
    diaryQuote: '"มาร่วมสร้างความทรงจำดีๆ ไปด้วยกันในสตูดิโอสีชมพูแห่งนี้นะคะ ขอบคุณทุกคนที่คอยซัพพอร์ตกันเสมอค๊าบ"',
    diarySignature: "— mmmeisa",
  },
  socials: [
    { platform: "x", url: "https://x.com/mmm3isa", enabled: true },
    { platform: "twitch", url: "https://www.twitch.tv/mmmeisa/", enabled: true },
    { platform: "discord", url: "https://discord.com/invite/f5drQpRnYj", enabled: true },
    { platform: "easydonate", url: "https://easydonate.app/mmmeisa", enabled: true },
  ],
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  x: "X (Twitter)",
  twitch: "Twitch",
  discord: "Discord",
  easydonate: "EasyDonate",
};
