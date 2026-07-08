# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the implementation — most likely the function is summing the values and dividing by the wrong denominator (e.g., dividing by `numbers.length + 1` or using integer division incorrectly), or it is computing a different statistic altogether (e.g., median or min instead of mean).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the `average` function's source code implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:43.0269193Z ##[endgroup]
2026-07-08T08:35:43.1366001Z 
2026-07-08T08:35:43.1366938Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:35:43.1367627Z > tsc --noEmit
2026-07-08T08:35:43.1367820Z 
﻿2026-07-08T08:35:43.9913479Z ##[group]Run npm run test
2026-07-08T08:35:43.9914083Z [36;1mnpm run test[0m
2026-07-08T08:35:43.9945972Z shell: /usr/bin/bash -e {0}
2026-07-08T08:35:43.9946252Z ##[endgroup]
2026-07-08T08:35:44.1079149Z 
2026-07-08T08:35:44.1079961Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:35:44.1080440Z > vitest run
2026-07-08T08:35:44.1080964Z 
2026-07-08T08:35:44.4399873Z 
2026-07-08T08:35:44.4404121Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:35:44.4416101Z 
2026-07-08T08:35:44.7657014Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:35:44.7658890Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:35:44.7659870Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:35:44.7770053Z 
2026-07-08T08:35:44.7777882Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:35:44.7778766Z 
2026-07-08T08:35:44.7780131Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:35:44.7782585Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:35:44.7783298Z 
2026-07-08T08:35:44.7783632Z - Expected
2026-07-08T08:35:44.7784029Z + Received
2026-07-08T08:35:44.7784233Z 
2026-07-08T08:35:44.7784382Z - 4
2026-07-08T08:35:44.7784885Z + 3
2026-07-08T08:35:44.7785062Z 
2026-07-08T08:35:44.7785608Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:35:44.7936874Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:35:44.7938357Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:35:44.7940311Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:35:44.7942085Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:35:44.7942863Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:35:44.7943400Z     [90m  8| [39m
2026-07-08T08:35:44.7943660Z 
2026-07-08T08:35:44.7944186Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:35:44.7944551Z 
2026-07-08T08:35:44.7944585Z 
2026-07-08T08:35:44.7974879Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:35:44.7989270Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:35:44.7991115Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:35:44.7992146Z [2m   Start at [22m 08:35:44
2026-07-08T08:35:44.7993416Z [2m   Duration [22m 337ms[2m (transform 40ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 79ms)[22m
2026-07-08T08:35:44.7994272Z 
2026-07-08T08:35:44.8190160Z ##[error]Process completed with exit code 1.
2026-07-08T08:35:33.2640000Z Requested labels: ubuntu-latest
2026-07-08T08:35:33.2640000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:35:33.2640000Z Waiting for a runner to pick up this job...
2026-07-08T08:35:33.2630000Z Evaluating test.if
2026-07-08T08:35:33.2630000Z Evaluating: success()
2026-07-08T08:35:33.2630000Z Result: true
2026-07-08T08:35:33.7410000Z Job is about to start running on the hosted runner: GitHub Actions 1000001065
2026-07-08T08:35:33.7400000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.