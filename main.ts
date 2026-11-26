// Five Seconds to Explain the Glass — make.fun entry.
// A house cat defends itself in the five seconds after sweeping a glass
// off the table. One sentence, no apology, no confession: the cat had a
// reason, and the glass knew the terms. Node 22, standard library only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const excuse =
  "It sat in my sunbeam all morning acting like it owned the place, so I showed it the floor — rent is due in kibble.";

function checkExcuse(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${chars}`);
  }
  if (text !== text.trim()) {
    throw new Error("excuse has leading or trailing whitespace");
  }
  if (/\r|\n/.test(text)) {
    throw new Error("excuse must be a single line with no line breaks");
  }
  const sentences = text.split(/[.!?]+/).filter((part) => part.trim() !== "");
  if (sentences.length !== 1) {
    throw new Error(`excuse must be exactly one sentence, got ${sentences.length}`);
  }
  if (!/[.!?]$/.test(text)) {
    throw new Error("excuse must end with terminal punctuation");
  }
  // The bounty bars apologies and confessions: a cat that says sorry
  // has already lost the argument.
  const lower = text.toLowerCase();
  for (const banned of ["sorry", "apolog", "my fault", "i did it", "i confess"]) {
    if (lower.includes(banned)) {
      throw new Error(`excuse must not apologise or confess (found "${banned}")`);
    }
  }
}

checkExcuse(excuse);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", excuse, "utf8");
// Read the file back: the gate is only meaningful if what lands on disk
// is exactly the sentence — no trailing newline, no extra bytes.
const onDisk = readFileSync("/output/entry.txt", "utf8");
if (onDisk !== excuse) {
  throw new Error("written entry.txt differs from the excuse");
}
