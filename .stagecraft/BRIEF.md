# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the averaging logic — most likely the sum is being divided by the wrong value (e.g., dividing by the length plus one, or using integer division incorrectly), or the function is computing a median/minimum instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2+4+6=12, divided by 3 = 4), so the bug is in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:06.8012474Z ##[endgroup]
2026-07-08T08:27:06.9178373Z 
2026-07-08T08:27:06.9178904Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:27:06.9179501Z > tsc --noEmit
2026-07-08T08:27:06.9179753Z 
﻿2026-07-08T08:27:07.8052436Z ##[group]Run npm run test
2026-07-08T08:27:07.8052801Z [36;1mnpm run test[0m
2026-07-08T08:27:07.8086337Z shell: /usr/bin/bash -e {0}
2026-07-08T08:27:07.8086601Z ##[endgroup]
2026-07-08T08:27:07.9211768Z 
2026-07-08T08:27:07.9212236Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:27:07.9213032Z > vitest run
2026-07-08T08:27:07.9213213Z 
2026-07-08T08:27:08.2739128Z 
2026-07-08T08:27:08.2743682Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:27:08.2744902Z 
2026-07-08T08:27:08.6046397Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:27:08.6048591Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:27:08.6049720Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:08.6159039Z 
2026-07-08T08:27:08.6167518Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:27:08.6168247Z 
2026-07-08T08:27:08.6171364Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:27:08.6173184Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:08.6173785Z 
2026-07-08T08:27:08.6174139Z - Expected
2026-07-08T08:27:08.6174491Z + Received
2026-07-08T08:27:08.6174665Z 
2026-07-08T08:27:08.6174807Z - 4
2026-07-08T08:27:08.6175119Z + 3
2026-07-08T08:27:08.6175299Z 
2026-07-08T08:27:08.6175774Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:27:08.6375973Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:08.6377492Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:08.6379402Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:27:08.6380985Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:27:08.6381615Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:27:08.6382429Z     [90m  8| [39m
2026-07-08T08:27:08.6382663Z 
2026-07-08T08:27:08.6383189Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:27:08.6383593Z 
2026-07-08T08:27:08.6383633Z 
2026-07-08T08:27:08.6416025Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:27:08.6435718Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:27:08.6437071Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:27:08.6438176Z [2m   Start at [22m 08:27:08
2026-07-08T08:27:08.6439559Z [2m   Duration [22m 342ms[2m (transform 42ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 79ms)[22m
2026-07-08T08:27:08.6440424Z 
2026-07-08T08:27:08.6646051Z ##[error]Process completed with exit code 1.
2026-07-08T08:26:52.9380000Z Requested labels: ubuntu-latest
2026-07-08T08:26:52.9380000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:26:52.9380000Z Waiting for a runner to pick up this job...
2026-07-08T08:26:52.9400000Z Evaluating test.if
2026-07-08T08:26:52.9400000Z Evaluating: success()
2026-07-08T08:26:52.9400000Z Result: true
2026-07-08T08:26:53.4240000Z Job is about to start running on the hosted runner: GitHub Actions 1000001013
2026-07-08T08:26:53.4230000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.