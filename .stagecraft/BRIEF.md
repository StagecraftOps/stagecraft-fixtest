# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong count, or using integer/floor division incorrectly (e.g., summing only some elements, or dividing by the wrong denominator). The test assertion at `src/math.test.ts:6` (`expect(average([2, 4, 6])).toBe(4)`) is mathematically correct (mean of 2, 4, 6 = 12/3 = 4), so the production code is at fault.

## Why this is a code-level issue, not a pipeline config issue

The test expectation is mathematically correct and the `average` function itself is returning the wrong value (3 instead of 4), so the bug is in the application source code implementation of `average`, not in the CI workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:45:43.5527695Z 
﻿2026-07-08T08:45:44.4371989Z ##[group]Run npm run test
2026-07-08T08:45:44.4372292Z [36;1mnpm run test[0m
2026-07-08T08:45:44.4405153Z shell: /usr/bin/bash -e {0}
2026-07-08T08:45:44.4405432Z ##[endgroup]
2026-07-08T08:45:44.5543515Z 
2026-07-08T08:45:44.5544302Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:45:44.5544828Z > vitest run
2026-07-08T08:45:44.5544996Z 
2026-07-08T08:45:44.8954175Z 
2026-07-08T08:45:44.8956071Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:45:44.8979248Z 
2026-07-08T08:45:45.2358216Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:45:45.2360371Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:45:45.2361274Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:45.2465385Z 
2026-07-08T08:45:45.2474246Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:45:45.2475012Z 
2026-07-08T08:45:45.2476752Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:45:45.2479245Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:45.2480040Z 
2026-07-08T08:45:45.2480524Z - Expected
2026-07-08T08:45:45.2480912Z + Received
2026-07-08T08:45:45.2481113Z 
2026-07-08T08:45:45.2481256Z - 4
2026-07-08T08:45:45.2481558Z + 3
2026-07-08T08:45:45.2481730Z 
2026-07-08T08:45:45.2482230Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:45:45.2636476Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:45.2637986Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:45.2640109Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:45:45.2641625Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:45:45.2642382Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:45:45.2642942Z     [90m  8| [39m
2026-07-08T08:45:45.2643181Z 
2026-07-08T08:45:45.2643742Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:45:45.2644155Z 
2026-07-08T08:45:45.2644702Z 
2026-07-08T08:45:45.2693254Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:45:45.2706570Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:45:45.2708195Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:45:45.2710641Z [2m   Start at [22m 08:45:44
2026-07-08T08:45:45.2711802Z [2m   Duration [22m 352ms[2m (transform 38ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 76ms)[22m
2026-07-08T08:45:45.2712634Z 
2026-07-08T08:45:45.2881201Z ##[error]Process completed with exit code 1.
2026-07-08T08:45:24.8190000Z Evaluating test.if
2026-07-08T08:45:24.8190000Z Evaluating: success()
2026-07-08T08:45:24.8190000Z Result: true
2026-07-08T08:45:24.9600000Z Requested labels: ubuntu-latest
2026-07-08T08:45:24.9600000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:45:24.9600000Z Waiting for a runner to pick up this job...
2026-07-08T08:45:24.9770000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:45:31.1490000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:45:31.1490000Z Job is about to start running on the hosted runner: GitHub Actions 1000001128
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.