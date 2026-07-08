# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by an off-by-one count (e.g., dividing by `numbers.length + 1` or using a wrong denominator), or it is computing the median/wrong statistic instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the `average` function's source implementation returning 3 instead of 4 — not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:18.7771933Z ##[endgroup]
2026-07-08T08:15:18.8889624Z 
2026-07-08T08:15:18.8890458Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:15:18.8890926Z > tsc --noEmit
2026-07-08T08:15:18.8891091Z 
﻿2026-07-08T08:15:19.7511062Z ##[group]Run npm run test
2026-07-08T08:15:19.7511612Z [36;1mnpm run test[0m
2026-07-08T08:15:19.7545209Z shell: /usr/bin/bash -e {0}
2026-07-08T08:15:19.7545479Z ##[endgroup]
2026-07-08T08:15:19.8671363Z 
2026-07-08T08:15:19.8672236Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:15:19.8672921Z > vitest run
2026-07-08T08:15:19.8673173Z 
2026-07-08T08:15:20.2100707Z 
2026-07-08T08:15:20.2105430Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:15:20.2106340Z 
2026-07-08T08:15:20.5401817Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:15:20.5403244Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:15:20.5404275Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:15:20.5504245Z 
2026-07-08T08:15:20.5511930Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:15:20.5512604Z 
2026-07-08T08:15:20.5515661Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:15:20.5517450Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:15:20.5518271Z 
2026-07-08T08:15:20.5518627Z - Expected
2026-07-08T08:15:20.5519188Z + Received
2026-07-08T08:15:20.5519541Z 
2026-07-08T08:15:20.5519843Z - 4
2026-07-08T08:15:20.5520317Z + 3
2026-07-08T08:15:20.5520648Z 
2026-07-08T08:15:20.5521318Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:15:20.5668953Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:15:20.5670590Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:15:20.5672657Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:15:20.5674624Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:15:20.5675387Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:15:20.5675977Z     [90m  8| [39m
2026-07-08T08:15:20.5676225Z 
2026-07-08T08:15:20.5676817Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:15:20.5677216Z 
2026-07-08T08:15:20.5677257Z 
2026-07-08T08:15:20.5714914Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:15:20.5727727Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:15:20.5729169Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:15:20.5730265Z [2m   Start at [22m 08:15:20
2026-07-08T08:15:20.5731696Z [2m   Duration [22m 340ms[2m (transform 36ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 81ms)[22m
2026-07-08T08:15:20.5732693Z 
2026-07-08T08:15:20.5914480Z ##[error]Process completed with exit code 1.
2026-07-08T08:15:08.6980000Z Evaluating test.if
2026-07-08T08:15:08.6980000Z Evaluating: success()
2026-07-08T08:15:08.6980000Z Result: true
2026-07-08T08:15:09.1580000Z Requested labels: ubuntu-latest
2026-07-08T08:15:09.1580000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:15:09.1580000Z Waiting for a runner to pick up this job...
2026-07-08T08:15:09.1690000Z Job is about to start running on the hosted runner: GitHub Actions 1000000966
2026-07-08T08:15:09.1680000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.