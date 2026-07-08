# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test calls `average(2, 4, 6)` and expects `4` (the arithmetic mean of 2, 4, and 6), but the function returns `3`. This indicates a bug in the implementation — likely summing without dividing by the correct count, dividing by the wrong value, or an off-by-one error in the sum/count logic.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug is in the `average` function's source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:06.5989185Z ##[endgroup]
2026-07-08T08:43:06.7117061Z 
2026-07-08T08:43:06.7118067Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:43:06.7118568Z > tsc --noEmit
2026-07-08T08:43:06.7118737Z 
﻿2026-07-08T08:43:07.5685140Z ##[group]Run npm run test
2026-07-08T08:43:07.5685449Z [36;1mnpm run test[0m
2026-07-08T08:43:07.5717984Z shell: /usr/bin/bash -e {0}
2026-07-08T08:43:07.5718256Z ##[endgroup]
2026-07-08T08:43:07.6801949Z 
2026-07-08T08:43:07.6802549Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:43:07.6803151Z > vitest run
2026-07-08T08:43:07.6803383Z 
2026-07-08T08:43:08.0094964Z 
2026-07-08T08:43:08.0100320Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:43:08.0101224Z 
2026-07-08T08:43:08.3509142Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:43:08.3510950Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:43:08.3511701Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:08.3614292Z 
2026-07-08T08:43:08.3621928Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:43:08.3622509Z 
2026-07-08T08:43:08.3625452Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:43:08.3627272Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:08.3628139Z 
2026-07-08T08:43:08.3628652Z - Expected
2026-07-08T08:43:08.3629056Z + Received
2026-07-08T08:43:08.3629253Z 
2026-07-08T08:43:08.3629398Z - 4
2026-07-08T08:43:08.3629717Z + 3
2026-07-08T08:43:08.3629898Z 
2026-07-08T08:43:08.3630461Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:43:08.3778865Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:08.3780915Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:08.3781794Z 
2026-07-08T08:43:08.3813637Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:43:08.3826426Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:43:08.3827991Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:43:08.3828741Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:43:08.3829314Z     [90m  8| [39m
2026-07-08T08:43:08.3829545Z 
2026-07-08T08:43:08.3830080Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:43:08.3830472Z 
2026-07-08T08:43:08.3831036Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:43:08.3832319Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:43:08.3833313Z [2m   Start at [22m 08:43:07
2026-07-08T08:43:08.3834674Z [2m   Duration [22m 352ms[2m (transform 45ms, setup 0ms, collect 35ms, tests 9ms, environment 0ms, prepare 85ms)[22m
2026-07-08T08:43:08.3835532Z 
2026-07-08T08:43:08.4018688Z ##[error]Process completed with exit code 1.
2026-07-08T08:42:53.0690000Z Evaluating test.if
2026-07-08T08:42:53.0690000Z Evaluating: success()
2026-07-08T08:42:53.0690000Z Result: true
2026-07-08T08:42:53.5930000Z Job is about to start running on the hosted runner: GitHub Actions 1000001109
2026-07-08T08:42:53.5810000Z Requested labels: ubuntu-latest
2026-07-08T08:42:53.5810000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:42:53.5810000Z Waiting for a runner to pick up this job...
2026-07-08T08:42:53.5930000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.