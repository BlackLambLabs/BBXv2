# BlackBoX research journal

An educational worksheet for keeping the question, method, and evidence together.
No trading recommendations or promises of performance.

## 1. Question
- What exactly am I testing?
- What result would change my mind?
- What is explicitly outside this experiment's scope?

## 2. Inputs and provenance
- Dataset name, version, date range, and content hash:
- Source and availability time of each input:
- Target/label definition and maturity rule:
- Known missing, invalid, or unresolved rows:
- Training, validation, and test boundaries:

## 3. Method, recorded before evaluation
- Hypothesis and comparison baseline:
- Parameters (including score threshold and inclusive/exclusive boundary):
- How parameters were selected without examining final test outcomes:
- Timing and overlap controls:
- Code revision, environment, and exact command:

## 4. Observations
- Confusion counts (TP, FP, TN, FN):
- Precision = TP / (TP + FP); undefined if the denominator is zero:
- Recall = TP / (TP + FN); undefined if the denominator is zero:
- Unexpected behavior and errors (keep failures visible):
- Artifacts and hashes:

## 5. Interpretation
- What this experiment establishes:
- What it does NOT establish:
- Data leakage, selection, sample-size, or timing concerns:
- Checks still needed before a broader claim:

## 6. Next decision
- Keep / revise / reject the hypothesis:
- One next experiment and its acceptance criteria:
- Date and author:

---
Starter exercise: use observations.csv and threshold_lab.py. Compare 0.35 with
0.40, then 1.00. Explain why precision can be undefined. These four observations
are invented. Perfect classification here is not evidence of real-world accuracy
or trading returns. Research label thresholds such as 21% or 26% are a separate
concept from the classifier score threshold demonstrated in this exercise.
