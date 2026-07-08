# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong denominator, or is using integer/floor division incorrectly (e.g. summing `2+4+6=12` but dividing by 4 instead of 3, or perhaps summing only some elements). The test at `src/math.test.ts:6` correctly expects `4` (the arithmetic mean of 2, 4, 6).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion error caused by a logic bug in the application's `average` function — the workflow configuration is correct and no pipeline changes can fix an incorrect return value from source code.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:34.1162811Z ##[endgroup]
2026-07-08T08:51:34.2275043Z 
2026-07-08T08:51:34.2275899Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:51:34.2276575Z > tsc --noEmit
2026-07-08T08:51:34.2276846Z 
﻿2026-07-08T08:51:35.0961254Z ##[group]Run npm run test
2026-07-08T08:51:35.0961551Z [36;1mnpm run test[0m
2026-07-08T08:51:35.0994605Z shell: /usr/bin/bash -e {0}
2026-07-08T08:51:35.0994870Z ##[endgroup]
2026-07-08T08:51:35.2104777Z 
2026-07-08T08:51:35.2105537Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:51:35.2106135Z > vitest run
2026-07-08T08:51:35.2106383Z 
2026-07-08T08:51:35.5217821Z 
2026-07-08T08:51:35.5221332Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:51:35.5224695Z 
2026-07-08T08:51:35.8477951Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:51:35.8479248Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:51:35.8479942Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:35.8585970Z 
2026-07-08T08:51:35.8593252Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:51:35.8593874Z 
2026-07-08T08:51:35.8596587Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:51:35.8598361Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:35.8599128Z 
2026-07-08T08:51:35.8599302Z - Expected
2026-07-08T08:51:35.8599684Z + Received
2026-07-08T08:51:35.8599884Z 
2026-07-08T08:51:35.8600069Z - 4
2026-07-08T08:51:35.8600391Z + 3
2026-07-08T08:51:35.8600570Z 
2026-07-08T08:51:35.8601260Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:51:35.8747653Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:35.8749145Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:35.8751088Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:51:35.8753076Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:51:35.8753833Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:51:35.8754439Z     [90m  8| [39m
2026-07-08T08:51:35.8754702Z 
2026-07-08T08:51:35.8755211Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:51:35.8755609Z 
2026-07-08T08:51:35.8755634Z 
2026-07-08T08:51:35.8788643Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:51:35.8803200Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:51:35.8804509Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:51:35.8805414Z [2m   Start at [22m 08:51:35
2026-07-08T08:51:35.8806757Z [2m   Duration [22m 337ms[2m (transform 40ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 78ms)[22m
2026-07-08T08:51:35.8807668Z 
2026-07-08T08:51:35.8988667Z ##[error]Process completed with exit code 1.
2026-07-08T08:51:21.1650000Z Evaluating test.if
2026-07-08T08:51:21.1650000Z Evaluating: success()
2026-07-08T08:51:21.1650000Z Result: true
2026-07-08T08:51:21.1700000Z Requested labels: ubuntu-latest
2026-07-08T08:51:21.1700000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:51:21.1700000Z Waiting for a runner to pick up this job...
2026-07-08T08:51:21.4920000Z Job is about to start running on the hosted runner: GitHub Actions 1000001160
2026-07-08T08:51:21.4920000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.