"""BlackBoX field note 02: when an outcome becomes usable.

Synthetic, fixed-horizon teaching example. Python 3.10+, standard library only.
This is not the production BlackBoX labeler, a maturity certificate generator,
or a backtest. Full observation coverage is assumed; dates are illustrative.

Run: python outcome_timing.py
Check boundary examples: python outcome_timing.py --self-test
"""
from dataclasses import dataclass
from datetime import date
import argparse
import json


@dataclass(frozen=True)
class Outcome:
    name: str
    window_start: date
    window_end: date
    first_hit: date | None

    def __post_init__(self):
        if self.window_end < self.window_start:
            raise ValueError("The observation window cannot run backward.")
        if self.first_hit is not None and not self.window_start <= self.first_hit <= self.window_end:
            raise ValueError("A hit must fall inside the observation window.")


def training_status(row, *, observed_through, cutoff):
    """Conservative fixed-horizon rule, with strict endpoint exclusion.

    Both positive and negative outcomes wait for the complete preset window.
    A mature window ending at or after the training cutoff is excluded.
    observed_through assumes complete observations from window_start onward.
    """
    if observed_through < row.window_end:
        return "unresolved"
    if row.window_end >= cutoff:
        return "purged"
    return "positive" if row.first_hit is not None else "negative"


EXAMPLES = (
    Outcome("A", date(2026, 1, 5), date(2026, 1, 12), date(2026, 1, 8)),
    Outcome("B", date(2026, 1, 5), date(2026, 1, 12), None),
    Outcome("C", date(2026, 1, 9), date(2026, 1, 16), None),
)


def self_test():
    def statuses(observed, cutoff):
        return [training_status(row, observed_through=observed, cutoff=cutoff) for row in EXAMPLES]
    assert statuses(date(2026, 1, 10), date(2026, 1, 13)) == ["unresolved"] * 3
    assert statuses(date(2026, 1, 12), date(2026, 1, 13)) == ["positive", "negative", "unresolved"]
    assert statuses(date(2026, 1, 12), date(2026, 1, 12)) == ["purged", "purged", "unresolved"]
    assert statuses(date(2026, 1, 16), date(2026, 1, 13)) == ["positive", "negative", "purged"]
    assert statuses(date(2026, 1, 16), date(2026, 1, 17)) == ["positive", "negative", "negative"]
    try:
        Outcome("invalid", date(2026, 1, 5), date(2026, 1, 12), date(2026, 1, 13))
    except ValueError:
        pass
    else:
        raise AssertionError("An out-of-window hit must be rejected.")
    print("PASS: early observation, both labels, exact cutoff, tail, later cutoff, invalid hit")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--observed-through", type=date.fromisoformat, default=date(2026, 1, 12))
    parser.add_argument("--cutoff", type=date.fromisoformat, default=date(2026, 1, 13))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    print(json.dumps({
        "kind": "synthetic_fixed_horizon_example",
        "observed_through": args.observed_through.isoformat(),
        "cutoff": args.cutoff.isoformat(),
        "outcomes": [
            {"id": row.name, "status": training_status(row, observed_through=args.observed_through, cutoff=args.cutoff)}
            for row in EXAMPLES
        ],
    }, indent=2))


if __name__ == "__main__":
    main()
