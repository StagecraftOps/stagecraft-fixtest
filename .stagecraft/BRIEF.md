# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is summing the values and dividing by the wrong denominator (e.g., dividing by `length + 1` or `length * 2` instead of `length`), or it is computing a non-arithmetic mean (e.g., summing 2+4 = 6 then dividing by 2, ignoring the third element, or computing the median instead of the mean).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is 4), so the bug is in the `average` function's source code returning 3 rather than 4, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:30.2433438Z ##[endgroup]
2026-07-08T08:26:30.3510011Z 
2026-07-08T08:26:30.3510788Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:26:30.3511280Z > tsc --noEmit
2026-07-08T08:26:30.3511836Z 
﻿2026-07-08T08:26:31.2201089Z ##[group]Run npm run test
2026-07-08T08:26:31.2201407Z [36;1mnpm run test[0m
2026-07-08T08:26:31.2233449Z shell: /usr/bin/bash -e {0}
2026-07-08T08:26:31.2233718Z ##[endgroup]
2026-07-08T08:26:31.3378599Z 
2026-07-08T08:26:31.3379226Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:26:31.3379938Z > vitest run
2026-07-08T08:26:31.3380110Z 
2026-07-08T08:26:31.6638375Z 
2026-07-08T08:26:31.6648304Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:26:31.6649171Z 
2026-07-08T08:26:31.9791876Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:26:31.9793413Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:26:31.9794193Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:31.9889786Z 
2026-07-08T08:26:31.9897151Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:26:31.9897719Z 
2026-07-08T08:26:31.9900497Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:26:31.9902484Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:31.9903135Z 
2026-07-08T08:26:31.9903413Z - Expected
2026-07-08T08:26:31.9903752Z + Received
2026-07-08T08:26:31.9903962Z 
2026-07-08T08:26:31.9904108Z - 4
2026-07-08T08:26:31.9904432Z + 3
2026-07-08T08:26:31.9904617Z 
2026-07-08T08:26:31.9905342Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:26:32.0048600Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:32.0050234Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:32.0052125Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:26:32.0053576Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:26:32.0054293Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:26:32.0054816Z     [90m  8| [39m
2026-07-08T08:26:32.0055077Z 
2026-07-08T08:26:32.0055575Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:26:32.0055979Z 
2026-07-08T08:26:32.0056011Z 
2026-07-08T08:26:32.0086126Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:26:32.0096987Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:26:32.0097839Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:26:32.0098562Z [2m   Start at [22m 08:26:31
2026-07-08T08:26:32.0099974Z [2m   Duration [22m 325ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 78ms)[22m
2026-07-08T08:26:32.0100587Z 
2026-07-08T08:26:32.0291776Z ##[error]Process completed with exit code 1.
2026-07-08T08:26:16.7930000Z Requested labels: ubuntu-latest
2026-07-08T08:26:16.7930000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:26:16.7930000Z Waiting for a runner to pick up this job...
2026-07-08T08:26:16.7960000Z Evaluating test.if
2026-07-08T08:26:16.7960000Z Evaluating: success()
2026-07-08T08:26:16.7960000Z Result: true
2026-07-08T08:26:17.1700000Z Job is about to start running on the hosted runner: GitHub Actions 1000001008
2026-07-08T08:26:17.1690000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.