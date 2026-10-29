/* Week 11 — Machine Learning: Classification */
QB.addWeek({
  week: 11,
  title: "Classification (KNN, Decision Trees, Naïve Bayes)",
  notes: [
    { h: "Machine learning overview", html: `
<p><b>ML</b> is a branch of AI that develops algorithms and statistical models so computers can <b>learn from data</b>, make predictions or decisions, and <b>improve with experience</b>.</p>
<ul><li><b>Supervised</b>: labelled data, predict outputs for unseen inputs (classification, regression). Algorithms: regression, decision trees, random forest (an ensemble, which reduces overfitting), SVM (best separating hyperplane), k-NN, Naïve Bayes, neural networks.</li>
<li><b>Unsupervised</b>: unlabelled data, find structure (k-means, hierarchical, DBSCAN for arbitrary shapes, PCA, SVD, autoencoders).</li>
<li><b>Reinforcement</b>: learns by interacting with an environment and getting rewards or penalties.</li></ul>
<p><b>Classification</b>: supervised, predicts <b>discrete predefined classes</b>. <b>Binary</b> (spam / not spam), <b>multiclass</b> (dog/cat/bird, one label each), <b>multilabel</b> (a movie can be Action and Comedy). Data is an n × m matrix (n samples, m attributes) plus labels.</p>
<p><b>Two-phase process:</b> (1) <b>model construction</b> (learning) on the training set, giving rules, a tree, formulae, probabilities or a network. (2) <b>Model usage</b>: test accuracy on a test set (the percentage of test samples classified correctly). If it is acceptable, classify new data. Example rule: IF rank = 'professor' OR years &gt; 6 THEN tenured = 'yes'.</p>` },
    { h: "K-nearest neighbours (KNN)", html: `
<p>The simplest classifier. It uses the <b>training data itself as the classifier</b> and has <b>no training phase</b> (lazy learner). For a new object, find the <b>k most similar</b> training objects (e.g. by Euclidean distance) and assign the <b>majority class</b> among them.</p>
<p><b>Assumption:</b> similar points belong to the same class. The result <b>depends on k</b>: in the lecture example, k = 3 gives class B and k = 6 gives class A.</p>` },
    { h: "Decision trees", html: `
<p>Each <b>internal node</b> is an attribute test, each <b>branch</b> is an attribute value, and each <b>leaf</b> is a <b>class label (the decision or prediction)</b>. Continuous attributes are discretised in advance.</p>
<p><b>Build</b> greedily (no backtracking), <b>top-down, recursive, divide and conquer</b>. All samples start at the root. At each node pick the best attribute by a heuristic (information gain or Gini), partition, and recurse.</p>
<p><b>Stop expanding node N when:</b> (1) all samples in N are in the same class (leaf with that class); (2) no unused attributes remain on the path (leaf with the <b>majority class</b> of N); (3) N has no samples (leaf with the <b>majority class of the parent</b>).</p>
<p><b>Rules:</b> one IF-THEN rule per root-to-leaf path. Attribute tests along the path are ANDed and the leaf gives the class. The number of rules equals the number of leaves.</p>
<p><b>Strengths:</b> understandable rules, handles numeric and categorical data, no parameter setting, simple. <b>Weaknesses:</b> computationally expensive growth (every split evaluated at each node), can <b>overfit</b>.</p>` },
    { h: "Attribute selection: entropy and information gain", html: `
<p><b>Entropy</b> of a dataset D with k classes: <code>H(D) = − Σ pᵢ log₂ pᵢ</code>, where pᵢ = |Cᵢ,D|/|D|. 0 means pure (one class). 1 means maximally impure for 2 equal classes.</p>
<p><b>Entropy after splitting on A</b> (weighted): <code>H_A(D) = Σ (|Dⱼ|/|D|) · H(Dⱼ)</code>.</p>
<p><b>Information gain</b>: <code>Gain(A) = H(D) − H_A(D)</code>. <b>Choose the attribute with the highest gain.</b></p>
<h4>Worked example (official week 11 Q6)</h4>
<p>Parent D: 70+, 30−. Split on A: left 20+/20−, right 50+/10−.</p>
<ul><li>H(D) = −(0.7 log₂0.7 + 0.3 log₂0.3) = 0.7(0.515) + 0.3(1.737) = <b>0.88</b></li>
<li>H(left) = −(0.5 log₂0.5 + 0.5 log₂0.5) = <b>1.0</b></li>
<li>H(right) = −(0.833 log₂0.833 + 0.167 log₂0.167) = 0.833(0.263) + 0.167(2.585) = <b>0.65</b></li>
<li>H_A(D) = (40/100)(1.0) + (60/100)(0.65) = 0.4 + 0.39 = <b>0.79</b></li>
<li>Gain(A) = 0.88 − 0.79 = <b>0.09</b></li></ul>
<p><b>buys_computer example:</b> 9 yes / 5 no gives H(D) = 0.94. Splitting on age gives H_age = 0.694, so Gain(age) = 0.246. Gain(income) = 0.029, Gain(student) = 0.151, Gain(credit) = 0.048, so <b>age</b> is the root.</p>
<p>Useful logs: log₂0.5 = −1, log₂0.25 = −2, log₂0.75 ≈ −0.415, log₂0.6 ≈ −0.737, log₂0.4 ≈ −1.322, log₂(1/3) ≈ −1.585, log₂(2/3) ≈ −0.585. Remember log₂x = ln x / ln 2.</p>` },
    { h: "Attribute selection: Gini index", html: `
<p><code>Gini(D) = 1 − Σ pᵢ²</code>. Lower is purer. The maximum is 1 − 1/C (0.5 for 2 classes).</p>
<p><code>Gini_A(D) = Σ (|Dⱼ|/|D|) · Gini(Dⱼ)</code>. Reduction: <code>ΔGini(A) = Gini(D) − Gini_A(D)</code>. <b>Choose the attribute with the lowest Gini_A, i.e. the largest reduction.</b></p>
<h4>Worked example (official week 11 Q5)</h4>
<p>100 samples: C1 = 50, C2 = 30, C3 = 20. p = 0.5, 0.3, 0.2. Gini = 1 − (0.25 + 0.09 + 0.04) = 1 − 0.38 = <b>0.62</b>.</p>
<h4>Worked example (insurance HighRisk)</h4>
<p>8 samples: 3 Yes, 5 No. Gini(D) = 1 − 0.375² − 0.625² = <b>0.47</b>.</p>
<p>Age split: ≤25 has 3 Yes / 2 No, Gini = 1 − 0.36 − 0.16 = 0.48. &gt;25 has 0 Yes / 3 No, Gini = 0. Gini_Age = (5/8)(0.48) + (3/8)(0) = 0.30. Reduction = 0.17.</p>
<p>CarType split: Sedan 1 Yes / 3 No gives 0.375. Truck 1/1 gives 0.5. Sports 1/1 gives 0.5. Gini_CarType = (4/8)(0.375) + (2/8)(0.5) + (2/8)(0.5) = 0.44. Reduction = 0.03.</p>
<p>So <b>Age</b> is the root. Rules: Age &gt; 25 → low risk. Age ≤ 25 and Sedan → low risk. Age ≤ 25 and Truck → high. Age ≤ 25 and Sports → high.</p>
<p><b>IG vs Gini:</b> they usually give similar trees. IG uses logs (more computation) and favours attributes with many unique values. Gini uses squares (cheaper).</p>` },
    { h: "Naïve Bayes", html: `
<p>A statistical classifier based on <b>Bayes' theorem</b>: <code>P(H|X) = P(X|H) · P(H) / P(X)</code>. P(H) = prior, P(X|H) = likelihood, P(H|X) = posterior. It is incremental (each sample updates the probabilities) and serves as a standard of optimal decisions.</p>
<p>Classify X to the class Cᵢ that <b>maximises P(X|Cᵢ) · P(Cᵢ)</b> (P(X) is the same for all classes and can be ignored).</p>
<p><b>Naïve assumption:</b> attributes are <b>conditionally independent given the class</b>, so <code>P(X|Cᵢ) = Π P(xⱼ|Cᵢ)</code>. Categorical: P(xⱼ|Cᵢ) = (count of class Cᵢ with value xⱼ)/|Cᵢ|. Continuous: Gaussian. P(Cᵢ) = |Cᵢ|/|D|.</p>
<h4>Worked example (lecture)</h4>
<p>X = (age ≤ 30, income = medium, student = yes, credit = fair). P(yes) = 9/14 = 0.643, P(no) = 5/14 = 0.357.</p>
<ul><li>P(X|yes) = (2/9)(4/9)(6/9)(6/9) = 0.222 × 0.444 × 0.667 × 0.667 = <b>0.044</b>. × 0.643 = <b>0.028</b>.</li>
<li>P(X|no) = (3/5)(2/5)(1/5)(2/5) = 0.6 × 0.4 × 0.2 × 0.4 = <b>0.019</b>. × 0.357 = <b>0.007</b>.</li>
<li>0.028 &gt; 0.007, so the prediction is <b>yes</b>.</li></ul>
<p><b>Zero problem:</b> one zero conditional probability makes the whole product 0. Fix it with the <b>Laplacian correction</b>: add 1 to each count. With 1000 samples (990 medium, 10 high, 0 low): P(low) = 1/1003, P(medium) = 991/1003, P(high) = 11/1003.</p>
<p><b>Pros:</b> easy, efficient on large data, works well in high dimensions. <b>Cons:</b> the independence assumption is often unrealistic and it struggles with correlated attributes.</p>` },
    { h: "Evaluation metrics", html: `
<p>Evaluate with N-fold CV (average of N runs). Criteria: effectiveness (accuracy), efficiency (speed and memory), cost.</p>
<p><b>Numeric prediction:</b> <code>MSE = Σ(yᵢ − ŷᵢ)²/|T|</code>, <code>RMSE = √MSE</code>.</p>
<p><b>Confusion matrix</b> (rows = actual, columns = predicted): TP, FN / FP, TN. Correct = the diagonal.</p>
<ul><li><b>Precision</b> = TP/(TP + FP): of the predicted positives, how many are right.</li>
<li><b>Recall</b> = TP/(TP + FN): of the actual positives, how many were found.</li>
<li><b>F-score</b> = 2·P·R/(P + R).</li>
<li><b>Accuracy</b> = (TP + TN)/(TP + TN + FP + FN).</li></ul>
<p><b>Worked example:</b> TP = 40, FN = 10, FP = 20, TN = 130. Precision = 40/60 = 0.667. Recall = 40/50 = 0.80. F = 2(0.667)(0.8)/(1.467) = 0.727. Accuracy = 170/200 = 0.85.</p>` },
    { h: "Common exam traps", html: `
<ul><li>A leaf is a class label, not a condition (that is an internal node). It is never a cluster centre.</li>
<li>Naïve Bayes assumes <b>conditional independence</b>, not normality and not dependence.</li>
<li>KNN has no training phase. Its prediction can change with k.</li>
<li>IG: choose the <b>highest</b>. Gini_A: choose the <b>lowest</b> (largest reduction).</li>
<li>Weight child impurities by the child's share of samples.</li>
<li>Precision divides by <b>predicted</b> positives. Recall divides by <b>actual</b> positives.</li>
<li>When extracting rules, list every leaf. A branch labelled "Low, High" means "Low or High".</li></ul>` }
  ],
  questions: [
    { t: "Entropy",
      q: "A dataset has 25 samples: 15 in class C1 and 10 in class C2. What is its entropy?",
      o: ["0.50", "0.97", "1.00", "0.48"],
      a: 1,
      s: "H = −(0.6 log₂0.6 + 0.4 log₂0.4) ≈ 0.97.",
      c: "Entropy H(D) = −Σ pᵢ log₂ pᵢ: 0 if pure, 1 for a 50/50 two-class split, in between otherwise.",
      w: ["Wrong.", "Correct.", "Wrong: 1.0 needs an equal split.", "Wrong: 0.48 is the Gini index (1 − 0.36 − 0.16)."],
      steps: ["p1 = 15/25 = 0.6, p2 = 10/25 = 0.4.", "log₂0.6 ≈ −0.737 and log₂0.4 ≈ −1.322.", "H = −(0.6 × −0.737 + 0.4 × −1.322) = 0.442 + 0.529 = 0.971."] },

    { t: "Information gain",
      q: "A node has 100 samples (70 positive, 30 negative). Attribute A splits it into Left {20+, 20−} and Right {50+, 10−}. What is the information gain of A?",
      o: ["≈ 0.09", "≈ 0.79", "≈ 0.88", "≈ 0.21"],
      a: 0,
      s: "H(parent) = 0.88, weighted child entropy = 0.4(1.0) + 0.6(0.65) = 0.79, so Gain = 0.09.",
      c: "Gain(A) = H(D) − Σ(|Dⱼ|/|D|)H(Dⱼ). This is the official week 11 Q6 tutorial question.",
      w: ["Correct.", "Wrong: 0.79 is the weighted entropy after the split.", "Wrong: 0.88 is the parent entropy.", "Wrong."],
      steps: ["H(D) = −(0.7 log₂0.7 + 0.3 log₂0.3) = 0.7(0.515) + 0.3(1.737) ≈ 0.881.", "H(Left) with 20/40, 20/40 = 1.0.", "H(Right) with 50/60 = 0.833 and 10/60 = 0.167: 0.833(0.263) + 0.167(2.585) ≈ 0.65.", "Weights: Left 40/100 = 0.4, Right 60/100 = 0.6.", "H_A(D) = 0.4(1.0) + 0.6(0.65) = 0.79.", "Gain = 0.88 − 0.79 = 0.09."] },

    { t: "Gini index",
      q: "A node with 100 samples has 50 in C1, 30 in C2 and 20 in C3. What is Gini(D)?",
      o: ["0.38", "0.62", "1.49", "0.50"],
      a: 1,
      s: "Gini = 1 − (0.5² + 0.3² + 0.2²) = 1 − 0.38 = 0.62.",
      c: "Gini(D) = 1 − Σ pᵢ². Lower is purer. This is the official week 11 Q5.",
      w: ["Wrong: 0.38 is Σp², before subtracting from 1.", "Correct.", "Wrong: that is roughly the entropy, not Gini.", "Wrong."],
      steps: ["p1 = 0.5, p2 = 0.3, p3 = 0.2.", "Squares: 0.25, 0.09, 0.04. Sum = 0.38.", "Gini = 1 − 0.38 = 0.62."] },

    { t: "Gini split",
      q: "Dataset D (8 samples) has Gini(D) = 0.47. Splitting on Age gives ≤25: 3 Yes/2 No (Gini 0.48) and >25: 0 Yes/3 No (Gini 0). Splitting on CarType gives Gini_CarType(D) = 0.44. Which attribute is chosen, and what is Age's reduction in impurity?",
      o: ["CarType, reduction 0.03", "Age, reduction 0.17", "Age, reduction 0.30", "CarType, reduction 0.44"],
      a: 1,
      s: "Gini_Age = (5/8)(0.48) + (3/8)(0) = 0.30, so ΔGini = 0.47 − 0.30 = 0.17 > 0.03.",
      c: "Choose the attribute with the lowest weighted Gini (largest reduction). Gini_A(D) = Σ(|Dⱼ|/|D|)Gini(Dⱼ).",
      w: ["Wrong: CarType's reduction (0.03) is smaller.", "Correct.", "Wrong: 0.30 is Gini_Age, not the reduction.", "Wrong."],
      steps: ["Gini_Age = (5/8)(0.48) + (3/8)(0) = 0.30.", "ΔGini(Age) = 0.47 − 0.30 = 0.17.", "ΔGini(CarType) = 0.47 − 0.44 = 0.03.", "0.17 > 0.03, so split on Age."] },

    { t: "Decision tree structure",
      q: "What do the leaf nodes in a decision tree represent?",
      o: ["A condition to split the data", "A cluster centre", "A decision or prediction of a class/category", "A feature used in training"],
      a: 2,
      s: "Leaves give the class label.",
      c: "Internal nodes are attribute tests, branches are attribute values, leaves are class labels. This is the official week 11 Q1.",
      w: ["Wrong: that is an internal node.", "Wrong: that belongs to clustering.", "Correct.", "Wrong: features are tested at internal nodes."] },

    { t: "Naïve Bayes",
      q: "What is the key assumption of the Naïve Bayes algorithm?",
      o: ["Features are dependent on each other", "All features are conditionally independent given the class", "Data must be normally distributed", "Labels are continuous"],
      a: 1,
      s: "Conditional independence lets P(X|C) = Π P(xⱼ|C).",
      c: "The assumption is often unrealistic, which is NB's main weakness with correlated attributes. Official week 11 Q2.",
      w: ["Wrong: the opposite.", "Correct.", "Wrong: only continuous attributes are usually modelled as Gaussian, and that isn't the key assumption.", "Wrong: NB is a classifier, so labels are discrete."] },

    { t: "Naïve Bayes",
      q: "Using the buys_computer data: P(yes) = 9/14, P(no) = 5/14, P(X|yes) = 0.044, P(X|no) = 0.019. How is X classified?",
      o: ["no, because 0.019 × 0.357 > 0.044 × 0.643", "yes, because P(X|yes)P(yes) ≈ 0.028 > P(X|no)P(no) ≈ 0.007", "yes, because P(yes) > 0.5 regardless of X", "Cannot decide without P(X)"],
      a: 1,
      s: "Compare P(X|C)·P(C): 0.028 vs 0.007, so 'yes'.",
      c: "Choose the class that maximises P(X|Cᵢ)P(Cᵢ). P(X) is constant across classes and can be ignored.",
      w: ["Wrong: arithmetic.", "Correct.", "Wrong: the prior alone ignores the evidence.", "Wrong: P(X) cancels when comparing classes."],
      steps: ["yes: 0.044 × 0.643 ≈ 0.028.", "no: 0.019 × 0.357 ≈ 0.007.", "0.028 > 0.007, so classify as 'yes'."] },

    { t: "Naïve Bayes",
      q: "For class 'no' (5 samples): P(age≤30|no) = 3/5, P(income=medium|no) = 2/5, P(student=yes|no) = 1/5, P(credit=fair|no) = 2/5. What is P(X|no)?",
      o: ["0.019", "0.044", "1.6", "0.4"],
      a: 0,
      s: "0.6 × 0.4 × 0.2 × 0.4 = 0.0192.",
      c: "Under conditional independence, multiply the per-attribute likelihoods.",
      w: ["Correct.", "Wrong: that is P(X|yes).", "Wrong: that is the sum, not the product.", "Wrong."],
      steps: ["0.6 × 0.4 = 0.24.", "0.24 × 0.2 = 0.048.", "0.048 × 0.4 = 0.0192 ≈ 0.019."] },

    { t: "Laplacian correction",
      q: "In 1000 training samples, income is medium in 990, high in 10 and low in 0. With the Laplacian correction, what is P(income = low)?",
      o: ["0", "1/1000", "1/1003", "1/3"],
      a: 2,
      s: "Add 1 to each of the 3 counts: (0+1)/(1000+3) = 1/1003.",
      c: "The zero problem: a single zero conditional probability makes the whole NB product zero. Laplacian correction adds 1 per value, so the denominator grows by the number of values.",
      w: ["Wrong: this is the problem being fixed.", "Wrong: the denominator also increases by 3.", "Correct.", "Wrong."] },

    { t: "KNN",
      q: "Given a training dataset, how does KNN decide the class of a new object?",
      o: ["It builds a decision tree first.", "It finds the k most similar training objects and assigns the majority class among them.", "It computes class priors and likelihoods.", "It assigns the class of the nearest cluster centre found by k-means."],
      a: 1,
      s: "KNN takes the majority vote of the k nearest neighbours.",
      c: "KNN has no training phase (the training set is the classifier). Its assumption is that similar points share a class. The result can change with k. Official week 11 Q3.",
      w: ["Wrong.", "Correct.", "Wrong: that is Naïve Bayes.", "Wrong: that confuses KNN with k-means clustering."] },

    { t: "KNN",
      q: "A new point's 6 nearest neighbours, ordered by distance, have classes B, B, A, A, A, A. What does KNN predict with k = 3 and with k = 6?",
      o: ["k=3: B, k=6: A", "k=3: A, k=6: B", "Both B", "Both A"],
      a: 0,
      s: "k = 3 gives {B,B,A}, so B. k = 6 gives 2 B and 4 A, so A.",
      c: "The choice of k matters. This mirrors the lecture's red-star example.",
      w: ["Correct.", "Wrong.", "Wrong.", "Wrong."] },

    { t: "Stopping conditions",
      q: "Which is <b>NOT</b> a condition for stopping tree expansion at a node N?",
      o: ["All samples in N belong to the same class", "No unused attributes remain on the path (label N by majority class)", "N has no samples (label N by the parent's majority class)", "The information gain of the best attribute is greater than zero"],
      a: 3,
      s: "Positive gain means a useful split exists, so you would keep splitting.",
      c: "The three stopping conditions: pure node, no attributes left (majority vote), empty node (parent's majority).",
      w: ["A stopping condition.", "A stopping condition.", "A stopping condition.", "Correct answer: not a stopping condition."] },

    { t: "Extracting rules",
      q: "Root = Marital Status. Single → Yes. Married → Income: {Low, Medium} → No, High → Refund (Yes → No, No → Yes). Divorced → Income: Medium → Yes, {Low, High} → No. How many classification rules can be extracted, and which is correct?",
      o: ["3 rules. 'If Married then No'", "6 rules. 'If Marital = Married and Income = High and Refund = No, then Yes'", "6 rules. 'If Income = High then Yes'", "4 rules. 'If Divorced then Yes'"],
      a: 1,
      s: "One rule per leaf, so 6 leaves give 6 rules. The Married/High/No path leads to Yes.",
      c: "Each root-to-leaf path is one IF-THEN rule with ANDed conditions. Official week 11 Q4.",
      w: ["Wrong: Married has 3 leaves under it.", "Correct.", "Wrong: that ignores the Marital Status condition.", "Wrong: Divorced depends on Income."] },

    { t: "Confusion matrix",
      q: "A classifier has TP = 40, FN = 10, FP = 20, TN = 130. What are its precision and recall?",
      o: ["Precision 0.80, recall 0.67", "Precision 0.67, recall 0.80", "Precision 0.85, recall 0.80", "Precision 0.67, recall 0.85"],
      a: 1,
      s: "Precision = 40/(40+20) = 0.667. Recall = 40/(40+10) = 0.80.",
      c: "Precision = TP/(TP+FP) (of predicted positives). Recall = TP/(TP+FN) (of actual positives). Accuracy = (TP+TN)/all = 0.85.",
      w: ["Wrong: swapped.", "Correct.", "Wrong: 0.85 is the accuracy.", "Wrong."],
      steps: ["Precision = TP/(TP+FP) = 40/60 ≈ 0.667.", "Recall = TP/(TP+FN) = 40/50 = 0.80.", "(Accuracy = (40+130)/200 = 0.85. F = 2(0.667)(0.8)/(0.667+0.8) ≈ 0.727.)"] },

    { t: "Evaluation",
      q: "True values (3, 5, 2) are predicted as (2, 5, 4). What is the RMSE?",
      o: ["1.0", "≈ 1.29", "≈ 1.67", "5"],
      a: 1,
      s: "Squared errors 1, 0, 4 give MSE = 5/3 ≈ 1.667, so RMSE ≈ 1.29.",
      c: "MSE = Σ(yᵢ − ŷᵢ)²/|T|. RMSE = √MSE. These are for numeric prediction.",
      w: ["Wrong: that is the mean absolute error.", "Correct.", "Wrong: that is the MSE.", "Wrong: that is the sum of squared errors."],
      steps: ["Errors: 3−2 = 1, 5−5 = 0, 2−4 = −2.", "Squares: 1, 0, 4. Sum = 5.", "MSE = 5/3 ≈ 1.667.", "RMSE = √1.667 ≈ 1.291."] },

    { t: "Classification types",
      q: "A system tags each movie with all applicable genres (e.g. Action and Comedy). This is:",
      o: ["Binary classification", "Multiclass classification", "Multilabel classification", "Regression"],
      a: 2,
      s: "Each sample can have several labels, so it is multilabel.",
      c: "Binary = 2 classes. Multiclass = more than 2 classes with one label per sample. Multilabel = several labels per sample.",
      w: ["Wrong.", "Wrong: multiclass assigns exactly one label.", "Correct.", "Wrong: genres are discrete labels."] },

    { t: "Comparing classifiers",
      q: "Consider the statements:<br>A. Decision trees produce human-understandable rules and need no parameter setting.<br>B. Decision trees may overfit the training data.<br>C. Naïve Bayes handles correlated attributes very well.<br>D. Information gain tends to favour attributes with many unique values.<br>Which are true?",
      o: ["A, B and D", "A and C", "B and C", "All of them"],
      a: 0,
      s: "C is false: correlated attributes break NB's independence assumption.",
      c: "DT strengths: rules, mixed attribute types, no parameters. Weaknesses: expensive growth, overfitting. NB: efficient, good in high dimensions, but the independence assumption is unrealistic. IG is biased toward many-valued attributes.",
      w: ["Correct.", "Wrong: C is false.", "Wrong: C is false.", "Wrong: C is false."] }
  ]
});
