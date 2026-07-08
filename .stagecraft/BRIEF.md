# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing `sum / (n+1)` or `sum / (n-1)` incorrectly (e.g., dividing by `n+1=3` giving `12/4=3`, or possibly using integer division or an off-by-one in the denominator). The test expectation of `4` is mathematically correct for the input `[2, 4, 6]`, so the implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (mean of [2,4,6] is 4), so the bug lies in the application's `average` function implementation returning 3 instead of 4, which requires fixing the source code logic rather than the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:00.1849850Z ##[endgroup]
2026-07-08T08:17:00.2731740Z 
2026-07-08T08:17:00.2732486Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:17:00.2732949Z > tsc --noEmit
2026-07-08T08:17:00.2733115Z 
﻿2026-07-08T08:17:00.9449692Z ##[group]Run npm run test
2026-07-08T08:17:00.9450133Z [36;1mnpm run test[0m
2026-07-08T08:17:00.9478465Z shell: /usr/bin/bash -e {0}
2026-07-08T08:17:00.9478702Z ##[endgroup]
2026-07-08T08:17:01.0363488Z 
2026-07-08T08:17:01.0364303Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:17:01.0364755Z > vitest run
2026-07-08T08:17:01.0364928Z 
2026-07-08T08:17:01.2928903Z 
2026-07-08T08:17:01.2931911Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:17:01.2932568Z 
2026-07-08T08:17:01.5515914Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:17:01.5516863Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:17:01.5517410Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:17:01.5606579Z 
2026-07-08T08:17:01.5613118Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:17:01.5613779Z 
2026-07-08T08:17:01.5615618Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:17:01.5617347Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:17:01.5617994Z 
2026-07-08T08:17:01.5618133Z - Expected
2026-07-08T08:17:01.5618417Z + Received
2026-07-08T08:17:01.5618560Z 
2026-07-08T08:17:01.5618670Z - 4
2026-07-08T08:17:01.5618901Z + 3
2026-07-08T08:17:01.5619062Z 
2026-07-08T08:17:01.5619723Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:17:01.5738150Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:17:01.5739308Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:17:01.5740742Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:17:01.5742502Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:17:01.5742828Z 
2026-07-08T08:17:01.5769087Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:17:01.5779832Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:17:01.5780590Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:17:01.5792330Z     [90m  8| [39m
2026-07-08T08:17:01.5793191Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:17:01.5794292Z [2m   Start at [22m 08:17:01
2026-07-08T08:17:01.5801707Z [2m   Duration [22m 268ms[2m (transform 30ms, setup 0ms, collect 26ms, tests 7ms, environment 0ms, prepare 56ms)[22m
2026-07-08T08:17:01.5802430Z 
2026-07-08T08:17:01.5815052Z 
2026-07-08T08:17:01.5815521Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:17:01.5815837Z 
2026-07-08T08:17:01.5958297Z ##[error]Process completed with exit code 1.
2026-07-08T08:16:48.8990000Z Evaluating test.if
2026-07-08T08:16:48.8990000Z Evaluating: success()
2026-07-08T08:16:48.8990000Z Result: true
2026-07-08T08:16:49.3480000Z Requested labels: ubuntu-latest
2026-07-08T08:16:49.3480000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:16:49.3480000Z Waiting for a runner to pick up this job...
2026-07-08T08:16:49.3620000Z Job is about to start running on the hosted runner: GitHub Actions 1000000972
2026-07-08T08:16:49.3620000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.