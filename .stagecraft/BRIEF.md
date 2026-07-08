# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect value. The test calls `average([2, 4, 6])` and expects the mean `4`, but the function returns `3`. This indicates a bug in the implementation — likely summing the values correctly (2+4+6=12) but dividing by the wrong count (e.g., dividing by 4 instead of 3, or using integer/floor division incorrectly, or possibly summing incorrectly such as 2+4+6=9 divided by 3=3, suggesting the sum itself may be wrong — e.g. off-by-one in array iteration).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine incorrect test assertion result (received 3, expected 4) caused by a logic bug in the `average` function's source implementation, not by any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:55.9722382Z ##[endgroup]
2026-07-08T08:46:56.0402092Z 
2026-07-08T08:46:56.0402742Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:46:56.0403077Z > tsc --noEmit
2026-07-08T08:46:56.0403657Z 
﻿2026-07-08T08:46:56.5478606Z ##[group]Run npm run test
2026-07-08T08:46:56.5478790Z [36;1mnpm run test[0m
2026-07-08T08:46:56.5505124Z shell: /usr/bin/bash -e {0}
2026-07-08T08:46:56.5505260Z ##[endgroup]
2026-07-08T08:46:56.6186184Z 
2026-07-08T08:46:56.6186717Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:46:56.6187009Z > vitest run
2026-07-08T08:46:56.6187086Z 
2026-07-08T08:46:56.8135772Z 
2026-07-08T08:46:56.8137577Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:46:56.8137974Z 
2026-07-08T08:46:57.0184539Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 5[2mms[22m[39m
2026-07-08T08:46:57.0185240Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:46:57.0185595Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:57.0261536Z 
2026-07-08T08:46:57.0266429Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:46:57.0266732Z 
2026-07-08T08:46:57.0267977Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:46:57.0269426Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:57.0269799Z 
2026-07-08T08:46:57.0269897Z - Expected
2026-07-08T08:46:57.0270082Z + Received
2026-07-08T08:46:57.0270184Z 
2026-07-08T08:46:57.0270265Z - 4
2026-07-08T08:46:57.0270423Z + 3
2026-07-08T08:46:57.0270509Z 
2026-07-08T08:46:57.0270951Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:46:57.0395084Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:57.0395776Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:57.0396600Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:46:57.0397302Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:46:57.0397625Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:46:57.0397866Z     [90m  8| [39m
2026-07-08T08:46:57.0397982Z 
2026-07-08T08:46:57.0398389Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:46:57.0398572Z 
2026-07-08T08:46:57.0398586Z 
2026-07-08T08:46:57.0416961Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:46:57.0430205Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:46:57.0430902Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:46:57.0431495Z [2m   Start at [22m 08:46:56
2026-07-08T08:46:57.0432251Z [2m   Duration [22m 212ms[2m (transform 23ms, setup 0ms, collect 19ms, tests 5ms, environment 0ms, prepare 36ms)[22m
2026-07-08T08:46:57.0432625Z 
2026-07-08T08:46:57.0580646Z ##[error]Process completed with exit code 1.
2026-07-08T08:46:44.7750000Z Job is about to start running on the hosted runner: GitHub Actions 1000001137
2026-07-08T08:46:44.7740000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:46:44.7590000Z Requested labels: ubuntu-latest
2026-07-08T08:46:44.7590000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:46:44.7590000Z Waiting for a runner to pick up this job...
2026-07-08T08:46:44.7550000Z Evaluating test.if
2026-07-08T08:46:44.7550000Z Evaluating: success()
2026-07-08T08:46:44.7550000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.