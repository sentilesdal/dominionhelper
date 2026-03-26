# Git Workflow

## Worktrees

All implementation work MUST happen in a git worktree, never on the main branch directly. This enables parallel agent work without conflicts.

- Before writing any code, create a worktree: `git worktree add .Codex/worktrees/<name> -b <branch-name>`
- Use descriptive worktree names matching the feature/fix (e.g., `add-opening-analysis`, `fix-observer-race-condition`)
- After work is complete and the PR is created, clean up the worktree: `git worktree remove .Codex/worktrees/<name>`
- NEVER commit directly to `main` — always work on a feature branch in a worktree

## Branches and PRs

Every logical unit of work gets its own branch and pull request:

- Branch names: `<type>/<short-description>` (e.g., `feat/opening-analysis`, `fix/observer-debounce`, `refactor/engine-types`, `test/synergy-coverage`)
- One PR per logical change — don't bundle unrelated changes
- PR description must explain what changed and why
- All checks must pass before the PR is ready: `npm run typecheck && npm run lint && npm test`
- Include a test plan in the PR body

## Landing PRs

When asked to "land", "merge", or "ship" a PR, ALWAYS perform the full cleanup:

1. Merge the PR via `gh pr merge <number> --merge`
2. Switch to main and pull: `git checkout main && git pull`
3. Delete the local branch: `git branch -d <branch-name>`
4. Delete the remote branch: `git push origin --delete <branch-name>`
5. Remove the worktree if it still exists: `git worktree remove .Codex/worktrees/<name>`
6. Prune stale remote refs: `git remote prune origin`

Never leave stale branches behind — both local and remote must be cleaned up.

## Commit Messages

- Use imperative mood: "Add opening analysis" not "Added opening analysis"
- First line: concise summary (under 72 chars)
- Body: explain the "why" if not obvious from the summary
