# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.test.ts` (or the implementation it tests) returns 3 instead of the expected 4 when called with `average(2, 4, 6)`. The mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation has a bug — most likely summing the values incorrectly (e.g. off-by-one in the divisor, or using integer/floor division) that yields 3 instead of 4.

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch in application source code (`src/math.test.ts` / the `average` implementation it exercises), not a workflow misconfiguration — no change to the CI YAML can make a logically incorrect function return the right value.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:34.6861889Z ##[endgroup]
2026-07-08T08:36:34.7776864Z 
2026-07-08T08:36:34.7777487Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:36:34.7777834Z > tsc --noEmit
2026-07-08T08:36:34.7778406Z 
﻿2026-07-08T08:36:35.4513921Z ##[group]Run npm run test
2026-07-08T08:36:35.4514172Z [36;1mnpm run test[0m
2026-07-08T08:36:35.4543338Z shell: /usr/bin/bash -e {0}
2026-07-08T08:36:35.4543567Z ##[endgroup]
2026-07-08T08:36:35.5479859Z 
2026-07-08T08:36:35.5480636Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:36:35.5480969Z > vitest run
2026-07-08T08:36:35.5481084Z 
2026-07-08T08:36:35.8193814Z 
2026-07-08T08:36:35.8196993Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:36:35.8197601Z 
2026-07-08T08:36:36.0861680Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 9[2mms[22m[39m
2026-07-08T08:36:36.0863078Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:36:36.0863927Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:36:36.0950777Z 
2026-07-08T08:36:36.0956692Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:36:36.0957213Z 
2026-07-08T08:36:36.0958779Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:36:36.0960542Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:36:36.0961050Z 
2026-07-08T08:36:36.0961359Z - Expected
2026-07-08T08:36:36.0961640Z + Received
2026-07-08T08:36:36.0961788Z 
2026-07-08T08:36:36.0961894Z - 4
2026-07-08T08:36:36.0962167Z + 3
2026-07-08T08:36:36.0962294Z 
2026-07-08T08:36:36.0962758Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:36:36.1078184Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:36:36.1079509Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:36:36.1080056Z 
2026-07-08T08:36:36.1106783Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:36:36.1117478Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:36:36.1118674Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:36:36.1119626Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:36:36.1120320Z [2m   Start at [22m 08:36:35
2026-07-08T08:36:36.1121203Z [2m   Duration [22m 275ms[2m (transform 38ms, setup 0ms, collect 32ms, tests 9ms, environment 0ms, prepare 67ms)[22m
2026-07-08T08:36:36.1121561Z 
2026-07-08T08:36:36.1121795Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:36:36.1122129Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:36:36.1122378Z     [90m  8| [39m
2026-07-08T08:36:36.1122516Z 
2026-07-08T08:36:36.1122770Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:36:36.1123018Z 
2026-07-08T08:36:36.1292253Z ##[error]Process completed with exit code 1.
2026-07-08T08:36:22.4660000Z Evaluating test.if
2026-07-08T08:36:22.4660000Z Evaluating: success()
2026-07-08T08:36:22.4660000Z Result: true
2026-07-08T08:36:22.4730000Z Job is about to start running on the hosted runner: GitHub Actions 1000001069
2026-07-08T08:36:22.4660000Z Requested labels: ubuntu-latest
2026-07-08T08:36:22.4660000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:36:22.4660000Z Waiting for a runner to pick up this job...
2026-07-08T08:36:22.4720000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.