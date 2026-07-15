import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import type { SiteData } from "@/lib/types";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteData;
    await saveSiteData(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
