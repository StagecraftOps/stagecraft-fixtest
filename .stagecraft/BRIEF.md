# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.test.ts` (or its implementation) is returning 3 instead of the expected 4 for the input `[2, 4, 6]`. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function returns 3, indicating a bug in the implementation — likely an off-by-one error in the denominator (e.g., dividing by `array.length + 1` or using `length - 1` instead of `length`, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by a bug in the application's `average` function implementation, not a workflow misconfiguration — no workflow change can fix incorrect arithmetic logic in source code.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:42.1604741Z ##[endgroup]
2026-07-08T08:53:42.2796881Z 
2026-07-08T08:53:42.2799751Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:53:42.2800980Z > tsc --noEmit
2026-07-08T08:53:42.2802377Z 
﻿2026-07-08T08:53:43.1975788Z ##[group]Run npm run test
2026-07-08T08:53:43.1976536Z [36;1mnpm run test[0m
2026-07-08T08:53:43.2010267Z shell: /usr/bin/bash -e {0}
2026-07-08T08:53:43.2010547Z ##[endgroup]
2026-07-08T08:53:43.3212092Z 
2026-07-08T08:53:43.3212976Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:53:43.3213643Z > vitest run
2026-07-08T08:53:43.3213910Z 
2026-07-08T08:53:43.6895723Z 
2026-07-08T08:53:43.6899915Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:53:43.6901192Z 
2026-07-08T08:53:44.0425815Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:53:44.0428197Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:53:44.0429232Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:44.0543165Z 
2026-07-08T08:53:44.0551703Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:53:44.0552374Z 
2026-07-08T08:53:44.0555626Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:53:44.0558056Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:44.0558811Z 
2026-07-08T08:53:44.0559039Z - Expected
2026-07-08T08:53:44.0559340Z + Received
2026-07-08T08:53:44.0559479Z 
2026-07-08T08:53:44.0559576Z - 4
2026-07-08T08:53:44.0559799Z + 3
2026-07-08T08:53:44.0559917Z 
2026-07-08T08:53:44.0561012Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:53:44.0768875Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:44.0770928Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:44.0773245Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:53:44.0774349Z 
2026-07-08T08:53:44.0807115Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:53:44.0819463Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:53:44.0820337Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:53:44.0820911Z     [90m  8| [39m
2026-07-08T08:53:44.0821217Z 
2026-07-08T08:53:44.0821826Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:53:44.0822339Z 
2026-07-08T08:53:44.0823003Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:53:44.0824851Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:53:44.0825872Z [2m   Start at [22m 08:53:43
2026-07-08T08:53:44.0827555Z [2m   Duration [22m 364ms[2m (transform 39ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:53:44.0828389Z 
2026-07-08T08:53:44.1033891Z ##[error]Process completed with exit code 1.
2026-07-08T08:53:28.6600000Z Requested labels: ubuntu-latest
2026-07-08T08:53:28.6600000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:53:28.6600000Z Waiting for a runner to pick up this job...
2026-07-08T08:53:28.6570000Z Evaluating test.if
2026-07-08T08:53:28.6570000Z Evaluating: success()
2026-07-08T08:53:28.6570000Z Result: true
2026-07-08T08:53:29.1140000Z Job is about to start running on the hosted runner: GitHub Actions 1000001174
2026-07-08T08:53:29.1130000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.