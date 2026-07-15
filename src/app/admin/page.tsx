import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSiteData } from "@/lib/db";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const data = await getSiteData();
  return <AdminPanel initialData={data} />;
}
