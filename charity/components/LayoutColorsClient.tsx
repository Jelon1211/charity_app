"use client";

import ColorProvider from "@/app/ColorProvider";
import { useSearchParams } from "next/navigation";

export default function LayoutColorsClient() {
  const params = useSearchParams();

  const bg = params.get("bg") || "#333";
  const text = params.get("text") || "#fff";
  const bgs = params.get("bgs") || "#222";
  const colorsecond = params.get("colorsecond") || "#444";

  return (
    <ColorProvider bg={bg} text={text} bgs={bgs} colorsecond={colorsecond} />
  );
}
