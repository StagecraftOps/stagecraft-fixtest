# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when given the inputs [2, 4, 6]. The correct mean of [2, 4, 6] is (2+4+6)/3 = 4, so the `average` implementation in the source code contains a bug — most likely an off-by-one error in the denominator (e.g., dividing by `array.length - 1` instead of `array.length`, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's source implementation returning the wrong value, not in any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:04.3332270Z ##[endgroup]
2026-07-08T08:22:04.4454170Z 
2026-07-08T08:22:04.4454767Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:22:04.4455339Z > tsc --noEmit
2026-07-08T08:22:04.4455564Z 
﻿2026-07-08T08:22:05.2819845Z ##[group]Run npm run test
2026-07-08T08:22:05.2820410Z [36;1mnpm run test[0m
2026-07-08T08:22:05.2856866Z shell: /usr/bin/bash -e {0}
2026-07-08T08:22:05.2857145Z ##[endgroup]
2026-07-08T08:22:05.3984070Z 
2026-07-08T08:22:05.3984838Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:22:05.3985374Z > vitest run
2026-07-08T08:22:05.3985579Z 
2026-07-08T08:22:05.7516559Z 
2026-07-08T08:22:05.7520427Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:22:05.7521662Z 
2026-07-08T08:22:06.0643097Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:22:06.0644739Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:22:06.0645763Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:22:06.0744235Z 
2026-07-08T08:22:06.0751886Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:22:06.0752616Z 
2026-07-08T08:22:06.0755037Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:22:06.0757319Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:22:06.0757905Z 
2026-07-08T08:22:06.0758102Z - Expected
2026-07-08T08:22:06.0758498Z + Received
2026-07-08T08:22:06.0758824Z 
2026-07-08T08:22:06.0759170Z - 4
2026-07-08T08:22:06.0759607Z + 3
2026-07-08T08:22:06.0759833Z 
2026-07-08T08:22:06.0760449Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:22:06.0908321Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:22:06.0909857Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:22:06.0912283Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:22:06.0913872Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:22:06.0914265Z 
2026-07-08T08:22:06.0945744Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:22:06.0974752Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:22:06.0975320Z     [90m  8| [39m
2026-07-08T08:22:06.0975591Z 
2026-07-08T08:22:06.0976122Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:22:06.0976490Z 
2026-07-08T08:22:06.0977108Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:22:06.0978309Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:22:06.0979296Z [2m   Start at [22m 08:22:05
2026-07-08T08:22:06.0990899Z [2m   Duration [22m 322ms[2m (transform 41ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 78ms)[22m
2026-07-08T08:22:06.1002841Z 
2026-07-08T08:22:06.1165842Z ##[error]Process completed with exit code 1.
2026-07-08T08:21:54.8220000Z Evaluating test.if
2026-07-08T08:21:54.8220000Z Evaluating: success()
2026-07-08T08:21:54.8220000Z Result: true
2026-07-08T08:21:54.8220000Z Requested labels: ubuntu-latest
2026-07-08T08:21:54.8220000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:21:54.8220000Z Waiting for a runner to pick up this job...
2026-07-08T08:21:55.1870000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:21:55.1870000Z Job is about to start running on the hosted runner: GitHub Actions 1000000990
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.