// Integer percentages keep the exact threshold boundary reproducible.
export const observations = [
  { id: "A", score: 10, actual: 0 },
  { id: "B", score: 40, actual: 1 },
  { id: "C", score: 35, actual: 0 },
  { id: "D", score: 80, actual: 1 },
];
export function evaluate(threshold) {
  if (!Number.isInteger(threshold) || threshold < 0 || threshold > 100) throw new RangeError("Threshold must be an integer percentage from 0 to 100.");
  const rows = observations.map(row => ({ ...row, predicted: Number(row.score >= threshold) }));
  const tp = rows.filter(row => row.actual === 1 && row.predicted === 1).length;
  const fp = rows.filter(row => row.actual === 0 && row.predicted === 1).length;
  const tn = rows.filter(row => row.actual === 0 && row.predicted === 0).length;
  const fn = rows.filter(row => row.actual === 1 && row.predicted === 0).length;
  return { rows, tp, fp, tn, fn, precision: tp + fp ? tp / (tp + fp) : null, recall: tp / (tp + fn) };
}
export function validateSignup(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Please enter your email and confirm your consent." };
  if (typeof value.email !== "string") return { error: "Please enter a valid email address." };
  const email = value.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (value.consent !== true) return { error: "Please confirm that you want BlackBoX updates." };
  if (typeof value.company === "string" && value.company.trim()) return { error: "Unable to accept this request." };
  return { email };
}
