# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by the wrong denominator (e.g., dividing by `array.length + 1`, or using integer/floor division incorrectly, or off-by-one in summation), causing the result to be `3` rather than `(2+4+6)/3 = 4`.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
37.5615341Z ##[endgroup]
2026-07-08T08:43:37.6787436Z 
2026-07-08T08:43:37.6788450Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:43:37.6789440Z > tsc --noEmit
2026-07-08T08:43:37.6789897Z 
﻿2026-07-08T08:43:38.7290532Z ##[group]Run npm run test
2026-07-08T08:43:38.7291536Z [36;1mnpm run test[0m
2026-07-08T08:43:38.7334073Z shell: /usr/bin/bash -e {0}
2026-07-08T08:43:38.7334487Z ##[endgroup]
2026-07-08T08:43:38.8485999Z 
2026-07-08T08:43:38.8486869Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:43:38.8487381Z > vitest run
2026-07-08T08:43:38.8487593Z 
2026-07-08T08:43:39.2288880Z 
2026-07-08T08:43:39.2303563Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:43:39.2304490Z 
2026-07-08T08:43:39.6158146Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:43:39.6182817Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:43:39.6192425Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:39.6268599Z 
2026-07-08T08:43:39.6293563Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:43:39.6316123Z 
2026-07-08T08:43:39.6332535Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:43:39.6362480Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:39.6363383Z 
2026-07-08T08:43:39.6363817Z - Expected
2026-07-08T08:43:39.6364447Z + Received
2026-07-08T08:43:39.6364898Z 
2026-07-08T08:43:39.6365191Z - 4
2026-07-08T08:43:39.6365653Z + 3
2026-07-08T08:43:39.6366163Z 
2026-07-08T08:43:39.6366792Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:43:39.6529231Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:39.6534506Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:39.6536461Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:43:39.6538094Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:43:39.6538979Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:43:39.6539641Z     [90m  8| [39m
2026-07-08T08:43:39.6540064Z 
2026-07-08T08:43:39.6540723Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:43:39.6541579Z 
2026-07-08T08:43:39.6561590Z 
2026-07-08T08:43:39.6587925Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:43:39.6614469Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:43:39.6616167Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:43:39.6617327Z [2m   Start at [22m 08:43:39
2026-07-08T08:43:39.6618935Z [2m   Duration [22m 398ms[2m (transform 55ms, setup 0ms, collect 38ms, tests 9ms, environment 0ms, prepare 144ms)[22m
2026-07-08T08:43:39.6620081Z 
2026-07-08T08:43:39.6806603Z ##[error]Process completed with exit code 1.
2026-07-08T08:43:28.8740000Z Requested labels: ubuntu-latest
2026-07-08T08:43:28.8740000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:43:28.8740000Z Waiting for a runner to pick up this job...
2026-07-08T08:43:28.8730000Z Evaluating test.if
2026-07-08T08:43:28.8730000Z Evaluating: success()
2026-07-08T08:43:28.8730000Z Result: true
2026-07-08T08:43:29.3780000Z Job is about to start running on the hosted runner: GitHub Actions 1000001113
2026-07-08T08:43:29.3780000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.