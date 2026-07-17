import { useRef, useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function ProductWalkthrough() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  return (
    <section id="how-it-works" className="relative py-32" style={{ background: "var(--void)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Product Walkthrough"
            title="See it run, start to finish."
            subtitle="A real recording of Dala Tracker -- import, tracking, settings, batch processing, and the finished output."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border shadow-2xl"
            style={{ borderColor: "var(--graphite-3)", background: "var(--graphite)" }}
          >
            <video
              ref={videoRef}
              src="/assets/final_recording.mp4"
              className="h-full w-full object-cover"
              controls
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play the walkthrough"
                className="absolute inset-0 flex items-center justify-center transition-colors"
                style={{ background: "rgba(5,5,10,0.35)" }}
              >
                <span
                  className="glow-violet flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "var(--violet)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--void)">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
