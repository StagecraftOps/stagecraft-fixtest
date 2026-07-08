# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in src/math.ts returns 3 instead of the expected 4 when called with [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is producing 3, indicating a bug in the implementation (likely integer division truncation, an off-by-one in the denominator, or incorrect summation logic).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the application source code's `average` function in src/math.ts, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:15.4142469Z ##[endgroup]
2026-07-08T08:28:15.5264313Z 
2026-07-08T08:28:15.5265474Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:15.5266209Z > tsc --noEmit
2026-07-08T08:28:15.5266443Z 
﻿2026-07-08T08:28:16.4134919Z ##[group]Run npm run test
2026-07-08T08:28:16.4135579Z [36;1mnpm run test[0m
2026-07-08T08:28:16.4168795Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:16.4169065Z ##[endgroup]
2026-07-08T08:28:16.5281274Z 
2026-07-08T08:28:16.5282675Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:16.5283344Z > vitest run
2026-07-08T08:28:16.5283531Z 
2026-07-08T08:28:16.8706214Z 
2026-07-08T08:28:16.8709981Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:16.8710856Z 
2026-07-08T08:28:17.2221061Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:28:17.2222638Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:17.2223359Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:17.2332280Z 
2026-07-08T08:28:17.2340576Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:17.2341263Z 
2026-07-08T08:28:17.2344243Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:17.2346679Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:17.2347564Z 
2026-07-08T08:28:17.2348051Z - Expected
2026-07-08T08:28:17.2348687Z + Received
2026-07-08T08:28:17.2349157Z 
2026-07-08T08:28:17.2349353Z - 4
2026-07-08T08:28:17.2349718Z + 3
2026-07-08T08:28:17.2349915Z 
2026-07-08T08:28:17.2350503Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:17.2505598Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:17.2507202Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:17.2509180Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:17.2510716Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:17.2511383Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:17.2511899Z     [90m  8| [39m
2026-07-08T08:28:17.2512186Z 
2026-07-08T08:28:17.2512727Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:17.2513124Z 
2026-07-08T08:28:17.2513491Z 
2026-07-08T08:28:17.2547181Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:17.2560182Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:17.2561728Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:17.2562777Z [2m   Start at [22m 08:28:16
2026-07-08T08:28:17.2564517Z [2m   Duration [22m 362ms[2m (transform 40ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 69ms)[22m
2026-07-08T08:28:17.2565734Z 
2026-07-08T08:28:17.2761076Z ##[error]Process completed with exit code 1.
2026-07-08T08:28:02.7020000Z Evaluating test.if
2026-07-08T08:28:02.7020000Z Evaluating: success()
2026-07-08T08:28:02.7020000Z Result: true
2026-07-08T08:28:02.7110000Z Job is about to start running on the hosted runner: GitHub Actions 1000001026
2026-07-08T08:28:02.7090000Z Requested labels: ubuntu-latest
2026-07-08T08:28:02.7090000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:28:02.7090000Z Waiting for a runner to pick up this job...
2026-07-08T08:28:02.7110000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.