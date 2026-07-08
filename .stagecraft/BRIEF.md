# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by the wrong count, or using integer/floor division incorrectly (e.g., summing all elements but dividing by a value that yields 3 instead of 4, such as dividing 12 by 4 instead of 3, or summing only some elements).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:33:08.5968479Z 
﻿2026-07-08T08:33:09.5251169Z ##[group]Run npm run test
2026-07-08T08:33:09.5251922Z [36;1mnpm run test[0m
2026-07-08T08:33:09.5297727Z shell: /usr/bin/bash -e {0}
2026-07-08T08:33:09.5298135Z ##[endgroup]
2026-07-08T08:33:09.6469368Z 
2026-07-08T08:33:09.6470435Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:33:09.6471003Z > vitest run
2026-07-08T08:33:09.6471220Z 
2026-07-08T08:33:10.0091706Z 
2026-07-08T08:33:10.0109112Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:33:10.0126730Z 
2026-07-08T08:33:10.3769423Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:33:10.3771261Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:33:10.3772029Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:10.3883760Z 
2026-07-08T08:33:10.3891654Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:33:10.3892248Z 
2026-07-08T08:33:10.3895151Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:33:10.3897444Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:10.3898175Z 
2026-07-08T08:33:10.3898315Z - Expected
2026-07-08T08:33:10.3898652Z + Received
2026-07-08T08:33:10.3898854Z 
2026-07-08T08:33:10.3898999Z - 4
2026-07-08T08:33:10.3899316Z + 3
2026-07-08T08:33:10.3899479Z 
2026-07-08T08:33:10.3900717Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:33:10.4127744Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:10.4128306Z 
2026-07-08T08:33:10.4129453Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:10.4131216Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:33:10.4133635Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:33:10.4134392Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:33:10.4134874Z     [90m  8| [39m
2026-07-08T08:33:10.4135092Z 
2026-07-08T08:33:10.4178816Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:33:10.4191579Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:33:10.4192092Z 
2026-07-08T08:33:10.4192676Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:33:10.4194005Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:33:10.4195157Z [2m   Start at [22m 08:33:09
2026-07-08T08:33:10.4196745Z [2m   Duration [22m 379ms[2m (transform 50ms, setup 0ms, collect 36ms, tests 9ms, environment 0ms, prepare 93ms)[22m
2026-07-08T08:33:10.4197650Z 
2026-07-08T08:33:10.4413365Z ##[error]Process completed with exit code 1.
2026-07-08T08:32:04.2740000Z Evaluating test.if
2026-07-08T08:32:04.2740000Z Evaluating: success()
2026-07-08T08:32:04.2740000Z Result: true
2026-07-08T08:32:04.2790000Z Requested labels: ubuntu-latest
2026-07-08T08:32:04.2790000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:32:04.2790000Z Waiting for a runner to pick up this job...
2026-07-08T08:32:04.5840000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:32:58.6780000Z Job is about to start running on the hosted runner: GitHub Actions 1000001056
2026-07-08T08:32:58.6780000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.