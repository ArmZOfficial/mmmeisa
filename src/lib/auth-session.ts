import { jwtVerify } from "jose";

const COOKIE_NAME = "mmmeisa_admin_session";

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
