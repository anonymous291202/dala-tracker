export type Creator = {
  slug: string;
  role: string;
  name: string;
  displayName: string;
  tagline: string;
  bio: string;
  portrait: string;
  focus: string[];
  stats: { label: string; value: string }[];
  quote: string;
  timeline: { year: string; text: string }[];
  skills: string[];
  contributions: string[];
  philosophy: string;
  socials: { label: string; url: string }[];
};

// Content adapted from the creators' own reference material. Follower/subscriber
// counts are as provided by the creators themselves, not independently verified.
export const CREATORS: Creator[] = [
  {
    slug: "dala",
    role: "Founder",
    name: "Dala.aep",
    displayName: "Dala",
    tagline: "Turning repetitive editing into one-click automation.",
    bio: "I built Dala Tracker to solve the problems I faced every day as an editor -- shaky footage, hours of manual tracking, and repetitive workflows that killed creativity. This tool is my attempt to make editing faster, smarter, and more effortless for every creator.",
    portrait: "/assets/authors/creator1.png",
    focus: ["Automate", "Simplify", "Empower"],
    stats: [
      { label: "YouTube", value: "6K+" },
      { label: "Instagram", value: "7K+" },
      { label: "Discord", value: "3K+" },
      { label: "Experience", value: "5+ yrs" },
    ],
    quote: "Artists can't be ranked.",
    timeline: [
      { year: "2019", text: "Started editing as a passion. Explored After Effects and fell in love with motion." },
      { year: "2020\u201322", text: "Worked on hundreds of projects, learning every workflow and technique by doing." },
      { year: "2023", text: "Frustrated with slow, repetitive workflows. Started building automation scripts to save time." },
      { year: "2024", text: "Dala Tracker was born. Built for editors, by an editor." },
      { year: "2025 & beyond", text: "Continuing to build, improve, and empower creators worldwide." },
    ],
    skills: ["After Effects", "Premiere Pro", "UI/UX Design", "Python", "Automation", "Video Editing", "Color Grading", "Motion Graphics"],
    contributions: [
      "Automates complex After Effects workflows",
      "Face tracking, camera tracking, and stabilization",
      "Builds powerful tools for editors",
      "Makes high-end editing accessible to all",
    ],
    philosophy: "I don't just build tools, I build freedom for creators.",
    socials: [{ label: "Socials", url: "https://linktr.ee/Dala.aep_Socials" }],
  },
  {
    slug: "tamilhitman",
    role: "Co-founder",
    name: "Tamilhitman / MDX",
    displayName: "Tamilhitman",
    tagline: "Designing the experience. Building the engine.",
    bio: "I focus on the things people don't see, but everything depends on -- from the core engine that powers Dala Tracker to the visual identity that defines it. I build with precision and passion.",
    portrait: "/assets/authors/creator2.png",
    focus: ["Engine Architecture", "Visual Identity"],
    stats: [
      { label: "YouTube", value: "MDX_EDITZ" },
      { label: "Instagram", value: "MDX_EDITZ" },
      { label: "Discord", value: "TAMILHITMAN" },
      { label: "Supporters", value: "6K+" },
    ],
    quote: "Cut with your gut.",
    timeline: [
      { year: "2019", text: "Discovered the power of editing. Fell in love with creating unique visual stories." },
      { year: "2020\u201321", text: "Explored UI/UX and motion design. Started building visual concepts and identity systems." },
      { year: "2022", text: "Deep dive into software development and automation. The engine mindset begins." },
      { year: "2023", text: "Joined forces with Dala.aep. From idea to product, we started building Dala Tracker." },
      { year: "2024 & beyond", text: "Continuing to build, refactor, and level up the experience for every editor." },
    ],
    skills: ["Engine Architecture", "Visual Identity", "UI/UX Design", "Frontend Development", "Backend Development", "Motion Design", "Branding", "System Design"],
    contributions: [
      "Architected the core engine of Dala Tracker",
      "Designed the visual identity and brand system",
      "Built the user experience with performance in mind",
      "Bridging creativity with technology",
    ],
    philosophy: "Software should feel invisible and powerful at the same time. Make the complex simple, and make the simple unforgettable.",
    socials: [
      { label: "YouTube", url: "https://youtube.com/@mdx_editz" },
      { label: "Instagram", url: "https://instagram.com/mdx_editz" },
      { label: "Discord", url: "https://discord.gg/tamilhitman" },
    ],
  },
];
