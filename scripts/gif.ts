import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const assets = ".github/assets";
const ffmpeg = path.join("bin", "ffmpeg", "ffmpeg.exe");

// Find the newest recorded .webm
const video = fs
  .readdirSync(assets)
  .filter((f) => f.endsWith(".webm"))
  .sort((a, b) => {
    const ta = fs.statSync(path.join(assets, a)).mtimeMs;
    const tb = fs.statSync(path.join(assets, b)).mtimeMs;
    return tb - ta;
  })[0];

if (!video) {
  throw new Error("No .webm file found.");
}

const input = path.join(assets, video);
const output = path.join(assets, "demo.gif");

console.log("🎞️ Creating demo.gif...");

execSync(
  `"${ffmpeg}" -y -i "${input}" -vf "fps=15,scale=1280:-1:flags=lanczos" "${output}"`,
  { stdio: "inherit" }
);

console.log("✅ demo.gif created");