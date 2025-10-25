import { NEXT_PUBLIC_DOZBRAJAMY, NEXT_PUBLIC_WEB_DEV } from "../config/const";
import { SOURCE } from "../types/db";

export function sourceLinks(source: SOURCE): string {
  let link = "";
  switch (source) {
    case SOURCE.DOZBRAJAMY:
      link = NEXT_PUBLIC_DOZBRAJAMY;
      break;
    case SOURCE.WEB_DEV:
      link = NEXT_PUBLIC_WEB_DEV;
  }

  return link;
}
