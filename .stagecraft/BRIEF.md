# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or its implementation) is returning 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is producing 3 — suggesting a bug in the `average` implementation, likely an off-by-one error in the denominator (e.g., dividing by `array.length + 1` or using `length - 1` instead of `length`, or incorrectly summing values).

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the `average` function's source code implementation, not in any workflow or pipeline configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
3.9558693Z ##[endgroup]
2026-07-08T08:17:34.0736512Z 
2026-07-08T08:17:34.0737074Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:17:34.0737763Z > tsc --noEmit
2026-07-08T08:17:34.0738024Z 
﻿2026-07-08T08:17:34.9247718Z ##[group]Run npm run test
2026-07-08T08:17:34.9248230Z [36;1mnpm run test[0m
2026-07-08T08:17:34.9281042Z shell: /usr/bin/bash -e {0}
2026-07-08T08:17:34.9281303Z ##[endgroup]
2026-07-08T08:17:35.0439249Z 
2026-07-08T08:17:35.0440725Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:17:35.0441243Z > vitest run
2026-07-08T08:17:35.0441437Z 
2026-07-08T08:17:35.3992238Z 
2026-07-08T08:17:35.3996533Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:17:35.3997318Z 
2026-07-08T08:17:35.7537519Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 10[2mms[22m[39m
2026-07-08T08:17:35.7539964Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:17:35.7541399Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:17:35.7648788Z 
2026-07-08T08:17:35.7657391Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:17:35.7658125Z 
2026-07-08T08:17:35.7660854Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:17:35.7662460Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:17:35.7664854Z 
2026-07-08T08:17:35.7674027Z - Expected
2026-07-08T08:17:35.7674857Z + Received
2026-07-08T08:17:35.7675097Z 
2026-07-08T08:17:35.7675267Z - 4
2026-07-08T08:17:35.7675611Z + 3
2026-07-08T08:17:35.7675812Z 
2026-07-08T08:17:35.7676385Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:17:35.7826160Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:17:35.7827781Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:17:35.7829708Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:17:35.7831252Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:17:35.7831918Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:17:35.7832430Z     [90m  8| [39m
2026-07-08T08:17:35.7832669Z 
2026-07-08T08:17:35.7833480Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:17:35.7833888Z 
2026-07-08T08:17:35.7833935Z 
2026-07-08T08:17:35.7865569Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:17:35.7887469Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:17:35.7889128Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:17:35.7890382Z [2m   Start at [22m 08:17:35
2026-07-08T08:17:35.7892077Z [2m   Duration [22m 365ms[2m (transform 45ms, setup 0ms, collect 35ms, tests 10ms, environment 0ms, prepare 97ms)[22m
2026-07-08T08:17:35.7893234Z 
2026-07-08T08:17:35.8094413Z ##[error]Process completed with exit code 1.
2026-07-08T08:17:24.7840000Z Evaluating test.if
2026-07-08T08:17:24.7840000Z Evaluating: success()
2026-07-08T08:17:24.7840000Z Result: true
2026-07-08T08:17:24.8010000Z Requested labels: ubuntu-latest
2026-07-08T08:17:24.8010000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:17:24.8010000Z Waiting for a runner to pick up this job...
2026-07-08T08:17:25.2570000Z Job is about to start running on the hosted runner: GitHub Actions 1000000974
2026-07-08T08:17:25.2570000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.