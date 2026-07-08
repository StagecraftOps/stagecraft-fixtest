# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by a wrong divisor (e.g., dividing by `length + 1`, using integer division incorrectly, or off-by-one in element counting). The test at `src/math.test.ts:6` is correct: `average([2, 4, 6])` should equal `4`.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is logically correct (mean of [2,4,6] is 4), so the bug lies in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:44.6768342Z ##[endgroup]
2026-07-08T08:38:44.7880920Z 
2026-07-08T08:38:44.7881782Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:38:44.7882758Z > tsc --noEmit
2026-07-08T08:38:44.7883533Z 
﻿2026-07-08T08:38:45.6334995Z ##[group]Run npm run test
2026-07-08T08:38:45.6335327Z [36;1mnpm run test[0m
2026-07-08T08:38:45.6367404Z shell: /usr/bin/bash -e {0}
2026-07-08T08:38:45.6367667Z ##[endgroup]
2026-07-08T08:38:45.7453985Z 
2026-07-08T08:38:45.7454573Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:38:45.7454967Z > vitest run
2026-07-08T08:38:45.7455118Z 
2026-07-08T08:38:46.0747084Z 
2026-07-08T08:38:46.0751774Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:38:46.0753003Z 
2026-07-08T08:38:46.4056873Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:38:46.4058400Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:38:46.4059093Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:46.4159263Z 
2026-07-08T08:38:46.4166922Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:38:46.4167896Z 
2026-07-08T08:38:46.4171280Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:38:46.4173674Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:46.4174647Z 
2026-07-08T08:38:46.4174868Z - Expected
2026-07-08T08:38:46.4175277Z + Received
2026-07-08T08:38:46.4175853Z 
2026-07-08T08:38:46.4176036Z - 4
2026-07-08T08:38:46.4176384Z + 3
2026-07-08T08:38:46.4176591Z 
2026-07-08T08:38:46.4177694Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:38:46.4325963Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:46.4327457Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:46.4329427Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:38:46.4330925Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:38:46.4331590Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:38:46.4332624Z     [90m  8| [39m
2026-07-08T08:38:46.4332930Z 
2026-07-08T08:38:46.4333524Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:38:46.4333934Z 
2026-07-08T08:38:46.4333959Z 
2026-07-08T08:38:46.4365897Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:38:46.4378105Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:38:46.4379433Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:38:46.4380792Z [2m   Start at [22m 08:38:46
2026-07-08T08:38:46.4382530Z [2m   Duration [22m 341ms[2m (transform 42ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 81ms)[22m
2026-07-08T08:38:46.4383541Z 
2026-07-08T08:38:46.4562755Z ##[error]Process completed with exit code 1.
2026-07-08T08:38:32.5620000Z Evaluating test.if
2026-07-08T08:38:32.5620000Z Evaluating: success()
2026-07-08T08:38:32.5620000Z Result: true
2026-07-08T08:38:32.8980000Z Requested labels: ubuntu-latest
2026-07-08T08:38:32.8980000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:38:32.8980000Z Waiting for a runner to pick up this job...
2026-07-08T08:38:32.9070000Z Job is about to start running on the hosted runner: GitHub Actions 1000001084
2026-07-08T08:38:32.9060000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.