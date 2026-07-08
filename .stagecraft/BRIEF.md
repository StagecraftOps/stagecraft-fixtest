# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation has a bug — most likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` or `array.length - 1` instead of `array.length`), or an incorrect summation.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a bug in the `average` function's source implementation (or the test fixture), not by any workflow misconfiguration — the CI pipeline itself is correctly set up.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:02.2150145Z ##[endgroup]
2026-07-08T08:26:02.3284555Z 
2026-07-08T08:26:02.3285290Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:26:02.3285939Z > tsc --noEmit
2026-07-08T08:26:02.3286193Z 
﻿2026-07-08T08:26:03.1845412Z ##[group]Run npm run test
2026-07-08T08:26:03.1845935Z [36;1mnpm run test[0m
2026-07-08T08:26:03.1878209Z shell: /usr/bin/bash -e {0}
2026-07-08T08:26:03.1878467Z ##[endgroup]
2026-07-08T08:26:03.3033396Z 
2026-07-08T08:26:03.3033864Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:26:03.3034235Z > vitest run
2026-07-08T08:26:03.3034428Z 
2026-07-08T08:26:03.6458910Z 
2026-07-08T08:26:03.6462809Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:26:03.6463816Z 
2026-07-08T08:26:04.0065247Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:26:04.0066628Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:26:04.0067677Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:04.0165595Z 
2026-07-08T08:26:04.0173314Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:26:04.0174429Z 
2026-07-08T08:26:04.0177408Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:26:04.0179605Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:04.0180560Z 
2026-07-08T08:26:04.0181047Z - Expected
2026-07-08T08:26:04.0181465Z + Received
2026-07-08T08:26:04.0181667Z 
2026-07-08T08:26:04.0181813Z - 4
2026-07-08T08:26:04.0182123Z + 3
2026-07-08T08:26:04.0182284Z 
2026-07-08T08:26:04.0182796Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:26:04.0326743Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:04.0328510Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:04.0330443Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:26:04.0331938Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:26:04.0332680Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:26:04.0333293Z     [90m  8| [39m
2026-07-08T08:26:04.0333553Z 
2026-07-08T08:26:04.0334068Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:26:04.0334476Z 
2026-07-08T08:26:04.0334499Z 
2026-07-08T08:26:04.0364908Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:26:04.0373990Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:26:04.0374799Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:26:04.0375362Z [2m   Start at [22m 08:26:03
2026-07-08T08:26:04.0376118Z [2m   Duration [22m 370ms[2m (transform 45ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 94ms)[22m
2026-07-08T08:26:04.0376616Z 
2026-07-08T08:26:04.0579127Z ##[error]Process completed with exit code 1.
2026-07-08T08:25:53.1790000Z Requested labels: ubuntu-latest
2026-07-08T08:25:53.1790000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:25:53.1790000Z Waiting for a runner to pick up this job...
2026-07-08T08:25:53.1770000Z Evaluating test.if
2026-07-08T08:25:53.1770000Z Evaluating: success()
2026-07-08T08:25:53.1770000Z Result: true
2026-07-08T08:25:53.4810000Z Job is about to start running on the hosted runner: GitHub Actions 1000001007
2026-07-08T08:25:53.4810000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.