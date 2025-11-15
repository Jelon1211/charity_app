"use client";
import { useEffect } from "react";

export default function ColorProvider({
  bg,
  text,
  bgs,
  colorsecond,
}: {
  bg: string;
  text: string;
  bgs: string;
  colorsecond: string;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", bg);
    document.documentElement.style.setProperty("--text", text);
    document.documentElement.style.setProperty("--colorsecond", colorsecond);
    document.documentElement.style.setProperty("--bgs", bgs);
  }, [bg, text, bgs, colorsecond]);
  return null;
}
