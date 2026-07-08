# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. When called with `average(2, 4, 6)`, it returns `3` instead of the expected mean of `4`. This indicates a bug in the average/mean calculation — for example, the function may be computing the median, using integer division that floors incorrectly, or dividing by the wrong count (e.g., dividing by 3+1=4 or summing incorrectly). The test at `src/math.test.ts:6` correctly asserts `toBe(4)`, so the test expectation itself is valid and the implementation is wrong.

## Why this is a code-level issue, not a pipeline config issue

The failing assertion (`expected 3 to be 4` for `average(2, 4, 6)`) reflects a genuine logic bug in the application's `average` function, not a workflow misconfiguration — no changes to the CI YAML would fix an incorrect arithmetic result.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
7.5432792Z ##[endgroup]
2026-07-08T08:50:47.6636615Z 
2026-07-08T08:50:47.6637630Z > stagecraft-fixtest@1.0.0 type-check
2026-07-08T08:50:47.6638298Z > tsc --noEmit
2026-07-08T08:50:47.6638516Z 
﻿2026-07-08T08:50:48.6613361Z ##[group]Run npm run test
2026-07-08T08:50:48.6614736Z [36;1mnpm run test[0m
2026-07-08T08:50:48.6648260Z shell: /usr/bin/bash -e {0}
2026-07-08T08:50:48.6648552Z ##[endgroup]
2026-07-08T08:50:48.7899424Z 
2026-07-08T08:50:48.7900471Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:50:48.7901193Z > vitest run
2026-07-08T08:50:48.7901583Z 
2026-07-08T08:50:49.1833438Z 
2026-07-08T08:50:49.1837303Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:50:49.1838633Z 
2026-07-08T08:50:49.5875104Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 11[2mms[22m[39m
2026-07-08T08:50:49.5876831Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:50:49.5877958Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:49.6002896Z 
2026-07-08T08:50:49.6011366Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:50:49.6012139Z 
2026-07-08T08:50:49.6014376Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:50:49.6016715Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:50:49.6017497Z 
2026-07-08T08:50:49.6017797Z - Expected
2026-07-08T08:50:49.6018326Z + Received
2026-07-08T08:50:49.6018724Z 
2026-07-08T08:50:49.6018997Z - 4
2026-07-08T08:50:49.6019478Z + 3
2026-07-08T08:50:49.6019821Z 
2026-07-08T08:50:49.6020430Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:50:49.6275242Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:49.6275674Z 
2026-07-08T08:50:49.6293941Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:50:49.6325129Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:50:49.6338913Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:50:49.6340391Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:50:49.6341129Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:50:49.6341840Z     [90m  8| [39m
2026-07-08T08:50:49.6342105Z 
2026-07-08T08:50:49.6342669Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:50:49.6343233Z 
2026-07-08T08:50:49.6344326Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:50:49.6345957Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:50:49.6347130Z [2m   Start at [22m 08:50:49
2026-07-08T08:50:49.6348679Z [2m   Duration [22m 417ms[2m (transform 49ms, setup 0ms, collect 36ms, tests 11ms, environment 0ms, prepare 95ms)[22m
2026-07-08T08:50:49.6349628Z 
2026-07-08T08:50:49.6549353Z ##[error]Process completed with exit code 1.
2026-07-08T08:50:38.5420000Z Evaluating test.if
2026-07-08T08:50:38.5420000Z Evaluating: success()
2026-07-08T08:50:38.5420000Z Result: true
2026-07-08T08:50:38.5520000Z Job is about to start running on the hosted runner: GitHub Actions 1000001155
2026-07-08T08:50:38.5440000Z Requested labels: ubuntu-latest
2026-07-08T08:50:38.5440000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:50:38.5440000Z Waiting for a runner to pick up this job...
2026-07-08T08:50:38.5590000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.