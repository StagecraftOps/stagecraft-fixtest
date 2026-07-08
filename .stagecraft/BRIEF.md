# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the average/mean calculation logic — most likely the function is dividing by the wrong value (e.g., dividing by `array.length + 1` instead of `array.length`, or using integer/floor division, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is indeed 4), so the bug is in the application's `average` implementation returning `3` instead of `4`, which requires fixing the source code rather than the workflow.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:25.2515188Z ##[endgroup]
2026-07-08T08:34:25.3643156Z 
2026-07-08T08:34:25.3643954Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:34:25.3644654Z > tsc --noEmit
2026-07-08T08:34:25.3644938Z 
﻿2026-07-08T08:34:26.4346193Z ##[group]Run npm run test
2026-07-08T08:34:26.4346938Z [36;1mnpm run test[0m
2026-07-08T08:34:26.4390502Z shell: /usr/bin/bash -e {0}
2026-07-08T08:34:26.4391107Z ##[endgroup]
2026-07-08T08:34:26.5601534Z 
2026-07-08T08:34:26.5602729Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:34:26.5603269Z > vitest run
2026-07-08T08:34:26.5603465Z 
2026-07-08T08:34:26.9443965Z 
2026-07-08T08:34:26.9473141Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:34:26.9473940Z 
2026-07-08T08:34:27.3280564Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:34:27.3282780Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:34:27.3283966Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:34:27.3412601Z 
2026-07-08T08:34:27.3421339Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:34:27.3442297Z 
2026-07-08T08:34:27.3472477Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:34:27.3474113Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:34:27.3474894Z 
2026-07-08T08:34:27.3475200Z - Expected
2026-07-08T08:34:27.3475722Z + Received
2026-07-08T08:34:27.3476060Z 
2026-07-08T08:34:27.3476375Z - 4
2026-07-08T08:34:27.3476809Z + 3
2026-07-08T08:34:27.3477115Z 
2026-07-08T08:34:27.3477723Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:34:27.3686485Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:34:27.3688072Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:34:27.3690156Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:34:27.3691566Z 
2026-07-08T08:34:27.3692156Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:34:27.3720387Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:34:27.3731816Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:34:27.3732825Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:34:27.3734367Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:34:27.3735414Z [2m   Start at [22m 08:34:26
2026-07-08T08:34:27.3737045Z [2m   Duration [22m 397ms[2m (transform 51ms, setup 0ms, collect 45ms, tests 9ms, environment 0ms, prepare 92ms)[22m
2026-07-08T08:34:27.3737813Z 
2026-07-08T08:34:27.3761897Z     [90m  8| [39m
2026-07-08T08:34:27.3783275Z 
2026-07-08T08:34:27.3784626Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:34:27.3785657Z 
2026-07-08T08:34:27.3948231Z ##[error]Process completed with exit code 1.
2026-07-08T08:34:16.7350000Z Evaluating test.if
2026-07-08T08:34:16.7350000Z Evaluating: success()
2026-07-08T08:34:16.7350000Z Result: true
2026-07-08T08:34:16.7380000Z Requested labels: ubuntu-latest
2026-07-08T08:34:16.7380000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:34:16.7380000Z Waiting for a runner to pick up this job...
2026-07-08T08:34:16.7460000Z Job is about to start running on the hosted runner: GitHub Actions 1000001061
2026-07-08T08:34:16.7460000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.