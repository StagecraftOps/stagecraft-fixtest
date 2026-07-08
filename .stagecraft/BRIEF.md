# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 for the input [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation is producing an incorrect result — most likely a bug such as integer division truncation, an off-by-one in the count, or an incorrect summation logic in the `average` function's source code.

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch in application logic (average([2,4,6]) returns 3 instead of 4), meaning the `average` function implementation in the source code is incorrect and must be fixed there — no workflow change can resolve a wrong computed value.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:03.6769419Z ##[endgroup]
2026-07-08T08:50:03.7885073Z 
2026-07-08T08:50:03.7885666Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:50:03.7886334Z > tsc --noEmit
2026-07-08T08:50:03.7886526Z 
﻿2026-07-08T08:50:04.6161358Z ##[group]Run npm run test
2026-07-08T08:50:04.6161916Z [36;1mnpm run test[0m
2026-07-08T08:50:04.6195465Z shell: /usr/bin/bash -e {0}
2026-07-08T08:50:04.6195754Z ##[endgroup]
2026-07-08T08:50:04.7319904Z 
2026-07-08T08:50:04.7320720Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:50:04.7321242Z > vitest run
2026-07-08T08:50:04.7321439Z 
2026-07-08T08:50:05.0618095Z 
2026-07-08T08:50:05.0621975Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:50:05.0622780Z 
2026-07-08T08:50:05.4296423Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:50:05.4298225Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:50:05.4300186Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:05.4402712Z 
2026-07-08T08:50:05.4410564Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:50:05.4411578Z 
2026-07-08T08:50:05.4415104Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:50:05.4417061Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:05.4418018Z 
2026-07-08T08:50:05.4418557Z - Expected
2026-07-08T08:50:05.4419210Z + Received
2026-07-08T08:50:05.4419438Z 
2026-07-08T08:50:05.4419580Z - 4
2026-07-08T08:50:05.4420180Z + 3
2026-07-08T08:50:05.4420356Z 
2026-07-08T08:50:05.4420859Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:50:05.4564505Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:05.4566431Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:05.4568905Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:50:05.4569945Z 
2026-07-08T08:50:05.4601824Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:50:05.4614953Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:50:05.4615482Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:50:05.4615794Z     [90m  8| [39m
2026-07-08T08:50:05.4615949Z 
2026-07-08T08:50:05.4616287Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:50:05.4616518Z 
2026-07-08T08:50:05.4616835Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:50:05.4617539Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:50:05.4618107Z [2m   Start at [22m 08:50:05
2026-07-08T08:50:05.4618910Z [2m   Duration [22m 378ms[2m (transform 41ms, setup 0ms, collect 31ms, tests 9ms, environment 0ms, prepare 69ms)[22m
2026-07-08T08:50:05.4619451Z 
2026-07-08T08:50:05.4827800Z ##[error]Process completed with exit code 1.
2026-07-08T08:49:54.0340000Z Evaluating test.if
2026-07-08T08:49:54.0340000Z Evaluating: success()
2026-07-08T08:49:54.0340000Z Result: true
2026-07-08T08:49:54.0360000Z Requested labels: ubuntu-latest
2026-07-08T08:49:54.0360000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:49:54.0360000Z Waiting for a runner to pick up this job...
2026-07-08T08:49:54.2940000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:49:54.2940000Z Job is about to start running on the hosted runner: GitHub Actions 1000001150
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.