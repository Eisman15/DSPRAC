/* Week 9 — Data Preparation for Modelling */
QB.addWeek({
  week: 9,
  title: "Data Preparation for Modelling",
  notes: [
    { h: "Why pre-process", html: `
<p>"Good data preparation is key to producing valid and reliable ML models." <b>Garbage in, garbage out.</b> Poor quality costs the typical company 10–20% of revenue. With a poor-quality loan model, creditworthy people are denied and defaulters get loans. Data preparation takes about <b>60% of the time</b>, the most time-consuming step.</p>
<p><b>Real-world data is dirty:</b></p>
<ul><li><b>Incomplete / missing</b>: equipment malfunction, deleted as inconsistent, misunderstanding, not considered important, no history kept.</li>
<li><b>Noisy</b>: random errors or extraneous data from faulty instruments, data entry, transmission, inconsistent naming.</li>
<li><b>Outliers</b>: objects very different from the rest. They can be <b>noise</b> (age = 200) or <b>valid</b> (a CEO's salary). Detecting them is itself a task (fraud, intrusion detection).</li>
<li><b>Inconsistent</b>: age 42 with birthday 1997, duplicates with different DOBs, rankings coded 1/2/3 in one half and A/B/C in the other.</li>
<li>Redundant, fake or error-prone data.</li></ul>` },
    { h: "Major steps", html: `
<ol><li><b>Data gathering, integration and selection</b>. Integration combines sources: schema integration and the <b>entity identification problem</b> (A.cust-id = B.cust-#), value conflicts (metric vs imperial units), <b>redundancy</b> (same attribute under different names, derived attributes), detected by correlation analysis: <b>χ² for nominal</b> attributes (larger = more related), <b>Pearson correlation for numeric</b> (&gt;0 positive, 0 independent, &lt;0 negative). Correlation ≠ causality.<br>Selection: <b>active variables</b> are the inputs (avoid irrelevant, redundant and <b>leaky/false predictor</b> variables) and the target. <b>Supplementary variables</b> (ID, name, address) are used only for visualising and explaining.</li>
<li><b>Data cleaning</b>: fill missing values, smooth noise, identify or remove outliers, resolve inconsistencies.</li>
<li><b>Data transformation</b>: normalise, discretise, smooth.</li>
<li><b>Data reduction</b>: feature selection and dimensionality reduction.</li>
<li><b>Data partitioning</b>.</li></ol>` },
    { h: "Handling noise and outliers", html: `
<ul><li><b>Binning</b>: sort, partition into (equal-frequency) bins, then smooth by <b>bin means</b>, medians or <b>boundaries</b> (replace each value with the nearer of the bin's min and max).</li>
<li><b>Clustering</b>: points that don't belong to any cluster are outliers.</li>
<li><b>Regression</b>: smooth by fitting a function.</li>
<li><b>Combined computer and human inspection.</b></li>
<li><b>Statistical</b>: z-score = (v − mean)/SD. Typically |z| &gt; 3 means an outlier.</li></ul>
<h4>Worked example (lecture)</h4>
<p>Data {4, 8, 15, 21, 21, 24, 25, 28, 34} → bins {4,8,15}, {21,21,24}, {25,28,34}.</p>
<p><b>By means:</b> (4+8+15)/3 = 9, (21+21+24)/3 = 22, (25+28+34)/3 = 29, giving {9,9,9}, {22,22,22}, {29,29,29}.</p>
<p><b>By boundaries:</b> 8 is closer to 4 (diff 4) than to 15 (diff 7), so it becomes 4: {4,4,15}. 21 is closer to 21 than to 24, so {21,21,24} is unchanged. 28 is closer to 25 (3) than to 34 (6): {25,25,34}.</p>` },
    { h: "Missing value imputation", html: `
<ol><li><b>Ignore (drop) the record</b>: easy, but loses data and can bias results if many values are missing.</li>
<li>Fill in <b>manually</b>: tedious and often infeasible.</li>
<li><b>Global constant</b> ("unknown", a new class).</li>
<li><b>Attribute mean</b> (numeric) or <b>majority value/mode</b> (categorical).</li>
<li><b>Class-conditional mean</b>: the mean of samples in the same class.</li>
<li><b>Most probable value</b> by inference (Bayesian formula, decision tree, regression).</li></ol>
<p>No method is universally best. For a column <b>without outliers</b>, the <b>mean</b> is least likely to introduce bias (official sample). Zero or minimum values distort the distribution, and dropping rows loses information. With outliers or skew, use the <b>median</b>.</p>` },
    { h: "Transformation: normalisation and discretisation", html: `
<p><b>Why:</b> regression and neural nets need numeric, normalised values. Decision trees and rule methods prefer categorical. Distance-based clustering needs numeric, scaled features. Transformation also improves quality and performance.</p>
<p><b>Normalisation</b> rescales to a fixed range so features are comparable (e.g. 5,000 Covid cases in Australia vs India). It is <b>useful but not mandatory</b>.</p>
<table><tr><th>Method</th><th>Formula</th></tr>
<tr><td><b>Min–max</b></td><td>v' = (v − min)/(max − min) × (new_max − new_min) + new_min. For [0,1]: v' = (v − min)/(max − min)</td></tr>
<tr><td><b>Z-score</b></td><td>v' = (v − mean)/SD (no fixed range, can be negative)</td></tr>
<tr><td><b>Decimal scaling</b></td><td>v' = v / 10<sup>j</sup>, with j the smallest integer such that max |v'| &lt; 1</td></tr></table>
<h4>Worked example (official)</h4>
<p>Min = 12,000, max = 98,000, mean = 54,000, SD = 16,000, v = 73,600.</p>
<ul><li>Min–max: (73,600 − 12,000)/(98,000 − 12,000) = 61,600/86,000 = <b>0.716</b></li>
<li>Z-score: (73,600 − 54,000)/16,000 = 19,600/16,000 = <b>1.225</b></li>
<li>Decimal scaling: max 98,000 needs 10⁵ = 100,000, so 73,600/100,000 = <b>0.736</b></li></ul>
<p><b>Discretisation</b> turns numeric into categorical ranges. <b>Equal-width</b> binning: same range per bin (0–10, 10–20, …). <b>Equal-depth (frequency)</b> binning: same number of values per bin.</p>` },
    { h: "Dimensionality reduction", html: `
<p><b>Distance concentration problem / curse of dimensionality:</b> as the number of dimensions grows, data becomes <b>sparse</b>, and the difference between the max and min pairwise distances shrinks. All points look about equally far apart, so <b>distance becomes meaningless</b>. Example: a document × term matrix with a huge vocabulary is extremely sparse.</p>
<p><b>Purpose of reduction:</b> avoid the curse of dimensionality, reduce time and memory, allow easier visualisation, remove irrelevant features and noise. The reduced representation is much smaller but gives the same or similar results. Techniques: <b>PCA</b>, SVD, supervised and non-linear methods.</p>` },
    { h: "Data partitioning", html: `
<p>Split into <b>non-overlapping</b> subsets to estimate performance on <b>unseen data</b> and <b>detect and prevent overfitting</b> (the model does much better on training data than on validation data).</p>
<ul><li><b>Training set</b>: learn the model (induction).</li>
<li><b>Validation set</b> (optional, recommended): tune hyperparameters and check for overfitting.</li>
<li><b>Test set</b>: final independent evaluation (deduction).</li></ul>
<p><b>Batch testing</b> (hold-out): reserve k% for training and (100−k)% for testing, e.g. 80/20. <b>N-fold cross-validation</b>: split into N disjoint folds, train on N−1 and test on the remaining one, repeat N times, and <b>report the average</b>. Repeated CV estimates variance. <b>Stratified CV</b> keeps class percentages the same.</p>
<p><b>Random sampling</b> works for balanced data but can perform poorly on imbalanced data. <b>Stratified sampling</b> groups by class label and samples each group at the same percentage, so the class distribution is preserved. Use it for <b>imbalanced</b> data and small samples.</p>` },
    { h: "Common exam traps", html: `
<ul><li>"Pre-processing is the most time-consuming step" is <b>true</b>. "Normalisation is useful but not mandatory" is <b>true</b> (official sample: both true).</li>
<li>Min–max uses <b>min and max</b>. Z-score uses <b>mean and SD</b>. Don't mix them.</li>
<li>Smoothing by boundaries: each value goes to the <b>closer</b> of the bin min and max (ties go to the lower one by convention).</li>
<li>An outlier isn't always an error (a CEO's salary is valid).</li>
<li>In 10-fold CV each sample is used for testing <b>exactly once</b> and for training 9 times.</li>
<li>Stratified (not random) sampling for imbalanced classes.</li>
<li>A <b>leaky variable</b> (information not available at prediction time, or derived from the target) must be excluded.</li></ul>` }
  ],
  questions: [
    { t: "Normalisation",
      q: "An attribute has min = 12,000, max = 98,000, mean = 54,000 and SD = 16,000. What are the min–max [0,1] and z-score normalised values of 73,600?",
      o: ["Min–max 0.716, z-score 1.225", "Min–max 0.736, z-score 1.225", "Min–max 0.716, z-score 0.716", "Min–max 1.225, z-score 0.716"],
      a: 0,
      s: "(73600−12000)/86000 = 0.716 and (73600−54000)/16000 = 1.225.",
      c: "Min–max: (v − min)/(max − min). Z-score: (v − μ)/σ. This is the official week 9 Q3.",
      w: ["Correct.", "Wrong: 0.736 is the decimal-scaling value.", "Wrong: the z-score uses the mean and SD.", "Wrong: swapped."],
      steps: ["Min–max: numerator = 73,600 − 12,000 = 61,600.", "Denominator = 98,000 − 12,000 = 86,000.", "61,600/86,000 = 0.716.", "Z-score: (73,600 − 54,000)/16,000 = 19,600/16,000 = 1.225."] },

    { t: "Normalisation",
      q: "Using <b>decimal scaling</b>, a variable's values range from −452 to 986. What is the normalised value of 986?",
      o: ["0.986", "9.86", "0.0986", "1.0"],
      a: 0,
      s: "max |v| = 986 < 1000 = 10³, so divide by 1000: 986 → 0.986.",
      c: "Decimal scaling: v' = v/10^j, where j is the smallest integer such that max |v'| < 1. Here j = 3, and −452 becomes −0.452.",
      w: ["Correct.", "Wrong: divided by only 100, so it is still ≥ 1.", "Wrong: divided by 10⁴, which is larger than needed.", "Wrong: decimal scaling doesn't force the max to exactly 1."],
      steps: ["Largest absolute value = 986.", "Smallest power of 10 making it < 1: 10³ = 1000 (since 986/100 = 9.86 ≥ 1).", "986/1000 = 0.986."] },

    { t: "Normalisation",
      q: "Normalise v = 50 into the range [−1, 1] using min–max with min = 20 and max = 80.",
      o: ["0.5", "0", "−0.5", "1"],
      a: 1,
      s: "(50−20)/(80−20) = 0.5, and 0.5 × (1 − (−1)) + (−1) = 0.",
      c: "General min–max: v' = (v − min)/(max − min) × (new_max − new_min) + new_min.",
      w: ["Wrong: that is the [0,1] value before rescaling.", "Correct: 50 is exactly halfway, which maps to the centre of [−1,1].", "Wrong.", "Wrong."],
      steps: ["(v − min)/(max − min) = (50 − 20)/(80 − 20) = 30/60 = 0.5.", "Scale to the new range: 0.5 × (1 − (−1)) = 0.5 × 2 = 1.", "Shift: 1 + (−1) = 0."] },

    { t: "Binning",
      q: "Sorted data {4, 8, 15, 21, 21, 24, 25, 28, 34} is split into 3 equal-frequency bins. What is the result of <b>smoothing by bin boundaries</b>?",
      o: ["{9,9,9}, {22,22,22}, {29,29,29}", "{4,4,15}, {21,21,24}, {25,25,34}", "{4,15,15}, {21,24,24}, {25,34,34}", "{8,8,8}, {21,21,21}, {28,28,28}"],
      a: 1,
      s: "Each value is replaced by the nearer bin boundary (bin min or max).",
      c: "Binning: sort, partition, then smooth by means, medians or boundaries.",
      w: ["Wrong: that is smoothing by bin means.", "Correct.", "Wrong: 8 is nearer to 4 than to 15, 21 equals the boundary 21, and 28 is nearer to 25.", "Wrong: that is smoothing by bin medians."],
      steps: ["Bins: {4,8,15}, {21,21,24}, {25,28,34}.", "Bin 1: 8 → |8−4| = 4 vs |15−8| = 7, so 4. Result {4,4,15}.", "Bin 2: 21 is already a boundary. Result {21,21,24}.", "Bin 3: 28 → |28−25| = 3 vs |34−28| = 6, so 25. Result {25,25,34}."] },

    { t: "Binning",
      q: "Sorted data {5, 10, 11, 13, 15, 35, 50, 55, 72} is split into 3 equal-frequency bins and smoothed by <b>bin means</b>. What is the second bin?",
      o: ["{13, 13, 13}", "{21, 21, 21}", "{15, 15, 15}", "{13, 13, 35}"],
      a: 1,
      s: "Bin 2 = {13, 15, 35}, mean = 63/3 = 21.",
      c: "Equal-frequency bins of 3: {5,10,11}, {13,15,35}, {50,55,72}. The means are 8.67, 21 and 59.",
      w: ["Wrong: that is the bin minimum.", "Correct.", "Wrong: that is the median.", "Wrong: that is smoothing by boundaries."],
      steps: ["Bins of 3 values: {5,10,11}, {13,15,35}, {50,55,72}.", "Bin 2 mean = (13 + 15 + 35)/3 = 63/3 = 21.", "Replace every value with 21."] },

    { t: "Missing values",
      q: "Which method is <b>least likely</b> to introduce bias when handling missing values in a numeric column <b>without outliers</b>?",
      o: ["Replace missing values with zero", "Drop all rows with missing data", "Replace missing values with the column minimum", "Replace missing values with the column mean"],
      a: 3,
      s: "The mean preserves the centre of the distribution when there are no outliers.",
      c: "Official week 9 Q2. Imputation options: ignore the record, manual, global constant, attribute mean or mode, class-conditional mean, most probable value (inference). Use the median instead when there are outliers or skew.",
      w: ["Wrong: zero pulls the distribution down artificially.", "Wrong: loses data and may bias the sample if missingness isn't random.", "Wrong: biases values toward the low end.", "Correct."] },

    { t: "Missing values",
      q: "Match each imputation approach to its description:<br>1. Global constant  2. Class-conditional mean  3. Most probable value<br>(i) use a Bayesian formula or decision tree to infer the value<br>(ii) fill with 'unknown' or a new category<br>(iii) fill with the mean of samples belonging to the same class",
      o: ["1-(ii), 2-(iii), 3-(i)", "1-(i), 2-(iii), 3-(ii)", "1-(iii), 2-(ii), 3-(i)", "1-(ii), 2-(i), 3-(iii)"],
      a: 0,
      s: "Constant = 'unknown', class mean = same-class average, most probable = inference-based.",
      c: "No single imputation method is universally best. Each fits certain situations.",
      w: ["Correct.", "Wrong.", "Wrong.", "Wrong."] },

    { t: "Pre-processing",
      q: "Consider the statements:<br>A. Data pre-processing is the most time-consuming process in a data mining analysis.<br>B. Data normalisation is useful in a data mining process, but not a mandatory step.",
      o: ["Statement A is true, but statement B is false.", "Statement A is false, but statement B is true.", "Both statements are true.", "Both statements are false."],
      a: 2,
      s: "Pre-processing takes about 60% of the time, and normalisation is helpful but optional.",
      c: "Official week 9 Q1. Normalisation matters for distance- and gradient-based methods, but e.g. decision trees don't need it.",
      w: ["Wrong: B is true.", "Wrong: A is true.", "Correct.", "Wrong."] },

    { t: "Outliers",
      q: "Using z-scores, which value would typically be flagged as an outlier for a variable with mean 100 and SD 15?",
      o: ["130", "140", "150", "100"],
      a: 2,
      s: "z = (150 − 100)/15 = 3.33 > 3, so it is an outlier.",
      c: "A z-score indicates how many SDs a value is from the mean. Typically |z| > 3 is an outlier.",
      w: ["Wrong: z = 2.", "Wrong: z = 2.67.", "Correct.", "Wrong: z = 0."],
      steps: ["z(130) = 30/15 = 2.0", "z(140) = 40/15 = 2.67", "z(150) = 50/15 = 3.33 > 3, so it is an outlier."] },

    { t: "Data quality",
      q: "A dataset records Age = 42 and Birthday = 03/07/1997 for the same person. This is an example of:",
      o: ["Noisy data", "Inconsistent data", "Missing data", "Redundant data"],
      a: 1,
      s: "Two fields contradict each other, so the data is inconsistent.",
      c: "Inconsistent data contains discrepancies: contradicting attributes, duplicate records with different values, mixed codings (1/2/3 vs A/B/C).",
      w: ["Wrong: noise is random error in one value.", "Correct.", "Wrong: nothing is missing.", "Wrong: redundancy is the same information stored twice."] },

    { t: "Correlation analysis",
      q: "During data integration, which test detects redundancy between two <b>nominal</b> attributes?",
      o: ["Pearson correlation coefficient", "Chi-square (χ²) test", "Z-score", "Min–max normalisation"],
      a: 1,
      s: "χ² is for nominal attributes and Pearson correlation is for numeric attributes.",
      c: "The larger the χ², the more likely the variables are related. Pearson r > 0 is positive, = 0 independent, < 0 negative. Correlation does not imply causality.",
      w: ["Wrong: Pearson is for numeric attributes.", "Correct.", "Wrong.", "Wrong."] },

    { t: "Curse of dimensionality",
      q: "What is the <b>distance concentration problem</b>?",
      o: ["Distances become larger and more varied as dimensionality increases.", "As dimensionality increases, data becomes sparse and the difference between the max and min pairwise distances shrinks, so distances become nearly meaningless.", "Distance can only be computed in 2D.", "Outliers concentrate in the centre of the data."],
      a: 1,
      s: "In high dimensions all points look about equally far apart.",
      c: "This is part of the curse of dimensionality (e.g. a sparse document × term matrix with a huge vocabulary). It is a key reason to reduce dimensionality (PCA, SVD).",
      w: ["Wrong: the spread of distances relative to their size shrinks.", "Correct.", "Wrong.", "Wrong."] },

    { t: "Dimensionality reduction",
      q: "Which is <b>NOT</b> a purpose of dimensionality reduction?",
      o: ["Avoid the curse of dimensionality", "Reduce time and memory needed by algorithms", "Make data easier to visualise", "Guarantee that every original feature is kept unchanged"],
      a: 3,
      s: "Reduction removes or combines features, so it does not keep all of them unchanged.",
      c: "The goal is a much smaller representation that produces the same or similar analytical results, and it may also remove irrelevant features and noise.",
      w: ["A purpose.", "A purpose.", "A purpose.", "Correct answer."] },

    { t: "Data partitioning",
      q: "In <b>10-fold cross-validation</b>, which statement is correct?",
      o: ["The model is trained once on 90% and tested once on 10%.", "Data is split into 10 folds. Each run trains on 9 folds and tests on the remaining one, repeated 10 times, and the average result is reported.", "Each sample is used for testing 10 times.", "Folds may overlap."],
      a: 1,
      s: "Ten runs, each fold used once for testing, then average the 10 accuracies.",
      c: "N-fold CV partitions the data into N disjoint subsets. Each sample is tested exactly once and trained on N−1 times.",
      w: ["Wrong: that is a single batch (hold-out) split.", "Correct.", "Wrong: each sample is tested exactly once.", "Wrong: folds are disjoint."] },

    { t: "Sampling",
      q: "A medical dataset has 95% healthy and 5% disease cases. Which partitioning approach best keeps the class ratio the same in the training and test sets?",
      o: ["Random sampling", "Stratified sampling", "Taking the first 80% of rows for training", "Equal-width binning"],
      a: 1,
      s: "Stratified sampling samples each class at the same percentage.",
      c: "Random sampling works for balanced data but can perform poorly on imbalanced data (a test set might get very few disease cases). Stratified sampling groups by class label and samples each group, e.g. 20%.",
      w: ["Wrong: it may distort the minority class share.", "Correct.", "Wrong: row order may be biased.", "Wrong: that is a discretisation method."] },

    { t: "Overfitting",
      q: "A model achieves 99% accuracy on training data but only 70% on validation data. This indicates:",
      o: ["Underfitting", "Overfitting: it memorised the training data instead of learning general patterns", "Perfect generalisation", "Data leakage into the validation set"],
      a: 1,
      s: "Much better on training than validation data is overfitting.",
      c: "Data partitioning lets us assess performance on unseen data and detect overfitting. The validation set tunes hyperparameters and the test set gives the final evaluation.",
      w: ["Wrong: underfitting is poor on both.", "Correct.", "Wrong.", "Wrong: leakage would usually <i>inflate</i> validation accuracy."] },

    { t: "Data selection",
      q: "Which variable type should be <b>excluded from the inputs</b> of a predictive model but may be kept for explaining results?",
      o: ["Active input variables", "Target variable", "Supplementary variables such as customer name or address", "Normalised numeric features"],
      a: 2,
      s: "Supplementary (identification) variables help explain or visualise but are not predictors.",
      c: "Active variables are the inputs (avoid irrelevant, redundant and leaky ones) and the target. Supplementary variables (name, address, ID) are kept for visualisation and explanation only.",
      w: ["Wrong: these are the inputs.", "Wrong: the target is what you predict.", "Correct.", "Wrong: these are valid inputs."] }
  ]
});
