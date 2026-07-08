# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation — most likely the function is computing `sum / (n+1)` or using incorrect length arithmetic (e.g., dividing by `numbers.length + 1` = 4 instead of 3, yielding 12/4=3 instead of 12/3=4), or is off-by-one in some other way.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of [2,4,6] is 4), so the bug is in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
.8492073Z ##[endgroup]
2026-07-08T08:38:11.9617579Z 
2026-07-08T08:38:11.9618398Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:38:11.9619100Z > tsc --noEmit
2026-07-08T08:38:11.9619365Z 
﻿2026-07-08T08:38:12.8567319Z ##[group]Run npm run test
2026-07-08T08:38:12.8567838Z [36;1mnpm run test[0m
2026-07-08T08:38:12.8600341Z shell: /usr/bin/bash -e {0}
2026-07-08T08:38:12.8600612Z ##[endgroup]
2026-07-08T08:38:12.9722118Z 
2026-07-08T08:38:12.9722855Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:38:12.9723692Z > vitest run
2026-07-08T08:38:12.9724154Z 
2026-07-08T08:38:13.3143721Z 
2026-07-08T08:38:13.3174669Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:38:13.3175486Z 
2026-07-08T08:38:13.7630909Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:38:13.7632185Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:38:13.7633170Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:13.7755136Z 
2026-07-08T08:38:13.7763074Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:38:13.7764333Z 
2026-07-08T08:38:13.7766867Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:38:13.7769088Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:13.7770178Z 
2026-07-08T08:38:13.7770610Z - Expected
2026-07-08T08:38:13.7771548Z + Received
2026-07-08T08:38:13.7771978Z 
2026-07-08T08:38:13.7772620Z - 4
2026-07-08T08:38:13.7773249Z + 3
2026-07-08T08:38:13.7774189Z 
2026-07-08T08:38:13.7775285Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:38:13.7995198Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:13.7997350Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:13.7998896Z 
2026-07-08T08:38:13.8000259Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:38:13.8027987Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:38:13.8041510Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:38:13.8042312Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:38:13.8043065Z     [90m  8| [39m
2026-07-08T08:38:13.8043302Z 
2026-07-08T08:38:13.8044090Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:38:13.8044535Z 
2026-07-08T08:38:13.8045155Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:38:13.8046503Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:38:13.8047553Z [2m   Start at [22m 08:38:13
2026-07-08T08:38:13.8048907Z [2m   Duration [22m 461ms[2m (transform 62ms, setup 0ms, collect 47ms, tests 11ms, environment 0ms, prepare 121ms)[22m
2026-07-08T08:38:13.8049755Z 
2026-07-08T08:38:13.8267424Z ##[error]Process completed with exit code 1.
2026-07-08T08:38:03.0720000Z Requested labels: ubuntu-latest
2026-07-08T08:38:03.0720000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:38:03.0720000Z Waiting for a runner to pick up this job...
2026-07-08T08:38:03.0830000Z Job is about to start running on the hosted runner: GitHub Actions 1000001079
2026-07-08T08:38:03.0830000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:38:03.0710000Z Evaluating test.if
2026-07-08T08:38:03.0710000Z Evaluating: success()
2026-07-08T08:38:03.0710000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.