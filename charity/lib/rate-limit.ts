let lastRequestTime: number | null = null;
//TODO: move to some consts or wahatever
const WINDOW_MS = 1 * 1 * 1000;

export function rateLimiter(): void | Response {
  const now = Date.now();

  if (!lastRequestTime) {
    lastRequestTime = now;
    return;
  }

  const diff = now - lastRequestTime;

  if (diff < WINDOW_MS) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // reset after an hour
  lastRequestTime = now;
}
