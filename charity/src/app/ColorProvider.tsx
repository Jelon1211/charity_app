"use client";
import { useEffect } from "react";

export default function ColorProvider({
  bg,
  text,
}: {
  bg: string;
  text: string;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", bg);
    document.documentElement.style.setProperty("--text", text);
  }, [bg, text]);
  return null;
}
