# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is computing the wrong result — likely using integer division, a wrong formula (e.g. summing only some elements, dividing by the wrong denominator), or an off-by-one error in the accumulation logic.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct, so the bug lies in the `average` function's source implementation returning 3 instead of 4, which requires a fix to the application source code.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
.6719658Z ##[endgroup]
2026-07-08T08:33:44.7889437Z 
2026-07-08T08:33:44.7890266Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:33:44.7890918Z > tsc --noEmit
2026-07-08T08:33:44.7891156Z 
﻿2026-07-08T08:33:45.8036028Z ##[group]Run npm run test
2026-07-08T08:33:45.8036576Z [36;1mnpm run test[0m
2026-07-08T08:33:45.8068811Z shell: /usr/bin/bash -e {0}
2026-07-08T08:33:45.8069080Z ##[endgroup]
2026-07-08T08:33:45.9238455Z 
2026-07-08T08:33:45.9239215Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:33:45.9239736Z > vitest run
2026-07-08T08:33:45.9239943Z 
2026-07-08T08:33:46.2866451Z 
2026-07-08T08:33:46.2870240Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:33:46.2871436Z 
2026-07-08T08:33:46.6953725Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:33:46.6955201Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:33:46.6955986Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:46.7077293Z 
2026-07-08T08:33:46.7085257Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:33:46.7086172Z 
2026-07-08T08:33:46.7088367Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:33:46.7090568Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:33:46.7091429Z 
2026-07-08T08:33:46.7091934Z - Expected
2026-07-08T08:33:46.7092460Z + Received
2026-07-08T08:33:46.7092987Z 
2026-07-08T08:33:46.7093504Z - 4
2026-07-08T08:33:46.7094312Z + 3
2026-07-08T08:33:46.7094662Z 
2026-07-08T08:33:46.7095453Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:33:46.7345041Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:46.7346631Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:33:46.7348565Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:33:46.7350078Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:33:46.7350843Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:33:46.7351445Z     [90m  8| [39m
2026-07-08T08:33:46.7351886Z 
2026-07-08T08:33:46.7352523Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:33:46.7353223Z 
2026-07-08T08:33:46.7373448Z 
2026-07-08T08:33:46.7435409Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:33:46.7447029Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:33:46.7448843Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:33:46.7450143Z [2m   Start at [22m 08:33:46
2026-07-08T08:33:46.7451979Z [2m   Duration [22m 421ms[2m (transform 47ms, setup 0ms, collect 35ms, tests 11ms, environment 0ms, prepare 101ms)[22m
2026-07-08T08:33:46.7453389Z 
2026-07-08T08:33:46.7630641Z ##[error]Process completed with exit code 1.
2026-07-08T08:33:35.7140000Z Evaluating test.if
2026-07-08T08:33:35.7140000Z Evaluating: success()
2026-07-08T08:33:35.7140000Z Result: true
2026-07-08T08:33:35.7250000Z Requested labels: ubuntu-latest
2026-07-08T08:33:35.7250000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:33:35.7250000Z Waiting for a runner to pick up this job...
2026-07-08T08:33:36.1200000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:33:36.1200000Z Job is about to start running on the hosted runner: GitHub Actions 1000001058
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.