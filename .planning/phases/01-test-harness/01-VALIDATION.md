---
phase: 1
slug: test-harness
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-17
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | @playwright/test 1.58.2 |
| **Config file** | `playwright.config.ts` (Wave 0 creates) |
| **Quick run command** | `npx playwright test e2e/smoke.spec.ts -x` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test e2e/smoke.spec.ts -x`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | HARNESS-01 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | HARNESS-02 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | HARNESS-03 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 1 | HARNESS-04 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 1 | HARNESS-05 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-06 | 01 | 1 | HARNESS-06 | smoke | `npx playwright test e2e/smoke.spec.ts -x` | ❌ W0 | ⬜ pending |
| 01-01-07 | 01 | 1 | DX-01 | config | `npm run test:e2e` | ❌ W0 | ⬜ pending |
| 01-01-08 | 01 | 1 | DX-02 | config | `grep 'workers' playwright.config.ts` | ❌ W0 | ⬜ pending |
| 01-01-09 | 01 | 1 | DX-04 | manual | `npm run test:e2e -- --headed` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `playwright.config.ts` — Playwright configuration with `workers: 1`, `globalSetup`, `testDir: './e2e'`
- [ ] `e2e/fixtures.ts` — Custom fixtures for context, extensionId, gamePage, sidePanelPage
- [ ] `e2e/global-setup.ts` — Pre-build via `execSync('npm run build')`
- [ ] `e2e/smoke.spec.ts` — Smoke test for HARNESS-06 (SW active + side panel renders)
- [ ] Framework install: `npm install --save-dev @playwright/test dotenv && npx playwright install chromium`
- [ ] NPM script: `"test:e2e": "npx playwright test"` in package.json

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `--headed` opens visible browser | DX-04 | Requires visual confirmation of browser window | Run `npm run test:e2e -- --headed` and verify a Chrome window appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
