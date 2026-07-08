# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `average(2, 4, 6)`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — likely dividing by the wrong count, using integer division incorrectly, or summing values incorrectly (e.g., summing only part of the array, or dividing by `n+1` instead of `n`).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the `average` function's source code logic, not the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:56:02.4534048Z 
﻿2026-07-08T08:56:03.2138960Z ##[group]Run npm run test
2026-07-08T08:56:03.2139527Z [36;1mnpm run test[0m
2026-07-08T08:56:03.2160511Z shell: /usr/bin/bash -e {0}
2026-07-08T08:56:03.2160938Z ##[endgroup]
2026-07-08T08:56:03.3153923Z 
2026-07-08T08:56:03.3154842Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:56:03.3155336Z > vitest run
2026-07-08T08:56:03.3155521Z 
2026-07-08T08:56:03.6119333Z 
2026-07-08T08:56:03.6122845Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:56:03.6124057Z 
2026-07-08T08:56:03.9083405Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:56:03.9085942Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:56:03.9087617Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:03.9183254Z 
2026-07-08T08:56:03.9191458Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:56:03.9192285Z 
2026-07-08T08:56:03.9194162Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:56:03.9196392Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:03.9196881Z 
2026-07-08T08:56:03.9197235Z - Expected
2026-07-08T08:56:03.9197672Z + Received
2026-07-08T08:56:03.9197938Z 
2026-07-08T08:56:03.9198083Z - 4
2026-07-08T08:56:03.9198455Z + 3
2026-07-08T08:56:03.9198667Z 
2026-07-08T08:56:03.9199125Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:56:03.9373452Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:03.9375411Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:03.9376121Z 
2026-07-08T08:56:03.9407358Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:56:03.9420274Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:56:03.9421521Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:56:03.9422407Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:56:03.9423130Z     [90m  8| [39m
2026-07-08T08:56:03.9423444Z 
2026-07-08T08:56:03.9424050Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:56:03.9424543Z 
2026-07-08T08:56:03.9425100Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:56:03.9426186Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:56:03.9427272Z [2m   Start at [22m 08:56:03
2026-07-08T08:56:03.9428139Z [2m   Duration [22m 306ms[2m (transform 40ms, setup 0ms, collect 28ms, tests 7ms, environment 0ms, prepare 64ms)[22m
2026-07-08T08:56:03.9428691Z 
2026-07-08T08:56:03.9588391Z ##[error]Process completed with exit code 1.
2026-07-08T08:55:36.1850000Z Evaluating test.if
2026-07-08T08:55:36.1850000Z Evaluating: success()
2026-07-08T08:55:36.1850000Z Result: true
2026-07-08T08:55:36.1870000Z Requested labels: ubuntu-latest
2026-07-08T08:55:36.1870000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:55:36.1870000Z Waiting for a runner to pick up this job...
2026-07-08T08:55:36.5880000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:55:52.1820000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:55:52.1820000Z Job is about to start running on the hosted runner: GitHub Actions 1000001194
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.