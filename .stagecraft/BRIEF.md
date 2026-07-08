# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the implementation — likely summing the values but dividing by the wrong denominator (e.g., dividing by the length + 1, or using integer/floor division incorrectly), or an off-by-one error in the sum/count logic.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the `average` function's source code implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:32.6583554Z ##[endgroup]
2026-07-08T08:39:32.7730989Z 
2026-07-08T08:39:32.7732004Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:39:32.7732659Z > tsc --noEmit
2026-07-08T08:39:32.7732900Z 
﻿2026-07-08T08:39:33.6005849Z ##[group]Run npm run test
2026-07-08T08:39:33.6006471Z [36;1mnpm run test[0m
2026-07-08T08:39:33.6039991Z shell: /usr/bin/bash -e {0}
2026-07-08T08:39:33.6040360Z ##[endgroup]
2026-07-08T08:39:33.7171038Z 
2026-07-08T08:39:33.7171858Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:39:33.7172480Z > vitest run
2026-07-08T08:39:33.7172735Z 
2026-07-08T08:39:34.0452842Z 
2026-07-08T08:39:34.0456765Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:39:34.0459331Z 
2026-07-08T08:39:34.3697371Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:39:34.3699267Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:39:34.3700383Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:39:34.3811661Z 
2026-07-08T08:39:34.3819419Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:39:34.3820075Z 
2026-07-08T08:39:34.3823392Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:39:34.3825417Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:39:34.3826119Z 
2026-07-08T08:39:34.3826350Z - Expected
2026-07-08T08:39:34.3826758Z + Received
2026-07-08T08:39:34.3826976Z 
2026-07-08T08:39:34.3827134Z - 4
2026-07-08T08:39:34.3827533Z + 3
2026-07-08T08:39:34.3827740Z 
2026-07-08T08:39:34.3828749Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:39:34.3976915Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:39:34.3979000Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:39:34.3981198Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:39:34.3982949Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:39:34.3983744Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:39:34.3984658Z     [90m  8| [39m
2026-07-08T08:39:34.3984931Z 
2026-07-08T08:39:34.3985545Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:39:34.3985990Z 
2026-07-08T08:39:34.3986031Z 
2026-07-08T08:39:34.4018092Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:39:34.4032429Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:39:34.4033854Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:39:34.4035490Z [2m   Start at [22m 08:39:34
2026-07-08T08:39:34.4036963Z [2m   Duration [22m 336ms[2m (transform 41ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 72ms)[22m
2026-07-08T08:39:34.4037929Z 
2026-07-08T08:39:34.4241541Z ##[error]Process completed with exit code 1.
2026-07-08T08:39:22.5440000Z Evaluating test.if
2026-07-08T08:39:22.5440000Z Evaluating: success()
2026-07-08T08:39:22.5440000Z Result: true
2026-07-08T08:39:22.5490000Z Requested labels: ubuntu-latest
2026-07-08T08:39:22.5490000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:39:22.5490000Z Waiting for a runner to pick up this job...
2026-07-08T08:39:22.7750000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:39:22.7750000Z Job is about to start running on the hosted runner: GitHub Actions 1000001090
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.