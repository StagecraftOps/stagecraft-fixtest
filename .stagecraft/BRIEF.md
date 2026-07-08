# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when given the input [2, 4, 6]. The mean of [2, 4, 6] is 4, so the implementation is computing an incorrect result — most likely summing the values (2+4+6=12) but dividing by the wrong count (e.g., 4 instead of 3), or alternatively summing only a subset of the values. This is a genuine logic bug in the application source code, not a CI/pipeline misconfiguration.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct, so the `average` function implementation in the source code must be producing an incorrect result (3 instead of 4), indicating a bug in the application logic itself.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:58.9496808Z ##[endgroup]
2026-07-08T08:24:59.0578525Z 
2026-07-08T08:24:59.0579276Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:24:59.0579674Z > tsc --noEmit
2026-07-08T08:24:59.0579819Z 
﻿2026-07-08T08:24:59.8836731Z ##[group]Run npm run test
2026-07-08T08:24:59.8837273Z [36;1mnpm run test[0m
2026-07-08T08:24:59.8870297Z shell: /usr/bin/bash -e {0}
2026-07-08T08:24:59.8870583Z ##[endgroup]
2026-07-08T08:24:59.9948838Z 
2026-07-08T08:24:59.9949461Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:24:59.9949963Z > vitest run
2026-07-08T08:24:59.9950101Z 
2026-07-08T08:25:00.3348321Z 
2026-07-08T08:25:00.3352364Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:25:00.3353165Z 
2026-07-08T08:25:00.6540891Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:25:00.6542260Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:25:00.6542978Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:25:00.6639584Z 
2026-07-08T08:25:00.6647070Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:25:00.6647781Z 
2026-07-08T08:25:00.6650274Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:25:00.6652252Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:25:00.6652835Z 
2026-07-08T08:25:00.6653011Z - Expected
2026-07-08T08:25:00.6653491Z + Received
2026-07-08T08:25:00.6653706Z 
2026-07-08T08:25:00.6653967Z - 4
2026-07-08T08:25:00.6654273Z + 3
2026-07-08T08:25:00.6654473Z 
2026-07-08T08:25:00.6655177Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:25:00.6800113Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:25:00.6801853Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:25:00.6803909Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:25:00.6805295Z 
2026-07-08T08:25:00.6837459Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:25:00.6849363Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:25:00.6850196Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:25:00.6850827Z     [90m  8| [39m
2026-07-08T08:25:00.6851180Z 
2026-07-08T08:25:00.6851931Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:25:00.6852401Z 
2026-07-08T08:25:00.6853022Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:25:00.6854301Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:25:00.6855649Z [2m   Start at [22m 08:25:00
2026-07-08T08:25:00.6857072Z [2m   Duration [22m 329ms[2m (transform 40ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 80ms)[22m
2026-07-08T08:25:00.6857995Z 
2026-07-08T08:25:00.7036396Z ##[error]Process completed with exit code 1.
2026-07-08T08:24:50.5210000Z Job is about to start running on the hosted runner: GitHub Actions 1000001003
2026-07-08T08:24:50.5120000Z Requested labels: ubuntu-latest
2026-07-08T08:24:50.5120000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:24:50.5120000Z Waiting for a runner to pick up this job...
2026-07-08T08:24:50.5100000Z Evaluating test.if
2026-07-08T08:24:50.5100000Z Evaluating: success()
2026-07-08T08:24:50.5100000Z Result: true
2026-07-08T08:24:50.5210000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.