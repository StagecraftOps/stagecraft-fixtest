# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by a wrong count (e.g., dividing by 4 instead of 3, or summing incorrectly), or it is using a median/wrong algorithm rather than arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2+4+6 = 12/3 = 4), so the bug lies in the `average` function's source code returning 3 instead of 4, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:29.2333821Z ##[endgroup]
2026-07-08T08:21:29.3415343Z 
2026-07-08T08:21:29.3416380Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:21:29.3417113Z > tsc --noEmit
2026-07-08T08:21:29.3417913Z 
﻿2026-07-08T08:21:30.1854088Z ##[group]Run npm run test
2026-07-08T08:21:30.1854412Z [36;1mnpm run test[0m
2026-07-08T08:21:30.1887238Z shell: /usr/bin/bash -e {0}
2026-07-08T08:21:30.1887500Z ##[endgroup]
2026-07-08T08:21:30.2987107Z 
2026-07-08T08:21:30.2987937Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:21:30.2988565Z > vitest run
2026-07-08T08:21:30.2988815Z 
2026-07-08T08:21:30.6188765Z 
2026-07-08T08:21:30.6192634Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:21:30.6193493Z 
2026-07-08T08:21:30.9424144Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:21:30.9426177Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:21:30.9427072Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:21:30.9528445Z 
2026-07-08T08:21:30.9536191Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:21:30.9536786Z 
2026-07-08T08:21:30.9539698Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:21:30.9541605Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:21:30.9542335Z 
2026-07-08T08:21:30.9542502Z - Expected
2026-07-08T08:21:30.9542886Z + Received
2026-07-08T08:21:30.9543101Z 
2026-07-08T08:21:30.9543255Z - 4
2026-07-08T08:21:30.9543804Z + 3
2026-07-08T08:21:30.9544172Z 
2026-07-08T08:21:30.9544705Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:21:30.9692725Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:21:30.9694284Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:21:30.9696469Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:21:30.9698138Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:21:30.9698841Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:21:30.9699423Z     [90m  8| [39m
2026-07-08T08:21:30.9699685Z 
2026-07-08T08:21:30.9700169Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:21:30.9700549Z 
2026-07-08T08:21:30.9700571Z 
2026-07-08T08:21:30.9729952Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:21:30.9738922Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:21:30.9739747Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:21:30.9740335Z [2m   Start at [22m 08:21:30
2026-07-08T08:21:30.9741107Z [2m   Duration [22m 334ms[2m (transform 38ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 83ms)[22m
2026-07-08T08:21:30.9741628Z 
2026-07-08T08:21:30.9932288Z ##[error]Process completed with exit code 1.
2026-07-08T08:21:16.6670000Z Job is about to start running on the hosted runner: GitHub Actions 1000000989
2026-07-08T08:21:16.6460000Z Evaluating test.if
2026-07-08T08:21:16.6460000Z Evaluating: success()
2026-07-08T08:21:16.6460000Z Result: true
2026-07-08T08:21:16.6660000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:21:16.6550000Z Requested labels: ubuntu-latest
2026-07-08T08:21:16.6550000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:21:16.6550000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.