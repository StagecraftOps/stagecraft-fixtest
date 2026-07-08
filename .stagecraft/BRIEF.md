# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average()` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `[2, 4, 6]`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the averaging logic — most likely the function is computing the median (middle element) or summing without dividing by the correct count, or dividing by the wrong value. The test at `src/math.test.ts:6` asserts `average([2, 4, 6])` equals `4`, which is the correct arithmetic mean `(2+4+6)/3 = 4`, but the implementation produces `3`.

## Why this is a code-level issue, not a pipeline config issue

The failure is a real assertion mismatch caused by a bug in the application's `average()` implementation returning `3` instead of `4` for the input `[2, 4, 6]`; no workflow change can fix incorrect application logic.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
:31.4483780Z ##[endgroup]
2026-07-08T08:49:31.5377939Z 
2026-07-08T08:49:31.5378756Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:49:31.5379087Z > tsc --noEmit
2026-07-08T08:49:31.5379661Z 
﻿2026-07-08T08:49:32.2337174Z ##[group]Run npm run test
2026-07-08T08:49:32.2337431Z [36;1mnpm run test[0m
2026-07-08T08:49:32.2366615Z shell: /usr/bin/bash -e {0}
2026-07-08T08:49:32.2366838Z ##[endgroup]
2026-07-08T08:49:32.3293922Z 
2026-07-08T08:49:32.3294835Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:49:32.3295131Z > vitest run
2026-07-08T08:49:32.3295243Z 
2026-07-08T08:49:32.5925400Z 
2026-07-08T08:49:32.5928322Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:49:32.5928980Z 
2026-07-08T08:49:32.8550453Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 6[2mms[22m[39m
2026-07-08T08:49:32.8551648Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:49:32.8552220Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:49:32.8637257Z 
2026-07-08T08:49:32.8642836Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:49:32.8643362Z 
2026-07-08T08:49:32.8644892Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:49:32.8646153Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:49:32.8646930Z 
2026-07-08T08:49:32.8647055Z - Expected
2026-07-08T08:49:32.8647325Z + Received
2026-07-08T08:49:32.8647462Z 
2026-07-08T08:49:32.8647562Z - 4
2026-07-08T08:49:32.8647788Z + 3
2026-07-08T08:49:32.8647919Z 
2026-07-08T08:49:32.8648336Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:49:32.8765950Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:49:32.8767030Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:49:32.8768261Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:49:32.8769367Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:49:32.8769888Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:49:32.8770256Z     [90m  8| [39m
2026-07-08T08:49:32.8770621Z 
2026-07-08T08:49:32.8770661Z 
2026-07-08T08:49:32.8795539Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:49:32.8806090Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:49:32.8806412Z 
2026-07-08T08:49:32.8806850Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:49:32.8807762Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:49:32.8808434Z [2m   Start at [22m 08:49:32
2026-07-08T08:49:32.8809383Z [2m   Duration [22m 271ms[2m (transform 34ms, setup 0ms, collect 26ms, tests 6ms, environment 0ms, prepare 80ms)[22m
2026-07-08T08:49:32.8810008Z 
2026-07-08T08:49:32.8969721Z ##[error]Process completed with exit code 1.
2026-07-08T08:49:17.9400000Z Requested labels: ubuntu-latest
2026-07-08T08:49:17.9400000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:49:17.9400000Z Waiting for a runner to pick up this job...
2026-07-08T08:49:17.9370000Z Evaluating test.if
2026-07-08T08:49:17.9370000Z Evaluating: success()
2026-07-08T08:49:17.9370000Z Result: true
2026-07-08T08:49:18.2960000Z Job is about to start running on the hosted runner: GitHub Actions 1000001147
2026-07-08T08:49:18.2960000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.