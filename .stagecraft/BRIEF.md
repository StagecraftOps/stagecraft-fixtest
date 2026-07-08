# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This suggests the implementation is summing the values and dividing by the wrong denominator — likely dividing by `(n+1)` or using off-by-one indexing — or it is computing the median/middle value rather than the arithmetic mean.

## Why this is a code-level issue, not a pipeline config issue

The test assertion itself is correct (`average([2, 4, 6])` should equal `4`), so the bug lives in the application's `average` function implementation, not in the workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:56:25.4901342Z 
﻿2026-07-08T08:56:26.2891285Z ##[group]Run npm run test
2026-07-08T08:56:26.2891884Z [36;1mnpm run test[0m
2026-07-08T08:56:26.2927895Z shell: /usr/bin/bash -e {0}
2026-07-08T08:56:26.2928168Z ##[endgroup]
2026-07-08T08:56:26.4068035Z 
2026-07-08T08:56:26.4068826Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:56:26.4069309Z > vitest run
2026-07-08T08:56:26.4069505Z 
2026-07-08T08:56:26.7356043Z 
2026-07-08T08:56:26.7359649Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:56:26.7360410Z 
2026-07-08T08:56:27.0610977Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:56:27.0612757Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:56:27.0613572Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:27.0715855Z 
2026-07-08T08:56:27.0723450Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:56:27.0724006Z 
2026-07-08T08:56:27.0726267Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:56:27.0728377Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:56:27.0729003Z 
2026-07-08T08:56:27.0729157Z - Expected
2026-07-08T08:56:27.0729485Z + Received
2026-07-08T08:56:27.0729655Z 
2026-07-08T08:56:27.0729786Z - 4
2026-07-08T08:56:27.0730049Z + 3
2026-07-08T08:56:27.0730212Z 
2026-07-08T08:56:27.0731050Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:56:27.0945524Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:27.0946690Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:56:27.0947663Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:56:27.0948501Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:56:27.0949080Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:56:27.0949506Z     [90m  8| [39m
2026-07-08T08:56:27.0949706Z 
2026-07-08T08:56:27.0950106Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:56:27.0950442Z 
2026-07-08T08:56:27.0950471Z 
2026-07-08T08:56:27.0973405Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:56:27.0983323Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:56:27.0984536Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:56:27.0985574Z [2m   Start at [22m 08:56:26
2026-07-08T08:56:27.0986771Z [2m   Duration [22m 336ms[2m (transform 39ms, setup 0ms, collect 33ms, tests 8ms, environment 0ms, prepare 72ms)[22m
2026-07-08T08:56:27.0987482Z 
2026-07-08T08:56:27.1201729Z ##[error]Process completed with exit code 1.
2026-07-08T08:56:09.6370000Z Requested labels: ubuntu-latest
2026-07-08T08:56:09.6370000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:56:09.6370000Z Waiting for a runner to pick up this job...
2026-07-08T08:56:09.6340000Z Evaluating test.if
2026-07-08T08:56:09.6340000Z Evaluating: success()
2026-07-08T08:56:09.6340000Z Result: true
2026-07-08T08:56:10.1100000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:56:16.5320000Z Job is about to start running on the hosted runner: GitHub Actions 1000001197
2026-07-08T08:56:16.5310000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.