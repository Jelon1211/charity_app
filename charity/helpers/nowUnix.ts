export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}

export function toUnixSeconds(date: Date | number): number {
  if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  }
  return Math.floor(date / 1000);
}
