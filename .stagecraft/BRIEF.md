# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the sum divided by one more than the actual number of elements (e.g., dividing by `array.length + 1` or using an off-by-one in a loop), or is using integer/floor division that truncates the result incorrectly. The test at `src/math.test.ts:6` is correct: `average([2, 4, 6])` should equal `4`.

## Why this is a code-level issue, not a pipeline config issue

The test assertion is mathematically correct (mean of [2,4,6] is 4), so the bug lies in the implementation of the `average` function in the application's source code, not in the workflow or test configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
05.7979623Z ##[endgroup]
2026-07-08T08:28:05.9153598Z 
2026-07-08T08:28:05.9154289Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:28:05.9154992Z > tsc --noEmit
2026-07-08T08:28:05.9155253Z 
﻿2026-07-08T08:28:06.8756709Z ##[group]Run npm run test
2026-07-08T08:28:06.8757419Z [36;1mnpm run test[0m
2026-07-08T08:28:06.8799282Z shell: /usr/bin/bash -e {0}
2026-07-08T08:28:06.8799694Z ##[endgroup]
2026-07-08T08:28:06.9956354Z 
2026-07-08T08:28:06.9957271Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:28:06.9957792Z > vitest run
2026-07-08T08:28:06.9957989Z 
2026-07-08T08:28:07.3761211Z 
2026-07-08T08:28:07.3765188Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:28:07.3766394Z 
2026-07-08T08:28:07.7612335Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:28:07.7613976Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:28:07.7614704Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:07.7731949Z 
2026-07-08T08:28:07.7751579Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:28:07.7752689Z 
2026-07-08T08:28:07.7753861Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:28:07.7755451Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:28:07.7756197Z 
2026-07-08T08:28:07.7756504Z - Expected
2026-07-08T08:28:07.7757042Z + Received
2026-07-08T08:28:07.7757426Z 
2026-07-08T08:28:07.7757720Z - 4
2026-07-08T08:28:07.7758219Z + 3
2026-07-08T08:28:07.7758624Z 
2026-07-08T08:28:07.7759215Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:28:07.7998389Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:07.8000011Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:28:07.8002464Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:28:07.8004087Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:28:07.8004489Z 
2026-07-08T08:28:07.8004998Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:28:07.8033232Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:28:07.8044404Z     [90m  8| [39m
2026-07-08T08:28:07.8045300Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:28:07.8046829Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:28:07.8052052Z 
2026-07-08T08:28:07.8077447Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:28:07.8078156Z [2m   Start at [22m 08:28:07
2026-07-08T08:28:07.8085691Z [2m   Duration [22m 397ms[2m (transform 52ms, setup 0ms, collect 42ms, tests 9ms, environment 0ms, prepare 112ms)[22m
2026-07-08T08:28:07.8086923Z 
2026-07-08T08:28:07.8091723Z 
2026-07-08T08:28:07.8289672Z ##[error]Process completed with exit code 1.
2026-07-08T08:27:55.8850000Z Requested labels: ubuntu-latest
2026-07-08T08:27:55.8850000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:27:55.8850000Z Waiting for a runner to pick up this job...
2026-07-08T08:27:55.8850000Z Evaluating test.if
2026-07-08T08:27:55.8850000Z Evaluating: success()
2026-07-08T08:27:55.8850000Z Result: true
2026-07-08T08:27:55.8930000Z Job is about to start running on the hosted runner: GitHub Actions 1000001022
2026-07-08T08:27:55.8930000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.