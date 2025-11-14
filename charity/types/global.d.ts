declare global {
  var rateLimits: Map<string, { count: number; timestamp: number }>;
}

export {};
