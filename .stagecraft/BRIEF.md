# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the average/mean implementation — most likely the function is summing the values and dividing by the wrong denominator (e.g., dividing by `array.length + 1` or using an off-by-one error), or is incorrectly computing the sum.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2+4+6 = 12/3 = 4), so the bug is in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
32.2226880Z ##[endgroup]
2026-07-08T08:26:32.3398036Z 
2026-07-08T08:26:32.3398684Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:26:32.3399236Z > tsc --noEmit
2026-07-08T08:26:32.3399407Z 
﻿2026-07-08T08:26:33.1830736Z ##[group]Run npm run test
2026-07-08T08:26:33.1831285Z [36;1mnpm run test[0m
2026-07-08T08:26:33.1864282Z shell: /usr/bin/bash -e {0}
2026-07-08T08:26:33.1864562Z ##[endgroup]
2026-07-08T08:26:33.2967251Z 
2026-07-08T08:26:33.2968014Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:26:33.2968616Z > vitest run
2026-07-08T08:26:33.2968848Z 
2026-07-08T08:26:33.6386187Z 
2026-07-08T08:26:33.6390304Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:26:33.6392781Z 
2026-07-08T08:26:33.9696366Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:26:33.9698201Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:26:33.9699342Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:33.9796074Z 
2026-07-08T08:26:33.9803701Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:26:33.9804608Z 
2026-07-08T08:26:33.9807212Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:26:33.9809216Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:26:33.9809909Z 
2026-07-08T08:26:33.9810101Z - Expected
2026-07-08T08:26:33.9810495Z + Received
2026-07-08T08:26:33.9810693Z 
2026-07-08T08:26:33.9810846Z - 4
2026-07-08T08:26:33.9811216Z + 3
2026-07-08T08:26:33.9811437Z 
2026-07-08T08:26:33.9812053Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:26:33.9954994Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:33.9956605Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:26:33.9958670Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:26:33.9960189Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:26:33.9960929Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:26:33.9961492Z     [90m  8| [39m
2026-07-08T08:26:33.9961749Z 
2026-07-08T08:26:33.9962324Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:26:33.9962742Z 
2026-07-08T08:26:33.9962768Z 
2026-07-08T08:26:33.9995732Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:26:34.0032066Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:26:34.0044456Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:26:34.0045178Z [2m   Start at [22m 08:26:33
2026-07-08T08:26:34.0045923Z [2m   Duration [22m 341ms[2m (transform 60ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 116ms)[22m
2026-07-08T08:26:34.0046699Z 
2026-07-08T08:26:34.0200013Z ##[error]Process completed with exit code 1.
2026-07-08T08:26:23.2980000Z Requested labels: ubuntu-latest
2026-07-08T08:26:23.2980000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:26:23.2980000Z Waiting for a runner to pick up this job...
2026-07-08T08:26:23.3200000Z Job is about to start running on the hosted runner: GitHub Actions 1000001010
2026-07-08T08:26:23.3190000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:26:23.2940000Z Evaluating test.if
2026-07-08T08:26:23.2940000Z Evaluating: success()
2026-07-08T08:26:23.2940000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.