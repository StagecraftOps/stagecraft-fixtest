# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. The sum of [2, 4, 6] is 12, and dividing by 3 gives 4 — but the function is producing 3, which is the median (or possibly dividing by 4 instead of 3, or summing incorrectly). This is a genuine logic bug in the application's `average` implementation.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct, so the bug is in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:43.2633643Z ##[endgroup]
2026-07-08T08:28:43.3731243Z 
2026-07-08T08:28:43.3732069Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:43.3732569Z > tsc --noEmit
2026-07-08T08:28:43.3733242Z 
﻿2026-07-08T08:28:44.2380405Z ##[group]Run npm run test
2026-07-08T08:28:44.2380731Z [36;1mnpm run test[0m
2026-07-08T08:28:44.2413094Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:44.2413365Z ##[endgroup]
2026-07-08T08:28:44.3515544Z 
2026-07-08T08:28:44.3516001Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:44.3516540Z > vitest run
2026-07-08T08:28:44.3516780Z 
2026-07-08T08:28:44.6750640Z 
2026-07-08T08:28:44.6754334Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:44.6765112Z 
2026-07-08T08:28:45.0104816Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:28:45.0110199Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:45.0111037Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:45.0207637Z 
2026-07-08T08:28:45.0215794Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:45.0216432Z 
2026-07-08T08:28:45.0219580Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:45.0221857Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:45.0222444Z 
2026-07-08T08:28:45.0222834Z - Expected
2026-07-08T08:28:45.0223321Z + Received
2026-07-08T08:28:45.0223520Z 
2026-07-08T08:28:45.0223687Z - 4
2026-07-08T08:28:45.0224005Z + 3
2026-07-08T08:28:45.0224227Z 
2026-07-08T08:28:45.0224814Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:45.0374268Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:45.0376056Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:45.0379092Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:45.0380142Z 
2026-07-08T08:28:45.0411816Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:45.0423827Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:45.0424350Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:45.0424685Z     [90m  8| [39m
2026-07-08T08:28:45.0424834Z 
2026-07-08T08:28:45.0425170Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:45.0425397Z 
2026-07-08T08:28:45.0425764Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:45.0426472Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:45.0426995Z [2m   Start at [22m 08:28:44
2026-07-08T08:28:45.0427734Z [2m   Duration [22m 345ms[2m (transform 39ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:28:45.0428234Z 
2026-07-08T08:28:45.0619875Z ##[error]Process completed with exit code 1.
2026-07-08T08:28:31.1950000Z Evaluating test.if
2026-07-08T08:28:31.1950000Z Evaluating: success()
2026-07-08T08:28:31.1950000Z Result: true
2026-07-08T08:28:31.1980000Z Requested labels: ubuntu-latest
2026-07-08T08:28:31.1980000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:28:31.1980000Z Waiting for a runner to pick up this job...
2026-07-08T08:28:31.4290000Z Job is about to start running on the hosted runner: GitHub Actions 1000001027
2026-07-08T08:28:31.4290000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.