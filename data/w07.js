/* Week 7 — Data Understanding and Representation */
QB.addWeek({
  week: 7,
  title: "Data Understanding and Representation",
  notes: [
    { h: "Datasets, objects, attributes", html: `
<p>A <b>dataset</b> is a collection of <b>objects</b> (samples, observations, instances, records, tuples, vectors, which are the rows) described by <b>attributes</b> (variables, fields, features, dimensions, which are the columns). Each attribute has a set of possible values (e.g. eye colour ∈ {black, brown, …}).</p>
<p><b>Types of datasets:</b> record (tabular, transactional), graph and network (WWW, social, molecules), ordered (video, time series, transaction sequences, genetic), spatial, image and multimedia.</p>
<p><b>Data understanding questions:</b> what data is available, how much history, how much is labelled, is it relevant, what is its quality, can it be improved, is more data available, who is the data expert?</p>
<p><b>Role of a variable</b> (in predictive models): <b>independent</b> = input or predictor. <b>Dependent</b> = target or outcome. In "What is the effect of diet on health?", diet is independent and <b>health is dependent</b>.</p>` },
    { h: "Attribute (variable) types", html: `
<table><tr><th>Type</th><th>Subtype</th><th>Definition</th><th>Examples</th><th>Meaningful operations</th></tr>
<tr><td rowspan="3"><b>Categorical (qualitative)</b></td><td>Nominal</td><td>Names, no order</td><td>Hair colour, marital status, occupation, <b>ID numbers, zip codes</b>, blood type</td><td>= ≠ (mode)</td></tr>
<tr><td>Binary</td><td>Nominal with only 2 states</td><td>Yes/no, 0/1</td><td>= ≠</td></tr>
<tr><td>Ordinal</td><td>Clear order. Category widths can differ.</td><td>Size S/M/L, grades, satisfaction ratings</td><td>= ≠ &lt; &gt; (median, mode)</td></tr>
<tr><td rowspan="2"><b>Numeric (quantitative)</b></td><td>Interval</td><td>Equal, meaningful differences. <b>No true zero</b>, can be negative.</td><td>Temperature in °C or °F, calendar year/time of year, IQ scores</td><td>= ≠ &lt; &gt; + −</td></tr>
<tr><td>Ratio</td><td><b>True zero</b> (absence), equal intervals, no negatives</td><td>Height, weight, income, distance, counts, age</td><td>All: = ≠ &lt; &gt; + − × ÷</td></tr></table>
<p>Numeric attributes are also <b>continuous</b> (real numbers such as height or temperature, usually floats) or <b>discrete</b> (integers, countable, such as number of students).</p>
<p><b>Properties:</b> nominal = distinctness. Ordinal = distinctness + order. Interval = + addition/difference. Ratio = + multiplication/division.</p>
<p><b>Why types matter:</b> operations must be meaningful. Average hair colour makes no sense. Average T-shirt size (ordinal) is nonsensical. Average temperature across sensors is fine. The type also decides how you clean and pre-process.</p>
<p><b>Likert scale</b> (strongly agree … strongly disagree): if the distances between items are not equal, it is <b>ordinal</b>. If they are equal, it is interval (discrete). Averaging is questionable because the data is only defined at the discrete values.</p>
<p><b>Tricky cases:</b> ID numbers and zip codes are nominal even though they are digits. "Month" for monthly revenue is categorical.</p>` },
    { h: "Data representation and good features", html: `
<p><b>Data representation</b> is an abstraction of raw data: meaningful features that represent the underlying information. Models learn from representations, not raw data. It turns a descriptive problem (e.g. "how similar?") into a mathematical one a computer can run.</p>
<ul><li><b>Feature selection</b>: pick the attributes that best describe the data.</li>
<li><b>Feature engineering</b>: transform raw data into a suitable form, e.g. <b>derived features</b>: Delay = claim date − accident date, Season, Dark (0/1) for insurance fraud. Derived features are more useful for ML than raw dates.</li>
<li><b>Encoding</b>: categorical → numeric, e.g. <b>one-hot encoding</b> (Color ∈ {Red, Green, Blue} becomes Color_Red, Color_Green, Color_Blue; Red = [1,0,0]). Works well with few values and <b>no ordinal relationship</b>.</li>
<li><b>Dimensionality reduction</b>: remove redundant or irrelevant features.</li>
<li>Features can be derived internally (average salary over 10 years, transactions per year) or from external sources (SES from postcode, weather from coordinates).</li>
<li><b>Long-narrow → short-wide</b>: one-hot encode Type and roll up to one row per account. <b>Roll-up</b>: aggregate transactions to household level (e.g. total sales per household).</li></ul>` },
    { h: "Set (Boolean) and vector representations", html: `
<p><b>Set representation:</b> an object is a set of terms, with <b>no order or frequency</b>. "To do is to be. To be is to do." → {to, do, is, be}.</p>
<p><b>Vocabulary</b> = union of all terms. A <b>binary vector</b> has 1 if the term is present and 0 if not. With V = (to, do, is, be, not, or, I, am, what): d1 = (1,1,1,1,0,0,0,0,0), d2 = (1,0,0,1,1,1,1,1,1).</p>
<p><b>Vector space representation:</b> each term or feature is a dimension, and an object is a point (vector) in that space. A <b>data matrix</b> is m objects × n attributes. <b>Document data</b>: term vectors (binary or counts).</p>` },
    { h: "Similarity and distance formulas", html: `
<p><b>Jaccard coefficient</b> (sets / binary vectors): <code>J(A,B) = |A ∩ B| / |A ∪ B|</code>, from 0 to 1.</p>
<p><b>Euclidean distance</b>: <code>dist(x,y) = √( Σ (x_k − y_k)² )</code>, unbounded above (minimum 0).</p>
<p><b>Minkowski distance</b>: <code>dist = ( Σ |x_k − y_k|^r )^(1/r)</code>. <b>r = 1</b>: Manhattan / city block / L1 (Hamming for binary vectors = number of differing bits). <b>r = 2</b>: Euclidean. <b>r → ∞</b>: supremum / L∞ = max |x_k − y_k|. Don't confuse r with n (the number of dimensions).</p>
<p><b>Cosine similarity</b>: <code>cos(x,y) = (x · y) / (‖x‖ ‖y‖)</code>, where ‖x‖ = √(Σ x_k²). Range −1 to 1: angle 0° → 1 (identical direction), 90° → 0 (nothing in common), 180° → −1 (opposite). It is the most used similarity in vector space (ElasticSearch default). For normalised vectors: dist² = 2(1 − cos).</p>
<p><b>Dot product as similarity</b> (lecture example): B1 = [Blue, large] = [1,0,1,0] and B2 = [Blue, small] = [1,0,0,1] with one-hot encoding, so Sim = 1·1 + 0 + 0 + 0 = 1. B1 and B3 = [Red, small] = [0,1,0,1] give Sim = 0.</p>
<h4>Worked example</h4>
<p>d1 = (1,1,1), d2 = (1,0,0) on axes (to, is, do).</p>
<ul><li>Euclidean = √((1−1)² + (1−0)² + (1−0)²) = √2 ≈ 1.414</li>
<li>Manhattan = 0 + 1 + 1 = 2. Supremum = 1.</li>
<li>Cosine = (1·1 + 1·0 + 1·0) / (√3 · √1) = 1/√3 ≈ 0.577</li></ul>
<p><b>Jaccard example:</b> d1 = (1,1,1,1,0,1,0,0,0), d2 = (0,0,1,1,1,1,1,1,0). Both are 1 at positions 3, 4, 6, so the intersection is 3. Either is 1 at positions 1–8, so the union is 8. J = 3/8 = 0.375.</p>` },
    { h: "Common exam traps", html: `
<ul><li>Celsius temperature and IQ are <b>interval</b> (no true zero). Kelvin, height and income are ratio.</li>
<li>Number of students and age in whole years are <b>discrete</b> numeric.</li>
<li>Blood type is <b>nominal</b>. Satisfaction rating is <b>ordinal</b>.</li>
<li>A nominal variable with only two values is binary.</li>
<li>For Jaccard, positions where <b>both</b> are 0 are ignored (they're in neither set).</li>
<li>Cosine ignores vector length (magnitude) and only uses the angle.</li>
<li>Don't one-hot encode an ordinal variable if you want to keep its order. Ordinal encoding (1, 2, 3) keeps the order.</li></ul>` }
  ],
  questions: [
    { t: "Attribute types",
      q: "Match each list of features to its data type:<br>A. Customer satisfaction ratings<br>B. Blood type (A, B, AB, O)<br>C. Number of students in a class, age in years<br>D. IQ test scores, temperature in Celsius<br>(i) Nominal  (ii) Ordinal  (iii) Interval  (iv) Discrete",
      o: ["A-(ii), B-(i), C-(iv), D-(iii)", "A-(i), B-(ii), C-(iii), D-(iv)", "A-(ii), B-(i), C-(iii), D-(iv)", "A-(iii), B-(i), C-(iv), D-(ii)"],
      a: 0,
      s: "Ratings are ordered (ordinal), blood type is unordered (nominal), counts are discrete, and IQ and °C have no true zero (interval).",
      c: "This is the official week 7 Q3 converted to matching. Nominal = names, ordinal = ordered categories, interval = equal differences with no true zero, discrete = countable integers.",
      w: ["Correct.", "Wrong: ratings are ordered, so not nominal, and blood type has no order.", "Wrong: counts are discrete integers, and IQ and Celsius are interval.", "Wrong: satisfaction ratings are ordinal categories, not interval."] },

    { t: "Attribute types",
      q: "Which variable is measured on a <b>ratio</b> scale?",
      o: ["Temperature in Celsius", "Calendar year", "Annual income in dollars", "Hair colour"],
      a: 2,
      s: "Income has a true zero (no income), so ratios like 'twice as much' make sense.",
      c: "Ratio: true or meaningful zero, equal intervals, all arithmetic meaningful. Interval: equal differences but no true zero (°C, year), so 20°C is not 'twice as hot' as 10°C.",
      w: ["Wrong: 0°C is not the absence of temperature, so it is interval.", "Wrong: year 0 is arbitrary, so it is interval.", "Correct.", "Wrong: nominal."] },

    { t: "Attribute types",
      q: "Which statement is <b>incorrect</b>?",
      o: ["For monthly revenue across months, the variable 'month' is categorical.", "A nominal variable with only two categories is a binary variable.", "In 'What is the effect of a diet on health?', the effect on health is the independent variable.", "Height in cm is continuous."],
      a: 2,
      s: "Health is the outcome, i.e. the dependent variable. Diet is independent.",
      c: "Official week 7 Q1. Independent = input or predictor. Dependent = target or outcome being explained.",
      w: ["Correct statement: months are categories here.", "Correct statement.", "Incorrect statement, so this is the answer: health status is dependent.", "Correct statement: height can take any real value."] },

    { t: "Attribute properties",
      q: "Which operations are meaningful for an <b>ordinal</b> attribute?",
      o: ["Distinctness only (=, ≠)", "Distinctness and order (=, ≠, <, >)", "Distinctness, order, and addition/difference", "All four: =, ≠, <, >, +, −, ×, ÷"],
      a: 1,
      s: "Ordinal = distinctness + order.",
      c: "Nominal: distinctness. Ordinal: + order. Interval: + meaningful differences. Ratio: + multiplication and division.",
      w: ["Wrong: that is nominal.", "Correct.", "Wrong: that is interval.", "Wrong: that is ratio."] },

    { t: "Why types matter",
      q: "A shop sold 100 T-shirts in sizes S, M, L, XL. Which summary is most meaningful for size?",
      o: ["The mean size", "The mode (most frequent size) or median size", "The standard deviation of sizes", "The sum of sizes"],
      a: 1,
      s: "Size is ordinal, so averaging is nonsensical. Use the mode or median.",
      c: "Operations must be meaningful for the data type. Ordinal data supports order (so the median is OK) but not arithmetic.",
      w: ["Wrong: the lecture asks 'does it make sense to average T-shirt size?' and the answer is no.", "Correct.", "Wrong: needs arithmetic.", "Wrong: meaningless."] },

    { t: "Likert scale",
      q: "A survey uses a five-point Likert scale (strongly agree … strongly disagree). When is it treated as <b>ordinal</b> rather than interval?",
      o: ["Always interval, because it uses numbers", "When the distances between consecutive items are not equal", "When there are more than five options", "When respondents skip questions"],
      a: 1,
      s: "If the intervals aren't equal, it is ordinal. If they are equal, it is interval (discrete).",
      c: "Likert scaling often assumes equal distances, but not always. Averaging is questionable because the data is only defined at discrete values.",
      w: ["Wrong: using number codes doesn't make it interval.", "Correct.", "Wrong: the number of options doesn't decide the type.", "Wrong: missing data doesn't change the type."] },

    { t: "Feature engineering",
      q: "For predicting insurance fraud, which dataset is more suitable for building ML models?<br>(i) original attributes such as Date of Claim and Date of Accident<br>(ii) derived attributes such as Delay (days), Season and Dark (0/1)",
      o: ["(i)", "(ii)", "Both equally", "Neither"],
      a: 1,
      s: "Derived features capture meaningful patterns (delay, season, darkness) that raw dates hide.",
      c: "Official week 7 Q2. Feature engineering turns raw data into representations that models can learn from.",
      w: ["Wrong: raw date strings are hard for models to use directly.", "Correct.", "Wrong: they are not equally useful.", "Wrong: (ii) is suitable."] },

    { t: "One-hot encoding",
      q: "Variable <b>Color</b> has values {Red, Green, Blue}. After one-hot encoding with columns (Color_Red, Color_Green, Color_Blue), how is 'Green' represented?",
      o: ["[2]", "[0, 1, 0]", "[1, 1, 0]", "[0, 0, 1]"],
      a: 1,
      s: "One binary column per category, with only Green's column set to 1.",
      c: "One-hot encoding replaces a categorical column with one binary column per value. It suits nominal variables with few values and no ordinal relationship.",
      w: ["Wrong: label encoding (2) implies an order.", "Correct.", "Wrong: only one 1 is allowed.", "Wrong: that is Blue."] },

    { t: "Jaccard",
      q: "Using binary vectors over the same vocabulary, d1 = (1,1,1,1,0,1,0,0,0) and d2 = (0,0,1,1,1,1,1,1,0). What is the Jaccard coefficient J(d1, d2)?",
      o: ["3/9", "3/8", "3/6", "5/8"],
      a: 1,
      s: "Intersection = 3 (positions 3, 4, 6). Union = 8 (positions 1–8). J = 3/8.",
      c: "J(A,B) = |A∩B| / |A∪B|. Positions where both vectors are 0 are not in either set and are ignored.",
      w: ["Wrong: it uses all 9 dimensions as the union, including the shared 0 at position 9.", "Correct.", "Wrong: the union is 8, not 6.", "Wrong: the intersection is 3, not 5."],
      steps: ["d1 has 1s at positions {1,2,3,4,6}.", "d2 has 1s at positions {3,4,5,6,7,8}.", "Intersection = {3,4,6}, so |A∩B| = 3.", "Union = {1,2,3,4,5,6,7,8}, so |A∪B| = 8. (Position 9 is 0 in both and is excluded.)", "J = 3/8 = 0.375."] },

    { t: "Euclidean distance",
      q: "What is the Euclidean distance between x = (2, 5, 1) and y = (6, 2, 1)?",
      o: ["5", "7", "25", "4"],
      a: 0,
      s: "√((2−6)² + (5−2)² + (1−1)²) = √(16 + 9 + 0) = √25 = 5.",
      c: "Euclidean distance = √Σ(x_k − y_k)². It is Minkowski with r = 2.",
      w: ["Correct.", "Wrong: 7 is the Manhattan distance (4 + 3 + 0).", "Wrong: 25 is the squared distance (no square root taken).", "Wrong: 4 is the supremum (max) distance."],
      steps: ["Differences: 2−6 = −4, 5−2 = 3, 1−1 = 0.", "Squares: 16, 9, 0. Sum = 25.", "√25 = 5."] },

    { t: "Minkowski distance",
      q: "For x = (2, 5, 1) and y = (6, 2, 1), match each Minkowski parameter with its distance:<br>1. r = 1  2. r = 2  3. r → ∞<br>(i) 4  (ii) 5  (iii) 7",
      o: ["1-(iii), 2-(ii), 3-(i)", "1-(i), 2-(ii), 3-(iii)", "1-(ii), 2-(iii), 3-(i)", "1-(iii), 2-(i), 3-(ii)"],
      a: 0,
      s: "Manhattan = 7, Euclidean = 5, Supremum = max difference = 4.",
      c: "Minkowski: (Σ|x_k − y_k|^r)^(1/r). r = 1 is city block (L1), r = 2 is Euclidean, r → ∞ is supremum (L∞) = the maximum component difference.",
      w: ["Correct.", "Wrong: r = 1 sums the absolute differences = 7.", "Wrong: r = 2 is Euclidean = 5.", "Wrong: supremum is the max difference = 4."],
      steps: ["Absolute differences: |2−6| = 4, |5−2| = 3, |1−1| = 0.", "r = 1: 4 + 3 + 0 = 7.", "r = 2: √(16 + 9 + 0) = 5.", "r → ∞: max(4, 3, 0) = 4."] },

    { t: "Cosine similarity",
      q: "What is the cosine similarity between d1 = (1, 1, 1) and d2 = (1, 0, 0)?",
      o: ["1", "0", "1/√3 ≈ 0.577", "√2 ≈ 1.414"],
      a: 2,
      s: "dot = 1, ‖d1‖ = √3, ‖d2‖ = 1, so cos = 1/√3 ≈ 0.577.",
      c: "cos(x,y) = x·y / (‖x‖‖y‖). It ranges from −1 to 1: 1 = same direction, 0 = orthogonal (nothing in common), −1 = opposite.",
      w: ["Wrong: they aren't in the same direction.", "Wrong: they share the 'to' dimension, so they aren't orthogonal.", "Correct.", "Wrong: √2 is the Euclidean distance, and cosine can't exceed 1."],
      steps: ["Dot product = 1·1 + 1·0 + 1·0 = 1.", "‖d1‖ = √(1+1+1) = √3 ≈ 1.732. ‖d2‖ = √1 = 1.", "cos = 1 / (1.732 × 1) ≈ 0.577."] },

    { t: "Cosine similarity",
      q: "Which statement about cosine similarity is <b>NOT</b> true?",
      o: ["An angle of 90° gives similarity 0.", "An angle of 0° gives similarity 1.", "Cosine similarity is unbounded, just like Euclidean distance.", "It is the most used similarity measure in vector space representation."],
      a: 2,
      s: "Cosine is bounded between −1 and 1. Euclidean distance is unbounded above.",
      c: "We often prefer bounded similarity measures (Jaccard 0–1, cosine −1 to 1). Euclidean distance has minimum 0 and no maximum.",
      w: ["True.", "True.", "NOT true, so this is the answer.", "True (e.g. ElasticSearch default)."] },

    { t: "Set representation",
      q: "In the <b>set (Boolean)</b> representation, the document \"To do is to be. To be is to do.\" becomes:",
      o: ["{to:4, do:2, is:2, be:2}", "{to, do, is, be}", "(to, do, is, to, be, to, be, is, to, do)", "{to, be}"],
      a: 1,
      s: "A set keeps only distinct terms, with no order and no frequency.",
      c: "Set representation: elements are the terms, with no notion of order or frequency. Against a vocabulary it becomes a binary vector.",
      w: ["Wrong: counts are a frequency (term-count) vector, not a set.", "Correct.", "Wrong: that keeps order and duplicates.", "Wrong: missing terms."] },

    { t: "Data representation",
      q: "Consider the statements:<br>A. Machine learning models learn from representations rather than directly from raw data.<br>B. Representations turn a descriptive problem (e.g. similarity) into a mathematical problem.<br>C. One-hot encoding is ideal for ordinal variables with many levels because it keeps their order.<br>D. Derived features can come from external sources, e.g. socio-economic status from postcode.<br>Which are true?",
      o: ["A, B and D", "A and C", "B and C", "All of them"],
      a: 0,
      s: "A, B and D are true. One-hot encoding loses order and works best with few, unordered categories.",
      c: "Key aspects of representation: feature selection, feature engineering, encoding, dimensionality reduction.",
      w: ["Correct.", "Wrong: C is false.", "Wrong: C is false.", "Wrong: C is false."] },

    { t: "Discrete vs continuous",
      q: "Which variable is <b>discrete</b> numeric?",
      o: ["Body weight in kg", "Number of cylinders in a car engine", "Room temperature", "Height in cm"],
      a: 1,
      s: "Cylinder count takes a finite set of integer values.",
      c: "Discrete numeric = integers, finite or countably infinite. Continuous = real numbers (weight, temperature, height), usually floats.",
      w: ["Wrong: continuous.", "Correct (the lecture's 'complicated example': discrete ratio).", "Wrong: continuous.", "Wrong: continuous."] }
  ]
});
