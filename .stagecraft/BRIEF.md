# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. When called with `[2, 4, 6]` the expected mean is `4`, but the function returns `3`. This indicates a bug in the average/mean calculation — most likely the sum is being divided by `(n+1)` or `(n-1)` instead of `n`, or the sum itself is computed incorrectly (e.g. off-by-one in a loop). The test at `src/math.test.ts:6` is correct; the implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug is in the application's `average` function implementation in source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:48.2281609Z ##[endgroup]
2026-07-08T08:23:48.3369414Z 
2026-07-08T08:23:48.3369942Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:23:48.3370480Z > tsc --noEmit
2026-07-08T08:23:48.3370989Z 
﻿2026-07-08T08:23:49.1983855Z ##[group]Run npm run test
2026-07-08T08:23:49.1984237Z [36;1mnpm run test[0m
2026-07-08T08:23:49.2016322Z shell: /usr/bin/bash -e {0}
2026-07-08T08:23:49.2016583Z ##[endgroup]
2026-07-08T08:23:49.3091926Z 
2026-07-08T08:23:49.3092801Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:23:49.3093686Z > vitest run
2026-07-08T08:23:49.3093862Z 
2026-07-08T08:23:49.6406692Z 
2026-07-08T08:23:49.6410698Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:23:49.6411532Z 
2026-07-08T08:23:49.9578233Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:23:49.9579968Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:23:49.9580706Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:23:49.9682283Z 
2026-07-08T08:23:49.9689835Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:23:49.9690494Z 
2026-07-08T08:23:49.9693450Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:23:49.9695266Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:23:49.9696161Z 
2026-07-08T08:23:49.9696551Z - Expected
2026-07-08T08:23:49.9697191Z + Received
2026-07-08T08:23:49.9697634Z 
2026-07-08T08:23:49.9697992Z - 4
2026-07-08T08:23:49.9698606Z + 3
2026-07-08T08:23:49.9699022Z 
2026-07-08T08:23:49.9699798Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:23:49.9842520Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:23:49.9844187Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:23:49.9846137Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:23:49.9847615Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:23:49.9848347Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:23:49.9848891Z     [90m  8| [39m
2026-07-08T08:23:49.9849137Z 
2026-07-08T08:23:49.9849699Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:23:49.9850131Z 
2026-07-08T08:23:49.9850387Z 
2026-07-08T08:23:49.9882267Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:23:49.9894514Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:23:49.9895889Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:23:49.9896881Z [2m   Start at [22m 08:23:49
2026-07-08T08:23:49.9898120Z [2m   Duration [22m 327ms[2m (transform 38ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 77ms)[22m
2026-07-08T08:23:49.9898693Z 
2026-07-08T08:23:50.0088281Z ##[error]Process completed with exit code 1.
2026-07-08T08:23:36.1470000Z Evaluating test.if
2026-07-08T08:23:36.1470000Z Evaluating: success()
2026-07-08T08:23:36.1470000Z Result: true
2026-07-08T08:23:36.1480000Z Requested labels: ubuntu-latest
2026-07-08T08:23:36.1480000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:23:36.1480000Z Waiting for a runner to pick up this job...
2026-07-08T08:23:36.6300000Z Job is about to start running on the hosted runner: GitHub Actions 1000000998
2026-07-08T08:23:36.6300000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.