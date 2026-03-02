# ADR-001: Dominion Helper Chrome Extension Architecture

## Status
Accepted

## Date
2026-03-02

## Context

Dominion Online (dominion.games) is the official digital implementation of the Dominion card game. When a game begins, 10 kingdom cards are selected (plus landscapes like Events, Projects, Ways, Traits, and Prophecies). Experienced players mentally evaluate these cards for synergies, viable strategies, and key interactions — a skill that takes hundreds of hours to develop.

We want to build a Chrome extension that analyzes the current kingdom and surfaces synergy information, strategic insights, and card interaction data to help players of all levels make better decisions.

### Research Findings

#### Existing Tools and Extensions
- **King's Courtier** (Icehawk78/kings_courtier): Visual enhancement plugin for dominion.games. Primarily cosmetic — shows full card art instead of pile tops. Not a strategy tool.
- **Dominion Companion**: Deck tracker that shows cards in your deck/discard and draw probabilities. Focuses on game-state tracking, not kingdom analysis.
- **DominionWorld Game Tracker**: Tracks game results and uploads to a leaderboard.
- **Dominion Extension**: General improvements to the dominion.games client.

**Gap identified**: No existing tool performs pre-game kingdom synergy analysis. This is our niche.

#### Card Data Sources
- **KLongmuir/dominion-card-data** (GitHub): JSON dataset of all Dominion cards with structured fields including: name, set, types, cost, text, actionsVillagers, cards, buys, coinsCoffers, trashReturn, exile, junk, gain, victoryPoints, setup, categories.
- **wesbuck/DominionCardAPI**: REST API for card data, includes random kingdom generation.
- **wiki.dominionstrategy.com**: The authoritative Dominion strategy wiki with Cargo database tables that can be queried.
- **dominionstrategy.com**: Strategy articles, kingdom analysis guides, and card-by-card breakdowns.

#### Scale of Content
- ~452 distinct kingdom card piles across all expansions (not counting 46 removed cards)
- 16+ expansions: Dominion, Intrigue, Seaside, Alchemy, Prosperity, Cornucopia, Hinterlands, Dark Ages, Guilds, Adventures, Empires, Nocturne, Renaissance, Menagerie, Allies, Plunder, Rising Sun
- Landscape types: Events, Projects, Ways, Allies, Traits, Prophecies, Landmarks

