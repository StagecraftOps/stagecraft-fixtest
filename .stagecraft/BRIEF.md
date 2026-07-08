# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.test.ts` (or the implementation it tests) is returning 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is producing 3 — indicating a bug in the `average` implementation (e.g. dividing by the wrong count, using integer truncation, or an off-by-one in the denominator).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:32.5869129Z ##[endgroup]
2026-07-08T08:42:32.6853959Z 
2026-07-08T08:42:32.6854796Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:42:32.6855299Z > tsc --noEmit
2026-07-08T08:42:32.6855430Z 
﻿2026-07-08T08:42:33.4748530Z ##[group]Run npm run test
2026-07-08T08:42:33.4748963Z [36;1mnpm run test[0m
2026-07-08T08:42:33.4768411Z shell: /usr/bin/bash -e {0}
2026-07-08T08:42:33.4768688Z ##[endgroup]
2026-07-08T08:42:33.5766490Z 
2026-07-08T08:42:33.5767182Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:42:33.5767697Z > vitest run
2026-07-08T08:42:33.5767902Z 
2026-07-08T08:42:33.8869416Z 
2026-07-08T08:42:33.8873306Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:42:33.8874451Z 
2026-07-08T08:42:34.1709537Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:42:34.1710884Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:42:34.1711954Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:34.1795789Z 
2026-07-08T08:42:34.1802963Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:42:34.1803579Z 
2026-07-08T08:42:34.1806460Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:42:34.1807917Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:34.1808420Z 
2026-07-08T08:42:34.1808590Z - Expected
2026-07-08T08:42:34.1808976Z + Received
2026-07-08T08:42:34.1809176Z 
2026-07-08T08:42:34.1809308Z - 4
2026-07-08T08:42:34.1809614Z + 3
2026-07-08T08:42:34.1809790Z 
2026-07-08T08:42:34.1810383Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:42:34.1947276Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:34.1948579Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:34.1950196Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:42:34.1951551Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:42:34.1952209Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:42:34.1952746Z     [90m  8| [39m
2026-07-08T08:42:34.1952956Z 
2026-07-08T08:42:34.1953377Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:42:34.1953710Z 
2026-07-08T08:42:34.1953740Z 
2026-07-08T08:42:34.1984920Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:42:34.1995778Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:42:34.1996846Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:42:34.1997580Z [2m   Start at [22m 08:42:33
2026-07-08T08:42:34.1998336Z [2m   Duration [22m 292ms[2m (transform 35ms, setup 0ms, collect 28ms, tests 7ms, environment 0ms, prepare 61ms)[22m
2026-07-08T08:42:34.1998795Z 
2026-07-08T08:42:34.2136269Z ##[error]Process completed with exit code 1.
2026-07-08T08:42:23.2090000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:42:23.2000000Z Evaluating test.if
2026-07-08T08:42:23.2000000Z Evaluating: success()
2026-07-08T08:42:23.2000000Z Result: true
2026-07-08T08:42:23.2020000Z Requested labels: ubuntu-latest
2026-07-08T08:42:23.2020000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:42:23.2020000Z Waiting for a runner to pick up this job...
2026-07-08T08:42:23.2100000Z Job is about to start running on the hosted runner: GitHub Actions 1000001105
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.