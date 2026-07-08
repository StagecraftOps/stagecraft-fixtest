# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect value. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by one more than the actual number of elements (e.g., dividing by `arr.length + 1` or using a fencepost error), or it is computing a median/wrong aggregation instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the implementation of the `average` function in the application's source code, not in any workflow or pipeline configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:11.5119301Z ##[endgroup]
2026-07-08T08:50:11.6191965Z 
2026-07-08T08:50:11.6192847Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:50:11.6193545Z > tsc --noEmit
2026-07-08T08:50:11.6193828Z 
﻿2026-07-08T08:50:12.4755799Z ##[group]Run npm run test
2026-07-08T08:50:12.4756349Z [36;1mnpm run test[0m
2026-07-08T08:50:12.4789557Z shell: /usr/bin/bash -e {0}
2026-07-08T08:50:12.4789832Z ##[endgroup]
2026-07-08T08:50:12.5875524Z 
2026-07-08T08:50:12.5876074Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:50:12.5876710Z > vitest run
2026-07-08T08:50:12.5876874Z 
2026-07-08T08:50:12.9213657Z 
2026-07-08T08:50:12.9217109Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:50:12.9218056Z 
2026-07-08T08:50:13.2291401Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:50:13.2292918Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:50:13.2293792Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:13.2386691Z 
2026-07-08T08:50:13.2393704Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:50:13.2394734Z 
2026-07-08T08:50:13.2396863Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:50:13.2399057Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:13.2399762Z 
2026-07-08T08:50:13.2399968Z - Expected
2026-07-08T08:50:13.2400352Z + Received
2026-07-08T08:50:13.2400548Z 
2026-07-08T08:50:13.2400718Z - 4
2026-07-08T08:50:13.2401031Z + 3
2026-07-08T08:50:13.2401205Z 
2026-07-08T08:50:13.2401782Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:50:13.2549465Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:13.2550960Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:13.2553153Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:50:13.2554566Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:50:13.2555269Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:50:13.2555864Z     [90m  8| [39m
2026-07-08T08:50:13.2556119Z 
2026-07-08T08:50:13.2556686Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:50:13.2557086Z 
2026-07-08T08:50:13.2557377Z 
2026-07-08T08:50:13.2594302Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:50:13.2607301Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:50:13.2609871Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:50:13.2614519Z [2m   Start at [22m 08:50:12
2026-07-08T08:50:13.2615730Z [2m   Duration [22m 317ms[2m (transform 36ms, setup 0ms, collect 29ms, tests 8ms, environment 0ms, prepare 71ms)[22m
2026-07-08T08:50:13.2616406Z 
2026-07-08T08:50:13.2798723Z ##[error]Process completed with exit code 1.
2026-07-08T08:50:03.1540000Z Evaluating test.if
2026-07-08T08:50:03.1540000Z Evaluating: success()
2026-07-08T08:50:03.1540000Z Result: true
2026-07-08T08:50:03.1570000Z Requested labels: ubuntu-latest
2026-07-08T08:50:03.1570000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:50:03.1570000Z Waiting for a runner to pick up this job...
2026-07-08T08:50:03.1660000Z Job is about to start running on the hosted runner: GitHub Actions 1000001153
2026-07-08T08:50:03.1650000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.