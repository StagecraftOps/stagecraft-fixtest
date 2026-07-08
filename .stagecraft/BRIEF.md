# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The test assertion expect(average([2, 4, 6])).toBe(4) fails because average() divides by (nums.length + 1) instead of nums.length, an off-by-one bug in the arithmetic.

## Why this is a code-level issue, not a pipeline config issue

This is a pure application logic bug in src/math.ts, not a workflow/CI configuration issue.

Failure category: test_failure

## Relevant log excerpt

```
FAIL src/math.test.ts > average > computes the mean of a list of numbers
AssertionError: expected 3 to be 4
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.