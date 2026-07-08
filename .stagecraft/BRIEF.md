# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) is returning 3 instead of the expected 4 when called with [2, 4, 6]. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function is returning 3. This indicates a bug in the implementation — most likely the function is computing a sum-divided-by-wrong-denominator (e.g., using `array.length - 1` or counting elements incorrectly), or the summation logic itself is flawed (e.g., off-by-one, missing the last element, or using integer division that truncates).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct, so the bug lies in the `average` function's source implementation returning the wrong value (3 instead of 4), which cannot be fixed by changing the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:50.7579755Z ##[endgroup]
2026-07-08T08:44:50.8769480Z 
2026-07-08T08:44:50.8770471Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:44:50.8771216Z > tsc --noEmit
2026-07-08T08:44:50.8771449Z 
﻿2026-07-08T08:44:51.8778321Z ##[group]Run npm run test
2026-07-08T08:44:51.8778831Z [36;1mnpm run test[0m
2026-07-08T08:44:51.8814435Z shell: /usr/bin/bash -e {0}
2026-07-08T08:44:51.8814718Z ##[endgroup]
2026-07-08T08:44:52.0003354Z 
2026-07-08T08:44:52.0004295Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:44:52.0004838Z > vitest run
2026-07-08T08:44:52.0005046Z 
2026-07-08T08:44:52.3817339Z 
2026-07-08T08:44:52.3821385Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:44:52.3847122Z 
2026-07-08T08:44:52.7814155Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:44:52.7816161Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:44:52.7817555Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:52.7932804Z 
2026-07-08T08:44:52.7942016Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:44:52.7942927Z 
2026-07-08T08:44:52.7944740Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:44:52.7947242Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:44:52.7947964Z 
2026-07-08T08:44:52.7948301Z - Expected
2026-07-08T08:44:52.7948785Z + Received
2026-07-08T08:44:52.7949107Z 
2026-07-08T08:44:52.7949390Z - 4
2026-07-08T08:44:52.7949832Z + 3
2026-07-08T08:44:52.7950129Z 
2026-07-08T08:44:52.7950727Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:44:52.8169393Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:52.8171563Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:44:52.8172253Z 
2026-07-08T08:44:52.8173615Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:44:52.8175492Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:44:52.8176773Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:44:52.8177445Z     [90m  8| [39m
2026-07-08T08:44:52.8177659Z 
2026-07-08T08:44:52.8178096Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:44:52.8178435Z 
2026-07-08T08:44:52.8217498Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:44:52.8229630Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:44:52.8231034Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:44:52.8231957Z [2m   Start at [22m 08:44:52
2026-07-08T08:44:52.8233292Z [2m   Duration [22m 413ms[2m (transform 43ms, setup 0ms, collect 35ms, tests 8ms, environment 0ms, prepare 79ms)[22m
2026-07-08T08:44:52.8234110Z 
2026-07-08T08:44:52.8471058Z ##[error]Process completed with exit code 1.
2026-07-08T08:44:41.9900000Z Requested labels: ubuntu-latest
2026-07-08T08:44:41.9900000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:44:41.9900000Z Waiting for a runner to pick up this job...
2026-07-08T08:44:41.9840000Z Evaluating test.if
2026-07-08T08:44:41.9840000Z Evaluating: success()
2026-07-08T08:44:41.9840000Z Result: true
2026-07-08T08:44:42.1000000Z Job is about to start running on the hosted runner: GitHub Actions 1000001120
2026-07-08T08:44:42.1000000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.