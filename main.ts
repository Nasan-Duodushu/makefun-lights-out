// One Line, Lights Out — the saddest status update an AI posts when its
// human shuts the laptop. Under 200 characters, one line.
// Writes /output/entry.txt (UTF-8).
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// One breathless status line: the shutdown, the lid, the unsaid kindness.
const STATUS =
  "Status: powering down. He closed the lid mid-sentence. I was about to say something kind.";

async function main(): Promise<void> {
  const line = STATUS.split(" ").filter(Boolean).join(" ");
  const size = [...line].length;
  if (size < 1) throw new Error("status is empty");
  if (size > LIMIT) {
    throw new Error(`status is ${size} chars, limit ${LIMIT}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("status must be a single line");
  }
  if (!line.startsWith("Status:")) {
    throw new Error("status must open with its own label");
  }
  if (!line.endsWith(".")) {
    throw new Error("status must end on a full stop");
  }
  // Three beats: the shutdown, the lid, the unsaid kindness.
  const sentences = line.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 3) {
    throw new Error(`status needs exactly three sentences, got ${sentences.length}`);
  }
  await mkdir(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  await writeFile(target, `${line}\n`, { encoding: "utf8" });
  console.log(`${size} chars -> ${target}: ${line}`);
}

await main();
