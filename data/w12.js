/* Week 12 — Machine Learning: Clustering (+ one-page formula sheet) */
QB.addWeek({
  week: 12,
  title: "Clustering (K-means, K-medoids, Hierarchical)",
  notes: [
    { h: "Concepts", html: `
<p>A <b>cluster</b> is a group of objects that are <b>similar within</b> the cluster and <b>dissimilar to other clusters</b>. <b>Clustering</b> is <b>unsupervised</b>: it finds a segmentation structure in <b>unlabelled</b> data (no predefined classes). Data is an n × m matrix and the algorithms rely on similarity or distance.</p>
<p><b>Similarity and distance:</b></p>
<ul><li>Euclidean: √Σ(x₁ⱼ − x₂ⱼ)². Cosine: x₁·x₂ / (‖x₁‖‖x₂‖).</li>
<li><b>Binary, Jaccard:</b> <code>q / (q + r + s)</code>. q = attributes that are 1 in both, r = 1 in X₁ only, s = 1 in X₂ only. Matches where both are 0 are ignored.</li>
<li><b>Categorical, mismatch distance:</b> <code>(p − m) / p</code>. m = number of matching attributes, p = total attributes.</li></ul>
<p><b>Good clustering</b> is <b>accurate</b> (high <b>intra</b>-cluster similarity, low <b>inter</b>-cluster similarity), <b>robust</b> (noise and outliers) and <b>scalable</b>. Its quality depends on the similarity measure and the implementation.</p>` },
    { h: "Silhouette coefficient", html: `
<p>For object i: a(i) = average distance to the <b>other points in its own cluster</b>. b(i) = the <b>minimum</b> over the other clusters of the average distance to that cluster's points (the nearest neighbouring cluster).</p>
<p><code>s(i) = (b(i) − a(i)) / max(a(i), b(i))</code>, ranging from −1 to 1.</p>
<ul><li>s ≈ 1: well matched to its own cluster, far from its neighbours.</li>
<li>s ≈ 0: on or near the boundary between two clusters.</li>
<li>s &lt; 0: probably assigned to the wrong cluster.</li></ul>
<p>The overall score is the mean s(i) over all points. Higher means better-separated clusters.</p>
<p><b>Example:</b> a = 2, b = 5 gives s = (5 − 2)/5 = 0.6. a = 4, b = 3 gives s = (3 − 4)/4 = −0.25, so the point is likely misassigned.</p>` },
    { h: "K-means", html: `
<p><b>Centroid</b> = the mean of the cluster's objects (attribute by attribute). It does not have to be an actual data point.</p>
<p><b>Algorithm:</b> (1) choose k objects arbitrarily as the initial centroids. (2) Assign each object to its nearest centroid. (3) Recompute the centroids as the means. (4) Repeat 2–3 until the partition doesn't change.</p>
<p><b>Objective:</b> minimise the squared error <code>Σᵢ Σ_{X∈Cᵢ} dist(X, Aᵢ)²</code> (MSE = that sum divided by n). The intra-cluster distance should be small.</p>
<h4>Worked example (lecture)</h4>
<p>A(1,1), B(2,1), C(4,5), D(5,5), E(5,6), F(8,5). k = 3, initial centroids C, D, E.</p>
<ul><li>Iteration 1: A → C (distance 5 vs 5.7 and 6.4). B → C (4.5). F → D (3 vs 4 and 3.2). This gives c1 = {A,B,C}, c2 = {D,F}, c3 = {E}.<br>New centroids: c1 = ((1+2+4)/3, (1+1+5)/3) = (2.33, 2.33). c2 = (6.5, 5). c3 = (5, 6).</li>
<li>Iteration 2: c1 = {A,B}, c2 = {F}, c3 = {C,D,E}. Centroids (1.5, 1), (8, 5), (4.67, 5.33).</li>
<li>Iteration 3: no change, so stop. MSE fell 9 → 1.8 → 0.3.</li></ul>
<p><b>Properties:</b> k must be <b>pre-specified</b>. It <b>converges to a local optimum</b> (no global guarantee). The result <b>depends on the initial centroids</b>. Time is <b>O(tkn)</b>, so it is efficient. It is <b>sensitive to outliers</b> (they pull the mean) and not ideal for <b>non-spherical</b> clusters.</p>` },
    { h: "K-medoids", html: `
<p>Uses a <b>medoid</b>: an <b>actual object</b>, the most centrally located one in the cluster, instead of the mean.</p>
<p>Start from k medoids, assign objects to the nearest medoid, then for each medoid Aᵢ and non-medoid H compute the <b>swapping cost</b> <code>S(Aᵢ, H) = E' − E</code> (the new total intra-distance minus the current one). Swap if S &lt; 0 (it reduces the total distance), and repeat until nothing changes.</p>
<p><b>Pros:</b> <b>more robust to outliers</b> than k-means, and the centres are <b>interpretable</b> (real objects). <b>Cons:</b> doesn't scale to large data, still needs k, sensitive to initialisation.</p>
<p><b>Primary difference (official sample):</b> k-means updates a centre as the <b>mean</b> of its objects. K-medoids picks an <b>actual object</b> as the centre.</p>` },
    { h: "Hierarchical clustering", html: `
<ul><li><b>Agglomerative (bottom-up, AGNES):</b> start with n singleton clusters and repeatedly <b>merge the closest pair</b>, updating the distance matrix, until one cluster remains (or a termination condition such as the desired k is met).</li>
<li><b>Divisive (top-down, DIANA):</b> start with all objects in one cluster and split repeatedly until every object is alone or a condition is met.</li>
<li>The result is a <b>dendrogram</b> (hierarchy tree). Cutting it at a level gives clusters.</li></ul>
<p><b>Inter-cluster distance:</b></p>
<ul><li><b>Single link</b> = the <b>shortest</b> distance between any two points in the two clusters.</li>
<li><b>Complete link</b> = the <b>greatest</b> distance.</li>
<li><b>Average link</b> = the <b>average</b> of all pairwise distances.</li></ul>
<p><b>Example:</b> {A(1,1), B(2,1)} and {C(4,5), D(5,5)}. The pairwise distances are AC = 5, AD = 5.66, BC = 4.47, BD = 5. Single = 4.47, complete = 5.66, average = 20.13/4 = 5.03.</p>
<p>AGNES with single link on A–F merges A+B (1), C+D (1), then +E (1), then +F (3), then the AB group (4.47).</p>
<p><b>Pros:</b> simple, an informative hierarchy, <b>deterministic</b> (no random initialisation), <b>no need to pre-specify k</b>. <b>Cons:</b> merges and splits <b>cannot be undone</b>, sensitive to outliers, at least <b>O(n²)</b> so it doesn't scale.</p>` },
    { h: "Common exam traps", html: `
<ul><li>K-means <b>is</b> sensitive to the initial centroids, <b>needs k</b>, does <b>not</b> guarantee a global optimum, and does <b>not</b> work for every cluster shape. (Official Q1: "needs to pre-specify the number of clusters" is the true one.)</li>
<li>A k-means centroid can be a point that isn't in the data. A medoid is always a real object.</li>
<li>Hierarchical clustering doesn't need k up front and is deterministic. K-means is neither.</li>
<li>Single link = minimum, complete link = maximum.</li>
<li>Silhouette uses the <b>nearest other</b> cluster for b, and divides by the <b>max</b> of a and b.</li>
<li>Clustering is unsupervised. Classification uses predefined labels.</li></ul>` },
    { h: "📄 One-page formula sheet (all weeks)", id: "formula-sheet", html: `
<div class="formula-sheet">
<h4>Week 3: Fairness</h4>
<p>Demographic parity: P(Ŷ=1|A=a) = P(Ŷ=1|A=b) · Equal opportunity: equal TPR, i.e. P(Ŷ=1|Y=1,A) · Equalised odds: equal TPR and FPR · Predictive parity: equal PPV and NPV<br>
Disparate impact DI = rate_unpriv / rate_priv, and DI &lt; 0.8 is flagged (80% rule) · Imbalance ratio = majority / minority</p>
<h4>Week 4: GDPR</h4>
<p>6 lawful bases: Consent, Contract, Legal obligation, Vital interests, Public task, Legitimate interests · 7 principles: Lawful/fair/transparent, Purpose limitation, Minimisation, Accuracy, Storage limitation, Integrity and confidentiality, Accountability · 8 rights: Informed, Access, Rectification, Erasure, Restrict, Portability, Object, Automated decisions · Maximum fine €20M or 4% of global turnover · AU Privacy Act 1988: 13 APPs, OAIC, $50M</p>
<h4>Week 7: Similarity and distance</h4>
<p>Jaccard J = |A∩B| / |A∪B| = q/(q+r+s) · Euclidean = √Σ(xₖ−yₖ)² · Minkowski = (Σ|xₖ−yₖ|^r)^(1/r): r=1 Manhattan, r=2 Euclidean, r→∞ max|xₖ−yₖ| · Cosine = x·y / (‖x‖‖y‖), where ‖x‖ = √Σxₖ² · Categorical distance = (p − m)/p</p>
<h4>Week 8: Summary statistics</h4>
<p>Mean x̄ = Σx/m · Population σ² = Σ(x−μ)²/N · Sample s² = Σ(x−x̄)²/(m−1) · SD = √var · IQR = Q3 − Q1 · Outlier if &lt; Q1 − 1.5·IQR or &gt; Q3 + 1.5·IQR · Normal: ±1σ 68%, ±2σ 95%, ±3σ 99.7% · Right skew: mean &gt; median &gt; mode. Left skew: mean &lt; median &lt; mode.</p>
<h4>Week 9: Normalisation</h4>
<p>Min–max v' = (v−min)/(max−min)·(new_max−new_min) + new_min · Z-score v' = (v − μ)/σ, with |z| &gt; 3 an outlier · Decimal scaling v' = v/10ʲ, the smallest j with max|v'| &lt; 1 · Binning smoothing by bin means or by the nearest bin boundary</p>
<h4>Week 10: Association</h4>
<p>sup(X⇒Y) = count(X∪Y)/N · conf(X⇒Y) = sup(X∪Y)/sup(X) · Lift = conf(X⇒Y)/sup(Y) = sup(X∪Y)/(sup(X)·sup(Y)): &gt;1 positive, =1 independent, &lt;1 negative · A k-itemset gives 2ᵏ − 2 rules · Join k-itemsets sharing k−1 items and prune candidates with infrequent subsets</p>
<h4>Week 11: Classification</h4>
<p>Entropy H(D) = −Σ pᵢ log₂pᵢ · H_A(D) = Σ(|Dⱼ|/|D|)H(Dⱼ) · Gain(A) = H(D) − H_A(D), pick the max · Gini(D) = 1 − Σpᵢ² · Gini_A(D) = Σ(|Dⱼ|/|D|)Gini(Dⱼ), pick the min (max ΔGini = Gini(D) − Gini_A(D))<br>
Naïve Bayes: choose the max of P(Cᵢ)·Π P(xⱼ|Cᵢ). P(Cᵢ) = |Cᵢ|/|D|. Laplace: (count+1)/(n + #values)<br>
Precision = TP/(TP+FP) · Recall = TP/(TP+FN) · F = 2PR/(P+R) · Accuracy = (TP+TN)/all · MSE = Σ(y−ŷ)²/n · RMSE = √MSE<br>
log₂ values: 0.5 → −1, 0.25 → −2, 0.75 → −0.415, 0.6 → −0.737, 0.4 → −1.322, 1/3 → −1.585, 2/3 → −0.585, 0.8 → −0.322, 0.2 → −2.322, 0.7 → −0.515, 0.3 → −1.737</p>
<h4>Week 12: Clustering</h4>
<p>Centroid = mean of members · SSE = ΣΣ dist(X, Aᵢ)² · Silhouette s = (b − a)/max(a, b), from −1 to 1 · Single link = min distance, complete = max, average = mean · K-means is O(tkn). Hierarchical is O(n²).</p>
</div>` }
  ],
  questions: [
    { t: "K-means properties",
      q: "Which of the following is true for the K-means clustering algorithm?",
      o: ["It is not sensitive to the initial centroid placement.", "It needs to pre-specify the number of clusters.", "It guarantees to find the global optimum solution.", "It works for data with any shapes."],
      a: 1,
      s: "k must be given in advance. The other options are known weaknesses stated as strengths.",
      c: "K-means converges to a local optimum. Results vary with the initial centroids, and it is not ideal for non-spherical clusters. Official week 12 Q1.",
      w: ["Wrong: solutions vary with the initial centroids.", "Correct.", "Wrong: only a local optimum is guaranteed.", "Wrong: it struggles with non-spherical clusters."] },

    { t: "K-means vs K-medoids",
      q: "What is the primary difference between K-means and K-medoids?",
      o: ["K-means needs k but K-medoids does not.", "K-means updates each centre as the mean of its objects, while K-medoids uses an actual data object (medoid) as the centre.", "K-medoids is hierarchical.", "K-means is supervised."],
      a: 1,
      s: "Mean (possibly not a real point) vs medoid (a real, most central object).",
      c: "Because medoids are real points, K-medoids is more robust to outliers and more interpretable, but it scales worse. Official week 12 Q2.",
      w: ["Wrong: both need k.", "Correct.", "Wrong: both are partitioning methods.", "Wrong: both are unsupervised."] },

    { t: "Centroid",
      q: "Cluster c1 contains A(1,1), B(2,1) and C(4,5). What is its centroid?",
      o: ["(2.33, 2.33)", "(2, 1)", "(4, 5)", "(7, 7)"],
      a: 0,
      s: "((1+2+4)/3, (1+1+5)/3) = (7/3, 7/3) ≈ (2.33, 2.33).",
      c: "The k-means centroid is the attribute-wise mean of the cluster's members. It need not be a real data point.",
      w: ["Correct.", "Wrong: that is point B (a medoid-style choice).", "Wrong: that is point C.", "Wrong: that is the sum, not divided by 3."],
      steps: ["x: (1 + 2 + 4)/3 = 7/3 ≈ 2.33.", "y: (1 + 1 + 5)/3 = 7/3 ≈ 2.33."] },

    { t: "K-means assignment",
      q: "Current centroids are Ac1 = C(4,5), Ac2 = D(5,5), Ac3 = E(5,6). Which cluster is point F(8,5) assigned to?",
      o: ["c1 (distance 4)", "c2 (distance 3)", "c3 (distance ≈ 3.16)", "It stays unassigned"],
      a: 1,
      s: "Distances: to C = 4, to D = 3, to E = √10 ≈ 3.16. The nearest is D, so c2.",
      c: "In the k-means assignment step, each object goes to the cluster with the nearest centroid.",
      w: ["Wrong: 4 is not the smallest.", "Correct.", "Wrong: 3.16 > 3.", "Wrong: every object is assigned."],
      steps: ["d(F, C) = √((8−4)² + (5−5)²) = √16 = 4.", "d(F, D) = √((8−5)² + 0) = 3.", "d(F, E) = √((8−5)² + (5−6)²) = √10 ≈ 3.16.", "The minimum is 3, so F joins c2."] },

    { t: "Silhouette",
      q: "For an object, the average distance to the other members of its own cluster is a = 2 and the average distance to the nearest other cluster is b = 5. What is its silhouette coefficient?",
      o: ["0.6", "−0.6", "1.5", "0.4"],
      a: 0,
      s: "s = (b − a)/max(a, b) = (5 − 2)/5 = 0.6, so it is reasonably well clustered.",
      c: "s ranges from −1 to 1. Near 1 means well matched, about 0 means on a boundary, below 0 means probably the wrong cluster.",
      w: ["Correct.", "Wrong: the sign is reversed.", "Wrong: it divides by a instead of max(a, b).", "Wrong: that is a/b."],
      steps: ["b − a = 5 − 2 = 3.", "max(a, b) = 5.", "s = 3/5 = 0.6."] },

    { t: "Silhouette",
      q: "An object has a = 4 (own cluster) and b = 3 (nearest other cluster). What does its silhouette coefficient indicate?",
      o: ["s = 0.25, well clustered", "s = −0.25, it may be assigned to the wrong cluster", "s = 0, perfectly clustered", "s = 1.33, excellent"],
      a: 1,
      s: "s = (3 − 4)/4 = −0.25 < 0. It is closer to another cluster than to its own.",
      c: "A negative silhouette means the point is, on average, nearer to a neighbouring cluster.",
      w: ["Wrong: the sign is reversed.", "Correct.", "Wrong.", "Wrong: s cannot exceed 1."],
      steps: ["b − a = 3 − 4 = −1.", "max(a, b) = 4.", "s = −1/4 = −0.25."] },

    { t: "Linkage",
      q: "Cluster P = {A(1,1), B(2,1)} and Q = {C(4,5), D(5,5)}. Pairwise distances: AC = 5, AD ≈ 5.66, BC ≈ 4.47, BD = 5. What are the single-link and complete-link distances between P and Q?",
      o: ["Single 4.47, complete 5.66", "Single 5.66, complete 4.47", "Single 5.03, complete 5.03", "Single 5, complete 5"],
      a: 0,
      s: "Single = min = 4.47 (B–C). Complete = max = 5.66 (A–D).",
      c: "Single link = shortest pairwise distance. Complete link = greatest. Average link = mean of all pairs (here ≈ 5.03).",
      w: ["Correct.", "Wrong: swapped.", "Wrong: 5.03 is the average link.", "Wrong."],
      steps: ["Single link = min{5, 5.66, 4.47, 5} = 4.47.", "Complete link = max{…} = 5.66.", "(Average = (5 + 5.66 + 4.47 + 5)/4 ≈ 5.03.)"] },

    { t: "Hierarchical clustering",
      q: "Which statement about hierarchical agglomerative clustering (AGNES) is <b>true</b>?",
      o: ["It starts with all objects in one cluster and splits them.", "It starts with each object as its own cluster and repeatedly merges the closest pair, producing a dendrogram.", "It requires random initial centroids.", "Merges can be undone later if they turn out poor."],
      a: 1,
      s: "Agglomerative = bottom-up merging.",
      c: "Divisive (DIANA) is top-down. Hierarchical methods are deterministic, need no pre-specified k, cannot undo merges or splits, and are O(n²).",
      w: ["Wrong: that is divisive.", "Correct.", "Wrong: there is no random initialisation, so it is deterministic.", "Wrong: once merged, it cannot be undone."] },

    { t: "Comparing algorithms",
      q: "Match each algorithm with its property:<br>1. K-means  2. K-medoids  3. Hierarchical agglomerative<br>(i) No need to pre-specify k, and the result is deterministic<br>(ii) Efficient O(tkn), but the mean is pulled by outliers<br>(iii) More robust to outliers, with interpretable centres, but scales poorly",
      o: ["1-(ii), 2-(iii), 3-(i)", "1-(iii), 2-(ii), 3-(i)", "1-(i), 2-(iii), 3-(ii)", "1-(ii), 2-(i), 3-(iii)"],
      a: 0,
      s: "K-means is fast but outlier-sensitive. K-medoids is robust. Hierarchical is deterministic with no k.",
      c: "These pros and cons are listed in the week 12 lecture.",
      w: ["Correct.", "Wrong.", "Wrong: k-means needs k and depends on initialisation.", "Wrong: k-medoids still needs k."] },

    { t: "Good clustering",
      q: "A good clustering has:",
      o: ["Low intra-cluster similarity and high inter-cluster similarity", "High intra-cluster similarity and low inter-cluster similarity", "High similarity everywhere", "As many clusters as objects"],
      a: 1,
      s: "Members of the same cluster are alike, and different clusters are unlike each other.",
      c: "Good clustering is accurate (high intra, low inter similarity), robust (noise and outliers) and scalable.",
      w: ["Wrong: reversed.", "Correct.", "Wrong.", "Wrong: that is trivial and gives no structure."] },

    { t: "Binary similarity",
      q: "Binary objects X1 = (1, 0, 1, 1, 0) and X2 = (1, 1, 0, 1, 0). What is their Jaccard similarity q/(q + r + s)?",
      o: ["2/4 = 0.5", "2/5 = 0.4", "3/5 = 0.6", "2/3"],
      a: 0,
      s: "q = 2 (positions 1, 4), r = 1 (position 3), s = 1 (position 2), so 2/4.",
      c: "Jaccard for binary attributes ignores 0–0 matches (position 5 here).",
      w: ["Correct.", "Wrong: it includes the 0–0 position in the denominator.", "Wrong: 3/5 is simple matching (counting 0–0 as a match).", "Wrong."],
      steps: ["Both 1 (q): positions 1, 4, so q = 2.", "X1 = 1 and X2 = 0 (r): position 3, so r = 1.", "X1 = 0 and X2 = 1 (s): position 2, so s = 1.", "J = 2/(2 + 1 + 1) = 0.5."] },

    { t: "Categorical distance",
      q: "Two customers are described by 5 categorical attributes and match on 3 of them. What is their mismatch distance (p − m)/p?",
      o: ["0.6", "0.4", "3", "2"],
      a: 1,
      s: "(5 − 3)/5 = 0.4.",
      c: "For categorical attributes, distance = the percentage of mismatches. m = matches, p = total attributes.",
      w: ["Wrong: that is the match ratio (similarity).", "Correct.", "Wrong.", "Wrong: that is the count of mismatches, not the proportion."] },

    { t: "K-means algorithm",
      q: "Put the k-means steps in order: (P) recompute centroids as the means; (Q) choose k initial centroids; (R) assign each object to the nearest centroid; (S) stop if the partition doesn't change.",
      o: ["Q → R → P → S (repeat R–P until stable)", "R → Q → P → S", "Q → P → R → S", "P → Q → R → S"],
      a: 0,
      s: "Initialise → assign → update → check convergence.",
      c: "K-means alternates assignment and update steps. The squared error decreases each iteration (9 → 1.8 → 0.3 in the lecture example).",
      w: ["Correct.", "Wrong: you can't assign before having centroids.", "Wrong: you can't recompute means before assigning objects.", "Wrong."] },

    { t: "K-means weaknesses",
      q: "Which statement explains why K-medoids is more robust to outliers than K-means?",
      o: ["Medoids are computed as the mean, which ignores extremes.", "A medoid is an actual, most-central object, so a single extreme value doesn't drag it the way it drags a mean.", "K-medoids removes all outliers automatically.", "K-medoids does not use distances."],
      a: 1,
      s: "A mean is pulled by extreme values. A central real object is not.",
      c: "This is the same idea as median vs mean in week 8: medoids behave like medians.",
      w: ["Wrong: k-means uses the mean.", "Correct.", "Wrong.", "Wrong: it minimises total distance."] },

    { t: "Clustering concepts",
      q: "Consider the statements:<br>A. Clustering is unsupervised: the data has no predefined class labels.<br>B. Clustering quality depends heavily on the similarity measure used.<br>C. K-means time complexity is O(tkn), so it is relatively efficient.<br>D. Hierarchical clustering scales better than K-means for very large datasets.<br>Which are true?",
      o: ["A, B and C", "A and D", "B and D", "All of them"],
      a: 0,
      s: "D is false: hierarchical clustering is at least O(n²) and doesn't scale well.",
      c: "K-means: O(tkn) with k, t ≪ n. Hierarchical: O(n²) or worse.",
      w: ["Correct.", "Wrong: D is false.", "Wrong: D is false.", "Wrong: D is false."] }
  ]
});
