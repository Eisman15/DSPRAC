/* Week 3 — Data Diversity and Fairness */
QB.addWeek({
  week: 3,
  title: "Data Diversity and Fairness",
  notes: [
    { h: "Definitions", html: `
<p><b>Data diversity</b> is the representativeness and variety of data: a wide range of <b>characteristics</b> (who we are: race, age, gender, religion, disability, education, occupation, socioeconomic status), <b>perspectives</b> (how we think: views, values, experiences) and <b>contexts</b> (where and how we live or act: rural vs urban, online vs offline, lighting and weather) in the data used to train models or make decisions.</p>
<p><b>Types of data diversity:</b> <b>demographic</b> (gender, race, age, religion, disability, SES), <b>behavioural</b> (shopping habits, personality, cognitive styles, cultural practices), <b>contextual</b> (environment, how and why data was collected), <b>geographic</b> (regions, urban/rural, climate), <b>temporal</b> (different time periods), <b>data source</b> (social media, sensors, structured vs unstructured).</p>
<p><b>Algorithm fairness</b>: AI systems should not discriminate against or unfairly disadvantage any individual or group based on protected characteristics. <i>Algorithms</i> are mathematical functions (linear regression, random forest, neural nets) and <i>models</i> are algorithms trained on data. If a model's errors <b>systematically</b> disadvantage a group, the model is biased or unfair. Fairness research is at the intersection of ML and ethics, and approaches to it are <b>not only quantitative</b>.</p>` },
    { h: "Why it matters", html: `
<ul>
<li>Biased dataset → unfair algorithm (e.g. facial recognition trained mostly on light-skinned faces).</li>
<li>Diverse data gives <b>better representation and less bias</b> (fair and equitable), <b>improved generalisation</b> (robust), <b>more comprehensive insights</b> (accurate and reliable), and <b>more trust and acceptance</b>.</li>
<li>Examples: Apple Card (gender, 10× limit), Amazon hiring (penalised "women's"), <b>COMPAS</b> recidivism (black defendants who did not re-offend were <b>twice as likely to be false positives</b>), predictive policing (feedback loop), healthcare (Optum used spending as a proxy for health, pulse oximeters), social-media echo chambers.</li>
<li>Impacts: economic (credit limits, filtered resumes), social (harm to marginalised groups, amplified inequality, eroded trust), environmental (energy for storage, data lifecycle, low-power sensors).</li>
</ul>` },
    { h: "Types and sources of bias", html: `
<ul>
<li><b>Data bias</b>: the training or historical data is biased. <b>Algorithmic bias</b>: comes from the model or rules. <b>Interaction bias</b>: introduced by users (echo chambers).</li>
<li>Named biases: <b>language</b> (LLMs trained mostly on English present Anglo-American views as truth), <b>gender</b>, <b>political</b>, <b>selection</b> (non-representative samples), <b>measurement</b> (inaccurate or inconsistent measures).</li>
<li><b>Sources:</b> data collection, historical and societal bias, sampling errors and <b>unbalanced datasets</b> (parameters skew to the majority), <b>labelling inaccuracies</b>, design choices (maximising accuracy at fairness's expense, <b>proxy variables</b> such as postcode standing in for race), <b>feedback loops</b> (biased model → biased data).</li>
<li><b>Contextual fairness</b>: no one-size-fits-all. Adapt to the social, historical and cultural context and to time.</li>
</ul>` },
    { h: "Fairness metrics (with formulas)", html: `
<p>Split the population into privileged and unprivileged groups, compare a metric across them, and call the model unfair if the rates differ significantly. Ŷ = prediction, Y = true label, A = group.</p>
<table><tr><th>Metric</th><th>Condition (equal across groups)</th><th>Plain meaning</th></tr>
<tr><td><b>Demographic (statistical) parity</b></td><td>P(Ŷ=1 | A=a) = P(Ŷ=1 | A=b)</td><td>Equal <b>positive / selection rates</b>, independent of the sensitive attribute. Ignores qualification.</td></tr>
<tr><td><b>Equal opportunity</b> (TP-parity)</td><td>P(Ŷ=1 | Y=1, A=a) = P(Ŷ=1 | Y=1, A=b)</td><td>Equal <b>true positive rate</b>: qualified people have an equal chance.</td></tr>
<tr><td><b>Equalised odds</b></td><td>Equal TPR <b>and</b> equal FPR</td><td>Fair on both correct and incorrect predictions.</td></tr>
<tr><td><b>Predictive (value) parity</b></td><td>Equal PPV (precision) and NPV</td><td>A positive prediction means the same in every group.</td></tr>
<tr><td><b>Accuracy parity</b></td><td>Equal accuracy</td><td></td></tr>
<tr><td><b>Disparate impact</b></td><td>DI = selection rate(unprivileged) / selection rate(privileged)</td><td>Measures demographic parity. <b>80% rule</b>: DI &lt; 0.8 suggests disparate impact.</td></tr>
<tr><td><b>Counterfactual fairness</b></td><td>Same outcome if the person's demographic identity were changed</td><td></td></tr>
<tr><td><b>Fairness through awareness</b></td><td>Similar individuals (on task-relevant features) get similar outcomes</td><td><b>Individual</b> fairness. Needs a good similarity metric, which is hard and expensive. Can conflict with group parity.</td></tr></table>
<p><b>Worked example (disparate impact):</b> a test passes 90% of group W and 60% of group H. DI = 0.60 / 0.90 = 0.667 &lt; 0.8, so there is potential disparate impact.</p>
<p><b>Worked example (which metric fails):</b> selection rates are 60% for men and 30% for women, so demographic parity is violated. Among <i>qualified</i> candidates the rates are 90% vs 88% (TPR almost equal), so equal opportunity is roughly satisfied.</p>
<p>Also: the <b>fairness–accuracy trade-off</b>, <b>intersectional analysis</b> (bias compounds, e.g. woman + Black + elderly), <b>causal fairness</b>, and <b>exploratory fairness analysis</b> (assess fairness before the final model).</p>
<p><b>Tools:</b> Google Fairness Indicators, IBM AI Fairness 360, Themis-ML, Google What-If Tool.</p>` },
    { h: "Approaches and mitigation", html: `
<ul>
<li>Across the lifecycle: data collection, pre-processing, model development, ongoing monitoring.</li>
<li><b>Pre-processing</b> (before training): re-weighting, re-sampling, data augmentation or synthetic data, masking sensitive features, adversarial debiasing.</li>
<li><b>In-processing</b> (during training): fairness-aware algorithms and fairness constraints.</li>
<li><b>Post-processing</b> (after training): adjust the outputs or thresholds without retraining.</li>
<li><b>Promoting diversity:</b> diverse sourcing, inclusive sampling (surveys, crowdsourcing, community datasets), avoid biased historical data, partner with under-represented communities, regular data audits, domain expertise.</li>
<li><b>Imbalanced data:</b> one class greatly outnumbers the others. Rule of thumb: minority &lt; 10–20%. <b>Imbalance ratio = majority / minority</b>. Fixes: <b>oversampling</b> (increase the minority), <b>undersampling/downsampling</b> (reduce the majority, e.g. keep every other row), <b>augmentation</b> (synthetic samples).</li>
<li>Emerging: explainable AI (transparency), synthetic data (bias reduction), <b>federated learning</b> (privacy-preserving collaborative learning), open data (World Bank, UNESCO), ethical-by-design.</li>
</ul>` },
    { h: "Common exam traps", html: `
<ul>
<li>If the question gives overall selection rates by group → <b>demographic parity</b>. If it gives rates among qualified or actual-positive people → <b>equal opportunity</b>. If it gives both TPR and FPR → <b>equalised odds</b>.</li>
<li>Big accuracy gap between demographic groups plus a skewed training set → the root issue is <b>lack of representation (data diversity)</b>, not lighting, resolution or post-processing.</li>
<li>Removing the sensitive attribute is not enough, because <b>proxy variables</b> can still encode it.</li>
<li>Oversampling adds minority samples. Undersampling removes majority samples.</li>
<li>Demographic parity can conflict with individual fairness and with accuracy.</li>
</ul>` }
  ],
  questions: [
    { t: "Fairness metrics",
      q: "A loan model approves 80% of creditworthy applicants from group X but only 50% of creditworthy applicants from group Y. Which fairness metric is violated <b>most directly</b>?",
      o: ["Demographic parity", "Equal opportunity", "Counterfactual fairness", "Accuracy parity"],
      a: 1,
      s: "The rates are measured among qualified (Y=1) applicants, so the true positive rates differ. That violates equal opportunity.",
      c: "Equal opportunity requires P(Ŷ=1 | Y=1, A=a) = P(Ŷ=1 | Y=1, A=b), i.e. equal true positive rates. Demographic parity compares overall approval rates regardless of creditworthiness.",
      w: ["Wrong: demographic parity uses overall approval rates, not rates among creditworthy applicants.", "Correct: TPR is 0.80 vs 0.50 for qualified applicants. This is the lecture's own equal-opportunity example.", "Wrong: counterfactual fairness asks whether an individual's outcome changes when only their group changes. No such test is described.", "Wrong: overall accuracy is not given."] },

    { t: "Fairness metrics",
      q: "A standardised test passes 90% of applicants from group W and 60% from group H. Using the <b>80% rule</b>, what is the disparate impact ratio and the conclusion?",
      o: ["1.50, so no disparate impact", "0.67, so potential disparate impact", "0.30, so no disparate impact", "0.80, so borderline but acceptable"],
      a: 1,
      s: "DI = 0.60 / 0.90 = 0.667, which is below 0.8, so there is potential disparate impact.",
      c: "Disparate impact (selection-rate ratio) = rate of unprivileged / rate of privileged. The 80% (four-fifths) rule flags DI < 0.8. It measures demographic parity and does not consider ground truth.",
      w: ["Wrong: that is privileged / unprivileged, which is upside down.", "Correct: 0.60/0.90 = 0.667 < 0.8.", "Wrong: 0.30 is the difference (90% − 60%), not the ratio.", "Wrong: the ratio is 0.667, not 0.80."],
      steps: ["Identify selection rates: privileged W = 0.90, unprivileged H = 0.60.", "DI = 0.60 / 0.90 = 0.667.", "Compare with the 0.8 threshold: 0.667 < 0.8.", "Conclusion: potential disparate impact against group H."] },

    { t: "Fairness metrics",
      q: "Which fairness metric requires <b>both</b> the true positive rate and the false positive rate to be equal across groups?",
      o: ["Demographic parity", "Equal opportunity", "Equalised odds", "Fairness through awareness"],
      a: 2,
      s: "Equalised odds = TP-parity plus FP-parity.",
      c: "Equal opportunity is a relaxation of equalised odds that only requires TPR to be equal. Equalised odds also requires equal FPR, so it is fair in both correct and incorrect predictions.",
      w: ["Wrong: demographic parity only compares positive rates.", "Wrong: equal opportunity only requires equal TPR.", "Correct.", "Wrong: that is an individual-fairness (similarity-based) concept."] },

    { t: "Fairness metrics",
      q: "Which statement about <b>fairness through awareness</b> (individual fairness) is <b>NOT</b> true?",
      o: ["Similar individuals on task-relevant features should receive similar outcomes.", "Defining an appropriate similarity metric is challenging and needs domain expertise.", "Computing pairwise similarities can be expensive for large datasets.", "It can never conflict with group fairness measures such as demographic parity."],
      a: 3,
      s: "Individual fairness can conflict with group objectives like demographic parity.",
      c: "Individual fairness treats like cases alike. Pros: fair to individuals, complements group metrics. Cons: hard to define similarity, computationally expensive, may conflict with group fairness.",
      w: ["True: this is its definition.", "True: a listed con.", "True: a listed con.", "NOT true, so this is the answer: the lecture lists conflict with demographic parity as a con."] },

    { t: "Types of data diversity",
      q: "Match each type of data diversity with its example:<br>1. Temporal  2. Geographic  3. Behavioural  4. Data source<br>(i) data from rural and urban areas  (ii) data collected across 2010–2025  (iii) data from social media plus sensors  (iv) shopping habits and personality traits",
      o: ["1-(ii), 2-(i), 3-(iv), 4-(iii)", "1-(i), 2-(ii), 3-(iii), 4-(iv)", "1-(ii), 2-(iii), 3-(iv), 4-(i)", "1-(iv), 2-(i), 3-(ii), 4-(iii)"],
      a: 0,
      s: "Temporal = time periods, geographic = locations, behavioural = habits and personality, data source = where data comes from.",
      c: "The six types of data diversity are demographic, behavioural, contextual, geographic, temporal and data source.",
      w: ["Correct: every pairing matches the definitions.", "Wrong: temporal is about time, not location.", "Wrong: geographic is about location, not social media or sensors.", "Wrong: temporal is not personality traits."] },

    { t: "Data diversity definition",
      q: "In the definition of data diversity, <b>perspectives</b> refers to:",
      o: ["Who we are, e.g. age, race, disability", "How we think, e.g. views on medical treatment or ethical issues", "Where or how we live or act, e.g. rural vs urban", "How many rows the dataset has"],
      a: 1,
      s: "Characteristics = who we are, perspectives = how we think, contexts = where or how we live or act.",
      c: "If a dataset reflects only one perspective, set of characteristics or context, systems built on it work well for some people and fail for others.",
      w: ["Wrong: that is characteristics.", "Correct.", "Wrong: that is contexts.", "Wrong: dataset size is not diversity."] },

    { t: "Sources of bias",
      q: "A bank removes the 'race' column from its loan model, but the model still produces racially skewed decisions because it uses the applicant's <b>postcode</b>. This is an example of:",
      o: ["A proxy variable carrying the sensitive attribute", "Temporal diversity", "Oversampling", "Counterfactual fairness being satisfied"],
      a: 0,
      s: "Postcode correlates with race, so it acts as a proxy and bias persists.",
      c: "Algorithmic design choices are a source of bias, including proxy variables (features associated with race or gender). Dropping the sensitive attribute alone does not guarantee fairness.",
      w: ["Correct.", "Wrong: temporal diversity is about time periods.", "Wrong: oversampling increases minority-class samples.", "Wrong: the skew shows counterfactual fairness is likely violated."] },

    { t: "Types of bias",
      q: "Consider the statements:<br>A. Interaction bias is introduced by users interacting with AI systems, e.g. social-media echo chambers.<br>B. Selection bias arises from non-representative data samples.<br>C. Measurement bias comes from inaccurate or inconsistent measurements.<br>D. Feedback loops reduce bias over time because models learn from new data.<br>Which are true?",
      o: ["A, B and C", "A and D", "B and D", "All of them"],
      a: 0,
      s: "A, B and C are true. Feedback loops make it worse: biased models produce more biased data.",
      c: "Bias types: data bias (biased training data), algorithmic bias (model or rules), interaction bias (users). Named biases include language, gender, political, selection and measurement bias. A feedback loop is a bias source.",
      w: ["Correct.", "Wrong: D is false.", "Wrong: D is false.", "Wrong: D is false. Predictive policing shows a self-reinforcing loop."] },

    { t: "Case studies",
      q: "COMPAS was used in US courts to predict re-offending. What fairness problem did the analysis find?",
      o: ["It refused to output a score for black defendants.", "Black defendants who did not re-offend were about twice as likely as white defendants to be falsely labelled high risk.", "It was perfectly accurate but too slow.", "It only used data from one state."],
      a: 1,
      s: "The false positive rate was about twice as high for black defendants, so error rates were unequal.",
      c: "Unequal FPR across groups violates equalised odds. COMPAS also lacked transparency (it is proprietary). Lessons: transparency, bias mitigation, human oversight.",
      w: ["Wrong: it did score black defendants.", "Correct: false positives could mean wrongful imprisonment or longer sentences.", "Wrong: its accuracy was only about 65–70%, and speed was not the issue.", "Wrong: not the issue described."] },

    { t: "Mitigation techniques",
      q: "Match each bias mitigation stage to its technique:<br>1. Pre-processing  2. In-processing  3. Post-processing<br>(i) adjust decision thresholds on model outputs without retraining<br>(ii) re-weight or re-sample training data<br>(iii) add fairness constraints to the training optimisation",
      o: ["1-(ii), 2-(iii), 3-(i)", "1-(i), 2-(ii), 3-(iii)", "1-(iii), 2-(i), 3-(ii)", "1-(ii), 2-(i), 3-(iii)"],
      a: 0,
      s: "Pre = fix the data, in = fix the training, post = fix the outputs.",
      c: "Pre-processing modifies the dataset before training (re-weighting, re-sampling, augmentation, masking sensitive features). In-processing uses fairness-aware algorithms. Post-processing adjusts outputs.",
      w: ["Correct.", "Wrong: thresholds on outputs are post-processing.", "Wrong: constraints are in-processing.", "Wrong: thresholds are post-, constraints are in-processing."] },

    { t: "Imbalanced data",
      q: "A fraud dataset has 9,500 legitimate and 500 fraudulent transactions. What is the imbalance ratio, and what does <b>undersampling</b> do?",
      o: ["Ratio 19:1. Undersampling removes legitimate (majority) samples.", "Ratio 19:1. Undersampling duplicates fraudulent (minority) samples.", "Ratio 0.05. Undersampling removes fraudulent samples.", "Ratio 5%. Undersampling generates synthetic frauds."],
      a: 0,
      s: "9500/500 = 19, so the ratio is 19:1. Undersampling reduces the majority class.",
      c: "Imbalance ratio = majority / minority. A dataset is imbalanced if the minority is below about 10–20% (here 5%). Oversampling increases the minority, undersampling decreases the majority, and augmentation creates synthetic data.",
      w: ["Correct.", "Wrong: duplicating the minority is oversampling.", "Wrong: 0.05 is the minority proportion, not the ratio, and undersampling removes majority samples.", "Wrong: 5% is the minority share, and synthetic generation is augmentation."],
      steps: ["Majority = 9,500, minority = 500.", "Imbalance ratio = 9,500 / 500 = 19, i.e. 19:1.", "Minority proportion = 500 / 10,000 = 5%, below 10–20%, so imbalanced.", "Undersampling reduces the 9,500 majority samples toward 500."] },

    { t: "Why diversity matters",
      q: "Which is <b>NOT</b> a benefit of diverse training data according to the lecture?",
      o: ["Better representation of populations and reduced bias", "Improved generalisation to new situations", "Guaranteed 100% accuracy for every group", "Improved trust and acceptance among users"],
      a: 2,
      s: "Diversity improves accuracy and fairness but guarantees nothing.",
      c: "The listed benefits are better representation (fair and equitable), improved generalisation (robust), more comprehensive insights (accurate and reliable) and improved trust.",
      w: ["A listed benefit.", "A listed benefit.", "Correct answer: no data practice guarantees perfect accuracy.", "A listed benefit, especially in high-stakes domains."] },

    { t: "Contextual fairness",
      q: "\"A hiring algorithm in Australia must account for racial discrimination in employment history, while in another country gender bias may be the main concern.\" This illustrates:",
      o: ["Contextual fairness", "Demographic parity", "Temporal diversity only", "Accuracy parity"],
      a: 0,
      s: "Contextual fairness: no one-size-fits-all, so fairness is adapted to the social, historical and cultural context.",
      c: "Contextual fairness also considers time (norms and inequalities change) and past discrimination that still affects marginalised communities.",
      w: ["Correct.", "Wrong: demographic parity is a specific metric about equal positive rates.", "Wrong: the example is about place and culture, not just time.", "Wrong: a metric, not this concept."] },

    { t: "Challenges",
      q: "Which is a recognised challenge in <b>ensuring fairness</b>?",
      o: ["Fairness definitions can conflict, creating trade-offs, and accuracy must be balanced against fairness.", "There is only one universally agreed fairness metric.", "Sensitive attributes are always available in the data.", "Historical biases cannot propagate through algorithms."],
      a: 0,
      s: "Conflicting definitions and the fairness–accuracy trade-off are core challenges.",
      c: "Challenges in ensuring fairness: sensitive attributes may be unavailable, historical biases propagate, fairness metrics are hard to define, definitions conflict, and accuracy must be balanced against fairness.",
      w: ["Correct.", "Wrong: there are many metrics and they can contradict each other.", "Wrong: they are often unavailable.", "Wrong: they do propagate."] },

    { t: "Fairness tools",
      q: "Which tool is an IBM toolkit for assessing and mitigating bias in ML models?",
      o: ["What-If Tool", "AI Fairness 360", "Fairness Indicators", "Federated Learning"],
      a: 1,
      s: "AI Fairness 360 is IBM's.",
      c: "Tools listed: Fairness Indicators (Google), AI Fairness 360 (IBM), Themis-ML, What-If Tool (Google, interactive exploration of predictions).",
      w: ["Wrong: that is Google's interactive tool.", "Correct.", "Wrong: that is Google's.", "Wrong: federated learning is a privacy-preserving training technique, not a bias toolkit."] },

    { t: "Emerging technologies",
      q: "Which emerging technology is described as <b>privacy-preserving collaborative learning</b> that supports fairness?",
      o: ["Explainable AI", "Synthetic data", "Federated learning", "Open data"],
      a: 2,
      s: "Federated learning trains across parties without centralising raw data.",
      c: "Emerging technologies in fairness: AI explainability (transparency), synthetic data (bias reduction through diverse data), federated learning (privacy and fairness).",
      w: ["Wrong: XAI is for transparency.", "Wrong: synthetic data generates diverse datasets.", "Correct.", "Wrong: open data democratises access but is not a learning technique."] }
  ]
});
