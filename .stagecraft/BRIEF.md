# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) contains a bug: when called with [2, 4, 6], it returns 3 instead of the correct mean of 4. This is a logic error in the implementation — likely dividing by the wrong count, using integer division incorrectly, or summing/dividing the wrong values. The test at `src/math.test.ts:6` correctly expects `average([2, 4, 6])` to equal `4`, but the function returns `3`.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by a bug in the application's `average` function implementation, not a workflow misconfiguration — no changes to the CI YAML can make a mathematically incorrect function return the right answer.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:15.0074481Z ##[endgroup]
2026-07-08T08:38:15.1221203Z 
2026-07-08T08:38:15.1222231Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:38:15.1223049Z > tsc --noEmit
2026-07-08T08:38:15.1223337Z 
﻿2026-07-08T08:38:15.9973401Z ##[group]Run npm run test
2026-07-08T08:38:15.9973980Z [36;1mnpm run test[0m
2026-07-08T08:38:16.0007126Z shell: /usr/bin/bash -e {0}
2026-07-08T08:38:16.0007713Z ##[endgroup]
2026-07-08T08:38:16.1139015Z 
2026-07-08T08:38:16.1140809Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:38:16.1141474Z > vitest run
2026-07-08T08:38:16.1141708Z 
2026-07-08T08:38:16.4356363Z 
2026-07-08T08:38:16.4360171Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:38:16.4362931Z 
2026-07-08T08:38:16.7647891Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:38:16.7649625Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:38:16.7650501Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:16.7747548Z 
2026-07-08T08:38:16.7755172Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:38:16.7756192Z 
2026-07-08T08:38:16.7758577Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:38:16.7760611Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:16.7761241Z 
2026-07-08T08:38:16.7761450Z - Expected
2026-07-08T08:38:16.7761835Z + Received
2026-07-08T08:38:16.7762045Z 
2026-07-08T08:38:16.7762462Z - 4
2026-07-08T08:38:16.7762843Z + 3
2026-07-08T08:38:16.7763041Z 
2026-07-08T08:38:16.7763594Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:38:16.7909699Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:16.7911216Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:16.7913073Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:38:16.7914661Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:38:16.7915379Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:38:16.7915914Z     [90m  8| [39m
2026-07-08T08:38:16.7916184Z 
2026-07-08T08:38:16.7916712Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:38:16.7917118Z 
2026-07-08T08:38:16.7917156Z 
2026-07-08T08:38:16.7955270Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:38:16.7971063Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:38:16.7972382Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:38:16.7973364Z [2m   Start at [22m 08:38:16
2026-07-08T08:38:16.7974758Z [2m   Duration [22m 339ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:38:16.7975692Z 
2026-07-08T08:38:16.8163299Z ##[error]Process completed with exit code 1.
2026-07-08T08:38:05.5980000Z Requested labels: ubuntu-latest
2026-07-08T08:38:05.5980000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:38:05.5980000Z Waiting for a runner to pick up this job...
2026-07-08T08:38:05.6050000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:38:05.5970000Z Evaluating test.if
2026-07-08T08:38:05.5970000Z Evaluating: success()
2026-07-08T08:38:05.5970000Z Result: true
2026-07-08T08:38:05.6050000Z Job is about to start running on the hosted runner: GitHub Actions 1000001081
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.