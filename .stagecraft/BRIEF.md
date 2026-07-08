# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when given inputs [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is returning 3, indicating a bug in the implementation — likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` or using integer/floor division incorrectly) or a summation bug.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean = 4), so the bug lies in the `average` function's source code implementation returning the wrong value (3), not in any workflow or pipeline configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:58.3414872Z ##[endgroup]
2026-07-08T08:44:58.4560746Z 
2026-07-08T08:44:59.2972337Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:44:59.2972816Z > tsc --noEmit
2026-07-08T08:44:59.2972972Z 
﻿2026-07-08T08:44:59.2999261Z ##[group]Run npm run test
2026-07-08T08:44:59.2999805Z [36;1mnpm run test[0m
2026-07-08T08:44:59.3032727Z shell: /usr/bin/bash -e {0}
2026-07-08T08:44:59.3033007Z ##[endgroup]
2026-07-08T08:44:59.4143334Z 
2026-07-08T08:44:59.4144118Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:44:59.4144786Z > vitest run
2026-07-08T08:44:59.4145046Z 
2026-07-08T08:44:59.7489372Z 
2026-07-08T08:44:59.7513360Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:44:59.7514479Z 
2026-07-08T08:45:00.0767301Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:45:00.0769652Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:45:00.0770679Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:00.0870620Z 
2026-07-08T08:45:00.0878974Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:45:00.0879791Z 
2026-07-08T08:45:00.0882515Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:45:00.0884801Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:00.0885523Z 
2026-07-08T08:45:00.0885688Z - Expected
2026-07-08T08:45:00.0886069Z + Received
2026-07-08T08:45:00.0886259Z 
2026-07-08T08:45:00.0886393Z - 4
2026-07-08T08:45:00.0886708Z + 3
2026-07-08T08:45:00.0886881Z 
2026-07-08T08:45:00.0887726Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:45:00.1039193Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:00.1040967Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:00.1043458Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:45:00.1045231Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:45:00.1046193Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:45:00.1046935Z     [90m  8| [39m
2026-07-08T08:45:00.1047353Z 
2026-07-08T08:45:00.1048247Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:45:00.1048731Z 
2026-07-08T08:45:00.1049160Z 
2026-07-08T08:45:00.1086365Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:45:00.1096293Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:45:00.1097565Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:45:00.1098654Z [2m   Start at [22m 08:44:59
2026-07-08T08:45:00.1099965Z [2m   Duration [22m 338ms[2m (transform 44ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:45:00.1100625Z 
2026-07-08T08:45:00.1296945Z ##[error]Process completed with exit code 1.
2026-07-08T08:44:46.2490000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:44:46.2430000Z Evaluating test.if
2026-07-08T08:44:46.2430000Z Evaluating: success()
2026-07-08T08:44:46.2430000Z Result: true
2026-07-08T08:44:46.2450000Z Requested labels: ubuntu-latest
2026-07-08T08:44:46.2450000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:44:46.2450000Z Waiting for a runner to pick up this job...
2026-07-08T08:44:46.2500000Z Job is about to start running on the hosted runner: GitHub Actions 1000001123
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.