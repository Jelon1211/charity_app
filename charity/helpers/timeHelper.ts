export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}

export function toUnixSeconds(date: Date | number): number {
  if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  }
  return Math.floor(date / 1000);
}

export function fromUnixSeconds(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000);
}

export function formatDateToDisplay(
  unixTimestamp: number,
  locale: string = "pl-PL",
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
) {
  return new Intl.DateTimeFormat(locale, options).format(
    fromUnixSeconds(unixTimestamp)
  );
}
