# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — likely dividing by the wrong value, using integer/floor division incorrectly, or summing incorrectly — causing the assertion `expect(average([2, 4, 6])).toBe(4)` in `src/math.test.ts` line 6 to fail.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine wrong-answer assertion in application source code (`src/math.ts`), where the `average` function produces `3` instead of `4` for the input `[2, 4, 6]`, which is a logic bug that must be fixed in the implementation, not in the workflow YAML.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:23.9364087Z ##[endgroup]
2026-07-08T08:54:24.0415882Z 
2026-07-08T08:54:24.0416730Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:54:24.0417349Z > tsc --noEmit
2026-07-08T08:54:24.0418119Z 
﻿2026-07-08T08:54:24.8311785Z ##[group]Run npm run test
2026-07-08T08:54:24.8312106Z [36;1mnpm run test[0m
2026-07-08T08:54:24.8332040Z shell: /usr/bin/bash -e {0}
2026-07-08T08:54:24.8332326Z ##[endgroup]
2026-07-08T08:54:24.9382917Z 
2026-07-08T08:54:24.9383718Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:54:24.9384286Z > vitest run
2026-07-08T08:54:24.9384511Z 
2026-07-08T08:54:25.2546401Z 
2026-07-08T08:54:25.2549905Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:54:25.2551280Z 
2026-07-08T08:54:25.5799249Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:54:25.5800423Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:54:25.5801332Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:25.5896371Z 
2026-07-08T08:54:25.5903767Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:54:25.5904566Z 
2026-07-08T08:54:25.5906282Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:54:25.5908336Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:54:25.5908921Z 
2026-07-08T08:54:25.5909516Z - Expected
2026-07-08T08:54:25.5909862Z + Received
2026-07-08T08:54:25.5910011Z 
2026-07-08T08:54:25.5910171Z - 4
2026-07-08T08:54:25.5910459Z + 3
2026-07-08T08:54:25.5910846Z 
2026-07-08T08:54:25.5911513Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:54:25.6053016Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:25.6054327Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:54:25.6055928Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:54:25.6057228Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:54:25.6057878Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:54:25.6058336Z     [90m  8| [39m
2026-07-08T08:54:25.6058567Z 
2026-07-08T08:54:25.6059109Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:54:25.6059479Z 
2026-07-08T08:54:25.6059520Z 
2026-07-08T08:54:25.6092039Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:54:25.6105910Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:54:25.6107435Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:54:25.6108419Z [2m   Start at [22m 08:54:25
2026-07-08T08:54:25.6110216Z [2m   Duration [22m 335ms[2m (transform 46ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 83ms)[22m
2026-07-08T08:54:25.6111417Z 
2026-07-08T08:54:25.6253105Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:07.7960000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:54:07.7720000Z Evaluating test.if
2026-07-08T08:54:07.7720000Z Evaluating: success()
2026-07-08T08:54:07.7720000Z Result: true
2026-07-08T08:54:07.7960000Z Job is about to start running on the hosted runner: GitHub Actions 1000001180
2026-07-08T08:54:07.7780000Z Requested labels: ubuntu-latest
2026-07-08T08:54:07.7780000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:07.7780000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.