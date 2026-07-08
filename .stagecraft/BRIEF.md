# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing `sum / count` using integer division that truncates, or it is dividing by the wrong value (e.g., dividing by the array length + 1, or summing incorrectly). The test at `src/math.test.ts:6` asserts `average([2, 4, 6])` should equal `4`, but the implementation produces `3` (which is the median, not the mean, of that list — suggesting the function may be returning the middle element rather than the arithmetic mean, or there is an off-by-one in the divisor: `(2+4+6)/4 = 3`).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by incorrect application logic in the `average` function (returning 3 instead of 4 for input [2,4,6]), which requires fixing the source code implementation, not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:17.5577891Z ##[endgroup]
2026-07-08T08:43:17.6710759Z 
2026-07-08T08:43:17.6711569Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:43:17.6712203Z > tsc --noEmit
2026-07-08T08:43:17.6712347Z 
﻿2026-07-08T08:43:18.4854279Z ##[group]Run npm run test
2026-07-08T08:43:18.4854801Z [36;1mnpm run test[0m
2026-07-08T08:43:18.4890108Z shell: /usr/bin/bash -e {0}
2026-07-08T08:43:18.4890378Z ##[endgroup]
2026-07-08T08:43:18.5985544Z 
2026-07-08T08:43:18.5986306Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:43:18.5986838Z > vitest run
2026-07-08T08:43:18.5987033Z 
2026-07-08T08:43:18.9219575Z 
2026-07-08T08:43:18.9223508Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:43:18.9224272Z 
2026-07-08T08:43:19.2362130Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:43:19.2363809Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:43:19.2364909Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:19.2457697Z 
2026-07-08T08:43:19.2464255Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:43:19.2465022Z 
2026-07-08T08:43:19.2467799Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:43:19.2469836Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:19.2470373Z 
2026-07-08T08:43:19.2470533Z - Expected
2026-07-08T08:43:19.2470940Z + Received
2026-07-08T08:43:19.2471132Z 
2026-07-08T08:43:19.2471452Z - 4
2026-07-08T08:43:19.2471769Z + 3
2026-07-08T08:43:19.2472011Z 
2026-07-08T08:43:19.2472794Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:43:19.2615640Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:19.2616936Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:19.2618532Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:43:19.2619854Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:43:19.2620424Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:43:19.2620885Z     [90m  8| [39m
2026-07-08T08:43:19.2621089Z 
2026-07-08T08:43:19.2622030Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:43:19.2622390Z 
2026-07-08T08:43:19.2622422Z 
2026-07-08T08:43:19.2651912Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:43:19.2663444Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:43:19.2664272Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:43:19.2664868Z [2m   Start at [22m 08:43:18
2026-07-08T08:43:19.2665624Z [2m   Duration [22m 323ms[2m (transform 37ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 72ms)[22m
2026-07-08T08:43:19.2666102Z 
2026-07-08T08:43:19.2851049Z ##[error]Process completed with exit code 1.
2026-07-08T08:43:08.4010000Z Requested labels: ubuntu-latest
2026-07-08T08:43:08.4010000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:43:08.4010000Z Waiting for a runner to pick up this job...
2026-07-08T08:43:08.4150000Z Job is about to start running on the hosted runner: GitHub Actions 1000001111
2026-07-08T08:43:08.3990000Z Evaluating test.if
2026-07-08T08:43:08.3990000Z Evaluating: success()
2026-07-08T08:43:08.3990000Z Result: true
2026-07-08T08:43:08.4150000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.