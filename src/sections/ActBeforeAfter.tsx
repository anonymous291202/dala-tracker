import CathedralComparison from "../components/CathedralComparison";
import { StaticCathedralMobile } from "../components/CathedralComparison";
import { useIsMobile } from "../lib/useIsMobile";

export default function ActBeforeAfter() {
  const isMobile = useIsMobile();

  // Mobile gets its own straightforward stacked layout -- a pinned,
  // scroll-scrubbed 320vh sequence doesn't translate well to a touch
  // scroll on a small screen, so it's swapped for something native to it
  // rather than the desktop version scaled down.
  if (isMobile) return <StaticCathedralMobile />;

  return <CathedralComparison />;
}
