# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) contains a bug: when called with `average(2, 4, 6)` it returns `3` instead of the correct mean `4`. This indicates the implementation is likely summing the values and dividing by the wrong count (e.g., dividing by 4 instead of 3), or otherwise computing the sum/divisor incorrectly — for example, summing to 12 but dividing by 4 yields 3, suggesting an off-by-one error in counting the elements.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` fails because the function returns `3`, indicating a logic bug in the `average` function's source implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:36.9326862Z ##[endgroup]
2026-07-08T08:27:37.0460859Z 
2026-07-08T08:27:37.0461530Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:27:37.0462031Z > tsc --noEmit
2026-07-08T08:27:37.0462178Z 
﻿2026-07-08T08:27:37.8519424Z ##[group]Run npm run test
2026-07-08T08:27:37.8520211Z [36;1mnpm run test[0m
2026-07-08T08:27:37.8556000Z shell: /usr/bin/bash -e {0}
2026-07-08T08:27:37.8556270Z ##[endgroup]
2026-07-08T08:27:37.9660357Z 
2026-07-08T08:27:37.9660837Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:27:37.9661303Z > vitest run
2026-07-08T08:27:37.9661511Z 
2026-07-08T08:27:38.2891668Z 
2026-07-08T08:27:38.2893764Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:27:38.2894684Z 
2026-07-08T08:27:38.6514104Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:27:38.6515625Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:27:38.6516340Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:38.6623185Z 
2026-07-08T08:27:38.6629869Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:27:38.6630703Z 
2026-07-08T08:27:38.6633791Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:27:38.6635552Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:27:38.6636393Z 
2026-07-08T08:27:38.6636580Z - Expected
2026-07-08T08:27:38.6636923Z + Received
2026-07-08T08:27:38.6637092Z 
2026-07-08T08:27:38.6637229Z - 4
2026-07-08T08:27:38.6637528Z + 3
2026-07-08T08:27:38.6637696Z 
2026-07-08T08:27:38.6638279Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:27:38.6787664Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:38.6789551Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:27:38.6790561Z 
2026-07-08T08:27:38.6820478Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:27:38.6832625Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:27:38.6834098Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:27:38.6834799Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:27:38.6835316Z     [90m  8| [39m
2026-07-08T08:27:38.6835532Z 
2026-07-08T08:27:38.6836031Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:27:38.6836404Z 
2026-07-08T08:27:38.6837019Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:27:38.6838295Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:27:38.6839344Z [2m   Start at [22m 08:27:38
2026-07-08T08:27:38.6840778Z [2m   Duration [22m 375ms[2m (transform 44ms, setup 0ms, collect 37ms, tests 9ms, environment 0ms, prepare 95ms)[22m
2026-07-08T08:27:38.6841295Z 
2026-07-08T08:27:38.7036367Z ##[error]Process completed with exit code 1.
2026-07-08T08:27:28.2270000Z Evaluating test.if
2026-07-08T08:27:28.2270000Z Evaluating: success()
2026-07-08T08:27:28.2270000Z Result: true
2026-07-08T08:27:28.2320000Z Requested labels: ubuntu-latest
2026-07-08T08:27:28.2320000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:27:28.2320000Z Waiting for a runner to pick up this job...
2026-07-08T08:27:28.6500000Z Job is about to start running on the hosted runner: GitHub Actions 1000001020
2026-07-08T08:27:28.6490000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.