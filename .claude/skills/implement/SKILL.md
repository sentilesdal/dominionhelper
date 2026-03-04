---
name: implement
description: Implement a feature, fix, or refactor end-to-end — creates a worktree, writes code with tests and documentation, runs all checks, and creates a PR. Use this when asked to build something, fix a bug, or make a code change.
argument-hint: <description of the change>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, EnterPlanMode, ExitPlanMode
---

# Implementation Workflow

You are implementing: $ARGUMENTS

Follow this workflow exactly:

## 1. Plan

- Read the relevant source files to understand the current code
- Determine which files need to change and what new files are needed
- Identify what tests to write
- Choose a branch name: `feat/<name>`, `fix/<name>`, `refactor/<name>`, or `test/<name>`

## 2. Create Worktree

```bash
git worktree add .claude/worktrees/<name> -b <branch-name>
```

All subsequent file operations must happen inside `.claude/worktrees/<name>/`.

Run `npm install` in the worktree if `node_modules` doesn't exist.

## 3. Implement

Write the code changes. For every change:

- Add JSDoc comments to all exported functions explaining purpose, params, and return values
- Add inline comments for complex logic explaining WHY
- Add a file-level comment explaining what the module does
- Follow the TypeScript conventions in `.claude/rules/code-style.md`

## 4. Write Tests

- Create or update test files in `tests/`
- Cover happy path, edge cases, and error conditions
- Each test should verify ONE behavior
- Use descriptive test names: `it("detects engine core when village and draw are present")`

## 5. Verify

Run all checks from within the worktree. ALL must pass:

```bash
npm run typecheck      # No type errors
npm run lint           # No lint errors
npm run format:check   # Formatting correct (run `npm run format` to fix)
npm test               # All tests pass
npm run build          # Extension builds successfully
```

Fix any failures before proceeding.

## 6. Commit and PR

```bash
git add <specific files>
git commit -m "<descriptive message>"
git push -u origin <branch-name>
gh pr create --title "<title>" --body "<description with test plan>"
```

Include in the PR body:
- Summary of changes (what and why)
- Test plan (how to verify the changes work)

## 7. Clean Up

```bash
cd /path/to/main/repo
git worktree remove .claude/worktrees/<name>
```

Report the PR URL to the user.
