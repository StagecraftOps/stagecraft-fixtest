# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by the wrong count, or dividing by `n+1` instead of `n` (e.g., dividing by 3 items correctly gives 12/3=4, but receiving 3 suggests it may be dividing by 4, or summing only part of the array). The test at `src/math.test.ts:6` is a legitimate assertion that correctly expects `4`, and the implementation is at fault.

## Why this is a code-level issue, not a pipeline config issue

The failing test asserts a mathematically correct expectation (`average([2, 4, 6]) === 4`) but the production function returns `3`, pointing to a bug in the `average` function's source implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:08.8574452Z ##[endgroup]
2026-07-08T08:14:08.9718975Z 
2026-07-08T08:14:08.9719579Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:14:08.9720211Z > tsc --noEmit
2026-07-08T08:14:08.9720441Z 
﻿2026-07-08T08:14:09.7841120Z ##[group]Run npm run test
2026-07-08T08:14:09.7841657Z [36;1mnpm run test[0m
2026-07-08T08:14:09.7877634Z shell: /usr/bin/bash -e {0}
2026-07-08T08:14:09.7878125Z ##[endgroup]
2026-07-08T08:14:09.8984097Z 
2026-07-08T08:14:09.8984929Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:14:09.8985456Z > vitest run
2026-07-08T08:14:09.8985673Z 
2026-07-08T08:14:10.2218950Z 
2026-07-08T08:14:10.2222592Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:14:10.2223368Z 
2026-07-08T08:14:10.5421379Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:14:10.5426207Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:14:10.5427048Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:14:10.5523468Z 
2026-07-08T08:14:10.5530824Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:14:10.5531584Z 
2026-07-08T08:14:10.5534215Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:14:10.5536487Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:14:10.5537045Z 
2026-07-08T08:14:10.5537268Z - Expected
2026-07-08T08:14:10.5537710Z + Received
2026-07-08T08:14:10.5538061Z 
2026-07-08T08:14:10.5538204Z - 4
2026-07-08T08:14:10.5538479Z + 3
2026-07-08T08:14:10.5538765Z 
2026-07-08T08:14:10.5539968Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:14:10.5688912Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:14:10.5690263Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:14:10.5692023Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:14:10.5693367Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:14:10.5693971Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:14:10.5694448Z     [90m  8| [39m
2026-07-08T08:14:10.5694670Z 
2026-07-08T08:14:10.5695332Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:14:10.5695799Z 
2026-07-08T08:14:10.5696177Z 
2026-07-08T08:14:10.5728046Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:14:10.5739943Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:14:10.5740863Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:14:10.5741470Z [2m   Start at [22m 08:14:10
2026-07-08T08:14:10.5742269Z [2m   Duration [22m 330ms[2m (transform 40ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 70ms)[22m
2026-07-08T08:14:10.5742756Z 
2026-07-08T08:14:10.5942133Z ##[error]Process completed with exit code 1.
2026-07-08T08:13:58.1420000Z Evaluating test.if
2026-07-08T08:13:58.1420000Z Evaluating: success()
2026-07-08T08:13:58.1420000Z Result: true
2026-07-08T08:13:58.6070000Z Job is about to start running on the hosted runner: GitHub Actions 1000000961
2026-07-08T08:13:58.5950000Z Requested labels: ubuntu-latest
2026-07-08T08:13:58.5950000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:13:58.5950000Z Waiting for a runner to pick up this job...
2026-07-08T08:13:58.6040000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.