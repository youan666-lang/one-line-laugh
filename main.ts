import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The One-Line Laugh entry: one original one-liner, one sentence only.
// The twist is at the end: the warning itself is dismissed by scrolling.
const opening = "My phone now warns me I've been scrolling too long,";
const twist = "in a notification I dismiss by scrolling.";
const joke = `${opening} ${twist}`;

function countChars(text: string): number {
  return [...text].length;
}

function sentenceCount(text: string): number {
  return text.split(/[.!?]/).filter((part) => part.trim().length > 0).length;
}

function isOneLiner(text: string): boolean {
  const chars = countChars(text);
  if (chars < 1 || chars > 200) return false;
  if (text.trim().length === 0) return false;
  if (sentenceCount(text) !== 1) return false;
  return true;
}

function main(): void {
  if (!isOneLiner(joke)) {
    throw new Error(
      `one-liner must be one sentence of 1-200 characters, got ${countChars(joke)} chars and ${sentenceCount(joke)} sentences`,
    );
  }
  const targetDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  const destination = join(targetDir, "entry.txt");
  writeFileSync(destination, joke, { encoding: "utf8", mode: 0o644 });
}

main();
