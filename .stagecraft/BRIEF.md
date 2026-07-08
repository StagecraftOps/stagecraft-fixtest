# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by a wrong denominator (e.g., dividing by `array.length + 1`, or off-by-one in iteration), or it is incorrectly summing the values before dividing.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:50.3589749Z ##[endgroup]
2026-07-08T08:19:50.4781996Z 
2026-07-08T08:19:50.4782852Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:19:50.4783516Z > tsc --noEmit
2026-07-08T08:19:50.4783724Z 
﻿2026-07-08T08:19:51.4623298Z ##[group]Run npm run test
2026-07-08T08:19:51.4623959Z [36;1mnpm run test[0m
2026-07-08T08:19:51.4669840Z shell: /usr/bin/bash -e {0}
2026-07-08T08:19:51.4670260Z ##[endgroup]
2026-07-08T08:19:51.5844415Z 
2026-07-08T08:19:51.5845635Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:19:51.5846333Z > vitest run
2026-07-08T08:19:51.5846643Z 
2026-07-08T08:19:51.9485907Z 
2026-07-08T08:19:51.9487750Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:19:51.9488556Z 
2026-07-08T08:19:52.2924059Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:19:52.2925452Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:19:52.2926228Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:19:52.3020863Z 
2026-07-08T08:19:52.3027718Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:19:52.3028578Z 
2026-07-08T08:19:52.3030571Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:19:52.3032647Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:19:52.3033245Z 
2026-07-08T08:19:52.3033417Z - Expected
2026-07-08T08:19:52.3033899Z + Received
2026-07-08T08:19:52.3034154Z 
2026-07-08T08:19:52.3034493Z - 4
2026-07-08T08:19:52.3034798Z + 3
2026-07-08T08:19:52.3034975Z 
2026-07-08T08:19:52.3040107Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:19:52.3181606Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:19:52.3183388Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:19:52.3185660Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:19:52.3186546Z 
2026-07-08T08:19:52.3219495Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:19:52.3232038Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:19:52.3232527Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:19:52.3232878Z     [90m  8| [39m
2026-07-08T08:19:52.3233029Z 
2026-07-08T08:19:52.3233343Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:19:52.3233607Z 
2026-07-08T08:19:52.3233991Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:19:52.3234822Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:19:52.3235990Z [2m   Start at [22m 08:19:51
2026-07-08T08:19:52.3237461Z [2m   Duration [22m 354ms[2m (transform 38ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 65ms)[22m
2026-07-08T08:19:52.3238340Z 
2026-07-08T08:19:52.3426826Z ##[error]Process completed with exit code 1.
2026-07-08T08:19:40.6690000Z Evaluating test.if
2026-07-08T08:19:40.6690000Z Evaluating: success()
2026-07-08T08:19:40.6690000Z Result: true
2026-07-08T08:19:40.6710000Z Requested labels: ubuntu-latest
2026-07-08T08:19:40.6710000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:19:40.6710000Z Waiting for a runner to pick up this job...
2026-07-08T08:19:40.9590000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:19:40.9600000Z Job is about to start running on the hosted runner: GitHub Actions 1000000982
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.