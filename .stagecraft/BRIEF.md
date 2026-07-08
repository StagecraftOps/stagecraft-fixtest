# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the sum is being divided by the wrong denominator (e.g., dividing by `n+1` or using integer division that truncates incorrectly), or the accumulation itself is wrong. The test at `src/math.test.ts:6` is correct: the mean of [2, 4, 6] is unambiguously 4.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] = 4), so the bug lies in the implementation of the `average` function in the application source code, not in the CI workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:55.5978609Z ##[endgroup]
2026-07-08T08:53:55.7069328Z 
2026-07-08T08:53:55.7070407Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:53:55.7071131Z > tsc --noEmit
2026-07-08T08:53:55.7071411Z 
﻿2026-07-08T08:53:56.5696845Z ##[group]Run npm run test
2026-07-08T08:53:56.5697176Z [36;1mnpm run test[0m
2026-07-08T08:53:56.5729524Z shell: /usr/bin/bash -e {0}
2026-07-08T08:53:56.5729803Z ##[endgroup]
2026-07-08T08:53:56.6866134Z 
2026-07-08T08:53:56.6867139Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:53:56.6867819Z > vitest run
2026-07-08T08:53:56.6868068Z 
2026-07-08T08:53:57.0137102Z 
2026-07-08T08:53:57.0140841Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:53:57.0141953Z 
2026-07-08T08:53:57.3540940Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:53:57.3542795Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:53:57.3543584Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:57.3642672Z 
2026-07-08T08:53:57.3649965Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:53:57.3650795Z 
2026-07-08T08:53:57.3653830Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:53:57.3656429Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:57.3657120Z 
2026-07-08T08:53:57.3657364Z - Expected
2026-07-08T08:53:57.3657760Z + Received
2026-07-08T08:53:57.3657961Z 
2026-07-08T08:53:57.3658127Z - 4
2026-07-08T08:53:57.3658481Z + 3
2026-07-08T08:53:57.3658695Z 
2026-07-08T08:53:57.3659469Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:53:57.3809536Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:57.3811288Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:57.3813510Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:53:57.3815460Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:53:57.3815962Z 
2026-07-08T08:53:57.3816384Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:53:57.3816989Z     [90m  8| [39m
2026-07-08T08:53:57.3849775Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:53:57.3862971Z 
2026-07-08T08:53:57.3863848Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:53:57.3864385Z 
2026-07-08T08:53:57.3865463Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:53:57.3867150Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:53:57.3868517Z [2m   Start at [22m 08:53:57
2026-07-08T08:53:57.3870454Z [2m   Duration [22m 350ms[2m (transform 42ms, setup 0ms, collect 44ms, tests 9ms, environment 0ms, prepare 87ms)[22m
2026-07-08T08:53:57.3871252Z 
2026-07-08T08:53:57.4062684Z ##[error]Process completed with exit code 1.
2026-07-08T08:53:42.2060000Z Evaluating test.if
2026-07-08T08:53:42.2060000Z Evaluating: success()
2026-07-08T08:53:42.2060000Z Result: true
2026-07-08T08:53:42.2110000Z Requested labels: ubuntu-latest
2026-07-08T08:53:42.2110000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:53:42.2110000Z Waiting for a runner to pick up this job...
2026-07-08T08:53:42.4820000Z Job is about to start running on the hosted runner: GitHub Actions 1000001176
2026-07-08T08:53:42.4810000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.