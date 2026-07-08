# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is producing 3, indicating a bug in the `average` implementation — most likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` or using the wrong accumulator logic).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the application's `average` function implementation in source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:58.0868940Z ##[endgroup]
2026-07-08T08:50:58.2059201Z 
2026-07-08T08:50:58.2059860Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:50:58.2060346Z > tsc --noEmit
2026-07-08T08:50:58.2060494Z 
﻿2026-07-08T08:50:59.0725439Z ##[group]Run npm run test
2026-07-08T08:50:59.0725958Z [36;1mnpm run test[0m
2026-07-08T08:50:59.0761577Z shell: /usr/bin/bash -e {0}
2026-07-08T08:50:59.0761848Z ##[endgroup]
2026-07-08T08:50:59.1911720Z 
2026-07-08T08:50:59.1913124Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:50:59.1913567Z > vitest run
2026-07-08T08:50:59.1913707Z 
2026-07-08T08:50:59.5377990Z 
2026-07-08T08:50:59.5382237Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:50:59.5382996Z 
2026-07-08T08:50:59.8656840Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:50:59.8658065Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:50:59.8659015Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:59.8759092Z 
2026-07-08T08:50:59.8765940Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:50:59.8766795Z 
2026-07-08T08:50:59.8769245Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:50:59.8771562Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:59.8772328Z 
2026-07-08T08:50:59.8772507Z - Expected
2026-07-08T08:50:59.8773050Z + Received
2026-07-08T08:50:59.8773224Z 
2026-07-08T08:50:59.8773365Z - 4
2026-07-08T08:50:59.8773645Z + 3
2026-07-08T08:50:59.8773805Z 
2026-07-08T08:50:59.8774570Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:50:59.8920995Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:59.8922303Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:59.8923932Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:50:59.8925327Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:50:59.8925906Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:50:59.8926361Z     [90m  8| [39m
2026-07-08T08:50:59.8926567Z 
2026-07-08T08:50:59.8927014Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:50:59.8927366Z 
2026-07-08T08:50:59.8927414Z 
2026-07-08T08:50:59.8958878Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:50:59.8972742Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:50:59.8973551Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:50:59.8974130Z [2m   Start at [22m 08:50:59
2026-07-08T08:50:59.8974912Z [2m   Duration [22m 338ms[2m (transform 38ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 82ms)[22m
2026-07-08T08:50:59.8975416Z 
2026-07-08T08:50:59.9187129Z ##[error]Process completed with exit code 1.
2026-07-08T08:50:49.4720000Z Evaluating test.if
2026-07-08T08:50:49.4720000Z Evaluating: success()
2026-07-08T08:50:49.4720000Z Result: true
2026-07-08T08:50:49.4730000Z Requested labels: ubuntu-latest
2026-07-08T08:50:49.4730000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:50:49.4730000Z Waiting for a runner to pick up this job...
2026-07-08T08:50:49.4850000Z Job is about to start running on the hosted runner: GitHub Actions 1000001157
2026-07-08T08:50:49.4840000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.