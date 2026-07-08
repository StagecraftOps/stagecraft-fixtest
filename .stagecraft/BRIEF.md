# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test at `src/math.test.ts:6` calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely the function is summing the values and dividing by the wrong denominator (e.g., dividing by `numbers.length + 1` instead of `numbers.length`), or is otherwise computing an incorrect sum or divisor.

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch in application logic — the `average()` function produces `3` instead of the mathematically correct mean `4` for input `[2, 4, 6]`, which must be fixed in the source implementation, not in the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:34.0928192Z ##[endgroup]
2026-07-08T08:49:34.2030413Z 
2026-07-08T08:49:34.2031540Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:49:34.2032351Z > tsc --noEmit
2026-07-08T08:49:34.2032620Z 
﻿2026-07-08T08:49:35.0704671Z ##[group]Run npm run test
2026-07-08T08:49:35.0705211Z [36;1mnpm run test[0m
2026-07-08T08:49:35.0737906Z shell: /usr/bin/bash -e {0}
2026-07-08T08:49:35.0738180Z ##[endgroup]
2026-07-08T08:49:35.1877641Z 
2026-07-08T08:49:35.1878410Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:49:35.1878861Z > vitest run
2026-07-08T08:49:35.1879008Z 
2026-07-08T08:49:35.5273918Z 
2026-07-08T08:49:35.5278245Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:49:35.5279040Z 
2026-07-08T08:49:35.8604394Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:49:35.8606192Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:49:35.8607325Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:49:35.8713664Z 
2026-07-08T08:49:35.8721731Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:49:35.8722419Z 
2026-07-08T08:49:35.8725792Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:49:35.8727482Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:49:35.8728062Z 
2026-07-08T08:49:35.8728232Z - Expected
2026-07-08T08:49:35.8728609Z + Received
2026-07-08T08:49:35.8729003Z 
2026-07-08T08:49:35.8729287Z - 4
2026-07-08T08:49:35.8729683Z + 3
2026-07-08T08:49:35.8730329Z 
2026-07-08T08:49:35.8730940Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:49:35.8881984Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:49:35.8883962Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:49:35.8886191Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:49:35.8887187Z 
2026-07-08T08:49:35.8919945Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:49:35.8931332Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:49:35.8932069Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:49:35.8932874Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:49:35.8934463Z [2m   Start at [22m 08:49:35
2026-07-08T08:49:35.8935333Z [2m   Duration [22m 344ms[2m (transform 42ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 80ms)[22m
2026-07-08T08:49:35.8935921Z 
2026-07-08T08:49:35.8936386Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:49:35.8937270Z     [90m  8| [39m
2026-07-08T08:49:35.8937794Z 
2026-07-08T08:49:35.8938518Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:49:35.8947636Z 
2026-07-08T08:49:35.9130756Z ##[error]Process completed with exit code 1.
2026-07-08T08:49:24.7480000Z Evaluating test.if
2026-07-08T08:49:24.7480000Z Evaluating: success()
2026-07-08T08:49:24.7480000Z Result: true
2026-07-08T08:49:24.7490000Z Requested labels: ubuntu-latest
2026-07-08T08:49:24.7490000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:49:24.7490000Z Waiting for a runner to pick up this job...
2026-07-08T08:49:24.7560000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:49:24.7560000Z Job is about to start running on the hosted runner: GitHub Actions 1000001149
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.