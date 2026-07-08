# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. The sum of [2, 4, 6] is 12 and dividing by 3 yields 4, so the implementation is likely dividing by the wrong denominator (e.g., hardcoded or off-by-one) or computing the sum incorrectly.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion error in `src/math.test.ts` where the production `average` function returns the wrong value (`3` vs expected `4`), indicating a bug in the application's source code, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:19.1433473Z ##[endgroup]
2026-07-08T08:48:19.2547966Z 
2026-07-08T08:48:19.2548700Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:48:19.2549186Z > tsc --noEmit
2026-07-08T08:48:19.2549366Z 
﻿2026-07-08T08:48:20.1097182Z ##[group]Run npm run test
2026-07-08T08:48:20.1097509Z [36;1mnpm run test[0m
2026-07-08T08:48:20.1130279Z shell: /usr/bin/bash -e {0}
2026-07-08T08:48:20.1130560Z ##[endgroup]
2026-07-08T08:48:20.2243194Z 
2026-07-08T08:48:20.2243664Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:48:20.2244064Z > vitest run
2026-07-08T08:48:20.2244220Z 
2026-07-08T08:48:20.5351223Z 
2026-07-08T08:48:20.5354567Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:48:20.5357730Z 
2026-07-08T08:48:20.8732742Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:48:20.8734758Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:48:20.8735571Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:48:20.8829057Z 
2026-07-08T08:48:20.8835614Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:48:20.8836200Z 
2026-07-08T08:48:20.8838657Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:48:20.8840578Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:48:20.8841194Z 
2026-07-08T08:48:20.8841354Z - Expected
2026-07-08T08:48:20.8841715Z + Received
2026-07-08T08:48:20.8841904Z 
2026-07-08T08:48:20.8842043Z - 4
2026-07-08T08:48:20.8842354Z + 3
2026-07-08T08:48:20.8842531Z 
2026-07-08T08:48:20.8843033Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:48:20.8984731Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:48:20.8986203Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:48:20.8988127Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:48:20.8989888Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:48:20.8990632Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:48:20.8991167Z     [90m  8| [39m
2026-07-08T08:48:20.8991409Z 
2026-07-08T08:48:20.8991964Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:48:20.8992370Z 
2026-07-08T08:48:20.8992398Z 
2026-07-08T08:48:20.9026181Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:48:20.9036104Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:48:20.9036981Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:48:20.9037579Z [2m   Start at [22m 08:48:20
2026-07-08T08:48:20.9038438Z [2m   Duration [22m 348ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 74ms)[22m
2026-07-08T08:48:20.9039065Z 
2026-07-08T08:48:20.9216603Z ##[error]Process completed with exit code 1.
2026-07-08T08:48:06.9600000Z Evaluating test.if
2026-07-08T08:48:06.9600000Z Evaluating: success()
2026-07-08T08:48:06.9600000Z Result: true
2026-07-08T08:48:06.9720000Z Requested labels: ubuntu-latest
2026-07-08T08:48:06.9720000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:48:06.9720000Z Waiting for a runner to pick up this job...
2026-07-08T08:48:07.3550000Z Job is about to start running on the hosted runner: GitHub Actions 1000001143
2026-07-08T08:48:07.3540000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.