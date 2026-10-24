"""BlackBoX educational threshold lab. Python 3.10+, standard library only.

Four invented observations. No market data, investment advice, or performance claim.
Run: python threshold_lab.py --threshold 0.40
Run boundary checks: python threshold_lab.py --self-test
"""
import argparse
import csv
import json
from decimal import Decimal, InvalidOperation
from pathlib import Path


def evaluate(threshold, rows):
    cutoff = Decimal(str(threshold))
    if not cutoff.is_finite() or not Decimal(0) <= cutoff <= Decimal(1):
        raise ValueError("Threshold must be between 0 and 1.")
    counts = dict(tp=0, fp=0, tn=0, fn=0)
    predictions = []
    for row in rows:
        actual = int(row["actual"])
        score = Decimal(row["score"])
        if actual not in (0, 1) or not score.is_finite() or not 0 <= score <= 1:
            raise ValueError("Invalid observation")
        predicted = int(score >= cutoff)
        key = "tp" if predicted and actual else "fp" if predicted else "fn" if actual else "tn"
        counts[key] += 1
        predictions.append(dict(id=row["id"], actual=actual, predicted=predicted, score=str(score)))
    positives = counts["tp"] + counts["fp"]
    actual_positives = counts["tp"] + counts["fn"]
    return dict(threshold=str(cutoff), **counts,
                precision=counts["tp"] / positives if positives else None,
                recall=counts["tp"] / actual_positives if actual_positives else None,
                observations=predictions)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--threshold", default="0.40")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    with Path(__file__).with_name("observations.csv").open(newline="", encoding="utf-8") as stream:
        rows = list(csv.DictReader(stream))
    if args.self_test:
        for threshold, expected in [("0.35", (2, 1, 1, 0)), ("0.40", (2, 0, 2, 0)), ("1.00", (0, 0, 2, 2)), ("0.00", (2, 2, 0, 0))]:
            result = evaluate(threshold, rows)
            observed = tuple(result[key] for key in ("tp", "fp", "tn", "fn"))
            if observed != expected:
                raise AssertionError((threshold, observed, expected))
        if evaluate("1.00", rows)["precision"] is not None:
            raise AssertionError("Precision is undefined with no positive predictions.")
        print("PASS: four boundary fixtures and undefined precision")
        return
    try:
        print(json.dumps(evaluate(args.threshold, rows), indent=2))
    except (ValueError, InvalidOperation) as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()
