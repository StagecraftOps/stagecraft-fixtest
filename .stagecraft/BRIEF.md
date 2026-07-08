# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong count (e.g., dividing by `length + 1`, using integer truncation incorrectly, or off-by-one in the accumulation logic) rather than a correct arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is indeed 4), so the bug lies in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
8.0368661Z ##[endgroup]
2026-07-08T08:29:58.1526904Z 
2026-07-08T08:29:58.1527619Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:29:58.1528147Z > tsc --noEmit
2026-07-08T08:29:58.1528307Z 
﻿2026-07-08T08:29:59.0185334Z ##[group]Run npm run test
2026-07-08T08:29:59.0186013Z [36;1mnpm run test[0m
2026-07-08T08:29:59.0227739Z shell: /usr/bin/bash -e {0}
2026-07-08T08:29:59.0228114Z ##[endgroup]
2026-07-08T08:29:59.1520403Z 
2026-07-08T08:29:59.1521268Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:29:59.1521693Z > vitest run
2026-07-08T08:29:59.1521854Z 
2026-07-08T08:29:59.5637019Z 
2026-07-08T08:29:59.5640528Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:29:59.5641806Z 
2026-07-08T08:29:59.9783798Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:29:59.9785511Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:29:59.9786705Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:59.9891794Z 
2026-07-08T08:29:59.9899738Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:29:59.9900752Z 
2026-07-08T08:29:59.9903725Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:29:59.9905599Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:59.9906236Z 
2026-07-08T08:29:59.9906451Z - Expected
2026-07-08T08:29:59.9906868Z + Received
2026-07-08T08:29:59.9907208Z 
2026-07-08T08:29:59.9907364Z - 4
2026-07-08T08:29:59.9907863Z + 3
2026-07-08T08:29:59.9908076Z 
2026-07-08T08:29:59.9909147Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:30:00.0061620Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:00.0063518Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:00.0065642Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:30:00.0066606Z 
2026-07-08T08:30:00.0067352Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:30:00.0100152Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:30:00.0114496Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:30:00.0115182Z     [90m  8| [39m
2026-07-08T08:30:00.0115506Z 
2026-07-08T08:30:00.0116156Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:30:00.0116616Z 
2026-07-08T08:30:00.0117318Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:30:00.0118766Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:30:00.0119746Z [2m   Start at [22m 08:29:59
2026-07-08T08:30:00.0120856Z [2m   Duration [22m 425ms[2m (transform 50ms, setup 0ms, collect 43ms, tests 11ms, environment 0ms, prepare 81ms)[22m
2026-07-08T08:30:00.0121860Z 
2026-07-08T08:30:00.0371848Z ##[error]Process completed with exit code 1.
2026-07-08T08:29:49.1130000Z Requested labels: ubuntu-latest
2026-07-08T08:29:49.1130000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:29:49.1130000Z Waiting for a runner to pick up this job...
2026-07-08T08:29:49.1070000Z Evaluating test.if
2026-07-08T08:29:49.1070000Z Evaluating: success()
2026-07-08T08:29:49.1070000Z Result: true
2026-07-08T08:29:49.3800000Z Job is about to start running on the hosted runner: GitHub Actions 1000001044
2026-07-08T08:29:49.3800000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.