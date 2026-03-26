import { describe, expect, it } from "vitest";
import {
  extractCardName,
  extractGameStateSnapshot,
  extractTurnNumber,
  extractZoneSnapshot,
} from "../../src/content/game-state-bridge-runtime";

describe("extractCardName", () => {
  it("reads names from dominion.games cardName objects", () => {
    expect(
      extractCardName({
        cardName: { name: "Copper" },
      }),
    ).toBe("Copper");
  });

  it("falls back to pileName and private image metadata", () => {
    expect(
      extractCardName({
        pileName: { name: "Estate" },
      }),
    ).toBe("Estate");

    expect(
      extractCardName({
        privateImage: { name: "Village" },
      }),
    ).toBe("Village");
  });

  it("ignores placeholder hidden-card names", () => {
    expect(
      extractCardName({
        privateImage: { name: "Back" },
      }),
    ).toBeNull();

    expect(
      extractCardName({
        cardName: { name: "card" },
      }),
    ).toBeNull();
  });
});

describe("extractZoneSnapshot", () => {
  it("extracts exact local hand cards from privateCards", () => {
    const zone = {
      zoneName: "HandZone",
      cardStacks: [
        {
          privateCards: [
            { cardName: { name: "Copper" } },
            { cardName: { name: "Copper" } },
            { cardName: { name: "Copper" } },
            { cardName: { name: "Estate" } },
          ],
          privateCount: 4,
        },
        {
          privateCards: [{ pileName: { name: "Estate" } }],
          privateCount: -1,
          count: -1,
        },
      ],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "HandZone",
      cards: ["Copper", "Copper", "Copper", "Estate", "Estate"],
      count: 5,
    });
  });

  it("uses primaryStacks to avoid double-counting mirrored draw piles", () => {
    const primaryStack = {
      privateAnonymousCards: 5,
      privateCount: 5,
    };
    const windowStack = {
      privateAnonymousCards: 5,
      privateCount: 5,
    };

    const zone = {
      zoneName: "DrawZone",
      primaryStacks: [primaryStack],
      windowStacks: [windowStack],
      cardStacks: [windowStack, primaryStack],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "DrawZone",
      cards: [],
      count: 5,
    });
  });

  it("counts hidden opponent hands from anonymous cards", () => {
    const zone = {
      zoneName: "HandZone",
      cardStacks: [
        {
          privateAnonymousCards: 5,
          privateCount: 5,
        },
      ],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "HandZone",
      cards: [],
      count: 5,
    });
  });

  it("uses exact hand stack sizes instead of inflated explicit counts", () => {
    const zone = {
      zoneName: "HandZone",
      cardStacks: [
        {
          privateCards: [{ privateImage: { name: "Back" } }],
          privateCount: 5,
        },
      ],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "HandZone",
      cards: [],
      count: 1,
    });
  });

  it("extracts visible in-play cards from card stacks", () => {
    const zone = {
      zoneName: "InPlayZone",
      cardStacks: [
        {
          privateCards: [
            { cardName: { name: "Copper" } },
            { cardName: { name: "Silver" } },
          ],
        },
      ],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "InPlayZone",
      cards: ["Copper", "Silver"],
      count: 2,
    });
  });

  it("keeps explicit counts when only the top card is visible", () => {
    const zone = {
      zoneName: "DiscardZone",
      cardStacks: [
        {
          topCard: { pileName: { english: "Silver" } },
          count: 3,
        },
      ],
    };

    expect(extractZoneSnapshot(zone)).toEqual({
      zoneName: "DiscardZone",
      cards: ["Silver"],
      count: 3,
    });
  });
});

describe("extractTurnNumber", () => {
  it("prefers the activeTurn turn number from the live game state", () => {
    expect(
      extractTurnNumber({
        state: {
          activeTurn: { turnNumber: 7 },
          turnCounter: 2,
        },
      }),
    ).toBe(7);
  });
});

describe("extractGameStateSnapshot", () => {
  it("builds a serializable bridge snapshot for tracker consumption", () => {
    const snapshot = extractGameStateSnapshot({
      state: {
        activeTurn: { turnNumber: 1 },
        players: [
          {
            name: "miniontester1",
            initials: "m",
            isMe: true,
            ownedZones: [
              {
                zoneName: "HandZone",
                cardStacks: [
                  {
                    privateCards: [
                      { cardName: { name: "Copper" } },
                      { cardName: { name: "Estate" } },
                    ],
                  },
                ],
              },
              {
                zoneName: "DrawZone",
                primaryStacks: [{ privateAnonymousCards: 5, privateCount: 5 }],
              },
            ],
          },
        ],
      },
    });

    expect(snapshot).toEqual({
      turnNumber: 1,
      players: [
        {
          name: "miniontester1",
          initials: "m",
          isMe: true,
          zones: [
            {
              zoneName: "HandZone",
              cards: ["Copper", "Estate"],
              count: 2,
            },
            {
              zoneName: "DrawZone",
              cards: [],
              count: 5,
            },
          ],
        },
      ],
    });
  });
});
