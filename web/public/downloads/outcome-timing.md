# BlackBoX field note 02: A result needs a clock

A free worked example from Building BlackBoX, an independent book project in development.

## The question

When can a label enter a training set? This small example labels whether an event occurred within a preset observation window. It conservatively waits until the whole window is observed for **both** positive and negative answers. A hit occurring early does not erase the rest of the window.

This is a synthetic, fixed-horizon teaching example, not the production BlackBoX labeler, a maturity certificate generator, or a backtest. Complete observations across each window are assumed. Dates are illustrative; we do not model trading sessions, prices, data gaps, features, portfolio equity, or returns.

## Three observations

Assume observations are complete through January 12, 2026, and held-out data starts January 13.

| Row | Window | First event | Training status |
| --- | --- | --- | --- |
| A | Jan 05–Jan 12 | Jan 08 | Positive |
| B | Jan 05–Jan 12 | No event | Negative |
| C | Jan 09–Jan 16 | Not yet known | Unresolved |

C is not a negative: its window is unfinished. A and B are mature in this simplified design. They also end strictly before the held-out cutoff.

## The rule

```python
def training_status(row, *, observed_through, cutoff):
    if observed_through < row.window_end:
        return "unresolved"
    if row.window_end >= cutoff:
        return "purged"
    return "positive" if row.first_hit is not None else "negative"
```

The second comparison is deliberately strict about separation. An endpoint equal to the cutoff is excluded. A later cutoff is required to include that endpoint.

Real labelers may inspect observations later than a visible event or peak. Every scan and rule contributes to the true endpoint. This teaching example's preset endpoint cannot be substituted for that evidence.

## Run it

Use Python 3.10 or newer. No third-party Python packages, database, or API keys are needed for the script. The companion notebook contains its own copy of the code and can be opened in an existing Jupyter environment.

```text
python outcome_timing.py
python outcome_timing.py --self-test
python outcome_timing.py --cutoff 2026-01-12
python outcome_timing.py --observed-through 2026-01-10
```

Expected default outcomes: `positive, negative, unresolved`.
At cutoff January 12: `purged, purged, unresolved`.
At observed-through January 10: all `unresolved`, including A.

## Change one thing

1. Predict the result before moving the cutoff to January 12.
2. Observe through January 16 while keeping the January 13 cutoff. Why is C purged?
3. Move observed-through to January 16 and cutoff to January 17. C can now be negative.
4. Write down what is missing before applying this rule to actual market data.

## Keep the limits

A real evaluation needs complete observation coverage, maturity evidence for both label classes, the actual dependency endpoint from all labeling scans, feature availability at decision time, appropriate outcome-overlap purging, and a locked test period. These examples demonstrate a boundary rule; they do not verify those requirements in production or establish any trading performance.

The classifier decision threshold in the site's first lab is a different concept from the return threshold used to define a market label. Neither is a measured daily return.

## Your working notes

- Question:
- Inputs and their provenance:
- Observation window and cutoff:
- Expected result before running:
- Actual result:
- What remains unknown:

Original educational sample by BlackLamb Labs. No affiliation with Neural Networks from Scratch.
