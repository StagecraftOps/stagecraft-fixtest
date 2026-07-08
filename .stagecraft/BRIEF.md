# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is computing the wrong result — likely using integer division that truncates (e.g., summing to 12 then dividing incorrectly), or there is an off-by-one bug in the sum or count logic within the `average` function itself.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion error where the application's `average` function returns the wrong numeric result (3 instead of 4), indicating a bug in the source implementation rather than any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:30:47.3521686Z 
﻿2026-07-08T08:30:48.1738240Z ##[group]Run npm run test
2026-07-08T08:30:48.1738829Z [36;1mnpm run test[0m
2026-07-08T08:30:48.1775631Z shell: /usr/bin/bash -e {0}
2026-07-08T08:30:48.1775921Z ##[endgroup]
2026-07-08T08:30:48.2896025Z 
2026-07-08T08:30:48.2896879Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:30:48.2897403Z > vitest run
2026-07-08T08:30:48.2897596Z 
2026-07-08T08:30:48.6249753Z 
2026-07-08T08:30:48.6261427Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:30:48.6262602Z 
2026-07-08T08:30:48.9499584Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:30:48.9501097Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:30:48.9502213Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:30:48.9601486Z 
2026-07-08T08:30:48.9609406Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:30:48.9610190Z 
2026-07-08T08:30:48.9612170Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:30:48.9614205Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:30:48.9614905Z 
2026-07-08T08:30:48.9615070Z - Expected
2026-07-08T08:30:48.9615413Z + Received
2026-07-08T08:30:48.9615578Z 
2026-07-08T08:30:48.9615717Z - 4
2026-07-08T08:30:48.9616003Z + 3
2026-07-08T08:30:48.9616176Z 
2026-07-08T08:30:48.9616738Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:30:48.9764064Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:48.9765659Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:48.9767541Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:30:48.9768405Z 
2026-07-08T08:30:48.9800179Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:30:48.9811193Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:30:48.9811911Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:30:48.9812382Z     [90m  8| [39m
2026-07-08T08:30:48.9812620Z 
2026-07-08T08:30:48.9813203Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:30:48.9813525Z 
2026-07-08T08:30:48.9814102Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:30:48.9815605Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:30:48.9816584Z [2m   Start at [22m 08:30:48
2026-07-08T08:30:48.9817810Z [2m   Duration [22m 335ms[2m (transform 42ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 71ms)[22m
2026-07-08T08:30:48.9818495Z 
2026-07-08T08:30:49.0022795Z ##[error]Process completed with exit code 1.
2026-07-08T08:30:21.1440000Z Requested labels: ubuntu-latest
2026-07-08T08:30:21.1440000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:30:21.1440000Z Waiting for a runner to pick up this job...
2026-07-08T08:30:21.1410000Z Evaluating test.if
2026-07-08T08:30:21.1410000Z Evaluating: success()
2026-07-08T08:30:21.1410000Z Result: true
2026-07-08T08:30:21.2570000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:30:37.9670000Z Job is about to start running on the hosted runner: GitHub Actions 1000001048
2026-07-08T08:30:37.9660000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.