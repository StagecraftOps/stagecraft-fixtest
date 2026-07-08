# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong count, or is using integer/floor division, or is off-by-one in its accumulation logic (e.g. dividing by `n+1` instead of `n`, or summing only part of the array).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is correct (mean of [2,4,6] is indeed 4), so the bug lives in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:15.7412767Z ##[endgroup]
2026-07-08T08:19:15.8498922Z 
2026-07-08T08:19:15.8500131Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:19:15.8500710Z > tsc --noEmit
2026-07-08T08:19:15.8500913Z 
﻿2026-07-08T08:19:16.7512027Z ##[group]Run npm run test
2026-07-08T08:19:16.7512457Z [36;1mnpm run test[0m
2026-07-08T08:19:16.7547211Z shell: /usr/bin/bash -e {0}
2026-07-08T08:19:16.7547582Z ##[endgroup]
2026-07-08T08:19:16.8691917Z 
2026-07-08T08:19:16.8692458Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:19:16.8693539Z > vitest run
2026-07-08T08:19:16.8693751Z 
2026-07-08T08:19:17.2075273Z 
2026-07-08T08:19:17.2079572Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:19:17.2080921Z 
2026-07-08T08:19:17.5356286Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:19:17.5359362Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:19:17.5360298Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:19:17.5471682Z 
2026-07-08T08:19:17.5478386Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:19:17.5479784Z 
2026-07-08T08:19:17.5482079Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:19:17.5484386Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:19:17.5485191Z 
2026-07-08T08:19:17.5485405Z - Expected
2026-07-08T08:19:17.5485850Z + Received
2026-07-08T08:19:17.5486074Z 
2026-07-08T08:19:17.5486249Z - 4
2026-07-08T08:19:17.5486604Z + 3
2026-07-08T08:19:17.5486812Z 
2026-07-08T08:19:17.5487605Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:19:17.5637129Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:19:17.5639232Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:19:17.5641564Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:19:17.5643353Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:19:17.5644093Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:19:17.5644730Z     [90m  8| [39m
2026-07-08T08:19:17.5645011Z 
2026-07-08T08:19:17.5645939Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:19:17.5646448Z 
2026-07-08T08:19:17.5646644Z 
2026-07-08T08:19:17.5686514Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:19:17.5700581Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:19:17.5702043Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:19:17.5703178Z [2m   Start at [22m 08:19:17
2026-07-08T08:19:17.5704662Z [2m   Duration [22m 339ms[2m (transform 46ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 88ms)[22m
2026-07-08T08:19:17.5705635Z 
2026-07-08T08:19:17.5910319Z ##[error]Process completed with exit code 1.
2026-07-08T08:19:02.4600000Z Requested labels: ubuntu-latest
2026-07-08T08:19:02.4600000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:19:02.4600000Z Waiting for a runner to pick up this job...
2026-07-08T08:19:02.4590000Z Evaluating test.if
2026-07-08T08:19:02.4590000Z Evaluating: success()
2026-07-08T08:19:02.4590000Z Result: true
2026-07-08T08:19:02.4730000Z Job is about to start running on the hosted runner: GitHub Actions 1000000980
2026-07-08T08:19:02.4720000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.