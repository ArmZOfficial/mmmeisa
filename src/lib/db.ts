import { kv } from "@vercel/kv";
import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_SITE_DATA, type SiteData } from "./types";

const KV_KEY = "mmmeisa:site-data";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "site.json");

function hasKv(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

async function readLocalData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
    return { ...DEFAULT_SITE_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_DATA;
  }
}

async function writeLocalData(data: SiteData): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSiteData(): Promise<SiteData> {
  if (hasKv()) {
    try {
      const data = await kv.get<SiteData>(KV_KEY);
      if (data) {
        return {
          ...DEFAULT_SITE_DATA,
          ...data,
          profile: { ...DEFAULT_SITE_DATA.profile, ...data.profile },
          socials: data.socials?.length ? data.socials : DEFAULT_SITE_DATA.socials,
        };
      }
    } catch (error) {
      console.error("KV read failed, falling back to local:", error);
    }
  }
  return readLocalData();
}

export async function saveSiteData(data: SiteData): Promise<void> {
  if (hasKv()) {
    try {
      await kv.set(KV_KEY, data);
      return;
    } catch (error) {
      console.error("KV write failed, falling back to local:", error);
    }
  }
  await writeLocalData(data);
}
