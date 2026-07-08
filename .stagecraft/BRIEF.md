# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in src/math.ts returns 3 instead of the expected 4 when called with [2, 4, 6]. The test at src/math.test.ts:6 asserts `average([2, 4, 6])` should equal 4 (the correct arithmetic mean), but the implementation produces 3, indicating a bug in the average/mean calculation logic — likely an off-by-one error (e.g., dividing by `array.length + 1` or using integer division incorrectly, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by incorrect application logic in the `average` function implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:59.9727984Z ##[endgroup]
2026-07-08T08:27:00.0745520Z 
2026-07-08T08:27:00.0746430Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:27:00.0747136Z > tsc --noEmit
2026-07-08T08:27:00.0747402Z 
﻿2026-07-08T08:27:00.8490360Z ##[group]Run npm run test
2026-07-08T08:27:00.8490837Z [36;1mnpm run test[0m
2026-07-08T08:27:00.8509927Z shell: /usr/bin/bash -e {0}
2026-07-08T08:27:00.8510215Z ##[endgroup]
2026-07-08T08:27:00.9507415Z 
2026-07-08T08:27:00.9508088Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:27:00.9508495Z > vitest run
2026-07-08T08:27:00.9508641Z 
2026-07-08T08:27:01.2462271Z 
2026-07-08T08:27:01.2484160Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:27:01.2485182Z 
2026-07-08T08:27:01.5338620Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:27:01.5340638Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:27:01.5341422Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:01.5422506Z 
2026-07-08T08:27:01.5429702Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:27:01.5430397Z 
2026-07-08T08:27:01.5433606Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:27:01.5435452Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:01.5436274Z 
2026-07-08T08:27:01.5436639Z - Expected
2026-07-08T08:27:01.5437042Z + Received
2026-07-08T08:27:01.5437236Z 
2026-07-08T08:27:01.5437387Z - 4
2026-07-08T08:27:01.5437715Z + 3
2026-07-08T08:27:01.5437904Z 
2026-07-08T08:27:01.5438535Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:27:01.5570542Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:01.5572141Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:01.5574002Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:27:01.5574925Z 
2026-07-08T08:27:01.5605994Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:27:01.5618638Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:27:01.5619844Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:27:01.5620387Z     [90m  8| [39m
2026-07-08T08:27:01.5620647Z 
2026-07-08T08:27:01.5621182Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:27:01.5621553Z 
2026-07-08T08:27:01.5622246Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:27:01.5623412Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:27:01.5624390Z [2m   Start at [22m 08:27:01
2026-07-08T08:27:01.5625800Z [2m   Duration [22m 297ms[2m (transform 39ms, setup 0ms, collect 26ms, tests 8ms, environment 0ms, prepare 99ms)[22m
2026-07-08T08:27:01.5626731Z 
2026-07-08T08:27:01.5782772Z ##[error]Process completed with exit code 1.
2026-07-08T08:26:50.7990000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:26:50.8000000Z Job is about to start running on the hosted runner: GitHub Actions 1000001012
2026-07-08T08:26:50.7890000Z Requested labels: ubuntu-latest
2026-07-08T08:26:50.7890000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:26:50.7890000Z Waiting for a runner to pick up this job...
2026-07-08T08:26:50.7890000Z Evaluating test.if
2026-07-08T08:26:50.7890000Z Evaluating: success()
2026-07-08T08:26:50.7890000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.