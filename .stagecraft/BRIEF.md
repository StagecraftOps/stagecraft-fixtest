# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with [2, 4, 6], it returns 3 instead of the expected mean of 4. This indicates a bug in the implementation — most likely the function is summing and dividing by the wrong count (e.g., using a hardcoded or off-by-one divisor), or it is computing a median/wrong aggregate instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the `average` function's source code returning 3 instead of 4, not in any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:42.0192107Z ##[endgroup]
2026-07-08T08:37:42.1338432Z 
2026-07-08T08:37:42.1339049Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:37:42.1339821Z > tsc --noEmit
2026-07-08T08:37:42.1340026Z 
﻿2026-07-08T08:37:42.9984421Z ##[group]Run npm run test
2026-07-08T08:37:42.9984925Z [36;1mnpm run test[0m
2026-07-08T08:37:43.0017224Z shell: /usr/bin/bash -e {0}
2026-07-08T08:37:43.0017493Z ##[endgroup]
2026-07-08T08:37:43.1142301Z 
2026-07-08T08:37:43.1142941Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:37:43.1143378Z > vitest run
2026-07-08T08:37:43.1143551Z 
2026-07-08T08:37:43.4548696Z 
2026-07-08T08:37:43.4552548Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:37:43.4555426Z 
2026-07-08T08:37:43.8069599Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:37:43.8071413Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:37:43.8072147Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:43.8181445Z 
2026-07-08T08:37:43.8211981Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:37:43.8231363Z 
2026-07-08T08:37:43.8232751Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:37:43.8262379Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:43.8263137Z 
2026-07-08T08:37:43.8263513Z - Expected
2026-07-08T08:37:43.8263909Z + Received
2026-07-08T08:37:43.8264106Z 
2026-07-08T08:37:43.8264411Z - 4
2026-07-08T08:37:43.8264847Z + 3
2026-07-08T08:37:43.8265128Z 
2026-07-08T08:37:43.8265877Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:37:43.8349628Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:43.8351577Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:43.8353747Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:37:43.8355487Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:37:43.8356341Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:37:43.8356992Z     [90m  8| [39m
2026-07-08T08:37:43.8357365Z 
2026-07-08T08:37:43.8358140Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:37:43.8358535Z 
2026-07-08T08:37:43.8361171Z 
2026-07-08T08:37:43.8397357Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:37:43.8408736Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:37:43.8410178Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:37:43.8421994Z [2m   Start at [22m 08:37:43
2026-07-08T08:37:43.8423650Z [2m   Duration [22m 363ms[2m (transform 46ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 83ms)[22m
2026-07-08T08:37:43.8424695Z 
2026-07-08T08:37:43.8604159Z ##[error]Process completed with exit code 1.
2026-07-08T08:37:33.2210000Z Requested labels: ubuntu-latest
2026-07-08T08:37:33.2210000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:37:33.2210000Z Waiting for a runner to pick up this job...
2026-07-08T08:37:33.2180000Z Evaluating test.if
2026-07-08T08:37:33.2180000Z Evaluating: success()
2026-07-08T08:37:33.2180000Z Result: true
2026-07-08T08:37:33.7140000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:37:33.7140000Z Job is about to start running on the hosted runner: GitHub Actions 1000001077
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.