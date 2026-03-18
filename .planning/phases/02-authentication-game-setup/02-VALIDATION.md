---
phase: 2
slug: authentication-game-setup
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | @playwright/test 1.58.2 |
| **Config file** | `playwright.config.ts` |
| **Quick run command** | `npx playwright test e2e/auth.spec.ts` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test e2e/auth.spec.ts`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | GAME-01 | e2e | `npx playwright test e2e/auth.spec.ts -g "login"` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | GAME-02 | e2e | `npx playwright test e2e/auth.spec.ts -g "table"` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | GAME-03 | e2e | `npx playwright test e2e/auth.spec.ts -g "kingdom"` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | GAME-04 | e2e | `npx playwright test e2e/auth.spec.ts -g "turn"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `e2e/env-setup.ts` — credential loading and validation
- [ ] `e2e/helpers/game.ts` — game interaction helpers (waitForMyTurn, etc.)
- [ ] `e2e/auth.spec.ts` — auth and game setup test file
- [ ] `.env.example` — placeholder credential file
- [ ] `.env` added to `.gitignore`
- [ ] `e2e/global-setup.ts` updated to chain env-setup
- [ ] `e2e/fixtures.ts` updated with `authenticatedPage` fixture
- [ ] `playwright.config.ts` updated with per-project retry config

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Login form selectors work | GAME-01 | Selectors unknown, must discover via headed mode | Run `npx playwright test e2e/auth.spec.ts -g "login" --headed` and verify login completes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
