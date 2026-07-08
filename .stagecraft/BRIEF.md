# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum and dividing by the wrong count (e.g., dividing by the length + 1, or summing incorrectly), or it is computing the median/wrong statistic instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lives in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:48.4316066Z ##[endgroup]
2026-07-08T08:28:48.5387672Z 
2026-07-08T08:28:48.5388347Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:48.5388781Z > tsc --noEmit
2026-07-08T08:28:48.5388934Z 
﻿2026-07-08T08:28:49.3713075Z ##[group]Run npm run test
2026-07-08T08:28:49.3713592Z [36;1mnpm run test[0m
2026-07-08T08:28:49.3745656Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:49.3745932Z ##[endgroup]
2026-07-08T08:28:49.4863519Z 
2026-07-08T08:28:49.4864348Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:49.4864956Z > vitest run
2026-07-08T08:28:49.4865182Z 
2026-07-08T08:28:49.8903678Z 
2026-07-08T08:28:49.8907827Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:49.8908666Z 
2026-07-08T08:28:50.2198333Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:28:50.2200789Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:50.2201974Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:50.2296279Z 
2026-07-08T08:28:50.2320791Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:50.2321244Z 
2026-07-08T08:28:50.2321839Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:50.2322866Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:50.2323254Z 
2026-07-08T08:28:50.2323444Z - Expected
2026-07-08T08:28:50.2323705Z + Received
2026-07-08T08:28:50.2323821Z 
2026-07-08T08:28:50.2323905Z - 4
2026-07-08T08:28:50.2324094Z + 3
2026-07-08T08:28:50.2324195Z 
2026-07-08T08:28:50.2324566Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:50.2460950Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:50.2462588Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:50.2464560Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:50.2466010Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:50.2467011Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:50.2467396Z 
2026-07-08T08:28:50.2499895Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:50.2512724Z     [90m  8| [39m
2026-07-08T08:28:50.2513058Z 
2026-07-08T08:28:50.2513614Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:50.2513908Z 
2026-07-08T08:28:50.2514309Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:50.2515094Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:50.2515719Z [2m   Start at [22m 08:28:49
2026-07-08T08:28:50.2516549Z [2m   Duration [22m 339ms[2m (transform 36ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 70ms)[22m
2026-07-08T08:28:50.2517081Z 
2026-07-08T08:28:50.2702507Z ##[error]Process completed with exit code 1.
2026-07-08T08:28:38.5150000Z Evaluating test.if
2026-07-08T08:28:38.5150000Z Evaluating: success()
2026-07-08T08:28:38.5150000Z Result: true
2026-07-08T08:28:38.5170000Z Requested labels: ubuntu-latest
2026-07-08T08:28:38.5170000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:28:38.5170000Z Waiting for a runner to pick up this job...
2026-07-08T08:28:38.5220000Z Job is about to start running on the hosted runner: GitHub Actions 1000001030
2026-07-08T08:28:38.5220000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.