# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by one more than the actual count (e.g., using `array.length + 1` or off-by-one index), or is summing only part of the array. The test at `src/math.test.ts:6` is correct and the implementation needs to be fixed.

## Why this is a code-level issue, not a pipeline config issue

The test assertion (`expect(average([2, 4, 6])).toBe(4)`) is mathematically correct, so the bug is in the `average` function's source implementation returning 3 instead of 4, which requires fixing the application code, not the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:34.3014654Z ##[endgroup]
2026-07-08T08:41:34.4189781Z 
2026-07-08T08:41:34.4190801Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:41:34.4191514Z > tsc --noEmit
2026-07-08T08:41:34.4191773Z 
﻿2026-07-08T08:41:35.3164931Z ##[group]Run npm run test
2026-07-08T08:41:35.3165263Z [36;1mnpm run test[0m
2026-07-08T08:41:35.3198274Z shell: /usr/bin/bash -e {0}
2026-07-08T08:41:35.3198546Z ##[endgroup]
2026-07-08T08:41:35.4343692Z 
2026-07-08T08:41:35.4344642Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:41:35.4345092Z > vitest run
2026-07-08T08:41:35.4345238Z 
2026-07-08T08:41:35.7903407Z 
2026-07-08T08:41:35.7907862Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:41:35.7909047Z 
2026-07-08T08:41:36.1346990Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:41:36.1348832Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:41:36.1350007Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:36.1452615Z 
2026-07-08T08:41:36.1460945Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:41:36.1461683Z 
2026-07-08T08:41:36.1464228Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:41:36.1466614Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:41:36.1467214Z 
2026-07-08T08:41:36.1467657Z - Expected
2026-07-08T08:41:36.1468138Z + Received
2026-07-08T08:41:36.1468348Z 
2026-07-08T08:41:36.1468503Z - 4
2026-07-08T08:41:36.1468819Z + 3
2026-07-08T08:41:36.1469064Z 
2026-07-08T08:41:36.1469877Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:41:36.1622221Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:36.1624154Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:41:36.1626548Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:41:36.1628152Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:41:36.1628907Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:41:36.1629481Z     [90m  8| [39m
2026-07-08T08:41:36.1629790Z 
2026-07-08T08:41:36.1630259Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:41:36.1630629Z 
2026-07-08T08:41:36.1630948Z 
2026-07-08T08:41:36.1664550Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:41:36.1674590Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:41:36.1676076Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:41:36.1677129Z [2m   Start at [22m 08:41:35
2026-07-08T08:41:36.1678375Z [2m   Duration [22m 355ms[2m (transform 40ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 76ms)[22m
2026-07-08T08:41:36.1679169Z 
2026-07-08T08:41:36.1866920Z ##[error]Process completed with exit code 1.
2026-07-08T08:41:21.4050000Z Evaluating test.if
2026-07-08T08:41:21.4050000Z Evaluating: success()
2026-07-08T08:41:21.4050000Z Result: true
2026-07-08T08:41:21.4110000Z Requested labels: ubuntu-latest
2026-07-08T08:41:21.4110000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:41:21.4110000Z Waiting for a runner to pick up this job...
2026-07-08T08:41:21.4230000Z Job is about to start running on the hosted runner: GitHub Actions 1000001099
2026-07-08T08:41:21.4210000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.