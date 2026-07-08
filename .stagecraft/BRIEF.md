# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is summing the values and dividing by the wrong count (e.g., dividing by 4 instead of 3, or using a wrong accumulator), or it is computing a median/wrong aggregation instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
06.2177393Z ##[endgroup]
2026-07-08T08:42:06.3259962Z 
2026-07-08T08:42:06.3260708Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:42:06.3261183Z > tsc --noEmit
2026-07-08T08:42:06.3261329Z 
﻿2026-07-08T08:42:07.2004564Z ##[group]Run npm run test
2026-07-08T08:42:07.2005129Z [36;1mnpm run test[0m
2026-07-08T08:42:07.2038205Z shell: /usr/bin/bash -e {0}
2026-07-08T08:42:07.2038474Z ##[endgroup]
2026-07-08T08:42:07.3190689Z 
2026-07-08T08:42:07.3191438Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:42:07.3192184Z > vitest run
2026-07-08T08:42:07.3192557Z 
2026-07-08T08:42:07.6847418Z 
2026-07-08T08:42:07.6878987Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:42:07.6907300Z 
2026-07-08T08:42:08.0597519Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:42:08.0599497Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:42:08.0600767Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:08.0719260Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:42:08.0720116Z 
2026-07-08T08:42:08.0722045Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:42:08.0724115Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:08.0724852Z 
2026-07-08T08:42:08.0725315Z - Expected
2026-07-08T08:42:08.0725833Z + Received
2026-07-08T08:42:08.0726191Z 
2026-07-08T08:42:08.0726712Z - 4
2026-07-08T08:42:08.0726932Z 
2026-07-08T08:42:08.0727265Z + 3
2026-07-08T08:42:08.0727608Z 
2026-07-08T08:42:08.0728298Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:42:08.0976784Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:08.0978451Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:08.0980574Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:42:08.0981566Z 
2026-07-08T08:42:08.0982125Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:42:08.0982917Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:42:08.0983543Z     [90m  8| [39m
2026-07-08T08:42:08.0983929Z 
2026-07-08T08:42:08.0984544Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:42:08.0985054Z 
2026-07-08T08:42:08.1036108Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:42:08.1049196Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:42:08.1050651Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:42:08.1051704Z [2m   Start at [22m 08:42:07
2026-07-08T08:42:08.1053158Z [2m   Duration [22m 386ms[2m (transform 52ms, setup 0ms, collect 36ms, tests 9ms, environment 0ms, prepare 129ms)[22m
2026-07-08T08:42:08.1054256Z 
2026-07-08T08:42:08.1253919Z ##[error]Process completed with exit code 1.
2026-07-08T08:41:57.5380000Z Evaluating test.if
2026-07-08T08:41:57.5380000Z Evaluating: success()
2026-07-08T08:41:57.5380000Z Result: true
2026-07-08T08:41:57.5390000Z Requested labels: ubuntu-latest
2026-07-08T08:41:57.5390000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:41:57.5390000Z Waiting for a runner to pick up this job...
2026-07-08T08:41:57.9490000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:41:57.9490000Z Job is about to start running on the hosted runner: GitHub Actions 1000001104
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.