# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean implementation — most likely it is summing the values and dividing by the wrong denominator (e.g., dividing by the length + 1, or using integer division that truncates, or off-by-one in element counting), rather than a workflow misconfiguration.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug lies in the `average` function's source code returning 3 instead of 4, not in the CI pipeline configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:31:11.1880295Z 
﻿2026-07-08T08:31:12.0505165Z ##[group]Run npm run test
2026-07-08T08:31:12.0505713Z [36;1mnpm run test[0m
2026-07-08T08:31:12.0538588Z shell: /usr/bin/bash -e {0}
2026-07-08T08:31:12.0538884Z ##[endgroup]
2026-07-08T08:31:12.1689362Z 
2026-07-08T08:31:12.1690254Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:31:12.1690898Z > vitest run
2026-07-08T08:31:12.1691073Z 
2026-07-08T08:31:12.5263058Z 
2026-07-08T08:31:12.5267801Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:31:12.5268881Z 
2026-07-08T08:31:12.8785488Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:31:12.8787386Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:31:12.8788147Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:31:12.8899846Z 
2026-07-08T08:31:12.8908214Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:31:12.8908718Z 
2026-07-08T08:31:12.8916050Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:31:12.8917686Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:31:12.8918282Z 
2026-07-08T08:31:12.8918491Z - Expected
2026-07-08T08:31:12.8918880Z + Received
2026-07-08T08:31:12.8919093Z 
2026-07-08T08:31:12.8919245Z - 4
2026-07-08T08:31:12.8919595Z + 3
2026-07-08T08:31:12.8919782Z 
2026-07-08T08:31:12.8920353Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:31:12.9072382Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:31:12.9074263Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:31:12.9076250Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:31:12.9077773Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:31:12.9078481Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:31:12.9079088Z     [90m  8| [39m
2026-07-08T08:31:12.9079334Z 
2026-07-08T08:31:12.9079855Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:31:12.9080242Z 
2026-07-08T08:31:12.9080288Z 
2026-07-08T08:31:12.9112212Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:31:12.9137336Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:31:12.9138593Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:31:12.9139639Z [2m   Start at [22m 08:31:12
2026-07-08T08:31:12.9141119Z [2m   Duration [22m 363ms[2m (transform 45ms, setup 0ms, collect 34ms, tests 8ms, environment 0ms, prepare 83ms)[22m
2026-07-08T08:31:12.9142117Z 
2026-07-08T08:31:12.9327852Z ##[error]Process completed with exit code 1.
2026-07-08T08:30:57.0160000Z Requested labels: ubuntu-latest
2026-07-08T08:30:57.0160000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:30:57.0160000Z Waiting for a runner to pick up this job...
2026-07-08T08:30:57.0330000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:30:57.0140000Z Evaluating test.if
2026-07-08T08:30:57.0140000Z Evaluating: success()
2026-07-08T08:30:57.0140000Z Result: true
2026-07-08T08:31:00.8510000Z Job is about to start running on the hosted runner: GitHub Actions 1000001050
2026-07-08T08:31:00.8590000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.