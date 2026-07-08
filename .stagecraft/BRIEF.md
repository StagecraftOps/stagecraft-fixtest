# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when called with `[2, 4, 6]`. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the implementation is producing 3, indicating a bug in the averaging logic — likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` or using an incorrect accumulation), or an incorrect summation.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct, so the bug is in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:52.6644873Z ##[endgroup]
2026-07-08T08:20:52.7947824Z 
2026-07-08T08:20:52.7948709Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:20:52.7949483Z > tsc --noEmit
2026-07-08T08:20:52.7949784Z 
﻿2026-07-08T08:20:53.8588483Z ##[group]Run npm run test
2026-07-08T08:20:53.8589056Z [36;1mnpm run test[0m
2026-07-08T08:20:53.8622337Z shell: /usr/bin/bash -e {0}
2026-07-08T08:20:53.8622629Z ##[endgroup]
2026-07-08T08:20:53.9807346Z 
2026-07-08T08:20:53.9808350Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:20:53.9809008Z > vitest run
2026-07-08T08:20:53.9809266Z 
2026-07-08T08:20:54.3817429Z 
2026-07-08T08:20:54.3845285Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:20:54.3877278Z 
2026-07-08T08:20:54.7759463Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:20:54.7779780Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:20:54.7781181Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:20:54.7883121Z 
2026-07-08T08:20:54.7899692Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:20:54.7900413Z 
2026-07-08T08:20:54.7901311Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:20:54.7902758Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:20:54.7903100Z 
2026-07-08T08:20:54.7903209Z - Expected
2026-07-08T08:20:54.7903596Z + Received
2026-07-08T08:20:54.7903757Z 
2026-07-08T08:20:54.7903868Z - 4
2026-07-08T08:20:54.7904065Z + 3
2026-07-08T08:20:54.7904163Z 
2026-07-08T08:20:54.7904479Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:20:54.8133393Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:20:54.8137066Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:20:54.8138168Z 
2026-07-08T08:20:54.8139811Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:20:54.8164078Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:20:54.8175810Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:20:54.8176565Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:20:54.8177445Z     [90m  8| [39m
2026-07-08T08:20:54.8177727Z 
2026-07-08T08:20:54.8178280Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:20:54.8178709Z 
2026-07-08T08:20:54.8179324Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:20:54.8191221Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:20:54.8192687Z [2m   Start at [22m 08:20:54
2026-07-08T08:20:54.8194635Z [2m   Duration [22m 409ms[2m (transform 50ms, setup 0ms, collect 40ms, tests 9ms, environment 0ms, prepare 99ms)[22m
2026-07-08T08:20:54.8195756Z 
2026-07-08T08:20:54.8421177Z ##[error]Process completed with exit code 1.
2026-07-08T08:20:42.7720000Z Evaluating test.if
2026-07-08T08:20:42.7720000Z Evaluating: success()
2026-07-08T08:20:42.7720000Z Result: true
2026-07-08T08:20:42.7870000Z Requested labels: ubuntu-latest
2026-07-08T08:20:42.7870000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:20:42.7870000Z Waiting for a runner to pick up this job...
2026-07-08T08:20:43.0710000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:20:43.0650000Z Job is about to start running on the hosted runner: GitHub Actions 1000000987
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.