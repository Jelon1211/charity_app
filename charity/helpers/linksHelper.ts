import { NEXT_PUBLIC_DOZBRAJAMY, NEXT_PUBLIC_WEB_DEV } from "../config/const";
import { SOURCE } from "../types/db";
import { SourceObj } from "../types/Table";

export function sourceLinks(source: SOURCE): SourceObj {
  let sourceObj = {
    link: "",
    text: "",
    img: "",
  };
  switch (source) {
    case SOURCE.DOZBRAJAMY:
      sourceObj = {
        link: NEXT_PUBLIC_DOZBRAJAMY,
        text: "dozbrajamy.pl",
        img: "/sources/dozbrajamy.svg",
      };
      break;
    case SOURCE.WEB_DEV:
      sourceObj = {
        link: NEXT_PUBLIC_WEB_DEV,
        text: "dozbrajamy.pl",
        img: "/sources/dozbrajamy.png",
      };
  }

  return sourceObj;
}
