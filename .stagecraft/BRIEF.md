# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when given inputs [2, 4, 6]. The correct mean of [2, 4, 6] is (2+4+6)/3 = 4, so the `average` function implementation contains a bug — most likely an off-by-one error in the divisor (e.g. dividing by `arr.length + 1` or using `arr.length - 1` instead of `arr.length`), or an incorrect summation loop that undercounts elements.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lives in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:15.3407213Z ##[endgroup]
2026-07-08T08:57:15.4581882Z 
2026-07-08T08:57:15.4582879Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:57:15.4583386Z > tsc --noEmit
2026-07-08T08:57:15.4583548Z 
﻿2026-07-08T08:57:16.3215583Z ##[group]Run npm run test
2026-07-08T08:57:16.3216083Z [36;1mnpm run test[0m
2026-07-08T08:57:16.3252367Z shell: /usr/bin/bash -e {0}
2026-07-08T08:57:16.3252641Z ##[endgroup]
2026-07-08T08:57:16.4463193Z 
2026-07-08T08:57:16.4463796Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:57:16.4464277Z > vitest run
2026-07-08T08:57:16.4464488Z 
2026-07-08T08:57:16.7692134Z 
2026-07-08T08:57:16.7695706Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:57:16.7696443Z 
2026-07-08T08:57:17.1257645Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:57:17.1258853Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:57:17.1261076Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:57:17.1357850Z 
2026-07-08T08:57:17.1364305Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:57:17.1365048Z 
2026-07-08T08:57:17.1366933Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:57:17.1368907Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:57:17.1369439Z 
2026-07-08T08:57:17.1369590Z - Expected
2026-07-08T08:57:17.1369915Z + Received
2026-07-08T08:57:17.1370089Z 
2026-07-08T08:57:17.1370339Z - 4
2026-07-08T08:57:17.1370649Z + 3
2026-07-08T08:57:17.1370809Z 
2026-07-08T08:57:17.1371414Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:57:17.1518486Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:57:17.1519809Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:57:17.1521343Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:57:17.1522541Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:57:17.1523121Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:57:17.1523573Z     [90m  8| [39m
2026-07-08T08:57:17.1523775Z 
2026-07-08T08:57:17.1524214Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:57:17.1524554Z 
2026-07-08T08:57:17.1524599Z 
2026-07-08T08:57:17.1552903Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:57:17.1561760Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:57:17.1562504Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:57:17.1563055Z [2m   Start at [22m 08:57:16
2026-07-08T08:57:17.1563772Z [2m   Duration [22m 366ms[2m (transform 40ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 82ms)[22m
2026-07-08T08:57:17.1564218Z 
2026-07-08T08:57:17.1776662Z ##[error]Process completed with exit code 1.
2026-07-08T08:57:07.0460000Z Evaluating test.if
2026-07-08T08:57:07.0460000Z Evaluating: success()
2026-07-08T08:57:07.0460000Z Result: true
2026-07-08T08:57:07.0540000Z Job is about to start running on the hosted runner: GitHub Actions 1000001201
2026-07-08T08:57:07.0470000Z Requested labels: ubuntu-latest
2026-07-08T08:57:07.0470000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:57:07.0470000Z Waiting for a runner to pick up this job...
2026-07-08T08:57:07.0530000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.