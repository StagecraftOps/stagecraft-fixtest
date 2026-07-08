# StageCraft Failure Brief -- StagecraftOps/stagecraft-fixtest

## Failed workflow: CI (.github/workflows/ci.yml)

## Root cause (from automated analysis)

The `average` function in `src/math.ts` (or equivalent source file) returns an incorrect result. The test calls `average([2, 4, 6])` and expects `4` (the correct arithmetic mean), but the function returns `3`. This indicates a bug in the implementation — likely the function is summing the values and dividing by a wrong denominator (e.g., dividing by `arr.length + 1` or off-by-one in the accumulation), or it is computing a different statistic (e.g., median or sum/count with an incorrect count).

## Why this is a code-level issue, not a pipeline config issue

The failure is a genuine test assertion mismatch caused by incorrect logic in the application's `average` function, not a workflow misconfiguration — no changes to the CI YAML would make the function return the correct value.

Failure category: TEST_FAILURE

## Relevant log excerpt

```
sc --noEmit
2026-07-08T08:55:05.4311301Z 
﻿2026-07-08T08:55:06.3084111Z ##[group]Run npm run test
2026-07-08T08:55:06.3084673Z [36;1mnpm run test[0m
2026-07-08T08:55:06.3118048Z shell: /usr/bin/bash -e {0}
2026-07-08T08:55:06.3118329Z ##[endgroup]
2026-07-08T08:55:06.4244647Z 
2026-07-08T08:55:06.4245447Z > stagecraft-fixtest@1.0.0 test
2026-07-08T08:55:06.4245959Z > vitest run
2026-07-08T08:55:06.4246143Z 
2026-07-08T08:55:06.7797444Z 
2026-07-08T08:55:06.7802267Z [7m[1m[36m RUN [39m[22m[27m [36mv1.6.1[39m [90m/home/runner/work/stagecraft-fixtest/stagecraft-fixtest[39m
2026-07-08T08:55:06.7803284Z 
2026-07-08T08:55:07.1377000Z  [33m❯[39m src/math.test.ts [2m ([22m[2m3 tests[22m [2m|[22m [31m1 failed[39m[2m)[22m[90m 8[2mms[22m[39m
2026-07-08T08:55:07.1392958Z [31m   [33m❯[31m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers[39m
2026-07-08T08:55:07.1393951Z [31m     → expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:07.1482836Z 
2026-07-08T08:55:07.1490129Z [31m⎯⎯⎯⎯⎯⎯⎯[1m[7m Failed Tests 1 [27m[22m⎯⎯⎯⎯⎯⎯⎯[39m
2026-07-08T08:55:07.1490790Z 
2026-07-08T08:55:07.1493147Z [31m[1m[7m FAIL [27m[22m[39m src/math.test.ts[2m > [22maverage[2m > [22mcomputes the mean of a list of numbers
2026-07-08T08:55:07.1495513Z [31m[1mAssertionError[22m: expected 3 to be 4 // Object.is equality[39m
2026-07-08T08:55:07.1496201Z 
2026-07-08T08:55:07.1496392Z - Expected
2026-07-08T08:55:07.1497048Z + Received
2026-07-08T08:55:07.1497252Z 
2026-07-08T08:55:07.1497412Z - 4
2026-07-08T08:55:07.1497765Z + 3
2026-07-08T08:55:07.1497955Z 
2026-07-08T08:55:07.1499060Z [36m [2m❯[22m src/math.test.ts:[2m6:32[22m[39m
2026-07-08T08:55:07.1648042Z     [90m  4| [39m[34mdescribe[39m([32m'average'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:07.1650118Z     [90m  5| [39m  [34mit[39m([32m'computes the mean of a list of numbers'[39m[33m,[39m () [33m=>[39m {
2026-07-08T08:55:07.1652344Z     [90m  6| [39m    [34mexpect[39m([34maverage[39m([[34m2[39m[33m,[39m [34m4[39m[33m,[39m [34m6[39m]))[33m.[39m[34mtoBe[39m([34m4[39m)[33m;[39m
2026-07-08T08:55:07.1653947Z     [90m   | [39m                               [31m^[39m
2026-07-08T08:55:07.1654913Z     [90m  7| [39m  })[33m;[39m
2026-07-08T08:55:07.1655711Z     [90m  8| [39m
2026-07-08T08:55:07.1656058Z 
2026-07-08T08:55:07.1657369Z [31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m
2026-07-08T08:55:07.1657794Z 
2026-07-08T08:55:07.1658170Z 
2026-07-08T08:55:07.1698207Z ##[error]AssertionError: expected 3 to be 4 // Object.is equality

- Expected
+ Received

- 4
+ 3

 ❯ src/math.test.ts:6:32

  ... (repeated 2 times)
2026-07-08T08:55:07.1710891Z [2m Test Files [22m [1m[31m1 failed[39m[22m[90m (1)[39m
2026-07-08T08:55:07.1712176Z [2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2 passed[39m[22m[90m (3)[39m
2026-07-08T08:55:07.1713226Z [2m   Start at [22m 08:55:06
2026-07-08T08:55:07.1714661Z [2m   Duration [22m 368ms[2m (transform 42ms, setup 0ms, collect 32ms, tests 8ms, environment 0ms, prepare 81ms)[22m
2026-07-08T08:55:07.1715623Z 
2026-07-08T08:55:07.1912247Z ##[error]Process completed with exit code 1.
2026-07-08T08:54:55.5810000Z Evaluating test.if
2026-07-08T08:54:55.5810000Z Evaluating: success()
2026-07-08T08:54:55.5810000Z Result: true
2026-07-08T08:54:55.5850000Z Requested labels: ubuntu-latest
2026-07-08T08:54:55.5850000Z Job defined at: StagecraftOps/stagecraft-fixtest/.github/workflows/ci.yml@refs/heads/main
2026-07-08T08:54:55.5850000Z Waiting for a runner to pick up this job...
2026-07-08T08:54:55.5990000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-08T08:54:57.0360000Z Job is about to start running on the hosted runner: GitHub Actions 1000001188
2026-07-08T08:54:57.0350000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.