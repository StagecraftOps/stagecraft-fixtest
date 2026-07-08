# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean value of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong denominator (e.g., dividing by `length + 1` or `length * 2`), or is off-by-one in its summation logic.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2+4+6 = 12/3 = 4), so the bug lies in the `average` function's source code returning 3 instead of 4, not in any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:27.5630214Z ##[endgroup]
2026-07-08T08:45:27.6796393Z 
2026-07-08T08:45:27.6797355Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:45:27.6798020Z > tsc --noEmit
2026-07-08T08:45:27.6798261Z 
﻿2026-07-08T08:45:28.4844686Z ##[group]Run npm run test
2026-07-08T08:45:28.4845271Z [36;1mnpm run test[0m
2026-07-08T08:45:28.4881895Z shell: /usr/bin/bash -e {0}
2026-07-08T08:45:28.4882183Z ##[endgroup]
2026-07-08T08:45:28.5992525Z 
2026-07-08T08:45:28.5993333Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:45:28.5993850Z > vitest run
2026-07-08T08:45:28.5994099Z 
2026-07-08T08:45:28.9309241Z 
2026-07-08T08:45:28.9313109Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:45:28.9319731Z 
2026-07-08T08:45:29.2485481Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:45:29.2486842Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:45:29.2487541Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:29.2599587Z 
2026-07-08T08:45:29.2600682Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:45:29.2601240Z 
2026-07-08T08:45:29.2604597Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:45:29.2606507Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:45:29.2607143Z 
2026-07-08T08:45:29.2607325Z - Expected
2026-07-08T08:45:29.2607666Z + Received
2026-07-08T08:45:29.2607855Z 
2026-07-08T08:45:29.2607985Z - 4
2026-07-08T08:45:29.2608328Z + 3
2026-07-08T08:45:29.2608486Z 
2026-07-08T08:45:29.2609632Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:45:29.2756275Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:29.2757622Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:45:29.2759558Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:45:29.2760873Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:45:29.2761522Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:45:29.2762010Z     [90m  8| [39m
2026-07-08T08:45:29.2762219Z 
2026-07-08T08:45:29.2762748Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:45:29.2763206Z 
2026-07-08T08:45:29.2763493Z 
2026-07-08T08:45:29.2794706Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:45:29.2809357Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:45:29.2810677Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:45:29.2811571Z [2m   Start at [22m 08:45:28
2026-07-08T08:45:29.2812762Z [2m   Duration [22m 328ms[2m (transform 50ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 91ms)[22m
2026-07-08T08:45:29.2813551Z 
2026-07-08T08:45:29.3014817Z ##[error]Process completed with exit code 1.
2026-07-08T08:45:18.9360000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:45:18.9300000Z Requested labels: ubuntu-latest
2026-07-08T08:45:18.9300000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:45:18.9300000Z Waiting for a runner to pick up this job...
2026-07-08T08:45:18.9360000Z Job is about to start running on the hosted runner: GitHub Actions 1000001126
2026-07-08T08:45:18.9290000Z Evaluating test.if
2026-07-08T08:45:18.9290000Z Evaluating: success()
2026-07-08T08:45:18.9290000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.