# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely the sum is being divided by `(n+1)` instead of `n`, or the sum is computed incorrectly (e.g., off-by-one in a loop or incorrect accumulation logic).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (mean of [2,4,6] is indeed 4), so the defect is in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:23.5026091Z ##[endgroup]
2026-07-14T15:02:23.5922525Z 
2026-07-14T15:02:23.5923573Z > stagecraft-fixtest@1.0.0 type-check
2026-07-14T15:02:23.5924478Z > tsc --noEmit
2026-07-14T15:02:23.5925279Z 
﻿2026-07-14T15:02:24.2497476Z ##[group]Run npm run test
2026-07-14T15:02:24.2497816Z [36;1mnpm run test[0m
2026-07-14T15:02:24.2516387Z shell: /usr/bin/bash -e {0}
2026-07-14T15:02:24.2516796Z ##[endgroup]
2026-07-14T15:02:24.3427541Z 
2026-07-14T15:02:24.3428216Z > stagecraft-fixtest@1.0.0 test
2026-07-14T15:02:24.3428681Z > vitest run
2026-07-14T15:02:24.3428985Z 
2026-07-14T15:02:24.6077792Z 
2026-07-14T15:02:24.6081212Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-14T15:02:24.6081873Z 
2026-07-14T15:02:24.8579093Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-14T15:02:24.8580341Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-14T15:02:24.8581223Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-14T15:02:24.8652471Z 
2026-07-14T15:02:24.8658736Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-14T15:02:24.8659493Z 
2026-07-14T15:02:24.8660491Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-14T15:02:24.8662300Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-14T15:02:24.8663111Z 
2026-07-14T15:02:24.8663487Z - Expected
2026-07-14T15:02:24.8663888Z + Received
2026-07-14T15:02:24.8664046Z 
2026-07-14T15:02:24.8664326Z - 4
2026-07-14T15:02:24.8664691Z + 3
2026-07-14T15:02:24.8664886Z 
2026-07-14T15:02:24.8665552Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-14T15:02:24.8782635Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-14T15:02:24.8783883Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-14T15:02:24.8785539Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-14T15:02:24.8786500Z 
2026-07-14T15:02:24.8810910Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-14T15:02:24.8820585Z     [90m   | [39m                               [31m^[39m
2026-07-14T15:02:24.8821533Z     [90m  7| [39m  })[33m;[39m
2026-07-14T15:02:24.8822084Z     [90m  8| [39m
2026-07-14T15:02:24.8822387Z 
2026-07-14T15:02:24.8822825Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-14T15:02:24.8823191Z 
2026-07-14T15:02:24.8823541Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-14T15:02:24.8824303Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-14T15:02:24.8824932Z [2m   Start at [22m 15:02:24
2026-07-14T15:02:24.8825690Z [2m   Duration [22m 257ms[2m (transform 35ms, setup 0ms, collect 27ms, tests 7ms, environment 0ms, prepare 81ms)[22m
2026-07-14T15:02:24.8826472Z 
2026-07-14T15:02:24.8969034Z ##[error]Process completed with exit code 1.
2026-07-14T15:02:12.1080000Z Evaluating test.if
2026-07-14T15:02:12.1080000Z Evaluating: success()
2026-07-14T15:02:12.1080000Z Result: true
2026-07-14T15:02:12.1150000Z Requested labels: ubuntu-latest
2026-07-14T15:02:12.1150000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-14T15:02:12.1150000Z Waiting for a runner to pick up this job...
2026-07-14T15:02:12.1320000Z Job is about to start running on the hosted runner: GitHub Actions 1000001448
2026-07-14T15:02:12.1320000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.