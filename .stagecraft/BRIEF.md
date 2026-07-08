# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely summing the values but dividing by the wrong count (e.g., using `array.length - 1` instead of `array.length`, or an off-by-one error in accumulation).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug is in the application's `average` function returning 3 instead of 4, which requires fixing the source code rather than the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
1.3522529Z ##[endgroup]
2026-07-08T08:46:41.4643694Z 
2026-07-08T08:46:41.4644702Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:46:41.4645220Z > tsc --noEmit
2026-07-08T08:46:41.4645390Z 
﻿2026-07-08T08:46:42.3096280Z ##[group]Run npm run test
2026-07-08T08:46:42.3096604Z [36;1mnpm run test[0m
2026-07-08T08:46:42.3129056Z shell: /usr/bin/bash -e {0}
2026-07-08T08:46:42.3129337Z ##[endgroup]
2026-07-08T08:46:42.4273890Z 
2026-07-08T08:46:42.4274585Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:46:42.4275297Z > vitest run
2026-07-08T08:46:42.4275538Z 
2026-07-08T08:46:42.7567214Z 
2026-07-08T08:46:42.7571659Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:46:42.7572679Z 
2026-07-08T08:46:43.0768061Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 13[2mms[22m[39m
2026-07-08T08:46:43.0770295Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:46:43.0771762Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:43.0882028Z 
2026-07-08T08:46:43.0890303Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:46:43.0891099Z 
2026-07-08T08:46:43.0893599Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:46:43.0895957Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:43.0896564Z 
2026-07-08T08:46:43.0896845Z - Expected
2026-07-08T08:46:43.0897416Z + Received
2026-07-08T08:46:43.0897944Z 
2026-07-08T08:46:43.0898252Z - 4
2026-07-08T08:46:43.0898792Z + 3
2026-07-08T08:46:43.0899174Z 
2026-07-08T08:46:43.0900184Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:46:43.1071227Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:43.1071920Z 
2026-07-08T08:46:43.1116423Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:46:43.1131296Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:46:43.1132734Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:46:43.1133838Z [2m   Start at [22m 08:46:42
2026-07-08T08:46:43.1135228Z [2m   Duration [22m 331ms[2m (transform 39ms, setup 0ms, collect 32ms, tests 13ms, environment 0ms, prepare 69ms)[22m
2026-07-08T08:46:43.1136065Z 
2026-07-08T08:46:43.1136970Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:43.1138937Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:46:43.1140654Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:46:43.1141434Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:46:43.1142033Z     [90m  8| [39m
2026-07-08T08:46:43.1142301Z 
2026-07-08T08:46:43.1142853Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:46:43.1143356Z 
2026-07-08T08:46:43.1290974Z ##[error]Process completed with exit code 1.
2026-07-08T08:46:28.3600000Z Evaluating test.if
2026-07-08T08:46:28.3600000Z Evaluating: success()
2026-07-08T08:46:28.3600000Z Result: true
2026-07-08T08:46:28.3620000Z Requested labels: ubuntu-latest
2026-07-08T08:46:28.3620000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:46:28.3620000Z Waiting for a runner to pick up this job...
2026-07-08T08:46:28.3750000Z Job is about to start running on the hosted runner: GitHub Actions 1000001135
2026-07-08T08:46:28.3750000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.