#### dominion.games Technical Details
- The client appears to use vanilla JavaScript (no major SPA framework detected)
- Game state communicated via WebSocket connections
- Card names appear in the DOM as text content within game log entries and supply piles
- Existing extensions (King's Courtier, Dominion Companion) successfully parse the DOM, confirming feasibility

---

## Decision: Synergy Analysis Categories

Based on extensive research of Dominion strategy literature, competitive play analysis, and the "Generalized Kingdom Analysis" framework (dominionstrategy.com), we will analyze kingdoms across the following synergy categories:

### 1. Deck Control (Foundation Layer)

#### 1a. Trashing
Cards that remove cards from your deck to increase consistency and quality.
- **Pure Trashers**: Chapel, Steward, Donate — remove cards with no replacement
- **Trash-for-Benefit**: Remodel, Upgrade, Remake, Apprentice, Salvager — trash a card and get something in return
- **Self-Trashers**: Fortress, Mining Village, Treasure Map — trash themselves for benefit
- **Trash on Gain**: Watchtower, Travelling Fair — can trash newly gained cards

**Synergy signals to detect:**
- Trasher present + cards that benefit from thin decks (engines, draw-to-X)
- Trash-for-benefit + expensive cards that can be upgraded
- Trasher present + cursing attack = strong counter available
- No trashing available = flag as important constraint

#### 1b. Sifting / Filtering
Cards that improve hand quality without permanently removing cards.
- **Sifters**: Cellar, Warehouse, Forum, Dungeon — discard and draw
- **Topdeckers**: Cartographer, Sentry, Lookout — manipulate deck order
- **Draw-to-X**: Library, Watchtower, Scholar — draw until you have X cards (combos with terminal actions)

**Synergy signals:**
- Sifter + Victory cards in hand = can cycle past green cards
- Draw-to-X + many terminal actions = powerful combo (play terminals, then draw back up)

### 2. Engine Components (Building Layer)

#### 2a. Villages (+Actions)
Cards that provide +2 or more Actions, enabling "engine" strategies.
- **Pure Villages**: Village, Worker's Village, Port — +2 Actions, +1 Card
- **Bonus Villages**: Festival (+Buy, +$2), Bazaar (+$1), Border Village (gain on buy)
- **Conditional Villages**: Shanty Town (if no actions in hand), Conclave (if not duplicate)
- **Throne Room Variants**: Throne Room, King's Court — play an action multiple times (virtual village)
- **Non-Action Villages**: Ways, certain Allies — provide +Actions from non-traditional sources

**Synergy signals:**
- Village present + strong terminal actions = engine viable
- Multiple villages + strong draw = full-draw engine possible
- No village = mostly limited to 1 action per turn (Big Money territory)
- Throne Room + powerful terminal = exponential power

#### 2b. Draw (+Cards)
Cards that draw additional cards to see more of your deck each turn.
- **Cantrips**: +1 Card, +1 Action — deck-neutral cycling (Market, Pawn)
- **Terminal Draw**: Smithy (+3), Wharf (+2 now and next turn), Mountebank
- **Non-terminal Draw**: Laboratory (+2 Cards, +1 Action), Stables
- **Draw-to-X**: Library, Watchtower — draw up to a hand size

**Synergy signals:**
- Draw + Village = engine core (Village/Smithy archetype)
- Terminal draw + no village = at most 1 draw card useful
- Draw-to-X + terminal actions = powerful synergy
- Strong draw + trasher = can draw entire thin deck

#### 2c. +Buy and Gaining
Cards that let you acquire more than one card per turn.
- **+Buy cards**: Market, Festival, Guildmaster, Margrave
- **Gainers**: Workshop (gain up to $4), Ironworks (gain up to $4 with bonus), Artisan (gain up to $5 to hand)
- **On-gain effects**: Innovation, Falconer, Sheepdog

**Synergy signals:**
- +Buy + lots of economy = multiple Province turns (engine payoff)
- Gainer + Gardens/Silk Road = rush strategy
- Gainer + trash-for-benefit = upgrade chains
- No +Buy = engine ceiling limited (can only buy 1 card/turn)

### 3. Payload (Income Layer)

#### 3a. Economy / Treasure
Cards that generate coins for buying.
- **Treasure cards**: Silver, Gold, Platinum, Fool's Gold
- **Action-based economy**: Market ($1), Festival ($2), Bridge (reduces costs)
- **Cost reducers**: Bridge, Highway, Princess — make everything cheaper
- **Treasures with effects**: Venture, Bank, Horn of Plenty

**Synergy signals:**
- Cost reduction + gainer = acquire expensive cards cheaply
- Action economy + village/draw engine = sustainable income
- No strong economy = may struggle to reach Province ($8)

#### 3b. Payload Actions
Terminal actions that provide the "punch" of an engine turn.
- **Attacks as payload**: Militia, Witch, Mountebank — hurt opponent while you gain
- **Bridge-type**: Bridge, Highway — cost reduction as payload
- **VP gainers**: Bishop, Monument — score points without buying Victory cards

### 4. Scoring (Endgame Layer)

#### 4a. Standard Victory (Province/Colony Racing)
- Province costs $8, game often ends when Province pile empties
- Colony costs $11 (with Prosperity), rewards bigger engines
- Duchy ($5) for late-game points

#### 4b. Alternative Victory Points (Alt-VP)
Cards whose VP value depends on deck composition.
- **Gardens**: 1 VP per 10 cards in deck (rewards large decks)
- **Duke**: VP per Duchy (rewards Duchy accumulation)
- **Silk Road**: VP per Victory card in deck
- **Vineyards**: VP per Action card in deck
- **Fairgrounds**: VP per differently-named card
- **Feodum**: VP per Silver in deck

**Synergy signals:**
- Gardens + Workshop/Ironworks = rush strategy (drain piles fast)
- Vineyards + engine full of actions = high scoring
- Duke + no good $5 cards = Duchy/Duke viable
- Alt-VP present = flag as potential alternative win condition

#### 4c. Three-Pile Ending
Games can also end when any 3 supply piles are empty. This is critical for rush strategies.
- Gainers that target specific piles can enable 3-pile endings
- Workshop/Ironworks + Gardens/Silk Road can rush-empty piles

### 5. Interaction (Attack & Defense Layer)

#### 5a. Attacks
- **Cursers**: Witch, Mountebank, Sea Hag, Torturer — add Curses to opponent decks
- **Handsize Attacks**: Militia, Margrave, Ghost Ship — force opponents to discard/topdeck
- **Trashers (opponent)**: Knights, Saboteur — destroy opponent's cards
- **Deck Disruptors**: Bandit, Thief — affect opponent treasures
- **Junkers**: Swindler, Ambassador — add bad cards to opponent decks

**Synergy signals:**
- Cursing attack + no trasher available = devastating
- Cursing attack + own trasher = can clean up while opponent suffers
- Handsize attack + draw = you recover while opponent stays diminished
- Multiple attacks + Throne Room = amplified pain

#### 5b. Defense
- **Reactions**: Moat (blanket immunity), Diplomat (draw on attack), Horse Traders
- **Avoidance**: Lighthouse (next-turn immunity), Guardian (prevents attacks next turn)

**Synergy signals:**
- Attack present + Reaction present = flag the counter
- Strong attack + no defense = important strategic warning

### 6. Strategy Archetype Detection

Based on the cards present, identify which macro-strategies are viable:

#### Big Money
- Criteria: Strong treasure/economy cards, no village, limited draw
- Enhanced by: Powerful terminal actions (1-2 max), strong $5 cards
- Signal: "This kingdom favors Big Money with [card] support"

#### Engine
- Criteria: Village + Draw + Payload present
- Types: Village/Smithy, Double Tactician, Draw-to-X engine
- Signal: "Engine components available: [village] + [draw] + [payload]"

#### Rush
- Criteria: Gainer + Alt-VP or pile-draining potential
- Classic: Workshop/Ironworks + Gardens
- Signal: "Rush strategy possible: [gainer] + [alt-VP]"

#### Slog
- Criteria: Strong attacks, limited trashing, game becomes war of attrition
- Signal: "Slog conditions: [attack] with limited trashing available"

#### Combo
- Criteria: Specific 2-3 card combinations with outsized synergy
- Examples: King's Court + Bridge, Throne Room + powerful terminal
- Signal: "Key combo: [card A] + [card B] — [description]"

### 7. Opening Analysis

Evaluate the best opening buys based on the 5/2 vs 4/3 split:
- **5/2 split** (17% chance): What $5 and $2 cards are best to open?
- **4/3 split** (83% chance): What $4 and $3 cards work well together?
- Flag terminal collision risks (opening two terminal actions)
- Identify if opening a trasher is critical

---

## Decision: Technical Architecture

### Chrome Extension Structure (Manifest V3)

```
dominionhelper/
├── manifest.json          # Extension manifest (V3)
├── src/
│   ├── content/
│   │   ├── content.js     # Content script injected into dominion.games
│   │   ├── observer.js    # MutationObserver to detect kingdom cards
│   │   └── ui.js          # Overlay/panel UI rendering
│   ├── analysis/
│   │   ├── engine.js      # Main analysis engine
│   │   ├── synergies.js   # Synergy detection rules
│   │   ├── archetypes.js  # Strategy archetype detection
│   │   └── openings.js    # Opening analysis
│   ├── data/
│   │   ├── cards.json     # Complete card database
│   │   ├── tags.json      # Card tags/categories (village, trasher, etc.)
│   │   └── combos.json    # Known card combinations
│   ├── popup/
│   │   ├── popup.html     # Extension popup UI
│   │   ├── popup.js       # Popup logic
│   │   └── popup.css      # Popup styles
│   └── background/
│       └── service-worker.js  # Background service worker
├── icons/                 # Extension icons
├── docs/
│   └── adr/              # Architecture Decision Records
├── tests/                # Unit tests
├── package.json
└── README.md
```

### Data Model

#### Card Schema
```json
{
  "name": "Chapel",
  "set": "Dominion",
  "types": ["Action"],
  "cost": { "coins": 2, "potions": 0, "debt": 0 },
  "text": "Trash up to 4 cards from your hand.",
  "effects": {
    "actions": 0,
    "cards": 0,
    "buys": 0,
    "coins": 0
  },
  "tags": ["trasher", "pure-trasher", "strong-trasher"],
  "trashCapacity": "0-4",
  "isTerminal": true,
  "isCantrip": false
}
```

#### Synergy Rule Schema
```json
{
  "id": "trasher-plus-curser-counter",
  "name": "Trash-Based Curse Defense",
  "description": "A trasher is available to remove Curses from attacks",
  "conditions": {
    "requires": ["trasher", "curser"],
    "any": false
  },
  "severity": "high",
  "category": "interaction",
  "message": "{trasher} can trash Curses from {curser}"
}
```

### Phase 1: DOM Detection Strategy

The content script will:
1. Use a `MutationObserver` to watch for changes in the game page DOM
2. Detect when a game starts and kingdom cards are displayed
3. Extract card names from the supply area (text content matching known card names)
4. Pass the card list to the analysis engine
5. Display results in an overlay panel

### Phase 2+ Roadmap
- **Phase 1** (current): Static synergy analysis based on card presence in kingdom
- **Phase 2**: Opening recommendations with probability calculations
- **Phase 3**: Real-time game state tracking integration (what's been bought/gained)
- **Phase 4**: Community-contributed synergy rules and ratings
- **Phase 5**: AI-powered analysis using LLM for complex interactions

---

## Decision: Technology Choices

| Choice | Decision | Rationale |
|--------|----------|-----------|
| Extension Manifest | V3 | Required for Chrome Web Store, modern standard |
| Language | Vanilla JavaScript (ES2022+) | No build step initially, matches dominion.games stack, keeps it simple |
| Data Format | JSON | Card data stored as static JSON, easy to update |
| UI Framework | None (vanilla DOM) | Lightweight, no dependencies for overlay panel |
| Testing | Vitest | Lightweight, fast, good ESM support |
| Card Data Source | KLongmuir/dominion-card-data + custom tags | Base data exists; we add our own synergy tags |
| Synergy Rules | Declarative JSON + JS evaluation | Rules defined in JSON, evaluated by JS engine |

---

## Decision: Card Tagging System

Every card will be tagged with functional categories. Tags are the foundation of synergy detection.

### Tag Categories

| Tag | Description | Examples |
|-----|-------------|---------|
| `village` | Provides +2 or more Actions | Village, Festival, Bazaar |
| `terminal-draw` | Draws cards but costs an action | Smithy, Wharf, Council Room |
| `non-terminal-draw` | Draws cards and gives +Action | Laboratory, Stables |
| `cantrip` | +1 Card, +1 Action (deck neutral) | Market, Pawn |
| `trasher` | Can trash cards from your deck | Chapel, Steward, Remodel |
| `strong-trasher` | Trashes multiple cards efficiently | Chapel, Donate, Sentry |
| `trash-for-benefit` | Trashes and gives something back | Remodel, Upgrade, Salvager |
| `curser` | Adds Curses to opponent decks | Witch, Mountebank, Sea Hag |
| `handsize-attack` | Reduces opponent hand size | Militia, Margrave, Ghost Ship |
| `junker` | Adds junk to opponent decks | Swindler, Ambassador |
| `reaction` | Can react to opponent attacks | Moat, Diplomat, Horse Traders |
| `gainer` | Gains cards without buying | Workshop, Ironworks, Artisan |
| `plus-buy` | Provides +Buy | Market, Festival, Guildmaster |
| `economy` | Generates significant coins | Festival, Grand Market, Bridge |
| `cost-reducer` | Reduces card costs | Bridge, Highway, Princess |
| `alt-vp` | Alternative VP scoring | Gardens, Duke, Vineyards |
| `sifter` | Filters hand quality | Cellar, Warehouse, Forum |
| `draw-to-x` | Draws to a specific hand size | Library, Watchtower |
| `throne-variant` | Plays actions multiple times | Throne Room, King's Court |
| `duration` | Effect persists to next turn | Wharf, Fishing Village, Caravan |
| `on-gain` | Triggers when cards are gained | Watchtower, Innovation |
| `self-trasher` | Trashes itself for benefit | Fortress, Mining Village |
| `payload` | Strong terminal action for engine turns | Bridge, Witch, Mountebank |

---

## Consequences

### Positive
- Fills a clear gap: no existing tool does kingdom synergy analysis
- Declarative rule system is extensible — community can contribute rules
- JSON-based card data is easy to maintain and update with new expansions
- Lightweight vanilla JS means fast load times and minimal complexity
- Phase 1 is achievable without understanding dominion.games internals deeply

### Negative
- Card tagging is manual and subjective — requires Dominion expertise to maintain
- DOM parsing is fragile — dominion.games updates could break detection
- ~452 cards to tag is significant initial effort
- Synergy rules need to handle complex multi-card interactions
- No API from dominion.games means we rely on DOM scraping

### Risks
- dominion.games may change their DOM structure at any time
- Card data sources may become outdated as new expansions release
- Strategy advice could be wrong for edge cases — need disclaimers
- Performance impact on the game page needs to be monitored

### Mitigations
- Abstract DOM parsing behind a clean interface so it can be updated independently
- Version the card data and provide update mechanisms
- Label analysis as "suggestions" not "optimal play"
- Run analysis asynchronously to avoid blocking the game UI
