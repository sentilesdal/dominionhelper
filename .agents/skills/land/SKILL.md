---
name: land
description: Merge a PR and clean up all branches and worktrees. Use when asked to land, merge, or ship a PR.
argument-hint: <PR number or branch name (optional — auto-detects current branch)>
allowed-tools: Bash
---

# Land PR

Merge a pull request and clean up all associated branches and worktrees.

## Steps

1. **Identify the PR.** If `$ARGUMENTS` is provided, use it as the PR number or branch name. Otherwise, detect from the current branch (`git branch --show-current`) and find its PR via `gh pr view --json number`.

2. **Merge the PR:**
   ```bash
   gh pr merge <number> --merge
   ```

3. **Update main:**
   ```bash
   git checkout main
   git pull
   ```

4. **Delete the local branch:**
   ```bash
   git branch -d <branch-name>
   ```

5. **Delete the remote branch:**
   ```bash
   git push origin --delete <branch-name>
   ```

6. **Remove any worktree** for this branch if it exists:
   ```bash
   git worktree remove .Codex/worktrees/<name>
   ```

7. **Prune stale remote refs:**
   ```bash
   git remote prune origin
   ```

8. **Verify** the cleanup is complete:
   ```bash
   git branch -a
   ```

Report what was merged and confirm all cleanup is done.
