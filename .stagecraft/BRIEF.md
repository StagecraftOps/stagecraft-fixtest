# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean: (2+4+6)/3 = 4), but the function returns `3`. This indicates a bug in the implementation — likely summing the values but dividing by the wrong denominator (e.g., dividing by the array length + 1, or using integer/floor division incorrectly, or off-by-one in iteration).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch caused by a logic bug in the application's `average` function — the workflow pipeline is correctly configured and the test itself is correct, so only fixing the source code implementation can resolve this.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:53.7869164Z ##[endgroup]
2026-07-08T08:32:53.8981799Z 
2026-07-08T08:32:53.8982984Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:32:53.8983718Z > tsc --noEmit
2026-07-08T08:32:53.8984506Z 
﻿2026-07-08T08:32:54.7609390Z ##[group]Run npm run test
2026-07-08T08:32:54.7609725Z [36;1mnpm run test[0m
2026-07-08T08:32:54.7642627Z shell: /usr/bin/bash -e {0}
2026-07-08T08:32:54.7642902Z ##[endgroup]
2026-07-08T08:32:54.8762350Z 
2026-07-08T08:32:54.8763259Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:32:54.8763820Z > vitest run
2026-07-08T08:32:54.8764038Z 
2026-07-08T08:32:55.1917128Z 
2026-07-08T08:32:55.1920891Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:32:55.1921959Z 
2026-07-08T08:32:55.5236068Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:32:55.5237641Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:32:55.5238359Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:32:55.5342682Z 
2026-07-08T08:32:55.5353396Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:32:55.5353997Z 
2026-07-08T08:32:55.5354982Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:32:55.5373755Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:32:55.5374545Z 
2026-07-08T08:32:55.5375164Z - Expected
2026-07-08T08:32:55.5375632Z + Received
2026-07-08T08:32:55.5375851Z 
2026-07-08T08:32:55.5376002Z - 4
2026-07-08T08:32:55.5376333Z + 3
2026-07-08T08:32:55.5376515Z 
2026-07-08T08:32:55.5377035Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:32:55.5514648Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:32:55.5516401Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:32:55.5518647Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:32:55.5520405Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:32:55.5521317Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:32:55.5522063Z     [90m  8| [39m
2026-07-08T08:32:55.5522743Z 
2026-07-08T08:32:55.5523543Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:32:55.5523972Z 
2026-07-08T08:32:55.5524335Z 
2026-07-08T08:32:55.5562573Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:32:55.5574069Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:32:55.5574914Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:32:55.5575492Z [2m   Start at [22m 08:32:55
2026-07-08T08:32:55.5576341Z [2m   Duration [22m 342ms[2m (transform 48ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 97ms)[22m
2026-07-08T08:32:55.5576908Z 
2026-07-08T08:32:55.5763436Z ##[error]Process completed with exit code 1.
2026-07-08T08:31:35.1960000Z Requested labels: ubuntu-latest
2026-07-08T08:31:35.1960000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:31:35.1960000Z Waiting for a runner to pick up this job...
2026-07-08T08:31:35.1930000Z Evaluating test.if
2026-07-08T08:31:35.1930000Z Evaluating: success()
2026-07-08T08:31:35.1930000Z Result: true
2026-07-08T08:32:41.7410000Z Job is about to start running on the hosted runner: GitHub Actions 1000001055
2026-07-08T08:32:41.7410000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.