# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by the wrong count, or is using integer division incorrectly. The correct mean of [2, 4, 6] is (2+4+6)/3 = 12/3 = 4, but the function produces 3, suggesting it may be summing only the first two elements (2+4=6, 6/2=3) or has an off-by-one error in the denominator.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (mean of [2,4,6] is 4), so the bug lives in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
03.1413157Z ##[endgroup]
2026-07-08T08:51:03.2502003Z 
2026-07-08T08:51:03.2502511Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:51:03.2503099Z > tsc --noEmit
2026-07-08T08:51:03.2503331Z 
﻿2026-07-08T08:51:04.0905367Z ##[group]Run npm run test
2026-07-08T08:51:04.0906117Z [36;1mnpm run test[0m
2026-07-08T08:51:04.0949894Z shell: /usr/bin/bash -e {0}
2026-07-08T08:51:04.0950312Z ##[endgroup]
2026-07-08T08:51:04.2059819Z 
2026-07-08T08:51:04.2060436Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:51:04.2060811Z > vitest run
2026-07-08T08:51:04.2060949Z 
2026-07-08T08:51:04.5402417Z 
2026-07-08T08:51:04.5406367Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:51:04.5407330Z 
2026-07-08T08:51:04.8884844Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:51:04.8886602Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:51:04.8887459Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:04.8994356Z 
2026-07-08T08:51:04.9002409Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:51:04.9003014Z 
2026-07-08T08:51:04.9005813Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:51:04.9008217Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:04.9008918Z 
2026-07-08T08:51:04.9009123Z - Expected
2026-07-08T08:51:04.9009365Z + Received
2026-07-08T08:51:04.9009492Z 
2026-07-08T08:51:04.9009582Z - 4
2026-07-08T08:51:04.9009767Z + 3
2026-07-08T08:51:04.9009875Z 
2026-07-08T08:51:04.9010904Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:51:04.9206421Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:04.9208120Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:04.9210389Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:51:04.9212098Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:51:04.9212549Z 
2026-07-08T08:51:04.9213092Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:51:04.9213909Z     [90m  8| [39m
2026-07-08T08:51:04.9214314Z 
2026-07-08T08:51:04.9215159Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:51:04.9215586Z 
2026-07-08T08:51:04.9262334Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:51:04.9273064Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:51:04.9274584Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:51:04.9275623Z [2m   Start at [22m 08:51:04
2026-07-08T08:51:04.9277262Z [2m   Duration [22m 359ms[2m (transform 45ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 104ms)[22m
2026-07-08T08:51:04.9278226Z 
2026-07-08T08:51:04.9462296Z ##[error]Process completed with exit code 1.
2026-07-08T08:50:52.4560000Z Evaluating test.if
2026-07-08T08:50:52.4560000Z Evaluating: success()
2026-07-08T08:50:52.4560000Z Result: true
2026-07-08T08:50:52.4610000Z Requested labels: ubuntu-latest
2026-07-08T08:50:52.4610000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:50:52.4610000Z Waiting for a runner to pick up this job...
2026-07-08T08:50:52.9480000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:50:52.9440000Z Job is about to start running on the hosted runner: GitHub Actions 1000001159
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.