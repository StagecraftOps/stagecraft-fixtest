# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns the wrong value. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean: (2+4+6)/3 = 4), but the function returns `3`. This indicates a bug in the implementation — most likely the function is summing the elements and dividing by the wrong denominator, or using an off-by-one error (e.g., dividing by `n+1` instead of `n`, yielding 12/4=3 instead of 12/3=4).

## Why this is a code-level issue, not a pipeline config issue

The assertion failure is a genuine logic bug in the `average` function's source implementation — it returns 3 instead of the correct mean of 4 — which cannot be fixed by any change to the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:45.7549053Z ##[endgroup]
2026-07-08T08:54:45.8659568Z 
2026-07-08T08:54:45.8660181Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:54:45.8660672Z > tsc --noEmit
2026-07-08T08:54:45.8661228Z 
﻿2026-07-08T08:54:46.7536896Z ##[group]Run npm run test
2026-07-08T08:54:46.7537265Z [36;1mnpm run test[0m
2026-07-08T08:54:46.7569826Z shell: /usr/bin/bash -e {0}
2026-07-08T08:54:46.7570094Z ##[endgroup]
2026-07-08T08:54:46.8698098Z 
2026-07-08T08:54:46.8698872Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:54:46.8699496Z > vitest run
2026-07-08T08:54:46.8699738Z 
2026-07-08T08:54:47.2161851Z 
2026-07-08T08:54:47.2165548Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:54:47.2166551Z 
2026-07-08T08:54:47.5474548Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:54:47.5476607Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:54:47.5477507Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:47.5576564Z 
2026-07-08T08:54:47.5583514Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:54:47.5584147Z 
2026-07-08T08:54:47.5586971Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:54:47.5588975Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:47.5589629Z 
2026-07-08T08:54:47.5589824Z - Expected
2026-07-08T08:54:47.5590162Z + Received
2026-07-08T08:54:47.5590346Z 
2026-07-08T08:54:47.5590498Z - 4
2026-07-08T08:54:47.5590826Z + 3
2026-07-08T08:54:47.5591014Z 
2026-07-08T08:54:47.5591590Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:54:47.5737757Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:47.5739516Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:47.5741541Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:54:47.5742937Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:54:47.5743678Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:54:47.5744283Z     [90m  8| [39m
2026-07-08T08:54:47.5744543Z 
2026-07-08T08:54:47.5745141Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:54:47.5745558Z 
2026-07-08T08:54:47.5745592Z 
2026-07-08T08:54:47.5775255Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:54:47.5787202Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:54:47.5788041Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:54:47.5788631Z [2m   Start at [22m 08:54:47
2026-07-08T08:54:47.5789395Z [2m   Duration [22m 341ms[2m (transform 53ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 89ms)[22m
2026-07-08T08:54:47.5789918Z 
2026-07-08T08:54:47.5982407Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:33.9350000Z Job is about to start running on the hosted runner: GitHub Actions 1000001183
2026-07-08T08:54:33.9300000Z Evaluating test.if
2026-07-08T08:54:33.9300000Z Evaluating: success()
2026-07-08T08:54:33.9300000Z Result: true
2026-07-08T08:54:33.9350000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:54:33.9340000Z Requested labels: ubuntu-latest
2026-07-08T08:54:33.9340000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:33.9340000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.