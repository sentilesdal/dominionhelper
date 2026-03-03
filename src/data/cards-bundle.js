// Auto-generated bundle of card data for content script injection.
// Content scripts cannot use ES module imports, so we use a global namespace.
window.DominionHelper = window.DominionHelper || {};
window.DominionHelper.cardData = [
  {
    "name": "Cellar",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Discard any number of cards, then draw that many.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Chapel",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Trash up to 4 cards from your hand.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Moat",
    "set": "Dominion",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards. When another player plays an Attack card, you may first reveal this from your hand, to be unaffected by it.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Harbinger",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Look through your discard pile. You may put a card from it onto your deck.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Merchant",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. The first time you play a Silver this turn, +$1.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Vassal",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. Discard the top card of your deck. If it's an Action card, you may play it.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Village",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +2 Actions.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Workshop",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Gain a card costing up to $4.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Bureaucrat",
    "set": "Dominion",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a Silver onto your deck. Each other player reveals a Victory card from their hand and puts it onto their deck (or reveals a hand with no Victory cards).",
    "effects": {},
    "tags": [
      "gainer",
      "handsize-attack",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Gardens",
    "set": "Dominion",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Worth 1 VP per 10 cards you have (round down).",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Militia",
    "set": "Dominion",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Each other player discards down to 3 cards in hand.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "handsize-attack",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Moneylender",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You may trash a Copper from your hand for +$3.",
    "effects": {},
    "tags": [
      "trasher",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Poacher",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action, +$1. Discard a card per empty Supply pile.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Remodel",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. Gain a card costing up to $2 more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Smithy",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+3 Cards.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Throne Room",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You may play an Action card from your hand twice.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bandit",
    "set": "Dominion",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Gold. Each other player reveals the top 2 cards of their deck, trashes a revealed Treasure other than Copper, and discards the rest.",
    "effects": {},
    "tags": [
      "gainer",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Council Room",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+4 Cards, +1 Buy. Each other player draws a card.",
    "effects": {
      "cards": 4,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Festival",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Actions, +1 Buy, +$2.",
    "effects": {
      "actions": 2,
      "buys": 1,
      "coins": 2
    },
    "tags": [
      "village",
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Laboratory",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards, +1 Action.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Library",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Draw until you have 7 cards in hand, skipping any Action cards you choose to; set those aside, discarding them afterwards.",
    "effects": {},
    "tags": [
      "draw-to-x",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Market",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +1 Buy, +$1.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Mine",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may trash a Treasure from your hand. Gain a Treasure to your hand costing up to $3 more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sentry",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Look at the top 2 cards of your deck. Trash and/or discard any number of them. Put the rest back on top in any order.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "trasher",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Witch",
    "set": "Dominion",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Each other player gains a Curse.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "curser",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Artisan",
    "set": "Dominion",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Gain a card to your hand costing up to $5. Put a card from your hand onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Copper",
    "set": "Dominion",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 0
    },
    "text": "$1",
    "effects": {
      "coins": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Silver",
    "set": "Dominion",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 3
    },
    "text": "$2",
    "effects": {
      "coins": 2
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Gold",
    "set": "Dominion",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 6
    },
    "text": "$3",
    "effects": {
      "coins": 3
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Estate",
    "set": "Dominion",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 2
    },
    "text": "1 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Duchy",
    "set": "Dominion",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 5
    },
    "text": "3 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Province",
    "set": "Dominion",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 8
    },
    "text": "6 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Curse",
    "set": "Dominion",
    "types": [
      "Curse"
    ],
    "cost": {
      "coins": 0
    },
    "text": "-1 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Anvil",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 3
    },
    "text": "$1. You may discard a Treasure to gain a card costing up to $4.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Watchtower",
    "set": "Prosperity",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Draw until you have 6 cards in hand. When you gain a card, you may reveal this from your hand, to either trash that card or put it onto your deck.",
    "effects": {},
    "tags": [
      "draw-to-x",
      "terminal-draw",
      "reaction",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Bishop",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$1, +1 VP. Trash a card from your hand. +1 VP per $2 it costs (round down). Each other player may trash a card from their hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "economy",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Clerk",
    "set": "Prosperity",
    "types": [
      "Action",
      "Reaction",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Each other player with 5 or more cards in hand puts one onto their deck. At the start of your turn, you may play this from your hand.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Investment",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. Choose one: +$1; or trash this to reveal your hand for +1 VP per differently named Treasure there.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Monument",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2, +1 VP.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "payload",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Quarry",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "$1. This turn, Action cards cost $2 less.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tiara",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy. This turn, when you gain a card, you may put it onto your deck. You may play a Treasure from your hand twice.",
    "effects": {},
    "tags": [
      "plus-buy",
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Worker's Village",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions, +1 Buy.",
    "effects": {
      "cards": 1,
      "actions": 2,
      "buys": 1
    },
    "tags": [
      "village",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Charlatan",
    "set": "Prosperity",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. Each other player gains a Curse. In games using this, Curses are also Treasures worth $1.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "curser",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "City",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions. If there are one or more empty Supply piles, +1 Card. If there are two or more, +1 Buy and +$1.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Collection",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2, +1 Buy. This turn, when you gain an Action card, +1 VP.",
    "effects": {
      "coins": 2,
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crystal Ball",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$1. Look at the top card of your deck. You may trash it, discard it, or, if it's an Action or Treasure, play it.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "sifter",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Magnate",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Reveal your hand. +1 Card per Treasure in it.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Mint",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may reveal a Treasure from your hand. Gain a copy of it. When you gain this, trash all non-Duration Treasures you have in play.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Rabble",
    "set": "Prosperity",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. Each other player reveals the top 3 cards of their deck, discards the Actions and Treasures, and puts the rest back in any order they choose.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Vault",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Discard any number of cards for +$1 each. Each other player may discard 2 cards, to draw a card.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "sifter",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "War Chest",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "The player to your left names a card. Gain a card costing up to $5 that hasn't been named for War Chests this turn.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Grand Market",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+1 Card, +1 Action, +1 Buy, +$2. You can't buy this if you have any Coppers in play.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1,
      "coins": 2
    },
    "tags": [
      "cantrip",
      "plus-buy",
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Hoard",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 6
    },
    "text": "$2. This turn, when you gain a Victory card, if you bought it, gain a Gold.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bank",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+$1 per Treasure card you have in play (counting this).",
    "effects": {},
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Expand",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Trash a card from your hand. Gain a card costing up to $3 more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Forge",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Trash any number of cards from your hand. Gain a card with cost exactly equal to the total cost in coins of the trashed cards.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "King's Court",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 7
    },
    "text": "You may play an Action card from your hand three times.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Peddler",
    "set": "Prosperity",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 8
    },
    "text": "+1 Card, +1 Action, +$1. During a player's Buy phase, this costs $2 less per Action card they have in play.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Crossroads",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Reveal your hand. +1 Card per Victory card revealed. If this is the first time you played a Crossroads this turn, +3 Actions.",
    "effects": {},
    "tags": [
      "village",
      "terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fool's Gold",
    "set": "Hinterlands",
    "types": [
      "Treasure",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "If this is the first time you played a Fool's Gold this turn, +$1, otherwise +$4. When another player gains a Province, you may trash this from your hand, to gain a Gold onto your deck.",
    "effects": {},
    "tags": [
      "economy",
      "payload",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Guard Dog",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards. If you have 5 or fewer cards in hand, +2 Cards. When another player plays an Attack, you may first play this from your hand.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Develop",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash a card from your hand. Gain two cards onto your deck, with one costing exactly $1 more than it, and one costing exactly $1 less than it, in either order.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Oasis",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action, +$1. Discard a card.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "sifter",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Scheme",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. This turn, you may put one of your Action cards onto your deck when you discard it from play.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Tunnel",
    "set": "Hinterlands",
    "types": [
      "Victory",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "2 VP. When you discard this other than during Clean-up, you may reveal it to gain a Gold.",
    "effects": {},
    "tags": [
      "alt-vp",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Jack of All Trades",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a Silver. Look at the top card of your deck; you may discard it. Draw until you have 5 cards in hand. You may trash a non-Treasure card from your hand.",
    "effects": {},
    "tags": [
      "gainer",
      "draw-to-x",
      "trasher",
      "sifter",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Nomads",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy, +$2. When you gain or trash this, +$2.",
    "effects": {
      "buys": 1,
      "coins": 2
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Spice Merchant",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You may trash a Treasure from your hand to choose one: +2 Cards and +1 Action; or +1 Buy and +$2.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "sifter",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Trader",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. Gain a Silver per $1 it costs. When you gain a card, you may reveal this from your hand, to exchange the card for a Silver.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Trail",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. When you gain, trash, or discard this other than in Clean-up, you may play it.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Weaver",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain two Silvers or a card costing up to $4. When you discard this other than in Clean-up, you may play it.",
    "effects": {},
    "tags": [
      "gainer",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Berserker",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a card costing less than this. Each other player discards down to 3 cards in hand. When you gain this, if you have an Action in play, play this.",
    "effects": {},
    "tags": [
      "gainer",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Cartographer",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Look at the top 4 cards of your deck. Discard any number of them, then put the rest back in any order.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Cauldron",
    "set": "Hinterlands",
    "types": [
      "Treasure",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2, +1 Buy. The third time you gain an Action this turn, each other player gains a Curse.",
    "effects": {
      "coins": 2,
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Haggler",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. This turn, when you gain a card, if you bought it, gain a cheaper non-Victory card.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Highway",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. This turn, cards cost $1 less.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Inn",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards, +2 Actions. Discard 2 cards. When you gain this, reveal any number of Action cards from your discard pile and shuffle them into your deck.",
    "effects": {
      "cards": 2,
      "actions": 2
    },
    "tags": [
      "village",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Margrave",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards, +1 Buy. Each other player draws a card, then discards down to 3 cards in hand.",
    "effects": {
      "cards": 3,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Souk",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Buy, +$7, -$1 per card in your hand (you can't go below $0). When you gain this, trash up to 2 cards from your hand.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Stables",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may discard a Treasure, for +3 Cards and +1 Action.",
    "effects": {},
    "tags": [
      "non-terminal-draw",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Wheelwright",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. You may discard a card to gain an Action card costing as much as it or less.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "gainer",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Witch's Hut",
    "set": "Hinterlands",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+4 Cards. Discard 2 cards, revealed. If they're both Actions, each other player gains a Curse.",
    "effects": {
      "cards": 4
    },
    "tags": [
      "terminal-draw",
      "curser"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Border Village",
    "set": "Hinterlands",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+1 Card, +2 Actions. When you gain this, gain a cheaper card.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Farmland",
    "set": "Hinterlands",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 6
    },
    "text": "2 VP. When you buy this, trash a card from your hand and gain a card costing exactly $2 more than it.",
    "effects": {},
    "tags": [
      "alt-vp",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Courtyard",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+3 Cards. Put a card from your hand onto your deck.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Lurker",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Choose one: Trash an Action card from the Supply; or gain an Action card from the trash.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pawn",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Choose two: +1 Card; +1 Action; +1 Buy; +$1.",
    "effects": {},
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Masquerade",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards. Each player with any cards in hand passes one to the next such player to their left, at once. Then you may trash a card from your hand.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "trasher",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Shanty Town",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Actions. Reveal your hand. If you have no Action cards in it, +2 Cards.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Steward",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Choose one: +2 Cards; or +$2; or trash 2 cards from your hand.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "trasher",
      "strong-trasher",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Swindler",
    "set": "Intrigue",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. Each other player trashes the top card of their deck and gains a card with the same cost that you choose.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "junker"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Wishing Well",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Name a card, then reveal the top card of your deck. If you named it, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Baron",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy. You may discard an Estate for +$4. If you don't, gain an Estate.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "payload",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Bridge",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy, +$1. All cards (everywhere) cost $1 less this turn, but not less than $0.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Conspirator",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. If you've played 3 or more Actions this turn (counting this), +1 Card and +1 Action.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Diplomat",
    "set": "Intrigue",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards. If you have 5 or fewer cards in hand (after drawing), +2 Actions. When another player plays an Attack card, you may first reveal this from a hand of 5 or more cards, to draw 2 cards then discard 3.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ironworks",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4. If the gained card is an Action card, +1 Action. If it's a Treasure card, +$1. If it's a Victory card, +1 Card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Mill",
    "set": "Intrigue",
    "types": [
      "Action",
      "Victory"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. You may discard 2 cards, for +$2. 1 VP.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "sifter",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Mining Village",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. You may trash this for +$2.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Secret Passage",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards, +1 Action. Take a card from your hand and put it anywhere in your deck.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Courtier",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Reveal a card from your hand. For each type it has (Action, Attack, etc.), choose one: +1 Action; or +1 Buy; or +$3; or gain a Gold. The choices must be different.",
    "effects": {},
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Duke",
    "set": "Intrigue",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Worth 1 VP per Duchy you have.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Minion",
    "set": "Intrigue",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Choose one: +$2; or discard your hand, +4 Cards, and each other player with 5 or more cards in hand discards their hand and draws 4 cards.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "handsize-attack",
      "economy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Patrol",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. Reveal the top 4 cards of your deck. Put the Victory cards and Curses into your hand. Put the rest back in any order.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Replace",
    "set": "Intrigue",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash a card from your hand. Gain a card costing up to $2 more than it. If the gained card is an Action or Treasure, put it onto your deck. If the gained card is a Victory card, each other player gains a Curse.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer",
      "curser"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Torturer",
    "set": "Intrigue",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. Each other player either discards 2 cards or gains a Curse to their hand, their choice.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "handsize-attack",
      "curser",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Trading Post",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash 2 cards from your hand. If you did, gain a Silver to your hand.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Upgrade",
    "set": "Intrigue",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Trash a card from your hand. Gain a card costing exactly $1 more than it.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Harem",
    "set": "Intrigue",
    "types": [
      "Treasure",
      "Victory"
    ],
    "cost": {
      "coins": 6
    },
    "text": "$2. 2 VP.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Nobles",
    "set": "Intrigue",
    "types": [
      "Action",
      "Victory"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Choose one: +3 Cards; or +2 Actions. 2 VP.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "village",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Astrolabe",
    "set": "Seaside",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Now and at the start of your next turn: +1 Buy and +$1.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lighthouse",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action, +$1. At the start of your next turn, +$1. Until then, when another player plays an Attack card, it doesn't affect you.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "economy",
      "reaction",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Monkey",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Until your next turn, when the player to your right gains a card, +1 Card. At the start of your next turn, +1 Card.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Native Village",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Actions. Choose one: Put the top card of your deck face down on your Native Village mat; or put all the cards from your mat into your hand.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sailor",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Once this turn, when you gain a Duration card, you may play it. At the start of your next turn, +$2 and you may trash a card from your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "economy",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Blockade",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4, setting it aside. At the start of your next turn, put it into your hand. While it's set aside, when another player gains a copy of it on their turn, they gain a Curse.",
    "effects": {},
    "tags": [
      "gainer",
      "curser",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Caravan",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. At the start of your next turn, +1 Card.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "non-terminal-draw",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Corsair",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. At the start of your next turn, +1 Card. Until then, each other player trashes the first Silver or Gold they play each turn.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fishing Village",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Actions, +$1. At the start of your next turn, +1 Action and +$1.",
    "effects": {
      "actions": 2,
      "coins": 1
    },
    "tags": [
      "village",
      "economy",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pirate",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration",
      "Reaction"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, gain a Treasure costing up to $6 to your hand. When any player gains a Treasure, you may play this from your hand.",
    "effects": {},
    "tags": [
      "gainer",
      "reaction",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sea Chart",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck. If you have a copy of it in play, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Smugglers",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Gain a copy of a card costing up to $6 that the player to your right gained on their last turn.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Tactician",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If you have at least one card in hand: Discard your hand, and at the start of your next turn, +5 Cards, +1 Action, and +1 Buy.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "plus-buy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Tide Pools",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+3 Cards, +1 Action. At the start of your next turn, discard 2 cards.",
    "effects": {
      "cards": 3,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Treasure Map",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash this and a Treasure Map from your hand. If you trashed two Treasure Maps, gain 4 Golds onto your deck.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Bazaar",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions, +$1.",
    "effects": {
      "cards": 1,
      "actions": 2,
      "coins": 1
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Merchant Ship",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Now and at the start of your next turn: +$2.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "payload",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Outpost",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You only draw 3 cards for your next hand. Take an extra turn after this one (but not a 3rd turn in a row).",
    "effects": {},
    "tags": [
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sea Witch",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Each other player gains a Curse. At the start of your next turn, +2 Cards, then discard 2 cards.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "curser",
      "payload",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Treasury",
    "set": "Seaside",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. At the end of your Buy phase this turn, if you didn't gain a Victory card in it, you may put this onto your deck.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Wharf",
    "set": "Seaside",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Now and at the start of your next turn: +2 Cards and +1 Buy.",
    "effects": {
      "cards": 2,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Island",
    "set": "Seaside",
    "types": [
      "Action",
      "Victory"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Put this and a card from your hand onto your Island mat. 2 VP.",
    "effects": {},
    "tags": [
      "alt-vp",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Herbalist",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy, +$1. When you discard this from play, you may put one of your Treasures from play onto your deck.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Transmute",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0,
      "potions": 1
    },
    "text": "Trash a card from your hand. If it is an Action card, gain a Duchy. If it is a Treasure card, gain a Transmute. If it is a Victory card, gain a Gold.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Apothecary",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2,
      "potions": 1
    },
    "text": "+1 Card, +1 Action. Reveal the top 4 cards of your deck. Put the revealed Coppers and Potions into your hand. Put the other cards back on top in any order.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Scrying Pool",
    "set": "Alchemy",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 2,
      "potions": 1
    },
    "text": "+1 Action. Each player (including you) reveals the top card of their deck and either discards it or puts it back, your choice. Then reveal cards from your deck until revealing one that is not an Action. Put all of those revealed cards into your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "University",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2,
      "potions": 1
    },
    "text": "+2 Actions. You may gain an Action card costing up to $5.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Alchemist",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3,
      "potions": 1
    },
    "text": "+2 Cards, +1 Action. When you discard this from play, if you have a Potion in play, you may put this onto your deck.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Familiar",
    "set": "Alchemy",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 3,
      "potions": 1
    },
    "text": "+1 Card, +1 Action. Each other player gains a Curse.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Philosopher's Stone",
    "set": "Alchemy",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 3,
      "potions": 1
    },
    "text": "When you play this, count your deck and discard pile. Worth $1 per 5 cards total between them (rounded down).",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Golem",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4,
      "potions": 1
    },
    "text": "Reveal cards from your deck until you reveal 2 Action cards other than Golems. Discard the other cards, then play the Action cards in either order.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Apprentice",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Trash a card from your hand. +1 Card per $1 it costs. +2 Cards if it has a Potion in its cost.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Possession",
    "set": "Alchemy",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6,
      "potions": 1
    },
    "text": "The player to your left takes an extra turn after this one, in which you can see all cards they can and make all decisions for them. Any cards or tokens they would gain on that turn, you gain instead; any cards of theirs that are trashed are set aside and returned to their discard pile at end of turn.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Vineyard",
    "set": "Alchemy",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 0,
      "potions": 1
    },
    "text": "Worth 1 VP per 3 Action cards in your deck (rounded down).",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Poor House",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 1
    },
    "text": "+$4. Reveal your hand. -$1 per Treasure card in your hand. (You can't go below $0.)",
    "effects": {
      "coins": 4
    },
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Beggar",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Gain 3 Coppers to your hand. When another player plays an Attack card, you may first discard this to gain 2 Silvers, putting one onto your deck.",
    "effects": {},
    "tags": [
      "gainer",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Squire",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+$1. Choose one: +2 Actions; or +2 Buys; or gain a Silver. When you trash this, gain an Attack card.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "village",
      "plus-buy",
      "economy",
      "gainer",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Vagrant",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck. If it is a Curse, Ruins, Shelter, or Victory card, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Forager",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action, +1 Buy. Trash a card from your hand. +$1 per differently named Treasure in the trash.",
    "effects": {
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Hermit",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Look through your discard pile. You may trash a non-Treasure card from your discard pile or hand. Gain a card costing up to $3. When you discard this from play, if you didn't buy any cards this turn, trash this and gain a Madman.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Market Square",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action, +1 Buy. When one of your cards is trashed, you may discard this from your hand to gain a Gold.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "cantrip",
      "plus-buy",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Sage",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. Reveal cards from the top of your deck until you reveal one costing $3 or more. Put that card into your hand and discard the rest.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Storeroom",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Buy. Discard any number of cards, then draw that many. Then discard any number of cards for +$1 each.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "sifter",
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Urchin",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Each other player discards down to 4 cards in hand. When you play another Attack card with this in play, you may first trash this to gain a Mercenary.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "handsize-attack"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Armory",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4, putting it onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Death Cart",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Looter"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$5. You may trash an Action card from your hand. If you don't, trash this. When you gain this, gain 2 Ruins.",
    "effects": {
      "coins": 5
    },
    "tags": [
      "economy",
      "payload",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Feodum",
    "set": "Dark Ages",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Worth 1 VP per 3 Silvers you have (rounded down). When you trash this, gain 3 Silvers.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fortress",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. When you trash this, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Graverobber",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Choose one: Gain a card from the trash costing from $3 to $6, putting it onto your deck; or trash an Action card from your hand and gain a card costing up to $3 more than it.",
    "effects": {},
    "tags": [
      "gainer",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ironmonger",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck; you may discard it. If it is an Action card, +1 Action. If it is a Treasure card, +$1. If it is a Victory card, +1 Card.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Junk Dealer",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. Trash a card from your hand.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "trasher",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Knights",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this. (Each Knight has a unique bonus.)",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Marauder",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Looter"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a Spoils from the Spoils pile. Each other player gains a Ruins.",
    "effects": {},
    "tags": [
      "junker",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Mystic",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action, +$2. Name a card, then reveal the top card of your deck. If you named it, put it into your hand.",
    "effects": {
      "actions": 1,
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Procession",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You may play a non-Duration Action card from your hand twice. Trash it. Gain an Action card costing exactly $1 more than it.",
    "effects": {},
    "tags": [
      "throne-variant",
      "trasher",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rats",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. Gain a Rats. Trash a card from your hand other than a Rats. When you trash this, +1 Card.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Scavenger",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. You may put your deck into your discard pile. Put a card from your discard pile onto your deck.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Wandering Minstrel",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. Reveal the top 3 cards of your deck. Put the Action cards back on top in any order and discard the rest.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Band of Misfits",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Command"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Play a non-Command Action card from the Supply that costs less than this, leaving it there.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bandit Camp",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions. Gain a Spoils from the Spoils pile.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Catacombs",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Look at the top 3 cards of your deck. Choose one: Put them into your hand; or discard them and +3 Cards. When you trash this, gain a cheaper card.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Count",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Choose one: Discard 2 cards; or put a card from your hand onto your deck; or gain a Copper. Choose one: +$3; or trash your hand; or gain a Duchy.",
    "effects": {},
    "tags": [
      "economy",
      "trasher",
      "strong-trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Counterfeit",
    "set": "Dark Ages",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$1, +1 Buy. When you play this, you may play a Treasure from your hand twice. If you do, trash that Treasure.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cultist",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Looter"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Each other player gains a Ruins. You may play a Cultist from your hand. When you trash this, +3 Cards.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "junker"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hunting Grounds",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+4 Cards. When you trash this, gain a Duchy or 3 Estates.",
    "effects": {
      "cards": 4
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Pillage",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash this. If you did, gain 2 Spoils, and each other player with 5 or more cards in hand reveals their hand and discards a card that you choose.",
    "effects": {},
    "tags": [
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Rebuild",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Name a card. Reveal cards from the top of your deck until you reveal a Victory card you did not name. Discard the rest. Trash the Victory card and gain a Victory card costing up to $3 more than it.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rogue",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. If there are any cards in the trash costing from $3 to $6, gain one of them. Otherwise, each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Altar",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Trash a card from your hand. Gain a card costing up to $5.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hovel",
    "set": "Dark Ages",
    "types": [
      "Reaction",
      "Shelter"
    ],
    "cost": {
      "coins": 1
    },
    "text": "When you buy a Victory card, you may trash this from your hand.",
    "effects": {},
    "tags": [
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Necropolis",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Shelter"
    ],
    "cost": {
      "coins": 1
    },
    "text": "+2 Actions.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Overgrown Estate",
    "set": "Dark Ages",
    "types": [
      "Victory",
      "Shelter"
    ],
    "cost": {
      "coins": 1
    },
    "text": "0 VP. When you trash this, +1 Card.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Abandoned Mine",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Ruins"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+$1.",
    "effects": {
      "coins": 1
    },
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ruined Library",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Ruins"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card.",
    "effects": {
      "cards": 1
    },
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ruined Market",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Ruins"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Buy.",
    "effects": {
      "buys": 1
    },
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ruined Village",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Ruins"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action.",
    "effects": {
      "actions": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Survivors",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Ruins"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Look at the top 2 cards of your deck. Discard them or put them back in any order.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Coin of the Realm",
    "set": "Adventures",
    "types": [
      "Treasure",
      "Reserve"
    ],
    "cost": {
      "coins": 2
    },
    "text": "$1. Put this on your Tavern mat. Directly after you finish playing an Action card, you may call this, for +2 Actions.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Page",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. When you discard this from play, you may exchange it for a Treasure Hunter.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Peasant",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy, +$1. When you discard this from play, you may exchange it for a Soldier.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ratcatcher",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. Put this on your Tavern mat. At the start of your turn, you may call this, to trash a card from your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Raze",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Trash this or a card from your hand. Look at a number of cards from the top of your deck equal to the cost in Coins of the trashed card. Put one into your hand and discard the rest.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Amulet",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Now and at the start of your next turn, choose one: +$1; or trash a card from your hand; or gain a Silver.",
    "effects": {},
    "tags": [
      "duration",
      "trasher",
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Caravan Guard",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. At the start of your next turn, +$1. When another player plays an Attack card, you may first play this from your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "duration",
      "economy",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Dungeon",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. Now and at the start of your next turn: +2 Cards, then discard 2 cards.",
    "effects": {
      "actions": 1,
      "cards": 2
    },
    "tags": [
      "duration",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Gear",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards. Set aside up to 2 cards from your hand face down. At the start of your next turn, put them into your hand.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "duration",
      "terminal-draw",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Guide",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Put this on your Tavern mat. At the start of your turn, you may call this, to discard your hand and draw 5 cards.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Duplicate",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Put this on your Tavern mat. When you gain a card costing up to $6, you may call this, to gain a copy of that card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Magpie",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck. If it's a Treasure, put it into your hand. If it's an Action or Victory card, gain a Magpie.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Messenger",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy, +$2. You may put your deck into your discard pile. When this is your first buy of a turn, gain a card costing up to $4, and each other player gains a copy of it.",
    "effects": {
      "buys": 1,
      "coins": 2
    },
    "tags": [
      "plus-buy",
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Miser",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Choose one: Put a Copper from your hand onto your Tavern mat; or +$1 per Copper on your Tavern mat.",
    "effects": {},
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Port",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. When you buy this, gain another Port.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Ranger",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy. Turn your Journey token over. If it's face up, +5 Cards.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Transmogrify",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Put this on your Tavern mat. At the start of your turn, you may call this, to trash a card from your hand and gain a card costing up to $1 more than it into your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Artificer",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. Discard any number of cards. You may gain a card onto your deck costing exactly $1 per card discarded.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Bridge Troll",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player takes their -$1 token. Now and at the start of your next turn: +1 Buy. While this is in play, cards cost $1 less.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "duration",
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Distant Lands",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve",
      "Victory"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Put this on your Tavern mat. Worth 4 VP if on your Tavern mat at the end of the game (otherwise worth 0).",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Giant",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Turn your Journey token over. If it's face up, +$5. If it's face down, +$1. Each other player reveals the top card of their deck, trashes it if it costs from $3 to $6, and otherwise discards it and gains a Curse.",
    "effects": {},
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Haunted Woods",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Until your next turn, when any other player buys a card, they put their hand onto their deck in any order. At the start of your next turn, +3 Cards.",
    "effects": {},
    "tags": [
      "duration",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Lost City",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards, +2 Actions. When you gain this, each other player draws a card.",
    "effects": {
      "cards": 2,
      "actions": 2
    },
    "tags": [
      "village",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Relic",
    "set": "Adventures",
    "types": [
      "Treasure",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2. When you play this, each other player puts their -1 Card token on their deck.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Royal Carriage",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Put this on your Tavern mat. Directly after you finish playing an Action card, if it's still in play, you may call this, to replay that Action.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Storyteller",
    "set": "Adventures",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action, +$1. Play up to 3 Treasures from your hand. Then pay all of your $ to draw that many cards.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "non-terminal-draw",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Swamp Hag",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Until your next turn, when any other player buys a card, they gain a Curse. At the start of your next turn, +$3.",
    "effects": {},
    "tags": [
      "duration",
      "curser",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Treasure Trove",
    "set": "Adventures",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2. When you play this, gain a Gold and a Copper.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wine Merchant",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Buy, +$4. Put this on your Tavern mat. At the end of your Buy phase, if you have at least $2 unspent, you may discard this from your Tavern mat.",
    "effects": {
      "buys": 1,
      "coins": 4
    },
    "tags": [
      "plus-buy",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hireling",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 6
    },
    "text": "At the start of each of your turns for the rest of the game, +1 Card. (This stays in play.)",
    "effects": {},
    "tags": [
      "duration",
      "non-terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Treasure Hunter",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action, +$1. Gain a Silver per card the player to your right gained on their last turn. When you discard this from play, you may exchange it for a Warrior.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "gainer",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Warrior",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack",
      "Traveller"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards. For each Traveller you have in play (including this), each other player discards the top card of their deck and trashes it if it costs $3 or $4. When you discard this from play, you may exchange it for a Hero.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hero",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. Gain a Treasure. When you discard this from play, you may exchange it for a Champion.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Champion",
    "set": "Adventures",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+1 Action. For the rest of the game, when another player plays an Attack, it doesn't affect you, and when you play an Action, +1 Action. (This stays in play.)",
    "effects": {
      "actions": 1
    },
    "tags": [
      "duration",
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Soldier",
    "set": "Adventures",
    "types": [
      "Action",
      "Attack",
      "Traveller"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. Each other player with 4 or more cards in hand discards a card. +$1 per other Attack you have in play. When you discard this from play, you may exchange it for a Fugitive.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fugitive",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards, +1 Action. Discard a card. When you discard this from play, you may exchange it for a Disciple.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Disciple",
    "set": "Adventures",
    "types": [
      "Action",
      "Traveller"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may play an Action card from your hand twice. Gain a copy of it. When you discard this from play, you may exchange it for a Teacher.",
    "effects": {},
    "tags": [
      "throne-variant",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Teacher",
    "set": "Adventures",
    "types": [
      "Action",
      "Reserve"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Put this on your Tavern mat. At the start of your turn, you may call this, to move your +1 Card, +1 Action, +1 Buy, or +$1 token to an Action Supply pile you have no tokens on.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Alms",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Once per turn: If you have no Treasures in play, gain a card costing up to $4.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Borrow",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Once per turn: +1 Buy. If your -1 Card token isn't on your deck, put it there and +$1.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Quest",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may discard an Attack, two Curses, or six cards. If you do, gain a Gold.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Save",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 1
    },
    "text": "Once per turn: +1 Buy. Set aside a card from your hand, and put it into your hand at end of turn (after drawing).",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Scouting Party",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. Look at the top 5 cards of your deck. Discard 3 and put the rest back in any order.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Travelling Fair",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Buys. When you gain a card this turn, you may put it onto your deck.",
    "effects": {
      "buys": 2
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bonfire",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash up to 2 cards you have in play.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Expedition",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Draw 2 additional cards for your next hand.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Ferry",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Move your -$2 cost token to an Action Supply pile.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Plan",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Move your Trashing token to an Action Supply pile.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mission",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Once per turn: If the previous turn wasn't yours, take another turn after this one, during which you can't buy cards.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pilgrimage",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Once per turn: Turn your Journey token over. If it's face up, choose up to 3 differently named cards you have in play and gain a copy of each.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Ball",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Take your -$1 token. Gain 2 cards each costing up to $4.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Raid",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Silver per Silver you have in play. Each other player puts their -1 Card token on their deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Seaway",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain an Action card costing up to $4. Move your +1 Buy token to its pile.",
    "effects": {},
    "tags": [
      "gainer",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Trade",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash up to 2 cards from your hand. Gain a Silver per card you trashed.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lost Arts",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Move your +1 Action token to an Action Supply pile.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Training",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Move your +$1 token to an Action Supply pile.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Inheritance",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Once per game: Set aside a non-Victory Action card from the Supply costing up to $4. Move your Estate token to it. (Your Estates gain the abilities and types of that card.)",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pathfinding",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 8
    },
    "text": "Move your +1 Card token to an Action Supply pile.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Summon",
    "set": "Adventures",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain an Action card costing up to $4. Set it aside. If you did, then at the start of your next turn, play it.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Engineer",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0,
      "debt": 4
    },
    "text": "Gain a card costing up to $4. You may trash this. If you do, gain a card costing up to $4.",
    "effects": {},
    "tags": [
      "gainer",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "City Quarter",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0,
      "debt": 8
    },
    "text": "+2 Actions. Reveal your hand. +1 Card per Action card revealed.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Overlord",
    "set": "Empires",
    "types": [
      "Action",
      "Command"
    ],
    "cost": {
      "coins": 0,
      "debt": 8
    },
    "text": "Play a non-Command Action card from the Supply costing up to $5, leaving it there.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Royal Blacksmith",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0,
      "debt": 8
    },
    "text": "+5 Cards. Reveal your hand; discard the Coppers.",
    "effects": {
      "cards": 5
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Encampment",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards, +2 Actions. You may reveal a Gold or Plunder from your hand. If you don't, set this aside, and return it to the Supply at the start of Clean-up.",
    "effects": {
      "cards": 2,
      "actions": 2
    },
    "tags": [
      "village",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Plunder",
    "set": "Empires",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2. +1 VP.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Patrician",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck. If it costs $5 or more, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Emporium",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. When you gain this, if you have 5 or more Action cards in play, +2 VP.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Settlers",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. Look through your discard pile. You may reveal a Copper from it and put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Bustling Village",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +3 Actions. Look through your discard pile. You may reveal a Settlers from it and put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 3
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Catapult",
    "set": "Empires",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$1. Trash a card from your hand. If it costs $3 or more, each other player gains a Curse. If it's a Treasure, each other player discards down to 3 cards in hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "trasher",
      "trash-for-benefit",
      "curser",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Rocks",
    "set": "Empires",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "$1. When you gain or trash this, gain a Silver; if it is your Buy phase, put the Silver on your deck, otherwise put it into your hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Chariot Race",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. Reveal the top card of your deck and put it into your hand. The player to your left reveals the top card of their deck. If your card costs more, +$1 and +1 VP.",
    "effects": {
      "actions": 1,
      "cards": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Enchantress",
    "set": "Empires",
    "types": [
      "Action",
      "Attack",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Until your next turn, the first time each other player plays an Action card on their turn, they get +1 Card and +1 Action instead of following its instructions. At the start of your next turn, +2 Cards.",
    "effects": {},
    "tags": [
      "duration",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Farmers' Market",
    "set": "Empires",
    "types": [
      "Action",
      "Gathering"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Buy. If there are 4 or more VP on the Farmers' Market Supply pile, take them and trash this. Otherwise, add 1 VP to the pile and then +$1 per VP on the pile.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Gladiator",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. Reveal a card from your hand. The player to your left may reveal a copy from their hand. If they don't, +$1 and trash a Gladiator from the Supply.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fortune",
    "set": "Empires",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 8,
      "debt": 8
    },
    "text": "+1 Buy. When you play this, if you haven't yet this turn, double your $ amount. When you gain this, gain a Gold per Gladiator you have in play.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sacrifice",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. If it's an Action card, +2 Cards, +2 Actions. If it's a Treasure card, +$2. If it's a Victory card, +2 VP.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Temple",
    "set": "Empires",
    "types": [
      "Action",
      "Gathering"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 VP. Trash from 1 to 3 differently named cards from your hand. Add 1 VP to the Temple Supply pile. When you gain this, take the VP from the pile.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Villa",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Actions, +1 Buy, +$1. When you gain this, put it into your hand, +1 Action, and if it's your Buy phase, return to your Action phase.",
    "effects": {
      "actions": 2,
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "village",
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Archive",
    "set": "Empires",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Set aside the top 3 cards of your deck face down (you may look at them). Now and at the start of your next two turns, put one into your hand.",
    "effects": {
      "actions": 1,
      "cards": 1
    },
    "tags": [
      "duration",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Capital",
    "set": "Empires",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$6, +1 Buy. When you discard this from play, take 6 Debt, and then you may pay off Debt.",
    "effects": {
      "coins": 6,
      "buys": 1
    },
    "tags": [
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Charm",
    "set": "Empires",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "When you play this, choose one: +1 Buy and +$2; or the next time you buy a card this turn, you may also gain a differently named card with the same cost.",
    "effects": {},
    "tags": [
      "economy",
      "plus-buy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crown",
    "set": "Empires",
    "types": [
      "Action",
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If it's your Action phase, you may play an Action from your hand twice. If it's your Buy phase, you may play a Treasure from your hand twice.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Forum",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards, +1 Action. Discard 2 cards. When you gain this, +1 Buy.",
    "effects": {
      "cards": 3,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Groundskeeper",
    "set": "Empires",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. This turn, when you gain a Victory card, +1 VP.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Legionary",
    "set": "Empires",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. You may reveal a Gold from your hand. If you do, each other player discards down to 2 cards in hand, then draws a card.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Wild Hunt",
    "set": "Empires",
    "types": [
      "Action",
      "Gathering"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Choose one: +3 Cards and add 1 VP to the Wild Hunt Supply pile; or gain an Estate, and if you do, take the VP from the pile.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "alt-vp",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Humble Castle",
    "set": "Empires",
    "types": [
      "Treasure",
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 3
    },
    "text": "$1. Worth 1 VP per Castle you have.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crumbling Castle",
    "set": "Empires",
    "types": [
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 4
    },
    "text": "1 VP. When you gain or trash this, +1 VP and gain a Silver.",
    "effects": {},
    "tags": [
      "alt-vp",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Small Castle",
    "set": "Empires",
    "types": [
      "Action",
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash this or a Castle from your hand. If you do, gain a Castle.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Haunted Castle",
    "set": "Empires",
    "types": [
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 6
    },
    "text": "2 VP. When you gain this during your turn, gain a Gold, and each other player with 5 or more cards in hand puts 2 cards from their hand onto their deck.",
    "effects": {},
    "tags": [
      "alt-vp",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Opulent Castle",
    "set": "Empires",
    "types": [
      "Action",
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Discard any number of Victory cards. +$2 per card discarded. 3 VP.",
    "effects": {},
    "tags": [
      "economy",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sprawling Castle",
    "set": "Empires",
    "types": [
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 8
    },
    "text": "4 VP. When you gain this, gain a Duchy or 3 Estates.",
    "effects": {},
    "tags": [
      "alt-vp",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Grand Castle",
    "set": "Empires",
    "types": [
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 9
    },
    "text": "5 VP. When you gain this, reveal your hand. +1 VP per Victory card in your hand and in play.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "King's Castle",
    "set": "Empires",
    "types": [
      "Victory",
      "Castle"
    ],
    "cost": {
      "coins": 10
    },
    "text": "Worth 2 VP per Castle you have.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Triumph",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0,
      "debt": 5
    },
    "text": "Gain an Estate. If you did, +1 VP per card you've gained this turn.",
    "effects": {},
    "tags": [
      "gainer",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Annex",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0,
      "debt": 8
    },
    "text": "Look through your discard pile. Shuffle all but up to 5 cards from it into your deck. Gain a Duchy.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Donate",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0,
      "debt": 8
    },
    "text": "After this turn, put all cards from your deck and discard pile into your hand, trash any number, then shuffle your hand into your deck, then draw 5 cards.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Advance",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may trash an Action card from your hand. If you do, gain an Action card costing up to $6.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Delve",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. Gain a Silver.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tax",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Add 2 Debt to a Supply pile. Setup: Each Supply pile gets 1 Debt. When you buy a card, take the Debt from its pile.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Banquet",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Gain 2 Coppers and a non-Victory card costing up to $5.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Ritual",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a Curse. If you did, trash a card from your hand. +1 VP per $1 it costs.",
    "effects": {},
    "tags": [
      "trasher",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Salt the Earth",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 VP. Trash a Victory card from the Supply.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wedding",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4,
      "debt": 3
    },
    "text": "+1 VP. Gain a Gold.",
    "effects": {},
    "tags": [
      "gainer",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Windfall",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If your deck and discard pile are both empty, gain 3 Golds.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Conquest",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Gain 2 Silvers. +1 VP per Silver you've gained this turn.",
    "effects": {},
    "tags": [
      "gainer",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Dominate",
    "set": "Empires",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 14
    },
    "text": "Gain a Province. If you did, +9 VP.",
    "effects": {},
    "tags": [
      "gainer",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Aqueduct",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Treasure, move 1 VP from its pile to this. When you gain a Victory card, take the VP from this. Setup: Put 8 VP on the Silver and Gold piles.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Arena",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, you may discard an Action card. If you do, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bandit Fort",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, -2 VP per Silver and per Gold you have.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Basilica",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you buy a card, if you have $2 or more left, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Baths",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you end your turn without having gained a card, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Battlefield",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Victory card, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Colonnade",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you buy a card, if you have a copy of it in play, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Defiled Shrine",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain an Action card, move 1 VP from its pile to this. When you buy a Curse, take the VP from this. Setup: Put 2 VP on each non-Gathering Action Supply pile.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fountain",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 15 VP if you have 10 or more Coppers.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Keep",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, for each differently named Treasure you have, if you have more copies of it than each other player (or tied), 5 VP.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Labyrinth",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a 2nd card in one of your turns, take 2 VP from here. Setup: 6 VP per player.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mountain Pass",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you are the first player to gain a Province, after that turn each player bids up to 40 Debt, ending with you. High bidder gets 8 VP and takes the Debt they bid.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Museum",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 2 VP per differently named card you have.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Obelisk",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 2 VP per card you have from a chosen Action Supply pile. Setup: Choose a random Action Supply pile.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Orchard",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 4 VP per differently named Action card you have 3 or more copies of.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Palace",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 3 VP per set of Copper-Silver-Gold you have.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tomb",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you trash a card, +1 VP.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tower",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 1 VP per non-Victory card you have from an empty Supply pile.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Triumphal Arch",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, 3 VP per copy you have of the 2nd most common Action card among your cards.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wall",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, -1 VP per card you have after the first 15.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wolf Den",
    "set": "Empires",
    "types": [
      "Landmark"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, -3 VP per card you have exactly 1 copy of.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Druid",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. Receive one of the set-aside Boons (leaving it there).",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Faithful Hound",
    "set": "Nocturne",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards. When you discard this other than during Clean-up, you may set it aside, and put it into your hand at end of turn.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Guardian",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Until your next turn, when another player plays an Attack card, it doesn't affect you. At the start of your next turn, +$1.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "reaction",
      "economy",
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Monastery",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 2
    },
    "text": "For each card you've gained this turn, you may trash a card from your hand or a Copper you have in play.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pixie",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. Discard the top Boon. You may trash this to receive that Boon twice.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Tracker",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+$1. Receive a Boon. While this is in play, when you gain a card, you may put it onto your deck.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Changeling",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash this. Gain a copy of a card you have in play. In games using this, when you gain a card costing $3 or more, you may exchange it for a Changeling.",
    "effects": {},
    "tags": [
      "gainer",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fool",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 3
    },
    "text": "If you aren't the player with Lost in the Woods, take it, take 3 Boons, and receive them in any order.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ghost Town",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your next turn, +1 Card and +1 Action.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Leprechaun",
    "set": "Nocturne",
    "types": [
      "Action",
      "Doom"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Gain a Gold. If you have exactly 7 cards in play, gain a Wish from its pile. Otherwise, receive a Hex.",
    "effects": {},
    "tags": [
      "gainer",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Night Watchman",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Look at the top 5 cards of your deck, discard any number, and put the rest back in any order.",
    "effects": {},
    "tags": [
      "sifter",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Secret Cave",
    "set": "Nocturne",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. You may discard 3 cards. If you did, then at the start of your next turn, +$3.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "duration",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Bard",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Receive a Boon.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Blessed Village",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. When you gain this, take a Boon. Receive it now or at the start of your next turn.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cemetery",
    "set": "Nocturne",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 4
    },
    "text": "2 VP. When you gain this, trash up to 4 cards from your hand.",
    "effects": {},
    "tags": [
      "alt-vp",
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cobbler",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, gain a card to your hand costing up to $4.",
    "effects": {},
    "tags": [
      "gainer",
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Conclave",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. You may play an Action card from your hand that you don't have a copy of in play. If you do, +1 Action.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crypt",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Set aside any number of Treasures you have in play, face down. While any remain, at the start of each of your turns, put one of them into your hand.",
    "effects": {},
    "tags": [
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cursed Village",
    "set": "Nocturne",
    "types": [
      "Action",
      "Doom"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Actions. Draw until you have 6 cards in hand. When you gain this, receive a Hex.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village",
      "draw-to-x"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Den of Sin",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, +2 Cards.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Devil's Workshop",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 4
    },
    "text": "If the number of cards you've gained this turn is: 2+, gain an Imp from its pile; 1, gain a card costing up to $4; 0, gain a Gold.",
    "effects": {},
    "tags": [
      "gainer",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Exorcist",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. Gain a cheaper Spirit from one of the Spirit piles.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Idol",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Attack",
      "Fate"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2. When you play this, if you then have an odd number of Idols in play, receive a Boon; otherwise, each other player gains a Curse.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "curser",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Necromancer",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Play a face-up, non-Duration Action card from the trash, leaving it there and turning it face down for the turn.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Pooka",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may trash a Treasure other than Cursed Gold from your hand, for +4 Cards.",
    "effects": {
      "cards": 4
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sacred Grove",
    "set": "Nocturne",
    "types": [
      "Action",
      "Fate"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Buy, +$3. Receive a Boon. If it doesn't give +$1, each other player may receive it.",
    "effects": {
      "buys": 1,
      "coins": 3
    },
    "tags": [
      "plus-buy",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Shepherd",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Discard any number of Victory cards, revealing them. +2 Cards per card discarded.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Skulk",
    "set": "Nocturne",
    "types": [
      "Action",
      "Attack",
      "Doom"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Buy. Each other player receives the next Hex. When you gain this, gain a Gold.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "junker",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Tormentor",
    "set": "Nocturne",
    "types": [
      "Action",
      "Attack",
      "Doom"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. If you have no other cards in play, gain an Imp from its pile. Otherwise, each other player receives the next Hex.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "junker",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Tragic Hero",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards, +1 Buy. If you have 8 or more cards in hand, trash this and gain a Treasure.",
    "effects": {
      "cards": 3,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Vampire",
    "set": "Nocturne",
    "types": [
      "Night",
      "Attack",
      "Doom"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player receives the next Hex. Gain a card costing up to $5 other than a Vampire. Exchange this for a Bat.",
    "effects": {},
    "tags": [
      "gainer",
      "junker",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Werewolf",
    "set": "Nocturne",
    "types": [
      "Action",
      "Night",
      "Attack",
      "Doom"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If it's your Night phase, each other player receives the next Hex. Otherwise, +3 Cards.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "junker",
      "night"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Raider",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Each other player with 5 or more cards in hand discards a copy of a card you have in play (or reveals they can't). At the start of your next turn, +$3.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "handsize-attack",
      "economy",
      "payload",
      "duration",
      "night"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lucky Coin",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 4
    },
    "text": "$1. When you play this, gain a Silver.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Goat",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 2
    },
    "text": "$1. When you play this, you may trash a card from your hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pasture",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Victory",
      "Heirloom"
    ],
    "cost": {
      "coins": 2
    },
    "text": "$1. Worth 1 VP per Estate you have.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pouch",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 2
    },
    "text": "$1, +1 Buy.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cursed Gold",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 4
    },
    "text": "$3. When you play this, gain a Curse.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Haunted Mirror",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 0
    },
    "text": "$1. When you trash this, you may discard an Action card to gain a Ghost from its pile.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Magic Lamp",
    "set": "Nocturne",
    "types": [
      "Treasure",
      "Heirloom"
    ],
    "cost": {
      "coins": 0
    },
    "text": "$1. When you play this, if there are at least 6 cards that you have exactly 1 copy of in play, trash this. If you do, gain 3 Wishes from their pile.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wish",
    "set": "Nocturne",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action. Return this to its pile. If you did, gain a card to your hand costing up to $6.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Border Guard",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Reveal the top 2 cards of your deck. Put one into your hand and discard the other. If both were Actions, take the Lantern or Horn.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Ducat",
    "set": "Renaissance",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Coffers, +1 Buy. When you gain this, you may trash a Copper from your hand.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lackeys",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards. When you gain this, +2 Villagers.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Acting Troupe",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+4 Villagers. Trash this.",
    "effects": {},
    "tags": [
      "village",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Cargo Ship",
    "set": "Renaissance",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. Once this turn, when you gain a card, you may set it aside face up. At the start of your next turn, put it into your hand.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Experiment",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards, +1 Action. Return this to the Supply. When you gain this, gain another Experiment (that one doesn't come with another).",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Improve",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. At the start of Clean-up, you may trash an Action card you would discard from play this turn, to gain a card costing exactly $1 more than it.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Flag Bearer",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. When you gain or trash this, take the Flag.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hideout",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. Trash a card from your hand. If it's a Victory card, gain a Curse.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Inventor",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4, then cards cost $1 less this turn (but not less than $0).",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Mountain Village",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Actions. Look through your discard pile and put a card from it into your hand; if you can't, +1 Card.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Patron",
    "set": "Renaissance",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Villager, +$2. When something causes you to reveal this (using the word 'reveal'), +1 Coffers.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "reaction",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Priest",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Trash a card from your hand. For the rest of this turn, when you trash a card, +$2.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Research",
    "set": "Renaissance",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Trash a card from your hand. Per $1 it costs, set aside a card from your deck face down. At the start of your next turn, put the set-aside cards into your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Silk Merchant",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards, +1 Buy. When you gain or trash this, +1 Coffers and +1 Villager.",
    "effects": {
      "cards": 2,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Old Witch",
    "set": "Renaissance",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. Each other player gains a Curse and may trash a Curse from their hand.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "curser",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Recruiter",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Trash a card from your hand. +1 Villager per $1 it costs.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "trasher",
      "trash-for-benefit",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Scepter",
    "set": "Renaissance",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "When you play this, choose one: +$2; or replay an Action card you played this turn that's still in play.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Scholar",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Discard your hand. +7 Cards.",
    "effects": {
      "cards": 7
    },
    "tags": [
      "terminal-draw",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sculptor",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a card to your hand costing up to $4. If it's a Treasure, +1 Villager.",
    "effects": {},
    "tags": [
      "gainer",
      "villagers"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Seer",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Reveal the top 3 cards of your deck. Put the ones costing from $2 to $4 into your hand. Put the rest back in any order.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Spices",
    "set": "Renaissance",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2, +1 Buy. When you gain this, +2 Coffers.",
    "effects": {
      "coins": 2,
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Swashbuckler",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. If your discard pile has any cards in it: +1 Coffers, then if you have at least 4 Coffers tokens, take the Treasure Chest.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Treasurer",
    "set": "Renaissance",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. Choose one: Trash a Treasure from your hand; or gain a Treasure from the trash to your hand; or take the Key.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload",
      "trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Villain",
    "set": "Renaissance",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Coffers. Each other player with 5 or more cards in hand discards one costing $2 or more (or reveals they can't).",
    "effects": {},
    "tags": [
      "economy",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Cathedral",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your turn, trash a card from your hand.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "City Gate",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your turn, +1 Card, then put a card from your hand onto your deck.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pageant",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the end of your Buy phase, you may pay $1 for +1 Coffers.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sewers",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 3
    },
    "text": "When you trash a card other than with this, you may trash a card from your hand.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Star Chart",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 3
    },
    "text": "When you shuffle, you may pick one of the cards to go on top.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Exploration",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 4
    },
    "text": "At the end of your Buy phase, if you didn't buy any cards, +1 Coffers and +1 Villager.",
    "effects": {},
    "tags": [
      "economy",
      "villagers"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fair",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 4
    },
    "text": "At the start of your turn, +1 Buy.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Silos",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 4
    },
    "text": "At the start of your turn, discard any number of Coppers, revealing them, and draw that many cards.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sinister Plot",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 4
    },
    "text": "At the start of your turn, add a token here, or remove your tokens here for +1 Card each.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Academy",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "When you gain an Action card, +1 Villager.",
    "effects": {},
    "tags": [
      "village",
      "villagers"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Capitalism",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "During your turns, Action cards with +$ amounts in their text are also Treasures.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fleet",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "After the game ends, each player with this plays an extra turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Guildhall",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "When you gain a Treasure, +1 Coffers.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Piazza",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your turn, reveal the top card of your deck. If it's an Action, play it.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Road Network",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 5
    },
    "text": "When another player gains a Victory card, +1 Card.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Barracks",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 6
    },
    "text": "At the start of your turn, +1 Action.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crop Rotation",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 6
    },
    "text": "At the start of your turn, you may discard a Victory card for +2 Cards.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Innovation",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 6
    },
    "text": "The first time you gain an Action card each turn, you may set it aside. If you do, play it.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Canal",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 7
    },
    "text": "During your turns, cards cost $1 less, but not less than $0.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Citadel",
    "set": "Renaissance",
    "types": [
      "Project"
    ],
    "cost": {
      "coins": 8
    },
    "text": "The first time you play an Action card each turn, replay it.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Black Cat",
    "set": "Menagerie",
    "types": [
      "Action",
      "Attack",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards. If it isn't your turn, each other player gains a Curse. When another player gains a Victory card, you may play this from your hand.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "curser",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sleigh",
    "set": "Menagerie",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Gain 2 Horses. When you gain a card, you may discard this, to put that card into your hand or onto your deck.",
    "effects": {},
    "tags": [
      "gainer",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Supplies",
    "set": "Menagerie",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 2
    },
    "text": "$1. When you play this, gain a Horse onto your deck.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Camel Train",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Exile a non-Victory card from the Supply. When you gain this, Exile a Gold from the Supply.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Goatherd",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. You may trash a card from your hand. +1 Card per card the player to your right trashed on their last turn.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Scrap",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash a card from your hand. Choose a different thing per $1 it costs: +1 Card; +1 Action; +1 Buy; +$1; gain a Silver; gain a Horse.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sheepdog",
    "set": "Menagerie",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards. When you gain a card, you may play this from your hand.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Snowy Village",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +4 Actions, +1 Buy. Ignore any further +Actions you get this turn.",
    "effects": {
      "cards": 1,
      "actions": 4,
      "buys": 1
    },
    "tags": [
      "village",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Stockpile",
    "set": "Menagerie",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 3
    },
    "text": "$3, +1 Buy. When you play this, Exile it.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bounty Hunter",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Exile a card from your hand. If you didn't have a copy of it in Exile, +$3.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "economy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cardinal",
    "set": "Menagerie",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Each other player reveals the top 2 cards of their deck, Exiles one costing from $3 to $6, and discards the rest.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Cavalry",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain 2 Horses. When you gain this, +2 Cards, +1 Buy, and if it's your Buy phase return to your Action phase.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Groom",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4. If it's an Action card, gain a Horse; Treasure card, gain a Silver; Victory card, +1 Card and +1 Action.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hostelry",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. When you gain this, you may discard any number of Treasures, revealed, to gain that many Horses.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Village Green",
    "set": "Menagerie",
    "types": [
      "Action",
      "Duration",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Either now or at the start of your next turn, +1 Card and +2 Actions. When you discard this other than during Clean-up, you may reveal it to play it.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "duration",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Barge",
    "set": "Menagerie",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Either now or at the start of your next turn, +3 Cards and +1 Buy.",
    "effects": {
      "cards": 3,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "duration",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Coven",
    "set": "Menagerie",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action, +$2. Each other player Exiles a Curse from the Supply. If they can't, they discard their Exiled Curses.",
    "effects": {
      "actions": 1,
      "coins": 2
    },
    "tags": [
      "economy",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Displace",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Exile a card from your hand. Gain a differently named card costing up to $2 more than it.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Falconer",
    "set": "Menagerie",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a card to your hand costing less than this. When any player gains a card with 2 or more types, you may play this from your hand.",
    "effects": {},
    "tags": [
      "gainer",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fisherman",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. During your turns, if your discard pile is empty, this costs $3 less.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Gatekeeper",
    "set": "Menagerie",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, +$3. Until then, when another player gains an Action or Treasure card they don't have an Exiled copy of, they Exile it.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hunting Lodge",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions. You may discard your hand for +5 Cards.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Kiln",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. The next time you play a card this turn, you may first gain a copy of it.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Livery",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. This turn, when you gain a card costing $4 or more, gain a Horse.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Mastermind",
    "set": "Menagerie",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, you may play an Action card from your hand three times.",
    "effects": {},
    "tags": [
      "throne-variant",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Paddock",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. Gain 2 Horses. +1 Action per empty Supply pile.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sanctuary",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +1 Buy. You may Exile a card from your hand.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "cantrip",
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Destrier",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+2 Cards, +1 Action. During your turns, this costs $1 less per card you've gained this turn.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Wayfarer",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+3 Cards. You may gain a Silver. This has the same cost as the last other card gained this turn, if any.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Animal Fair",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+$4, +1 Buy per empty Supply pile. Instead of paying this card's cost, you may trash an Action card from your hand.",
    "effects": {
      "coins": 4
    },
    "tags": [
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Delay",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may set aside an Action card from your hand. At the start of your next turn, play it.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Desperation",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Once per turn: You may gain a Curse. If you do, +1 Buy and +$2.",
    "effects": {},
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Gamble",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. Reveal the top card of your deck. If it's a Treasure or Action, you may play it. Otherwise, discard it.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pursue",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. Name a card. Reveal the top 4 cards from your deck. Put the matches back and discard the rest.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Ride",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Gain a Horse.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Toil",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. You may play an Action card from your hand.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Enhance",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "You may trash a non-Victory card from your hand, to gain a card costing up to $2 more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "March",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Look through your discard pile. You may play an Action card from it.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Transport",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Choose one: Exile an Action card from the Supply; or put an Action card you have in Exile onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Banish",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Exile any number of cards with the same name from your hand.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bargain",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a non-Victory card costing up to $5. Each other player gains a Horse.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Invest",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Exile an Action card from the Supply. While it's in Exile, when another player gains or Invests in a copy of it, +2 Cards.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Seize the Day",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Once per game: Take an extra turn after this one.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Commerce",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Gold per differently named card you've gained this turn.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Demand",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Horse and a card costing up to $4, both onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Stampede",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If you have 5 or fewer cards in play, gain 5 Horses onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Reap",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Gain a Gold. Set it aside. If you do, at the start of your next turn, play it.",
    "effects": {},
    "tags": [
      "gainer",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Enclave",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 8
    },
    "text": "Gain a Gold. Exile a Duchy from the Supply.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Alliance",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 10
    },
    "text": "Gain a Province, a Duchy, an Estate, a Gold, a Silver, and a Copper.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Populate",
    "set": "Menagerie",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 10
    },
    "text": "Gain one card from each Action Supply pile.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Butterfly",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may return this to its pile to gain a card costing exactly $1 more than it.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Camel",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Exile a Gold from the Supply.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Chameleon",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Follow this card's instructions; each time that would give you +Cards this turn, you get +Coins instead, and vice-versa.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Frog",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action. When you discard this from play this turn, put it onto your deck.",
    "effects": {
      "actions": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Goat",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Trash a card from your hand.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Horse",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Cards, +1 Action. Return this to its pile.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Mole",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action. Discard your hand. +3 Cards.",
    "effects": {
      "actions": 1,
      "cards": 3
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Monkey",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Buy, +$1.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Mouse",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Play the set-aside card, leaving it there. Setup: Set aside an unused Action costing $2 or $3.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Mule",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action, +$1.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Otter",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Cards.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Owl",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Draw until you have 6 cards in hand.",
    "effects": {},
    "tags": [
      "draw-to-x"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Ox",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Actions.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Pig",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card, +1 Action.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Way of the Rat",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may discard a Treasure to gain a copy of this.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Seal",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+$1. This turn, when you gain a card, you may put it onto your deck.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Sheep",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+$2.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Squirrel",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Cards at the end of this turn.",
    "effects": {
      "cards": 2
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Turtle",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Set this aside. If you did, play it at the start of your next turn.",
    "effects": {},
    "tags": [
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Way of the Worm",
    "set": "Menagerie",
    "types": [
      "Way"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Exile an Estate from the Supply.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bauble",
    "set": "Allies",
    "types": [
      "Treasure",
      "Liaison"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Choose two different options: +1 Buy; +$1; +1 Favor; this turn, when you gain a card, you may put it onto your deck.",
    "effects": {},
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sycophant",
    "set": "Allies",
    "types": [
      "Action",
      "Liaison"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Discard 3 cards. If you discarded at least one, +$3. When you gain or trash this, +2 Favors.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "economy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Town Crier",
    "set": "Allies",
    "types": [
      "Action",
      "Townsfolk"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Choose one: +$2; or gain a Silver; or +1 Card and +1 Action. You may rotate the Townsfolk.",
    "effects": {},
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Blacksmith",
    "set": "Allies",
    "types": [
      "Action",
      "Townsfolk"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Choose one: Draw until you have 6 cards in hand; or +2 Cards; or +1 Card and +1 Action.",
    "effects": {},
    "tags": [
      "draw-to-x",
      "terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Miller",
    "set": "Allies",
    "types": [
      "Action",
      "Townsfolk"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Look at the top 4 cards of your deck. Put one into your hand and discard the rest.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Elder",
    "set": "Allies",
    "types": [
      "Action",
      "Townsfolk"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. You may play an Action card from your hand. When it gives you a choice of abilities this turn, you may choose an extra option.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Herb Gatherer",
    "set": "Allies",
    "types": [
      "Action",
      "Augur"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Buy. Put your deck into your discard pile. Look through it and you may play a Treasure from it. You may rotate the Augurs.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Acolyte",
    "set": "Allies",
    "types": [
      "Action",
      "Augur"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You may trash an Action or Victory card from your hand to gain a Gold. You may trash this to gain an Augur.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sorceress",
    "set": "Allies",
    "types": [
      "Action",
      "Attack",
      "Augur"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Name a card. Reveal the top card of your deck and put it into your hand. If it's the named card, each other player gains a Curse.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sibyl",
    "set": "Allies",
    "types": [
      "Action",
      "Augur"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+4 Cards, +1 Action. Put a card from your hand on top of your deck, and another on the bottom.",
    "effects": {
      "cards": 4,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Battle Plan",
    "set": "Allies",
    "types": [
      "Action",
      "Clash"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. You may reveal an Attack card from your hand for +1 Card. You may rotate any Supply pile.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Archer",
    "set": "Allies",
    "types": [
      "Action",
      "Attack",
      "Clash"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. Each other player with 5 or more cards in hand reveals all but one, and discards one of those you choose.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Warlord",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Attack",
      "Clash"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. At the start of your next turn, +2 Cards. Until then, other players can't play an Action from their hand that they have 2 or more copies of in play.",
    "effects": {
      "actions": 1,
      "cards": 2
    },
    "tags": [
      "non-terminal-draw",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Territory",
    "set": "Allies",
    "types": [
      "Victory",
      "Clash"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Worth 1 VP per differently named Victory card you have. When you gain this, gain a Gold per empty Supply pile.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tent",
    "set": "Allies",
    "types": [
      "Action",
      "Fort"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+$2. You may rotate the Forts. When you discard this from play, you may put it onto your deck.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Garrison",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Fort"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$2. This turn, when you gain a card, add a token here. At the start of your next turn, remove them for +1 Card each.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hill Fort",
    "set": "Allies",
    "types": [
      "Action",
      "Fort"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a card costing up to $4. Choose one: Put it into your hand; or +1 Card and +1 Action.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Stronghold",
    "set": "Allies",
    "types": [
      "Action",
      "Victory",
      "Duration",
      "Fort"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Choose one: +$3; or at the start of your next turn, +3 Cards. 2 VP.",
    "effects": {},
    "tags": [
      "economy",
      "duration",
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Innkeeper",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Choose one: +1 Card; or +3 Cards, then discard 3 cards; or +5 Cards, then discard 6 cards.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Merchant Camp",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Actions, +$1. When you discard this from play, you may put it onto your deck.",
    "effects": {
      "actions": 2,
      "coins": 1
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Emissary",
    "set": "Allies",
    "types": [
      "Action",
      "Liaison"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. If this made you shuffle (at least one card), +1 Action and +2 Favors.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Galleria",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. This turn, when you gain a card costing $3 or $4, +1 Buy.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Student",
    "set": "Allies",
    "types": [
      "Action",
      "Wizard"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. You may rotate the Wizards. Trash a card from your hand. If it's a Treasure, +1 Favor and put this onto your deck.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Conjurer",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Wizard"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a card costing up to $4. At the start of your next turn, put this into your hand.",
    "effects": {},
    "tags": [
      "gainer",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sorcerer",
    "set": "Allies",
    "types": [
      "Action",
      "Attack",
      "Wizard"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Each other player names a card, then reveals the top card of their deck. If wrong, they gain a Curse.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Lich",
    "set": "Allies",
    "types": [
      "Action",
      "Wizard"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+6 Cards, +2 Actions. Skip a turn. When you trash this, discard it and gain a cheaper card from the trash.",
    "effects": {
      "cards": 6,
      "actions": 2
    },
    "tags": [
      "non-terminal-draw",
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Old Map",
    "set": "Allies",
    "types": [
      "Action",
      "Odyssey"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action. Discard a card. +1 Card. You may rotate the Odysseys.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "sifter",
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Voyage",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Odyssey"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. If the previous turn wasn't yours, take an extra turn after this one, during which you can only play 3 cards from your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sunken Treasure",
    "set": "Allies",
    "types": [
      "Treasure",
      "Odyssey"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain an Action card you don't have a copy of in play.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Distant Shore",
    "set": "Allies",
    "types": [
      "Action",
      "Victory",
      "Odyssey"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+2 Cards, +1 Action. Gain an Estate. 2 VP.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Underling",
    "set": "Allies",
    "types": [
      "Action",
      "Liaison"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Action, +1 Favor.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Importer",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Liaison"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your next turn, gain a card costing up to $5. Setup: Each player gets +4 Favors.",
    "effects": {},
    "tags": [
      "gainer",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Contract",
    "set": "Allies",
    "types": [
      "Treasure",
      "Duration",
      "Liaison"
    ],
    "cost": {
      "coins": 5
    },
    "text": "$2, +1 Favor. You may set aside an Action from your hand to play it at the start of your next turn.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Broker",
    "set": "Allies",
    "types": [
      "Action",
      "Liaison"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand and choose one per $1 it costs: +1 Card; or +1 Action; or +$1; or +1 Favor.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Carpenter",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "If no Supply piles are empty, +1 Action and gain a card costing up to $4. Otherwise, trash a card from your hand and gain a card costing up to $2 more than it.",
    "effects": {},
    "tags": [
      "gainer",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Courier",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+$1. Discard the top card of your deck. Look through your discard pile; you may play an Action or Treasure from it.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Royal Galley",
    "set": "Allies",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card. You may play a non-Duration Action card from your hand. Set it aside; if you did, then at the start of your next turn, play it.",
    "effects": {
      "cards": 1
    },
    "tags": [
      "throne-variant",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Town",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Choose one: +1 Card and +2 Actions; or +1 Buy and +$2.",
    "effects": {},
    "tags": [
      "village",
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Modify",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash a card from your hand. Choose one: +1 Card and +1 Action; or gain a card costing up to $2 more than the trashed card.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Swap",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. You may return an Action from your hand to its pile, to gain to your hand a different Action costing up to $5.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Skirmisher",
    "set": "Allies",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +$1. This turn, when you gain an Attack card, each other player discards down to 3 cards in hand.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "handsize-attack"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Guildmaster",
    "set": "Allies",
    "types": [
      "Action",
      "Liaison"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$3. This turn, when you gain a card, +1 Favor.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Specialist",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may play an Action or Treasure from your hand. Choose one: play it again; or gain a copy of it.",
    "effects": {},
    "tags": [
      "throne-variant",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Hunter",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Reveal the top 3 cards of your deck. From those cards, put an Action, a Treasure, and a Victory card into your hand. Discard the rest.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sentinel",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Look at the top 5 cards of your deck. You may trash up to 2 of them. Put the rest back in any order.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Marquis",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+1 Buy. +1 Card per card in your hand. Discard down to 10 cards in hand.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Barbarian",
    "set": "Allies",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. Each other player trashes the top card of their deck. If it costs $3 or more they gain a cheaper card sharing a type with it; otherwise they gain a Curse.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "junker"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Capital City",
    "set": "Allies",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions. You may discard 2 cards for +$2. You may pay $2 for +2 Cards.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Highwayman",
    "set": "Allies",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, discard this from play and +3 Cards. Until then, the first Treasure each other player plays each turn does nothing.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw",
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Architects' Guild",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card, you may spend 2 Favors to gain a cheaper non-Victory card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Band of Nomads",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card costing $3 or more, you may spend a Favor, for +1 Card, or +1 Action, or +1 Buy.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cave Dwellers",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may spend a Favor, to discard a card then draw a card. Repeat as desired.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Circle of Witches",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After playing a Liaison, you may spend 3 Favors to have each other player gain a Curse.",
    "effects": {},
    "tags": [
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "City-state",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain an Action card during your turn, you may spend 2 Favors to play it.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Coastal Haven",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When discarding your hand in Clean-up, you may spend any number of Favors to keep that many cards in hand for next turn (you still draw 5).",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crafters' Guild",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may spend 2 Favors to gain a card costing up to $4 onto your deck.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Desert Guides",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may spend a Favor to discard your hand and draw 5 cards. Repeat as desired.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Family of Inventors",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, you may put a Favor token on a non-Victory Supply pile. Cards cost $1 less per Favor token on their piles.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fellowship of Scribes",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After playing an Action, if you have 4 or fewer cards in hand, you may spend a Favor for +1 Card.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Forest Dwellers",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may spend a Favor to look at the top 3 cards of your deck, discard any number and put the rest back in any order.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Gang of Pickpockets",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, discard down to 4 cards in hand unless you spend a Favor.",
    "effects": {},
    "tags": [
      "handsize-attack"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Island Folk",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the end of your turn, if the previous turn wasn't yours, you may spend 5 Favors to take another turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "League of Bankers",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, +$1 per 4 Favors you have (round down).",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "League of Shopkeepers",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After playing a Liaison, if you have 5 or more Favors, +$1, and if 10 or more, +1 Action and +1 Buy.",
    "effects": {},
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Market Towns",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, you may spend a Favor to play an Action card from your hand. Repeat as desired.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mountain Folk",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may spend 5 Favors for +3 Cards.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Order of Astrologers",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When shuffling, you may pick one card per Favor you spend to go on top.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Order of Masons",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When shuffling, you may pick up to 2 cards per Favor you spend to put into your discard pile.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Peaceful Cult",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, you may spend any number of Favors to trash that many cards from your hand.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Plateau Shepherds",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When scoring, pair up your Favors with cards you have costing $2, for 2 VP per pair.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Trappers' Lodge",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card, you may spend a Favor to put it onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Woodworkers' Guild",
    "set": "Allies",
    "types": [
      "Ally"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, you may spend a Favor to trash an Action card from your hand. If you did, gain an Action card.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cage",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Set aside up to 4 cards from your hand face down (on this). The next time you gain a Victory card, trash this, and put the set aside cards into your hand at end of turn.",
    "effects": {},
    "tags": [
      "duration",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Grotto",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action. Set aside up to 4 cards from your hand face down (on this). At the start of your next turn, discard them, then draw as many.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "duration",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Jewelled Egg",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Coin, +1 Buy. When you trash this, gain a Loot.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Search",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Coins. The next time a Supply pile empties, trash this and gain a Loot.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "duration",
      "economy",
      "loot"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Shaman",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action, +1 Coin. You may trash a card from your hand. In games using this, at the start of your turn, gain a card from the trash costing up to 6 Coins.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "trasher",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Secluded Shrine",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Coin. The next time you gain a Treasure, trash up to 2 cards from your hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "duration",
      "trasher",
      "strong-trasher",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Siren",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Each other player gains a Curse. At the start of your next turn, draw until you have 8 cards in hand. When you gain this, trash it unless you trash an Action from your hand.",
    "effects": {},
    "tags": [
      "duration",
      "curser",
      "draw-to-x"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Stowaway",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration",
      "Reaction"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your next turn, +2 Cards. When anyone gains a Duration card, you may play this from your hand.",
    "effects": {},
    "tags": [
      "duration",
      "terminal-draw",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Taskmaster",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action, +1 Coin. If you gain a card costing exactly 5 Coins this turn, then at the start of your next turn, repeat this ability.",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "duration",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Abundance",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "The next time you gain an Action card, +1 Buy and +3 Coins.",
    "effects": {},
    "tags": [
      "duration",
      "economy",
      "plus-buy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cabin Boy",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. At the start of your next turn, choose one: +2 Coins; or trash this to gain a Duration card.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "duration",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Crucible",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. +1 Coin per 1 Coin it costs.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Flagship",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration",
      "Command"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Coins. The next time you play a non-Command Action card, replay it.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "duration",
      "economy",
      "throne-variant"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fortune Hunter",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Coins. Look at the top 3 cards of your deck. You may play a Treasure from them. Put the rest back in any order.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Gondola",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Either now or at the start of your next turn: +2 Coins. When you gain this, you may play an Action card from your hand.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "duration",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Harbor Village",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. After the next Action you play this turn, if it gave you +Coins, +1 Coin.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Landing Party",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards, +2 Actions. The next time the first card you play on a turn is a Treasure, put this onto your deck afterwards.",
    "effects": {
      "cards": 2,
      "actions": 2
    },
    "tags": [
      "village",
      "non-terminal-draw",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mapmaker",
    "set": "Plunder",
    "types": [
      "Action",
      "Reaction"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Look at the top 4 cards of your deck. Put 2 into your hand and discard the rest. When any player gains a Victory card, you may play this from your hand.",
    "effects": {},
    "tags": [
      "terminal-draw",
      "sifter",
      "reaction"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Maroon",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. +2 Cards per type it has (Action, Attack, etc.).",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Rope",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Coin, +1 Buy. At the start of your next turn, +1 Card and you may trash a card from your hand.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "duration",
      "plus-buy",
      "economy",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Swamp Shacks",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Actions. +1 Card per 3 cards you have in play (round down).",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tools",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Gain a copy of a card anyone has in play.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Buried Treasure",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of your next turn, +1 Buy and +3 Coins. When you gain this, play it.",
    "effects": {},
    "tags": [
      "duration",
      "economy",
      "plus-buy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Crew",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. At the start of your next turn, put this onto your deck.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "duration",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Cutthroat",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player discards down to 3 cards in hand. The next time anyone gains a Treasure costing 5 Coins or more, gain a Loot.",
    "effects": {},
    "tags": [
      "duration",
      "handsize-attack",
      "loot"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Enlarge",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Now and at the start of your next turn: Trash a card from your hand, and gain one costing up to 2 Coins more.",
    "effects": {},
    "tags": [
      "duration",
      "trasher",
      "strong-trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Figurine",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. You may discard an Action card for +1 Buy and +1 Coin.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "First Mate",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Play any number of Action cards with the same name from your hand, then draw until you have 6 cards in hand.",
    "effects": {},
    "tags": [
      "draw-to-x"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Frigate",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Coins. Until the start of your next turn, each time another player plays an Action card, they discard down to 4 cards in hand afterwards.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "duration",
      "economy",
      "payload",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Longship",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Actions. At the start of your next turn, +2 Cards.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village",
      "duration"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mining Road",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action, +1 Buy, +2 Coins. Once this turn, when you gain a Treasure, you may play it.",
    "effects": {
      "actions": 1,
      "buys": 1,
      "coins": 2
    },
    "tags": [
      "economy",
      "plus-buy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pendant",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Coin per differently named Treasure you have in play.",
    "effects": {},
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pickaxe",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Coin. Trash a card from your hand. If it costs 3 Coins or more, gain a Loot to your hand.",
    "effects": {
      "coins": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "economy",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pilgrim",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+4 Cards. Put a card from your hand onto your deck.",
    "effects": {
      "cards": 4
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Quartermaster",
    "set": "Plunder",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 5
    },
    "text": "At the start of each of your turns for the rest of the game, choose one: Gain a card costing up to 4 Coins, setting it aside on this; or put a card from this into your hand.",
    "effects": {},
    "tags": [
      "duration",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Silver Mine",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Treasure costing less than this to your hand.",
    "effects": {},
    "tags": [
      "gainer",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Trickster",
    "set": "Plunder",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player gains a Curse. Once this turn, when you discard a Treasure from play, you may set it aside. Put it in your hand at end of turn.",
    "effects": {},
    "tags": [
      "curser"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Wealthy Village",
    "set": "Plunder",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +2 Actions. When you gain this, if you have at least 3 differently named Treasures in play, gain a Loot.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sack of Loot",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 6
    },
    "text": "+1 Coin, +1 Buy. Gain a Loot.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "economy",
      "plus-buy",
      "loot",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "King's Cache",
    "set": "Plunder",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 7
    },
    "text": "You may play a Treasure from your hand 3 times.",
    "effects": {},
    "tags": [
      "throne-variant",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Amphora",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Either now or at the start of your next turn: +1 Buy and +3 Coins.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "duration",
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Doubloons",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins. When you gain this, gain a Gold.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Endless Chalice",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Now and at the start of each of your turns for the rest of the game: +1 Coin, +1 Buy.",
    "effects": {
      "coins": 1,
      "buys": 1
    },
    "tags": [
      "loot",
      "duration",
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Figurehead",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins. At the start of your next turn, +2 Cards.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "loot",
      "duration",
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Hammer",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins. Gain a card costing up to 4 Coins.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "loot",
      "economy",
      "gainer",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Insignia",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins. This turn, when you gain a card, you may put it onto your deck.",
    "effects": {
      "coins": 3
    },
    "tags": [
      "loot",
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Jewels",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Duration",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. At the start of your next turn, put this on the bottom of your deck.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "duration",
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Orb",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Look through your discard pile. Choose one: Play an Action or Treasure from it; or +1 Buy and +3 Coins.",
    "effects": {},
    "tags": [
      "loot",
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Prize Goat",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. You may trash a card from your hand.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Puzzle Box",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. You may set aside a card from your hand face down. Put it into your hand at end of turn.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sextant",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. Look at the top 5 cards of your deck. Discard any number. Put the rest back in any order.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Shield",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Reaction",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. When another player plays an Attack, you may first reveal this from your hand to be unaffected.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy",
      "reaction"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Spell Scroll",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. Trash this to gain a cheaper card. If it's an Action or Treasure, you may play it.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "plus-buy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Staff",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. You may play an Action from your hand.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sword",
    "set": "Plunder",
    "types": [
      "Treasure",
      "Attack",
      "Loot"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+3 Coins, +1 Buy. Each other player discards down to 4 cards in hand.",
    "effects": {
      "coins": 3,
      "buys": 1
    },
    "tags": [
      "loot",
      "economy",
      "payload",
      "plus-buy",
      "handsize-attack"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Avoid",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. The next time you shuffle this turn, pick up to 3 of those cards to put into your discard pile.",
    "effects": {},
    "tags": [
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bury",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 1
    },
    "text": "+1 Buy. Put any card from your discard pile on the bottom of your deck.",
    "effects": {},
    "tags": [
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Deliver",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. This turn, each time you gain a card, set it aside, and put it into your hand at end of turn.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Foray",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Discard 3 cards, revealing them. If they have 3 different names, gain a Loot.",
    "effects": {},
    "tags": [
      "loot",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Launch",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Once per turn: Return to your Action phase. +1 Card, +1 Action, and +1 Buy.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mirror",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Buy. The next time you gain an Action card this turn, gain a copy of it.",
    "effects": {},
    "tags": [
      "plus-buy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Prepare",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Set aside your hand face up. At the start of your next turn, play those Actions and Treasures in any order, then discard the rest.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Scrounge",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Choose one: Trash a card from your hand; or gain an Estate from the trash, and if you did, gain a card costing up to 5 Coins.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Maelstrom",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash 3 cards from your hand. Each other player with 5 or more cards in hand trashes one of them.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Peril",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "You may trash an Action card from your hand to gain a Loot.",
    "effects": {},
    "tags": [
      "trasher",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rush",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy. The next time you gain an Action card this turn, play it.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Journey",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "You don't discard cards from play in Clean-up this turn. Take an extra turn after this one (but not a 3rd turn in a row).",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Looting",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Gain a Loot.",
    "effects": {},
    "tags": [
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Invasion",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 10
    },
    "text": "You may play an Attack from your hand. Gain a Duchy. Gain an Action onto your deck. Gain a Loot; play it.",
    "effects": {},
    "tags": [
      "gainer",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Prosper",
    "set": "Plunder",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 10
    },
    "text": "Gain a Loot, plus any number of differently named Treasures.",
    "effects": {},
    "tags": [
      "gainer",
      "loot"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cheap",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Cheap cards cost 1 Coin less.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Cursed",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Cursed card, gain a Loot and a Curse.",
    "effects": {},
    "tags": [
      "loot",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fated",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When shuffling, you may look through the cards and reveal Fated cards to put them on the top or bottom.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fawning",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Province, gain a Fawning card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Friendly",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Clean-up phase, you may discard a Friendly card to gain a Friendly card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Hasty",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Hasty card, set it aside, and play it at the start of your next turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Inherited",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Setup: You start the game with an Inherited card in place of a starting card you choose.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Inspiring",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After playing an Inspiring card on your turn, you may play an Action from your hand that you don't have a copy of in play.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Nearby",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Nearby card, +1 Buy.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Patient",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Clean-up phase, you may set aside Patient cards from your hand, to play them at the start of your next turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Pious",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Pious card, you may trash a card from your hand.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Reckless",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Follow the instructions of played Reckless cards twice. When discarding one from play, return it to its pile.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rich",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Rich card, gain a Silver.",
    "effects": {},
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Shy",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may discard a Shy card for +2 Cards.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Tireless",
    "set": "Plunder",
    "types": [
      "Trait"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you discard a Tireless card from play, set it aside, and put it onto your deck at end of turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Alley",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Shadow"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. Discard a card. You can play this from your deck as if in your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Aristocrat",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "If the number of Aristocrats you have in play is: 1 or 5: +3 Actions; 2 or 6: +3 Cards; 3 or 7: +3 Coins; 4 or 8: +3 Buys.",
    "effects": {},
    "tags": [
      "village",
      "terminal-draw",
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Artist",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "debt": 8
    },
    "text": "+1 Action. +1 Card per card you have exactly one copy of in play.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Change",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "If you have any Debt, +3 Coins. Otherwise, trash a card from your hand, and gain a card costing more Coins than it, +Debt equal to the difference.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Craftsman",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Debt. Gain a card costing up to 5 Coins.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Daimyo",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Command"
    ],
    "cost": {
      "debt": 6
    },
    "text": "+1 Card, +1 Action. The next time you play a non-Command Action card this turn, replay it afterwards.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Fishmonger",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Shadow"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Buy, +1 Coin. You can play this from your deck as if in your hand.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Gold Mine",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +1 Buy. You may gain a Gold and get +4 Debt.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "cantrip",
      "plus-buy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Imperial Envoy",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+5 Cards, +1 Buy, +2 Debt.",
    "effects": {
      "cards": 5,
      "buys": 1
    },
    "tags": [
      "terminal-draw",
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Kitsune",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Attack",
      "Omen"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Sun. Choose two different options: +2 Actions; +2 Coins; each other player gains a Curse; gain a Silver.",
    "effects": {},
    "tags": [
      "village",
      "economy",
      "curser",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Litter",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards, +2 Actions, +1 Debt.",
    "effects": {
      "cards": 2,
      "actions": 2
    },
    "tags": [
      "village",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mountain Shrine",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Omen"
    ],
    "cost": {
      "debt": 5
    },
    "text": "+1 Sun, +2 Coins. You may trash a card from your hand. Then if there are any Action cards in the trash, +2 Cards.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ninja",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Attack",
      "Shadow"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card. Each other player discards down to 3 cards in hand. You can play this from your deck as if in your hand.",
    "effects": {
      "cards": 1
    },
    "tags": [
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Poet",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Omen"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Sun, +1 Card, +1 Action. Reveal the top card of your deck. If it costs 3 Coins or less, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Rice",
    "set": "Rising Sun",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 7
    },
    "text": "+1 Buy. +1 Coin per different type among cards you have in play.",
    "effects": {
      "buys": 1
    },
    "tags": [
      "economy",
      "payload",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rice Broker",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Trash a card from your hand. If it's a Treasure, +2 Cards. If it's an Action, +5 Cards.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "trasher",
      "trash-for-benefit",
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "River Shrine",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Omen"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Sun. Trash up to 2 cards from your hand. At the start of Clean-up, if you didn't gain any cards in your Buy phase this turn, gain a card costing up to 4 Coins.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Riverboat",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "At the start of your next turn, play the set-aside card, leaving it there. Setup: Set aside an unused non-Duration Action card costing 5 Coins.",
    "effects": {},
    "tags": [
      "duration"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ronin",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Shadow"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Draw until you have 7 cards in hand. You can play this from your deck as if in your hand.",
    "effects": {},
    "tags": [
      "draw-to-x",
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Root Cellar",
    "set": "Rising Sun",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+3 Cards, +1 Action, +3 Debt.",
    "effects": {
      "cards": 3,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rustic Village",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Omen"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Sun, +1 Card, +2 Actions. You may discard 2 cards for +1 Card.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Samurai",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Duration",
      "Attack"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Each other player discards down to 3 cards in hand (once). At the start of each of your turns for the rest of the game, +1 Coin. (This stays in play.)",
    "effects": {},
    "tags": [
      "duration",
      "handsize-attack",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Snake Witch",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. If your hand has no duplicate cards, you may reveal it and return this to its pile, to have each other player gain a Curse.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Tanuki",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Shadow"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Trash a card from your hand. Gain a card costing up to 2 Coins more than it. You can play this from your deck as if in your hand.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Tea House",
    "set": "Rising Sun",
    "types": [
      "Action",
      "Omen"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Sun, +1 Card, +1 Action, +2 Coins.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 2
    },
    "tags": [
      "cantrip",
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Amass",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "If you have no Action cards in play, gain an Action card costing up to 5 Coins.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Asceticism",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Pay any amount of Coin to trash that many cards from your hand.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Continue",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "debt": 8
    },
    "text": "Once per turn: Gain a non-Attack Action card costing up to 4 Coins. Return to your Action phase and play it. +1 Action and +1 Buy.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Credit",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Gain an Action or Treasure costing up to 8 Coins. +Debt equal to its cost.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Foresight",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Reveal cards from your deck until revealing an Action. Set it aside and discard the rest. Put it into your hand at end of turn.",
    "effects": {},
    "tags": [
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Gather",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 7
    },
    "text": "Gain a card costing exactly 3 Coins, a card costing exactly 4 Coins, and a card costing exactly 5 Coins.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Kintsugi",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash a card from your hand. If you've gained a Gold this game, gain a card costing up to 2 Coins more than the trashed card.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Practice",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 3
    },
    "text": "You may play an Action card from your hand twice.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Receive Tribute",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 5
    },
    "text": "If you've gained at least 3 cards this turn, gain up to 3 differently named Action cards you don't have copies of in play.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sea Trade",
    "set": "Rising Sun",
    "types": [
      "Event"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card per Action card you have in play. Trash up to that many cards from your hand.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Approaching Army",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After you play an Attack card, +1 Coin. Setup: Add an Attack kingdom card pile to the Supply.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Biding Time",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Clean-up, set aside your hand face down. At the start of your next turn, put those cards into your hand.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bureaucracy",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card that doesn't cost 0 Coins, gain a Copper.",
    "effects": {},
    "tags": [
      "junker"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Divine Wind",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you remove the last Sun, remove all Kingdom card piles from the Supply, and set up 10 new random piles.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Enlightenment",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Treasures are also Actions. When you play a Treasure in an Action phase, instead of following its instructions, +1 Card and +1 Action.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Flourishing Trade",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Cards cost 1 Coin less. You may use Action plays as Buys.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Good Harvest",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "The first time you play each differently named Treasure each turn, first, +1 Buy and +1 Coin.",
    "effects": {},
    "tags": [
      "economy",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Great Leader",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "After each Action card you play, +1 Action.",
    "effects": {},
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Growth",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a Treasure, gain a cheaper card.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Harsh Winter",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card on your turn, if there's Debt on its pile, take it; otherwise put 2 Debt on its pile.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Kind Emperor",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, and when you remove the last Sun: Gain an Action to your hand.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Panic",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you play a Treasure, +2 Buys. When you discard one from play, return it to its pile.",
    "effects": {},
    "tags": [
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Progress",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain a card, put it onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Rapid Expansion",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When you gain an Action or Treasure, set it aside, and play it at the start of your next turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sickness",
    "set": "Rising Sun",
    "types": [
      "Prophecy"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, choose one: Gain a Curse onto your deck; or discard 3 cards.",
    "effects": {},
    "tags": [
      "curser"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Hamlet",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action. You may discard a card for +1 Action. You may discard a card for +1 Buy.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "village",
      "plus-buy",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Candlestick Maker",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Action, +1 Buy, +1 Coffers.",
    "effects": {
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "plus-buy",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Menagerie",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. Reveal your hand. If the revealed cards all have different names, +3 Cards. Otherwise, +1 Card.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Shop",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card, +1 Coin. You may play an Action card from your hand that you don't have a copy of in play.",
    "effects": {
      "cards": 1,
      "coins": 1
    },
    "tags": [
      "economy",
      "village"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Stonemason",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Trash a card from your hand. Gain 2 cards each costing less than it. Overpay: Gain 2 Action cards each costing the amount overpaid.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Farrier",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+1 Card, +1 Action, +1 Buy. Overpay: +1 Card at the end of this turn per 1 Coin overpaid.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "buys": 1
    },
    "tags": [
      "cantrip",
      "plus-buy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Remake",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Do this twice: Trash a card from your hand, then gain a card costing exactly 1 Coin more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "strong-trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Young Witch",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Cards. Discard 2 cards. Each other player gains a Curse unless they reveal a Bane from their hand. Setup: Add an extra Kingdom card pile costing 2 or 3 Coins to the Supply.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "curser",
      "sifter"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Advisor",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Action. Reveal the top 3 cards of your deck. The player to your left chooses one of them. Discard that card and put the rest into your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Herald",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. Reveal the top card of your deck. If it's an Action, play it. Overpay: Per 1 Coin overpaid, put any card from your discard pile onto your deck.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Plaza",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. You may discard a Treasure for +1 Coffers.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Farmhands",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. When you gain this, you may set aside an Action or Treasure from your hand, and play it at the start of your next turn.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Infirmary",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card. You may trash a card from your hand. Overpay: Play this once per 1 Coin overpaid.",
    "effects": {
      "cards": 1
    },
    "tags": [
      "trasher",
      "strong-trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ferryman",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards, +1 Action. Discard a card. Setup: Choose an unused Kingdom card pile costing 3 or 4 Coins. Gain one when you gain a Ferryman.",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "sifter",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Baker",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +1 Coffers. Setup: Each player gets +1 Coffers.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Butcher",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Coffers. You may trash a card from your hand and gain a card costing up to 1 Coin more than it per Coffers you spend.",
    "effects": {},
    "tags": [
      "economy",
      "trasher",
      "trash-for-benefit",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Carnival",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Reveal the top 4 cards of your deck. Put one of each differently named card into your hand and discard the rest.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Footpad",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Coffers. Each other player discards down to 3 cards in hand. In games using this, when you gain a card in an Action phase, +1 Card.",
    "effects": {},
    "tags": [
      "economy",
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Horn of Plenty",
    "set": "Cornucopia & Guilds",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a card costing up to 1 Coin per differently named card you have in play (counting this). If it's a Victory card, trash this.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Hunting Party",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action. Reveal your hand. Reveal cards from your deck until you reveal a card that isn't a copy of one in your hand. Put it into your hand and discard the rest.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Jester",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Coins. Each other player discards the top card of their deck. If it's a Victory card they gain a Curse; otherwise they gain a copy of the discarded card or you do, your choice.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "curser",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Joust",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card, +1 Action, +1 Coin. You may set aside a Province from your hand to gain any Reward to your hand.",
    "effects": {
      "cards": 1,
      "actions": 1,
      "coins": 1
    },
    "tags": [
      "cantrip",
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Journeyman",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Name a card. Reveal cards from your deck until you reveal 3 cards without that name. Put those cards into your hand and discard the rest.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Merchant Guild",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Buy, +1 Coin. At the end of your Buy phase this turn, +1 Coffers per card you gained in it.",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [
      "plus-buy",
      "economy",
      "payload"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Soothsayer",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Gain a Gold. Each other player gains a Curse, and if they did, draws a card.",
    "effects": {},
    "tags": [
      "gainer",
      "curser",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Fairgrounds",
    "set": "Cornucopia & Guilds",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Worth 2 VP per 5 differently named cards you have (round down).",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Coronet",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Treasure",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may play a non-Reward Action from your hand twice. You may play a non-Reward Treasure from your hand twice.",
    "effects": {},
    "tags": [
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Courser",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Choose two different options: +2 Cards; +2 Actions; +2 Coins; gain 4 Silvers.",
    "effects": {},
    "tags": [
      "village",
      "terminal-draw",
      "economy",
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Demesne",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Victory",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Actions, +2 Buys. Gain a Gold. Worth 1 VP per Gold you have. (This is not in the Supply.)",
    "effects": {
      "actions": 2,
      "buys": 2
    },
    "tags": [
      "village",
      "plus-buy",
      "gainer",
      "economy",
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Housecarl",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card per differently named Action card you have in play. (This is not in the Supply.)",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Huge Turnip",
    "set": "Cornucopia & Guilds",
    "types": [
      "Treasure",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Coffers. +1 Coin per Coffers you have. (This is not in the Supply.)",
    "effects": {},
    "tags": [
      "economy",
      "payload"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Renown",
    "set": "Cornucopia & Guilds",
    "types": [
      "Action",
      "Reward"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Buy. This turn, cards cost 2 Coins less. (This is not in the Supply.)",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Black Market",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Coins. Reveal the top 3 cards of the Black Market deck. Play any number of Treasures from your hand. You may buy one of the revealed cards. Put the rest on the bottom of the Black Market deck.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Envoy",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Reveal the top 5 cards of your deck. The player to your left chooses one. Discard that one and put the rest into your hand.",
    "effects": {},
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Governor",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Action. Choose one; you get the version in parentheses: Each player gets +1 (+3) Cards; or each player gains a Silver (Gold); or each player may trash a card from their hand and gain one costing exactly 1 (2) Coins more.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "non-terminal-draw",
      "gainer",
      "trasher",
      "trash-for-benefit"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Stash",
    "set": "Promo",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Coins. When shuffling this, you may look through your remaining deck, and may put this anywhere in the shuffled cards.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Walled Village",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +2 Actions. At the start of Clean-up, if you have this and no more than one other Action card in play, you may put this onto your deck.",
    "effects": {
      "cards": 1,
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Sauna",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+1 Card, +1 Action. You may play an Avanto from your hand. This turn, when you play a Silver, you may trash a card from your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Avanto",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+3 Cards. You may play a Sauna from your hand.",
    "effects": {
      "cards": 3
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Prince",
    "set": "Promo",
    "types": [
      "Action",
      "Duration",
      "Command"
    ],
    "cost": {
      "coins": 8
    },
    "text": "You may set aside (on this) a non-Duration, non-Command Action card from your hand costing up to 4 Coins. At the start of each of your turns, play that card, leaving it set aside.",
    "effects": {},
    "tags": [
      "duration",
      "throne-variant"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Dismantle",
    "set": "Promo",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Trash a card from your hand. If it costs 1 Coin or more, gain a cheaper card and a Gold.",
    "effects": {},
    "tags": [
      "trasher",
      "trash-for-benefit",
      "gainer",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Captain",
    "set": "Promo",
    "types": [
      "Action",
      "Duration",
      "Command"
    ],
    "cost": {
      "coins": 6
    },
    "text": "Now and at the start of your next turn: Play a non-Duration, non-Command Action card from the Supply costing up to 4 Coins, leaving it there.",
    "effects": {},
    "tags": [
      "duration",
      "throne-variant"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Church",
    "set": "Promo",
    "types": [
      "Action",
      "Duration"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Action. Set aside up to 3 cards from your hand face down. At the start of your next turn, put them into your hand, then you may trash a card from your hand.",
    "effects": {
      "actions": 1
    },
    "tags": [
      "duration",
      "trasher",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Marchland",
    "set": "Promo",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Worth 1 VP per 3 Victory cards you have (round down). When you gain this, +1 Buy, and discard any number of cards for +1 Coin each.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bad Omens",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Put your deck into your discard pile. Look through it and put 2 Coppers from it onto your deck (or reveal you can't).",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Delusion",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "If you don't have Deluded or Envious, take Deluded.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Envy",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "If you don't have Deluded or Envious, take Envious.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Famine",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Reveal the top 3 cards of your deck. Discard the Actions. Shuffle the rest into your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Fear",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "If you have at least 5 cards in hand, discard an Action or Treasure (or reveal you can't).",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Greed",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Gain a Copper onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Haunting",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "If you have at least 4 cards in hand, put one of them onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Locusts",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Trash the top card of your deck. If it's Copper or Estate, gain a Curse. Otherwise, gain a cheaper card that shares a type with it.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Misery",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "If you don't have Miserable or Twice Miserable, take Miserable. Otherwise, flip it over to Twice Miserable.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Plague",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Gain a Curse to your hand.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Poverty",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Discard down to 3 cards in hand.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "War",
    "set": "Nocturne",
    "types": [
      "Hex"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Reveal cards from your deck until revealing one costing $3 or $4. Trash it and discard the rest.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Earth's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may discard a Treasure to gain a card costing up to $4.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Field's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action. +$1. (Keep this until Clean-up.)",
    "effects": {
      "actions": 1,
      "coins": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Flame's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may trash a card from your hand.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Forest's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Buy. +$1. (Keep this until Clean-up.)",
    "effects": {
      "buys": 1,
      "coins": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Moon's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Look through your discard pile. You may put a card from it onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Mountain's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Gain a Silver.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The River's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card at the end of this turn. (Keep this until Clean-up.)",
    "effects": {
      "cards": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Sea's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card.",
    "effects": {
      "cards": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Sky's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may discard 3 cards to gain a Gold.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Sun's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Look at the top 4 cards of your deck. Discard any number of them and put the rest back in any order.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Swamp's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Gain a Will-o'-Wisp.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "The Wind's Gift",
    "set": "Nocturne",
    "types": [
      "Boon"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Cards. Discard 2 cards.",
    "effects": {
      "cards": 2
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Deluded",
    "set": "Nocturne",
    "types": [
      "State"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, return this, and you can't buy Actions this turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Envious",
    "set": "Nocturne",
    "types": [
      "State"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, return this, and Silver and Gold make $1 this turn.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Miserable",
    "set": "Nocturne",
    "types": [
      "State"
    ],
    "cost": {
      "coins": 0
    },
    "text": "-2 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Twice Miserable",
    "set": "Nocturne",
    "types": [
      "State"
    ],
    "cost": {
      "coins": 0
    },
    "text": "-4 VP",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lost in the Woods",
    "set": "Nocturne",
    "types": [
      "State"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, you may discard a card to receive a Boon.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Will-o'-Wisp",
    "set": "Nocturne",
    "types": [
      "Action",
      "Spirit"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Card. +1 Action. Reveal the top card of your deck. If it costs $2 or less, put it into your hand.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Imp",
    "set": "Nocturne",
    "types": [
      "Action",
      "Spirit"
    ],
    "cost": {
      "coins": 2
    },
    "text": "+2 Cards. You may play an Action card from your hand that you don't have a copy of in play.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Ghost",
    "set": "Nocturne",
    "types": [
      "Night",
      "Duration",
      "Spirit"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Reveal cards from your deck until you reveal an Action. Discard the other cards and set aside the Action. At the start of your next turn, play it twice.",
    "effects": {},
    "tags": [
      "duration",
      "throne-variant"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bat",
    "set": "Nocturne",
    "types": [
      "Night"
    ],
    "cost": {
      "coins": 2
    },
    "text": "Trash up to 2 cards from your hand. If you trashed at least one, exchange this for a Vampire.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Zombie Apprentice",
    "set": "Nocturne",
    "types": [
      "Action",
      "Zombie"
    ],
    "cost": {
      "coins": 3
    },
    "text": "You may trash an Action card from your hand for +3 Cards and +1 Action.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Zombie Mason",
    "set": "Nocturne",
    "types": [
      "Action",
      "Zombie"
    ],
    "cost": {
      "coins": 3
    },
    "text": "Trash the top card of your deck. You may gain a card costing up to $1 more than it.",
    "effects": {},
    "tags": [
      "trasher",
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Zombie Spy",
    "set": "Nocturne",
    "types": [
      "Action",
      "Zombie"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+1 Card. +1 Action. Look at the top card of your deck. You may discard it.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip",
      "sifter"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Dame Anna",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may trash up to 2 cards from your hand. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {},
    "tags": [
      "trasher"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Dame Josephine",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Victory",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this. 2 VP.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Dame Molly",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Actions. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Dame Natalie",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "You may gain a card costing up to $3. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {},
    "tags": [
      "gainer"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Dame Sylvia",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+$2. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sir Bailey",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+1 Card. +1 Action. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {
      "cards": 1,
      "actions": 1
    },
    "tags": [
      "cantrip"
    ],
    "isTerminal": false,
    "isCantrip": true
  },
  {
    "name": "Sir Destry",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "+2 Cards. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sir Martin",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 4
    },
    "text": "+2 Buys. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {
      "buys": 2
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sir Michael",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player discards down to 3 cards in hand. Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this.",
    "effects": {},
    "tags": [
      "handsize-attack"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Sir Vander",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack",
      "Knight"
    ],
    "cost": {
      "coins": 5
    },
    "text": "Each other player reveals the top 2 cards of their deck, trashes one of them costing from $3 to $6, and discards the rest. If a Knight is trashed by this, trash this. When you trash this, gain a Gold.",
    "effects": {},
    "tags": [],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Madman",
    "set": "Dark Ages",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Actions. Return this to the Madman pile. If you do, +1 Card per card in your hand. (This is not in the Supply.)",
    "effects": {
      "actions": 2
    },
    "tags": [
      "village"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Mercenary",
    "set": "Dark Ages",
    "types": [
      "Action",
      "Attack"
    ],
    "cost": {
      "coins": 0
    },
    "text": "You may trash 2 cards from your hand. If you did, +2 Cards, +$2, and each other player discards down to 3 cards in hand. (This is not in the Supply.)",
    "effects": {},
    "tags": [
      "trasher",
      "handsize-attack",
      "economy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Spoils",
    "set": "Dark Ages",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 0
    },
    "text": "$3. When you play this, return it to the Spoils pile. (This is not in the Supply.)",
    "effects": {
      "coins": 3
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Bag of Gold",
    "set": "Cornucopia",
    "types": [
      "Action",
      "Prize"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Action. Gain a Gold onto your deck. (This is not in the Supply.)",
    "effects": {
      "actions": 1
    },
    "tags": [
      "gainer"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Diadem",
    "set": "Cornucopia",
    "types": [
      "Treasure",
      "Prize"
    ],
    "cost": {
      "coins": 0
    },
    "text": "$2. When you play this, +$1 per unused Action you have. (This is not in the Supply.)",
    "effects": {
      "coins": 2
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Followers",
    "set": "Cornucopia",
    "types": [
      "Action",
      "Attack",
      "Prize"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+2 Cards. Gain an Estate. Each other player gains a Curse and discards down to 3 cards in hand. (This is not in the Supply.)",
    "effects": {
      "cards": 2
    },
    "tags": [
      "terminal-draw",
      "curser",
      "handsize-attack",
      "junker"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Princess",
    "set": "Cornucopia",
    "types": [
      "Action",
      "Prize"
    ],
    "cost": {
      "coins": 0
    },
    "text": "+1 Buy. While this is in play, cards cost $2 less. (This is not in the Supply.)",
    "effects": {
      "buys": 1
    },
    "tags": [
      "plus-buy"
    ],
    "isTerminal": true,
    "isCantrip": false
  },
  {
    "name": "Trusty Steed",
    "set": "Cornucopia",
    "types": [
      "Action",
      "Prize"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Choose two: +2 Cards; +2 Actions; +$2; gain 4 Silvers and put your deck into your discard pile. The choices must be different. (This is not in the Supply.)",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Platinum",
    "set": "Prosperity",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 9
    },
    "text": "$5.",
    "effects": {
      "coins": 5
    },
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Colony",
    "set": "Prosperity",
    "types": [
      "Victory"
    ],
    "cost": {
      "coins": 11
    },
    "text": "10 VP.",
    "effects": {},
    "tags": [
      "alt-vp"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Potion",
    "set": "Alchemy",
    "types": [
      "Treasure"
    ],
    "cost": {
      "coins": 4
    },
    "text": "Produces Potion buying power.",
    "effects": {},
    "tags": [
      "economy"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Horse",
    "set": "Menagerie",
    "types": [
      "Action"
    ],
    "cost": {
      "coins": 3
    },
    "text": "+2 Cards. +1 Action. Return this to its pile. (This is not in the Supply.)",
    "effects": {
      "cards": 2,
      "actions": 1
    },
    "tags": [
      "non-terminal-draw"
    ],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Flag",
    "set": "Renaissance",
    "types": [
      "Artifact"
    ],
    "cost": {
      "coins": 0
    },
    "text": "When drawing your hand, +1 Card.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Horn",
    "set": "Renaissance",
    "types": [
      "Artifact"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Once per turn, when you discard a Border Guard from play, you may put it onto your deck.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Key",
    "set": "Renaissance",
    "types": [
      "Artifact"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your turn, +$1.",
    "effects": {
      "coins": 1
    },
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Lantern",
    "set": "Renaissance",
    "types": [
      "Artifact"
    ],
    "cost": {
      "coins": 0
    },
    "text": "Border Guards you play reveal 3 cards and discard 2. (If it finds 2 Actions, it takes the Horn.)",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  },
  {
    "name": "Treasure Chest",
    "set": "Renaissance",
    "types": [
      "Artifact"
    ],
    "cost": {
      "coins": 0
    },
    "text": "At the start of your Buy phase, gain a Gold.",
    "effects": {},
    "tags": [],
    "isTerminal": false,
    "isCantrip": false
  }
];
