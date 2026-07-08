# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in src/math.ts returns the wrong value. The test calls `average(2, 4, 6)` and expects `4` (the correct arithmetic mean of (2+4+6)/3), but the function returns `3`. This indicates a bug in the implementation — most likely the sum is being divided by the wrong denominator (e.g., dividing by the count+1, or summing incorrectly), causing the computed mean to be off.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch where the application's own `average()` function produces an incorrect result (3 instead of 4), meaning the bug lives in the source implementation (src/math.ts), not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:17.9158954Z ##[endgroup]
2026-07-08T08:29:18.0282133Z 
2026-07-08T08:29:18.0282921Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:29:18.0283362Z > tsc --noEmit
2026-07-08T08:29:18.0283512Z 
﻿2026-07-08T08:29:18.9031689Z ##[group]Run npm run test
2026-07-08T08:29:18.9032012Z [36;1mnpm run test[0m
2026-07-08T08:29:18.9064590Z shell: /usr/bin/bash -e {0}
2026-07-08T08:29:18.9064853Z ##[endgroup]
2026-07-08T08:29:19.0154855Z 
2026-07-08T08:29:19.0155566Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:29:19.0156157Z > vitest run
2026-07-08T08:29:19.0156394Z 
2026-07-08T08:29:19.3461296Z 
2026-07-08T08:29:19.3466727Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:29:19.3469885Z 
2026-07-08T08:29:19.6791314Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:29:19.6792803Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:29:19.6793509Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:19.6894765Z 
2026-07-08T08:29:19.6902864Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:29:19.6903495Z 
2026-07-08T08:29:19.6906240Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:29:19.6908197Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:19.6908877Z 
2026-07-08T08:29:19.6909274Z - Expected
2026-07-08T08:29:19.6910127Z + Received
2026-07-08T08:29:19.6910514Z 
2026-07-08T08:29:19.6911076Z - 4
2026-07-08T08:29:19.6911474Z + 3
2026-07-08T08:29:19.6911668Z 
2026-07-08T08:29:19.6912454Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:29:19.7054994Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:29:19.7057191Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:29:19.7058044Z 
2026-07-08T08:29:19.7089265Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:29:19.7102323Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:29:19.7104089Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:29:19.7104855Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:29:19.7105399Z     [90m  8| [39m
2026-07-08T08:29:19.7105684Z 
2026-07-08T08:29:19.7106290Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:29:19.7106696Z 
2026-07-08T08:29:19.7107322Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:29:19.7108701Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:29:19.7110019Z [2m   Start at [22m 08:29:19
2026-07-08T08:29:19.7111547Z [2m   Duration [22m 346ms[2m (transform 39ms, setup 0ms, collect 34ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:29:19.7112525Z 
2026-07-08T08:29:19.7295676Z ##[error]Process completed with exit code 1.
2026-07-08T08:29:05.6380000Z Requested labels: ubuntu-latest
2026-07-08T08:29:05.6380000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:29:05.6380000Z Waiting for a runner to pick up this job...
2026-07-08T08:29:05.6330000Z Evaluating test.if
2026-07-08T08:29:05.6330000Z Evaluating: success()
2026-07-08T08:29:05.6330000Z Result: true
2026-07-08T08:29:05.6460000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:29:05.6490000Z Job is about to start running on the hosted runner: GitHub Actions 1000001033
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.