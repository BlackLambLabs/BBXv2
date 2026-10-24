import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, validateSignup } from "../lib/research.mjs";
test("inclusive 0.35 boundary creates the known false positive", () => {
  const r = evaluate(35);
  assert.deepEqual([r.tp,r.fp,r.tn,r.fn], [2,1,1,0]);
  assert.equal(r.precision, 2/3); assert.equal(r.recall, 1);
});
test("0.40 fixture has two true positives and two true negatives", () => {
  const r = evaluate(40); assert.deepEqual([r.tp,r.fp,r.tn,r.fn], [2,0,2,0]);
});
test("empty positive predictions have undefined precision", () => {
  const r = evaluate(100); assert.equal(r.precision, null); assert.equal(r.recall, 0);
  assert.deepEqual([r.tp,r.fp,r.tn,r.fn], [0,0,2,2]);
});
test("every threshold conserves all observations and actual labels", () => {
  for (let t = 0; t <= 100; t++) {
    const r = evaluate(t); assert.equal(r.tp+r.fp+r.tn+r.fn, 4);
    assert.equal(r.tp+r.fn, 2); assert.equal(r.tn+r.fp, 2);
  }
});
test("threshold rejects invalid domain values", () => {
  for (const v of [-1,101,35.5,NaN,"40"]) assert.throws(() => evaluate(v), RangeError);
});
test("signup requires valid email and explicit consent", () => {
  assert.deepEqual(validateSignup({email:"  Builder@Example.com ",consent:true}), {email:"builder@example.com"});
  for (const v of [null,[],{}, {email:"bad",consent:true}, {email:"a@b.c",consent:false}, {email:"a@b.c",consent:"true"}, {email:"a@b.c",consent:true,company:"bot"}]) assert.ok(validateSignup(v).error);
});
