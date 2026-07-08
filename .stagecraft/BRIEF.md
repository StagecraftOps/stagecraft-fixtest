# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns the wrong value. For the input [2, 4, 6] the expected mean is 4, but the function returned 3. This is a logic bug in the implementation — likely summing incorrectly (e.g. using the wrong divisor, or computing a median/minimum instead of a mean).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` fails because the function returns 3 instead of 4, indicating a bug in the application's `average` implementation (e.g. dividing by the wrong count or using incorrect arithmetic), not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
0.9292584Z ##[endgroup]
2026-07-08T08:04:51.0382774Z 
2026-07-08T08:04:51.0383567Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:04:51.0384240Z > tsc --noEmit
2026-07-08T08:04:51.0384531Z 
﻿2026-07-08T08:04:51.8738474Z ##[group]Run npm run test
2026-07-08T08:04:51.8739001Z [36;1mnpm run test[0m
2026-07-08T08:04:51.8785187Z shell: /usr/bin/bash -e {0}
2026-07-08T08:04:51.8785614Z ##[endgroup]
2026-07-08T08:04:51.9927683Z 
2026-07-08T08:04:51.9928453Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:04:51.9929045Z > vitest run
2026-07-08T08:04:51.9929298Z 
2026-07-08T08:04:52.3130321Z 
2026-07-08T08:04:52.3133971Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:04:52.3135008Z 
2026-07-08T08:04:52.6810988Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:04:52.6812824Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:04:52.6813971Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:04:52.6919655Z 
2026-07-08T08:04:52.6926602Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:04:52.6927825Z 
2026-07-08T08:04:52.6930890Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:04:52.6933522Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:04:52.6934190Z 
2026-07-08T08:04:52.6934585Z - Expected
2026-07-08T08:04:52.6935026Z + Received
2026-07-08T08:04:52.6935253Z 
2026-07-08T08:04:52.6935408Z - 4
2026-07-08T08:04:52.6935761Z + 3
2026-07-08T08:04:52.6935954Z 
2026-07-08T08:04:52.6936515Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:04:52.7086857Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:04:52.7089124Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:04:52.7091750Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:04:52.7092757Z 
2026-07-08T08:04:52.7124214Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:04:52.7135281Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:04:52.7136054Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:04:52.7136619Z     [90m  8| [39m
2026-07-08T08:04:52.7136901Z 
2026-07-08T08:04:52.7137747Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:04:52.7138224Z 
2026-07-08T08:04:52.7138877Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:04:52.7140281Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:04:52.7141367Z [2m   Start at [22m 08:04:52
2026-07-08T08:04:52.7142879Z [2m   Duration [22m 379ms[2m (transform 42ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 88ms)[22m
2026-07-08T08:04:52.7144294Z 
2026-07-08T08:04:52.7330624Z ##[error]Process completed with exit code 1.
2026-07-08T08:04:34.0660000Z Requested labels: ubuntu-latest
2026-07-08T08:04:34.0660000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/pull/1/merge
2026-07-08T08:04:34.0660000Z Waiting for a runner to pick up this job...
2026-07-08T08:04:34.0620000Z Evaluating test.if
2026-07-08T08:04:34.0620000Z Evaluating: success()
2026-07-08T08:04:34.0620000Z Result: true
2026-07-08T08:04:34.4130000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:04:34.4130000Z Job is about to start running on the hosted runner: GitHub Actions 1000000958
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.