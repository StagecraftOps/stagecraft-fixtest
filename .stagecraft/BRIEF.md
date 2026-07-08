# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — for example, the function may be computing the median, or using integer division that floors the result, or summing incorrectly (e.g., `sum / length` where the sum is being computed as `2+4=6` divided by `2` instead of `(2+4+6)/3=4`). The test assertion at `src/math.test.ts:6` is correct; the source implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test expectation (`average([2, 4, 6])` → `4`) is mathematically correct, so the bug is in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:57.2008014Z ##[endgroup]
2026-07-08T08:54:57.3143426Z 
2026-07-08T08:54:57.3143967Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:54:57.3144479Z > tsc --noEmit
2026-07-08T08:54:57.3144628Z 
﻿2026-07-08T08:54:58.1098600Z ##[group]Run npm run test
2026-07-08T08:54:58.1099202Z [36;1mnpm run test[0m
2026-07-08T08:54:58.1134901Z shell: /usr/bin/bash -e {0}
2026-07-08T08:54:58.1135215Z ##[endgroup]
2026-07-08T08:54:58.2248684Z 
2026-07-08T08:54:58.2249444Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:54:58.2249878Z > vitest run
2026-07-08T08:54:58.2250016Z 
2026-07-08T08:54:58.5388721Z 
2026-07-08T08:54:58.5392220Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:54:58.5393204Z 
2026-07-08T08:54:58.8605187Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:54:58.8606878Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:54:58.8607595Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:58.8701160Z 
2026-07-08T08:54:58.8708568Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:54:58.8709159Z 
2026-07-08T08:54:58.8711483Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:54:58.8713599Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:58.8714166Z 
2026-07-08T08:54:58.8714329Z - Expected
2026-07-08T08:54:58.8714806Z + Received
2026-07-08T08:54:58.8714998Z 
2026-07-08T08:54:58.8715278Z - 4
2026-07-08T08:54:58.8715638Z + 3
2026-07-08T08:54:58.8715821Z 
2026-07-08T08:54:58.8716389Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:54:58.8864712Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:58.8866219Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:58.8867981Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:54:58.8868920Z 
2026-07-08T08:54:58.8899605Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:54:58.8909045Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:54:58.8909598Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:54:58.8909979Z     [90m  8| [39m
2026-07-08T08:54:58.8910178Z 
2026-07-08T08:54:58.8910571Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:54:58.8911067Z 
2026-07-08T08:54:58.8911447Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:54:58.8912482Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:54:58.8913212Z [2m   Start at [22m 08:54:58
2026-07-08T08:54:58.8914327Z [2m   Duration [22m 331ms[2m (transform 35ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 91ms)[22m
2026-07-08T08:54:58.8915042Z 
2026-07-08T08:54:58.9122317Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:47.6770000Z Evaluating test.if
2026-07-08T08:54:47.6770000Z Evaluating: success()
2026-07-08T08:54:47.6770000Z Result: true
2026-07-08T08:54:47.6800000Z Requested labels: ubuntu-latest
2026-07-08T08:54:47.6800000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:47.6800000Z Waiting for a runner to pick up this job...
2026-07-08T08:54:47.6960000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:54:47.6960000Z Job is about to start running on the hosted runner: GitHub Actions 1000001185
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.