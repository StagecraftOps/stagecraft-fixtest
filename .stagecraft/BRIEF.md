# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect value. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation logic — most likely the function is computing the sum divided by a wrong count, or using integer division incorrectly (e.g. summing all values then dividing by the array length plus one, or off-by-one in the denominator). The test assertion `expect(average([2, 4, 6])).toBe(4)` is correct: the arithmetic mean of 2, 4, and 6 is (2+4+6)/3 = 4, but the implementation produces 3 (which would result from dividing the sum 12 by 4 instead of 3, or summing only 9 and dividing by 3).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine wrong-answer bug in the `average` function's implementation — the workflow and test assertion are both correct, so only fixing the source code logic can resolve this.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:56:13.9545993Z 
﻿2026-07-08T08:56:14.7952156Z ##[group]Run npm run test
2026-07-08T08:56:14.7952510Z [36;1mnpm run test[0m
2026-07-08T08:56:14.7985313Z shell: /usr/bin/bash -e {0}
2026-07-08T08:56:14.7985603Z ##[endgroup]
2026-07-08T08:56:14.9077252Z 
2026-07-08T08:56:14.9078375Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:56:14.9078801Z > vitest run
2026-07-08T08:56:14.9078951Z 
2026-07-08T08:56:15.2386277Z 
2026-07-08T08:56:15.2389913Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:56:15.2390824Z 
2026-07-08T08:56:15.5530352Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:56:15.5532059Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:56:15.5533484Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:15.5637023Z 
2026-07-08T08:56:15.5645359Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:56:15.5646164Z 
2026-07-08T08:56:15.5649014Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:56:15.5650852Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:15.5651551Z 
2026-07-08T08:56:15.5652166Z - Expected
2026-07-08T08:56:15.5652561Z + Received
2026-07-08T08:56:15.5652804Z 
2026-07-08T08:56:15.5653159Z - 4
2026-07-08T08:56:15.5653668Z + 3
2026-07-08T08:56:15.5654002Z 
2026-07-08T08:56:15.5655064Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:56:15.5802718Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:15.5804839Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:15.5807079Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:56:15.5808806Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:56:15.5809241Z 
2026-07-08T08:56:15.5841772Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:56:15.5853798Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:56:15.5854229Z     [90m  8| [39m
2026-07-08T08:56:15.5855116Z 
2026-07-08T08:56:15.5855758Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:56:15.5856177Z 
2026-07-08T08:56:15.5856803Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:56:15.5858362Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:56:15.5859368Z [2m   Start at [22m 08:56:15
2026-07-08T08:56:15.5860756Z [2m   Duration [22m 325ms[2m (transform 39ms, setup 1ms, collect 30ms, tests 8ms, environment 0ms, prepare 82ms)[22m
2026-07-08T08:56:15.5861705Z 
2026-07-08T08:56:15.6048758Z ##[error]Process completed with exit code 1.
2026-07-08T08:55:49.6460000Z Requested labels: ubuntu-latest
2026-07-08T08:55:49.6460000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:55:49.6460000Z Waiting for a runner to pick up this job...
2026-07-08T08:55:49.6440000Z Evaluating test.if
2026-07-08T08:55:49.6440000Z Evaluating: success()
2026-07-08T08:55:49.6440000Z Result: true
2026-07-08T08:55:50.1030000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:56:00.8910000Z Job is about to start running on the hosted runner: GitHub Actions 1000001195
2026-07-08T08:56:00.8910000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.