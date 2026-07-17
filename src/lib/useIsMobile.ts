import { useEffect, useState } from "react";

/** True below the lg breakpoint (matches Tailwind's `lg:` = 1024px). Used to
 * swap heavier pinned/scroll-driven sequences for simpler mobile-native ones
 * rather than just scaling the desktop layout down. */
export function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}
