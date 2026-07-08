# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or its implementation) returns 3 instead of the expected 4 when called with [2, 4, 6]. The correct mean of those three numbers is 4, but the function is producing 3 — indicating a bug in the average/mean implementation (e.g. summing correctly but dividing by `arr.length + 1` or an off-by-one in the divisor, or using integer truncation incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch (expected 4, received 3) in the `average` function's source implementation, which is a logic bug in the application code that cannot be fixed by modifying the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:43.0207511Z ##[endgroup]
2026-07-08T08:55:43.1489359Z 
2026-07-08T08:55:43.1490490Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:55:43.1491294Z > tsc --noEmit
2026-07-08T08:55:43.1491723Z 
﻿2026-07-08T08:55:44.2111228Z ##[group]Run npm run test
2026-07-08T08:55:44.2111877Z [36;1mnpm run test[0m
2026-07-08T08:55:44.2146178Z shell: /usr/bin/bash -e {0}
2026-07-08T08:55:44.2146503Z ##[endgroup]
2026-07-08T08:55:44.3414313Z 
2026-07-08T08:55:44.3415186Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:55:44.3415737Z > vitest run
2026-07-08T08:55:44.3415948Z 
2026-07-08T08:55:44.7618917Z 
2026-07-08T08:55:44.7624110Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:55:44.7625169Z 
2026-07-08T08:55:45.2166321Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:55:45.2188680Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:55:45.2230628Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:45.2294939Z 
2026-07-08T08:55:45.2303629Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:55:45.2304720Z 
2026-07-08T08:55:45.2307044Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:55:45.2309654Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:45.2310648Z 
2026-07-08T08:55:45.2311173Z - Expected
2026-07-08T08:55:45.2311889Z + Received
2026-07-08T08:55:45.2312369Z 
2026-07-08T08:55:45.2312818Z - 4
2026-07-08T08:55:45.2313445Z + 3
2026-07-08T08:55:45.2313912Z 
2026-07-08T08:55:45.2314753Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:55:45.2464719Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:45.2466906Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:45.2468320Z 
2026-07-08T08:55:45.2470332Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:55:45.2508790Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:55:45.2524100Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:55:45.2525464Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:55:45.2526561Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:55:45.2528027Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:55:45.2529004Z [2m   Start at [22m 08:55:44
2026-07-08T08:55:45.2530684Z [2m   Duration [22m 467ms[2m (transform 48ms, setup 0ms, collect 41ms, tests 9ms, environment 0ms, prepare 86ms)[22m
2026-07-08T08:55:45.2531512Z 
2026-07-08T08:55:45.2531835Z     [90m  8| [39m
2026-07-08T08:55:45.2532110Z 
2026-07-08T08:55:45.2532645Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:55:45.2533196Z 
2026-07-08T08:55:45.2755060Z ##[error]Process completed with exit code 1.
2026-07-08T08:55:32.6970000Z Job is about to start running on the hosted runner: GitHub Actions 1000001192
2026-07-08T08:55:32.6960000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:55:32.6810000Z Evaluating test.if
2026-07-08T08:55:32.6810000Z Evaluating: success()
2026-07-08T08:55:32.6810000Z Result: true
2026-07-08T08:55:32.6830000Z Requested labels: ubuntu-latest
2026-07-08T08:55:32.6830000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:55:32.6830000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.