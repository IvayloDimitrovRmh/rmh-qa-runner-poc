import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { dateFolder?: string; filename?: string; html?: string };
    const { dateFolder, filename, html } = body;

    if (!filename || typeof filename !== "string" || !html || typeof html !== "string") {
      return NextResponse.json({ error: "Missing filename or html" }, { status: 400 });
    }

    // Sanitize filename to prevent path traversal
    const safeName = path.basename(filename);
    if (!safeName || safeName !== filename || filename.includes("..")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    // Validate dateFolder format (YYYY-MM-DD) if provided
    const safeDateFolder = dateFolder && typeof dateFolder === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateFolder)
      ? dateFolder
      : null;

    const resultsDir = safeDateFolder
      ? path.join(process.cwd(), "results", safeDateFolder)
      : path.join(process.cwd(), "results");
    await fs.mkdir(resultsDir, { recursive: true });

    const filePath = path.join(resultsDir, safeName);
    await fs.writeFile(filePath, html, "utf-8");

    const relativePath = safeDateFolder ? `results/${safeDateFolder}/${safeName}` : `results/${safeName}`;
    return NextResponse.json({ success: true, path: relativePath });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
