# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests in `src/math.ts`) is returning 3 instead of 4 when called with `[2, 4, 6]`. The expected mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is returning 3. This indicates a bug in the `average` function's implementation — most likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` instead of `array.length`, or using incorrect summation logic).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug is in the `average` function's source code implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:30.8766470Z ##[endgroup]
2026-07-08T08:25:30.9846432Z 
2026-07-08T08:25:30.9847170Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:25:30.9847652Z > tsc --noEmit
2026-07-08T08:25:30.9847825Z 
﻿2026-07-08T08:25:31.8328525Z ##[group]Run npm run test
2026-07-08T08:25:31.8329083Z [36;1mnpm run test[0m
2026-07-08T08:25:31.8361525Z shell: /usr/bin/bash -e {0}
2026-07-08T08:25:31.8361791Z ##[endgroup]
2026-07-08T08:25:31.9446839Z 
2026-07-08T08:25:31.9447488Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:25:31.9447957Z > vitest run
2026-07-08T08:25:31.9448130Z 
2026-07-08T08:25:32.2742616Z 
2026-07-08T08:25:32.2746411Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:25:32.2753005Z 
2026-07-08T08:25:32.6003896Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:25:32.6005938Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:25:32.6007281Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:25:32.6108132Z 
2026-07-08T08:25:32.6116292Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:25:32.6117088Z 
2026-07-08T08:25:32.6119956Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:25:32.6121933Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:25:32.6122846Z 
2026-07-08T08:25:32.6123076Z - Expected
2026-07-08T08:25:32.6123646Z + Received
2026-07-08T08:25:32.6123861Z 
2026-07-08T08:25:32.6124116Z - 4
2026-07-08T08:25:32.6124655Z + 3
2026-07-08T08:25:32.6124986Z 
2026-07-08T08:25:32.6125897Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:25:32.6271735Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:25:32.6273673Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:25:32.6275873Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:25:32.6277639Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:25:32.6278059Z 
2026-07-08T08:25:32.6309999Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:25:32.6323279Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:25:32.6323684Z     [90m  8| [39m
2026-07-08T08:25:32.6323897Z 
2026-07-08T08:25:32.6324278Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:25:32.6324534Z 
2026-07-08T08:25:32.6324912Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:25:32.6325720Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:25:32.6326320Z [2m   Start at [22m 08:25:32
2026-07-08T08:25:32.6327127Z [2m   Duration [22m 336ms[2m (transform 42ms, setup 0ms, collect 29ms, tests 8ms, environment 0ms, prepare 86ms)[22m
2026-07-08T08:25:32.6327661Z 
2026-07-08T08:25:32.6517350Z ##[error]Process completed with exit code 1.
2026-07-08T08:25:22.3490000Z Evaluating test.if
2026-07-08T08:25:22.3490000Z Evaluating: success()
2026-07-08T08:25:22.3490000Z Result: true
2026-07-08T08:25:22.3550000Z Requested labels: ubuntu-latest
2026-07-08T08:25:22.3550000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:25:22.3550000Z Waiting for a runner to pick up this job...
2026-07-08T08:25:22.5770000Z Job is about to start running on the hosted runner: GitHub Actions 1000001004
2026-07-08T08:25:22.5780000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.