# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) is returning 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is returning 3. This indicates a bug in the implementation — most likely the denominator is off by one (e.g., dividing by `arr.length + 1` or using integer/floor division incorrectly), or the sum calculation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion in `src/math.test.ts:6` is mathematically correct (mean of [2,4,6] is 4), so the bug is in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:56.6694700Z ##[endgroup]
2026-07-08T08:40:56.7827854Z 
2026-07-08T08:40:56.7828703Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:40:56.7829359Z > tsc --noEmit
2026-07-08T08:40:56.7829933Z 
﻿2026-07-08T08:40:57.6137114Z ##[group]Run npm run test
2026-07-08T08:40:57.6137689Z [36;1mnpm run test[0m
2026-07-08T08:40:57.6170883Z shell: /usr/bin/bash -e {0}
2026-07-08T08:40:57.6171153Z ##[endgroup]
2026-07-08T08:40:57.7274994Z 
2026-07-08T08:40:57.7275704Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:40:57.7276140Z > vitest run
2026-07-08T08:40:57.7276290Z 
2026-07-08T08:40:58.0621096Z 
2026-07-08T08:40:58.0625802Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:40:58.0650675Z 
2026-07-08T08:40:58.3764994Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:40:58.3766762Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:40:58.3767730Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:58.3868399Z 
2026-07-08T08:40:58.3875734Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:40:58.3876675Z 
2026-07-08T08:40:58.3880490Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:40:58.3882177Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:58.3882849Z 
2026-07-08T08:40:58.3883078Z - Expected
2026-07-08T08:40:58.3883487Z + Received
2026-07-08T08:40:58.3883689Z 
2026-07-08T08:40:58.3884044Z - 4
2026-07-08T08:40:58.3884416Z + 3
2026-07-08T08:40:58.3885102Z 
2026-07-08T08:40:58.3885923Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:40:58.4029120Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:58.4030924Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:58.4032865Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:40:58.4034404Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:40:58.4035190Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:40:58.4035790Z     [90m  8| [39m
2026-07-08T08:40:58.4036049Z 
2026-07-08T08:40:58.4036643Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:40:58.4037044Z 
2026-07-08T08:40:58.4037087Z 
2026-07-08T08:40:58.4069283Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:40:58.4092587Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:40:58.4093855Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:40:58.4094660Z [2m   Start at [22m 08:40:58
2026-07-08T08:40:58.4095931Z [2m   Duration [22m 324ms[2m (transform 37ms, setup 0ms, collect 29ms, tests 8ms, environment 0ms, prepare 77ms)[22m
2026-07-08T08:40:58.4096875Z 
2026-07-08T08:40:58.4265597Z ##[error]Process completed with exit code 1.
2026-07-08T08:40:46.5190000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:40:46.5130000Z Requested labels: ubuntu-latest
2026-07-08T08:40:46.5130000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:40:46.5130000Z Waiting for a runner to pick up this job...
2026-07-08T08:40:46.5100000Z Evaluating test.if
2026-07-08T08:40:46.5100000Z Evaluating: success()
2026-07-08T08:40:46.5100000Z Result: true
2026-07-08T08:40:46.5190000Z Job is about to start running on the hosted runner: GitHub Actions 1000001095
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.