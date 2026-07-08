# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect value. The test at `src/math.test.ts:6` calls `average([2, 4, 6])` and expects `4` (the correct mean), but the function returns `3`. This indicates a bug in the implementation — likely summing the values correctly but dividing by the wrong count (e.g., dividing by 4 instead of 3, or using integer/floor division incorrectly, or off-by-one in the element count).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by incorrect application logic in the `average` function, not by any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:12.2278047Z ##[endgroup]
2026-07-08T08:23:12.3479042Z 
2026-07-08T08:23:12.3479809Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:23:12.3480370Z > tsc --noEmit
2026-07-08T08:23:12.3481087Z 
﻿2026-07-08T08:23:13.2407099Z ##[group]Run npm run test
2026-07-08T08:23:13.2407426Z [36;1mnpm run test[0m
2026-07-08T08:23:13.2441070Z shell: /usr/bin/bash -e {0}
2026-07-08T08:23:13.2441353Z ##[endgroup]
2026-07-08T08:23:13.3611073Z 
2026-07-08T08:23:13.3611931Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:23:13.3612529Z > vitest run
2026-07-08T08:23:13.3612754Z 
2026-07-08T08:23:13.7082578Z 
2026-07-08T08:23:13.7087290Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:23:13.7088191Z 
2026-07-08T08:23:14.0453925Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:23:14.0456559Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:23:14.0457820Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:23:14.0563193Z 
2026-07-08T08:23:14.0570659Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:23:14.0571281Z 
2026-07-08T08:23:14.0574623Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:23:14.0576499Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:23:14.0577173Z 
2026-07-08T08:23:14.0577868Z - Expected
2026-07-08T08:23:14.0578248Z + Received
2026-07-08T08:23:14.0578480Z 
2026-07-08T08:23:14.0578627Z - 4
2026-07-08T08:23:14.0578949Z + 3
2026-07-08T08:23:14.0579132Z 
2026-07-08T08:23:14.0579675Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:23:14.0727915Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:23:14.0729487Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:23:14.0731479Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:23:14.0733026Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:23:14.0733781Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:23:14.0734630Z     [90m  8| [39m
2026-07-08T08:23:14.0734889Z 
2026-07-08T08:23:14.0735438Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:23:14.0735829Z 
2026-07-08T08:23:14.0735869Z 
2026-07-08T08:23:14.0768577Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:23:14.0781328Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:23:14.0782144Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:23:14.0782724Z [2m   Start at [22m 08:23:13
2026-07-08T08:23:14.0783530Z [2m   Duration [22m 348ms[2m (transform 46ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 91ms)[22m
2026-07-08T08:23:14.0784042Z 
2026-07-08T08:23:14.0981737Z ##[error]Process completed with exit code 1.
2026-07-08T08:22:59.2140000Z Requested labels: ubuntu-latest
2026-07-08T08:22:59.2140000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:22:59.2140000Z Waiting for a runner to pick up this job...
2026-07-08T08:22:59.2120000Z Evaluating test.if
2026-07-08T08:22:59.2120000Z Evaluating: success()
2026-07-08T08:22:59.2120000Z Result: true
2026-07-08T08:22:59.5280000Z Job is about to start running on the hosted runner: GitHub Actions 1000000995
2026-07-08T08:22:59.5270000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.