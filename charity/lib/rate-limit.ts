const WINDOW_MS = 1000;
const MAX_REQUESTS = 2;

type Entry = { count: number; timestamp: number };

if (!globalThis.rateLimits) {
  globalThis.rateLimits = new Map<string, Entry>();
}

export function rateLimiter(ip: string): Response | void {
  const now = Date.now();
  const entry = globalThis.rateLimits.get(ip);

  if (!entry) {
    globalThis.rateLimits.set(ip, { count: 1, timestamp: now });
    return;
  }

  const elapsed = now - entry.timestamp;

  if (elapsed > WINDOW_MS) {
    globalThis.rateLimits.set(ip, { count: 1, timestamp: now });
    return;
  }

  if (entry.count >= MAX_REQUESTS) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Try again later.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  entry.count++;
  return;
}
