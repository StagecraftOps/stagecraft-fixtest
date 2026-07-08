# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]` the function returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — likely dividing by the wrong value (e.g., using a hardcoded divisor, an off-by-one in the count, or summing incorrectly). The test at `src/math.test.ts:6` correctly expects `4`, so the test itself is valid and the source implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is correct (mean of [2,4,6] is indeed 4), so the bug lies in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:53.7113690Z ##[endgroup]
2026-07-08T08:48:53.8238576Z 
2026-07-08T08:48:53.8239481Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:48:53.8239923Z > tsc --noEmit
2026-07-08T08:48:53.8240552Z 
﻿2026-07-08T08:48:54.6584258Z ##[group]Run npm run test
2026-07-08T08:48:54.6584578Z [36;1mnpm run test[0m
2026-07-08T08:48:54.6617689Z shell: /usr/bin/bash -e {0}
2026-07-08T08:48:54.6617962Z ##[endgroup]
2026-07-08T08:48:54.7706062Z 
2026-07-08T08:48:54.7706653Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:48:54.7707004Z > vitest run
2026-07-08T08:48:54.7707142Z 
2026-07-08T08:48:55.1003442Z 
2026-07-08T08:48:55.1010289Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:48:55.1011184Z 
2026-07-08T08:48:55.4283541Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:48:55.4285252Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:48:55.4286375Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:48:55.4395936Z 
2026-07-08T08:48:55.4403618Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:48:55.4404248Z 
2026-07-08T08:48:55.4407002Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:48:55.4409000Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:48:55.4409795Z 
2026-07-08T08:48:55.4410130Z - Expected
2026-07-08T08:48:55.4410538Z + Received
2026-07-08T08:48:55.4411104Z 
2026-07-08T08:48:55.4411297Z - 4
2026-07-08T08:48:55.4411658Z + 3
2026-07-08T08:48:55.4411856Z 
2026-07-08T08:48:55.4412811Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:48:55.4563076Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:48:55.4564648Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:48:55.4566759Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:48:55.4568338Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:48:55.4569390Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:48:55.4569982Z     [90m  8| [39m
2026-07-08T08:48:55.4570251Z 
2026-07-08T08:48:55.4570822Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:48:55.4571239Z 
2026-07-08T08:48:55.4571279Z 
2026-07-08T08:48:55.4603944Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:48:55.4617550Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:48:55.4619185Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:48:55.4620256Z [2m   Start at [22m 08:48:55
2026-07-08T08:48:55.4621729Z [2m   Duration [22m 339ms[2m (transform 39ms, setup 0ms, collect 33ms, tests 9ms, environment 0ms, prepare 79ms)[22m
2026-07-08T08:48:55.4622837Z 
2026-07-08T08:48:55.4819203Z ##[error]Process completed with exit code 1.
2026-07-08T08:48:41.5350000Z Evaluating test.if
2026-07-08T08:48:41.5350000Z Evaluating: success()
2026-07-08T08:48:41.5350000Z Result: true
2026-07-08T08:48:41.5470000Z Requested labels: ubuntu-latest
2026-07-08T08:48:41.5470000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:48:41.5470000Z Waiting for a runner to pick up this job...
2026-07-08T08:48:41.5790000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:48:41.5800000Z Job is about to start running on the hosted runner: GitHub Actions 1000001145
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.