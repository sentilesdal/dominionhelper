// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { extractLogText } from "../../src/content/log-observer";

// Builds a mock game log container with .log-line elements
function buildLogContainer(lines: string[]): Element {
  const container = document.createElement("div");

  for (const lineText of lines) {
    const logLine = document.createElement("div");
    logLine.classList.add("log-line");
    const logBlock = document.createElement("div");
    logBlock.classList.add("log-line-block");
    const span = document.createElement("span");
    span.textContent = lineText;
    logBlock.appendChild(span);
    logLine.appendChild(logBlock);
    container.appendChild(logLine);
  }

  return container;
}

describe("extractLogText", () => {
  it("extracts text from log line elements", () => {
    const container = buildLogContainer([
      "m starts with 7 Coppers.",
      "m starts with 3 Estates.",
      "Turn 1 - muddybrown",
    ]);

    const result = extractLogText(container);

    expect(result).toEqual([
      "m starts with 7 Coppers.",
      "m starts with 3 Estates.",
      "Turn 1 - muddybrown",
    ]);
  });

  it("filters out empty lines", () => {
    const container = buildLogContainer(["m plays a Silver.", "", "  "]);

    const result = extractLogText(container);

    expect(result).toEqual(["m plays a Silver."]);
  });

  it("returns empty array for empty container", () => {
    const container = document.createElement("div");

    const result = extractLogText(container);

    expect(result).toEqual([]);
  });

  it("handles log lines with multiple spans", () => {
    const container = document.createElement("div");
    const logLine = document.createElement("div");
    logLine.classList.add("log-line");

    // Add multiple spans (the game log sometimes splits text across spans)
    const span1 = document.createElement("span");
    span1.textContent = "m plays ";
    const span2 = document.createElement("span");
    span2.textContent = "a Silver.";

    logLine.appendChild(span1);
    logLine.appendChild(span2);
    container.appendChild(logLine);

    const result = extractLogText(container);

    // textContent concatenates all child text nodes
    expect(result).toEqual(["m plays a Silver."]);
  });

  it("trims whitespace from extracted text", () => {
    const container = buildLogContainer(["  m plays a Silver.  "]);

    const result = extractLogText(container);

    expect(result).toEqual(["m plays a Silver."]);
  });
});
