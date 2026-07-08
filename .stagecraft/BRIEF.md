# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean value of `4`. This indicates a bug in the average/mean calculation logic — most likely the function is computing a sum then dividing by the wrong count, or using integer division incorrectly (e.g. dividing by `numbers.length + 1` or off-by-one in accumulation), causing it to return the median or an otherwise wrong value instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` fails because the implementation returns `3`, which is a genuine logic bug in the `average` function's source code, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:43.2294993Z ##[endgroup]
2026-07-08T08:42:43.3455287Z 
2026-07-08T08:42:43.3455700Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:42:43.3456452Z > tsc --noEmit
2026-07-08T08:42:43.3456781Z 
﻿2026-07-08T08:42:44.1915410Z ##[group]Run npm run test
2026-07-08T08:42:44.1915724Z [36;1mnpm run test[0m
2026-07-08T08:42:44.1948334Z shell: /usr/bin/bash -e {0}
2026-07-08T08:42:44.1948613Z ##[endgroup]
2026-07-08T08:42:44.3077722Z 
2026-07-08T08:42:44.3078516Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:42:44.3078968Z > vitest run
2026-07-08T08:42:44.3079132Z 
2026-07-08T08:42:44.6270143Z 
2026-07-08T08:42:44.6273488Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:42:44.6274341Z 
2026-07-08T08:42:44.9786880Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:42:44.9788777Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:42:44.9789920Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:44.9893261Z 
2026-07-08T08:42:44.9900507Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:42:44.9901239Z 
2026-07-08T08:42:44.9903758Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:42:44.9905558Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:42:44.9906444Z 
2026-07-08T08:42:44.9906906Z - Expected
2026-07-08T08:42:44.9907292Z + Received
2026-07-08T08:42:44.9907500Z 
2026-07-08T08:42:44.9907649Z - 4
2026-07-08T08:42:44.9908139Z + 3
2026-07-08T08:42:44.9908375Z 
2026-07-08T08:42:44.9909361Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:42:45.0055658Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:45.0057743Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:42:45.0059973Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:42:45.0061739Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:42:45.0062160Z 
2026-07-08T08:42:45.0062571Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:42:45.0063155Z     [90m  8| [39m
2026-07-08T08:42:45.0063415Z 
2026-07-08T08:42:45.0063913Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:42:45.0064483Z 
2026-07-08T08:42:45.0136887Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:42:45.0150390Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:42:45.0151627Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:42:45.0152200Z [2m   Start at [22m 08:42:44
2026-07-08T08:42:45.0152933Z [2m   Duration [22m 362ms[2m (transform 44ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 78ms)[22m
2026-07-08T08:42:45.0153430Z 
2026-07-08T08:42:45.0295026Z ##[error]Process completed with exit code 1.
2026-07-08T08:42:31.0120000Z Evaluating test.if
2026-07-08T08:42:31.0120000Z Evaluating: success()
2026-07-08T08:42:31.0120000Z Result: true
2026-07-08T08:42:31.0240000Z Requested labels: ubuntu-latest
2026-07-08T08:42:31.0240000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:42:31.0240000Z Waiting for a runner to pick up this job...
2026-07-08T08:42:31.0340000Z Job is about to start running on the hosted runner: GitHub Actions 1000001107
2026-07-08T08:42:31.0340000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.