# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation — most likely the function is computing the sum divided by the wrong denominator (e.g., dividing by `numbers.length + 1`, or using integer/floor division incorrectly, or summing incorrectly). The test at `src/math.test.ts:6` is correct: `average([2, 4, 6])` should equal `4` ((2+4+6)/3 = 4), but the implementation returns `3`.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct and the failure is caused by a bug in the application's `average` function implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:33.2515979Z ##[endgroup]
2026-07-08T08:27:33.3648607Z 
2026-07-08T08:27:33.3649507Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:27:33.3650127Z > tsc --noEmit
2026-07-08T08:27:33.3650365Z 
﻿2026-07-08T08:27:34.2162451Z ##[group]Run npm run test
2026-07-08T08:27:34.2162973Z [36;1mnpm run test[0m
2026-07-08T08:27:34.2197995Z shell: /usr/bin/bash -e {0}
2026-07-08T08:27:34.2198278Z ##[endgroup]
2026-07-08T08:27:34.3351274Z 
2026-07-08T08:27:34.3352137Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:27:34.3352558Z > vitest run
2026-07-08T08:27:34.3352698Z 
2026-07-08T08:27:34.6807082Z 
2026-07-08T08:27:34.6810799Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:27:34.6812296Z 
2026-07-08T08:27:35.0175234Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:27:35.0176966Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:27:35.0177899Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:35.0275664Z 
2026-07-08T08:27:35.0283502Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:27:35.0284127Z 
2026-07-08T08:27:35.0286529Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:27:35.0288627Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:35.0289240Z 
2026-07-08T08:27:35.0289408Z - Expected
2026-07-08T08:27:35.0289759Z + Received
2026-07-08T08:27:35.0290068Z 
2026-07-08T08:27:35.0290508Z - 4
2026-07-08T08:27:35.0290803Z + 3
2026-07-08T08:27:35.0290961Z 
2026-07-08T08:27:35.0291411Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:27:35.0440012Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:35.0441356Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:35.0443000Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:27:35.0444369Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:27:35.0444967Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:27:35.0445432Z     [90m  8| [39m
2026-07-08T08:27:35.0445633Z 
2026-07-08T08:27:35.0446341Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:27:35.0446702Z 
2026-07-08T08:27:35.0446737Z 
2026-07-08T08:27:35.0477904Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:27:35.0491191Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:27:35.0492708Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:27:35.0493604Z [2m   Start at [22m 08:27:34
2026-07-08T08:27:35.0494819Z [2m   Duration [22m 347ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 66ms)[22m
2026-07-08T08:27:35.0495525Z 
2026-07-08T08:27:35.0702553Z ##[error]Process completed with exit code 1.
2026-07-08T08:27:21.9750000Z Requested labels: ubuntu-latest
2026-07-08T08:27:21.9750000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:27:21.9750000Z Waiting for a runner to pick up this job...
2026-07-08T08:27:21.9720000Z Evaluating test.if
2026-07-08T08:27:21.9720000Z Evaluating: success()
2026-07-08T08:27:21.9720000Z Result: true
2026-07-08T08:27:21.9810000Z Job is about to start running on the hosted runner: GitHub Actions 1000001016
2026-07-08T08:27:21.9810000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.