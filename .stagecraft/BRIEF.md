# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by one more element than it should (e.g., dividing by `array.length + 1` or using an off-by-one in iteration), or it is returning the median/wrong statistic instead of the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch (`expected 3 to be 4`) caused by a bug in the application's `average` function implementation in source code, not by any misconfiguration of the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:19.6498386Z ##[endgroup]
2026-07-08T08:46:19.7572747Z 
2026-07-08T08:46:19.7574047Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:46:19.7574530Z > tsc --noEmit
2026-07-08T08:46:19.7574672Z 
﻿2026-07-08T08:46:20.4984812Z ##[group]Run npm run test
2026-07-08T08:46:20.4985268Z [36;1mnpm run test[0m
2026-07-08T08:46:20.5004490Z shell: /usr/bin/bash -e {0}
2026-07-08T08:46:20.5004759Z ##[endgroup]
2026-07-08T08:46:20.6018462Z 
2026-07-08T08:46:20.6019174Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:46:20.6019540Z > vitest run
2026-07-08T08:46:20.6019670Z 
2026-07-08T08:46:20.8928238Z 
2026-07-08T08:46:20.8931851Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:46:20.8932618Z 
2026-07-08T08:46:21.1963889Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:46:21.1965913Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:46:21.1967263Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:21.2052244Z 
2026-07-08T08:46:21.2059510Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:46:21.2060124Z 
2026-07-08T08:46:21.2062950Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:46:21.2064563Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:46:21.2065254Z 
2026-07-08T08:46:21.2065434Z - Expected
2026-07-08T08:46:21.2065778Z + Received
2026-07-08T08:46:21.2065964Z 
2026-07-08T08:46:21.2066099Z - 4
2026-07-08T08:46:21.2066375Z + 3
2026-07-08T08:46:21.2066519Z 
2026-07-08T08:46:21.2067140Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:46:21.2206789Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:21.2208842Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:46:21.2210384Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:46:21.2211749Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:46:21.2212361Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:46:21.2212830Z     [90m  8| [39m
2026-07-08T08:46:21.2213023Z 
2026-07-08T08:46:21.2213497Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:46:21.2213848Z 
2026-07-08T08:46:21.2213887Z 
2026-07-08T08:46:21.2245845Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:46:21.2274472Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:46:21.2275868Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:46:21.2276931Z [2m   Start at [22m 08:46:20
2026-07-08T08:46:21.2278749Z [2m   Duration [22m 312ms[2m (transform 35ms, setup 0ms, collect 31ms, tests 7ms, environment 0ms, prepare 69ms)[22m
2026-07-08T08:46:21.2279832Z 
2026-07-08T08:46:21.2412639Z ##[error]Process completed with exit code 1.
2026-07-08T08:46:10.3490000Z Requested labels: ubuntu-latest
2026-07-08T08:46:10.3490000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:46:10.3490000Z Waiting for a runner to pick up this job...
2026-07-08T08:46:10.3490000Z Evaluating test.if
2026-07-08T08:46:10.3490000Z Evaluating: success()
2026-07-08T08:46:10.3490000Z Result: true
2026-07-08T08:46:10.8190000Z Job is about to start running on the hosted runner: GitHub Actions 1000001133
2026-07-08T08:46:10.8190000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.