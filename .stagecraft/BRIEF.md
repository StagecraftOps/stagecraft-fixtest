# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input `[2, 4, 6]`. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is computing the wrong result — most likely using integer division, summing incorrectly, or off-by-one in the count.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's source implementation returning 3 instead of 4, which requires fixing application source code — not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
56.0174788Z ##[endgroup]
2026-07-08T08:29:56.1302611Z 
2026-07-08T08:29:56.1303192Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:29:56.1304179Z > tsc --noEmit
2026-07-08T08:29:56.1304447Z 
﻿2026-07-08T08:29:56.9720940Z ##[group]Run npm run test
2026-07-08T08:29:56.9721267Z [36;1mnpm run test[0m
2026-07-08T08:29:56.9754067Z shell: /usr/bin/bash -e {0}
2026-07-08T08:29:56.9754419Z ##[endgroup]
2026-07-08T08:29:57.0878009Z 
2026-07-08T08:29:57.0878556Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:29:57.0879065Z > vitest run
2026-07-08T08:29:57.0879237Z 
2026-07-08T08:29:57.4008552Z 
2026-07-08T08:29:57.4012444Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:29:57.4013339Z 
2026-07-08T08:29:57.7536489Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:29:57.7538466Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:29:57.7539499Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:57.7651633Z 
2026-07-08T08:29:57.7660045Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:29:57.7661037Z 
2026-07-08T08:29:57.7664629Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:29:57.7667113Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:29:57.7667803Z 
2026-07-08T08:29:57.7667984Z - Expected
2026-07-08T08:29:57.7668376Z + Received
2026-07-08T08:29:57.7668598Z 
2026-07-08T08:29:57.7668756Z - 4
2026-07-08T08:29:57.7669100Z + 3
2026-07-08T08:29:57.7669302Z 
2026-07-08T08:29:57.7669871Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:29:57.7819926Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:29:57.7821850Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:29:57.7824683Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:29:57.7825861Z 
2026-07-08T08:29:57.7859463Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:29:57.7873144Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:29:57.7884640Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:29:57.7885309Z     [90m  8| [39m
2026-07-08T08:29:57.7885697Z 
2026-07-08T08:29:57.7886339Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:29:57.7886837Z 
2026-07-08T08:29:57.7887523Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:29:57.7889077Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:29:57.7890232Z [2m   Start at [22m 08:29:57
2026-07-08T08:29:57.7892025Z [2m   Duration [22m 364ms[2m (transform 44ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 119ms)[22m
2026-07-08T08:29:57.7892991Z 
2026-07-08T08:29:57.8061327Z ##[error]Process completed with exit code 1.
2026-07-08T08:29:42.6240000Z Requested labels: ubuntu-latest
2026-07-08T08:29:42.6240000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:29:42.6240000Z Waiting for a runner to pick up this job...
2026-07-08T08:29:42.6380000Z Job is about to start running on the hosted runner: GitHub Actions 1000001042
2026-07-08T08:29:42.6170000Z Evaluating test.if
2026-07-08T08:29:42.6170000Z Evaluating: success()
2026-07-08T08:29:42.6170000Z Result: true
2026-07-08T08:29:42.6380000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.