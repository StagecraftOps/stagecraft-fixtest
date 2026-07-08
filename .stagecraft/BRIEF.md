# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) has a bug: when called with `[2, 4, 6]` it returns `3` instead of the correct mean `4`. This indicates the implementation is likely summing the values and dividing by the wrong denominator (e.g., dividing by the length + 1, or using integer division incorrectly), or is off-by-one in its summation logic. The test at `src/math.test.ts:6` correctly expects `4` (the arithmetic mean of 2, 4, 6), but the function produces `3`.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a bug in the application's `average` function returning the wrong value (3 instead of 4), which can only be fixed by correcting the source code implementation, not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
12.2861619Z ##[endgroup]
2026-07-08T08:40:12.4113601Z 
2026-07-08T08:40:12.4114818Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:40:12.4115452Z > tsc --noEmit
2026-07-08T08:40:12.4115673Z 
﻿2026-07-08T08:40:13.4273974Z ##[group]Run npm run test
2026-07-08T08:40:13.4274580Z [36;1mnpm run test[0m
2026-07-08T08:40:13.4311144Z shell: /usr/bin/bash -e {0}
2026-07-08T08:40:13.4311440Z ##[endgroup]
2026-07-08T08:40:13.5527478Z 
2026-07-08T08:40:13.5528114Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:40:13.5528632Z > vitest run
2026-07-08T08:40:13.5528830Z 
2026-07-08T08:40:13.9267057Z 
2026-07-08T08:40:13.9287608Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:40:13.9316682Z 
2026-07-08T08:40:14.3318522Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:40:14.3338208Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:40:14.3339495Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:14.3428729Z 
2026-07-08T08:40:14.3436360Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:40:14.3437173Z 
2026-07-08T08:40:14.3439428Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:40:14.3441533Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:14.3442280Z 
2026-07-08T08:40:14.3442705Z - Expected
2026-07-08T08:40:14.3443237Z + Received
2026-07-08T08:40:14.3443587Z 
2026-07-08T08:40:14.3443902Z - 4
2026-07-08T08:40:14.3444404Z + 3
2026-07-08T08:40:14.3444749Z 
2026-07-08T08:40:14.3445359Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:40:14.3658880Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:14.3660505Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:14.3661170Z 
2026-07-08T08:40:14.3662475Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:40:14.3664012Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:40:14.3664807Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:40:14.3665445Z     [90m  8| [39m
2026-07-08T08:40:14.3665894Z 
2026-07-08T08:40:14.3666742Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:40:14.3667296Z 
2026-07-08T08:40:14.3718330Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:40:14.3731305Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:40:14.3732828Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:40:14.3733874Z [2m   Start at [22m 08:40:13
2026-07-08T08:40:14.3735390Z [2m   Duration [22m 417ms[2m (transform 40ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 104ms)[22m
2026-07-08T08:40:14.3736911Z 
2026-07-08T08:40:14.3937960Z ##[error]Process completed with exit code 1.
2026-07-08T08:40:03.2640000Z Evaluating test.if
2026-07-08T08:40:03.2640000Z Evaluating: success()
2026-07-08T08:40:03.2640000Z Result: true
2026-07-08T08:40:03.6010000Z Requested labels: ubuntu-latest
2026-07-08T08:40:03.6010000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:40:03.6010000Z Waiting for a runner to pick up this job...
2026-07-08T08:40:03.6130000Z Job is about to start running on the hosted runner: GitHub Actions 1000001092
2026-07-08T08:40:03.6130000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.