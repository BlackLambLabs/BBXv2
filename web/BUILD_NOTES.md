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
tests described in the dated project notes. Deployment succeeded for Sites source commit `79bf80ef3dd275d8c1cefe5c0b371793953f35d7`.
The hosted URL presents its expected ChatGPT sign-in gate. The review browser is
not authenticated there, so the hosted signup was not exercised. Local and hosted
D1 are separate; database persistence and removal were verified locally only.
The private site remains owner-only. No access settings were relaxed for testing.

Before a public launch, implement verified email delivery/unsubscribe and
support contact, retention operations, and abuse rate limiting. Before selling,
finish the product, checkout, purchase terms and reliable delivery. Private-preview
receipts support local-browser deletion and are not a full mailing platform.
