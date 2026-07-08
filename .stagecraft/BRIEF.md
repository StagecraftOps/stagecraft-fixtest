# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by the wrong denominator (e.g., dividing by `array.length + 1`, or using a median/off-by-one approach instead of a true arithmetic mean).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the implementation of the `average` function in application source code, not in any workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:55.9864682Z ##[endgroup]
2026-07-08T08:41:56.0967510Z 
2026-07-08T08:41:56.0968264Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:41:56.0968740Z > tsc --noEmit
2026-07-08T08:41:56.0968899Z 
﻿2026-07-08T08:41:56.9923691Z ##[group]Run npm run test
2026-07-08T08:41:56.9924026Z [36;1mnpm run test[0m
2026-07-08T08:41:56.9956282Z shell: /usr/bin/bash -e {0}
2026-07-08T08:41:56.9956556Z ##[endgroup]
2026-07-08T08:41:57.1041758Z 
2026-07-08T08:41:57.1042782Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:41:57.1043437Z > vitest run
2026-07-08T08:41:57.1043699Z 
2026-07-08T08:41:57.4229746Z 
2026-07-08T08:41:57.4233686Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:41:57.4234711Z 
2026-07-08T08:41:57.7629124Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:41:57.7630671Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:41:57.7631655Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:57.7724893Z 
2026-07-08T08:41:57.7731369Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:41:57.7732071Z 
2026-07-08T08:41:57.7734473Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:41:57.7736190Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:57.7736764Z 
2026-07-08T08:41:57.7736939Z - Expected
2026-07-08T08:41:57.7737407Z + Received
2026-07-08T08:41:57.7737736Z 
2026-07-08T08:41:57.7737886Z - 4
2026-07-08T08:41:57.7738188Z + 3
2026-07-08T08:41:57.7738353Z 
2026-07-08T08:41:57.7738853Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:41:57.7879935Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:57.7881883Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:57.7883965Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:41:57.7885745Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:41:57.7886188Z 
2026-07-08T08:41:57.7886618Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:41:57.7917211Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:41:57.7927906Z     [90m  8| [39m
2026-07-08T08:41:57.7928201Z 
2026-07-08T08:41:57.7928823Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:41:57.7929248Z 
2026-07-08T08:41:57.7929915Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:41:57.7931766Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:41:57.7932815Z [2m   Start at [22m 08:41:57
2026-07-08T08:41:57.7934247Z [2m   Duration [22m 349ms[2m (transform 37ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 69ms)[22m
2026-07-08T08:41:57.7935141Z 
2026-07-08T08:41:57.8113932Z ##[error]Process completed with exit code 1.
2026-07-08T08:41:42.2560000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:41:42.2340000Z Requested labels: ubuntu-latest
2026-07-08T08:41:42.2340000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:41:42.2340000Z Waiting for a runner to pick up this job...
2026-07-08T08:41:42.2310000Z Evaluating test.if
2026-07-08T08:41:42.2310000Z Evaluating: success()
2026-07-08T08:41:42.2310000Z Result: true
2026-07-08T08:41:42.2560000Z Job is about to start running on the hosted runner: GitHub Actions 1000001101
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.