export type ChangelogEntry = {
  version: string;
  date: string;
  highlights: string[];
};

// Add new entries to the top of this array as versions ship.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "Current release",
    highlights: [
      "Batch clip import -- individual files or whole folders",
      "Automatic face-landmark tracking with four anchor points",
      "Manual point tracking for anything a face tracker can't follow",
      "Adjustable smoothing window and tracking sensitivity",
      "Optional motion blur and frame blending",
      "Export controls: codec, container, quality, and FPS",
      "Original audio preserved in stabilized output",
    ],
  },
];
