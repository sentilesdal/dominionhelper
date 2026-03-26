# Tracker Ground-Truth Implementation Plan

Status: Proposed

## Context

Tracker bugs have been expensive to debug because our current workflow leans too hard on live random games and too little on reproducible evidence.

Today we usually:

1. Rebuild the extension
2. Load a fresh random bot table on `dominion.games`
3. Notice that the tracker looks wrong
4. Guess at the cause
5. Patch the code
6. Repeat

That loop is useful for smoke coverage, but it is a poor primary debugging workflow for hidden-zone logic. The main problems are:

- Random kingdoms introduce noise and make each reproduction slightly different
- The tracker often reconstructs hidden state, so correctness is not always obvious from the UI alone
- We do not currently save reference games with established expected states
- We do not currently have a structured way to get user input at specific checkpoints
- Live browser runs are timing-sensitive and should not be the only regression signal

We need a workflow built around recorded games, explicit checkpoints, and deterministic replay tests.

## Research Notes

- The official Dominion rules confirm the cleanup ordering we must model: cleanup discards hand and non-persistent cards in play, then draws a new hand. Source: [Dominion 2nd Edition Rules PDF](https://www.riograndegames.com/wp-content/uploads/2016/09/Dominion2E.pdf).
- The official rules and card text also imply a default rule of "gains go to discard unless card text or log wording says otherwise."
- Community discussions indicate that dominion.games game IDs can be recorded and old games can be revisited with the "Load Old Game" flow. This matches user observation and makes manual replay practical, but those live IDs should be treated as debugging aids rather than CI truth.
  - [Reddit discussion 1](https://www.reddit.com/r/dominion/comments/hwu5f2/question_on_dominiongames_is_it_possible_to_get/)
  - [Reddit discussion 2](https://www.reddit.com/r/dominion/comments/g1j1vx/how_to_find_and_replay_an_old_game_on/)
- We should not commit the full official Dominion rules PDF into the repo without clear redistribution permission. Rio Grande's terms are compatible with personal downloading, but not obviously with republishing project fixtures. Source: [Rio Grande Games Terms of Use](https://www.riograndegames.com/terms-of-use/).

## Goals

- Replace ad hoc tracker debugging with a repeatable ground-truth workflow
- Save several reference games so tracker bugs can be replayed exactly
- Create a structured way to collect user-provided expected states at key checkpoints
- Convert recorded games into deterministic tests that do not depend on random live tables
- Keep a small live Playwright workflow for smoke verification and manual walkthroughs

## Non-Goals

- Eliminate all live browser testing
- Infer exact hidden information for every opponent zone in every situation
- Fully automate Dominion gameplay as part of the correctness test suite
- Mirror the entire official Dominion ruleset into the repository

## Proposed Workflow

### 1. Record Reference Games

Create a tracked fixtures area, for example:

```text
fixtures/games/<game-id>/
  meta.json
  log.txt
  checkpoints.json
  notes.md
```

Each fixture should include:

- `game-id`
- player names and which player is local
- kingdom cards
- raw game log text
- optional notes about unusual card interactions

The old dominion.games game ID should be stored as metadata, but automated tests should consume the saved fixture files rather than depend on live site availability.

### 2. Add Checkpoints Instead of Full Manual Annotation

We should not require full line-by-line human annotation for every game.

Instead, define checkpoints at meaningful boundaries:

- after the opening draw
- after each gain
- after each trash
- after each shuffle
- after each cleanup / next-turn hand draw
- after any card with a non-default gain destination

At each checkpoint, store the expected local-player state:

- discard contents
- hand contents
- in-play contents
- draw-pile contents when known
- comments when the expectation is approximate rather than exact

### 3. Build a Capture Tool

Add a small tool that exports:

- raw game log lines
- extension tracker state
- bridge snapshot
- kingdom metadata
- current line index or checkpoint marker

This tool should support two workflows:

- capture a completed game into a fixture directory
- step through a loaded old game and dump state at selected checkpoints

### 4. Build a Replay Harness

Add deterministic tests that replay saved log fixtures through the tracker pipeline.

The replay harness should:

- process log lines in order
- apply saved checkpoints at specific line numbers or labels
- compare computed tracker zones against expected values
- distinguish exact assertions from count-only assertions

This should become the primary regression layer for tracker correctness.

### 5. Keep Live Browser Tests Focused

Live Playwright runs should be narrowed to:

- extension load and injection smoke checks
- tracker hydration on a fresh game
- manual or semi-manual walkthroughs of saved old games

They should not remain the main source of truth for hidden-zone correctness.

## User-In-The-Loop Debugging Protocol

When a new tracker bug is discovered, use this process:

1. Capture the game ID and log for the affected game
2. Load the old game for manual investigation
3. Identify a small number of checkpoints that matter
4. Ask the user only for the expected state at those checkpoints
5. Save those expectations into the fixture
6. Reproduce the bug in a replay test before changing tracker logic
7. Validate the fix against the fixture first, then confirm in headed Playwright

This makes user input concrete and reusable instead of ephemeral.

## Data Model Guidance

### What We Should Assert Exactly

- local-player hand contents
- local-player in-play contents
- local-player discard contents when the log and/or user annotation makes them knowable
- public and visible zones such as trash
- player-tab identities and selection behavior

### What We Should Assert More Carefully

- opponent hidden hands
- opponent hidden deck composition when draw identities are not revealed
- any state that is underdetermined by the log alone

For underdetermined cases, tests should assert counts, invariants, or explicitly annotated expectations rather than pretend the tracker can know more than it really can.

## Implementation Phases

### Phase 1: Fixture Schema

Deliverables:

- `fixtures/games/README.md`
- documented fixture directory structure
- documented checkpoint schema

### Phase 2: Capture and Export Tooling

Deliverables:

- a script to export completed or loaded-old-game data into a fixture directory
- a simple way to mark or collect checkpoints

### Phase 3: Replay Test Harness

Deliverables:

- a replay helper for tracker tests
- deterministic replay tests for at least one recorded game

### Phase 4: Initial Golden Games

Seed the repo with at least three reference fixtures:

1. simple buy to discard plus cleanup draw
2. gain with non-default destination such as hand or topdeck
3. shuffle and trash interactions

### Phase 5: Workflow Adoption

Deliverables:

- update tracker workflow docs
- demote random live table tests to smoke/manual verification
- require fixture reproduction for future tracker bug fixes

## Acceptance Criteria

- We can export a finished or loaded old game into a stable fixture directory
- We can attach expected checkpoints to that fixture without editing test code directly
- We can replay a recorded fixture through automated tests and get deterministic results
- At least three tracker fixtures exist and cover distinct zone-movement cases
- A new tracker fix can be validated against a saved fixture before touching live random games
- Live Playwright remains part of the workflow, but no tracker bug fix relies on random-table behavior alone
- The user can participate by confirming checkpoint expectations, and those confirmations become durable test data

## Open Questions

- What is the best fixture format for bridge snapshots: inline in `checkpoints.json` or separate per-checkpoint files?
- Should fixtures store checkpoint expectations by line number, log text match, or stable labels?
- Do we want one capture tool for both manual debugging and test-fixture generation, or two smaller tools?
- Which initial recorded games should become our first goldens?

## Recommended Next Step

Implement Phase 1 and Phase 2 first:

1. define the fixture schema
2. add a capture/export tool
3. record the first two or three games
4. annotate the first checkpoint set together

Only after that should we expand the deterministic tracker replay suite.
