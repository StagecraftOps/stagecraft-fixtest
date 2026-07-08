# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `average(2, 4, 6)`, it returns `3` instead of the expected `4`. The arithmetic mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation likely has a bug — for example, dividing by the wrong count, using integer division incorrectly, or summing elements incorrectly.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean = 4), so the bug is in the application's `average` function implementation returning 3 instead of 4, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:33.9714381Z ##[endgroup]
2026-07-08T08:53:34.0575817Z 
2026-07-08T08:53:34.0576522Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:53:34.0577024Z > tsc --noEmit
2026-07-08T08:53:34.0577185Z 
﻿2026-07-08T08:53:34.7143683Z ##[group]Run npm run test
2026-07-08T08:53:34.7144143Z [36;1mnpm run test[0m
2026-07-08T08:53:34.7172936Z shell: /usr/bin/bash -e {0}
2026-07-08T08:53:34.7173157Z ##[endgroup]
2026-07-08T08:53:34.8041470Z 
2026-07-08T08:53:34.8042183Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:53:34.8042491Z > vitest run
2026-07-08T08:53:34.8042602Z 
2026-07-08T08:53:35.0683099Z 
2026-07-08T08:53:35.0692353Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:53:35.0692908Z 
2026-07-08T08:53:35.3214775Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:53:35.3216164Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:53:35.3216966Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:35.3294082Z 
2026-07-08T08:53:35.3298449Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:53:35.3299201Z 
2026-07-08T08:53:35.3300753Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:53:35.3302300Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:53:35.3302993Z 
2026-07-08T08:53:35.3303288Z - Expected
2026-07-08T08:53:35.3303942Z + Received
2026-07-08T08:53:35.3304131Z 
2026-07-08T08:53:35.3304240Z - 4
2026-07-08T08:53:35.3304496Z + 3
2026-07-08T08:53:35.3304633Z 
2026-07-08T08:53:35.3305047Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:53:35.3416558Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:35.3417827Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:53:35.3418486Z 
2026-07-08T08:53:35.3446815Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:53:35.3456249Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:53:35.3457333Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:53:35.3457881Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:53:35.3458286Z     [90m  8| [39m
2026-07-08T08:53:35.3458510Z 
2026-07-08T08:53:35.3458938Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:53:35.3459263Z 
2026-07-08T08:53:35.3459717Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:53:35.3460710Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:53:35.3461531Z [2m   Start at [22m 08:53:35
2026-07-08T08:53:35.3462516Z [2m   Duration [22m 261ms[2m (transform 29ms, setup 0ms, collect 24ms, tests 7ms, environment 0ms, prepare 64ms)[22m
2026-07-08T08:53:35.3463174Z 
2026-07-08T08:53:35.3606035Z ##[error]Process completed with exit code 1.
2026-07-08T08:53:25.2950000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:53:25.2700000Z Evaluating test.if
2026-07-08T08:53:25.2700000Z Evaluating: success()
2026-07-08T08:53:25.2700000Z Result: true
2026-07-08T08:53:25.2740000Z Requested labels: ubuntu-latest
2026-07-08T08:53:25.2740000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:53:25.2740000Z Waiting for a runner to pick up this job...
2026-07-08T08:53:25.2950000Z Job is about to start running on the hosted runner: GitHub Actions 1000001172
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.