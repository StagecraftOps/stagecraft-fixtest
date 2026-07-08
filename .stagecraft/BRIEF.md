# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test at `src/math.test.ts:6` calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — likely summing the values correctly but dividing by the wrong count (e.g., dividing by `array.length + 1`, or off-by-one in the sum/loop), or using an incorrect algorithm entirely.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by a logic bug in the application's `average()` function, not a workflow misconfiguration — no changes to the CI YAML would fix an incorrect return value from source code.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:27.3113559Z ##[endgroup]
2026-07-08T08:55:27.4253028Z 
2026-07-08T08:55:27.4254082Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:55:27.4255461Z > tsc --noEmit
2026-07-08T08:55:27.4255835Z 
﻿2026-07-08T08:55:28.2950455Z ##[group]Run npm run test
2026-07-08T08:55:28.2951051Z [36;1mnpm run test[0m
2026-07-08T08:55:28.2983891Z shell: /usr/bin/bash -e {0}
2026-07-08T08:55:28.2984167Z ##[endgroup]
2026-07-08T08:55:28.4123417Z 
2026-07-08T08:55:28.4124935Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:55:28.4125631Z > vitest run
2026-07-08T08:55:28.4125891Z 
2026-07-08T08:55:28.7612930Z 
2026-07-08T08:55:28.7636735Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:55:28.7637930Z 
2026-07-08T08:55:29.1046548Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:55:29.1048765Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:55:29.1049550Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:29.1155521Z 
2026-07-08T08:55:29.1163380Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:55:29.1164075Z 
2026-07-08T08:55:29.1166255Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:55:29.1168410Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:29.1168982Z 
2026-07-08T08:55:29.1169236Z - Expected
2026-07-08T08:55:29.1169594Z + Received
2026-07-08T08:55:29.1169789Z 
2026-07-08T08:55:29.1169942Z - 4
2026-07-08T08:55:29.1170296Z + 3
2026-07-08T08:55:29.1170483Z 
2026-07-08T08:55:29.1171283Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:55:29.1323746Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:29.1325646Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:29.1327622Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:55:29.1329096Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:55:29.1329826Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:55:29.1330401Z     [90m  8| [39m
2026-07-08T08:55:29.1330641Z 
2026-07-08T08:55:29.1331199Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:55:29.1331625Z 
2026-07-08T08:55:29.1331670Z 
2026-07-08T08:55:29.1363816Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:55:29.1377295Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:55:29.1378325Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:55:29.1379054Z [2m   Start at [22m 08:55:28
2026-07-08T08:55:29.1380035Z [2m   Duration [22m 354ms[2m (transform 38ms, setup 0ms, collect 33ms, tests 8ms, environment 0ms, prepare 85ms)[22m
2026-07-08T08:55:29.1381063Z 
2026-07-08T08:55:29.1581380Z ##[error]Process completed with exit code 1.
2026-07-08T08:55:18.5140000Z Evaluating test.if
2026-07-08T08:55:18.5140000Z Evaluating: success()
2026-07-08T08:55:18.5140000Z Result: true
2026-07-08T08:55:18.9330000Z Job is about to start running on the hosted runner: GitHub Actions 1000001190
2026-07-08T08:55:18.9270000Z Requested labels: ubuntu-latest
2026-07-08T08:55:18.9270000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:55:18.9270000Z Waiting for a runner to pick up this job...
2026-07-08T08:55:18.9330000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.