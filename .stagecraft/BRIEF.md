# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when given the input [2, 4, 6]. The correct mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation of `average` contains a bug — most likely an off-by-one error in the divisor (e.g., dividing by `array.length - 1` instead of `array.length`, yielding 12/4=3 instead of 12/3=4).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by incorrect logic in the `average` function's source implementation (or a bug in the test fixture), not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:25.2125959Z ##[endgroup]
2026-07-08T08:44:25.3274606Z 
2026-07-08T08:44:25.3275225Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:44:25.3275797Z > tsc --noEmit
2026-07-08T08:44:25.3276035Z 
﻿2026-07-08T08:44:26.2261661Z ##[group]Run npm run test
2026-07-08T08:44:26.2262259Z [36;1mnpm run test[0m
2026-07-08T08:44:26.2297703Z shell: /usr/bin/bash -e {0}
2026-07-08T08:44:26.2297986Z ##[endgroup]
2026-07-08T08:44:26.3433945Z 
2026-07-08T08:44:26.3434733Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:44:26.3435375Z > vitest run
2026-07-08T08:44:26.3435704Z 
2026-07-08T08:44:26.6961071Z 
2026-07-08T08:44:26.6992698Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:44:26.7000937Z 
2026-07-08T08:44:27.0693495Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:44:27.0695588Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:44:27.0696677Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:27.0809211Z 
2026-07-08T08:44:27.0817081Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:44:27.0817918Z 
2026-07-08T08:44:27.0820659Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:44:27.0822852Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:27.0823971Z 
2026-07-08T08:44:27.0824409Z - Expected
2026-07-08T08:44:27.0825145Z + Received
2026-07-08T08:44:27.0825621Z 
2026-07-08T08:44:27.0825956Z - 4
2026-07-08T08:44:27.0826551Z + 3
2026-07-08T08:44:27.0826904Z 
2026-07-08T08:44:27.0827700Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:44:27.1043933Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:27.1045405Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:27.1047362Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:44:27.1058103Z 
2026-07-08T08:44:27.1059084Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:44:27.1100679Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:44:27.1110363Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:44:27.1111750Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:44:27.1113040Z     [90m  8| [39m
2026-07-08T08:44:27.1114102Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:44:27.1115121Z 
2026-07-08T08:44:27.1115499Z [2m   Start at [22m 08:44:26
2026-07-08T08:44:27.1116622Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:44:27.1118150Z [2m   Duration [22m 385ms[2m (transform 46ms, setup 0ms, collect 37ms, tests 8ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:44:27.1119362Z 
2026-07-08T08:44:27.1119436Z 
2026-07-08T08:44:27.1343316Z ##[error]Process completed with exit code 1.
2026-07-08T08:44:15.9560000Z Evaluating test.if
2026-07-08T08:44:15.9560000Z Evaluating: success()
2026-07-08T08:44:15.9560000Z Result: true
2026-07-08T08:44:15.9610000Z Requested labels: ubuntu-latest
2026-07-08T08:44:15.9610000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:44:15.9610000Z Waiting for a runner to pick up this job...
2026-07-08T08:44:16.4320000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:44:16.4330000Z Job is about to start running on the hosted runner: GitHub Actions 1000001118
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.