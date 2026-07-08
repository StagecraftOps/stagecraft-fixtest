# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when given the input [2, 4, 6]. The correct mean of those three numbers is (2+4+6)/3 = 4, so the implementation contains a bug — most likely an off-by-one error in the denominator (e.g., dividing by `array.length + 1` or `array.length - 1` instead of `array.length`, or summing incorrectly). The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct; the production code is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test expectation is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:11.8133767Z ##[endgroup]
2026-07-08T08:54:11.9253647Z 
2026-07-08T08:54:11.9254231Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:54:11.9254861Z > tsc --noEmit
2026-07-08T08:54:11.9255122Z 
﻿2026-07-08T08:54:12.7793121Z ##[group]Run npm run test
2026-07-08T08:54:12.7793663Z [36;1mnpm run test[0m
2026-07-08T08:54:12.7826031Z shell: /usr/bin/bash -e {0}
2026-07-08T08:54:12.7826299Z ##[endgroup]
2026-07-08T08:54:12.8952734Z 
2026-07-08T08:54:12.8953470Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:54:12.8954084Z > vitest run
2026-07-08T08:54:12.8954314Z 
2026-07-08T08:54:13.2194283Z 
2026-07-08T08:54:13.2197755Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:54:13.2198615Z 
2026-07-08T08:54:13.5350088Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:54:13.5351665Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:54:13.5352362Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:13.5444697Z 
2026-07-08T08:54:13.5452162Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:54:13.5452762Z 
2026-07-08T08:54:13.5455526Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:54:13.5457861Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:13.5458541Z 
2026-07-08T08:54:13.5458791Z - Expected
2026-07-08T08:54:13.5459180Z + Received
2026-07-08T08:54:13.5459381Z 
2026-07-08T08:54:13.5459535Z - 4
2026-07-08T08:54:13.5459901Z + 3
2026-07-08T08:54:13.5460105Z 
2026-07-08T08:54:13.5460711Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:54:13.5602772Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:13.5604435Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:13.5606519Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:54:13.5608493Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:54:13.5608912Z 
2026-07-08T08:54:13.5640203Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:54:13.5654687Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:54:13.5655361Z     [90m  8| [39m
2026-07-08T08:54:13.5655586Z 
2026-07-08T08:54:13.5656052Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:54:13.5656347Z 
2026-07-08T08:54:13.5656787Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:54:13.5657887Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:54:13.5658643Z [2m   Start at [22m 08:54:13
2026-07-08T08:54:13.5660080Z [2m   Duration [22m 325ms[2m (transform 40ms, setup 0ms, collect 29ms, tests 9ms, environment 0ms, prepare 70ms)[22m
2026-07-08T08:54:13.5661023Z 
2026-07-08T08:54:13.5848250Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:02.6250000Z Job is about to start running on the hosted runner: GitHub Actions 1000001177
2026-07-08T08:54:02.6270000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:54:02.6160000Z Requested labels: ubuntu-latest
2026-07-08T08:54:02.6160000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:02.6160000Z Waiting for a runner to pick up this job...
2026-07-08T08:54:02.6130000Z Evaluating test.if
2026-07-08T08:54:02.6130000Z Evaluating: success()
2026-07-08T08:54:02.6130000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.