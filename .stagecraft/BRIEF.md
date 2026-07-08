# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong denominator, or is otherwise calculating incorrectly (e.g., dividing by `(n+1)` instead of `n`, or using integer/floor division incorrectly). The test in `src/math.test.ts` line 6 asserts `expect(average([2, 4, 6])).toBe(4)`, which is mathematically correct ((2+4+6)/3 = 4), so the test expectation itself is valid.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion error caused by a bug in the application's `average` function returning the wrong value (3 instead of 4), which requires fixing the source code — no workflow change can resolve a logic error in application code.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
11.6917354Z ##[endgroup]
2026-07-08T08:28:11.8088919Z 
2026-07-08T08:28:11.8089790Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:11.8090624Z > tsc --noEmit
2026-07-08T08:28:11.8091868Z 
﻿2026-07-08T08:28:12.6844326Z ##[group]Run npm run test
2026-07-08T08:28:12.6844664Z [36;1mnpm run test[0m
2026-07-08T08:28:12.6877059Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:12.6877342Z ##[endgroup]
2026-07-08T08:28:12.7982479Z 
2026-07-08T08:28:12.7983147Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:12.7983701Z > vitest run
2026-07-08T08:28:12.7983924Z 
2026-07-08T08:28:13.1329131Z 
2026-07-08T08:28:13.1333957Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:13.1335030Z 
2026-07-08T08:28:13.4702958Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:28:13.4704582Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:13.4705465Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:13.4812808Z 
2026-07-08T08:28:13.4821047Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:13.4821620Z 
2026-07-08T08:28:13.4824838Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:13.4826899Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:13.4827579Z 
2026-07-08T08:28:13.4827763Z - Expected
2026-07-08T08:28:13.4828125Z + Received
2026-07-08T08:28:13.4828352Z 
2026-07-08T08:28:13.4828508Z - 4
2026-07-08T08:28:13.4828866Z + 3
2026-07-08T08:28:13.4829039Z 
2026-07-08T08:28:13.4829928Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:13.4979443Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:13.4981176Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:13.4983297Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:13.4984791Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:13.4985554Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:13.4986203Z     [90m  8| [39m
2026-07-08T08:28:13.4986445Z 
2026-07-08T08:28:13.4987000Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:13.4987413Z 
2026-07-08T08:28:13.4987444Z 
2026-07-08T08:28:13.5018931Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:13.5032223Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:13.5033599Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:13.5034689Z [2m   Start at [22m 08:28:13
2026-07-08T08:28:13.5036101Z [2m   Duration [22m 348ms[2m (transform 52ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 118ms)[22m
2026-07-08T08:28:13.5037043Z 
2026-07-08T08:28:13.5224216Z ##[error]Process completed with exit code 1.
2026-07-08T08:27:58.1740000Z Evaluating test.if
2026-07-08T08:27:58.1740000Z Evaluating: success()
2026-07-08T08:27:58.1740000Z Result: true
2026-07-08T08:27:58.1790000Z Requested labels: ubuntu-latest
2026-07-08T08:27:58.1790000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:27:58.1790000Z Waiting for a runner to pick up this job...
2026-07-08T08:27:58.6060000Z Job is about to start running on the hosted runner: GitHub Actions 1000001024
2026-07-08T08:27:58.6060000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.