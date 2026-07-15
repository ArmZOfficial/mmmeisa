import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function uploadImage(
  file: File,
  folder: "avatar" | "background"
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const filename = `${folder}-${randomUUID()}.${ext}`;

  if (hasBlob()) {
    const blob = await put(`uploads/${filename}`, file, { access: "public" });
    return blob.url;
  }

  // Local fallback for development
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const localPath = path.join(uploadsDir, filename);
  await fs.writeFile(localPath, buffer);
  return `/uploads/${filename}`;
}
