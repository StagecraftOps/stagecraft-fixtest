# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected `4`. This indicates a bug in the implementation — the function is likely computing the sum divided by the wrong count, or using integer division incorrectly. The mean of [2, 4, 6] is (2+4+6)/3 = 4, but the function produces 3, suggesting it may be dividing by the array length + 1 (i.e., 12/4 = 3) or has an off-by-one error in the denominator.

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct and the failure (received `3`) points directly to a bug in the `average` function's source implementation, not a workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:51.2112908Z ##[endgroup]
2026-07-08T08:28:51.3268488Z 
2026-07-08T08:28:51.3269334Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:51.3269854Z > tsc --noEmit
2026-07-08T08:28:51.3269999Z 
﻿2026-07-08T08:28:52.1537193Z ##[group]Run npm run test
2026-07-08T08:28:52.1537749Z [36;1mnpm run test[0m
2026-07-08T08:28:52.1574161Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:52.1574449Z ##[endgroup]
2026-07-08T08:28:52.2749559Z 
2026-07-08T08:28:52.2750487Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:52.2751022Z > vitest run
2026-07-08T08:28:52.2751236Z 
2026-07-08T08:28:52.5959289Z 
2026-07-08T08:28:52.5962646Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:52.5963713Z 
2026-07-08T08:28:52.9279964Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:28:52.9281205Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:52.9281919Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:52.9379807Z 
2026-07-08T08:28:52.9386659Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:52.9387259Z 
2026-07-08T08:28:52.9389718Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:52.9391797Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:52.9392715Z 
2026-07-08T08:28:52.9392904Z - Expected
2026-07-08T08:28:52.9393442Z + Received
2026-07-08T08:28:52.9393623Z 
2026-07-08T08:28:52.9393773Z - 4
2026-07-08T08:28:52.9394068Z + 3
2026-07-08T08:28:52.9394228Z 
2026-07-08T08:28:52.9394725Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:52.9541640Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:52.9543158Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:52.9545174Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:52.9546780Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:52.9547172Z 
2026-07-08T08:28:52.9579418Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:52.9592765Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:52.9593163Z     [90m  8| [39m
2026-07-08T08:28:52.9593698Z 
2026-07-08T08:28:52.9594263Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:52.9594625Z 
2026-07-08T08:28:52.9595175Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:52.9596312Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:52.9597151Z [2m   Start at [22m 08:28:52
2026-07-08T08:28:52.9598396Z [2m   Duration [22m 342ms[2m (transform 38ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 82ms)[22m
2026-07-08T08:28:52.9599162Z 
2026-07-08T08:28:52.9800248Z ##[error]Process completed with exit code 1.
2026-07-08T08:28:42.5810000Z Evaluating test.if
2026-07-08T08:28:42.5810000Z Evaluating: success()
2026-07-08T08:28:42.5810000Z Result: true
2026-07-08T08:28:42.5850000Z Requested labels: ubuntu-latest
2026-07-08T08:28:42.5850000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:28:42.5850000Z Waiting for a runner to pick up this job...
2026-07-08T08:28:42.9000000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:28:42.9010000Z Job is about to start running on the hosted runner: GitHub Actions 1000001032
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.