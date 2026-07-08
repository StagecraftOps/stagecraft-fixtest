# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by the wrong denominator (e.g., dividing by the length + 1, or using a wrong summation), or it is performing integer division incorrectly. The test at `src/math.test.ts:6` is correct; the production code is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lives in the `average` function's source implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
1.8106138Z ##[endgroup]
2026-07-08T08:37:31.9297971Z 
2026-07-08T08:37:31.9298874Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:37:31.9299574Z > tsc --noEmit
2026-07-08T08:37:31.9300456Z 
﻿2026-07-08T08:37:32.8405722Z ##[group]Run npm run test
2026-07-08T08:37:32.8406057Z [36;1mnpm run test[0m
2026-07-08T08:37:32.8438866Z shell: /usr/bin/bash -e {0}
2026-07-08T08:37:32.8439155Z ##[endgroup]
2026-07-08T08:37:32.9591507Z 
2026-07-08T08:37:32.9592288Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:37:32.9592818Z > vitest run
2026-07-08T08:37:32.9592991Z 
2026-07-08T08:37:33.3234288Z 
2026-07-08T08:37:33.3238818Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:37:33.3239700Z 
2026-07-08T08:37:33.6808871Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 10[2mms[22m[39m
2026-07-08T08:37:33.6810493Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:37:33.6811233Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:33.6918464Z 
2026-07-08T08:37:33.6925772Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:37:33.6926669Z 
2026-07-08T08:37:33.6929040Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:37:33.6931375Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:37:33.6931953Z 
2026-07-08T08:37:33.6932350Z - Expected
2026-07-08T08:37:33.6932706Z + Received
2026-07-08T08:37:33.6932899Z 
2026-07-08T08:37:33.6933221Z - 4
2026-07-08T08:37:33.6933541Z + 3
2026-07-08T08:37:33.6934019Z 
2026-07-08T08:37:33.6935244Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:37:33.7089069Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:33.7090661Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:37:33.7093089Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:37:33.7095012Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:37:33.7095753Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:37:33.7096337Z     [90m  8| [39m
2026-07-08T08:37:33.7096599Z 
2026-07-08T08:37:33.7097257Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:37:33.7097677Z 
2026-07-08T08:37:33.7097715Z 
2026-07-08T08:37:33.7143907Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:37:33.7157731Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:37:33.7159511Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:37:33.7160768Z [2m   Start at [22m 08:37:33
2026-07-08T08:37:33.7162438Z [2m   Duration [22m 368ms[2m (transform 44ms, setup 0ms, collect 34ms, tests 10ms, environment 0ms, prepare 83ms)[22m
2026-07-08T08:37:33.7163676Z 
2026-07-08T08:37:33.7353151Z ##[error]Process completed with exit code 1.
2026-07-08T08:37:19.6430000Z Evaluating test.if
2026-07-08T08:37:19.6430000Z Evaluating: success()
2026-07-08T08:37:19.6430000Z Result: true
2026-07-08T08:37:19.6580000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:37:19.6610000Z Job is about to start running on the hosted runner: GitHub Actions 1000001076
2026-07-08T08:37:19.6480000Z Requested labels: ubuntu-latest
2026-07-08T08:37:19.6480000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:37:19.6480000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.