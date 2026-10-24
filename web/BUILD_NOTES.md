# Website build record — 24 October 2026

## Result

Private BlackBoX website built from the existing BBXv2 visual identity and source
artwork. The current public root remains unchanged. Proposed source lives under
`web/` in the BBXv2 review branch; the private preview is hosted separately.

## Verified locally

- TypeScript compilation passes.
- Six Node tests pass: inclusive threshold boundaries, undefined precision,
  conservation over all 101 slider values, invalid values, signup validation.
- Downloaded Python sample self-test passes four fixtures and undefined precision.
- Production Worker/Vinext build passes.
- Desktop visual review, responsive navigation and lab reviewed at 390px iframe
  viewport (375px content width with scrollbar). Decorative orbit overflow fixed;
  document scroll width equals viewport width after the fix.
- Browser signup saved one disposable example.com entry to local D1. Database
  query confirmed count 1; removal UI deleted it and query confirmed count 0.
- Sixteen local API/download checks pass, covering invalid input, oversized
  bodies, duplicate handling, receipt removal, and all free sample resources.
- Research notes/privacy navigation and book illustration reviewed in browser.

## Scope and limits

No payments, shipping, live trading signals, automated email, or public launch.
No original research runner, credit ledger, or database was accessed or changed by
this website implementation. Website tests are separate from the 66 local research
tests described in the dated project notes. Production signup will receive a final
smoke check after deployment; local and hosted D1 are separate.

Before a public launch, implement verified email delivery/unsubscribe and
support contact, retention operations, and abuse rate limiting. Before selling,
finish the product, checkout, purchase terms and reliable delivery. Private-preview
receipts support local-browser deletion and are not a full mailing platform.


## Visual refresh — October 23, 2026 (Pacific)

Updated the existing site using the supplied Mercury, Linear, Hostinger, and archived Write Clean Code references as visual influences. Original BlackBoX composition and copy; no third-party stylesheet or brand assets were incorporated.

- Charcoal/violet palette, large centered typography, quieter navigation, and a research workspace illustration.
- Warm editorial signup section with a serif accent, larger controls, explicit consent, and the existing saved-interest/removal behavior.
- Responsive layouts verified in desktop, 390px mobile, and 768px tablet frames; no horizontal overflow at those sizes.
- Six existing tests and TypeScript checks passed. Browser checks confirmed threshold 0.35 behavior, keyboard reset to 0.40, mobile navigation, signup persistence and removal in the local preview.
- Backend, database schema, downloads, and access policy are unchanged. No automated emails or payments enabled. Temporary responsive-review page removed before packaging.
- Removed the development-only codex-preview metadata.

References: https://mercury.com/ · https://linear.app/ · https://www.hostinger.com/ · https://web.archive.org/web/20250118094215/https://www.writecleancode.net/css/style.css
