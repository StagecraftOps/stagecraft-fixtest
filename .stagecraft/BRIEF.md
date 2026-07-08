# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by an incorrect count (e.g., dividing by 4 instead of 3, or summing only part of the array), or the sum/division logic is otherwise wrong. The test at `src/math.test.ts:6` is correct; the production code under test is not.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's source implementation returning 3 instead of 4, which requires fixing the application source code, not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:15.0519207Z ##[endgroup]
2026-07-08T08:47:15.1636888Z 
2026-07-08T08:47:15.1637443Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:47:15.1637969Z > tsc --noEmit
2026-07-08T08:47:15.1638183Z 
﻿2026-07-08T08:47:15.9659784Z ##[group]Run npm run test
2026-07-08T08:47:15.9660283Z [36;1mnpm run test[0m
2026-07-08T08:47:15.9695158Z shell: /usr/bin/bash -e {0}
2026-07-08T08:47:15.9695443Z ##[endgroup]
2026-07-08T08:47:16.0822973Z 
2026-07-08T08:47:16.0823613Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:47:16.0824061Z > vitest run
2026-07-08T08:47:16.0824201Z 
2026-07-08T08:47:16.4106375Z 
2026-07-08T08:47:16.4110405Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:47:16.4111219Z 
2026-07-08T08:47:16.7302020Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:47:16.7303398Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:47:16.7304230Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:47:16.7405184Z 
2026-07-08T08:47:16.7411833Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:47:16.7412737Z 
2026-07-08T08:47:16.7415763Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:47:16.7418236Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:47:16.7419060Z 
2026-07-08T08:47:16.7420203Z - Expected
2026-07-08T08:47:16.7420888Z + Received
2026-07-08T08:47:16.7421490Z 
2026-07-08T08:47:16.7421847Z - 4
2026-07-08T08:47:16.7422382Z + 3
2026-07-08T08:47:16.7422978Z 
2026-07-08T08:47:16.7423720Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:47:16.7566534Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:47:16.7568071Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:47:16.7569717Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:47:16.7571065Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:47:16.7571721Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:47:16.7572183Z     [90m  8| [39m
2026-07-08T08:47:16.7572399Z 
2026-07-08T08:47:16.7572888Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:47:16.7573256Z 
2026-07-08T08:47:16.7573285Z 
2026-07-08T08:47:16.7604462Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:47:16.7613782Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:47:16.7615154Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:47:16.7616166Z [2m   Start at [22m 08:47:16
2026-07-08T08:47:16.7617724Z [2m   Duration [22m 330ms[2m (transform 47ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 87ms)[22m
2026-07-08T08:47:16.7618513Z 
2026-07-08T08:47:16.7806111Z ##[error]Process completed with exit code 1.
2026-07-08T08:47:04.3450000Z Requested labels: ubuntu-latest
2026-07-08T08:47:04.3450000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:47:04.3450000Z Waiting for a runner to pick up this job...
2026-07-08T08:47:04.3450000Z Evaluating test.if
2026-07-08T08:47:04.3450000Z Evaluating: success()
2026-07-08T08:47:04.3450000Z Result: true
2026-07-08T08:47:04.3560000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:47:04.3570000Z Job is about to start running on the hosted runner: GitHub Actions 1000001139
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.