import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { validateSignup } from "@/lib/research.mjs";

const reply = (data: object, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
function requestAllowed(request: Request) {
  const origin = request.headers.get("origin");
  return (!origin || origin === new URL(request.url).origin)
    && request.headers.get("sec-fetch-site") !== "cross-site"
    && (request.headers.get("content-type") ?? "").startsWith("application/json");
}
async function readBody(request: Request) {
  if (!request.body) throw new Error("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 2048) { await reader.cancel(); throw new Error("Body too large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function hash(token: string) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token))))
    .map(byte => byte.toString(16).padStart(2, "0")).join("");
}
export async function POST(request: Request) {
  if (!requestAllowed(request)) return reply({ error: "Please use the signup form on this site." }, 403);
  let body;
  try { body = await readBody(request); } catch { return reply({ error: "Invalid request. Please try again." }, 400); }
  const parsed = validateSignup(body);
  if (parsed.error || !parsed.email) return reply({ error: parsed.error }, 400);
  const removalToken = crypto.randomUUID() + crypto.randomUUID();
  try {
    // Duplicates preserve the original consent timestamp and removal secret.
    // A uniform response does not reveal whether an address is already stored.
    await getDb().insert(subscribers).values({
      email: parsed.email, createdAt: new Date().toISOString(),
      consentVersion: "blackbox-interest-2026-10-24", removalHash: await hash(removalToken),
    }).onConflictDoNothing({ target: subscribers.email });
    return reply({ ok: true, removalToken });
  } catch { return reply({ error: "We couldn't save your signup. Please try again in a moment." }, 503); }
}
export async function DELETE(request: Request) {
  if (!requestAllowed(request)) return reply({ error: "Please use this site to manage your signup." }, 403);
  let body;
  try { body = await readBody(request); } catch { return reply({ error: "Invalid request." }, 400); }
  if (typeof body?.token !== "string" || !/^[0-9a-f-]{72}$/.test(body.token)) return reply({ error: "Invalid removal receipt." }, 400);
  try {
    await getDb().delete(subscribers).where(eq(subscribers.removalHash, await hash(body.token)));
    return reply({ ok: true });
  } catch { return reply({ error: "Removal couldn't be completed. Please keep your receipt and try again." }, 503); }
}
