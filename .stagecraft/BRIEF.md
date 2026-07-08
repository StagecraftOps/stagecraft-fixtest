# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns the wrong value. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the average/mean implementation — most likely it is dividing the sum by the wrong denominator (e.g. using a hardcoded divisor, an off-by-one on the length, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a logic bug in the application's `average` function, not a workflow misconfiguration — no change to the CI YAML would make a mathematically incorrect function return the right answer.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:44.3140375Z ##[endgroup]
2026-07-08T08:40:44.4295562Z 
2026-07-08T08:40:44.4296333Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:40:44.4296810Z > tsc --noEmit
2026-07-08T08:40:44.4296949Z 
﻿2026-07-08T08:40:45.2307975Z ##[group]Run npm run test
2026-07-08T08:40:45.2308599Z [36;1mnpm run test[0m
2026-07-08T08:40:45.2345294Z shell: /usr/bin/bash -e {0}
2026-07-08T08:40:45.2345585Z ##[endgroup]
2026-07-08T08:40:45.3492687Z 
2026-07-08T08:40:45.3493158Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:40:45.3493625Z > vitest run
2026-07-08T08:40:45.3493816Z 
2026-07-08T08:40:45.6857483Z 
2026-07-08T08:40:45.6860814Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:40:45.6861737Z 
2026-07-08T08:40:46.0275191Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:40:46.0276858Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:40:46.0277952Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:46.0378395Z 
2026-07-08T08:40:46.0385542Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:40:46.0386127Z 
2026-07-08T08:40:46.0388601Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:40:46.0390420Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:40:46.0391028Z 
2026-07-08T08:40:46.0391170Z - Expected
2026-07-08T08:40:46.0391630Z + Received
2026-07-08T08:40:46.0391799Z 
2026-07-08T08:40:46.0392002Z - 4
2026-07-08T08:40:46.0392297Z + 3
2026-07-08T08:40:46.0392498Z 
2026-07-08T08:40:46.0393079Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:40:46.0583884Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:46.0585737Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:40:46.0587790Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:40:46.0588863Z 
2026-07-08T08:40:46.0623328Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:40:46.0635236Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:40:46.0636045Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:40:46.0636615Z     [90m  8| [39m
2026-07-08T08:40:46.0636904Z 
2026-07-08T08:40:46.0637500Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:40:46.0637956Z 
2026-07-08T08:40:46.0638478Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:40:46.0639665Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:40:46.0640590Z [2m   Start at [22m 08:40:45
2026-07-08T08:40:46.0641847Z [2m   Duration [22m 352ms[2m (transform 39ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 82ms)[22m
2026-07-08T08:40:46.0642631Z 
2026-07-08T08:40:46.0831796Z ##[error]Process completed with exit code 1.
2026-07-08T08:40:35.5390000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:40:35.5400000Z Job is about to start running on the hosted runner: GitHub Actions 1000001093
2026-07-08T08:40:35.5320000Z Requested labels: ubuntu-latest
2026-07-08T08:40:35.5320000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:40:35.5320000Z Waiting for a runner to pick up this job...
2026-07-08T08:40:35.5250000Z Evaluating test.if
2026-07-08T08:40:35.5250000Z Evaluating: success()
2026-07-08T08:40:35.5250000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.