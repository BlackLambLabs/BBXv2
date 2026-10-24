import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Download } from "lucide-react";

export const metadata: Metadata = { title: "A result needs a clock — BlackBoX field note 02", description: "A free worked example on positive and negative label maturity, unfinished observation windows, and strict cutoff boundaries. Original notes, runnable Python, and a companion notebook." };

const exampleCode = `def training_status(row, *, observed_through, cutoff):
    if observed_through < row.window_end:
        return "unresolved"
    if row.window_end >= cutoff:
        return "purged"
    return "positive" if row.first_hit is not None else "negative"`;

export default function OutcomeNotebook() {
  return <main className="document-page notebook-page">
    <Link href="/#book" className="document-back">← Back to the builder’s notebook</Link>
    <p className="eyebrow">FIELD NOTE 02 / FREE WORKED EXAMPLE</p>
    <h1>A result<br/>needs a clock.</h1>
    <p className="document-lead">Before asking what a model learned, ask when each answer became available. Work through three invented observations, six lines of Python, and one useful boundary.</p>
    <div className="notebook-meta mono"><span>PYTHON 3.10+ · NO PACKAGES</span><span>SYNTHETIC DATA ONLY</span></div>
    <section><h2>01. Name the question</h2><p>Imagine a deliberately simple label: did an event happen within a fixed observation window? A “yes” and a “no” both describe that window. In this example we conservatively wait until the complete window is observed before using either answer.</p><p>A hit may occur early. That does not make the entire observation window disappear. In a real labeler, the last observation used by every scan or rule may be later still. That actual dependency endpoint needs its own evidence.</p><div className="notebook-aside"><strong>Scope of this sample</strong><p>This is a small teaching model, not the production BlackBoX labeler or a generator of real maturity certificates. We assume complete observations across each preset window. No market prices, trading sessions, missing-data checks, or model predictions are involved.</p></div></section>
    <section><h2>02. Keep three states distinct</h2><p>Suppose we have observations through January 12, and the held-out period starts January 13. All dates below are invented.</p><div className="notebook-table-wrap"><table className="notebook-table"><caption>Fixed-horizon outcomes at the January 12 observation boundary</caption><thead><tr><th>Row</th><th>Observation window</th><th>First event</th><th>Training status</th></tr></thead><tbody><tr><th>A</th><td>Jan 05 → Jan 12</td><td>Jan 08</td><td>Positive</td></tr><tr><th>B</th><td>Jan 05 → Jan 12</td><td>No event</td><td>Negative</td></tr><tr><th>C</th><td>Jan 09 → Jan 16</td><td>Not yet known</td><td>Unresolved</td></tr></tbody></table></div><p>Row C is not a negative. Its window is still open. Converting unfinished observations to negatives would give the model an answer we do not yet have.</p></section>
    <section><h2>03. Put the boundary in code</h2><pre className="notebook-code" tabIndex={0} aria-label="Python fixed-horizon training status example"><code>{exampleCode}</code></pre><p>The first check asks whether the full outcome window is observed. The second excludes mature outcomes whose window ends at or after the held-out boundary. This strict <code>&gt;=</code> check means an endpoint equal to the cutoff is excluded too.</p><p>For our examples, the output is <code>positive, negative, unresolved</code>. Move the cutoff to January 12 and it becomes <code>purged, purged, unresolved</code>. Move observed-through back to January 10 and all three are unresolved, including A, where an event has already happened.</p></section>
    <section><h2>04. Run it. Change one thing.</h2><p>The free pack contains this note, a standalone Python script, and a Jupyter notebook with the code included. It runs without a database, an API key, or third-party Python packages.</p><pre className="notebook-code notebook-command" tabIndex={0}><code>{`python outcome_timing.py
python outcome_timing.py --self-test
python outcome_timing.py --cutoff 2026-01-12
python outcome_timing.py --observed-through 2026-01-10`}</code></pre><a href="/downloads/blackbox-field-note-02.zip" download className="button lime-button">Download the worked example <Download size={17}/></a><a href="/downloads/outcome-timing.ipynb" download className="notebook-secondary">Just the notebook ↓</a><ol className="notebook-exercises"><li>Predict the result before moving the cutoff to January 12.</li><li>Observe through January 16 while keeping the January 13 cutoff. Why is C purged rather than usable?</li><li>Move both dates forward: observed-through January 16, cutoff January 17. Which unresolved answer becomes negative?</li><li>Write down what evidence is missing before using this rule with real data.</li></ol></section>
    <section><h2>05. Carry the idea, keep the limits</h2><p>A production evaluation needs more than this date comparison: complete observation coverage; positive and negative maturity evidence; the real endpoint used by labeling scans; feature availability at decision time; appropriate overlap purging; and a separate, locked test period.</p><p>This field note demonstrates a boundary rule. It does not establish that those requirements are implemented in BlackBoX, or that a portfolio has earned any return.</p><Link href="/method" className="text-link">Read the dated project record <ArrowUpRight size={16}/></Link></section>
    <div className="notebook-footer"><div><span className="mono">BUILDING BLACKBOX · FIELD NOTES</span><p>Small examples. Every assumption on the page.</p></div><Link href="/#join" className="button outline-button">Follow the build <ArrowUpRight size={16}/></Link></div>
  </main>;
}
