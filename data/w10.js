/* Week 10 — Association Mining */
QB.addWeek({
  week: 10,
  title: "Association Mining",
  notes: [
    { h: "Concepts", html: `
<p><b>Association mining</b> (market-basket analysis) discovers interesting relationships between items in <b>transactional</b> data: items that imply the presence of other items in the <b>same transaction</b> (milk + cereal, chips + salsa). Applications: market baskets and cross-marketing, web click-streams, recommender systems, medical symptom–disease correlations. Frequent patterns are also used as derived features for classification and clustering.</p>
<ul><li><b>Item</b>: a basic object (bread). <b>Itemset</b>: a set of items, order irrelevant. A <b>k-itemset</b> has k items.</li>
<li><b>Transaction</b>: (TID, itemset).</li>
<li><b>Association rule</b> X ⇒ Y (antecedent ⇒ consequent): X and Y are <b>disjoint</b>, Y is <b>not empty</b>. So A,B ⇒ B,C is invalid (B in both) and A,B ⇒ { } is invalid.</li>
<li>Interesting rules are non-trivial, actionable and explainable. Association mining usually produces a <b>large number</b> of rules, many of them uninteresting.</li></ul>` },
    { h: "Measures (formulas)", html: `
<table><tr><th>Measure</th><th>Formula</th><th>Meaning</th></tr>
<tr><td><b>Support</b> of itemset X</td><td>sup(X) = count(X) / N</td><td>Frequency</td></tr>
<tr><td><b>Support</b> of rule X ⇒ Y</td><td>sup(X ∪ Y) = P(X and Y together)</td><td>How often the rule applies</td></tr>
<tr><td><b>Confidence</b> X ⇒ Y</td><td>sup(X ∪ Y) / sup(X) = P(Y | X)</td><td>Strength of the rule: how much Y depends on X</td></tr>
<tr><td><b>Lift</b> (improvement)</td><td>conf(X ⇒ Y) / sup(Y) = sup(X ∪ Y) / (sup(X)·sup(Y))</td><td>Strength compared with independence. <b>Lift is symmetric</b> (X⇒Y and Y⇒X have the same lift).</td></tr></table>
<p><b>Lift &gt; 1</b>: positive correlation. <b>= 1</b>: independent. <b>&lt; 1</b>: negative correlation. Rules with very high or very low lift are interesting.</p>
<p>(X ∪ Y in the support formula means "transactions containing all items of X and of Y".)</p>
<h4>Worked example (lecture: savings and cheque accounts, N = 10,000)</h4>
<table><tr><th></th><th>CK = No</th><th>CK = Yes</th><th>Total</th></tr>
<tr><td>SVG = No</td><td>500</td><td>3,500</td><td>4,000</td></tr>
<tr><td>SVG = Yes</td><td>1,000</td><td>5,000</td><td>6,000</td></tr>
<tr><td>Total</td><td>1,500</td><td>8,500</td><td>10,000</td></tr></table>
<ul><li>sup(SVG ⇒ CK) = 5000/10000 = 50%. conf = 5000/6000 = <b>83%</b>.</li>
<li>conf(CK ⇒ SVG) = 5000/8500 = 59%.</li>
<li>conf(¬SVG ⇒ CK) = 3500/4000 = 87.5%, which is higher than 83%.</li>
<li>Lift(SVG ⇒ CK) = 0.83 / 0.85 = <b>0.97 &lt; 1</b>, so the two are negatively correlated even though the confidence is high.</li></ul>
<h4>Worked example: small dataset</h4>
<p>Transactions: ABC, ACD, BCD, ADE, BCE (N = 5). A⇒D: sup = 2/5, conf = 2/3. C⇒A: sup = 2/5, conf = 2/4. B&amp;C⇒D: sup = 1/5, conf = 1/3.</p>` },
    { h: "Apriori algorithm", html: `
<p><b>Frequent itemset</b>: sup ≥ minsup. <b>Strong rule</b>: frequent and conf ≥ minconf.</p>
<ul><li><b>Apriori subset property:</b> every subset of a frequent itemset is frequent.</li>
<li><b>Apriori pruning property:</b> every superset of an infrequent itemset is infrequent. This is the basis of the algorithm's efficiency.</li></ul>
<p><b>Two steps:</b> (1) find all frequent itemsets, (2) generate rules with enough confidence.</p>
<ol><li>Scan and count 1-itemsets, keeping the frequent ones.</li>
<li><b>Candidate generation:</b> join two frequent k-itemsets that share k−1 items (ABC + ABD → ABCD, but ABC + ADE are not joined). <b>Prune</b> any candidate with an infrequent subset.</li>
<li>Scan and count the candidates, keeping the frequent ones. Repeat until there are no candidates.</li></ol>
<p><b>Rule generation:</b> for each frequent itemset f and every non-empty proper subset s, output s ⇒ f∖s if sup(f)/sup(s) ≥ minconf. A frequent k-itemset gives <b>2<sup>k</sup> − 2</b> candidate rules. All rules from the same itemset have the <b>same support</b>.</p>
<h4>Worked example (lecture, minsup = minconf = 40%)</h4>
<p>T1 {A,C,D}, T2 {A,B,C,D}, T3 {B,C}, T4 {A,D}, T5 {A,C}.</p>
<ul><li>C1: A 0.8, B 0.4, C 0.8, D 0.6. All frequent.</li>
<li>C2 (6 candidates): AB 0.2, AC 0.6, AD 0.6, BC 0.4, BD 0.2, CD 0.4. Frequent: AC, AD, BC, CD.</li>
<li>C3: join AC + AD → ACD (subsets AC, AD, CD are all frequent, so it is kept). ABC would need AB, which is infrequent, so it is not generated. BCD would need BD, which is infrequent, so it is not generated. sup(ACD) = 0.4, frequent.</li>
<li>Total: 4 + 6 + 1 = <b>11 candidates</b>, 4 + 4 + 1 = <b>9 frequent itemsets</b>.</li>
<li>From ACD: A ⇒ CD has conf 0.4/0.8 = 0.5 (strong). CD ⇒ A has conf 0.4/0.4 = 1.0.</li></ul>
<p><b>Official sample:</b> sup(A) = 0.6, sup(ABC) = 0.5, sup(ABCD) = 0.4. Both A ⇒ BCD and ABC ⇒ D have support 0.4. conf(A ⇒ BCD) = 0.4/0.6 = 0.67 and conf(ABC ⇒ D) = 0.4/0.5 = 0.8. Rules from ABCD with 3 antecedent items and 1 consequent item: ABC⇒D, ABD⇒C, ACD⇒B, BCD⇒A.</p>
<p><b>Bottleneck:</b> <b>candidate generation and test</b>. There is one full database scan per level and a huge number of candidates (a 100-itemset implies 2¹⁰⁰ − 1 ≈ 1.27×10³⁰ subsets).</p>` },
    { h: "FP-growth", html: `
<ul><li><b>No candidate generation.</b> It uses divide and conquer and grows long patterns from short ones.</li>
<li><b>Two phases:</b> (1) build an <b>FP-tree</b> by scanning the database <b>twice</b>. The first scan counts items and builds the frequency-descending <b>f-list</b>. The second scan inserts each transaction's frequent items, in f-list order, into the tree. (2) Mine the FP-tree recursively <b>without scanning the database again</b>.</li>
<li>Advantages: a compressed database, only 2 passes, faster than Apriori especially at low support thresholds. Disadvantages: the tree <b>may not fit in memory</b>, it is expensive to build, and the algorithm is recursive.</li></ul>` },
    { h: "Sequential patterns", html: `
<p><b>Order matters</b>: temporal associations between events rather than items within one transaction (shopping sequences, click-streams, DNA). A sequence is an ordered list of <b>elements</b>, each element is a set of items (unordered inside), e.g. &lt;a (abc) (ac) d (cf)&gt;.</p>
<p>A <b>subsequence</b> keeps the order and takes subsets of elements: &lt;a (bc) d c&gt; and &lt;(ab) c&gt; are subsequences of &lt;a (abc) (ac) d (cf)&gt;. Algorithms: Agrawal and Srikant (1995), <b>GSP</b>. The Apriori property still holds: if S is infrequent, all its super-sequences are infrequent.</p>
<p>Example: within three months of buying a property, buyers purchase cookers, freezers and washing machines.</p>` },
    { h: "Common exam traps", html: `
<ul><li>Rule support is sup(X∪Y), <b>not</b> sup(X).</li>
<li>Confidence divides by the support of the <b>antecedent</b>.</li>
<li>High confidence ≠ interesting. Check lift (SVG ⇒ CK: conf 83% but lift 0.97).</li>
<li>Lift measures the strength of the effect. "Association mining usually yields a small number of rules" is <b>false</b> (official sample).</li>
<li>Count candidate itemsets <b>after</b> pruning. An itemset with an infrequent subset is not even a candidate.</li>
<li>Join only k-itemsets that share k−1 items.</li>
<li>FP-growth scans the database exactly twice and generates no candidates.</li></ul>` }
  ],
  questions: [
    { t: "Support and confidence",
      q: "In a dataset of 9 transactions, A appears in 6, B in 7, and A and B together in 4. What are the support and confidence of <b>A ⇒ B</b>?",
      o: ["Support 4/9, confidence 4/6", "Support 6/9, confidence 4/7", "Support 4/9, confidence 4/7", "Support 4/6, confidence 4/9"],
      a: 0,
      s: "sup = P(A∧B) = 4/9 ≈ 0.44. conf = sup(AB)/sup(A) = 4/6 ≈ 0.67.",
      c: "Support of a rule = support of the union of its items. Confidence = P(consequent | antecedent).",
      w: ["Correct.", "Wrong: 6/9 is sup(A), and conf divides by the antecedent (A), not B.", "Wrong: 4/7 is conf(B ⇒ A).", "Wrong: swapped."],
      steps: ["sup(A ⇒ B) = count(A and B)/N = 4/9 ≈ 0.444.", "conf(A ⇒ B) = sup(AB)/sup(A) = (4/9)/(6/9) = 4/6 ≈ 0.667."] },

    { t: "Lift",
      q: "Using the same data (N = 9, sup(A) = 6/9, sup(B) = 7/9, sup(AB) = 4/9), what is the lift of A ⇒ B and what does it mean?",
      o: ["1.17, positive correlation", "0.857, negative correlation", "1.0, independent", "0.667, independent"],
      a: 1,
      s: "Lift = (4/9)/((6/9)(7/9)) = 36/42 ≈ 0.857 < 1, so A and B are negatively correlated.",
      c: "Lift = conf(X⇒Y)/sup(Y) = sup(X∪Y)/(sup(X)·sup(Y)). >1 positive, =1 independent, <1 negative.",
      w: ["Wrong: arithmetic error.", "Correct.", "Wrong: it isn't exactly 1.", "Wrong: 0.667 is the confidence, and lift ≠ 1 doesn't mean independent."],
      steps: ["conf(A ⇒ B) = 4/6 = 0.667.", "sup(B) = 7/9 = 0.778.", "Lift = 0.667/0.778 ≈ 0.857.", "0.857 < 1, so negative correlation: buying A makes B slightly <i>less</i> likely than its base rate."] },

    { t: "Lift",
      q: "For 10,000 customers: 6,000 have a savings account (SVG), 8,500 have a cheque account (CK), and 5,000 have both. Which statement is correct?",
      o: ["conf(SVG ⇒ CK) = 83% and lift = 0.97, so despite high confidence SVG and CK are slightly negatively correlated.", "conf(SVG ⇒ CK) = 59% and lift = 1.2", "conf(SVG ⇒ CK) = 50%, so independent", "lift = 1.17, so positively correlated"],
      a: 0,
      s: "conf = 5000/6000 = 0.83, sup(CK) = 0.85, lift = 0.83/0.85 ≈ 0.97 < 1.",
      c: "This is the lecture example. High confidence can be misleading if the consequent is already very common. Lift compares against independence.",
      w: ["Correct.", "Wrong: 59% is conf(CK ⇒ SVG) = 5000/8500.", "Wrong: 50% is the support.", "Wrong."],
      steps: ["sup(SVG ∧ CK) = 5000/10000 = 0.50.", "conf(SVG ⇒ CK) = 5000/6000 ≈ 0.833.", "sup(CK) = 8500/10000 = 0.85.", "Lift = 0.833/0.85 ≈ 0.98, which the lecture rounds to 0.97 using 83%/85%. Below 1, so negative correlation."] },

    { t: "Apriori properties",
      q: "Consider the statements:<br>(i) The pruning property is the basis of the Apriori algorithm.<br>(ii) Candidate generation is a bottleneck for the Apriori algorithm.",
      o: ["Both (i) and (ii) true", "Both (i) and (ii) false", "Only (i) true", "Only (ii) true"],
      a: 0,
      s: "Pruning (supersets of infrequent itemsets are infrequent) drives Apriori, and candidate generation-and-test is its bottleneck.",
      c: "Official week 10 Q1. The bottleneck comes from multiple database scans and a huge number of candidates. FP-growth avoids candidate generation.",
      w: ["Correct.", "Wrong.", "Wrong: (ii) is also true.", "Wrong: (i) is also true."] },

    { t: "Lift and rule count",
      q: "Consider the statements:<br>A. The lift measure in association rules calculates the strength of an effect.<br>B. Association rule mining usually results in a small number of rules.",
      o: ["Both statements are true.", "Statement A is true, but statement B is false.", "Statement A is false, but statement B is true.", "Both statements are false."],
      a: 1,
      s: "Lift measures strength relative to independence, and mining usually produces many rules.",
      c: "Official week 10 Q2. Many rules are uninteresting, so filter by support, confidence and lift.",
      w: ["Wrong: B is false.", "Correct.", "Wrong.", "Wrong: A is true."] },

    { t: "Apriori properties",
      q: "If the itemset {Milk, Bread} is <b>infrequent</b>, which conclusion follows directly from the Apriori properties?",
      o: ["{Milk} must be infrequent.", "{Milk, Bread, Eggs} must be infrequent.", "{Bread} must be frequent.", "{Milk, Eggs} must be infrequent."],
      a: 1,
      s: "Pruning property: any superset of an infrequent itemset is infrequent.",
      c: "Subset property: subsets of a frequent itemset are frequent. Pruning property: supersets of an infrequent itemset are infrequent. Neither says anything about the subsets of an infrequent set.",
      w: ["Wrong: subsets of an infrequent set can still be frequent.", "Correct.", "Wrong: not implied.", "Wrong: {Milk, Eggs} is not a superset of {Milk, Bread}."] },

    { t: "Candidate generation",
      q: "The frequent 2-itemsets are AC, AD, BC and CD. Using Apriori's join (share k−1 items) and prune steps, which 3-itemsets are <b>candidates</b>?",
      o: ["ACD only", "ABC, ACD, BCD", "ACD and BCD", "ABC and ACD"],
      a: 0,
      s: "Join AC + AD → ACD (all subsets frequent). ABC needs AB and BCD needs BD, which are infrequent.",
      c: "Join two frequent k-itemsets sharing their first k−1 items, then prune any candidate that has an infrequent k-subset.",
      w: ["Correct.", "Wrong: ABC and BCD contain infrequent subsets (AB, BD).", "Wrong: BD is infrequent, so BCD is pruned.", "Wrong: AB is infrequent, so ABC is pruned."],
      steps: ["Pairs sharing the first item: AC and AD (share A) → ACD.", "BC shares no first item with another frequent pair starting with B. CD has no partner starting with C.", "Check ACD's subsets: AC ✓, AD ✓, CD ✓, so it stays a candidate."] },

    { t: "Apriori full run",
      q: "Transactions: T1 {A,C,D}, T2 {A,B,C,D}, T3 {B,C}, T4 {A,D}, T5 {A,C}. With minimum support 40%, how many <b>candidate</b> and <b>frequent</b> itemsets does Apriori generate in total?",
      o: ["11 candidates, 9 frequent", "15 candidates, 9 frequent", "10 candidates, 8 frequent", "11 candidates, 11 frequent"],
      a: 0,
      s: "C1 = 4 (all frequent), C2 = 6 (4 frequent), C3 = 1 (ACD, frequent). 11 candidates and 9 frequent.",
      c: "Candidates at level k are formed only from frequent (k−1)-itemsets and pruned with the Apriori property. Frequent = candidates with support ≥ minsup.",
      w: ["Correct.", "Wrong: 15 would count all possible itemsets with no pruning.", "Wrong.", "Wrong: AB and BD are infrequent."],
      steps: ["1-itemsets: A 4/5, B 2/5, C 4/5, D 3/5. 4 candidates, all ≥ 0.4, so 4 frequent.", "2-itemsets (all pairs of frequent items): AB 0.2, AC 0.6, AD 0.6, BC 0.4, BD 0.2, CD 0.4. 6 candidates, 4 frequent (AC, AD, BC, CD).", "3-itemsets: only ACD survives join and prune. sup = 2/5 = 0.4, so it is frequent.", "Totals: candidates 4 + 6 + 1 = 11, frequent 4 + 4 + 1 = 9."] },

    { t: "Rule generation",
      q: "Given the frequent itemset {A, B, C, D}, how many rules have <b>three items in the antecedent and one item as the consequent</b>?",
      o: ["1", "4", "6", "14"],
      a: 1,
      s: "ABC⇒D, ABD⇒C, ACD⇒B, BCD⇒A.",
      c: "A k-itemset gives 2^k − 2 rules in total (14 for k = 4). Rules with one consequent item number k (4 here).",
      w: ["Wrong.", "Correct (official week 10 Q3).", "Wrong: 6 is the number of 2⇒2 rules.", "Wrong: 14 is the total number of rules from ABCD."] },

    { t: "Rule confidence",
      q: "A, D, ABC, BCD and ABCD are frequent with supports 0.6, 0.7, 0.5, 0.5 and 0.4. What are the confidences of <b>A ⇒ BCD</b> and <b>ABC ⇒ D</b>?",
      o: ["0.67 and 0.8", "0.4 and 0.4", "0.8 and 0.67", "0.6 and 0.5"],
      a: 0,
      s: "conf(A⇒BCD) = 0.4/0.6 = 0.67. conf(ABC⇒D) = 0.4/0.5 = 0.8. Both rules have support 0.4.",
      c: "Official week 10 Q4. Both rules come from ABCD, so they share sup = 0.4. Confidence divides by the antecedent's support.",
      w: ["Correct.", "Wrong: 0.4 is the support of both rules.", "Wrong: swapped.", "Wrong: those are the antecedent supports."],
      steps: ["Support of both rules = sup(ABCD) = 0.4.", "conf(A ⇒ BCD) = sup(ABCD)/sup(A) = 0.4/0.6 = 2/3 ≈ 0.67.", "conf(ABC ⇒ D) = sup(ABCD)/sup(ABC) = 0.4/0.5 = 0.8."] },

    { t: "Association rules",
      q: "Which of the following is a <b>valid</b> association rule?",
      o: ["A, B ⇒ B, C", "A, B ⇒ { }", "A ⇒ B, C", "{ } ⇒ { }"],
      a: 2,
      s: "Antecedent and consequent must be disjoint, and the consequent cannot be empty.",
      c: "X ⇒ Y requires X ∩ Y = ∅ and Y ≠ ∅. Either side can contain any number of items.",
      w: ["Wrong: B appears on both sides.", "Wrong: the consequent is empty.", "Correct.", "Wrong: empty."] },

    { t: "Support and confidence",
      q: "Transactions: ABC, ACD, BCD, ADE, BCE. What are the support and confidence of <b>C ⇒ A</b>?",
      o: ["Support 2/5, confidence 2/4", "Support 2/5, confidence 2/3", "Support 4/5, confidence 2/4", "Support 3/5, confidence 1/2"],
      a: 0,
      s: "A and C together appear in ABC and ACD (2/5). C appears in 4 transactions, so conf = 2/4.",
      c: "From the lecture example table: A⇒D (2/5, 2/3), C⇒A (2/5, 2/4), A⇒C (2/5, 2/3), B&C⇒D (1/5, 1/3).",
      w: ["Correct.", "Wrong: 2/3 is conf(A ⇒ C), because A appears 3 times.", "Wrong: 4/5 is sup(C).", "Wrong."],
      steps: ["Transactions containing both A and C: ABC, ACD, so 2. sup = 2/5.", "Transactions containing C: ABC, ACD, BCD, BCE, so 4.", "conf(C ⇒ A) = 2/4 = 0.5."] },

    { t: "FP-growth",
      q: "Which statement about FP-growth is <b>NOT</b> true?",
      o: ["It builds an FP-tree by scanning the database twice.", "It mines frequent itemsets without candidate generation.", "It must rescan the full database at every level, like Apriori.", "A disadvantage is that the FP-tree may not fit in memory."],
      a: 2,
      s: "After building the tree (2 scans), FP-growth mines the tree without scanning the database again.",
      c: "FP-growth: divide and conquer, compressed FP-tree, only 2 passes, no candidate generation or test. Downsides: memory use, expensive recursive build.",
      w: ["True.", "True.", "NOT true, so this is the answer: that describes Apriori's bottleneck.", "True."] },

    { t: "FP-growth",
      q: "In FP-tree construction with min_support = 3, item frequencies are f:4, c:4, a:3, b:3, m:3, p:3 (others < 3). Transaction {a, b, c, f, l, m, o} is inserted as which ordered path?",
      o: ["a, b, c, f, l, m, o", "f, c, a, b, m", "f, c, a, m, p", "c, f, a, b, m, l"],
      a: 1,
      s: "Drop infrequent items (l, o), then order by the frequency-descending f-list: f, c, a, b, m.",
      c: "Scan 1: count items and build the f-list in descending frequency. Scan 2: for each transaction keep only frequent items, sort them by the f-list, and insert along a shared-prefix path.",
      w: ["Wrong: not filtered or reordered.", "Correct.", "Wrong: that is a different transaction (it contains p, not b).", "Wrong: it includes the infrequent item l and the order is wrong."] },

    { t: "Sequential patterns",
      q: "Which is a valid <b>subsequence</b> of &lt;a (abc) (ac) d (cf)&gt;?",
      o: ["&lt;(ab) c&gt;", "&lt;d a&gt;", "&lt;(af) d&gt;", "&lt;c (abc)&gt;"],
      a: 0,
      s: "(ab) ⊆ (abc) and a later element contains c, so the order is preserved.",
      c: "A subsequence takes subsets of the elements in the same order. Items within an element are unordered.",
      w: ["Correct.", "Wrong: there is no 'a' after 'd' in the sequence.", "Wrong: no single element contains both a and f.", "Wrong: there is no (abc) after an element containing c."] },

    { t: "Sequential vs association",
      q: "\"Within three months of buying a property, new homeowners purchase cookers, freezers and washing machines.\" This pattern is best found by:",
      o: ["Association rule mining within single transactions", "Sequential pattern mining", "K-means clustering", "Min–max normalisation"],
      a: 1,
      s: "Temporal order across events is sequential pattern mining.",
      c: "Association mining finds items in the same event or transaction. Sequential pattern mining finds temporal associations across a series of events (GSP).",
      w: ["Wrong: these happen in different transactions over time.", "Correct.", "Wrong.", "Wrong."] },

    { t: "Rule support",
      q: "All rules generated from the same frequent itemset {A, C, D} (e.g. A ⇒ CD, AC ⇒ D, D ⇒ AC):",
      o: ["have the same support but can have different confidences", "have the same confidence", "have different supports and the same confidence", "always have lift 1"],
      a: 0,
      s: "Support = sup(ACD) for all of them. Confidence depends on each antecedent.",
      c: "Rule generation: for every non-empty proper subset s of f, conf(s ⇒ f∖s) = sup(f)/sup(s).",
      w: ["Correct.", "Wrong: the antecedents differ, so the confidences differ.", "Wrong.", "Wrong."] }
  ]
});
