# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean: (2+4+6)/3 = 4), but the function returns `3`. This indicates a bug in the implementation — most likely the function is summing the values and dividing by a wrong count, or it has an off-by-one error (e.g. dividing by `n+1` instead of `n`, or using the wrong accumulator starting value).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch in application source code (`src/math.ts`) where the `average` function produces the wrong numerical result; no workflow change can fix a logic bug in the implementation.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:52.9122179Z ##[endgroup]
2026-07-08T08:15:53.0119283Z 
2026-07-08T08:15:53.0119941Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:15:53.0120364Z > tsc --noEmit
2026-07-08T08:15:53.0120873Z 
﻿2026-07-08T08:15:53.8135008Z ##[group]Run npm run test
2026-07-08T08:15:53.8135307Z [36;1mnpm run test[0m
2026-07-08T08:15:53.8155051Z shell: /usr/bin/bash -e {0}
2026-07-08T08:15:53.8155331Z ##[endgroup]
2026-07-08T08:15:53.9136706Z 
2026-07-08T08:15:53.9137631Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:15:53.9138013Z > vitest run
2026-07-08T08:15:53.9138149Z 
2026-07-08T08:15:54.2457709Z 
2026-07-08T08:15:54.2479192Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:15:54.2480170Z 
2026-07-08T08:15:54.5300986Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:15:54.5308823Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:15:54.5309555Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:15:54.5395397Z 
2026-07-08T08:15:54.5402793Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:15:54.5404873Z 
2026-07-08T08:15:54.5405973Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:15:54.5407932Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:15:54.5408452Z 
2026-07-08T08:15:54.5408744Z - Expected
2026-07-08T08:15:54.5409110Z + Received
2026-07-08T08:15:54.5409307Z 
2026-07-08T08:15:54.5409434Z - 4
2026-07-08T08:15:54.5409763Z + 3
2026-07-08T08:15:54.5409948Z 
2026-07-08T08:15:54.5410487Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:15:54.5546531Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:15:54.5548094Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:15:54.5549867Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:15:54.5551200Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:15:54.5551828Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:15:54.5552335Z     [90m  8| [39m
2026-07-08T08:15:54.5552577Z 
2026-07-08T08:15:54.5553082Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:15:54.5553438Z 
2026-07-08T08:15:54.5553467Z 
2026-07-08T08:15:54.5590006Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:15:54.5602685Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:15:54.5604033Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:15:54.5604965Z [2m   Start at [22m 08:15:54
2026-07-08T08:15:54.5606293Z [2m   Duration [22m 295ms[2m (transform 40ms, setup 0ms, collect 29ms, tests 7ms, environment 0ms, prepare 71ms)[22m
2026-07-08T08:15:54.5607328Z 
2026-07-08T08:15:54.5743349Z ##[error]Process completed with exit code 1.
2026-07-08T08:15:41.7640000Z Requested labels: ubuntu-latest
2026-07-08T08:15:41.7640000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:15:41.7640000Z Waiting for a runner to pick up this job...
2026-07-08T08:15:41.7590000Z Evaluating test.if
2026-07-08T08:15:41.7590000Z Evaluating: success()
2026-07-08T08:15:41.7590000Z Result: true
2026-07-08T08:15:42.0310000Z Job is about to start running on the hosted runner: GitHub Actions 1000000968
2026-07-08T08:15:42.0370000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.