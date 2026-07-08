# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by `(n+1)` or using a wrong divisor (e.g., dividing the sum 12 by 4 instead of 3), or possibly computing a median/wrong aggregation rather than the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (mean of [2,4,6] is indeed 4), so the bug lives in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
.7007498Z ##[endgroup]
2026-07-08T08:46:01.8103454Z 
2026-07-08T08:46:01.8104134Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:46:01.8104815Z > tsc --noEmit
2026-07-08T08:46:01.8105080Z 
﻿2026-07-08T08:46:02.7403040Z ##[group]Run npm run test
2026-07-08T08:46:02.7403932Z [36;1mnpm run test[0m
2026-07-08T08:46:02.7437246Z shell: /usr/bin/bash -e {0}
2026-07-08T08:46:02.7437515Z ##[endgroup]
2026-07-08T08:46:02.8669163Z 
2026-07-08T08:46:02.8669638Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:46:02.8670159Z > vitest run
2026-07-08T08:46:02.8670408Z 
2026-07-08T08:46:03.2482518Z 
2026-07-08T08:46:03.2504039Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:46:03.2532537Z 
2026-07-08T08:46:03.6472445Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:46:03.6474364Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:46:03.6475584Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:03.6613123Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:46:03.6614043Z 
2026-07-08T08:46:03.6614221Z 
2026-07-08T08:46:03.6643719Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:46:03.6645225Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:03.6645826Z 
2026-07-08T08:46:03.6646299Z - Expected
2026-07-08T08:46:03.6646656Z + Received
2026-07-08T08:46:03.6646843Z 
2026-07-08T08:46:03.6647217Z - 4
2026-07-08T08:46:03.6647522Z + 3
2026-07-08T08:46:03.6647688Z 
2026-07-08T08:46:03.6648380Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:46:03.6760700Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:03.6762277Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:03.6764046Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:46:03.6773297Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:46:03.6773984Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:46:03.6774713Z     [90m  8| [39m
2026-07-08T08:46:03.6774934Z 
2026-07-08T08:46:03.6775414Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:46:03.6775770Z 
2026-07-08T08:46:03.6775787Z 
2026-07-08T08:46:03.6827992Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:46:03.6840361Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:46:03.6841591Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:46:03.6843120Z [2m   Start at [22m 08:46:03
2026-07-08T08:46:03.6844380Z [2m   Duration [22m 412ms[2m (transform 53ms, setup 0ms, collect 41ms, tests 11ms, environment 0ms, prepare 121ms)[22m
2026-07-08T08:46:03.6845188Z 
2026-07-08T08:46:03.7052720Z ##[error]Process completed with exit code 1.
2026-07-08T08:45:52.6150000Z Evaluating test.if
2026-07-08T08:45:52.6150000Z Evaluating: success()
2026-07-08T08:45:52.6150000Z Result: true
2026-07-08T08:45:53.0840000Z Job is about to start running on the hosted runner: GitHub Actions 1000001131
2026-07-08T08:45:53.0750000Z Requested labels: ubuntu-latest
2026-07-08T08:45:53.0750000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:45:53.0750000Z Waiting for a runner to pick up this job...
2026-07-08T08:45:53.0840000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.