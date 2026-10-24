BLACKBOX RESEARCH STARTER — v1, 24 October 2026

Four invented observations. Standard-library Python. No signup required.

1. Extract all files into one folder.
2. Install/use Python 3.10 or later.
3. In that folder, run:
   python threshold_lab.py --threshold 0.35
   python threshold_lab.py --threshold 0.40
   python threshold_lab.py --threshold 1.00
   python threshold_lab.py --self-test

On systems where Python is named python3, use python3 instead of python.
No packages, network access, API keys, broker, or database are needed.

EXPECTED RESULTS
0.35: TP 2, FP 1, TN 1, FN 0; precision 2/3; recall 1.
0.40: TP 2, FP 0, TN 2, FN 0; precision 1; recall 1.
1.00: TP 0, FP 0, TN 2, FN 2; precision null (undefined); recall 0.

The boundary is inclusive: score >= threshold. Decimal avoids binary float
ambiguity at exact equality. The website uses integer percentages for the same
reason. The web display rounds percentages; the download retains full precision.

Use research-journal.md to record your question, assumptions, evidence, and limits.
Selecting parameters using final test labels can overfit. This fixture explains
mechanics and proves no investment performance or real-world generalization.

You may use, modify, and share this educational sample with attribution to
BlackLamb Labs / BlackBoX. Provided as-is, without warranty.
Website source: https://github.com/BlackLambLabs/BBXv2
