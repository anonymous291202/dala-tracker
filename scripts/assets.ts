import { execSync } from "child_process";

function run(command: string) {
  console.log(`\n▶ ${command}`);
  execSync(command, {
    stdio: "inherit",
  });
}

async function main() {
  console.log("🚀 Starting Asset Pipeline\n");

  run("tsx scripts/capture.ts");

  run("tsx scripts/features.ts");

  run("tsx scripts/demo.ts");

  run("tsx scripts/gif.ts");

  run("tsx scripts/readme.ts");

  run("tsx scripts/cleanup.ts");

  run("tsx scripts/optimize.ts");

  run("tsx scripts/thumbnail.ts");

  console.log("\n✅ Asset pipeline completed!");
}

main().catch(console.error);