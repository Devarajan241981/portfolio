"use client";

import { useEffect, useState } from "react";

// dim text needs more opacity on a light background to read at the same
// perceived intensity it has on a near-black one
export function useThemeOpacityBoost() {
  const [boost, setBoost] = useState(1);

  useEffect(() => {
    function update() {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      setBoost(isLight ? 1.8 : 1);
    }
    update();
    window.addEventListener("themechange", update);
    return () => window.removeEventListener("themechange", update);
  }, []);

  return boost;
}
