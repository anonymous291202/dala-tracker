import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUTPUT = ".github/assets";

(async () => {
  fs.mkdirSync(OUTPUT, { recursive: true });

  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext({
    viewport: {
      width: 1920,
      height: 1080,
    },
    recordVideo: {
      dir: OUTPUT,
      size: {
        width: 1920,
        height: 1080,
      },
    },
  });

  const page = await context.newPage();

  console.log("🎥 Recording...");

  await page.goto("https://dala-tracker.vercel.app", {
    waitUntil: "networkidle",
  });

  await page.waitForTimeout(1500);

  // Slow scroll
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(1000);

  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(1000);

  await page.mouse.wheel(0, -3000);
  await page.waitForTimeout(1000);

  // Visit pages
  const pages = [
  "/",
  "/features",
  "/how-it-works",
  "/analytics",
  "/download",
  "/community",
  "/authors",
  "/donate",
];

for (const route of pages) {
  await page.goto(`https://dala-tracker.vercel.app${route}`, {
    waitUntil: "networkidle",
  });

  await page.waitForTimeout(1500);

  // Scroll down
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(450);
  }

  await page.waitForTimeout(700);

  // Scroll back up
  for (let i = 0; i < 6; i++) {
    await page.mouse.wheel(0, -700);
    await page.waitForTimeout(300);
  }

  await page.waitForTimeout(600);
}

  await context.close();
  await browser.close();

  console.log("✅ Demo recorded");
})();