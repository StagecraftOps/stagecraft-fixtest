# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the implementation — most likely the function is computing the sum divided by one more than the actual count (e.g., dividing by `array.length + 1` or using an off-by-one error in the denominator), or it is computing a median/wrong statistic instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (`average([2, 4, 6])` should be `4`), so the bug lies in the application's own `average` function implementation returning `3` instead of `4`, which requires fixing the source code rather than the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
52.0703262Z ##[endgroup]
2026-07-08T08:43:52.1839438Z 
2026-07-08T08:43:52.1840255Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:43:52.1840979Z > tsc --noEmit
2026-07-08T08:43:52.1841194Z 
﻿2026-07-08T08:43:53.0833876Z ##[group]Run npm run test
2026-07-08T08:43:53.0834416Z [36;1mnpm run test[0m
2026-07-08T08:43:53.0870634Z shell: /usr/bin/bash -e {0}
2026-07-08T08:43:53.0870908Z ##[endgroup]
2026-07-08T08:43:53.2014597Z 
2026-07-08T08:43:53.2015496Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:43:53.2016140Z > vitest run
2026-07-08T08:43:53.2016447Z 
2026-07-08T08:43:53.5617547Z 
2026-07-08T08:43:53.5621509Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:43:53.5622723Z 
2026-07-08T08:43:53.9560679Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:43:53.9562411Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:43:53.9563504Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:53.9674906Z 
2026-07-08T08:43:53.9699924Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:43:53.9729050Z 
2026-07-08T08:43:53.9759624Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:43:53.9760647Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:43:53.9760976Z 
2026-07-08T08:43:53.9761085Z - Expected
2026-07-08T08:43:53.9761307Z + Received
2026-07-08T08:43:53.9761412Z 
2026-07-08T08:43:53.9761504Z - 4
2026-07-08T08:43:53.9761694Z + 3
2026-07-08T08:43:53.9761795Z 
2026-07-08T08:43:53.9762061Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:43:53.9921644Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:53.9923140Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:43:53.9924958Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:43:53.9926402Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:43:53.9927110Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:43:53.9927719Z     [90m  8| [39m
2026-07-08T08:43:53.9928162Z 
2026-07-08T08:43:53.9928903Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:43:53.9929413Z 
2026-07-08T08:43:53.9938657Z 
2026-07-08T08:43:53.9995692Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:43:54.0005971Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:43:54.0007088Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:43:54.0007974Z [2m   Start at [22m 08:43:53
2026-07-08T08:43:54.0015134Z [2m   Duration [22m 406ms[2m (transform 61ms, setup 0ms, collect 34ms, tests 8ms, environment 0ms, prepare 128ms)[22m
2026-07-08T08:43:54.0016120Z 
2026-07-08T08:43:54.0231619Z ##[error]Process completed with exit code 1.
2026-07-08T08:43:42.8050000Z Evaluating test.if
2026-07-08T08:43:42.8050000Z Evaluating: success()
2026-07-08T08:43:42.8050000Z Result: true
2026-07-08T08:43:42.8050000Z Requested labels: ubuntu-latest
2026-07-08T08:43:42.8050000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:43:42.8050000Z Waiting for a runner to pick up this job...
2026-07-08T08:43:42.9480000Z Job is about to start running on the hosted runner: GitHub Actions 1000001115
2026-07-08T08:43:42.9480000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.