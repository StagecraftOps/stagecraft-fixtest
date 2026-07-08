# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is returning 3, indicating a bug in the `average` implementation — most likely an off-by-one error in the denominator (e.g., dividing by `array.length + 1` or using the wrong count).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a bug in the application's `average` function implementation (returning 3 instead of 4 for [2,4,6]), which can only be fixed by correcting the source code in the repository, not by changing the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:30.5544470Z ##[endgroup]
2026-07-08T08:47:30.6682300Z 
2026-07-08T08:47:30.6683176Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:47:30.6683909Z > tsc --noEmit
2026-07-08T08:47:30.6684183Z 
﻿2026-07-08T08:47:31.5239454Z ##[group]Run npm run test
2026-07-08T08:47:31.5240022Z [36;1mnpm run test[0m
2026-07-08T08:47:31.5273308Z shell: /usr/bin/bash -e {0}
2026-07-08T08:47:31.5273579Z ##[endgroup]
2026-07-08T08:47:31.6351026Z 
2026-07-08T08:47:31.6351618Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:47:31.6352269Z > vitest run
2026-07-08T08:47:31.6352524Z 
2026-07-08T08:47:31.9886647Z 
2026-07-08T08:47:31.9896557Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:47:31.9897385Z 
2026-07-08T08:47:32.3126545Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:47:32.3128408Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:47:32.3129553Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:47:32.3235995Z 
2026-07-08T08:47:32.3243611Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:47:32.3244630Z 
2026-07-08T08:47:32.3247971Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:47:32.3249984Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:47:32.3250740Z 
2026-07-08T08:47:32.3251207Z - Expected
2026-07-08T08:47:32.3251607Z + Received
2026-07-08T08:47:32.3251803Z 
2026-07-08T08:47:32.3251964Z - 4
2026-07-08T08:47:32.3252347Z + 3
2026-07-08T08:47:32.3252548Z 
2026-07-08T08:47:32.3253220Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:47:32.3401855Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:47:32.3403405Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:47:32.3405462Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:47:32.3407256Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:47:32.3408017Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:47:32.3408608Z     [90m  8| [39m
2026-07-08T08:47:32.3408900Z 
2026-07-08T08:47:32.3409458Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:47:32.3409859Z 
2026-07-08T08:47:32.3409880Z 
2026-07-08T08:47:32.3441381Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:47:32.3454142Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:47:32.3455802Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:47:32.3456927Z [2m   Start at [22m 08:47:31
2026-07-08T08:47:32.3458359Z [2m   Duration [22m 335ms[2m (transform 41ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 73ms)[22m
2026-07-08T08:47:32.3459343Z 
2026-07-08T08:47:32.3650774Z ##[error]Process completed with exit code 1.
2026-07-08T08:47:21.6840000Z Requested labels: ubuntu-latest
2026-07-08T08:47:21.6840000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:47:21.6840000Z Waiting for a runner to pick up this job...
2026-07-08T08:47:21.6780000Z Evaluating test.if
2026-07-08T08:47:21.6780000Z Evaluating: success()
2026-07-08T08:47:21.6780000Z Result: true
2026-07-08T08:47:22.0980000Z Job is about to start running on the hosted runner: GitHub Actions 1000001142
2026-07-08T08:47:22.0980000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.