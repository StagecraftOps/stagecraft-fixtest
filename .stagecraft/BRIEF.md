# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. The test calls `average(2, 4, 6)` and expects `4` (the correct arithmetic mean: (2+4+6)/3 = 4), but the function returns `3`. This indicates a bug in the implementation — most likely the function is summing the values but dividing by a wrong count (e.g., dividing by the total sum rather than the number of elements, or off-by-one in the divisor), or it is computing a different statistic entirely.

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch caused by incorrect logic in the application's `average` function, not a pipeline misconfiguration — no workflow YAML change can make `average(2, 4, 6)` return `4`.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:38.3449017Z ##[endgroup]
2026-07-08T08:18:38.4461803Z 
2026-07-08T08:18:38.4462639Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:18:38.4463132Z > tsc --noEmit
2026-07-08T08:18:38.4463279Z 
﻿2026-07-08T08:18:39.2807743Z ##[group]Run npm run test
2026-07-08T08:18:39.2808240Z [36;1mnpm run test[0m
2026-07-08T08:18:39.2828894Z shell: /usr/bin/bash -e {0}
2026-07-08T08:18:39.2829482Z ##[endgroup]
2026-07-08T08:18:39.3850638Z 
2026-07-08T08:18:39.3851398Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:18:39.3851923Z > vitest run
2026-07-08T08:18:39.3852141Z 
2026-07-08T08:18:39.7243768Z 
2026-07-08T08:18:39.7247321Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:18:39.7248191Z 
2026-07-08T08:18:40.0358341Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:18:40.0359582Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:18:40.0360238Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:18:40.0454751Z 
2026-07-08T08:18:40.0461961Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:18:40.0462642Z 
2026-07-08T08:18:40.0465319Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:18:40.0467510Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:18:40.0468055Z 
2026-07-08T08:18:40.0468259Z - Expected
2026-07-08T08:18:40.0468616Z + Received
2026-07-08T08:18:40.0468816Z 
2026-07-08T08:18:40.0468968Z - 4
2026-07-08T08:18:40.0469423Z + 3
2026-07-08T08:18:40.0469585Z 
2026-07-08T08:18:40.0470064Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:18:40.0612272Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:18:40.0614196Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:18:40.0614883Z 
2026-07-08T08:18:40.0651773Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:18:40.0665590Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:18:40.0666960Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:18:40.0667438Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:18:40.0667731Z     [90m  8| [39m
2026-07-08T08:18:40.0667879Z 
2026-07-08T08:18:40.0668216Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:18:40.0668422Z 
2026-07-08T08:18:40.0668754Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:18:40.0670156Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:18:40.0671023Z [2m   Start at [22m 08:18:39
2026-07-08T08:18:40.0672163Z [2m   Duration [22m 321ms[2m (transform 44ms, setup 0ms, collect 29ms, tests 8ms, environment 0ms, prepare 87ms)[22m
2026-07-08T08:18:40.0673039Z 
2026-07-08T08:18:40.0813555Z ##[error]Process completed with exit code 1.
2026-07-08T08:18:28.9320000Z Evaluating test.if
2026-07-08T08:18:28.9320000Z Evaluating: success()
2026-07-08T08:18:28.9320000Z Result: true
2026-07-08T08:18:28.9370000Z Requested labels: ubuntu-latest
2026-07-08T08:18:28.9370000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:18:28.9370000Z Waiting for a runner to pick up this job...
2026-07-08T08:18:29.3200000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:18:29.3200000Z Job is about to start running on the hosted runner: GitHub Actions 1000000978
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.