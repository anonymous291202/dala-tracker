import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps content in a CSS 3D perspective stage. The card tilts subtly toward
 * the cursor (desktop only) and its internal layers (passed as children with
 * a `data-depth` attribute, e.g. via inline style translateZ) read as
 * physically separated in Z-space rather than a flat image.
 */
export default function Perspective3DPanel({ children, className = "" }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: "1400px" }}
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.4s var(--ease-settle)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
