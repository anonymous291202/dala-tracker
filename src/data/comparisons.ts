export type ComparisonPair = {
  id: string;
  before: string;
  after: string;
  label: string;
};

// The three pairs used in the flagship cathedral comparison sequence.
export const CATHEDRAL_PAIRS: ComparisonPair[] = [
  { id: "01", before: "/assets/comparisons/before1.mp4", after: "/assets/comparisons/after1.mp4", label: "Clip 01" },
  { id: "02", before: "/assets/comparisons/before2.mp4", after: "/assets/comparisons/after2.mp4", label: "Clip 02" },
  { id: "03", before: "/assets/comparisons/before3.mp4", after: "/assets/comparisons/after3.mp4", label: "Clip 03" },
];

// Additional real pairs available but not used in the flagship sequence --
// kept here so they're easy to surface elsewhere (e.g. a future gallery).
export const ADDITIONAL_PAIRS: ComparisonPair[] = [
  { id: "04", before: "/assets/comparisons/before4.mp4", after: "/assets/comparisons/after4.mp4", label: "Clip 04" },
  { id: "05", before: "/assets/comparisons/before5.mp4", after: "/assets/comparisons/after5.mp4", label: "Clip 05" },
  { id: "06", before: "/assets/comparisons/before6.mp4", after: "/assets/comparisons/after6.mp4", label: "Clip 06" },
];
