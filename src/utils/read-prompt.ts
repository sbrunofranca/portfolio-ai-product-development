import fs from "fs";
import path from "path";

export function readPrompt(
  filePath: string
): string {
  return fs.readFileSync(
    path.resolve(filePath),
    "utf-8"
  );
}