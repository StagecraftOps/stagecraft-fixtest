# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, the function returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — likely the function is computing a sum-divided-by-wrong-count (e.g., dividing by `array.length + 1`, or off-by-one in iteration) or possibly summing only a subset of elements. The test at `src/math.test.ts:6` explicitly asserts `average([2, 4, 6])` equals `4`, which is mathematically correct ((2+4+6)/3 = 4), so the implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct and the failure is caused by a bug in the `average` function's implementation in the application source code, not by any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:11.0324682Z ##[endgroup]
2026-07-08T08:37:11.1438258Z 
2026-07-08T08:37:11.1439377Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:37:11.1440121Z > tsc --noEmit
2026-07-08T08:37:11.1440678Z 
﻿2026-07-08T08:37:11.9950949Z ##[group]Run npm run test
2026-07-08T08:37:11.9951505Z [36;1mnpm run test[0m
2026-07-08T08:37:11.9983586Z shell: /usr/bin/bash -e {0}
2026-07-08T08:37:11.9983854Z ##[endgroup]
2026-07-08T08:37:12.1099203Z 
2026-07-08T08:37:12.1100160Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:37:12.1101110Z > vitest run
2026-07-08T08:37:12.1101293Z 
2026-07-08T08:37:12.4387616Z 
2026-07-08T08:37:12.4392251Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:37:12.4393292Z 
2026-07-08T08:37:12.7679552Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:37:12.7681377Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:37:12.7682229Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:12.7776854Z 
2026-07-08T08:37:12.7783927Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:37:12.7784532Z 
2026-07-08T08:37:12.7787084Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:37:12.7788693Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:12.7789251Z 
2026-07-08T08:37:12.7789409Z - Expected
2026-07-08T08:37:12.7789745Z + Received
2026-07-08T08:37:12.7790037Z 
2026-07-08T08:37:12.7790563Z - 4
2026-07-08T08:37:12.7790882Z + 3
2026-07-08T08:37:12.7791127Z 
2026-07-08T08:37:12.7791624Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:37:12.7936079Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:12.7937532Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:12.7939444Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:37:12.7941342Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:37:12.7942035Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:37:12.7942526Z     [90m  8| [39m
2026-07-08T08:37:12.7942752Z 
2026-07-08T08:37:12.7943211Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:37:12.7943576Z 
2026-07-08T08:37:12.7944009Z 
2026-07-08T08:37:12.7993610Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:37:12.8005219Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:37:12.8006474Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:37:12.8007387Z [2m   Start at [22m 08:37:12
2026-07-08T08:37:12.8008654Z [2m   Duration [22m 339ms[2m (transform 37ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:37:12.8009465Z 
2026-07-08T08:37:12.8192119Z ##[error]Process completed with exit code 1.
2026-07-08T08:37:01.7570000Z Evaluating test.if
2026-07-08T08:37:01.7570000Z Evaluating: success()
2026-07-08T08:37:01.7570000Z Result: true
2026-07-08T08:37:01.7640000Z Requested labels: ubuntu-latest
2026-07-08T08:37:01.7640000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:37:01.7640000Z Waiting for a runner to pick up this job...
2026-07-08T08:37:02.1420000Z Job is about to start running on the hosted runner: GitHub Actions 1000001073
2026-07-08T08:37:02.1420000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.