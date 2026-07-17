# FRED data scripts

These scripts pull macro series from the St. Louis Fed (FRED) and emit TypeScript
into `lib/data/economy-data.ts`. The fetched data is baked in as static values, so
the API key is only needed at data-build time — never at runtime, and never in the
repo.

## Running them

```bash
FRED_API_KEY=<your key> node scripts/fetch-macro-data.cjs
```

The key comes from the environment. The scripts exit immediately if it is unset.
`.env` and `.env.local` are gitignored — put it in one of those, or pass it inline.

Get a key at <https://fredaccount.stlouisfed.org/apikeys>. They are free.

## Never hardcode the key

On 2026-07-17 the key was found written literally into `fetch-macro-data.cjs`,
`fetch-macro-data-batch3.cjs`, and `fetch-macro-data-batch4.cjs`. It had been
committed in `21e91e4`, `f0587c5`, and `5fae26e`, all of which were pushed to the
public GitHub repo — so the key was publicly readable and had to be rotated.

The literals are gone from the working tree, but **they are still in git history**.
Deleting a secret from the latest commit does not remove it from earlier ones; the
only reliable remedy is rotating the key at FRED, which has been done. Rewriting
history (`git filter-repo` / BFG + force-push) can purge the blobs, but forks and
GitHub's own caches may retain them, so rotation is the fix that actually counts.

If you add another script here, read the key from `process.env.FRED_API_KEY` and
let it fail loudly when missing, exactly as the existing ones do.
