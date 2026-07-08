# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This is a logic bug in the implementation — most likely the sum is being divided by the wrong count (e.g., dividing by `arr.length + 1`, using integer division, or an off-by-one error in the accumulation/divisor logic).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a bug in the application's `average` function returning 3 instead of 4, which can only be fixed by correcting the source code logic, not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:32.8287331Z ##[endgroup]
2026-07-08T08:30:32.9395064Z 
2026-07-08T08:30:32.9396014Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:30:32.9396560Z > tsc --noEmit
2026-07-08T08:30:32.9396757Z 
﻿2026-07-08T08:30:33.8137857Z ##[group]Run npm run test
2026-07-08T08:30:33.8138200Z [36;1mnpm run test[0m
2026-07-08T08:30:33.8170699Z shell: /usr/bin/bash -e {0}
2026-07-08T08:30:33.8170987Z ##[endgroup]
2026-07-08T08:30:33.9343707Z 
2026-07-08T08:30:33.9344488Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:30:33.9345141Z > vitest run
2026-07-08T08:30:33.9345334Z 
2026-07-08T08:30:34.2681782Z 
2026-07-08T08:30:34.2686130Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:30:34.2687079Z 
2026-07-08T08:30:34.6220606Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:30:34.6222214Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:30:34.6223300Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:30:34.6354158Z 
2026-07-08T08:30:34.6363269Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:30:34.6363771Z 
2026-07-08T08:30:34.6366995Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:30:34.6368873Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:30:34.6369504Z 
2026-07-08T08:30:34.6369736Z - Expected
2026-07-08T08:30:34.6370110Z + Received
2026-07-08T08:30:34.6370299Z 
2026-07-08T08:30:34.6370434Z - 4
2026-07-08T08:30:34.6370782Z + 3
2026-07-08T08:30:34.6370912Z 
2026-07-08T08:30:34.6371823Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:30:34.6612229Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:34.6614181Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:30:34.6616308Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:30:34.6617867Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:30:34.6618587Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:30:34.6619193Z     [90m  8| [39m
2026-07-08T08:30:34.6619461Z 
2026-07-08T08:30:34.6620067Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:30:34.6620477Z 
2026-07-08T08:30:34.6620518Z 
2026-07-08T08:30:34.6653841Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:30:34.6667569Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:30:34.6669145Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:30:34.6669943Z [2m   Start at [22m 08:30:34
2026-07-08T08:30:34.6670768Z [2m   Duration [22m 367ms[2m (transform 42ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:30:34.6671382Z 
2026-07-08T08:30:34.6863123Z ##[error]Process completed with exit code 1.
2026-07-08T08:30:20.5770000Z Evaluating test.if
2026-07-08T08:30:20.5770000Z Evaluating: success()
2026-07-08T08:30:20.5770000Z Result: true
2026-07-08T08:30:20.5870000Z Requested labels: ubuntu-latest
2026-07-08T08:30:20.5870000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:30:20.5870000Z Waiting for a runner to pick up this job...
2026-07-08T08:30:20.7410000Z Job is about to start running on the hosted runner: GitHub Actions 1000001046
2026-07-08T08:30:20.7410000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.