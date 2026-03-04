import type { Card } from "../types";

export function analyzeOpenings(_cards: Card[]) {
  // TODO: Implement opening analysis
  // - Evaluate best $5 and $2 cards for 5/2 split (17% chance)
  // - Evaluate best $4 and $3 cards for 4/3 split (83% chance)
  // - Flag terminal collision risks
  // - Identify if opening a trasher is critical
  return { fiveTwo: [] as string[], fourThree: [] as string[] };
}
