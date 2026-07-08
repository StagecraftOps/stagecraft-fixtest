# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This suggests the implementation is summing the values and dividing by the wrong denominator — most likely dividing by `(n+1)` or some off-by-one variant, or using integer division that drops a partial result, rather than correctly computing `(2+4+6)/3 = 4`. The test assertion at `src/math.test.ts:6` is correct; the bug is in the production implementation of `average`.

## Why this is a code-level issue, not a pipeline config issue

The test expectation (`average([2,4,6])` → `4`) is mathematically correct, so the bug lies in the `average` function's source implementation returning `3` instead of `4`, which requires fixing the application source code rather than any workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
11.1254927Z ##[endgroup]
2026-07-08T08:52:11.2449361Z 
2026-07-08T08:52:11.2450268Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:52:11.2450918Z > tsc --noEmit
2026-07-08T08:52:11.2451130Z 
﻿2026-07-08T08:52:12.0557701Z ##[group]Run npm run test
2026-07-08T08:52:12.0558284Z [36;1mnpm run test[0m
2026-07-08T08:52:12.0594387Z shell: /usr/bin/bash -e {0}
2026-07-08T08:52:12.0594665Z ##[endgroup]
2026-07-08T08:52:12.1748593Z 
2026-07-08T08:52:12.1749426Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:52:12.1749931Z > vitest run
2026-07-08T08:52:12.1750072Z 
2026-07-08T08:52:12.5196996Z 
2026-07-08T08:52:12.5201203Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:52:12.5202219Z 
2026-07-08T08:52:12.8704733Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:52:12.8706411Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:52:12.8707446Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:52:12.8817447Z 
2026-07-08T08:52:12.8825587Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:52:12.8826312Z 
2026-07-08T08:52:12.8828453Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:52:12.8831157Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:52:12.8831859Z 
2026-07-08T08:52:12.8832492Z - Expected
2026-07-08T08:52:12.8832853Z + Received
2026-07-08T08:52:12.8835380Z 
2026-07-08T08:52:12.8836057Z - 4
2026-07-08T08:52:12.8836948Z + 3
2026-07-08T08:52:12.8837379Z 
2026-07-08T08:52:12.8838161Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:52:12.8987440Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:52:12.8988777Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:52:12.8990457Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:52:12.8991744Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:52:12.8992591Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:52:12.8993089Z     [90m  8| [39m
2026-07-08T08:52:12.8993314Z 
2026-07-08T08:52:12.8993834Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:52:12.8994189Z 
2026-07-08T08:52:12.8994535Z 
2026-07-08T08:52:12.9028446Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:52:12.9043010Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:52:12.9044348Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:52:12.9045239Z [2m   Start at [22m 08:52:12
2026-07-08T08:52:12.9060671Z [2m   Duration [22m 362ms[2m (transform 43ms, setup 1ms, collect 35ms, tests 8ms, environment 0ms, prepare 102ms)[22m
2026-07-08T08:52:12.9061509Z 
2026-07-08T08:52:12.9254793Z ##[error]Process completed with exit code 1.
2026-07-08T08:52:02.3160000Z Requested labels: ubuntu-latest
2026-07-08T08:52:02.3160000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:52:02.3160000Z Waiting for a runner to pick up this job...
2026-07-08T08:52:02.3150000Z Evaluating test.if
2026-07-08T08:52:02.3150000Z Evaluating: success()
2026-07-08T08:52:02.3150000Z Result: true
2026-07-08T08:52:02.5380000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:52:02.5390000Z Job is about to start running on the hosted runner: GitHub Actions 1000001167
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.