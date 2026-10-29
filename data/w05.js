/* Week 5 — Data Science Life Cycle */
QB.addWeek({
  week: 5,
  title: "Data Science Life Cycle (CRISP-DM)",
  notes: [
    { h: "Why a standard process", html: `
<p>The <b>data science life cycle</b> is a framework for extracting insight and value from data in structured steps. Data mining projects are <b>complex, iterative and risky</b>, so a standard process gives:</p>
<ul><li><b>Reproducibility</b>: a consistent framework for recording experience, so success can be replicated.</li>
<li><b>Scalability</b>: a comfort factor for new adopters, shows maturity, reduces dependency on "stars", makes onboarding easier.</li>
<li><b>Productivity</b>: helps planning and management, and keeps stakeholders aligned.</li></ul>
<p>It helps solve the <b>right</b> problem, avoid common mistakes, build reliable models and make informed decisions. The process must be reliable and repeatable by people with little data mining background.</p>` },
    { h: "CRISP-DM basics", html: `
<p><b>CR</b>oss-<b>I</b>ndustry <b>S</b>tandard <b>P</b>rocess for <b>D</b>ata <b>M</b>ining. Launched in 1996 and published as 1.0 in 1999 (EU funded; DaimlerChrysler, SPSS, NCR). It is the <b>de facto standard</b> and was the most popular in a 2020 poll.</p>
<ul><li><b>Non-proprietary</b>, <b>industry/application neutral</b>, <b>tool neutral</b>.</li>
<li>Focuses on <b>business issues as well as technical analysis</b>. It <b>starts with business understanding, not data</b>, which prevents technically correct but useless models.</li>
<li><b>Not linear</b>: you repeatedly backtrack between phases.</li>
<li>Can be run <b>agile</b> (vertical slicing) or <b>waterfall</b> (horizontal slicing). Agile is preferred.</li>
<li><b>Four levels of abstraction:</b> Phase (Data Preparation) → Generic task (Data Cleaning) → Specialised task (Missing Value Handling) → Process instance (a record of what was actually done, e.g. "the mean was used for numeric attributes and the mode for categorical").</li>
<li><b>Data mining context</b> has four dimensions: application domain (medical prognosis), problem type (regression), technical aspect (censored observations), tools and techniques (Cox regression).</li>
<li><b>Benefits:</b> generalisable, common sense, adoptable, right start (business understanding), strong finish (deployment), flexible. <b>Perceived weaknesses:</b> rigid and documentation-heavy, pre-dates big data, ignores project management.</li></ul>` },
    { h: "The 6 phases, tasks and outputs", html: `
<table><tr><th>Phase</th><th>Generic tasks</th><th>Key outputs and clues</th></tr>
<tr><td><b>1. Business Understanding</b></td><td>Determine business objectives, assess the situation, determine data mining goals, produce the project plan</td><td>Background, success criteria, inventory of resources, requirements, assumptions and constraints, risks, glossary, cost/benefit, DM goals, project plan. Stakeholders, defining the problem, "the right answers to the wrong questions".</td></tr>
<tr><td><b>2. Data Understanding</b></td><td>Collect initial data, describe data, explore data, verify data quality</td><td>Initial data collection report, data description (basic statistics), exploration report (distributions, visualisations, relations), data quality report (missing values, completeness, outliers). <b>First insights and hypotheses.</b></td></tr>
<tr><td><b>3. Data Preparation</b> (<b>takes most of the time</b>)</td><td>Select, clean, construct (feature engineering), integrate, format</td><td>Rationale for inclusion/exclusion, cleaning report, derived attributes, merged data, reformatted data (encoding, log, PCA, normalisation, discretisation). Done multiple times, in no prescribed order.</td></tr>
<tr><td><b>4. Modeling</b></td><td>Select modelling technique, generate test design, build model, assess model</td><td>Technique and assumptions, test design (train/validation/test), parameter settings, model assessment (<b>technical</b>: overfitting, error distribution). Often steps back to data preparation.</td></tr>
<tr><td><b>5. Evaluation</b></td><td>Evaluate results, review process, determine next steps</td><td>Assessment against <b>business success criteria</b>, approved models, review (overlooked factors or mistakes), list of actions and decision. Lift curves, ROI, domain experts.</td></tr>
<tr><td><b>6. Deployment</b></td><td>Plan deployment, plan monitoring and maintenance, produce final report, review project</td><td>Deployment plan, monitoring plan, final report and presentation, experience documentation. Can be as simple as a report or as complex as enterprise-wide repeatable mining.</td></tr></table>
<p><b>Business goal vs data mining goal:</b> "Increase catalogue sales to existing customers" (business terms) vs "Predict how many widgets a customer will buy given their past 3 years of purchases, demographics and price" (technical terms).</p>
<p><b>Assess model (Modeling) vs Evaluate results (Evaluation):</b> the first judges technical quality (accuracy, overfitting). The second judges whether the model meets <b>business objectives</b> and whether some business issue was overlooked.</p>` },
    { h: "Other processes", html: `
<table><tr><th>Process</th><th>Steps</th><th>Notes</th></tr>
<tr><td><b>SEMMA</b> (SAS, 1998)</td><td>Sample, Explore, Modify, Model, Assess</td><td>A logical organisation of SAS tools. Focuses on <b>analytical/modelling tasks and leaves out the business aspects</b>. Sample includes partitioning.</td></tr>
<tr><td><b>Microsoft TDSP</b> (2016)</td><td>Business Understanding, Data Acquisition and Understanding, Modeling, Deployment, <b>Customer Acceptance</b></td><td>Team based: collaboration, version control, reproducibility, agile. Customer Acceptance has no explicit CRISP-DM phase.</td></tr>
<tr><td><b>BizML</b> (HBR 2024, Eric Siegel)</td><td>Value (deployment goal), Target (prediction goal), Performance (metrics), Fuel (data), Algorithm (train), Launch (deploy)</td><td>Takes ML from concept to deployment and brings business stakeholders in (UPS example).</td></tr>
<tr><td><b>Holistic approach</b></td><td>Life cycle plus ethics</td><td>Privacy and security (GDPR), bias and fairness, responsible AI and explainability.</td></tr>
<tr><td>5-stage life cycle</td><td>Capture, Maintain, Process, Analyze, Communicate</td><td></td></tr>
<tr><td>IBM</td><td>Data preparation, exploration, process, model implementation, deployment, <b>model management</b></td><td></td></tr></table>
<p>Tools: SQL and Scrapy (collection), pandas and NumPy (cleaning), Tableau and Power BI (visualisation), scikit-learn and PyTorch (modelling), Docker, AWS and GCP (deployment), Git and <b>DVC</b> (data version control), Jira and Trello.</p>` },
    { h: "Common exam traps (scenario → phase)", html: `
<ul>
<li>Summary statistics, visualising, spotting drop-off points, noting incomplete sessions, preparing questions to confirm behaviour → <b>Data Understanding</b> (official sample).</li>
<li>Talking to stakeholders, defining success criteria, cost/benefit → <b>Business Understanding</b>.</li>
<li>Handling missing values, creating "session duration" features, joining tables, encoding → <b>Data Preparation</b>.</li>
<li>Choosing algorithms, train/test split, tuning hyperparameters → <b>Modeling</b>.</li>
<li>"Does the model meet the business objective?", reviewing overlooked issues, go/no-go decision → <b>Evaluation</b>.</li>
<li>Monitoring plan, final report, putting the model into the CRM → <b>Deployment</b>.</li>
<li>The best CRISP-DM answer always <b>starts with business objectives</b> and ends with deployment and recommendations. Jumping straight to modelling or tuning is wrong.</li>
<li>Data preparation, not modelling, takes the most time.</li>
</ul>` }
  ],
  questions: [
    { t: "CRISP-DM phases",
      q: "What is the correct order of the six CRISP-DM phases?",
      o: ["Data Understanding → Business Understanding → Data Preparation → Modeling → Deployment → Evaluation", "Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment", "Business Understanding → Data Preparation → Data Understanding → Evaluation → Modeling → Deployment", "Data Preparation → Data Understanding → Modeling → Business Understanding → Evaluation → Deployment"],
      a: 1,
      s: "BU → DU → DP → M → E → D (with backtracking).",
      c: "CRISP-DM starts with business understanding, not data, and is not linear. Arrows go back and forth, e.g. Modeling ↔ Data Preparation and Business ↔ Data Understanding.",
      w: ["Wrong: business understanding comes first, and evaluation comes before deployment.", "Correct.", "Wrong: data understanding precedes preparation, and modelling precedes evaluation.", "Wrong: business understanding is first."] },

    { t: "CRISP-DM phases",
      q: "A team computes summary statistics on web logs, plots drop-off at each checkout step, finds that some sessions have incomplete data, and prepares questions for stakeholders to confirm user behaviour. Which phase are they in?",
      o: ["Business Understanding", "Data Understanding", "Data Preparation", "Evaluation"],
      a: 1,
      s: "Exploring, describing, checking quality and forming hypotheses = Data Understanding.",
      c: "Data Understanding: collect initial data, describe it (basic statistics), explore it (visualisation, relations), verify quality (missing values, completeness), discover first insights and hypotheses.",
      w: ["Wrong: Business Understanding defines objectives and success criteria. These activities work with the data itself.", "Correct: this mirrors the official week 13 sample question.", "Wrong: no transformation, feature engineering or cleaning is being done yet. Quality issues are only noted.", "Wrong: there is no model to evaluate."] },

    { t: "CRISP-DM phases",
      q: "Which CRISP-DM phase typically <b>takes the most time</b>?",
      o: ["Business Understanding", "Data Preparation", "Modeling", "Deployment"],
      a: 1,
      s: "Data preparation takes most of the time and is repeated multiple times.",
      c: "Data Preparation covers all activities to build the final dataset from raw data: select, clean, construct, integrate, format. Its tasks are performed multiple times and in no prescribed order.",
      w: ["Wrong.", "Correct.", "Wrong: modelling is often quick compared with preparing the data.", "Wrong."] },

    { t: "Generic tasks",
      q: "Match each generic task to its CRISP-DM phase:<br>1. Verify data quality  2. Construct data  3. Generate test design  4. Review process<br>(i) Data Preparation  (ii) Evaluation  (iii) Data Understanding  (iv) Modeling",
      o: ["1-(iii), 2-(i), 3-(iv), 4-(ii)", "1-(i), 2-(iii), 3-(iv), 4-(ii)", "1-(iii), 2-(iv), 3-(i), 4-(ii)", "1-(iii), 2-(i), 3-(ii), 4-(iv)"],
      a: 0,
      s: "Verify quality → DU, Construct → DP, Test design → Modeling, Review process → Evaluation.",
      c: "DU: collect, describe, explore, verify. DP: select, clean, construct, integrate, format. Modeling: select technique, test design, build, assess. Evaluation: evaluate results, review process, next steps. Deployment: plan deployment, monitoring, final report, review project.",
      w: ["Correct.", "Wrong: verifying quality is DU and constructing data is DP.", "Wrong: constructing data is DP and test design is Modeling.", "Wrong: test design is Modeling and review process is Evaluation."] },

    { t: "Business vs data mining goals",
      q: "Which is a <b>data mining goal</b> rather than a business goal?",
      o: ["Increase catalogue sales to existing customers.", "Reduce customer churn by 10% this year.", "Predict how many widgets a customer will buy, given their purchases over the past three years, demographics and item price.", "Improve customer satisfaction."],
      a: 2,
      s: "A data mining goal states the objective in technical terms (what to predict, from which inputs).",
      c: "Business Understanding converts business objectives (business terminology) into a data mining problem definition (technical terms) and a project plan.",
      w: ["Wrong: the lecture's example of a business goal.", "Wrong: a business objective.", "Correct: it names the prediction target and the input features.", "Wrong: a business objective."] },

    { t: "Modeling vs Evaluation",
      q: "Consider the statements:<br>A. 'Assess model' in the Modeling phase judges models technically (e.g. overfitting, error distribution).<br>B. The Evaluation phase checks whether results meet the <b>business</b> objectives.<br>C. The Evaluation phase only re-computes accuracy on the training set.<br>D. At the end of Evaluation, a decision on using the data mining results should be reached.<br>Which are true?",
      o: ["A, B and D", "A and C", "B and C", "All of them"],
      a: 0,
      s: "A, B and D are true. Evaluation goes beyond technical metrics to business usefulness.",
      c: "Assess model = technical evaluation of models only. Evaluate results = business success criteria, review of the process for overlooked issues, determine next steps (deploy, iterate or start a new project).",
      w: ["Correct.", "Wrong: C is false.", "Wrong: C is false.", "Wrong: C is false. Training-set accuracy is not business evaluation."] },

    { t: "Applying CRISP-DM",
      q: "A retail chain wants to predict which customers will stop shopping within three months. Which plan best applies CRISP-DM?",
      o: ["Build a gradient boosting model on the full dataset immediately, deploy it, and try other algorithms if results are poor.", "Understand the business objective and financial impact of churn first, then assess and clean the data and do EDA, then build and evaluate models in a business context, then deploy with retention recommendations.", "Clean the data without consulting stakeholders, compare models on F1/AUC, and hand the best one to marketing.", "Run clustering and recommend offers without any modelling or deployment."],
      a: 1,
      s: "CRISP-DM starts with business understanding and moves through every phase to deployment.",
      c: "This is the official week 5 sample question. The other options skip business understanding or evaluation in a business context, or skip deployment.",
      w: ["Wrong: it skips business and data understanding and preparation.", "Correct.", "Wrong: no stakeholder engagement, and evaluation is only technical.", "Wrong: no formal modelling, evaluation or deployment."] },

    { t: "CRISP-DM characteristics",
      q: "Which statement about CRISP-DM is <b>NOT</b> true?",
      o: ["It is non-proprietary, industry-neutral and tool-neutral.", "It is a strictly linear process that never backtracks.", "It is considered the de facto standard for data mining projects.", "It can be implemented in an agile or waterfall manner."],
      a: 1,
      s: "CRISP-DM is not linear: phases are repeated and revisited.",
      c: "CRISP-DM is non-proprietary, neutral, focused on business and technical issues, iterative, flexible (agile or waterfall), and the de facto standard.",
      w: ["True.", "NOT true, so this is the answer.", "True.", "True: agile (vertical slicing) is preferred where possible."] },

    { t: "Levels of abstraction",
      q: "In CRISP-DM's four levels of abstraction, \"The mean value was used for numeric attributes and the most frequent value for categorical attributes\" is an example of a:",
      o: ["Phase", "Generic task", "Specialised task", "Process instance"],
      a: 3,
      s: "A process instance records the actual actions and decisions taken in a real engagement.",
      c: "Phase (Data Preparation) → Generic task (Data Cleaning) → Specialised task (Missing Value Handling) → Process instance (what was actually done).",
      w: ["Wrong: the phase would be Data Preparation.", "Wrong: the generic task would be Data Cleaning.", "Wrong: the specialised task would be Missing Value Handling.", "Correct."] },

    { t: "SEMMA",
      q: "What does SEMMA stand for, and how does it mainly differ from CRISP-DM?",
      o: ["Sample, Explore, Modify, Model, Assess. It focuses on analytical and modelling tasks and leaves out the business aspects.", "Select, Evaluate, Model, Monitor, Apply. It adds a monitoring phase.", "Sample, Estimate, Measure, Model, Act. It is industry-specific.", "Study, Explore, Manage, Model, Analyse. It focuses mainly on deployment."],
      a: 0,
      s: "SEMMA (SAS, 1998) = Sample, Explore, Modify, Model, Assess, and it has no business understanding phase.",
      c: "SEMMA is a logical organisation of SAS tools. Sample covers selection and partitioning. Explore uses visualisation for relationships and abnormalities. Modify selects, creates and transforms variables. Model applies techniques. Assess evaluates reliability and usefulness.",
      w: ["Correct.", "Wrong: incorrect expansion.", "Wrong: incorrect expansion.", "Wrong: incorrect expansion."] },

    { t: "TDSP",
      q: "Which stage of Microsoft's <b>Team Data Science Process (TDSP)</b> is <b>not</b> explicitly covered by CRISP-DM?",
      o: ["Business Understanding", "Modeling", "Customer Acceptance", "Deployment"],
      a: 2,
      s: "Customer Acceptance (customer validates the system meets business needs) is TDSP's extra stage.",
      c: "TDSP has 5 stages: Business Understanding, Data Acquisition and Understanding, Modeling (feature engineering plus training, combining modelling and evaluation), Deployment, Customer Acceptance. It emphasises team collaboration and version control.",
      w: ["Wrong: CRISP-DM has it.", "Wrong: CRISP-DM has it.", "Correct.", "Wrong: CRISP-DM has it."] },

    { t: "Why standard processes",
      q: "Which is <b>NOT</b> a stated reason for using a standard data science process?",
      o: ["Reproducibility of successes across projects and teams", "Reduced dependency on 'star' individuals", "Guaranteeing that every model reaches 100% accuracy", "Aiding project planning, management and communication"],
      a: 2,
      s: "No process guarantees perfect accuracy.",
      c: "Reasons: reproducibility, scalability (comfort factor, maturity, fewer 'stars'), productivity (planning, collaboration), solving the right problem, avoiding mistakes, reliable models, informed decisions.",
      w: ["A stated reason.", "A stated reason.", "Correct answer.", "A stated reason."] },

    { t: "Deployment",
      q: "Which task belongs to the <b>Deployment</b> phase?",
      o: ["Determine data mining goals", "Plan monitoring and maintenance", "Verify data quality", "Select modelling technique"],
      a: 1,
      s: "Deployment = plan deployment, plan monitoring and maintenance, produce final report, review project.",
      c: "Monitoring matters when the results become part of day-to-day business. It helps avoid long periods of incorrect use of mining results.",
      w: ["Wrong: Business Understanding.", "Correct.", "Wrong: Data Understanding.", "Wrong: Modeling."] },

    { t: "Data Preparation",
      q: "Creating a new attribute <b>'delay_days = claim_date − accident_date'</b> from two existing date attributes belongs to which Data Preparation task?",
      o: ["Select data", "Clean data", "Construct data", "Format data"],
      a: 2,
      s: "Producing derived attributes is construct data (feature engineering).",
      c: "Data Preparation tasks: select (records and attributes, rationale), clean (missing values, outliers), construct (derived attributes, ratios, aggregations, encoding), integrate (join or merge tables), format (syntactic changes for the tool, e.g. log, normalisation).",
      w: ["Wrong: selection chooses records or attributes.", "Wrong: cleaning fixes quality problems.", "Correct.", "Wrong: formatting changes syntax without changing meaning."] },

    { t: "BizML",
      q: "In <b>BizML</b>, what is the first step?",
      o: ["Train the model", "Prepare the data", "Establish the deployment goal (how ML will improve operations)", "Establish the evaluation metrics"],
      a: 2,
      s: "BizML starts with Value: the deployment goal.",
      c: "BizML steps: Value (deployment goal), Target (prediction goal), Performance (evaluation metrics), Fuel (prepare data), Algorithm (train), Launch (deploy). It is designed to bring business stakeholders in and get ML deployed.",
      w: ["Wrong: step 5.", "Wrong: step 4.", "Correct.", "Wrong: step 3."] },

    { t: "Holistic approach",
      q: "What distinguishes the <b>holistic approach</b> to the data science life cycle from plain CRISP-DM?",
      o: ["It removes the deployment phase.", "It explicitly integrates ethical considerations (privacy and security, bias and fairness, responsible and explainable AI) across the whole life cycle.", "It skips business understanding.", "It only applies to SAS tools."],
      a: 1,
      s: "Holistic = the life cycle plus ethics and responsible AI throughout.",
      c: "The holistic approach links back to weeks 2–4: GDPR, fairness and explainability are considered at every step.",
      w: ["Wrong.", "Correct.", "Wrong.", "Wrong: that describes SEMMA."] }
  ]
});
