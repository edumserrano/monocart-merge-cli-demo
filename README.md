# monocart-reporter merge CLI with TS config files

## Description

This is a demo project to support [[Feature Request] Accept a Typescript file as configuration for the Merge CLI for monocart-reporter
#145](https://github.com/cenfun/monocart-reporter/issues/145).

It contains:

- a minimalist Playwright setup created using: `npm init playwright@latest` as per [Playwright docs](https://playwright.dev/docs/intro).
- added monocart-reporter to the Playwright reporters.
- the configuration for the monocart-reporter is in the [playwright.monocart-reporter-options.ts](/playwright.monocart-reporter-options.ts) file and is shared between the Playwright configuration file, [playwright.config.ts](/playwright.config.ts), and the monocart-reporter merge CLI configuration file, [playwright.monocart-reporter-merge.ts](./playwright.monocart-reporter-merge.ts).

## NPM scripts

- `npm run test`: runs all the Playwright tests.
- `npm run first-shard`: runs the first shard of Playwright tests. It uses `--shard 1/2` with Playwright test. After running the tests it copies the result from the monocart-reporter into the `./shards/1` folder.
- `npm run second-shard`: runs the second shard of Playwright tests. It uses `--shard 2/2` with Playwright test. After running the tests it copies the result from the monocart-reporter into the `./shards/2` folder.
- `npm run all-shards`: runs the first and second shards. In the end the monocart-reporter form each of the sharded runs will be in the `./shards` folder.
- `npm run merge-cli`: uses the monocart-reporter merge CLI to merge the results from the Playwright test sharded runs. It merges the reports from `./shards/1` and `./shards/2` folders.

## How to test using a TS file for the monocart-reporter merge CLI

1) Clone the repo.
2) Run `npm install` from the root of the repo.
3) Run `npx playwright install` if needed to install Playwright browsers.
4) Run `npm run all-shards` to created sharded reports in the `./shards` folder.
5) Run `npm run merge-cli` to run the monocart-reporter merge CLI using a TS config file, the [playwright.monocart-reporter-merge.ts](playwright.monocart-reporter-merge.ts).
6) As it stands you should get an error saying:

> [MR] ERROR: failed to load config "./playwright.monocart-reporter-merge.ts": Cannot find package 'playwright.monocart-reporter-options' imported from Z:\repos\temp\monocart-merge-cli-demo\playwright.monocart-reporter-merge.ts

## Other notes

- the [playwright.monocart-reporter-merge.ts](./playwright.monocart-reporter-merge.ts) file contains a block of commented out code. If you uncomment that block and comment the code above then the `npm run merge-cli` works fine. Meaning the merge-cli will successfully use that TS file. This is just to further show that the problem seems to be with importing from other files in the project.
- this repo contains a [tsconfig.json](tsconfig.json) that mimics the one used in my real Angular project.
- the [package.json](/package.json) contains `"typescript": "~4.3.5"` which is also the version of Typescript that is supported on the Angular project where I'm trying to use the monocart-reporter merge CLI. I'm mentioning this because the current support for TS files in the monocart-reporter merge CLI is using [Amaro](https://github.com/nodejs/amaro) which in their README says: `The supported TypeScript version is 5.5.4.`.

