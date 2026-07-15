import { getSiteData } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getSiteData();
  return <HomeClient data={data} />;
}
