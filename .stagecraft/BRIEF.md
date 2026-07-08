# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or its implementation) is returning 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function produces 3. This indicates a bug in the `average` function's implementation — most likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` instead of `array.length`, or summing incorrectly), causing it to return the wrong result.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch in a unit test caused by a logic bug in the application's `average` function implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:18.5054054Z ##[endgroup]
2026-07-08T08:41:18.6168449Z 
2026-07-08T08:41:18.6169025Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:41:18.6169510Z > tsc --noEmit
2026-07-08T08:41:18.6169663Z 
﻿2026-07-08T08:41:19.4168120Z ##[group]Run npm run test
2026-07-08T08:41:19.4168701Z [36;1mnpm run test[0m
2026-07-08T08:41:19.4204177Z shell: /usr/bin/bash -e {0}
2026-07-08T08:41:19.4204476Z ##[endgroup]
2026-07-08T08:41:19.5355298Z 
2026-07-08T08:41:19.5356039Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:41:19.5356444Z > vitest run
2026-07-08T08:41:19.5356586Z 
2026-07-08T08:41:19.8697250Z 
2026-07-08T08:41:19.8700855Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:41:19.8701694Z 
2026-07-08T08:41:20.1790742Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:41:20.1791933Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:41:20.1792619Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:20.1904466Z 
2026-07-08T08:41:20.1912845Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:41:20.1913551Z 
2026-07-08T08:41:20.1915842Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:41:20.1918465Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:20.1919041Z 
2026-07-08T08:41:20.1919197Z - Expected
2026-07-08T08:41:20.1919637Z + Received
2026-07-08T08:41:20.1919861Z 
2026-07-08T08:41:20.1920098Z - 4
2026-07-08T08:41:20.1920518Z + 3
2026-07-08T08:41:20.1920693Z 
2026-07-08T08:41:20.1921499Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:41:20.2111077Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:20.2112652Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:20.2114486Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:41:20.2116175Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:41:20.2116576Z 
2026-07-08T08:41:20.2116949Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:41:20.2148593Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:41:20.2159557Z     [90m  8| [39m
2026-07-08T08:41:20.2159839Z 
2026-07-08T08:41:20.2160302Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:41:20.2160618Z 
2026-07-08T08:41:20.2161089Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:41:20.2162025Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:41:20.2162755Z [2m   Start at [22m 08:41:19
2026-07-08T08:41:20.2163757Z [2m   Duration [22m 320ms[2m (transform 42ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 79ms)[22m
2026-07-08T08:41:20.2164472Z 
2026-07-08T08:41:20.2363304Z ##[error]Process completed with exit code 1.
2026-07-08T08:41:08.0660000Z Evaluating test.if
2026-07-08T08:41:08.0660000Z Evaluating: success()
2026-07-08T08:41:08.0660000Z Result: true
2026-07-08T08:41:08.5190000Z Requested labels: ubuntu-latest
2026-07-08T08:41:08.5190000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:41:08.5190000Z Waiting for a runner to pick up this job...
2026-07-08T08:41:08.5510000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:41:08.5510000Z Job is about to start running on the hosted runner: GitHub Actions 1000001097
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.