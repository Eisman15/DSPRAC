/* Week 1 — Introduction to Data Science
   Question fields: t = topic, q = stem (HTML ok), o = options, a = index of correct option,
   s = short explanation, c = underlying concept, w = why each option is right/wrong (same order as o),
   steps = optional worked steps for calculations. */
QB.addWeek({
  week: 1,
  title: "Introduction to Data Science",
  notes: [
    { h: "What data science is", html: `
<p><b>Data science</b> uses scientific methods, processes, algorithms and systems to extract knowledge and insights from data in various forms, so people can make decisions. It sits where <b>computer science</b> (pattern recognition, databases, data warehousing, AI, HPC), <b>mathematics</b> (mathematical modelling), <b>statistics</b> (statistical and stochastic modelling) and <b>domain expertise</b> meet.</p>
<p>"Drowning in data but starving for knowledge": raw data does not turn into insight by itself. The knowledge we want is:</p>
<ul>
<li><b>Interesting</b>: unexpected or valuable, and actionable (e.g. customers who buy milk often also buy cereal).</li>
<li><b>Robust</b>: holds in the future and across samples, so it has predictive power (e.g. a credit-risk model that works across segments and time periods).</li>
<li><b>Useful</b>: supports decision-making (e.g. predictive analytics used to set inventory levels).</li>
</ul>
<p>"No applications, no data science": it is about solving a <i>real</i> problem with data.</p>
<p>The unit has two parts. <b>Part 1, Ethics</b> (what we <i>should</i> do with data): ethics, fairness and diversity, privacy, life cycle, GenAI. <b>Part 2, Techniques</b> (what we <i>could</i> do with data): types of analysis, data types, exploration and visualisation, pre-processing, association mining, basic ML.</p>
<p><b>Holistic approach</b>: look at the whole life cycle (problem, data collection and provenance, pre-processing, EDA, modelling, evaluation, deployment, ethics, monitoring, human-centred collaboration) and not only the algorithms.</p>` },
    { h: "Data, objects and attributes", html: `
<p>A dataset is a <b>collection of objects described by attributes</b>. In a table, a <b>row = object</b> (also called a record, data point, case, sample, entity or instance) and a <b>column = attribute</b> (also called a feature, variable, field or predictor). Attribute values can be <b>discrete</b> (zip code, counts, words) or <b>continuous</b> (temperature).</p>
<p><b>Types of data sets:</b> record (table, documents, transactions), graph (WWW, molecules), ordered (spatial, temporal, sequential, genetic).</p>
<p><b>Data quality problems:</b> <b>noise</b> (an invalid signal on top of valid data, e.g. wind, rain, inconsistent labelling), <b>outliers</b> (objects very different from most others), <b>missing values</b> (not collected or not applicable) and <b>duplicate data</b>.</p>` },
    { h: "Data formats", html: `
<table><tr><th>Format</th><th>Structure</th><th>Examples</th></tr>
<tr><td>Structured</td><td>Rigid schema, predefined tables and columns (about 20% of data)</td><td>Relational DB/SQL tables, spreadsheets, transactions</td></tr>
<tr><td>Semi-structured</td><td>Some structure but flexible, fields can vary</td><td>JSON, XML, logs, RDF (web APIs)</td></tr>
<tr><td>Unstructured</td><td>No predefined format or model (about 80% of data)</td><td>Text, emails, images, audio, video</td></tr>
<tr><td>Graph/network</td><td>Nodes and edges, for modelling relationships</td><td>Social, citation and road networks</td></tr>
<tr><td>Streaming</td><td>Continuous, real time, low latency, often scanned only once</td><td>Stock ticks, IoT sensors, clickstreams, social feeds</td></tr>
<tr><td>Geospatial</td><td>Coordinates and maps</td><td>GPS</td></tr></table>
<p>Real-world data is usually <b>unstructured, large-scale and heterogeneous</b>, i.e. big data. Big data is the crude oil and data science refines it.</p>` },
    { h: "Types of data analysis (increasing complexity and power)", html: `
<table><tr><th>Type</th><th>Question</th><th>Notes</th></tr>
<tr><td>Exploratory (EDA)</td><td>What is in the data?</td><td>Summarise one dataset and look for trends and correlations in order to <b>form hypotheses</b>. Does not identify causes, predict or generalise.</td></tr>
<tr><td>Descriptive</td><td>What happened?</td><td>Summaries, KPIs, dashboards. In data mining: <b>clustering and association</b>.</td></tr>
<tr><td>Diagnostic</td><td>Why did it happen?</td><td>Causal inference, explaining anomalies.</td></tr>
<tr><td>Predictive</td><td>What is likely to happen?</td><td><b>Classification and regression</b>. Predicting does not mean the features cause the target.</td></tr>
<tr><td>Prescriptive</td><td>What should we do / how can we make it happen?</td><td>Combines all previous analyses to pick an action, e.g. AI and self-driving cars.</td></tr></table>
<p><b>Supermarket example:</b> sales rose 12% (descriptive), because weekend promotions worked (diagnostic), sales will rise at the holidays (predictive), so increase stock and marketing (prescriptive).</p>` },
    { h: "Data mining tasks", html: `
<ul>
<li><b>Supervised learning (predictive modelling):</b> training data has <b>class labels</b>, and new data is classified using the training set. <b>Classification</b> predicts a category (good/bad loan) and <b>regression</b> predicts a number (loan amount).</li>
<li><b>Unsupervised learning:</b> class labels are <b>unknown</b>, and the goal is to discover structure. <b>Clustering</b> puts similar objects in the same group and dissimilar objects in different groups. <b>Association</b> finds items that imply other items in the same transaction (market basket: {Bread, Milk} → {Eggs}).</li>
</ul>
<p><b>Database query vs data mining query.</b> A database answers "give me the data", e.g. find customers who bought milk, clients named Smith, or customers who spent more than $10,000. Data analytics answers "what does the data mean?", e.g. items frequently bought with milk (association), clients who are poor credit risks (classification), customers with similar buying habits (clustering).</p>
<p><b>OLAP</b> runs on a data warehouse and analyses data cubes across many dimensions: roll-up, drill-down, slice, dice, pivot.</p>` },
    { h: "Tools", html: `<p>Python (pandas, NumPy for data; scikit-learn, TensorFlow, PyTorch, Keras for ML; Matplotlib, Seaborn for visualisation), R, SQL, Tableau, Power BI, and big-data tools Hadoop and Spark.</p>` },
    { h: "Common exam traps", html: `
<ul>
<li>A query that only <b>retrieves or filters</b> rows (top-5 spenders, customers who bought milk) is a <b>database query</b>, not data mining, even when it has a threshold.</li>
<li>Clustering vs classification: if the groups are <b>predefined labels</b>, it is classification. If the groups are <b>discovered</b>, it is clustering.</li>
<li>Correlation ≠ causation (ice cream and bicycle accidents are both driven by hot weather). A predictive model does not show causes.</li>
<li>JSON, XML and RDF are <b>semi-structured</b>, not structured.</li>
<li>Association mining and clustering are <b>descriptive</b>. Classification and regression are <b>predictive</b>.</li>
</ul>` }
  ],
  questions: [
    { t: "Database query vs data mining",
      q: "Which of the following is a <b>data mining</b> query rather than a database query?",
      o: ["Find all clients with the last name Smith.", "Identify customers who purchased more than $10,000 last month.", "Identify customers with similar buying habits.", "List all transactions made on 1 July."],
      a: 2,
      s: "Grouping customers by similar habits is clustering: it discovers structure that isn't stored in the data.",
      c: "A database query retrieves rows that already meet a stated condition (\"give me the data\"). A data-mining query asks for patterns that have to be <i>discovered</i> (\"what does the data mean?\"): associations, classes, clusters.",
      w: ["Wrong: this is a simple filter on a stored attribute (surname), so it is a database query.", "Wrong: a threshold filter on a stored or aggregated value is still retrieval. The lecture uses this exact example as a database query.", "Correct: 'similar buying habits' requires clustering, an unsupervised technique that discovers the groups.", "Wrong: filtering on a date is retrieval."] },

    { t: "Types of data analysis",
      q: "A supermarket states: <i>\"Sales increased by 12% because the weekend promotions were successful.\"</i> Which type of analysis does the <b>because</b> part represent?",
      o: ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
      a: 1,
      s: "Explaining why something happened is diagnostic analysis.",
      c: "The four business analytics types: descriptive (what happened?), diagnostic (why did it happen?), predictive (what is likely to happen?), prescriptive (what should we do?). Each builds on the previous ones.",
      w: ["Wrong: 'sales increased by 12%' on its own is descriptive, but the question asks about the explanation.", "Correct: attributing the rise to promotions explains the cause of an observed outcome, which is diagnostic.", "Wrong: nothing is forecast about the future.", "Wrong: no action or recommendation is given (that would be e.g. 'increase inventory for high-demand products')."] },

    { t: "Types of data analysis",
      q: "Which type of analysis is described as the most complex, combining insight from all previous analyses to determine a course of action (e.g. a self-driving car deciding to brake)?",
      o: ["Exploratory", "Descriptive", "Predictive", "Prescriptive"],
      a: 3,
      s: "Prescriptive analysis decides what to do, and AI systems are the lecture's example.",
      c: "Complexity and power increase in the order exploratory → descriptive → data mining → predictive → prescriptive. Prescriptive analytics recommends or takes actions.",
      w: ["Wrong: exploratory analysis is the simplest. It summarises data to form hypotheses.", "Wrong: descriptive analysis only summarises what happened.", "Wrong: predictive analysis forecasts outcomes but does not choose actions.", "Correct: prescriptive analysis turns predictions into decisions and actions."] },

    { t: "Exploratory data analysis",
      q: "Which statement about <b>exploratory data analysis (EDA)</b> is <b>NOT</b> true?",
      o: ["It summarises measurements in a single dataset.", "It searches for trends, patterns and correlations between variables.", "Its aim is to help formulate hypotheses.", "It establishes the causes of the patterns it finds and predicts future behaviour."],
      a: 3,
      s: "EDA describes the observed data. It does not identify causes, predict, or generalise.",
      c: "EDA is an open-ended first look at the data before modelling. Correlations found during EDA are not evidence of causation.",
      w: ["True: summarising measurements is a core EDA activity.", "True: EDA looks for trends and correlations.", "True: the aim is to generate hypotheses.", "NOT true, so this is the answer: causes need diagnostic or causal analysis and prediction needs predictive modelling. EDA does neither."] },

    { t: "Supervised vs unsupervised",
      q: "Consider the statements:<br>A. In supervised learning the training data is accompanied by class labels.<br>B. Clustering is an example of supervised learning.<br>C. Association mining discovers hidden structure without labels.<br>D. Regression predicts a categorical class label.<br>Which statements are true?",
      o: ["A and B", "A and C", "B and D", "A, C and D"],
      a: 1,
      s: "A and C are true. Clustering is unsupervised and regression predicts a numeric value.",
      c: "Supervised = labelled data used to predict known outcomes (classification gives categories, regression gives numbers). Unsupervised = unlabelled data used to discover structure (clustering, association).",
      w: ["Wrong: B is false because clustering has no labels.", "Correct: A (labels = supervision) and C (association is unsupervised pattern discovery) are both true.", "Wrong: both B and D are false.", "Wrong: D is false. Regression predicts a continuous value such as a loan amount, and classification predicts categories."] },

    { t: "Data mining techniques",
      q: "Match each data mining technique with its task:<br>1. Classification  2. Clustering  3. Association mining<br>(i) Which products are bought together in one transaction?<br>(ii) Will this loan applicant be a good or bad risk?<br>(iii) Group customers with similar age, income and education.",
      o: ["1-(i), 2-(ii), 3-(iii)", "1-(ii), 2-(iii), 3-(i)", "1-(iii), 2-(i), 3-(ii)", "1-(ii), 2-(i), 3-(iii)"],
      a: 1,
      s: "Classification predicts a label (good/bad risk), clustering groups similar objects, and association finds items bought together.",
      c: "Classification is supervised with predefined classes. Clustering is unsupervised and discovers groups by similarity. Association finds co-occurrence rules in transactions.",
      w: ["Wrong: (i) is association, not classification.", "Correct: 1-(ii) labelled prediction, 2-(iii) grouping by similarity, 3-(i) market-basket co-occurrence.", "Wrong: classification does not group objects without labels.", "Wrong: clustering is not market-basket analysis."] },

    { t: "Classification vs regression",
      q: "A bank wants to use historical customer data (age, salary, profession, location) to predict the <b>dollar amount</b> of a loan that will be approved for a new applicant. Which technique is most appropriate?",
      o: ["Classification", "Regression (value prediction)", "Clustering", "Association mining"],
      a: 1,
      s: "Predicting a continuous numeric value is regression.",
      c: "Both classification and regression are predictive and supervised. Classification outputs a category (good/bad, eligible/not). Regression outputs a number.",
      w: ["Wrong: classification would answer 'eligible or not', not 'how much'.", "Correct: loan amount is continuous, so a regression function is learned from previous customers.", "Wrong: clustering is unsupervised and has no target to predict.", "Wrong: association finds co-occurring items, not numeric predictions."] },

    { t: "Data formats",
      q: "Data returned from a web API in <b>JSON</b> format is best described as:",
      o: ["Structured data", "Semi-structured data", "Unstructured data", "Streaming data by definition"],
      a: 1,
      s: "JSON has internal organisation but no rigid schema, so it is semi-structured.",
      c: "Structured = fixed schema (SQL tables). Semi-structured = some structure, flexible fields (JSON, XML, RDF, logs). Unstructured = no predefined model (text, images, video).",
      w: ["Wrong: structured data requires a rigid predefined schema like a relational table.", "Correct: JSON keys give structure, but records can have different fields.", "Wrong: JSON is not free text. It has key-value organisation.", "Wrong: streaming describes how data arrives (continuously), not its format. JSON can be batch or streamed."] },

    { t: "Data formats",
      q: "Which statement about <b>streaming data</b> is <b>NOT</b> true?",
      o: ["It is continuous and arrives in real time.", "It typically requires low-latency processing.", "It is always stored in a relational database and analysed in batches later.", "Fraud detection and stock-market monitoring are typical applications."],
      a: 2,
      s: "Streaming data is processed on the fly, often scanned only once. It is not batch-stored first.",
      c: "Streaming data is continuous, high volume and velocity, time sensitive, and often semi- or unstructured. You can afford to scan it only once.",
      w: ["True: it flows continuously.", "True: low latency is a defining property.", "NOT true, so this is the answer: batch analysis after storage is the opposite of stream processing.", "True: these are the lecture's example applications."] },

    { t: "Data quality",
      q: "Wind and rain recorded on top of bird calls in an eco-acoustic sensor recording are an example of which data quality problem?",
      o: ["Noise", "Outliers", "Missing values", "Duplicate data"],
      a: 0,
      s: "Noise is an invalid signal overlapping valid data.",
      c: "The four data quality problems from week 1 are noise, outliers, missing values and duplicates. Noise is distortion of valid values. An outlier is a whole object that differs a lot from the rest.",
      w: ["Correct: the background signal corrupts the valid signal, which is noise.", "Wrong: outliers are data objects considerably different from most others, not a distortion overlaid on valid data.", "Wrong: no values are absent.", "Wrong: nothing is recorded twice."] },

    { t: "What is data science",
      q: "A credit-risk model that keeps predicting accurately across different customer segments and time periods illustrates knowledge that is:",
      o: ["Interesting", "Robust", "Useful", "Descriptive"],
      a: 1,
      s: "Robust knowledge is reliable across samples and time, so it has predictive power.",
      c: "Data science aims to extract knowledge that is interesting (unexpected or valuable), robust (generalises, not due to chance) and useful (supports decisions).",
      w: ["Wrong: interesting means unexpected or of value, like milk-and-cereal co-purchases.", "Correct: consistent performance across segments and periods is the lecture's example of robustness.", "Wrong: useful is about supporting decisions, e.g. optimising inventory.", "Wrong: 'descriptive' is a type of analysis, not one of the three knowledge qualities."] },

    { t: "Data science is multidisciplinary",
      q: "Which pairing of discipline and contribution to data science is <b>incorrect</b>?",
      o: ["Computer science: databases, data warehousing, pattern recognition", "Statistics: statistical and stochastic modelling", "Mathematics: mathematical modelling of real-world systems", "Domain expertise: high-performance computing infrastructure"],
      a: 3,
      s: "HPC belongs to computer science. Domain expertise is knowledge of the application area (health, business, etc.).",
      c: "Data science combines computer science, mathematics, statistics and domain expertise. Domain experts make sure patterns are meaningful in context.",
      w: ["Correct pairing, as listed in the lecture.", "Correct pairing: linear regression is a statistical model, and stochastic models use probability.", "Correct pairing: equations, logic and structures that represent systems.", "Incorrect pairing, so this is the answer: domain expertise means e.g. health knowledge to predict patient risks. HPC is under computer science."] },

    { t: "Correlation vs causation",
      q: "Ice-cream sales and bicycle accidents are strongly positively correlated in summer. What is the best conclusion?",
      o: ["Eating ice cream causes bicycle accidents.", "Bicycle accidents cause people to buy ice cream.", "A common factor (hot weather) may drive both. Correlation does not imply causation.", "The variables are unrelated because correlation is meaningless."],
      a: 2,
      s: "A confounding variable (hot weather) explains the correlation.",
      c: "Correlation is a statistical relationship. Causation means a change in one variable directly causes a change in the other. EDA and predictive models find correlations, not causes.",
      w: ["Wrong: this infers causation from correlation.", "Wrong: reverse causation is just as unsupported.", "Correct: more people ride bikes and eat ice cream on hot days.", "Wrong: the variables <i>are</i> statistically related. The relationship is just not causal."] },

    { t: "Types of data analysis",
      q: "Clustering and association mining belong to which type of data mining?",
      o: ["Predictive data mining", "Descriptive data mining", "Prescriptive analytics", "Diagnostic analytics"],
      a: 1,
      s: "They describe the data with human-interpretable patterns or clusters, so they are descriptive.",
      c: "Data mining has two types. Description: find interpretable patterns or clusters (clustering, association). Prediction: forecast an attribute from others (classification, regression).",
      w: ["Wrong: predictive data mining means classification and regression.", "Correct: clustering and association answer 'what is in the data?'.", "Wrong: prescriptive analytics recommends actions.", "Wrong: diagnostic analytics explains why something happened."] },

    { t: "OLAP",
      q: "In OLAP, moving from sales by <b>product category</b> down to sales by <b>individual product</b> is called:",
      o: ["Roll-up", "Drill-down", "Slice", "Pivot"],
      a: 1,
      s: "Drill-down moves to a finer level of detail.",
      c: "OLAP works on data cubes in a data warehouse. Roll-up aggregates to a coarser level, drill-down goes finer, slice fixes one dimension, dice selects ranges on several dimensions, pivot rotates the view.",
      w: ["Wrong: roll-up goes the other way (products → categories).", "Correct: category → individual product is a finer level of detail.", "Wrong: slice fixes a single value of one dimension.", "Wrong: pivot rotates rows and columns."] },

    { t: "Types of data",
      q: "Which statement is <b>true</b>?",
      o: ["About 80% of all data is structured.", "Each row of a data table represents an attribute and each column represents an object.", "Graph data represents entities as nodes and relationships as edges.", "Spreadsheets are unstructured data."],
      a: 2,
      s: "Graph data stores entities as nodes and relationships as edges.",
      c: "Rows are objects (records, instances) and columns are attributes (features, variables). Structured data is about 20% of all data and unstructured about 80%.",
      w: ["Wrong: it is the reverse. Roughly 80% is unstructured.", "Wrong: it is the reverse. Rows are objects and columns are attributes.", "Correct: nodes are entities and edges are relationships, e.g. social or road networks.", "Wrong: spreadsheets have rows and columns, so they are structured."] }
  ]
});
