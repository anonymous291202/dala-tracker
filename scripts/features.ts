import sharp from "sharp";
import path from "path";
import fs from "fs";

const assets = ".github/assets";

const images = [
  "home.png",
  "features-page.png",
  "how-it-works.png",
  "download.png",
];

const WIDTH = 1600;
const HEIGHT = 900;

(async () => {
  fs.mkdirSync(assets, { recursive: true });

  const imgWidth = WIDTH / 2;
  const imgHeight = HEIGHT / 2;

  const composites = await Promise.all(
    images.map(async (img, index) => ({
      input: await sharp(path.join(assets, img))
        .resize(imgWidth, imgHeight, {
          fit: "cover",
        })
        .png()
        .toBuffer(),
      left: (index % 2) * imgWidth,
      top: Math.floor(index / 2) * imgHeight,
    }))
  );

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: "#09090b",
    },
  })
    .composite(composites)
    .png()
    .toFile(path.join(assets, "features.png"));

  console.log("✅ features.png created");
})();