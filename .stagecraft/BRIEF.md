# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the correct mean of `4`. This indicates a bug in the implementation — most likely the function is summing the values and dividing by the wrong denominator, or is using an off-by-one error (e.g., dividing by `n+1` instead of `n`, since 9/3=3 rather than 12/3=4, suggesting it may be dividing by 4 instead of 3, or summing incorrectly).

## Why this is a code-level issue, not a pipeline config issue

The test assertion `expect(average([2, 4, 6])).toBe(4)` is mathematically correct (mean of 2,4,6 is 4), so the bug is in the `average` function's source code returning 3 instead of 4, not in the CI workflow configuration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
45.9284468Z ##[endgroup]
2026-07-08T08:38:46.0408911Z 
2026-07-08T08:38:46.0409593Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:38:46.0410253Z > tsc --noEmit
2026-07-08T08:38:46.0410438Z 
﻿2026-07-08T08:38:46.8867471Z ##[group]Run npm run test
2026-07-08T08:38:46.8868031Z [36;1mnpm run test[0m
2026-07-08T08:38:46.8900928Z shell: /usr/bin/bash -e {0}
2026-07-08T08:38:46.8901213Z ##[endgroup]
2026-07-08T08:38:47.0058429Z 
2026-07-08T08:38:47.0059162Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:38:47.0059652Z > vitest run
2026-07-08T08:38:47.0059821Z 
2026-07-08T08:38:47.3172347Z 
2026-07-08T08:38:47.3197877Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:38:47.3226101Z 
2026-07-08T08:38:47.6760961Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:38:47.6762309Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:38:47.6765455Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:47.6868952Z 
2026-07-08T08:38:47.6877190Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:38:47.6878051Z 
2026-07-08T08:38:47.6880549Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:38:47.6882319Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:38:47.6882902Z 
2026-07-08T08:38:47.6883108Z - Expected
2026-07-08T08:38:47.6883498Z + Received
2026-07-08T08:38:47.6883697Z 
2026-07-08T08:38:47.6883860Z - 4
2026-07-08T08:38:47.6884207Z + 3
2026-07-08T08:38:47.6884381Z 
2026-07-08T08:38:47.6884953Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:38:47.7032512Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:47.7034040Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:38:47.7036437Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:38:47.7037976Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:38:47.7038742Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:38:47.7039342Z     [90m  8| [39m
2026-07-08T08:38:47.7039585Z 
2026-07-08T08:38:47.7040140Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:38:47.7040544Z 
2026-07-08T08:38:47.7040581Z 
2026-07-08T08:38:47.7072344Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:38:47.7089379Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:38:47.7090794Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:38:47.7091837Z [2m   Start at [22m 08:38:47
2026-07-08T08:38:47.7093310Z [2m   Duration [22m 371ms[2m (transform 49ms, setup 0ms, collect 30ms, tests 9ms, environment 0ms, prepare 122ms)[22m
2026-07-08T08:38:47.7094304Z 
2026-07-08T08:38:47.7276623Z ##[error]Process completed with exit code 1.
2026-07-08T08:38:35.4710000Z Requested labels: ubuntu-latest
2026-07-08T08:38:35.4710000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:38:35.4710000Z Waiting for a runner to pick up this job...
2026-07-08T08:38:35.4690000Z Evaluating test.if
2026-07-08T08:38:35.4690000Z Evaluating: success()
2026-07-08T08:38:35.4690000Z Result: true
2026-07-08T08:38:35.4910000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:38:35.4920000Z Job is about to start running on the hosted runner: GitHub Actions 1000001085
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.