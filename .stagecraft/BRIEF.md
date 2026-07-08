# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]` it returns `3` instead of the correct mean of `4`. This indicates a bug in the implementation — likely summing the values but dividing by the wrong count (e.g., dividing by the length of the array plus one, or off-by-one in the accumulation logic), causing the function to produce `3` (sum=9, divisor=3 gives 3, but 2+4+6=12, 12/3=4 — suggesting the sum itself is wrong, e.g. only summing 2 of the 3 values: 2+4=6, 6/2=3, pointing to an off-by-one in the iteration loop).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` fails because the `average` function returns `3` — this is a logic bug in the application source code (e.g. an off-by-one error in the sum/iteration), not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:36.9859423Z ##[endgroup]
2026-07-08T08:31:37.1015990Z 
2026-07-08T08:31:37.1017140Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:31:37.1017753Z > tsc --noEmit
2026-07-08T08:31:37.1017972Z 
﻿2026-07-08T08:31:38.0031108Z ##[group]Run npm run test
2026-07-08T08:31:38.0031465Z [36;1mnpm run test[0m
2026-07-08T08:31:38.0064590Z shell: /usr/bin/bash -e {0}
2026-07-08T08:31:38.0064898Z ##[endgroup]
2026-07-08T08:31:38.1199212Z 
2026-07-08T08:31:38.1200132Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:31:38.1200638Z > vitest run
2026-07-08T08:31:38.1200813Z 
2026-07-08T08:31:38.4512675Z 
2026-07-08T08:31:38.4516868Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:31:38.4517780Z 
2026-07-08T08:31:38.7795379Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:31:38.7797859Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:31:38.7798883Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:31:38.7913944Z 
2026-07-08T08:31:38.7922356Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:31:38.7923118Z 
2026-07-08T08:31:38.7926631Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:31:38.7928333Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:31:38.7929224Z 
2026-07-08T08:31:38.7929520Z - Expected
2026-07-08T08:31:38.7929959Z + Received
2026-07-08T08:31:38.7930478Z 
2026-07-08T08:31:38.7930726Z - 4
2026-07-08T08:31:38.7931116Z + 3
2026-07-08T08:31:38.7931453Z 
2026-07-08T08:31:38.7932078Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:31:38.8096016Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:31:38.8098029Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:31:38.8100127Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:31:38.8101747Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:31:38.8102533Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:31:38.8103172Z     [90m  8| [39m
2026-07-08T08:31:38.8103415Z 
2026-07-08T08:31:38.8104046Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:31:38.8104474Z 
2026-07-08T08:31:38.8104526Z 
2026-07-08T08:31:38.8138440Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:31:38.8151843Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:31:38.8153301Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:31:38.8154363Z [2m   Start at [22m 08:31:38
2026-07-08T08:31:38.8155776Z [2m   Duration [22m 340ms[2m (transform 42ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 80ms)[22m
2026-07-08T08:31:38.8157098Z 
2026-07-08T08:31:38.8350968Z ##[error]Process completed with exit code 1.
2026-07-08T08:31:24.7300000Z Evaluating test.if
2026-07-08T08:31:24.7300000Z Evaluating: success()
2026-07-08T08:31:24.7300000Z Result: true
2026-07-08T08:31:24.7320000Z Requested labels: ubuntu-latest
2026-07-08T08:31:24.7320000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:31:24.7320000Z Waiting for a runner to pick up this job...
2026-07-08T08:31:24.7450000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:31:24.7470000Z Job is about to start running on the hosted runner: GitHub Actions 1000001051
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.