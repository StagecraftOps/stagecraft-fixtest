# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — likely the function is computing the sum divided by `(n+1)` or using an off-by-one error in the count, or is performing integer/floor division incorrectly. The test at `src/math.test.ts:6` is correct: `average([2, 4, 6])` should equal `4`, but the implementation produces `3` (which is `9/3` with a wrong sum, or `12/4` suggesting it counts one extra element).

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch caused by a bug in the `average` function's source code — the workflow configuration is not at fault and no pipeline changes can fix an incorrect arithmetic implementation.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:44.4812635Z ##[endgroup]
2026-07-08T08:14:44.5981998Z 
2026-07-08T08:14:44.5982838Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:14:44.5983428Z > tsc --noEmit
2026-07-08T08:14:44.5983653Z 
﻿2026-07-08T08:14:45.4169220Z ##[group]Run npm run test
2026-07-08T08:14:45.4169827Z [36;1mnpm run test[0m
2026-07-08T08:14:45.4206150Z shell: /usr/bin/bash -e {0}
2026-07-08T08:14:45.4206451Z ##[endgroup]
2026-07-08T08:14:45.5340151Z 
2026-07-08T08:14:45.5340646Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:14:45.5341157Z > vitest run
2026-07-08T08:14:45.5341373Z 
2026-07-08T08:14:45.8694742Z 
2026-07-08T08:14:45.8698855Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:14:45.8699830Z 
2026-07-08T08:14:46.2014241Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:14:46.2015685Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:14:46.2016392Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:14:46.2106634Z 
2026-07-08T08:14:46.2113829Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:14:46.2114665Z 
2026-07-08T08:14:46.2117882Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:14:46.2120039Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:14:46.2120651Z 
2026-07-08T08:14:46.2120856Z - Expected
2026-07-08T08:14:46.2121211Z + Received
2026-07-08T08:14:46.2121399Z 
2026-07-08T08:14:46.2121531Z - 4
2026-07-08T08:14:46.2121830Z + 3
2026-07-08T08:14:46.2122009Z 
2026-07-08T08:14:46.2122767Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:14:46.2273735Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:14:46.2275102Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:14:46.2277234Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:14:46.2278611Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:14:46.2279211Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:14:46.2279693Z     [90m  8| [39m
2026-07-08T08:14:46.2279909Z 
2026-07-08T08:14:46.2280411Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:14:46.2280763Z 
2026-07-08T08:14:46.2281127Z 
2026-07-08T08:14:46.2312505Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:14:46.2322953Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:14:46.2324194Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:14:46.2325076Z [2m   Start at [22m 08:14:45
2026-07-08T08:14:46.2326496Z [2m   Duration [22m 341ms[2m (transform 47ms, setup 0ms, collect 36ms, tests 8ms, environment 0ms, prepare 85ms)[22m
2026-07-08T08:14:46.2327334Z 
2026-07-08T08:14:46.2526843Z ##[error]Process completed with exit code 1.
2026-07-08T08:14:34.9960000Z Evaluating test.if
2026-07-08T08:14:34.9960000Z Evaluating: success()
2026-07-08T08:14:34.9960000Z Result: true
2026-07-08T08:14:34.9980000Z Requested labels: ubuntu-latest
2026-07-08T08:14:34.9980000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:14:34.9980000Z Waiting for a runner to pick up this job...
2026-07-08T08:14:35.0230000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:14:35.0230000Z Job is about to start running on the hosted runner: GitHub Actions 1000000964
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.