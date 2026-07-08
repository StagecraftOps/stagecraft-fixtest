# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation logic — most likely the function is computing the sum divided by a wrong divisor (e.g., dividing by `length + 1` or `length * 2`), or is otherwise implemented incorrectly.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is indeed 4), so the bug lies in the `average` function's implementation in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:31.5218365Z ##[endgroup]
2026-07-08T08:54:31.6322100Z 
2026-07-08T08:54:31.6322901Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:54:31.6323403Z > tsc --noEmit
2026-07-08T08:54:31.6323591Z 
﻿2026-07-08T08:54:32.4592023Z ##[group]Run npm run test
2026-07-08T08:54:32.4592578Z [36;1mnpm run test[0m
2026-07-08T08:54:32.4624868Z shell: /usr/bin/bash -e {0}
2026-07-08T08:54:32.4625144Z ##[endgroup]
2026-07-08T08:54:32.5694581Z 
2026-07-08T08:54:32.5695061Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:54:32.5695641Z > vitest run
2026-07-08T08:54:32.5695922Z 
2026-07-08T08:54:32.9078579Z 
2026-07-08T08:54:32.9082837Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:54:32.9083793Z 
2026-07-08T08:54:33.2633423Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:54:33.2635151Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:54:33.2635896Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:33.2732676Z 
2026-07-08T08:54:33.2739506Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:54:33.2740294Z 
2026-07-08T08:54:33.2743341Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:54:33.2745079Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:33.2745696Z 
2026-07-08T08:54:33.2745885Z - Expected
2026-07-08T08:54:33.2746259Z + Received
2026-07-08T08:54:33.2746498Z 
2026-07-08T08:54:33.2746813Z - 4
2026-07-08T08:54:33.2747722Z + 3
2026-07-08T08:54:33.2748082Z 
2026-07-08T08:54:33.2748833Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:54:33.2892785Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:33.2894392Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:33.2896596Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:54:33.2898512Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:54:33.2898967Z 
2026-07-08T08:54:33.2899555Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:54:33.2900155Z     [90m  8| [39m
2026-07-08T08:54:33.2931872Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:54:33.2942755Z 
2026-07-08T08:54:33.2943237Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:54:33.2943491Z 
2026-07-08T08:54:33.2943824Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:54:33.2944612Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:54:33.2945241Z [2m   Start at [22m 08:54:32
2026-07-08T08:54:33.2946026Z [2m   Duration [22m 365ms[2m (transform 36ms, setup 0ms, collect 31ms, tests 8ms, environment 0ms, prepare 71ms)[22m
2026-07-08T08:54:33.2946580Z 
2026-07-08T08:54:33.3128030Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:22.9500000Z Evaluating test.if
2026-07-08T08:54:22.9500000Z Evaluating: success()
2026-07-08T08:54:22.9500000Z Result: true
2026-07-08T08:54:22.9550000Z Requested labels: ubuntu-latest
2026-07-08T08:54:22.9550000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:22.9550000Z Waiting for a runner to pick up this job...
2026-07-08T08:54:22.9690000Z Job is about to start running on the hosted runner: GitHub Actions 1000001181
2026-07-08T08:54:22.9740000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.