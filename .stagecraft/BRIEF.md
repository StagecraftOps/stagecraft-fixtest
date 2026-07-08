# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in src/math.ts returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely summing the values but dividing by the wrong count (e.g., dividing by `arr.length + 1` or off-by-one in array traversal), or using integer/floor division incorrectly.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (mean of [2,4,6] is indeed 4), so the bug lives in the `average` function's source implementation in the application code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:37.7254043Z ##[endgroup]
2026-07-08T08:27:37.8419265Z 
2026-07-08T08:27:37.8420472Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:27:37.8421240Z > tsc --noEmit
2026-07-08T08:27:37.8422129Z 
﻿2026-07-08T08:27:38.7466752Z ##[group]Run npm run test
2026-07-08T08:27:38.7467089Z [36;1mnpm run test[0m
2026-07-08T08:27:38.7500599Z shell: /usr/bin/bash -e {0}
2026-07-08T08:27:38.7500876Z ##[endgroup]
2026-07-08T08:27:38.8649175Z 
2026-07-08T08:27:38.8650227Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:27:38.8650744Z > vitest run
2026-07-08T08:27:38.8650892Z 
2026-07-08T08:27:39.2102278Z 
2026-07-08T08:27:39.2107402Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:27:39.2108202Z 
2026-07-08T08:27:39.5494828Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:27:39.5496430Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:27:39.5497155Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:39.5599630Z 
2026-07-08T08:27:39.5607886Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:27:39.5608812Z 
2026-07-08T08:27:39.5611103Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:27:39.5613429Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:39.5614088Z 
2026-07-08T08:27:39.5614386Z - Expected
2026-07-08T08:27:39.5614782Z + Received
2026-07-08T08:27:39.5614987Z 
2026-07-08T08:27:39.5615143Z - 4
2026-07-08T08:27:39.5615485Z + 3
2026-07-08T08:27:39.5615689Z 
2026-07-08T08:27:39.5616311Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:27:39.5763646Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:39.5765307Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:39.5767275Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:27:39.5768776Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:27:39.5769473Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:27:39.5770015Z     [90m  8| [39m
2026-07-08T08:27:39.5770276Z 
2026-07-08T08:27:39.5770884Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:27:39.5771303Z 
2026-07-08T08:27:39.5771344Z 
2026-07-08T08:27:39.5805748Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:27:39.5817887Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:27:39.5818729Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:27:39.5819312Z [2m   Start at [22m 08:27:39
2026-07-08T08:27:39.5820083Z [2m   Duration [22m 349ms[2m (transform 42ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 97ms)[22m
2026-07-08T08:27:39.5820622Z 
2026-07-08T08:27:39.6028256Z ##[error]Process completed with exit code 1.
2026-07-08T08:27:25.1820000Z Evaluating test.if
2026-07-08T08:27:25.1820000Z Evaluating: success()
2026-07-08T08:27:25.1820000Z Result: true
2026-07-08T08:27:25.5340000Z Requested labels: ubuntu-latest
2026-07-08T08:27:25.5340000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:27:25.5340000Z Waiting for a runner to pick up this job...
2026-07-08T08:27:25.5460000Z Job is about to start running on the hosted runner: GitHub Actions 1000001018
2026-07-08T08:27:25.5480000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.