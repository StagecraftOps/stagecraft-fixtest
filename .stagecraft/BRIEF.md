# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns 3 instead of the expected 4 when given the inputs [2, 4, 6]. The correct mean of [2, 4, 6] is (2+4+6)/3 = 4, so the implementation contains a bug — most likely an off-by-one error in the divisor (e.g., dividing by `array.length + 1` or `array.length - 1` instead of `array.length`), or incorrect summation logic.

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine assertion mismatch in `src/math.test.ts` at line 6 — the `average` function returns the wrong value (3 instead of 4), indicating a bug in the application's own source code that no workflow YAML change can fix.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:03.1654340Z ##[endgroup]
2026-07-08T08:57:03.2692812Z 
2026-07-08T08:57:03.2693638Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:57:03.2694241Z > tsc --noEmit
2026-07-08T08:57:03.2694934Z 
﻿2026-07-08T08:57:04.0562875Z ##[group]Run npm run test
2026-07-08T08:57:04.0563180Z [36;1mnpm run test[0m
2026-07-08T08:57:04.0582161Z shell: /usr/bin/bash -e {0}
2026-07-08T08:57:04.0582464Z ##[endgroup]
2026-07-08T08:57:04.1606295Z 
2026-07-08T08:57:04.1607118Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:57:04.1607642Z > vitest run
2026-07-08T08:57:04.1607796Z 
2026-07-08T08:57:04.4688963Z 
2026-07-08T08:57:04.4692448Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:57:04.4693306Z 
2026-07-08T08:57:04.7515141Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 7[2mms[22m[39m
2026-07-08T08:57:04.7516586Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:57:04.7517346Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:57:04.7606196Z 
2026-07-08T08:57:04.7631745Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:57:04.7632291Z 
2026-07-08T08:57:04.7632882Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:57:04.7633765Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:57:04.7634125Z 
2026-07-08T08:57:04.7634235Z - Expected
2026-07-08T08:57:04.7634462Z + Received
2026-07-08T08:57:04.7634589Z 
2026-07-08T08:57:04.7634673Z - 4
2026-07-08T08:57:04.7634878Z + 3
2026-07-08T08:57:04.7634990Z 
2026-07-08T08:57:04.7635255Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:57:04.7758011Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:57:04.7759303Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:57:04.7761105Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:57:04.7762453Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:57:04.7763074Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:57:04.7763596Z     [90m  8| [39m
2026-07-08T08:57:04.7764106Z 
2026-07-08T08:57:04.7764146Z 
2026-07-08T08:57:04.7765318Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:57:04.7765725Z 
2026-07-08T08:57:04.7798953Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:57:04.7811959Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:57:04.7813658Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:57:04.7814754Z [2m   Start at [22m 08:57:04
2026-07-08T08:57:04.7815763Z [2m   Duration [22m 291ms[2m (transform 37ms, setup 0ms, collect 30ms, tests 7ms, environment 0ms, prepare 75ms)[22m
2026-07-08T08:57:04.7816425Z 
2026-07-08T08:57:04.7974731Z ##[error]Process completed with exit code 1.
2026-07-08T08:56:51.8280000Z Job is waiting for a hosted runner to come online.
2026-07-08T08:56:51.8190000Z Requested labels: ubuntu-latest
2026-07-08T08:56:51.8190000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:56:51.8190000Z Waiting for a runner to pick up this job...
2026-07-08T08:56:51.8280000Z Job is about to start running on the hosted runner: GitHub Actions 1000001200
2026-07-08T08:56:51.8170000Z Evaluating test.if
2026-07-08T08:56:51.8170000Z Evaluating: success()
2026-07-08T08:56:51.8170000Z Result: true
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.