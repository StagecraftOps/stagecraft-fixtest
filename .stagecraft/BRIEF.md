# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation logic — most likely the function is summing the values and dividing by the wrong denominator (e.g., dividing by the count + 1, or off-by-one in the length), or is otherwise computing a median/wrong aggregation instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2, 4, 6 is indeed 4), so the bug lies in the implementation of the `average` function in the application source code, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:20.9346441Z ##[endgroup]
2026-07-08T08:20:21.0467949Z 
2026-07-08T08:20:21.0468789Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:20:21.0469285Z > tsc --noEmit
2026-07-08T08:20:21.0469447Z 
﻿2026-07-08T08:20:21.9223862Z ##[group]Run npm run test
2026-07-08T08:20:21.9224954Z [36;1mnpm run test[0m
2026-07-08T08:20:21.9258354Z shell: /usr/bin/bash -e {0}
2026-07-08T08:20:21.9258628Z ##[endgroup]
2026-07-08T08:20:22.0380101Z 
2026-07-08T08:20:22.0380955Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:20:22.0381611Z > vitest run
2026-07-08T08:20:22.0381892Z 
2026-07-08T08:20:22.3927370Z 
2026-07-08T08:20:22.3930802Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:20:22.3931691Z 
2026-07-08T08:20:22.7295091Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:20:22.7296970Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:20:22.7297698Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:20:22.7403939Z 
2026-07-08T08:20:22.7411826Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:20:22.7412439Z 
2026-07-08T08:20:22.7415152Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:20:22.7417481Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:20:22.7418145Z 
2026-07-08T08:20:22.7418410Z - Expected
2026-07-08T08:20:22.7418732Z + Received
2026-07-08T08:20:22.7418846Z 
2026-07-08T08:20:22.7418934Z - 4
2026-07-08T08:20:22.7419116Z + 3
2026-07-08T08:20:22.7419219Z 
2026-07-08T08:20:22.7420311Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:20:22.7626192Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:20:22.7628017Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:20:22.7630197Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:20:22.7631233Z 
2026-07-08T08:20:22.7631998Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:20:22.7632827Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:20:22.7633443Z     [90m  8| [39m
2026-07-08T08:20:22.7633770Z 
2026-07-08T08:20:22.7634965Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:20:22.7635381Z 
2026-07-08T08:20:22.7702215Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:20:22.7715563Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:20:22.7716326Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:20:22.7716911Z [2m   Start at [22m 08:20:22
2026-07-08T08:20:22.7717897Z [2m   Duration [22m 347ms[2m (transform 41ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 95ms)[22m
2026-07-08T08:20:22.7718423Z 
2026-07-08T08:20:22.7869494Z ##[error]Process completed with exit code 1.
2026-07-08T08:20:11.4370000Z Requested labels: ubuntu-latest
2026-07-08T08:20:11.4370000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:20:11.4370000Z Waiting for a runner to pick up this job...
2026-07-08T08:20:11.4340000Z Evaluating test.if
2026-07-08T08:20:11.4340000Z Evaluating: success()
2026-07-08T08:20:11.4340000Z Result: true
2026-07-08T08:20:11.8350000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:20:11.8360000Z Job is about to start running on the hosted runner: GitHub Actions 1000000984
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.