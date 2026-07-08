# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is computing the wrong result — most likely summing the values correctly (12) but dividing by the wrong denominator (e.g., 4 instead of 3), or using integer/floor division, or off-by-one in the length calculation, producing 3 instead of 4.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion error where the `average` function returns an incorrect value (3) for a well-defined mathematical input, meaning the bug lives in the application source code (the `average` implementation), not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
.3218579Z ##[endgroup]
2026-07-08T08:44:19.4354091Z 
2026-07-08T08:44:19.4355067Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:44:19.4355637Z > tsc --noEmit
2026-07-08T08:44:19.4355779Z 
﻿2026-07-08T08:44:20.3707110Z ##[group]Run npm run test
2026-07-08T08:44:20.3707653Z [36;1mnpm run test[0m
2026-07-08T08:44:20.3745593Z shell: /usr/bin/bash -e {0}
2026-07-08T08:44:20.3745894Z ##[endgroup]
2026-07-08T08:44:20.4957823Z 
2026-07-08T08:44:20.4958854Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:44:20.4959568Z > vitest run
2026-07-08T08:44:20.4959878Z 
2026-07-08T08:44:20.8627306Z 
2026-07-08T08:44:20.8640489Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:44:20.8641229Z 
2026-07-08T08:44:21.2663693Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:44:21.2665309Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:44:21.2666020Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:21.2786475Z 
2026-07-08T08:44:21.2796528Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:44:21.2826532Z 
2026-07-08T08:44:21.2828044Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:44:21.2846240Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:21.2865616Z 
2026-07-08T08:44:21.2875733Z - Expected
2026-07-08T08:44:21.2876253Z + Received
2026-07-08T08:44:21.2876709Z 
2026-07-08T08:44:21.2877074Z - 4
2026-07-08T08:44:21.2877549Z + 3
2026-07-08T08:44:21.2877897Z 
2026-07-08T08:44:21.2878745Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:44:21.3025158Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:21.3026762Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:21.3028651Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:44:21.3030339Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:44:21.3030718Z 
2026-07-08T08:44:21.3031245Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:44:21.3060292Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:44:21.3071370Z     [90m  8| [39m
2026-07-08T08:44:21.3071772Z 
2026-07-08T08:44:21.3072233Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:44:21.3072629Z 
2026-07-08T08:44:21.3073199Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:44:21.3074461Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:44:21.3075933Z [2m   Start at [22m 08:44:20
2026-07-08T08:44:21.3078517Z [2m   Duration [22m 417ms[2m (transform 45ms, setup 0ms, collect 37ms, tests 11ms, environment 0ms, prepare 104ms)[22m
2026-07-08T08:44:21.3080438Z 
2026-07-08T08:44:21.3330725Z ##[error]Process completed with exit code 1.
2026-07-08T08:44:10.4080000Z Evaluating test.if
2026-07-08T08:44:10.4080000Z Evaluating: success()
2026-07-08T08:44:10.4080000Z Result: true
2026-07-08T08:44:10.4080000Z Requested labels: ubuntu-latest
2026-07-08T08:44:10.4080000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:44:10.4080000Z Waiting for a runner to pick up this job...
2026-07-08T08:44:10.4270000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:44:10.4270000Z Job is about to start running on the hosted runner: GitHub Actions 1000001116
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.