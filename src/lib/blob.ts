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
    try {
      const blob = await put(`uploads/${filename}`, file, { access: "public" });
      return blob.url;
    } catch (error) {
      console.error("Vercel Blob put error, trying base64 fallback:", error);
    }
  }

  // On Vercel (or read-only production environments) without BLOB_READ_WRITE_TOKEN,
  // convert to Base64 Data URL so it can be saved directly to Vercel KV along with text data.
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    if (file.size > 3 * 1024 * 1024) {
      throw new Error("ขนาดไฟล์รูปภาพเกิน 3 MB กรุณาใช้รูปขนาดเล็กกว่า 3 MB หรือใส่เป็น URL รูปภาพ หรือเชื่อมต่อ Vercel Blob");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }

  // Local fallback for development
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const localPath = path.join(uploadsDir, filename);
    await fs.writeFile(localPath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Local file write failed, falling back to base64 Data URL:", error);
    if (file.size > 3 * 1024 * 1024) {
      throw new Error("ขนาดไฟล์รูปภาพเกิน 3 MB กรุณาใช้รูปขนาดเล็กกว่า 3 MB หรือใส่เป็น URL รูปภาพ");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }
}
