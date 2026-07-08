# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) is returning 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is producing 3, indicating a bug in the `average` implementation — most likely summing the values correctly but dividing by the wrong denominator (e.g., using array length + 1, or using integer division that truncates incorrectly, or a fencepost error in the sum/count logic).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the application's `average` function implementation returning the wrong value, not in any workflow or CI configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
55.5236665Z ##[endgroup]
2026-07-08T08:36:55.6343859Z 
2026-07-08T08:36:55.6344669Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:36:55.6345188Z > tsc --noEmit
2026-07-08T08:36:55.6345852Z 
﻿2026-07-08T08:36:56.4854069Z ##[group]Run npm run test
2026-07-08T08:36:56.4854374Z [36;1mnpm run test[0m
2026-07-08T08:36:56.4887058Z shell: /usr/bin/bash -e {0}
2026-07-08T08:36:56.4887324Z ##[endgroup]
2026-07-08T08:36:56.6023257Z 
2026-07-08T08:36:56.6024004Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:36:56.6024489Z > vitest run
2026-07-08T08:36:56.6024670Z 
2026-07-08T08:36:56.9509396Z 
2026-07-08T08:36:56.9530870Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:36:56.9531641Z 
2026-07-08T08:36:57.3256420Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:36:57.3258158Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:36:57.3259504Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:36:57.3360285Z 
2026-07-08T08:36:57.3368049Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:36:57.3368744Z 
2026-07-08T08:36:57.3371777Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:36:57.3374057Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:36:57.3374785Z 
2026-07-08T08:36:57.3375110Z - Expected
2026-07-08T08:36:57.3375475Z + Received
2026-07-08T08:36:57.3375724Z 
2026-07-08T08:36:57.3375948Z - 4
2026-07-08T08:36:57.3376256Z + 3
2026-07-08T08:36:57.3376528Z 
2026-07-08T08:36:57.3377008Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:36:57.3525930Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:36:57.3527870Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:36:57.3528742Z 
2026-07-08T08:36:57.3530338Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:36:57.3531840Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:36:57.3532591Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:36:57.3533162Z     [90m  8| [39m
2026-07-08T08:36:57.3533423Z 
2026-07-08T08:36:57.3533930Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:36:57.3534326Z 
2026-07-08T08:36:57.3567680Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:36:57.3584058Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:36:57.3585471Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:36:57.3586496Z [2m   Start at [22m 08:36:56
2026-07-08T08:36:57.3587866Z [2m   Duration [22m 385ms[2m (transform 66ms, setup 0ms, collect 36ms, tests 9ms, environment 0ms, prepare 142ms)[22m
2026-07-08T08:36:57.3588730Z 
2026-07-08T08:36:57.3789220Z ##[error]Process completed with exit code 1.
2026-07-08T08:36:42.0130000Z Requested labels: ubuntu-latest
2026-07-08T08:36:42.0130000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:36:42.0130000Z Waiting for a runner to pick up this job...
2026-07-08T08:36:42.0100000Z Evaluating test.if
2026-07-08T08:36:42.0100000Z Evaluating: success()
2026-07-08T08:36:42.0100000Z Result: true
2026-07-08T08:36:42.0180000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:36:42.0190000Z Job is about to start running on the hosted runner: GitHub Actions 1000001071
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.