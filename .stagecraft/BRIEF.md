# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — for example, the function may be computing the median, using integer division incorrectly, or summing with an off-by-one error (e.g., dividing by `array.length + 1` instead of `array.length`, since 12 / 4 = 3 instead of 12 / 3 = 4).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:51:50.5026045Z 
﻿2026-07-08T08:51:51.2827514Z ##[group]Run npm run test
2026-07-08T08:51:51.2827820Z [36;1mnpm run test[0m
2026-07-08T08:51:51.2847329Z shell: /usr/bin/bash -e {0}
2026-07-08T08:51:51.2847610Z ##[endgroup]
2026-07-08T08:51:51.3831260Z 
2026-07-08T08:51:51.3832002Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:51:51.3832432Z > vitest run
2026-07-08T08:51:51.3832570Z 
2026-07-08T08:51:51.6838520Z 
2026-07-08T08:51:51.6842511Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:51:51.6843420Z 
2026-07-08T08:51:51.9829131Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:51:51.9830765Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:51:51.9831842Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:51.9920968Z 
2026-07-08T08:51:51.9928154Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:51:51.9928721Z 
2026-07-08T08:51:51.9931388Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:51:51.9933019Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:51:51.9933929Z 
2026-07-08T08:51:51.9934254Z - Expected
2026-07-08T08:51:51.9934771Z + Received
2026-07-08T08:51:51.9935186Z 
2026-07-08T08:51:51.9935591Z - 4
2026-07-08T08:51:51.9935917Z + 3
2026-07-08T08:51:51.9936064Z 
2026-07-08T08:51:51.9936890Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:51:52.0068245Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:52.0069940Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:51:52.0071891Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:51:52.0072724Z 
2026-07-08T08:51:52.0073557Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:51:52.0127785Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:51:52.0139140Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:51:52.0139769Z     [90m  8| [39m
2026-07-08T08:51:52.0140025Z 
2026-07-08T08:51:52.0140494Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:51:52.0140877Z 
2026-07-08T08:51:52.0141414Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:51:52.0143001Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:51:52.0144060Z [2m   Start at [22m 08:51:51
2026-07-08T08:51:52.0145388Z [2m   Duration [22m 308ms[2m (transform 40ms, setup 0ms, collect 28ms, tests 8ms, environment 0ms, prepare 85ms)[22m
2026-07-08T08:51:52.0146032Z 
2026-07-08T08:51:52.0250992Z ##[error]Process completed with exit code 1.
2026-07-08T08:51:36.3290000Z Evaluating test.if
2026-07-08T08:51:36.3290000Z Evaluating: success()
2026-07-08T08:51:36.3290000Z Result: true
2026-07-08T08:51:36.3280000Z Requested labels: ubuntu-latest
2026-07-08T08:51:36.3280000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:51:36.3280000Z Waiting for a runner to pick up this job...
2026-07-08T08:51:36.7180000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:51:39.0410000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:51:39.0420000Z Job is about to start running on the hosted runner: GitHub Actions 1000001165
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.