import { chromium, devices } from "@playwright/test";
import fs from "fs";
import path from "path";

const BASE_URL = "https://dala-tracker.vercel.app";

const OUTPUT_DIR = ".github/assets";

const pages = [
  { name: "home", route: "/" },
  { name: "features-page", route: "/features" },
  { name: "how-it-works", route: "/how-it-works" },
  { name: "download", route: "/download" },
  { name: "analytics", route: "/analytics" },
  { name: "community", route: "/community" },
  { name: "authors", route: "/authors" },
  { name: "donate", route: "/donate" },
];

async function captureDesktop() {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: {
      width: 1440,
      height: 900,
    },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  for (const item of pages) {
    console.log(`📸 ${item.name}`);

    await page.goto(`${BASE_URL}${item.route}`, {
      waitUntil: "networkidle",
    });

    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${item.name}.png`),
      fullPage: true,
    });
  }

  await browser.close();
}

async function captureMobile() {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    ...devices["iPhone 15 Pro"],
  });

  const page = await context.newPage();

  await page.goto(BASE_URL, {
    waitUntil: "networkidle",
  });

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile.png"),
    fullPage: true,
  });

  await browser.close();
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  await captureDesktop();
  await captureMobile();

  console.log("✅ Finished!");
})();