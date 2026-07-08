# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when called with `[2, 4, 6]`. The mean of those three numbers is (2+4+6)/3 = 4, so the implementation contains a bug — most likely an off-by-one error in the denominator (e.g. dividing by `array.length + 1` or using a hard-coded divisor) or an incorrect summation that causes the result to be 3 rather than 4.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine wrong-result assertion in `src/math.test.ts` caused by a logic bug in the application's `average` function, not any workflow misconfiguration.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:45.5508167Z ##[endgroup]
2026-07-08T08:35:45.6634636Z 
2026-07-08T08:35:45.6635470Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:35:45.6635909Z > tsc --noEmit
2026-07-08T08:35:45.6636048Z 
﻿2026-07-08T08:35:46.4532549Z ##[group]Run npm run test
2026-07-08T08:35:46.4533109Z [36;1mnpm run test[0m
2026-07-08T08:35:46.4568801Z shell: /usr/bin/bash -e {0}
2026-07-08T08:35:46.4569083Z ##[endgroup]
2026-07-08T08:35:46.5690163Z 
2026-07-08T08:35:46.5690626Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:35:46.5690960Z > vitest run
2026-07-08T08:35:46.5691092Z 
2026-07-08T08:35:46.8829620Z 
2026-07-08T08:35:46.8833413Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:35:46.8834385Z 
2026-07-08T08:35:47.2097203Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:35:47.2098418Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:35:47.2099102Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:35:47.2195898Z 
2026-07-08T08:35:47.2203408Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:35:47.2203976Z 
2026-07-08T08:35:47.2207982Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:35:47.2210053Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:35:47.2210755Z 
2026-07-08T08:35:47.2210923Z - Expected
2026-07-08T08:35:47.2211418Z + Received
2026-07-08T08:35:47.2211597Z 
2026-07-08T08:35:47.2211723Z - 4
2026-07-08T08:35:47.2212040Z + 3
2026-07-08T08:35:47.2212186Z 
2026-07-08T08:35:47.2212745Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:35:47.2363947Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:35:47.2365243Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:35:47.2367028Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:35:47.2368276Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:35:47.2368866Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:35:47.2369335Z     [90m  8| [39m
2026-07-08T08:35:47.2369534Z 
2026-07-08T08:35:47.2370006Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:35:47.2370354Z 
2026-07-08T08:35:47.2370416Z 
2026-07-08T08:35:47.2400317Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:35:47.2413230Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:35:47.2414736Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:35:47.2415561Z [2m   Start at [22m 08:35:46
2026-07-08T08:35:47.2416711Z [2m   Duration [22m 336ms[2m (transform 45ms, setup 0ms, collect 30ms, tests 8ms, environment 0ms, prepare 84ms)[22m
2026-07-08T08:35:47.2417490Z 
2026-07-08T08:35:47.2611565Z ##[error]Process completed with exit code 1.
2026-07-08T08:35:36.3290000Z Evaluating test.if
2026-07-08T08:35:36.3290000Z Evaluating: success()
2026-07-08T08:35:36.3290000Z Result: true
2026-07-08T08:35:36.3400000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:35:36.3330000Z Requested labels: ubuntu-latest
2026-07-08T08:35:36.3330000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:35:36.3330000Z Waiting for a runner to pick up this job...
2026-07-08T08:35:36.6680000Z Job is about to start running on the hosted runner: GitHub Actions 1000001067
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.