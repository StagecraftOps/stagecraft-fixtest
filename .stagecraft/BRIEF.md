# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation has a bug — most likely an off-by-one error in the divisor (e.g. dividing by `array.length - 1` instead of `array.length`, or using integer/floor division incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lives in the `average` function's source code, not in any workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:27.1241179Z ##[endgroup]
2026-07-08T08:16:27.2358676Z 
2026-07-08T08:16:27.2359166Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:16:27.2359728Z > tsc --noEmit
2026-07-08T08:16:27.2359903Z 
﻿2026-07-08T08:16:28.1009133Z ##[group]Run npm run test
2026-07-08T08:16:28.1009682Z [36;1mnpm run test[0m
2026-07-08T08:16:28.1043806Z shell: /usr/bin/bash -e {0}
2026-07-08T08:16:28.1044080Z ##[endgroup]
2026-07-08T08:16:28.2147760Z 
2026-07-08T08:16:28.2148437Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:16:28.2149066Z > vitest run
2026-07-08T08:16:28.2149298Z 
2026-07-08T08:16:28.5456075Z 
2026-07-08T08:16:28.5465355Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:16:28.5466163Z 
2026-07-08T08:16:28.8626149Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:16:28.8628065Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:16:28.8629231Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:16:28.8729022Z 
2026-07-08T08:16:28.8736550Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:16:28.8737163Z 
2026-07-08T08:16:28.8739954Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:16:28.8742419Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:16:28.8743466Z 
2026-07-08T08:16:28.8743871Z - Expected
2026-07-08T08:16:28.8744568Z + Received
2026-07-08T08:16:28.8745059Z 
2026-07-08T08:16:28.8745230Z - 4
2026-07-08T08:16:28.8745569Z + 3
2026-07-08T08:16:28.8745750Z 
2026-07-08T08:16:28.8746625Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:16:28.8889088Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:16:28.8890869Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:16:28.8893557Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:16:28.8895415Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:16:28.8895852Z 
2026-07-08T08:16:28.8896672Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:16:28.8929633Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:16:28.8943940Z     [90m  8| [39m
2026-07-08T08:16:28.8944898Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:16:28.8946274Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:16:28.8947330Z [2m   Start at [22m 08:16:28
2026-07-08T08:16:28.8948451Z [2m   Duration [22m 327ms[2m (transform 44ms, setup 1ms, collect 31ms, tests 8ms, environment 0ms, prepare 78ms)[22m
2026-07-08T08:16:28.8949095Z 
2026-07-08T08:16:28.8951902Z 
2026-07-08T08:16:28.8953045Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:16:28.8953820Z 
2026-07-08T08:16:28.9135717Z ##[error]Process completed with exit code 1.
2026-07-08T08:16:16.9540000Z Evaluating test.if
2026-07-08T08:16:16.9540000Z Evaluating: success()
2026-07-08T08:16:16.9540000Z Result: true
2026-07-08T08:16:16.9790000Z Job is about to start running on the hosted runner: GitHub Actions 1000000971
2026-07-08T08:16:16.9590000Z Requested labels: ubuntu-latest
2026-07-08T08:16:16.9590000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:16:16.9590000Z Waiting for a runner to pick up this job...
2026-07-08T08:16:16.9780000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.