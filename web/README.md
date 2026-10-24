# BlackBoX research website

A working private preview of the BlackBoX website: an interactive educational lab,
runnable Python/CSV starter download, project notes, book concept, and a persisted
email interest list. Built from the visual direction and artwork in
[BlackLambLabs/BBXv2](https://github.com/BlackLambLabs/BBXv2).

## Run and check

Node >=22.13 is required. The committed pnpm lockfile pins this build.

```sh
corepack pnpm install --frozen-lockfile
node --test tests/research.test.mjs
node node_modules/typescript/bin/tsc --noEmit
python3 public/downloads/threshold_lab.py --self-test
pnpm build
```

For a local database, build first, then apply the schema once:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_thankful_lethal_legion.sql
```

Run `pnpm dev` outside managed Sites environments. In managed ChatGPT Work, use
`sites-preview start <absolute-checkout>` and its exact URL. Do not run a second
preview server there. The application uses a Cloudflare D1 binding named `DB`;
GitHub Pages alone cannot host its API. Sites provisions production D1 and applies
committed migrations when the exact saved source version is deployed.

## What works

- Threshold slider and 0.35/0.40 presets, inclusive boundary, precision/recall,
  confusion counts, and an undefined precision edge case.
- Free ZIP with standard-library Python, four synthetic observations, journal
  template, and README. Individual download files are also available.
- POST `/api/interest` validates email and explicit consent, deduplicates the
  normalized email, records consent time/version, and returns a removal receipt.
- DELETE `/api/interest` removes only the record matching a hashed receipt.
  Receipt hashes and email addresses are never exposed through a listing API.
- Responsive navigation, FAQ disclosures, research notes, and privacy page.

## Data and scope

The database stores email, timestamp, consent version, and hashed removal secret.
Original removal receipts are stored in the signing-up browser. Duplicate requests
do not reveal or replace an existing secret. The same success response is used for
new and existing addresses. Local preview and hosted databases are separate.

This release is owner-private. It does not send email, verify addresses, charge,
run trading research, or make investment-performance claims. Before collecting
public signups, configure an email provider, verified support contact,
email verification and unsubscribe, retention/deletion operations, and abuse
rate limiting. Paid products also need finalized content, payment, delivery, and
customer terms. The book illustration is a cover concept, not a finished product.

Project status is a dated summary of supplied October 23, 2026 local handoffs.
It is not live worker monitoring. The 66 reported research tests are unrelated to
this website's six automated unit tests. The lab's score thresholds are also
separate from the research pipeline's 21%/26% label thresholds.

## Local integration checks

For a disposable local preview only, copy `tests/api.integration.html` to
`public/review-api.html`, open it in the preview, and click Run API checks.
It uses synthetic example.com addresses, validates API errors and downloads, and
removes its own entries. Delete that public harness before building for deployment.
Do not publish test harnesses or local database files.

## Deployment and source

The private Sites preview is https://blackbox-research.blacklamb-1638.chatgpt.site .
The site is built on Vinext/React and a Cloudflare Worker. Keep `.openai/hosting.json`
and the provided Vite `sites()` integration. Never commit secrets, local databases,
or runtime logs. The existing BBXv2 public root is preserved; the review branch
contains this app under `web/` for an explicit future hosting decision.
