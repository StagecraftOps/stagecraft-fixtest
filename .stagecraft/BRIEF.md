# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns the wrong value. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — most likely the sum is being divided by the wrong denominator (e.g., dividing by `numbers.length + 1`, or off-by-one in accumulation), or the function is computing something other than the mean (e.g., the middle/median element instead of the sum divided by count).

## Why this is a code-level issue, not a pipeline config issue

The assertion failure (`expected 3 to be 4`) points directly to a logic bug inside the `average()` function in application source code, not to any misconfiguration in the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:23.4668654Z ##[endgroup]
2026-07-08T08:39:23.5808136Z 
2026-07-08T08:39:23.5808941Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:39:23.5809390Z > tsc --noEmit
2026-07-08T08:39:23.5809981Z 
﻿2026-07-08T08:39:24.4618324Z ##[group]Run npm run test
2026-07-08T08:39:24.4618660Z [36;1mnpm run test[0m
2026-07-08T08:39:24.4651745Z shell: /usr/bin/bash -e {0}
2026-07-08T08:39:24.4652017Z ##[endgroup]
2026-07-08T08:39:24.5762430Z 
2026-07-08T08:39:24.5763141Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:39:24.5763765Z > vitest run
2026-07-08T08:39:24.5763946Z 
2026-07-08T08:39:24.9278002Z 
2026-07-08T08:39:24.9281719Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:39:24.9282850Z 
2026-07-08T08:39:25.2620800Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:39:25.2622867Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:39:25.2623828Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:39:25.2727372Z 
2026-07-08T08:39:25.2734988Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:39:25.2736132Z 
2026-07-08T08:39:25.2738317Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:39:25.2740294Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:39:25.2741158Z 
2026-07-08T08:39:25.2741561Z - Expected
2026-07-08T08:39:25.2742189Z + Received
2026-07-08T08:39:25.2742615Z 
2026-07-08T08:39:25.2742992Z - 4
2026-07-08T08:39:25.2743540Z + 3
2026-07-08T08:39:25.2743924Z 
2026-07-08T08:39:25.2744743Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:39:25.2893402Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:39:25.2895720Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:39:25.2898112Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:39:25.2899116Z 
2026-07-08T08:39:25.2933802Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:39:25.2945930Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:39:25.2946722Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:39:25.2947273Z     [90m  8| [39m
2026-07-08T08:39:25.2947560Z 
2026-07-08T08:39:25.2948142Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:39:25.2948595Z 
2026-07-08T08:39:25.2949264Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:39:25.2950788Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:39:25.2951989Z [2m   Start at [22m 08:39:24
2026-07-08T08:39:25.2953668Z [2m   Duration [22m 345ms[2m (transform 42ms, setup 1ms, collect 33ms, tests 9ms, environment 0ms, prepare 73ms)[22m
2026-07-08T08:39:25.2954943Z 
2026-07-08T08:39:25.3144507Z ##[error]Process completed with exit code 1.
2026-07-08T08:39:11.4020000Z Job is about to start running on the hosted runner: GitHub Actions 1000001088
2026-07-08T08:39:11.4060000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:39:11.3890000Z Evaluating test.if
2026-07-08T08:39:11.3890000Z Evaluating: success()
2026-07-08T08:39:11.3890000Z Result: true
2026-07-08T08:39:11.3910000Z Requested labels: ubuntu-latest
2026-07-08T08:39:11.3910000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:39:11.3910000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.