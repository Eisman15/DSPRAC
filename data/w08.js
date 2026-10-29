/* Week 8 — Exploratory Data Analysis */
QB.addWeek({
  week: 8,
  title: "Exploratory Data Analysis",
  notes: [
    { h: "What data exploration is", html: `
<p>A <b>preliminary exploration</b> of the data to understand its characteristics: find patterns and trends, and identify and fix anomalies. Motivations: understand the data, <b>select the right tool</b> for pre-processing or analysis, ensure quality, help feature selection. The focus is on <b>summary statistics</b> and <b>visualisation</b>.</p>
<p><b>Exploratory vs explanatory:</b> the data scientist explores the data (confirm and analyse). Explanatory work communicates to a reader (inform and persuade). Think about your audience.</p>
<p><b>Feel for the data:</b> mean or mode, variance and SD per variable, the range of values, correlations, frequency distributions, then box plots, histograms and scatter plots as appropriate.</p>` },
    { h: "Central tendency", html: `
<p><b>Mean</b> x̄ = (1/m) Σ xᵢ is the most common measure but is <b>sensitive to outliers</b>. <b>Median</b> = the middle value of the sorted data (average of the two middle values if m is even). It is <b>robust</b>.</p>
<p><b>Lecture example:</b> (1, 4, 6, 10, 12) has mean = 33/5 = <b>6.6</b> and median = <b>6</b>. Change 12 to 14000: the median is still 6, but the mean = (1+4+6+10+14000)/5 = <b>2804.2</b>.</p>
<p><b>Frequency</b> = percentage of time a value occurs. <b>Mode</b> = the most frequent value. Both are typically used for <b>categorical</b> data.</p>` },
    { h: "Dispersion", html: `
<ul><li><b>Range</b> = max − min.</li>
<li><b>Population variance</b> σ² = (1/N) Σ (xᵢ − μ)². <b>Sample variance</b> s² = (1/(m−1)) Σ (xᵢ − x̄)².</li>
<li><b>Standard deviation</b> = √variance. It is <b>sensitive to outliers</b>.</li>
<li><b>Quartiles</b> (on sorted data): Q1 = 25% (median of the lower half), Q2 = median, Q3 = 75% (median of the upper half). <b>IQR = Q3 − Q1</b> is <b>not sensitive to outliers</b>.</li>
<li><b>Outlier rule:</b> outside [Q1 − 1.5·IQR, Q3 + 1.5·IQR].</li></ul>
<h4>Worked example: variance</h4>
<p>Data 2, 4, 4, 4, 5, 5, 7, 9 (m = 8). Mean = 40/8 = 5. Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16, with sum = 32.</p>
<p>Population σ² = 32/8 = <b>4</b>, σ = 2. Sample s² = 32/7 ≈ <b>4.571</b>, s ≈ 2.138.</p>
<h4>Worked example: quartiles and outliers</h4>
<p>Data 2,2,4,4,4,4,5,5,5,6,6,7,7,7,8,8 (16 values). Lower half (first 8): Q1 = (4+4)/2 = <b>4</b>. Q2 = (5+5)/2 = <b>5</b>. Upper half (last 8): Q3 = (7+7)/2 = <b>7</b>. IQR = 3. Fences: 4 − 4.5 = −0.5 and 7 + 4.5 = 11.5, so there are no outliers.</p>
<p>Data 12, 14, 23, 36, 40, 42, 44, 61, 78 (9 values, median = 40 is excluded from the halves). Q1 = (14+23)/2 = 18.5, Q3 = (44+61)/2 = 52.5, IQR = 34. Upper fence = 52.5 + 51 = 103.5. Changing 78 to 100000 leaves the IQR unchanged.</p>` },
    { h: "Distributions and skewness", html: `
<ul><li><b>Uniform</b>: every value in the range is equally likely. <b>Normal</b>: strong central tendency, symmetric.</li>
<li><b>Normal 68–95–99.7 rule:</b> μ±σ ≈ 68%, μ±2σ ≈ 95%, μ±3σ ≈ 99.7%.</li>
<li>Probability distribution: each value's probability is in [0,1] and they sum to 1.</li>
<li><b>Symmetric</b>: tails of equal length.</li>
<li><b>Left (negatively) skewed</b>: longer tail toward <b>low</b> values. Typically <b>mean &lt; median &lt; mode</b>.</li>
<li><b>Right (positively) skewed</b>: longer tail toward <b>high</b> values. Typically <b>mean &gt; median &gt; mode</b>.</li>
<li>Outliers often appear in the direction of the long tail.</li></ul>
<p><b>Reading skew from a box plot:</b> median closer to Q1 with a longer upper whisker or box part → right (positive) skew. Median closer to Q3 with a longer lower whisker → left (negative) skew.</p>` },
    { h: "Summary statistics are not enough", html: `
<p><b>Anscombe's quartet</b>: four datasets with the same mean of x (9), variance of x (11), mean of y (7.50), variance of y (4.125), correlation (0.816), regression line y = 3 + 0.5x and R² (0.67), but completely different scatter plots. The <b>Datasaurus Dozen</b> makes the same point. <b>Always visualise.</b></p>` },
    { h: "Visualisation", html: `
<ul><li><b>Box plot</b>: five-number summary (min, Q1, median, Q3, max). The box spans Q1–Q3 (height = IQR), the median is a line inside, the whiskers extend to min and max (within 1.5·IQR), and outliers are shown as points. Good for <b>comparing groups</b> and spotting skew and outliers.</li>
<li><b>Histogram</b>: frequency distribution of <b>one numeric variable</b>. Values go in adjacent, non-overlapping bins and bar height = count. <b>Shape depends on the number of bins.</b> Histograms can show more than box plots: two different distributions can have the same box plot.</li>
<li><b>Scatter plot</b>: relationship between <b>two numeric variables</b>. Shows clusters, outliers and correlation: positive, negative, none (independent), perfect or imperfect linear, or non-linear.</li>
<li>Bar chart or frequency table: categorical variables.</li>
<li>Tools: Matplotlib (used in the unit), R, Plotly, D3.js. "Excel is not going to be your friend."</li></ul>
<p><b>Correlation ≠ causation</b> (official sample: chicken consumption vs US crude oil imports are positively correlated over 2007–2009 but not causal).</p>` },
    { h: "Common exam traps", html: `
<ul><li>With outliers, report the <b>median and IQR</b>, not the mean and SD.</li>
<li>Sample variance divides by <b>m − 1</b>. Population variance divides by N.</li>
<li>"Skewed left" = tail on the <b>left</b> = negatively skewed.</li>
<li>The box plot whisker end is not always the absolute min or max: points beyond 1.5·IQR are drawn separately as outliers.</li>
<li>The least variation in a box plot is the shortest box and whiskers. "Roughly half of India's values exceed S America's max" means checking whether S America's max sits at or near India's median.</li>
<li>Two variables moving together over time are correlated, but that doesn't mean causation.</li>
<li>The mean is not shown on a standard box plot, so you can't compare means directly from one.</li></ul>` }
  ],
  questions: [
    { t: "Central tendency",
      q: "For the data (1, 4, 6, 10, 12), the value 12 is changed to 14000. What happens to the mean and median?",
      o: ["Mean stays 6.6, median becomes 2804.2", "Median stays 6, mean becomes 2804.2", "Both stay the same", "Both become 14000"],
      a: 1,
      s: "The median is robust and the mean is sensitive to outliers.",
      c: "Mean = Σx/m. Median = middle sorted value. A single extreme value pulls the mean but not the median.",
      w: ["Wrong: reversed.", "Correct.", "Wrong: the mean changes.", "Wrong."],
      steps: ["Original mean = (1+4+6+10+12)/5 = 33/5 = 6.6. Median = 6 (3rd of 5 sorted values).", "New mean = (1+4+6+10+14000)/5 = 14021/5 = 2804.2.", "New median: sorted (1, 4, 6, 10, 14000), middle value = 6 (unchanged)."] },

    { t: "Dispersion",
      q: "For the <b>sample</b> 2, 4, 4, 4, 5, 5, 7, 9, what is the sample variance s²?",
      o: ["4", "2", "32/7 ≈ 4.571", "32"],
      a: 2,
      s: "Mean = 5, sum of squared deviations = 32, sample variance = 32/(8−1) ≈ 4.571.",
      c: "Sample variance s² = Σ(xᵢ − x̄)² / (m − 1). Population variance σ² = Σ(xᵢ − μ)² / N.",
      w: ["Wrong: that is the population variance (divide by 8).", "Wrong: that is the population standard deviation.", "Correct.", "Wrong: that is the sum of squares (no division)."],
      steps: ["Mean = (2+4+4+4+5+5+7+9)/8 = 40/8 = 5.", "Deviations: −3, −1, −1, −1, 0, 0, 2, 4.", "Squares: 9, 1, 1, 1, 0, 0, 4, 16. Sum = 32.", "Sample variance = 32 / (8 − 1) = 32/7 ≈ 4.571.", "(Population variance would be 32/8 = 4, SD = 2.)"] },

    { t: "Quartiles and IQR",
      q: "Sorted data: 2, 2, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8. What are Q1, the median and Q3?",
      o: ["Q1 = 4, median = 5, Q3 = 7", "Q1 = 2, median = 5, Q3 = 8", "Q1 = 4, median = 5.5, Q3 = 7.5", "Q1 = 4, median = 4, Q3 = 7"],
      a: 0,
      s: "Q1 = median of the lower 8 = 4, Q2 = 5, Q3 = median of the upper 8 = 7.",
      c: "Q2 = median. Q1 = median of the lower half. Q3 = median of the upper half. IQR = Q3 − Q1 (here 3).",
      w: ["Correct.", "Wrong: 2 and 8 are the min and max.", "Wrong: the 8th and 9th values are both 5, so the median is 5.", "Wrong: the median is 5."],
      steps: ["n = 16. Median = average of the 8th and 9th values = (5+5)/2 = 5.", "Lower half = 2,2,4,4,4,4,5,5, so Q1 = (4+4)/2 = 4.", "Upper half = 5,6,6,7,7,7,8,8, so Q3 = (7+7)/2 = 7.", "IQR = 7 − 4 = 3."] },

    { t: "Outliers",
      q: "A variable has Q1 = 20 and Q3 = 40. Using the 1.5 × IQR rule, which value is an outlier?",
      o: ["−5", "0", "65", "75"],
      a: 3,
      s: "IQR = 20, fences = [20 − 30, 40 + 30] = [−10, 70]. 75 > 70, so it is an outlier.",
      c: "Outlier: below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.",
      w: ["Wrong: −5 ≥ −10, so it's inside the fence.", "Wrong: inside.", "Wrong: 65 ≤ 70, so it's inside.", "Correct."],
      steps: ["IQR = 40 − 20 = 20.", "1.5 × IQR = 30.", "Lower fence = 20 − 30 = −10. Upper fence = 40 + 30 = 70.", "Only 75 lies outside [−10, 70]."] },

    { t: "Robust statistics",
      q: "Which summary statistics are <b>robust</b> (not much affected by outliers)?",
      o: ["Mean and standard deviation", "Median and IQR", "Mean and range", "Variance and range"],
      a: 1,
      s: "The median and IQR depend on positions, not extreme values.",
      c: "The mean, SD, variance and range are all sensitive to outliers. Changing 78 to 100000 in 12, 14, 23, 36, 40, 42, 44, 61, 78 leaves the IQR unchanged.",
      w: ["Wrong: both are sensitive.", "Correct.", "Wrong: both are sensitive.", "Wrong: both are sensitive."] },

    { t: "Normal distribution",
      q: "Exam scores are normally distributed with mean 70 and standard deviation 10. Approximately what percentage of scores lie between 50 and 90?",
      o: ["68%", "95%", "99.7%", "50%"],
      a: 1,
      s: "50–90 is μ ± 2σ, which is about 95%.",
      c: "68–95–99.7 rule: μ±σ ≈ 68%, μ±2σ ≈ 95%, μ±3σ ≈ 99.7%.",
      w: ["Wrong: 68% would be 60–80 (±1σ).", "Correct.", "Wrong: 99.7% would be 40–100 (±3σ).", "Wrong."],
      steps: ["50 = 70 − 2(10) and 90 = 70 + 2(10).", "So the interval is μ ± 2σ, which covers about 95%."] },

    { t: "Skewness",
      q: "A distribution has a long tail toward high values. Which relationship is <b>typically</b> true?",
      o: ["Left skewed, mean < median < mode", "Right (positively) skewed, mean > median > mode", "Symmetric, mean = median = mode always", "Right skewed, mean < median"],
      a: 1,
      s: "A long tail to the right is positive skew, and the mean is pulled toward the tail.",
      c: "Right/positive skew: tail toward higher values, typically mean > median > mode. Left/negative skew: tail toward lower values, typically mean < median < mode. ('Typically' because these orderings are not always true.)",
      w: ["Wrong: a tail toward high values is right skew.", "Correct.", "Wrong: it is skewed, not symmetric.", "Wrong: the mean is pulled above the median."] },

    { t: "Skewness",
      q: "In a box plot, the median line sits close to the <b>top</b> of the box (near Q3) and the lower whisker is much longer than the upper whisker. The variable is:",
      o: ["Right (positively) skewed", "Left (negatively) skewed", "Symmetric", "Uniform"],
      a: 1,
      s: "Values are spread out toward the low end, so the tail is on the left, i.e. negative skew.",
      c: "In the official week 8 boxplot question, Method 3 (median near the top, long lower whisker) is left-skewed and Method 4 is right-skewed.",
      w: ["Wrong: right skew has the long upper tail and the median near Q1.", "Correct.", "Wrong: symmetric would have the median centred and equal whiskers.", "Wrong: a box plot alone doesn't show uniformity, and the asymmetry says it isn't."] },

    { t: "Anscombe's quartet",
      q: "What is the key lesson of <b>Anscombe's quartet</b>?",
      o: ["Datasets with identical means are identical.", "Datasets can have nearly identical summary statistics (mean, variance, correlation, regression line) yet very different distributions, so you must visualise data.", "Correlation always implies causation.", "Variance is the best statistic."],
      a: 1,
      s: "Summary statistics are not enough. Always plot the data.",
      c: "All four datasets have mean x = 9, var x = 11, mean y = 7.50, var y = 4.125, r = 0.816, y = 3 + 0.5x and R² = 0.67, but their scatter plots look completely different (linear, curved, outlier-driven, vertical). The Datasaurus Dozen shows the same thing.",
      w: ["Wrong.", "Correct.", "Wrong.", "Wrong."] },

    { t: "Visualisation choice",
      q: "Match each goal to the most suitable chart:<br>1. Compare the distributions of income across 5 regions, showing medians and outliers<br>2. See the shape of the distribution of one numeric variable<br>3. Examine the relationship between two numeric variables<br>(i) Histogram  (ii) Scatter plot  (iii) Box plot",
      o: ["1-(iii), 2-(i), 3-(ii)", "1-(i), 2-(iii), 3-(ii)", "1-(ii), 2-(i), 3-(iii)", "1-(iii), 2-(ii), 3-(i)"],
      a: 0,
      s: "Box plots compare groups, histograms show shape, scatter plots show relationships.",
      c: "Visualisation should match the variable types: box plot (numeric by group), histogram (one numeric variable), scatter plot (two numeric variables), bar chart (categorical).",
      w: ["Correct.", "Wrong: a histogram for 5 groups is clumsy, and box plots compare them better.", "Wrong: a scatter plot needs two numeric variables.", "Wrong."] },

    { t: "Histograms",
      q: "Which statement about histograms is <b>NOT</b> true?",
      o: ["The bars represent adjacent, non-overlapping intervals (bins).", "Bar height indicates the number of values in the bin.", "The shape of a histogram does not depend on the number of bins.", "Two datasets with the same box plot may have very different histograms."],
      a: 2,
      s: "The histogram's shape does depend on the bin count (Petal Width with 10 vs 20 bins).",
      c: "Histograms show frequency distributions of a single variable. They can reveal more than box plots, for example bimodality hidden in the same five-number summary.",
      w: ["True.", "True.", "NOT true, so this is the answer.", "True."] },

    { t: "Correlation",
      q: "Per-capita chicken consumption and US crude oil imports both rise from 2003 to 2006 and both fall from 2007 to 2009. Which conclusion is correct?",
      o: ["Chicken consumption causes oil imports.", "The variables are positively correlated over these periods, but correlation does not imply causation.", "The variables are negatively correlated.", "The variables are uncorrelated."],
      a: 1,
      s: "They move together (positive correlation), but there is no causal link.",
      c: "This is the 'spurious correlation' chart from the official week 8 Q2. Scatter or line plots show association only.",
      w: ["Wrong: causation is not supported.", "Correct.", "Wrong: they move in the same direction.", "Wrong: they clearly co-move."] },

    { t: "Scatter plots",
      q: "Points on a scatter plot lie relatively close to, but not exactly on, an upward-sloping straight line. This shows:",
      o: ["A perfect positive linear relationship", "An imperfect but strong positive linear relationship", "No relationship (independence)", "A non-linear relationship"],
      a: 1,
      s: "Close to a line but not on it means an imperfect linear relationship, here positive.",
      c: "Perfect linear: all points on the line (rare with real data). Imperfect: some random variation. No relationship: independent. Non-linear: many possible shapes.",
      w: ["Wrong: perfect requires every point exactly on the line.", "Correct.", "Wrong.", "Wrong: it follows a straight line."] },

    { t: "Frequency and mode",
      q: "Which statistic is most appropriate to summarise a <b>categorical</b> variable such as 'favourite payment method'?",
      o: ["Mean", "Standard deviation", "Mode (and frequencies)", "IQR"],
      a: 2,
      s: "Frequency and mode are used for categorical data.",
      c: "Frequency of a value = the percentage of times it occurs. Mode = the most frequent value. Mean, SD and IQR need numeric or ordered data.",
      w: ["Wrong.", "Wrong.", "Correct.", "Wrong."] },

    { t: "Data exploration",
      q: "Consider the statements about data exploration:<br>A. It helps select the right tools for pre-processing or analysis.<br>B. It helps ensure data quality and supports feature selection.<br>C. Its focus is summary statistics and visualisation.<br>D. Its main audience is external readers who must be persuaded.<br>Which are true?",
      o: ["A, B and C", "A and D", "C and D", "All of them"],
      a: 0,
      s: "A, B and C are true. Exploration is for the data scientist. Explanation persuades readers.",
      c: "Exploratory (scientist: confirm and analyse) vs explanatory (reader: inform and persuade).",
      w: ["Correct.", "Wrong: D is false.", "Wrong: D is false.", "Wrong: D is false."] },

    { t: "Boxplot reading",
      q: "Which statement about box plots is <b>true</b>?",
      o: ["The height of the box equals the range (max − min).", "The line inside the box is the mean.", "The box spans Q1 to Q3, so its height is the IQR, and the inner line is the median.", "Whiskers always reach the absolute min and max, including outliers."],
      a: 2,
      s: "Box = Q1–Q3 (IQR), line = median.",
      c: "Five-number summary: min, Q1, median, Q3, max. Whiskers extend to the most extreme non-outlier values. Outliers (beyond 1.5·IQR) are plotted separately.",
      w: ["Wrong: the box height is the IQR.", "Wrong: it is the median.", "Correct.", "Wrong: outliers are drawn separately beyond the whiskers."] }
  ]
});
