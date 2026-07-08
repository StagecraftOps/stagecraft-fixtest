# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — likely the function is computing the sum divided by one more than the actual number of elements (e.g., `sum / (n + 1)` or dividing by a hard-coded wrong value), or it is using integer/floor division incorrectly, or there is an off-by-one error in the denominator.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), but the function returns 3, meaning the bug is in the application's `average` implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:53.9787432Z ##[endgroup]
2026-07-08T08:33:54.0889788Z 
2026-07-08T08:33:54.0890407Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:33:54.0891117Z > tsc --noEmit
2026-07-08T08:33:54.0891378Z 
﻿2026-07-08T08:33:54.9111315Z ##[group]Run npm run test
2026-07-08T08:33:54.9112203Z [36;1mnpm run test[0m
2026-07-08T08:33:54.9144651Z shell: /usr/bin/bash -e {0}
2026-07-08T08:33:54.9144933Z ##[endgroup]
2026-07-08T08:33:55.0216906Z 
2026-07-08T08:33:55.0217634Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:33:55.0218198Z > vitest run
2026-07-08T08:33:55.0218428Z 
2026-07-08T08:33:55.3431337Z 
2026-07-08T08:33:55.3435273Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:33:55.3437425Z 
2026-07-08T08:33:55.6640167Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:33:55.6641463Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:33:55.6642423Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:55.6736657Z 
2026-07-08T08:33:55.6743163Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:33:55.6743756Z 
2026-07-08T08:33:55.6746823Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:33:55.6748448Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:55.6749175Z 
2026-07-08T08:33:55.6749603Z - Expected
2026-07-08T08:33:55.6749975Z + Received
2026-07-08T08:33:55.6750353Z 
2026-07-08T08:33:55.6750726Z - 4
2026-07-08T08:33:55.6751079Z + 3
2026-07-08T08:33:55.6751264Z 
2026-07-08T08:33:55.6752207Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:33:55.6896464Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:55.6898108Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:55.6900223Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:33:55.6902090Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:33:55.6902972Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:33:55.6903672Z     [90m  8| [39m
2026-07-08T08:33:55.6904009Z 
2026-07-08T08:33:55.6905049Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:33:55.6905597Z 
2026-07-08T08:33:55.6905898Z 
2026-07-08T08:33:55.6937682Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:33:55.6952164Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:33:55.6953650Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:33:55.6954780Z [2m   Start at [22m 08:33:55
2026-07-08T08:33:55.6956279Z [2m   Duration [22m 330ms[2m (transform 35ms, setup 0ms, collect 29ms, tests 8ms, environment 0ms, prepare 89ms)[22m
2026-07-08T08:33:55.6957193Z 
2026-07-08T08:33:55.7137261Z ##[error]Process completed with exit code 1.
2026-07-08T08:33:45.5680000Z Job is about to start running on the hosted runner: GitHub Actions 1000001059
2026-07-08T08:33:45.5720000Z Requested labels: ubuntu-latest
2026-07-08T08:33:45.5720000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:33:45.5720000Z Waiting for a runner to pick up this job...
2026-07-08T08:33:45.5680000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:33:45.5680000Z Evaluating test.if
2026-07-08T08:33:45.5680000Z Evaluating: success()
2026-07-08T08:33:45.5680000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.