# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by a wrong count (e.g., dividing by 3+1=4 or summing incorrectly), or using integer/floor division incorrectly. The test at `src/math.test.ts:6` correctly asserts the mean of `[2, 4, 6]` should be `4`, so the implementation is at fault.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is indeed 4), so the bug lies in the application's `average` function implementation returning 3 instead of 4, which requires fixing the source code rather than the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:47.5150695Z ##[endgroup]
2026-07-08T08:51:47.6255213Z 
2026-07-08T08:51:47.6255866Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:51:47.6256380Z > tsc --noEmit
2026-07-08T08:51:47.6256954Z 
﻿2026-07-08T08:51:48.5219913Z ##[group]Run npm run test
2026-07-08T08:51:48.5220218Z [36;1mnpm run test[0m
2026-07-08T08:51:48.5253348Z shell: /usr/bin/bash -e {0}
2026-07-08T08:51:48.5253618Z ##[endgroup]
2026-07-08T08:51:48.6395001Z 
2026-07-08T08:51:48.6395707Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:51:48.6396082Z > vitest run
2026-07-08T08:51:48.6396217Z 
2026-07-08T08:51:48.9686914Z 
2026-07-08T08:51:48.9690535Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:51:48.9691585Z 
2026-07-08T08:51:49.2957104Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:51:49.2959177Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:51:49.2960345Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:49.3053701Z 
2026-07-08T08:51:49.3060077Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:51:49.3061276Z 
2026-07-08T08:51:49.3063959Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:51:49.3065505Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:49.3066245Z 
2026-07-08T08:51:49.3066916Z - Expected
2026-07-08T08:51:49.3067347Z + Received
2026-07-08T08:51:49.3067663Z 
2026-07-08T08:51:49.3067927Z - 4
2026-07-08T08:51:49.3068319Z + 3
2026-07-08T08:51:49.3068499Z 
2026-07-08T08:51:49.3069117Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:51:49.3210083Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:49.3211891Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:49.3213953Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:51:49.3215739Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:51:49.3216177Z 
2026-07-08T08:51:49.3216572Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:51:49.3217157Z     [90m  8| [39m
2026-07-08T08:51:49.3249261Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:51:49.3259869Z 
2026-07-08T08:51:49.3260520Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:51:49.3260926Z 
2026-07-08T08:51:49.3261871Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:51:49.3263458Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:51:49.3264661Z [2m   Start at [22m 08:51:48
2026-07-08T08:51:49.3266297Z [2m   Duration [22m 336ms[2m (transform 39ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 84ms)[22m
2026-07-08T08:51:49.3267323Z 
2026-07-08T08:51:49.3436246Z ##[error]Process completed with exit code 1.
2026-07-08T08:51:34.9240000Z Evaluating test.if
2026-07-08T08:51:34.9240000Z Evaluating: success()
2026-07-08T08:51:34.9240000Z Result: true
2026-07-08T08:51:34.9350000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:51:34.9260000Z Requested labels: ubuntu-latest
2026-07-08T08:51:34.9260000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:51:34.9260000Z Waiting for a runner to pick up this job...
2026-07-08T08:51:34.9380000Z Job is about to start running on the hosted runner: GitHub Actions 1000001162
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.