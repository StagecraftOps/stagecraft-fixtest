# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test at `src/math.test.ts:6` calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely the function is summing the values but dividing by the wrong count (e.g., dividing by `arr.length + 1`, using integer/floor division incorrectly, or off-by-one in the accumulation logic).

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch caused by a bug in the application's `average` function implementation, not a workflow misconfiguration — no change to the CI YAML will fix an incorrect computed value.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:45.1390806Z ##[endgroup]
2026-07-08T08:34:45.2419318Z 
2026-07-08T08:34:45.2420036Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:34:45.2420495Z > tsc --noEmit
2026-07-08T08:34:45.2420670Z 
﻿2026-07-08T08:34:46.0290574Z ##[group]Run npm run test
2026-07-08T08:34:46.0291074Z [36;1mnpm run test[0m
2026-07-08T08:34:46.0310652Z shell: /usr/bin/bash -e {0}
2026-07-08T08:34:46.0310937Z ##[endgroup]
2026-07-08T08:34:46.1320415Z 
2026-07-08T08:34:46.1321373Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:34:46.1321944Z > vitest run
2026-07-08T08:34:46.1322150Z 
2026-07-08T08:34:46.4495375Z 
2026-07-08T08:34:46.4498860Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:34:46.4500009Z 
2026-07-08T08:34:46.7838369Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:34:46.7839775Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:34:46.7840627Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:34:46.7923451Z 
2026-07-08T08:34:46.7930299Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:34:46.7931242Z 
2026-07-08T08:34:46.7934116Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:34:46.7935644Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:34:46.7936209Z 
2026-07-08T08:34:46.7936504Z - Expected
2026-07-08T08:34:46.7936880Z + Received
2026-07-08T08:34:46.7937084Z 
2026-07-08T08:34:46.7937242Z - 4
2026-07-08T08:34:46.7937570Z + 3
2026-07-08T08:34:46.7937753Z 
2026-07-08T08:34:46.7938277Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:34:46.8073923Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:34:46.8075359Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:34:46.8077166Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:34:46.8078389Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:34:46.8079027Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:34:46.8079516Z     [90m  8| [39m
2026-07-08T08:34:46.8079722Z 
2026-07-08T08:34:46.8080243Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:34:46.8080575Z 
2026-07-08T08:34:46.8080617Z 
2026-07-08T08:34:46.8111126Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:34:46.8123738Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:34:46.8125165Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:34:46.8126106Z [2m   Start at [22m 08:34:46
2026-07-08T08:34:46.8127505Z [2m   Duration [22m 343ms[2m (transform 42ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 87ms)[22m
2026-07-08T08:34:46.8128317Z 
2026-07-08T08:34:46.8273850Z ##[error]Process completed with exit code 1.
2026-07-08T08:34:36.5650000Z Evaluating test.if
2026-07-08T08:34:36.5650000Z Evaluating: success()
2026-07-08T08:34:36.5650000Z Result: true
2026-07-08T08:34:36.5770000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:34:36.5690000Z Requested labels: ubuntu-latest
2026-07-08T08:34:36.5690000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:34:36.5690000Z Waiting for a runner to pick up this job...
2026-07-08T08:34:36.5770000Z Job is about to start running on the hosted runner: GitHub Actions 1000001063
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.