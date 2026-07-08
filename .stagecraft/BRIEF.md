# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when called with [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is computing an incorrect result — most likely an off-by-one or integer-division bug in the source function (e.g. summing only some elements, or dividing by the wrong count).

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's implementation in application source code, not in the CI workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:28.7141993Z ##[endgroup]
2026-07-08T08:24:28.8248537Z 
2026-07-08T08:24:28.8249192Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:24:28.8249714Z > tsc --noEmit
2026-07-08T08:24:28.8249904Z 
﻿2026-07-08T08:24:29.6671730Z ##[group]Run npm run test
2026-07-08T08:24:29.6672087Z [36;1mnpm run test[0m
2026-07-08T08:24:29.6704273Z shell: /usr/bin/bash -e {0}
2026-07-08T08:24:29.6704549Z ##[endgroup]
2026-07-08T08:24:29.7802352Z 
2026-07-08T08:24:29.7802809Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:24:29.7803212Z > vitest run
2026-07-08T08:24:29.7803374Z 
2026-07-08T08:24:30.1234288Z 
2026-07-08T08:24:30.1238224Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:24:30.1239566Z 
2026-07-08T08:24:30.4473093Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:24:30.4474988Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:24:30.4476155Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:24:30.4580255Z 
2026-07-08T08:24:30.4587316Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:24:30.4588270Z 
2026-07-08T08:24:30.4591809Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:24:30.4594190Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:24:30.4595355Z 
2026-07-08T08:24:30.4596145Z - Expected
2026-07-08T08:24:30.4597136Z + Received
2026-07-08T08:24:30.4598064Z 
2026-07-08T08:24:30.4598519Z - 4
2026-07-08T08:24:30.4599374Z + 3
2026-07-08T08:24:30.4599937Z 
2026-07-08T08:24:30.4600799Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:24:30.4742294Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:24:30.4743816Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:24:30.4745695Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:24:30.4747052Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:24:30.4747775Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:24:30.4748358Z     [90m  8| [39m
2026-07-08T08:24:30.4748604Z 
2026-07-08T08:24:30.4749166Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:24:30.4749548Z 
2026-07-08T08:24:30.4749593Z 
2026-07-08T08:24:30.4778395Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:24:30.4788193Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:24:30.4789564Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:24:30.4790835Z [2m   Start at [22m 08:24:30
2026-07-08T08:24:30.4792283Z [2m   Duration [22m 334ms[2m (transform 36ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 72ms)[22m
2026-07-08T08:24:30.4793226Z 
2026-07-08T08:24:30.4989468Z ##[error]Process completed with exit code 1.
2026-07-08T08:24:15.0500000Z Requested labels: ubuntu-latest
2026-07-08T08:24:15.0500000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:24:15.0500000Z Waiting for a runner to pick up this job...
2026-07-08T08:24:15.0410000Z Evaluating test.if
2026-07-08T08:24:15.0410000Z Evaluating: success()
2026-07-08T08:24:15.0410000Z Result: true
2026-07-08T08:24:15.2900000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:24:15.2900000Z Job is about to start running on the hosted runner: GitHub Actions 1000001000
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.