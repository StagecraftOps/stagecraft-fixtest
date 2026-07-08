# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when given the input [2, 4, 6]. The correct mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation has a bug — most likely an off-by-one error in the divisor (e.g., dividing by `array.length - 1` instead of `array.length`, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:59.2596333Z ##[endgroup]
2026-07-08T08:52:59.3689922Z 
2026-07-08T08:52:59.3690774Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:52:59.3691492Z > tsc --noEmit
2026-07-08T08:52:59.3691764Z 
﻿2026-07-08T08:53:00.2027314Z ##[group]Run npm run test
2026-07-08T08:53:00.2027881Z [36;1mnpm run test[0m
2026-07-08T08:53:00.2060769Z shell: /usr/bin/bash -e {0}
2026-07-08T08:53:00.2061046Z ##[endgroup]
2026-07-08T08:53:00.3173939Z 
2026-07-08T08:53:00.3174652Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:53:00.3175258Z > vitest run
2026-07-08T08:53:00.3175760Z 
2026-07-08T08:53:00.6348105Z 
2026-07-08T08:53:00.6352401Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:53:00.6353246Z 
2026-07-08T08:53:00.9521947Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:53:00.9523721Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:53:00.9524765Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:00.9617077Z 
2026-07-08T08:53:00.9623373Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:53:00.9624009Z 
2026-07-08T08:53:00.9626946Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:53:00.9628559Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:00.9629130Z 
2026-07-08T08:53:00.9629294Z - Expected
2026-07-08T08:53:00.9629641Z + Received
2026-07-08T08:53:00.9629829Z 
2026-07-08T08:53:00.9629968Z - 4
2026-07-08T08:53:00.9630283Z + 3
2026-07-08T08:53:00.9630456Z 
2026-07-08T08:53:00.9631498Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:53:00.9774343Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:00.9776355Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:00.9778559Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:53:00.9779855Z 
2026-07-08T08:53:00.9780593Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:53:00.9813621Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:53:00.9837424Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:53:00.9838009Z     [90m  8| [39m
2026-07-08T08:53:00.9838309Z 
2026-07-08T08:53:00.9838924Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:53:00.9839354Z 
2026-07-08T08:53:00.9840006Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:53:00.9841432Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:53:00.9842622Z [2m   Start at [22m 08:53:00
2026-07-08T08:53:00.9844187Z [2m   Duration [22m 327ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 67ms)[22m
2026-07-08T08:53:00.9845552Z 
2026-07-08T08:53:01.0017110Z ##[error]Process completed with exit code 1.
2026-07-08T08:52:50.4310000Z Evaluating test.if
2026-07-08T08:52:50.4310000Z Evaluating: success()
2026-07-08T08:52:50.4310000Z Result: true
2026-07-08T08:52:50.4340000Z Requested labels: ubuntu-latest
2026-07-08T08:52:50.4340000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:52:50.4340000Z Waiting for a runner to pick up this job...
2026-07-08T08:52:50.9200000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:52:50.9150000Z Job is about to start running on the hosted runner: GitHub Actions 1000001169
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.