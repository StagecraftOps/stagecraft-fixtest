# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation — most likely the function is summing the values correctly (sum=12) but dividing by the wrong denominator (e.g., dividing by `array.length + 1` = 4 giving 3, or using some other off-by-one error), or it is computing the median instead of the mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion at `src/math.test.ts:6` fails because the `average` function itself returns the wrong value (3 instead of 4), which is an application logic bug in the source code that cannot be resolved by modifying the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:06.2236177Z ##[endgroup]
2026-07-08T08:18:06.3371801Z 
2026-07-08T08:18:06.3372612Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:18:06.3373272Z > tsc --noEmit
2026-07-08T08:18:06.3373420Z 
﻿2026-07-08T08:18:07.1724029Z ##[group]Run npm run test
2026-07-08T08:18:07.1724537Z [36;1mnpm run test[0m
2026-07-08T08:18:07.1759555Z shell: /usr/bin/bash -e {0}
2026-07-08T08:18:07.1759830Z ##[endgroup]
2026-07-08T08:18:07.2929206Z 
2026-07-08T08:18:07.2930284Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:18:07.2930862Z > vitest run
2026-07-08T08:18:07.2931071Z 
2026-07-08T08:18:07.6520585Z 
2026-07-08T08:18:07.6523672Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:18:07.6524819Z 
2026-07-08T08:18:07.9719331Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:18:07.9720545Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:18:07.9721262Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:18:07.9826781Z 
2026-07-08T08:18:07.9834124Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:18:07.9835005Z 
2026-07-08T08:18:07.9837722Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:18:07.9839600Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:18:07.9840199Z 
2026-07-08T08:18:07.9840374Z - Expected
2026-07-08T08:18:07.9840859Z + Received
2026-07-08T08:18:07.9841050Z 
2026-07-08T08:18:07.9841190Z - 4
2026-07-08T08:18:07.9841484Z + 3
2026-07-08T08:18:07.9841640Z 
2026-07-08T08:18:07.9842260Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:18:07.9991756Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:18:07.9993504Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:18:07.9995192Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:18:07.9996537Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:18:07.9997136Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:18:07.9997625Z     [90m  8| [39m
2026-07-08T08:18:07.9997830Z 
2026-07-08T08:18:07.9998332Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:18:07.9998685Z 
2026-07-08T08:18:07.9998717Z 
2026-07-08T08:18:08.0029133Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:18:08.0041305Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:18:08.0042158Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:18:08.0073231Z [2m   Start at [22m 08:18:07
2026-07-08T08:18:08.0074373Z [2m   Duration [22m 330ms[2m (transform 40ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 76ms)[22m
2026-07-08T08:18:08.0074898Z 
2026-07-08T08:18:08.0265634Z ##[error]Process completed with exit code 1.
2026-07-08T08:17:56.0010000Z Evaluating test.if
2026-07-08T08:17:56.0010000Z Evaluating: success()
2026-07-08T08:17:56.0010000Z Result: true
2026-07-08T08:17:56.1960000Z Requested labels: ubuntu-latest
2026-07-08T08:17:56.1960000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:17:56.1960000Z Waiting for a runner to pick up this job...
2026-07-08T08:17:56.2070000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:17:56.2100000Z Job is about to start running on the hosted runner: GitHub Actions 1000000976
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.