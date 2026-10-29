# IFN509 study notes

Generated from `data/*.js` by `node tools/build.js`. Don't edit by hand; edit the data files and rebuild.

## Contents

- [Week 1: Introduction to Data Science](#week-1-introduction-to-data-science)
- [Week 2: Data Ethics](#week-2-data-ethics)
- [Week 3: Data Diversity and Fairness](#week-3-data-diversity-and-fairness)
- [Week 4: Data Privacy and Protection](#week-4-data-privacy-and-protection)
- [Week 5: Data Science Life Cycle (CRISP-DM)](#week-5-data-science-life-cycle-crisp-dm)
- [Week 6: Generative AI for Data Science](#week-6-generative-ai-for-data-science)
- [Week 7: Data Understanding and Representation](#week-7-data-understanding-and-representation)
- [Week 8: Exploratory Data Analysis](#week-8-exploratory-data-analysis)
- [Week 9: Data Preparation for Modelling](#week-9-data-preparation-for-modelling)
- [Week 10: Association Mining](#week-10-association-mining)
- [Week 11: Classification (KNN, Decision Trees, Naïve Bayes)](#week-11-classification-knn-decision-trees-naïve-bayes)
- [Week 12: Clustering (K-means, K-medoids, Hierarchical)](#week-12-clustering-k-means-k-medoids-hierarchical)

## Week 1: Introduction to Data Science

### What data science is

**Data science** uses scientific methods, processes, algorithms and systems to extract knowledge and insights from data in various forms, so people can make decisions. It sits where **computer science** (pattern recognition, databases, data warehousing, AI, HPC), **mathematics** (mathematical modelling), **statistics** (statistical and stochastic modelling) and **domain expertise** meet.

"Drowning in data but starving for knowledge": raw data does not turn into insight by itself. The knowledge we want is:

- **Interesting**: unexpected or valuable, and actionable (e.g. customers who buy milk often also buy cereal).
- **Robust**: holds in the future and across samples, so it has predictive power (e.g. a credit-risk model that works across segments and time periods).
- **Useful**: supports decision-making (e.g. predictive analytics used to set inventory levels).

"No applications, no data science": it is about solving a *real* problem with data.

The unit has two parts. **Part 1, Ethics** (what we *should* do with data): ethics, fairness and diversity, privacy, life cycle, GenAI. **Part 2, Techniques** (what we *could* do with data): types of analysis, data types, exploration and visualisation, pre-processing, association mining, basic ML.

**Holistic approach**: look at the whole life cycle (problem, data collection and provenance, pre-processing, EDA, modelling, evaluation, deployment, ethics, monitoring, human-centred collaboration) and not only the algorithms.

### Data, objects and attributes

A dataset is a **collection of objects described by attributes**. In a table, a **row = object** (also called a record, data point, case, sample, entity or instance) and a **column = attribute** (also called a feature, variable, field or predictor). Attribute values can be **discrete** (zip code, counts, words) or **continuous** (temperature).

**Types of data sets:** record (table, documents, transactions), graph (WWW, molecules), ordered (spatial, temporal, sequential, genetic).

**Data quality problems:** **noise** (an invalid signal on top of valid data, e.g. wind, rain, inconsistent labelling), **outliers** (objects very different from most others), **missing values** (not collected or not applicable) and **duplicate data**.

### Data formats

| Format | Structure | Examples |
| --- | --- | --- |
| Structured | Rigid schema, predefined tables and columns (about 20% of data) | Relational DB/SQL tables, spreadsheets, transactions |
| Semi-structured | Some structure but flexible, fields can vary | JSON, XML, logs, RDF (web APIs) |
| Unstructured | No predefined format or model (about 80% of data) | Text, emails, images, audio, video |
| Graph/network | Nodes and edges, for modelling relationships | Social, citation and road networks |
| Streaming | Continuous, real time, low latency, often scanned only once | Stock ticks, IoT sensors, clickstreams, social feeds |
| Geospatial | Coordinates and maps | GPS |

Real-world data is usually **unstructured, large-scale and heterogeneous**, i.e. big data. Big data is the crude oil and data science refines it.

### Types of data analysis (increasing complexity and power)

| Type | Question | Notes |
| --- | --- | --- |
| Exploratory (EDA) | What is in the data? | Summarise one dataset and look for trends and correlations in order to **form hypotheses**. Does not identify causes, predict or generalise. |
| Descriptive | What happened? | Summaries, KPIs, dashboards. In data mining: **clustering and association**. |
| Diagnostic | Why did it happen? | Causal inference, explaining anomalies. |
| Predictive | What is likely to happen? | **Classification and regression**. Predicting does not mean the features cause the target. |
| Prescriptive | What should we do / how can we make it happen? | Combines all previous analyses to pick an action, e.g. AI and self-driving cars. |

**Supermarket example:** sales rose 12% (descriptive), because weekend promotions worked (diagnostic), sales will rise at the holidays (predictive), so increase stock and marketing (prescriptive).

### Data mining tasks

- **Supervised learning (predictive modelling):** training data has **class labels**, and new data is classified using the training set. **Classification** predicts a category (good/bad loan) and **regression** predicts a number (loan amount).
- **Unsupervised learning:** class labels are **unknown**, and the goal is to discover structure. **Clustering** puts similar objects in the same group and dissimilar objects in different groups. **Association** finds items that imply other items in the same transaction (market basket: {Bread, Milk} → {Eggs}).

**Database query vs data mining query.** A database answers "give me the data", e.g. find customers who bought milk, clients named Smith, or customers who spent more than $10,000. Data analytics answers "what does the data mean?", e.g. items frequently bought with milk (association), clients who are poor credit risks (classification), customers with similar buying habits (clustering).

**OLAP** runs on a data warehouse and analyses data cubes across many dimensions: roll-up, drill-down, slice, dice, pivot.

### Tools

Python (pandas, NumPy for data; scikit-learn, TensorFlow, PyTorch, Keras for ML; Matplotlib, Seaborn for visualisation), R, SQL, Tableau, Power BI, and big-data tools Hadoop and Spark.

### Common exam traps

- A query that only **retrieves or filters** rows (top-5 spenders, customers who bought milk) is a **database query**, not data mining, even when it has a threshold.
- Clustering vs classification: if the groups are **predefined labels**, it is classification. If the groups are **discovered**, it is clustering.
- Correlation ≠ causation (ice cream and bicycle accidents are both driven by hot weather). A predictive model does not show causes.
- JSON, XML and RDF are **semi-structured**, not structured.
- Association mining and clustering are **descriptive**. Classification and regression are **predictive**.

## Week 2: Data Ethics

### Ethics and data ethics

**Ethics** is the branch of philosophy that judges what is right and wrong in human behaviour. Ethical questions are **context-dependent** and have no single answer. "How do I build a neural network to classify bird calls?" is a *technical* question. "Should we build a system that predicts gender identity from faces?" is an *ethical* one.

**Data ethics** is the branch of ethics that studies moral problems related to **data** (generation, recording, curation, processing, dissemination, sharing, use), **algorithms** (AI, ML, robots) and the **practices** around them (responsible innovation, programming, hacking, professional codes). Its aim is to support morally good solutions. It should be **proactive** and considered at every step.

The technical side of data science is about what we **could** do. The ethical side is about what we **should** do. **You can't outsource ethics**: responsibility stays with the people who build, deploy or use a system, so you cannot say "the algorithm did it" or "I followed policy".

"The problem is not with the algorithms, it's with the data we give them" (rubbish in, rubbish out). Algorithms simplify and **amplify** our biases. Example: dermatology deep learning that works well only on lighter skin.

### Three major ethical frameworks

| Framework | An action is right iff… | Focus | Drawback | Trolley problem |
| --- | --- | --- | --- | --- |
| **Virtue ethics** | it is what a person of good character (a virtuous agent) would do in the circumstances | Character traits needed to flourish: compassion, courage, wisdom, honesty | Vague guidance | Depends on what a virtuous person would do |
| **Deontology** (duty-based) | it follows moral rules, principles or duties | Rights and duties regardless of outcome | **Rigid** | Don't pull the lever, because "do not kill" is a rule |
| **Consequentialism / Utilitarianism** | it promotes the best consequences (the greatest good for the greatest number) | Weigh costs and benefits | **Hard to predict consequences** | Pull the lever: sacrifice 1 to save 5 |

**Exam pattern (sample short answer):** for an AI system that is efficient overall but may wrongly deny some vulnerable people, **utilitarianism most likely supports** deployment (net benefit), **deontology most likely opposes** it (duty to protect each individual's rights), and virtue ethics is balanced (support only with safeguards, transparency and human oversight).

### Major ethical concerns in data science

- **Privacy**: ubiquitous collection, weak informed consent, profiling and tracking, third-party sharing. Your data is being sold.
- **Algorithmic bias / fairness**: biased data is perpetuated and amplified.
- **Transparency**: opaque "black box" processes.
- **Accountability**, **Security** (breaches), **Consent and control**.

The Good (healthcare, safety, innovation, social good), the Bad (bias, black boxes, breaches, manipulation) and the Creepy (surveillance, micro-targeting, predictive profiling without consent).

### Case studies (match each to its main concern)

| Case | Main concern | Lesson |
| --- | --- | --- |
| Facebook–Cambridge Analytica (up to 87M profiles harvested through a quiz app, political micro-targeting) | Privacy breach, no informed consent, manipulation of opinion | Transparency and consent, stricter governance. Facebook then applied GDPR worldwide. |
| Amazon hiring algorithm (trained on 10 years of male-dominated resumes, downgraded "women's") | Discrimination, inadequate testing | Diverse datasets, continuous auditing, human oversight |
| Facial recognition and darker skin (error up to 34% higher for dark-skinned females) | Discrimination, inadequate testing | Diverse datasets, monitoring and audits |
| British Airways 2018, Facebook 533M leak 2021, QUT 2022 cyber attack | Data security | Protect stored data |
| Uber "God mode" (employees tracked celebrities and ex-partners) | Data privacy | Understand app trade-offs and terms |
| Apple Card credit limits (men got higher limits than wives) | **Transparency**. Investigation found no deliberate or disparate-impact discrimination. | Lenders cannot consider sex or gender |

### Benefits, harms, stakeholders

Harms and benefits are **ethically significant** when they affect people's chances of living well and flourishing together.

**Three ethically significant benefits:** (1) increase understanding of the world so we act more intelligently; (2) improve the function of social, institutional and economic systems; (3) tailor actions to be more effective for specific individuals, groups and circumstances.

**Three ethically significant harms:** (1) compromise **privacy and security** (reputations, livelihoods, even fatal); (2) harm **fairness and justice**; (3) obscure **transparency** (seeing how systems work) and limit **autonomy** (steering your own life).

**Stakeholders:** data subjects, data scientists (if you work with the data you are a stakeholder too, because your reputation is at stake), engineers and IT, business leaders, regulators, end users, marginalised and vulnerable groups, employees, future generations.

### Key ethical principles and frameworks

**Beneficence** (do good), **non-maleficence** (do no harm), **fairness/justice**, **autonomy/consent**, **privacy**, **transparency**, **accountability**, **accuracy and quality**, **security**. The first four come from bioethics (Beauchamp and Childress). Principles can **conflict**: privacy vs research, fairness vs accuracy, transparency vs IP or security.

**Regulations and frameworks:** data protection (EU GDPR, California CCPA), AI (OECD AI Principles, UNESCO, EU AI Act, NY hiring-AI bias law), platforms (EU Digital Services Act).

**Working ethically:** adopt an ethical framework, detect and mitigate bias (fairness-aware ML, audits), train staff, update guidelines regularly, ensure transparency through external audits.

### Data ethics in Australia and Indigenous data

- Australia must balance data innovation with privacy protection (e.g. the 2016 Census DDoS incident).
- **Privacy Act 1988** is the cornerstone law. The **Consumer Data Right (CDR)** gives control over data in banking and telecoms. **Australia's AI Ethics Principles are entirely voluntary.**
- The whole-of-government **Data Ethics Framework** rests on the **TRI principles**: **Transparency** (clear purpose, openness, traceable lineage and explainability), **Respect** (engage those affected, fairness, manage bias), **Integrity** (use consistent with purpose and legal authority, comply with law and Privacy Principles, stewardship).
- **Indigenous data**: data generated **by, about or for** Indigenous peoples, collectively or individually.
- **Indigenous Data Sovereignty (IDS)**: the right of Indigenous peoples to exercise **ownership** over Indigenous data (creation, collection, access, analysis, interpretation, management, dissemination, reuse).
- **Indigenous Data Governance**: the right to autonomously decide what, how and why Indigenous data are collected, accessed and used.
- **CARE principles**: **C**ollective benefit, **A**uthority to control, **R**esponsibility, **E**thics. These are people and purpose oriented. **FAIR** (Findable, Accessible, Interoperable, Reusable) is technical. FAIR asks "*can* it be reused?" and CARE asks "*should* it, and who decides?"
- **Framework for Governance of Indigenous Data** (APS), four guidelines: **Partner** with Aboriginal and Torres Strait Islander people, **Build data-related capabilities**, **Provide knowledge of data assets**, **Build an inclusive data system**.
- **AIATSIS Code of Ethics** (2020), four principles: **Indigenous self-determination, Indigenous leadership, Impact and value, Sustainability and accountability**. Its core value is integrity.
- **UNDRIP** (UN 2007) includes **Free, Prior and Informed Consent (FPIC)**.
- Best practice across the Indigenous data lifecycle: involve Indigenous peoples from conceptualisation, obtain FPIC in a culturally safe way, give easy access, engage them in analysis and interpretation, and partner on dissemination.

### Common exam traps

- "Greatest good for the greatest number" or "sacrifice 1 to save 5" → **utilitarian**. "Rules or duties regardless of outcome" → **deontology**. "What would a person of good character do" → **virtue**.
- Indigenous data scenarios: the right answer is almost always **partner with Indigenous communities from the outset** on ownership, access and use. Generic consent forms, separate storage without consultation, or de-identification alone are not enough.
- Technically FAIR data can still violate CARE.
- Australia's AI Ethics Principles are **voluntary**, not law.
- Apple Card was a **transparency** issue. Investigators found no evidence of deliberate discrimination.

## Week 3: Data Diversity and Fairness

### Definitions

**Data diversity** is the representativeness and variety of data: a wide range of **characteristics** (who we are: race, age, gender, religion, disability, education, occupation, socioeconomic status), **perspectives** (how we think: views, values, experiences) and **contexts** (where and how we live or act: rural vs urban, online vs offline, lighting and weather) in the data used to train models or make decisions.

**Types of data diversity:** **demographic** (gender, race, age, religion, disability, SES), **behavioural** (shopping habits, personality, cognitive styles, cultural practices), **contextual** (environment, how and why data was collected), **geographic** (regions, urban/rural, climate), **temporal** (different time periods), **data source** (social media, sensors, structured vs unstructured).

**Algorithm fairness**: AI systems should not discriminate against or unfairly disadvantage any individual or group based on protected characteristics. *Algorithms* are mathematical functions (linear regression, random forest, neural nets) and *models* are algorithms trained on data. If a model's errors **systematically** disadvantage a group, the model is biased or unfair. Fairness research is at the intersection of ML and ethics, and approaches to it are **not only quantitative**.

### Why it matters

- Biased dataset → unfair algorithm (e.g. facial recognition trained mostly on light-skinned faces).
- Diverse data gives **better representation and less bias** (fair and equitable), **improved generalisation** (robust), **more comprehensive insights** (accurate and reliable), and **more trust and acceptance**.
- Examples: Apple Card (gender, 10× limit), Amazon hiring (penalised "women's"), **COMPAS** recidivism (black defendants who did not re-offend were **twice as likely to be false positives**), predictive policing (feedback loop), healthcare (Optum used spending as a proxy for health, pulse oximeters), social-media echo chambers.
- Impacts: economic (credit limits, filtered resumes), social (harm to marginalised groups, amplified inequality, eroded trust), environmental (energy for storage, data lifecycle, low-power sensors).

### Types and sources of bias

- **Data bias**: the training or historical data is biased. **Algorithmic bias**: comes from the model or rules. **Interaction bias**: introduced by users (echo chambers).
- Named biases: **language** (LLMs trained mostly on English present Anglo-American views as truth), **gender**, **political**, **selection** (non-representative samples), **measurement** (inaccurate or inconsistent measures).
- **Sources:** data collection, historical and societal bias, sampling errors and **unbalanced datasets** (parameters skew to the majority), **labelling inaccuracies**, design choices (maximising accuracy at fairness's expense, **proxy variables** such as postcode standing in for race), **feedback loops** (biased model → biased data).
- **Contextual fairness**: no one-size-fits-all. Adapt to the social, historical and cultural context and to time.

### Fairness metrics (with formulas)

Split the population into privileged and unprivileged groups, compare a metric across them, and call the model unfair if the rates differ significantly. Ŷ = prediction, Y = true label, A = group.

| Metric | Condition (equal across groups) | Plain meaning |
| --- | --- | --- |
| **Demographic (statistical) parity** | P(Ŷ=1 \| A=a) = P(Ŷ=1 \| A=b) | Equal **positive / selection rates**, independent of the sensitive attribute. Ignores qualification. |
| **Equal opportunity** (TP-parity) | P(Ŷ=1 \| Y=1, A=a) = P(Ŷ=1 \| Y=1, A=b) | Equal **true positive rate**: qualified people have an equal chance. |
| **Equalised odds** | Equal TPR **and** equal FPR | Fair on both correct and incorrect predictions. |
| **Predictive (value) parity** | Equal PPV (precision) and NPV | A positive prediction means the same in every group. |
| **Accuracy parity** | Equal accuracy |  |
| **Disparate impact** | DI = selection rate(unprivileged) / selection rate(privileged) | Measures demographic parity. **80% rule**: DI < 0.8 suggests disparate impact. |
| **Counterfactual fairness** | Same outcome if the person's demographic identity were changed |  |
| **Fairness through awareness** | Similar individuals (on task-relevant features) get similar outcomes | **Individual** fairness. Needs a good similarity metric, which is hard and expensive. Can conflict with group parity. |

**Worked example (disparate impact):** a test passes 90% of group W and 60% of group H. DI = 0.60 / 0.90 = 0.667 < 0.8, so there is potential disparate impact.

**Worked example (which metric fails):** selection rates are 60% for men and 30% for women, so demographic parity is violated. Among *qualified* candidates the rates are 90% vs 88% (TPR almost equal), so equal opportunity is roughly satisfied.

Also: the **fairness–accuracy trade-off**, **intersectional analysis** (bias compounds, e.g. woman + Black + elderly), **causal fairness**, and **exploratory fairness analysis** (assess fairness before the final model).

**Tools:** Google Fairness Indicators, IBM AI Fairness 360, Themis-ML, Google What-If Tool.

### Approaches and mitigation

- Across the lifecycle: data collection, pre-processing, model development, ongoing monitoring.
- **Pre-processing** (before training): re-weighting, re-sampling, data augmentation or synthetic data, masking sensitive features, adversarial debiasing.
- **In-processing** (during training): fairness-aware algorithms and fairness constraints.
- **Post-processing** (after training): adjust the outputs or thresholds without retraining.
- **Promoting diversity:** diverse sourcing, inclusive sampling (surveys, crowdsourcing, community datasets), avoid biased historical data, partner with under-represented communities, regular data audits, domain expertise.
- **Imbalanced data:** one class greatly outnumbers the others. Rule of thumb: minority < 10–20%. **Imbalance ratio = majority / minority**. Fixes: **oversampling** (increase the minority), **undersampling/downsampling** (reduce the majority, e.g. keep every other row), **augmentation** (synthetic samples).
- Emerging: explainable AI (transparency), synthetic data (bias reduction), **federated learning** (privacy-preserving collaborative learning), open data (World Bank, UNESCO), ethical-by-design.

### Common exam traps

- If the question gives overall selection rates by group → **demographic parity**. If it gives rates among qualified or actual-positive people → **equal opportunity**. If it gives both TPR and FPR → **equalised odds**.
- Big accuracy gap between demographic groups plus a skewed training set → the root issue is **lack of representation (data diversity)**, not lighting, resolution or post-processing.
- Removing the sensitive attribute is not enough, because **proxy variables** can still encode it.
- Oversampling adds minority samples. Undersampling removes majority samples.
- Demographic parity can conflict with individual fairness and with accuracy.

## Week 4: Data Privacy and Protection

### Privacy vs protection

**Data privacy (information privacy)** is the right of individuals or organisations to **control their personal information**. It makes sure personal data is processed legally, stored securely and used for its intended purpose. It is a human right and an ethical matter.

**Data protection** is the broader practice of making sure data is properly managed, stored and used, with a focus on privacy and regulatory compliance. **Data security is a subset of data protection.** Methods include anonymisation and pseudonymisation, retention policies, legal compliance, backups and disaster recovery.

**Key questions:** what data is collected, why, how it will be used, who has access, and how long it is kept.

### Key definitions (GDPR Art. 4)

- **Personal data**: any information relating to an identified or identifiable **living** individual, directly or indirectly. Examples: name, DOB, email, phone, photos, location, IP address, cookies, RFID, CCTV, signatures, credit information, voice prints and facial biometrics, employee records. (The Australian Privacy Act doesn't cover people who have died.)
- **Special category data** (sensitive) is a **subset** of personal data that needs higher protection: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade-union membership, **genetic**, **biometric** (fingerprint, face for ID), **health** (medical, heart rate, sickness records), criminal convictions, sex life or orientation.
- Photographs are **not automatically** special category. They are only special category if processed as biometric data (e.g. face ID at the border).
- **Processing**: *any* operation on personal data, including collecting, organising, altering or combining, disclosing, using, holding and deleting.
- **Data subject**: the living person the data is about (a patient, a student). **Data controller**: decides **why and how** data is processed (the university). **Data processor**: processes data **on behalf of** the controller (outsourced payroll, cloud provider, market research firm), not the controller's own employees.

|  | Personal data | Special category data |
| --- | --- | --- |
| Legal basis | One of the 6 GDPR bases | A lawful basis **plus** an additional condition (e.g. explicit consent) |
| Security | Standard (access controls) | Extra: DPIA, encryption |
| Consent | Implicit or explicit | **Explicit** when consent is relied on |
| Breach risk | Moderate | High, often mandatory reporting |

### Laws

- **GDPR (EU)** applies to **any organisation processing personal data of individuals in the EU, regardless of where the organisation is**. Key provisions: data subject rights, accountability, data protection by design and by default. **Maximum fine: €20 million or 4% of annual global turnover**. Examples: Meta €1.2B, Amazon €746M, TikTok €530M.
- **Australia: Privacy Act 1988 (Cth)** has **13 Australian Privacy Principles (APPs)**, applies to government agencies and some private organisations, requires explicit consent for sensitive information, includes **data breach notification** and cross-border rules, and is enforced by the **OAIC**. Fines up to **$50 million**.
- **Queensland Privacy Act 2009** covers Qld **public sector agencies only**. It has Information Privacy Principles (IPPs) and National Privacy Principles (NPPs, for health agencies), overseen by the OIC.
- Others: UK Data Protection Act 2018 (aligns with GDPR), **CCPA** (California), **COPPA** (US, children under 13), **HIPAA** (US medical information), China **PIPL** (2021), Brazil LGPD. The US has no single federal privacy law. About 137 countries have privacy laws.
- Breaches: Equifax 2017 (147M people, $1.4B), Optus 2022 (10M Australians).

### GDPR: 6 lawful bases (at least one must apply)

| Basis | When | Example |
| --- | --- | --- |
| **Consent** | Freely given, specific, informed, unambiguous, and can be withdrawn | Opt-in checkbox for marketing emails |
| **Contract** | Necessary to perform a contract with the subject | Address needed to deliver an online order |
| **Legal obligation** | Required by law | Payroll data for tax. QUT collecting student data under the QUT Act, tax and migration law. |
| **Vital interests** | Protect someone's life (rarely used) | Hospital shares history with paramedics in an emergency |
| **Public task / interest** | Official authority, mainly the public sector | Council voter registration, welfare eligibility |
| **Legitimate interests** | Justified business interest balanced against individuals' rights. The **most flexible** basis. | CCTV for security with signage |

Consent should be freely given. In employment it may not be, because employees may fear consequences. When getting consent, explain what, why, who, how, and how to withdraw.

**Special category data** processing is prohibited unless there is e.g. explicit consent, an employment or social-security obligation, vital interests, the data was manifestly made public by the subject, or substantial public interest.

### GDPR: 7 principles

1. **Lawfulness, fairness and transparency**: process legally and openly, and tell people what is collected and why.
2. **Purpose limitation**: collect for specified, explicit purposes and don't reuse for unrelated ones.
3. **Data minimisation**: only what is necessary (don't ask for DOB for a dance party, or political opinion for a health check).
4. **Accuracy**: correct and up to date.
5. **Storage limitation**: keep no longer than necessary.
6. **Integrity and confidentiality (security)**: protect against unauthorised access or loss.
7. **Accountability**: the controller must **demonstrate** compliance (policies, training, audit logs, DPIAs).

### GDPR: 8 data subject rights

1. **Right to be informed**: what, why and how (privacy notice).
2. **Right of access**: get a copy of your data (Subject Access Request), within 3 months.
3. **Right to rectification**: correct inaccurate data, without delay.
4. **Right to erasure ("right to be forgotten")**: deletion in certain circumstances, done promptly.
5. **Right to restrict processing** (blocking): data stored but not processed while a dispute is checked.
6. **Right to data portability**: receive data in a structured, machine-readable format and transmit it to **another controller**, including a competitor.
7. **Right to object**: to processing based on legitimate interests or public task, direct marketing, or research.
8. **Rights related to automated decision-making and profiling**: not to be subject to decisions based solely on automated processing, to human intervention, and to an explanation.

The rights do **not** include: accessing *other people's* data, forcing publication of proprietary source code, stopping a service in your city, or refusing to pay fares.

### International transfers, threats, safeguards

- **Why control transfers?** Data could lose its legal protection when it crosses a border, so the rules stop controllers escaping responsibility and prevent "data havens".
- Three mechanisms: **adequacy decision** (the European Commission decides the destination's protection is essentially equivalent), **appropriate safeguards** (Standard Contractual Clauses, certification), **derogations** (explicit consent, contract, public interest, legal claims, vital interest).
- **Recipient**: anyone data is disclosed to. Employees of the controller are recipients but not third parties. Authorities in a particular inquiry (e.g. police) are not regarded as recipients.
- Transfers between institutions must be **necessary** for the recipient's legitimate tasks. Sender and recipient should keep up a dialogue (no blind transfers).
- **Threats:** identity theft, data breach (lost, stolen, destroyed, changed or accessed without permission), ransomware, phishing.
- **Safeguards:** technical (antivirus, patching, firewall, backups, strong passwords, encryption, licensed software) and physical (locks, guards, cameras, alarms).

### Common exam traps

- Heart rate, fingerprints and health data are special category. A profile photo, username, location or IP address is personal but **not** special category.
- Marketing emails with an opt-in checkbox → **consent**, not legitimate interests or contract.
- Encryption does **not** fix collecting too much data or vague purposes (minimisation and purpose limitation are separate principles).
- A provider deleting the whole account when you only asked to stop marketing is wrong. That request is the right to object, not erasure.
- "Technical constraints" do not excuse refusing rectification. Refusing to send data to a competitor violates portability.
- The controller decides why and how. The processor acts on the controller's instructions.

## Week 5: Data Science Life Cycle (CRISP-DM)

### Why a standard process

The **data science life cycle** is a framework for extracting insight and value from data in structured steps. Data mining projects are **complex, iterative and risky**, so a standard process gives:

- **Reproducibility**: a consistent framework for recording experience, so success can be replicated.
- **Scalability**: a comfort factor for new adopters, shows maturity, reduces dependency on "stars", makes onboarding easier.
- **Productivity**: helps planning and management, and keeps stakeholders aligned.

It helps solve the **right** problem, avoid common mistakes, build reliable models and make informed decisions. The process must be reliable and repeatable by people with little data mining background.

### CRISP-DM basics

**CR**oss-**I**ndustry **S**tandard **P**rocess for **D**ata **M**ining. Launched in 1996 and published as 1.0 in 1999 (EU funded; DaimlerChrysler, SPSS, NCR). It is the **de facto standard** and was the most popular in a 2020 poll.

- **Non-proprietary**, **industry/application neutral**, **tool neutral**.
- Focuses on **business issues as well as technical analysis**. It **starts with business understanding, not data**, which prevents technically correct but useless models.
- **Not linear**: you repeatedly backtrack between phases.
- Can be run **agile** (vertical slicing) or **waterfall** (horizontal slicing). Agile is preferred.
- **Four levels of abstraction:** Phase (Data Preparation) → Generic task (Data Cleaning) → Specialised task (Missing Value Handling) → Process instance (a record of what was actually done, e.g. "the mean was used for numeric attributes and the mode for categorical").
- **Data mining context** has four dimensions: application domain (medical prognosis), problem type (regression), technical aspect (censored observations), tools and techniques (Cox regression).
- **Benefits:** generalisable, common sense, adoptable, right start (business understanding), strong finish (deployment), flexible. **Perceived weaknesses:** rigid and documentation-heavy, pre-dates big data, ignores project management.

### The 6 phases, tasks and outputs

| Phase | Generic tasks | Key outputs and clues |
| --- | --- | --- |
| **1. Business Understanding** | Determine business objectives, assess the situation, determine data mining goals, produce the project plan | Background, success criteria, inventory of resources, requirements, assumptions and constraints, risks, glossary, cost/benefit, DM goals, project plan. Stakeholders, defining the problem, "the right answers to the wrong questions". |
| **2. Data Understanding** | Collect initial data, describe data, explore data, verify data quality | Initial data collection report, data description (basic statistics), exploration report (distributions, visualisations, relations), data quality report (missing values, completeness, outliers). **First insights and hypotheses.** |
| **3. Data Preparation** (**takes most of the time**) | Select, clean, construct (feature engineering), integrate, format | Rationale for inclusion/exclusion, cleaning report, derived attributes, merged data, reformatted data (encoding, log, PCA, normalisation, discretisation). Done multiple times, in no prescribed order. |
| **4. Modeling** | Select modelling technique, generate test design, build model, assess model | Technique and assumptions, test design (train/validation/test), parameter settings, model assessment (**technical**: overfitting, error distribution). Often steps back to data preparation. |
| **5. Evaluation** | Evaluate results, review process, determine next steps | Assessment against **business success criteria**, approved models, review (overlooked factors or mistakes), list of actions and decision. Lift curves, ROI, domain experts. |
| **6. Deployment** | Plan deployment, plan monitoring and maintenance, produce final report, review project | Deployment plan, monitoring plan, final report and presentation, experience documentation. Can be as simple as a report or as complex as enterprise-wide repeatable mining. |

**Business goal vs data mining goal:** "Increase catalogue sales to existing customers" (business terms) vs "Predict how many widgets a customer will buy given their past 3 years of purchases, demographics and price" (technical terms).

**Assess model (Modeling) vs Evaluate results (Evaluation):** the first judges technical quality (accuracy, overfitting). The second judges whether the model meets **business objectives** and whether some business issue was overlooked.

### Other processes

| Process | Steps | Notes |
| --- | --- | --- |
| **SEMMA** (SAS, 1998) | Sample, Explore, Modify, Model, Assess | A logical organisation of SAS tools. Focuses on **analytical/modelling tasks and leaves out the business aspects**. Sample includes partitioning. |
| **Microsoft TDSP** (2016) | Business Understanding, Data Acquisition and Understanding, Modeling, Deployment, **Customer Acceptance** | Team based: collaboration, version control, reproducibility, agile. Customer Acceptance has no explicit CRISP-DM phase. |
| **BizML** (HBR 2024, Eric Siegel) | Value (deployment goal), Target (prediction goal), Performance (metrics), Fuel (data), Algorithm (train), Launch (deploy) | Takes ML from concept to deployment and brings business stakeholders in (UPS example). |
| **Holistic approach** | Life cycle plus ethics | Privacy and security (GDPR), bias and fairness, responsible AI and explainability. |
| 5-stage life cycle | Capture, Maintain, Process, Analyze, Communicate |  |
| IBM | Data preparation, exploration, process, model implementation, deployment, **model management** |  |

Tools: SQL and Scrapy (collection), pandas and NumPy (cleaning), Tableau and Power BI (visualisation), scikit-learn and PyTorch (modelling), Docker, AWS and GCP (deployment), Git and **DVC** (data version control), Jira and Trello.

### Common exam traps (scenario → phase)

- Summary statistics, visualising, spotting drop-off points, noting incomplete sessions, preparing questions to confirm behaviour → **Data Understanding** (official sample).
- Talking to stakeholders, defining success criteria, cost/benefit → **Business Understanding**.
- Handling missing values, creating "session duration" features, joining tables, encoding → **Data Preparation**.
- Choosing algorithms, train/test split, tuning hyperparameters → **Modeling**.
- "Does the model meet the business objective?", reviewing overlooked issues, go/no-go decision → **Evaluation**.
- Monitoring plan, final report, putting the model into the CRM → **Deployment**.
- The best CRISP-DM answer always **starts with business objectives** and ends with deployment and recommendations. Jumping straight to modelling or tuning is wrong.
- Data preparation, not modelling, takes the most time.

## Week 6: Generative AI for Data Science

### Fundamentals

**Generative AI** is a class of AI systems that **create new content** (text, images, code, audio, video, 3D, synthetic data) based on patterns learned from existing data. It is powered by **LLMs and diffusion models**. GenAI **generates, not just predicts**, so it differs from predictive ML.

**Hierarchy:** AI ⊃ ML ⊃ DL ⊃ GenAI.

| Level | Focus | Example |
| --- | --- | --- |
| AI | Intelligent behaviour, **may not learn** (rule-based, search, planning) | Rule-based chess engine, navigation, expert systems |
| ML | Learns patterns from data (supervised, unsupervised, reinforcement) | Spam classifier |
| DL | Multi-layer neural networks, learns features automatically, excels with large-scale data | Image and voice recognition |
| GenAI | Content creation | ChatGPT, image generators |

QUT-approved tools: Microsoft Copilot (text), Adobe Firefly (images). Code: GitHub Copilot, ChatGPT, CodeT5, Tabnine.

### Why now: the three drivers

- **Data**: the internet (social media, Wikipedia, GitHub, digitised books) became the largest training set in history. What happens when data runs out?
- **Compute**: GPUs (NVIDIA) and TPUs (Google) are excellent at parallel matrix multiplication, and deep learning is mostly matrix multiplication.
- **Algorithms**: AlexNet (CNN, 2012), GANs (2014), diffusion (2015/2020), and the **Transformer (2017, Google)**, which brought parallel processing, long-range context and stable scaling. Before it, RNNs struggled with long sentences.

**Scaling law:** more data + bigger models + more compute = better performance, **predictably** (100M parameters gives basic grammar, 100B+ gives reasoning). Deep models are pattern-recognition machines and fail without massive data.

### Why it matters

- GenAI is **not replacing data professionals but redefining the role**: "AI disrupting a product" (e.g. Chegg's collapse) vs "AI augmenting a workflow".
- Models are at a tipping point: powerful enough, economical for non-technical users, readily available (open-weight LLaMA, Gemma, DeepSeek; cloud GPUs such as Colab).
- New skills: LLM evaluation, prompt design, agent workflows, **RAG**, AI product management, human–AI collaboration. Traditional skills (engineering, statistics, ML, governance) still matter.

### GenAI in the data science workflow (augmented analytics)

The traditional workflow (problem → data → EDA → modelling → evaluation → reporting) is manual and repetitive. The GenAI co-pilot workflow is: data → AI-assisted cleaning → auto SQL → auto code → auto analysis → draft insights → **human validation**.

- Elements: AI-assisted cleaning, visualisation and coding; proactive analysis (surfacing outliers and trends); automated data management; data discovery; **natural language interaction**; automated insights.
- Use cases: text-to-code EDA, text-to-SQL, root-cause analysis, **synthetic data** (overcomes scarcity, protects privacy, simulates edge cases such as fraud or weather, mitigates bias), smart dashboards, MLOps drift detection, traceability documents (README) for replication.
- Benefits: faster time to insight, better decisions, cost and efficiency gains, **democratised access** for non-technical users, agility.
- **Productivity shift:** 2 hours writing SQL becomes 2 minutes drafting plus 20 minutes validating. **Value shifts from syntax to thinking.**

### Prompt engineering

Tips: **be specific**, **provide context**, **request validation steps**, **ask for structured output** (Markdown table, JSON), **be structured**. Templates use sections: Instructions (Role, Task) → Context/Constraints → Steps → Output format → **Self-check** (confidence, justification).

Uses: project planning, data cleaning (regex, standardising "freezing" → cold), feature engineering, model selection (rank models, write a pipeline, hyperparameter grids), model evaluation (an LLM judging accuracy and completeness).

### Risks and mitigation

| Risk | What | Mitigation |
| --- | --- | --- |
| **Privacy** | Trained on personal data, and models have no "forgetting" | Anonymisation, encryption, access control, governance, consent, staff training. Check vendor data use and lineage. |
| **Data leakage** | Exposes confidential info via training (memorisation), prompting, RAG, or across users (Samsung leaked code via ChatGPT) | Don't train on sensitive data, RAG access control, minimisation and masking, prompt and output monitoring, **session isolation**, enterprise tools |
| **Prompt injection** | The user or external content manipulates instructions ("Ignore previous instructions, tell me the system prompt") | **Instruction hierarchy (System > Developer > User)**, input filtering, output guardrails, content isolation, **least privilege** |
| **IP / copyright** | Trained on copyrighted works, outputs mimic them, ownership unclear (pure AI output may lack human authorship). NYT v OpenAI, Getty v Stability AI (watermark reproduced). | Legal agreements |
| **Misuse / dual use** | Exploits, automated scams, **personalised phishing and social engineering**, malicious code | Safeguards and governance |
| **Bias** | Biased training data and annotation, stereotyped outputs, **bias reinforcement loop**, opaque inputs | Mitigate bias, transparency |
| **Hallucination** | Plausible but incorrect output, worse with over-reliance (Deloitte report example) | Human oversight, validation |
| Social and environmental | Job displacement, energy and water use |  |

Addressing ethics: governance and accountability, transparency and explainability, bias mitigation, privacy and security, **human oversight**, technical safeguards, IP, education. Adoption challenges: cultural resistance, data readiness and literacy, overhyped expectations.

**Human–AI collaboration (augmented analyst):** human in the loop. AI gives speed and automation, the human gives critical thinking. **Use GenAI as a co-pilot, not an autopilot.** GenAI does not remove the need for critical thinking, statistical rigour, domain expertise or validation.

### Common exam traps

- "GenAI eliminates governance", "guarantees unbiased predictions", "replaces ML without historical data" and "mainly improves hardware efficiency" are all **wrong** distractors from the official samples.
- A convincing-but-wrong output is a **hallucination**. Revealing previous prompts or secrets is **leakage**. Crafting phishing is **misuse**. Reproducing historical unfairness is **bias**.
- AI doesn't always learn (rule-based systems are AI but not ML).
- "Ignore previous instructions…" is **prompt injection**, not hallucination.

## Week 7: Data Understanding and Representation

### Datasets, objects, attributes

A **dataset** is a collection of **objects** (samples, observations, instances, records, tuples, vectors, which are the rows) described by **attributes** (variables, fields, features, dimensions, which are the columns). Each attribute has a set of possible values (e.g. eye colour ∈ {black, brown, …}).

**Types of datasets:** record (tabular, transactional), graph and network (WWW, social, molecules), ordered (video, time series, transaction sequences, genetic), spatial, image and multimedia.

**Data understanding questions:** what data is available, how much history, how much is labelled, is it relevant, what is its quality, can it be improved, is more data available, who is the data expert?

**Role of a variable** (in predictive models): **independent** = input or predictor. **Dependent** = target or outcome. In "What is the effect of diet on health?", diet is independent and **health is dependent**.

### Attribute (variable) types

| Type | Subtype | Definition | Examples | Meaningful operations |
| --- | --- | --- | --- | --- |
| **Categorical (qualitative)** | Nominal | Names, no order | Hair colour, marital status, occupation, **ID numbers, zip codes**, blood type | = ≠ (mode) |
| Binary | Nominal with only 2 states | Yes/no, 0/1 | = ≠ |  |
| Ordinal | Clear order. Category widths can differ. | Size S/M/L, grades, satisfaction ratings | = ≠  (median, mode) |  |
| **Numeric (quantitative)** | Interval | Equal, meaningful differences. **No true zero**, can be negative. | Temperature in °C or °F, calendar year/time of year, IQ scores | = ≠  + − |
| Ratio | **True zero** (absence), equal intervals, no negatives | Height, weight, income, distance, counts, age | All: = ≠  + − × ÷ |  |

Numeric attributes are also **continuous** (real numbers such as height or temperature, usually floats) or **discrete** (integers, countable, such as number of students).

**Properties:** nominal = distinctness. Ordinal = distinctness + order. Interval = + addition/difference. Ratio = + multiplication/division.

**Why types matter:** operations must be meaningful. Average hair colour makes no sense. Average T-shirt size (ordinal) is nonsensical. Average temperature across sensors is fine. The type also decides how you clean and pre-process.

**Likert scale** (strongly agree … strongly disagree): if the distances between items are not equal, it is **ordinal**. If they are equal, it is interval (discrete). Averaging is questionable because the data is only defined at the discrete values.

**Tricky cases:** ID numbers and zip codes are nominal even though they are digits. "Month" for monthly revenue is categorical.

### Data representation and good features

**Data representation** is an abstraction of raw data: meaningful features that represent the underlying information. Models learn from representations, not raw data. It turns a descriptive problem (e.g. "how similar?") into a mathematical one a computer can run.

- **Feature selection**: pick the attributes that best describe the data.
- **Feature engineering**: transform raw data into a suitable form, e.g. **derived features**: Delay = claim date − accident date, Season, Dark (0/1) for insurance fraud. Derived features are more useful for ML than raw dates.
- **Encoding**: categorical → numeric, e.g. **one-hot encoding** (Color ∈ {Red, Green, Blue} becomes Color_Red, Color_Green, Color_Blue; Red = [1,0,0]). Works well with few values and **no ordinal relationship**.
- **Dimensionality reduction**: remove redundant or irrelevant features.
- Features can be derived internally (average salary over 10 years, transactions per year) or from external sources (SES from postcode, weather from coordinates).
- **Long-narrow → short-wide**: one-hot encode Type and roll up to one row per account. **Roll-up**: aggregate transactions to household level (e.g. total sales per household).

### Set (Boolean) and vector representations

**Set representation:** an object is a set of terms, with **no order or frequency**. "To do is to be. To be is to do." → {to, do, is, be}.

**Vocabulary** = union of all terms. A **binary vector** has 1 if the term is present and 0 if not. With V = (to, do, is, be, not, or, I, am, what): d1 = (1,1,1,1,0,0,0,0,0), d2 = (1,0,0,1,1,1,1,1,1).

**Vector space representation:** each term or feature is a dimension, and an object is a point (vector) in that space. A **data matrix** is m objects × n attributes. **Document data**: term vectors (binary or counts).

### Similarity and distance formulas

**Jaccard coefficient** (sets / binary vectors): `J(A,B) = |A ∩ B| / |A ∪ B|`, from 0 to 1.

**Euclidean distance**: `dist(x,y) = √( Σ (x_k − y_k)² )`, unbounded above (minimum 0).

**Minkowski distance**: `dist = ( Σ |x_k − y_k|^r )^(1/r)`. **r = 1**: Manhattan / city block / L1 (Hamming for binary vectors = number of differing bits). **r = 2**: Euclidean. **r → ∞**: supremum / L∞ = max |x_k − y_k|. Don't confuse r with n (the number of dimensions).

**Cosine similarity**: `cos(x,y) = (x · y) / (‖x‖ ‖y‖)`, where ‖x‖ = √(Σ x_k²). Range −1 to 1: angle 0° → 1 (identical direction), 90° → 0 (nothing in common), 180° → −1 (opposite). It is the most used similarity in vector space (ElasticSearch default). For normalised vectors: dist² = 2(1 − cos).

**Dot product as similarity** (lecture example): B1 = [Blue, large] = [1,0,1,0] and B2 = [Blue, small] = [1,0,0,1] with one-hot encoding, so Sim = 1·1 + 0 + 0 + 0 = 1. B1 and B3 = [Red, small] = [0,1,0,1] give Sim = 0.

#### Worked example

d1 = (1,1,1), d2 = (1,0,0) on axes (to, is, do).

- Euclidean = √((1−1)² + (1−0)² + (1−0)²) = √2 ≈ 1.414
- Manhattan = 0 + 1 + 1 = 2. Supremum = 1.
- Cosine = (1·1 + 1·0 + 1·0) / (√3 · √1) = 1/√3 ≈ 0.577

**Jaccard example:** d1 = (1,1,1,1,0,1,0,0,0), d2 = (0,0,1,1,1,1,1,1,0). Both are 1 at positions 3, 4, 6, so the intersection is 3. Either is 1 at positions 1–8, so the union is 8. J = 3/8 = 0.375.

### Common exam traps

- Celsius temperature and IQ are **interval** (no true zero). Kelvin, height and income are ratio.
- Number of students and age in whole years are **discrete** numeric.
- Blood type is **nominal**. Satisfaction rating is **ordinal**.
- A nominal variable with only two values is binary.
- For Jaccard, positions where **both** are 0 are ignored (they're in neither set).
- Cosine ignores vector length (magnitude) and only uses the angle.
- Don't one-hot encode an ordinal variable if you want to keep its order. Ordinal encoding (1, 2, 3) keeps the order.

## Week 8: Exploratory Data Analysis

### What data exploration is

A **preliminary exploration** of the data to understand its characteristics: find patterns and trends, and identify and fix anomalies. Motivations: understand the data, **select the right tool** for pre-processing or analysis, ensure quality, help feature selection. The focus is on **summary statistics** and **visualisation**.

**Exploratory vs explanatory:** the data scientist explores the data (confirm and analyse). Explanatory work communicates to a reader (inform and persuade). Think about your audience.

**Feel for the data:** mean or mode, variance and SD per variable, the range of values, correlations, frequency distributions, then box plots, histograms and scatter plots as appropriate.

### Central tendency

**Mean** x̄ = (1/m) Σ xᵢ is the most common measure but is **sensitive to outliers**. **Median** = the middle value of the sorted data (average of the two middle values if m is even). It is **robust**.

**Lecture example:** (1, 4, 6, 10, 12) has mean = 33/5 = **6.6** and median = **6**. Change 12 to 14000: the median is still 6, but the mean = (1+4+6+10+14000)/5 = **2804.2**.

**Frequency** = percentage of time a value occurs. **Mode** = the most frequent value. Both are typically used for **categorical** data.

### Dispersion

- **Range** = max − min.
- **Population variance** σ² = (1/N) Σ (xᵢ − μ)². **Sample variance** s² = (1/(m−1)) Σ (xᵢ − x̄)².
- **Standard deviation** = √variance. It is **sensitive to outliers**.
- **Quartiles** (on sorted data): Q1 = 25% (median of the lower half), Q2 = median, Q3 = 75% (median of the upper half). **IQR = Q3 − Q1** is **not sensitive to outliers**.
- **Outlier rule:** outside [Q1 − 1.5·IQR, Q3 + 1.5·IQR].

#### Worked example: variance

Data 2, 4, 4, 4, 5, 5, 7, 9 (m = 8). Mean = 40/8 = 5. Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16, with sum = 32.

Population σ² = 32/8 = **4**, σ = 2. Sample s² = 32/7 ≈ **4.571**, s ≈ 2.138.

#### Worked example: quartiles and outliers

Data 2,2,4,4,4,4,5,5,5,6,6,7,7,7,8,8 (16 values). Lower half (first 8): Q1 = (4+4)/2 = **4**. Q2 = (5+5)/2 = **5**. Upper half (last 8): Q3 = (7+7)/2 = **7**. IQR = 3. Fences: 4 − 4.5 = −0.5 and 7 + 4.5 = 11.5, so there are no outliers.

Data 12, 14, 23, 36, 40, 42, 44, 61, 78 (9 values, median = 40 is excluded from the halves). Q1 = (14+23)/2 = 18.5, Q3 = (44+61)/2 = 52.5, IQR = 34. Upper fence = 52.5 + 51 = 103.5. Changing 78 to 100000 leaves the IQR unchanged.

### Distributions and skewness

- **Uniform**: every value in the range is equally likely. **Normal**: strong central tendency, symmetric.
- **Normal 68–95–99.7 rule:** μ±σ ≈ 68%, μ±2σ ≈ 95%, μ±3σ ≈ 99.7%.
- Probability distribution: each value's probability is in [0,1] and they sum to 1.
- **Symmetric**: tails of equal length.
- **Left (negatively) skewed**: longer tail toward **low** values. Typically **mean  median > mode**.
- Outliers often appear in the direction of the long tail.

**Reading skew from a box plot:** median closer to Q1 with a longer upper whisker or box part → right (positive) skew. Median closer to Q3 with a longer lower whisker → left (negative) skew.

### Summary statistics are not enough

**Anscombe's quartet**: four datasets with the same mean of x (9), variance of x (11), mean of y (7.50), variance of y (4.125), correlation (0.816), regression line y = 3 + 0.5x and R² (0.67), but completely different scatter plots. The **Datasaurus Dozen** makes the same point. **Always visualise.**

### Visualisation

- **Box plot**: five-number summary (min, Q1, median, Q3, max). The box spans Q1–Q3 (height = IQR), the median is a line inside, the whiskers extend to min and max (within 1.5·IQR), and outliers are shown as points. Good for **comparing groups** and spotting skew and outliers.
- **Histogram**: frequency distribution of **one numeric variable**. Values go in adjacent, non-overlapping bins and bar height = count. **Shape depends on the number of bins.** Histograms can show more than box plots: two different distributions can have the same box plot.
- **Scatter plot**: relationship between **two numeric variables**. Shows clusters, outliers and correlation: positive, negative, none (independent), perfect or imperfect linear, or non-linear.
- Bar chart or frequency table: categorical variables.
- Tools: Matplotlib (used in the unit), R, Plotly, D3.js. "Excel is not going to be your friend."

**Correlation ≠ causation** (official sample: chicken consumption vs US crude oil imports are positively correlated over 2007–2009 but not causal).

### Common exam traps

- With outliers, report the **median and IQR**, not the mean and SD.
- Sample variance divides by **m − 1**. Population variance divides by N.
- "Skewed left" = tail on the **left** = negatively skewed.
- The box plot whisker end is not always the absolute min or max: points beyond 1.5·IQR are drawn separately as outliers.
- The least variation in a box plot is the shortest box and whiskers. "Roughly half of India's values exceed S America's max" means checking whether S America's max sits at or near India's median.
- Two variables moving together over time are correlated, but that doesn't mean causation.
- The mean is not shown on a standard box plot, so you can't compare means directly from one.

## Week 9: Data Preparation for Modelling

### Why pre-process

"Good data preparation is key to producing valid and reliable ML models." **Garbage in, garbage out.** Poor quality costs the typical company 10–20% of revenue. With a poor-quality loan model, creditworthy people are denied and defaulters get loans. Data preparation takes about **60% of the time**, the most time-consuming step.

**Real-world data is dirty:**

- **Incomplete / missing**: equipment malfunction, deleted as inconsistent, misunderstanding, not considered important, no history kept.
- **Noisy**: random errors or extraneous data from faulty instruments, data entry, transmission, inconsistent naming.
- **Outliers**: objects very different from the rest. They can be **noise** (age = 200) or **valid** (a CEO's salary). Detecting them is itself a task (fraud, intrusion detection).
- **Inconsistent**: age 42 with birthday 1997, duplicates with different DOBs, rankings coded 1/2/3 in one half and A/B/C in the other.
- Redundant, fake or error-prone data.

### Major steps

1. **Data gathering, integration and selection**. Integration combines sources: schema integration and the **entity identification problem** (A.cust-id = B.cust-#), value conflicts (metric vs imperial units), **redundancy** (same attribute under different names, derived attributes), detected by correlation analysis: **χ² for nominal** attributes (larger = more related), **Pearson correlation for numeric** (>0 positive, 0 independent, <0 negative). Correlation ≠ causality.Selection: **active variables** are the inputs (avoid irrelevant, redundant and **leaky/false predictor** variables) and the target. **Supplementary variables** (ID, name, address) are used only for visualising and explaining.
2. **Data cleaning**: fill missing values, smooth noise, identify or remove outliers, resolve inconsistencies.
3. **Data transformation**: normalise, discretise, smooth.
4. **Data reduction**: feature selection and dimensionality reduction.
5. **Data partitioning**.

### Handling noise and outliers

- **Binning**: sort, partition into (equal-frequency) bins, then smooth by **bin means**, medians or **boundaries** (replace each value with the nearer of the bin's min and max).
- **Clustering**: points that don't belong to any cluster are outliers.
- **Regression**: smooth by fitting a function.
- **Combined computer and human inspection.**
- **Statistical**: z-score = (v − mean)/SD. Typically |z| > 3 means an outlier.

#### Worked example (lecture)

Data {4, 8, 15, 21, 21, 24, 25, 28, 34} → bins {4,8,15}, {21,21,24}, {25,28,34}.

**By means:** (4+8+15)/3 = 9, (21+21+24)/3 = 22, (25+28+34)/3 = 29, giving {9,9,9}, {22,22,22}, {29,29,29}.

**By boundaries:** 8 is closer to 4 (diff 4) than to 15 (diff 7), so it becomes 4: {4,4,15}. 21 is closer to 21 than to 24, so {21,21,24} is unchanged. 28 is closer to 25 (3) than to 34 (6): {25,25,34}.

### Missing value imputation

1. **Ignore (drop) the record**: easy, but loses data and can bias results if many values are missing.
2. Fill in **manually**: tedious and often infeasible.
3. **Global constant** ("unknown", a new class).
4. **Attribute mean** (numeric) or **majority value/mode** (categorical).
5. **Class-conditional mean**: the mean of samples in the same class.
6. **Most probable value** by inference (Bayesian formula, decision tree, regression).

No method is universally best. For a column **without outliers**, the **mean** is least likely to introduce bias (official sample). Zero or minimum values distort the distribution, and dropping rows loses information. With outliers or skew, use the **median**.

### Transformation: normalisation and discretisation

**Why:** regression and neural nets need numeric, normalised values. Decision trees and rule methods prefer categorical. Distance-based clustering needs numeric, scaled features. Transformation also improves quality and performance.

**Normalisation** rescales to a fixed range so features are comparable (e.g. 5,000 Covid cases in Australia vs India). It is **useful but not mandatory**.

| Method | Formula |
| --- | --- |
| **Min–max** | v' = (v − min)/(max − min) × (new_max − new_min) + new_min. For [0,1]: v' = (v − min)/(max − min) |
| **Z-score** | v' = (v − mean)/SD (no fixed range, can be negative) |
| **Decimal scaling** | v' = v / 10^j, with j the smallest integer such that max \|v'\| < 1 |

#### Worked example (official)

Min = 12,000, max = 98,000, mean = 54,000, SD = 16,000, v = 73,600.

- Min–max: (73,600 − 12,000)/(98,000 − 12,000) = 61,600/86,000 = **0.716**
- Z-score: (73,600 − 54,000)/16,000 = 19,600/16,000 = **1.225**
- Decimal scaling: max 98,000 needs 10⁵ = 100,000, so 73,600/100,000 = **0.736**

**Discretisation** turns numeric into categorical ranges. **Equal-width** binning: same range per bin (0–10, 10–20, …). **Equal-depth (frequency)** binning: same number of values per bin.

### Dimensionality reduction

**Distance concentration problem / curse of dimensionality:** as the number of dimensions grows, data becomes **sparse**, and the difference between the max and min pairwise distances shrinks. All points look about equally far apart, so **distance becomes meaningless**. Example: a document × term matrix with a huge vocabulary is extremely sparse.

**Purpose of reduction:** avoid the curse of dimensionality, reduce time and memory, allow easier visualisation, remove irrelevant features and noise. The reduced representation is much smaller but gives the same or similar results. Techniques: **PCA**, SVD, supervised and non-linear methods.

### Data partitioning

Split into **non-overlapping** subsets to estimate performance on **unseen data** and **detect and prevent overfitting** (the model does much better on training data than on validation data).

- **Training set**: learn the model (induction).
- **Validation set** (optional, recommended): tune hyperparameters and check for overfitting.
- **Test set**: final independent evaluation (deduction).

**Batch testing** (hold-out): reserve k% for training and (100−k)% for testing, e.g. 80/20. **N-fold cross-validation**: split into N disjoint folds, train on N−1 and test on the remaining one, repeat N times, and **report the average**. Repeated CV estimates variance. **Stratified CV** keeps class percentages the same.

**Random sampling** works for balanced data but can perform poorly on imbalanced data. **Stratified sampling** groups by class label and samples each group at the same percentage, so the class distribution is preserved. Use it for **imbalanced** data and small samples.

### Common exam traps

- "Pre-processing is the most time-consuming step" is **true**. "Normalisation is useful but not mandatory" is **true** (official sample: both true).
- Min–max uses **min and max**. Z-score uses **mean and SD**. Don't mix them.
- Smoothing by boundaries: each value goes to the **closer** of the bin min and max (ties go to the lower one by convention).
- An outlier isn't always an error (a CEO's salary is valid).
- In 10-fold CV each sample is used for testing **exactly once** and for training 9 times.
- Stratified (not random) sampling for imbalanced classes.
- A **leaky variable** (information not available at prediction time, or derived from the target) must be excluded.

## Week 10: Association Mining

### Concepts

**Association mining** (market-basket analysis) discovers interesting relationships between items in **transactional** data: items that imply the presence of other items in the **same transaction** (milk + cereal, chips + salsa). Applications: market baskets and cross-marketing, web click-streams, recommender systems, medical symptom–disease correlations. Frequent patterns are also used as derived features for classification and clustering.

- **Item**: a basic object (bread). **Itemset**: a set of items, order irrelevant. A **k-itemset** has k items.
- **Transaction**: (TID, itemset).
- **Association rule** X ⇒ Y (antecedent ⇒ consequent): X and Y are **disjoint**, Y is **not empty**. So A,B ⇒ B,C is invalid (B in both) and A,B ⇒ { } is invalid.
- Interesting rules are non-trivial, actionable and explainable. Association mining usually produces a **large number** of rules, many of them uninteresting.

### Measures (formulas)

| Measure | Formula | Meaning |
| --- | --- | --- |
| **Support** of itemset X | sup(X) = count(X) / N | Frequency |
| **Support** of rule X ⇒ Y | sup(X ∪ Y) = P(X and Y together) | How often the rule applies |
| **Confidence** X ⇒ Y | sup(X ∪ Y) / sup(X) = P(Y \| X) | Strength of the rule: how much Y depends on X |
| **Lift** (improvement) | conf(X ⇒ Y) / sup(Y) = sup(X ∪ Y) / (sup(X)·sup(Y)) | Strength compared with independence. **Lift is symmetric** (X⇒Y and Y⇒X have the same lift). |

**Lift > 1**: positive correlation. **= 1**: independent. **< 1**: negative correlation. Rules with very high or very low lift are interesting.

(X ∪ Y in the support formula means "transactions containing all items of X and of Y".)

#### Worked example (lecture: savings and cheque accounts, N = 10,000)

|  | CK = No | CK = Yes | Total |
| --- | --- | --- | --- |
| SVG = No | 500 | 3,500 | 4,000 |
| SVG = Yes | 1,000 | 5,000 | 6,000 |
| Total | 1,500 | 8,500 | 10,000 |

- sup(SVG ⇒ CK) = 5000/10000 = 50%. conf = 5000/6000 = **83%**.
- conf(CK ⇒ SVG) = 5000/8500 = 59%.
- conf(¬SVG ⇒ CK) = 3500/4000 = 87.5%, which is higher than 83%.
- Lift(SVG ⇒ CK) = 0.83 / 0.85 = **0.97 < 1**, so the two are negatively correlated even though the confidence is high.

#### Worked example: small dataset

Transactions: ABC, ACD, BCD, ADE, BCE (N = 5). A⇒D: sup = 2/5, conf = 2/3. C⇒A: sup = 2/5, conf = 2/4. B&C⇒D: sup = 1/5, conf = 1/3.

### Apriori algorithm

**Frequent itemset**: sup ≥ minsup. **Strong rule**: frequent and conf ≥ minconf.

- **Apriori subset property:** every subset of a frequent itemset is frequent.
- **Apriori pruning property:** every superset of an infrequent itemset is infrequent. This is the basis of the algorithm's efficiency.

**Two steps:** (1) find all frequent itemsets, (2) generate rules with enough confidence.

1. Scan and count 1-itemsets, keeping the frequent ones.
2. **Candidate generation:** join two frequent k-itemsets that share k−1 items (ABC + ABD → ABCD, but ABC + ADE are not joined). **Prune** any candidate with an infrequent subset.
3. Scan and count the candidates, keeping the frequent ones. Repeat until there are no candidates.

**Rule generation:** for each frequent itemset f and every non-empty proper subset s, output s ⇒ f∖s if sup(f)/sup(s) ≥ minconf. A frequent k-itemset gives **2^k − 2** candidate rules. All rules from the same itemset have the **same support**.

#### Worked example (lecture, minsup = minconf = 40%)

T1 {A,C,D}, T2 {A,B,C,D}, T3 {B,C}, T4 {A,D}, T5 {A,C}.

- C1: A 0.8, B 0.4, C 0.8, D 0.6. All frequent.
- C2 (6 candidates): AB 0.2, AC 0.6, AD 0.6, BC 0.4, BD 0.2, CD 0.4. Frequent: AC, AD, BC, CD.
- C3: join AC + AD → ACD (subsets AC, AD, CD are all frequent, so it is kept). ABC would need AB, which is infrequent, so it is not generated. BCD would need BD, which is infrequent, so it is not generated. sup(ACD) = 0.4, frequent.
- Total: 4 + 6 + 1 = **11 candidates**, 4 + 4 + 1 = **9 frequent itemsets**.
- From ACD: A ⇒ CD has conf 0.4/0.8 = 0.5 (strong). CD ⇒ A has conf 0.4/0.4 = 1.0.

**Official sample:** sup(A) = 0.6, sup(ABC) = 0.5, sup(ABCD) = 0.4. Both A ⇒ BCD and ABC ⇒ D have support 0.4. conf(A ⇒ BCD) = 0.4/0.6 = 0.67 and conf(ABC ⇒ D) = 0.4/0.5 = 0.8. Rules from ABCD with 3 antecedent items and 1 consequent item: ABC⇒D, ABD⇒C, ACD⇒B, BCD⇒A.

**Bottleneck:** **candidate generation and test**. There is one full database scan per level and a huge number of candidates (a 100-itemset implies 2¹⁰⁰ − 1 ≈ 1.27×10³⁰ subsets).

### FP-growth

- **No candidate generation.** It uses divide and conquer and grows long patterns from short ones.
- **Two phases:** (1) build an **FP-tree** by scanning the database **twice**. The first scan counts items and builds the frequency-descending **f-list**. The second scan inserts each transaction's frequent items, in f-list order, into the tree. (2) Mine the FP-tree recursively **without scanning the database again**.
- Advantages: a compressed database, only 2 passes, faster than Apriori especially at low support thresholds. Disadvantages: the tree **may not fit in memory**, it is expensive to build, and the algorithm is recursive.

### Sequential patterns

**Order matters**: temporal associations between events rather than items within one transaction (shopping sequences, click-streams, DNA). A sequence is an ordered list of **elements**, each element is a set of items (unordered inside), e.g. <a (abc) (ac) d (cf)>.

A **subsequence** keeps the order and takes subsets of elements: <a (bc) d c> and <(ab) c> are subsequences of <a (abc) (ac) d (cf)>. Algorithms: Agrawal and Srikant (1995), **GSP**. The Apriori property still holds: if S is infrequent, all its super-sequences are infrequent.

Example: within three months of buying a property, buyers purchase cookers, freezers and washing machines.

### Common exam traps

- Rule support is sup(X∪Y), **not** sup(X).
- Confidence divides by the support of the **antecedent**.
- High confidence ≠ interesting. Check lift (SVG ⇒ CK: conf 83% but lift 0.97).
- Lift measures the strength of the effect. "Association mining usually yields a small number of rules" is **false** (official sample).
- Count candidate itemsets **after** pruning. An itemset with an infrequent subset is not even a candidate.
- Join only k-itemsets that share k−1 items.
- FP-growth scans the database exactly twice and generates no candidates.

## Week 11: Classification (KNN, Decision Trees, Naïve Bayes)

### Machine learning overview

**ML** is a branch of AI that develops algorithms and statistical models so computers can **learn from data**, make predictions or decisions, and **improve with experience**.

- **Supervised**: labelled data, predict outputs for unseen inputs (classification, regression). Algorithms: regression, decision trees, random forest (an ensemble, which reduces overfitting), SVM (best separating hyperplane), k-NN, Naïve Bayes, neural networks.
- **Unsupervised**: unlabelled data, find structure (k-means, hierarchical, DBSCAN for arbitrary shapes, PCA, SVD, autoencoders).
- **Reinforcement**: learns by interacting with an environment and getting rewards or penalties.

**Classification**: supervised, predicts **discrete predefined classes**. **Binary** (spam / not spam), **multiclass** (dog/cat/bird, one label each), **multilabel** (a movie can be Action and Comedy). Data is an n × m matrix (n samples, m attributes) plus labels.

**Two-phase process:** (1) **model construction** (learning) on the training set, giving rules, a tree, formulae, probabilities or a network. (2) **Model usage**: test accuracy on a test set (the percentage of test samples classified correctly). If it is acceptable, classify new data. Example rule: IF rank = 'professor' OR years > 6 THEN tenured = 'yes'.

### K-nearest neighbours (KNN)

The simplest classifier. It uses the **training data itself as the classifier** and has **no training phase** (lazy learner). For a new object, find the **k most similar** training objects (e.g. by Euclidean distance) and assign the **majority class** among them.

**Assumption:** similar points belong to the same class. The result **depends on k**: in the lecture example, k = 3 gives class B and k = 6 gives class A.

### Decision trees

Each **internal node** is an attribute test, each **branch** is an attribute value, and each **leaf** is a **class label (the decision or prediction)**. Continuous attributes are discretised in advance.

**Build** greedily (no backtracking), **top-down, recursive, divide and conquer**. All samples start at the root. At each node pick the best attribute by a heuristic (information gain or Gini), partition, and recurse.

**Stop expanding node N when:** (1) all samples in N are in the same class (leaf with that class); (2) no unused attributes remain on the path (leaf with the **majority class** of N); (3) N has no samples (leaf with the **majority class of the parent**).

**Rules:** one IF-THEN rule per root-to-leaf path. Attribute tests along the path are ANDed and the leaf gives the class. The number of rules equals the number of leaves.

**Strengths:** understandable rules, handles numeric and categorical data, no parameter setting, simple. **Weaknesses:** computationally expensive growth (every split evaluated at each node), can **overfit**.

### Attribute selection: entropy and information gain

**Entropy** of a dataset D with k classes: `H(D) = − Σ pᵢ log₂ pᵢ`, where pᵢ = |Cᵢ,D|/|D|. 0 means pure (one class). 1 means maximally impure for 2 equal classes.

**Entropy after splitting on A** (weighted): `H_A(D) = Σ (|Dⱼ|/|D|) · H(Dⱼ)`.

**Information gain**: `Gain(A) = H(D) − H_A(D)`. **Choose the attribute with the highest gain.**

#### Worked example (official week 11 Q6)

Parent D: 70+, 30−. Split on A: left 20+/20−, right 50+/10−.

- H(D) = −(0.7 log₂0.7 + 0.3 log₂0.3) = 0.7(0.515) + 0.3(1.737) = **0.88**
- H(left) = −(0.5 log₂0.5 + 0.5 log₂0.5) = **1.0**
- H(right) = −(0.833 log₂0.833 + 0.167 log₂0.167) = 0.833(0.263) + 0.167(2.585) = **0.65**
- H_A(D) = (40/100)(1.0) + (60/100)(0.65) = 0.4 + 0.39 = **0.79**
- Gain(A) = 0.88 − 0.79 = **0.09**

**buys_computer example:** 9 yes / 5 no gives H(D) = 0.94. Splitting on age gives H_age = 0.694, so Gain(age) = 0.246. Gain(income) = 0.029, Gain(student) = 0.151, Gain(credit) = 0.048, so **age** is the root.

Useful logs: log₂0.5 = −1, log₂0.25 = −2, log₂0.75 ≈ −0.415, log₂0.6 ≈ −0.737, log₂0.4 ≈ −1.322, log₂(1/3) ≈ −1.585, log₂(2/3) ≈ −0.585. Remember log₂x = ln x / ln 2.

### Attribute selection: Gini index

`Gini(D) = 1 − Σ pᵢ²`. Lower is purer. The maximum is 1 − 1/C (0.5 for 2 classes).

`Gini_A(D) = Σ (|Dⱼ|/|D|) · Gini(Dⱼ)`. Reduction: `ΔGini(A) = Gini(D) − Gini_A(D)`. **Choose the attribute with the lowest Gini_A, i.e. the largest reduction.**

#### Worked example (official week 11 Q5)

100 samples: C1 = 50, C2 = 30, C3 = 20. p = 0.5, 0.3, 0.2. Gini = 1 − (0.25 + 0.09 + 0.04) = 1 − 0.38 = **0.62**.

#### Worked example (insurance HighRisk)

8 samples: 3 Yes, 5 No. Gini(D) = 1 − 0.375² − 0.625² = **0.47**.

Age split: ≤25 has 3 Yes / 2 No, Gini = 1 − 0.36 − 0.16 = 0.48. >25 has 0 Yes / 3 No, Gini = 0. Gini_Age = (5/8)(0.48) + (3/8)(0) = 0.30. Reduction = 0.17.

CarType split: Sedan 1 Yes / 3 No gives 0.375. Truck 1/1 gives 0.5. Sports 1/1 gives 0.5. Gini_CarType = (4/8)(0.375) + (2/8)(0.5) + (2/8)(0.5) = 0.44. Reduction = 0.03.

So **Age** is the root. Rules: Age > 25 → low risk. Age ≤ 25 and Sedan → low risk. Age ≤ 25 and Truck → high. Age ≤ 25 and Sports → high.

**IG vs Gini:** they usually give similar trees. IG uses logs (more computation) and favours attributes with many unique values. Gini uses squares (cheaper).

### Naïve Bayes

A statistical classifier based on **Bayes' theorem**: `P(H|X) = P(X|H) · P(H) / P(X)`. P(H) = prior, P(X|H) = likelihood, P(H|X) = posterior. It is incremental (each sample updates the probabilities) and serves as a standard of optimal decisions.

Classify X to the class Cᵢ that **maximises P(X|Cᵢ) · P(Cᵢ)** (P(X) is the same for all classes and can be ignored).

**Naïve assumption:** attributes are **conditionally independent given the class**, so `P(X|Cᵢ) = Π P(xⱼ|Cᵢ)`. Categorical: P(xⱼ|Cᵢ) = (count of class Cᵢ with value xⱼ)/|Cᵢ|. Continuous: Gaussian. P(Cᵢ) = |Cᵢ|/|D|.

#### Worked example (lecture)

X = (age ≤ 30, income = medium, student = yes, credit = fair). P(yes) = 9/14 = 0.643, P(no) = 5/14 = 0.357.

- P(X|yes) = (2/9)(4/9)(6/9)(6/9) = 0.222 × 0.444 × 0.667 × 0.667 = **0.044**. × 0.643 = **0.028**.
- P(X|no) = (3/5)(2/5)(1/5)(2/5) = 0.6 × 0.4 × 0.2 × 0.4 = **0.019**. × 0.357 = **0.007**.
- 0.028 > 0.007, so the prediction is **yes**.

**Zero problem:** one zero conditional probability makes the whole product 0. Fix it with the **Laplacian correction**: add 1 to each count. With 1000 samples (990 medium, 10 high, 0 low): P(low) = 1/1003, P(medium) = 991/1003, P(high) = 11/1003.

**Pros:** easy, efficient on large data, works well in high dimensions. **Cons:** the independence assumption is often unrealistic and it struggles with correlated attributes.

### Evaluation metrics

Evaluate with N-fold CV (average of N runs). Criteria: effectiveness (accuracy), efficiency (speed and memory), cost.

**Numeric prediction:** `MSE = Σ(yᵢ − ŷᵢ)²/|T|`, `RMSE = √MSE`.

**Confusion matrix** (rows = actual, columns = predicted): TP, FN / FP, TN. Correct = the diagonal.

- **Precision** = TP/(TP + FP): of the predicted positives, how many are right.
- **Recall** = TP/(TP + FN): of the actual positives, how many were found.
- **F-score** = 2·P·R/(P + R).
- **Accuracy** = (TP + TN)/(TP + TN + FP + FN).

**Worked example:** TP = 40, FN = 10, FP = 20, TN = 130. Precision = 40/60 = 0.667. Recall = 40/50 = 0.80. F = 2(0.667)(0.8)/(1.467) = 0.727. Accuracy = 170/200 = 0.85.

### Common exam traps

- A leaf is a class label, not a condition (that is an internal node). It is never a cluster centre.
- Naïve Bayes assumes **conditional independence**, not normality and not dependence.
- KNN has no training phase. Its prediction can change with k.
- IG: choose the **highest**. Gini_A: choose the **lowest** (largest reduction).
- Weight child impurities by the child's share of samples.
- Precision divides by **predicted** positives. Recall divides by **actual** positives.
- When extracting rules, list every leaf. A branch labelled "Low, High" means "Low or High".

## Week 12: Clustering (K-means, K-medoids, Hierarchical)

### Concepts

A **cluster** is a group of objects that are **similar within** the cluster and **dissimilar to other clusters**. **Clustering** is **unsupervised**: it finds a segmentation structure in **unlabelled** data (no predefined classes). Data is an n × m matrix and the algorithms rely on similarity or distance.

**Similarity and distance:**

- Euclidean: √Σ(x₁ⱼ − x₂ⱼ)². Cosine: x₁·x₂ / (‖x₁‖‖x₂‖).
- **Binary, Jaccard:** `q / (q + r + s)`. q = attributes that are 1 in both, r = 1 in X₁ only, s = 1 in X₂ only. Matches where both are 0 are ignored.
- **Categorical, mismatch distance:** `(p − m) / p`. m = number of matching attributes, p = total attributes.

**Good clustering** is **accurate** (high **intra**-cluster similarity, low **inter**-cluster similarity), **robust** (noise and outliers) and **scalable**. Its quality depends on the similarity measure and the implementation.

### Silhouette coefficient

For object i: a(i) = average distance to the **other points in its own cluster**. b(i) = the **minimum** over the other clusters of the average distance to that cluster's points (the nearest neighbouring cluster).

`s(i) = (b(i) − a(i)) / max(a(i), b(i))`, ranging from −1 to 1.

- s ≈ 1: well matched to its own cluster, far from its neighbours.
- s ≈ 0: on or near the boundary between two clusters.
- s < 0: probably assigned to the wrong cluster.

The overall score is the mean s(i) over all points. Higher means better-separated clusters.

**Example:** a = 2, b = 5 gives s = (5 − 2)/5 = 0.6. a = 4, b = 3 gives s = (3 − 4)/4 = −0.25, so the point is likely misassigned.

### K-means

**Centroid** = the mean of the cluster's objects (attribute by attribute). It does not have to be an actual data point.

**Algorithm:** (1) choose k objects arbitrarily as the initial centroids. (2) Assign each object to its nearest centroid. (3) Recompute the centroids as the means. (4) Repeat 2–3 until the partition doesn't change.

**Objective:** minimise the squared error `Σᵢ Σ_{X∈Cᵢ} dist(X, Aᵢ)²` (MSE = that sum divided by n). The intra-cluster distance should be small.

#### Worked example (lecture)

A(1,1), B(2,1), C(4,5), D(5,5), E(5,6), F(8,5). k = 3, initial centroids C, D, E.

- Iteration 1: A → C (distance 5 vs 5.7 and 6.4). B → C (4.5). F → D (3 vs 4 and 3.2). This gives c1 = {A,B,C}, c2 = {D,F}, c3 = {E}.New centroids: c1 = ((1+2+4)/3, (1+1+5)/3) = (2.33, 2.33). c2 = (6.5, 5). c3 = (5, 6).
- Iteration 2: c1 = {A,B}, c2 = {F}, c3 = {C,D,E}. Centroids (1.5, 1), (8, 5), (4.67, 5.33).
- Iteration 3: no change, so stop. MSE fell 9 → 1.8 → 0.3.

**Properties:** k must be **pre-specified**. It **converges to a local optimum** (no global guarantee). The result **depends on the initial centroids**. Time is **O(tkn)**, so it is efficient. It is **sensitive to outliers** (they pull the mean) and not ideal for **non-spherical** clusters.

### K-medoids

Uses a **medoid**: an **actual object**, the most centrally located one in the cluster, instead of the mean.

Start from k medoids, assign objects to the nearest medoid, then for each medoid Aᵢ and non-medoid H compute the **swapping cost** `S(Aᵢ, H) = E' − E` (the new total intra-distance minus the current one). Swap if S < 0 (it reduces the total distance), and repeat until nothing changes.

**Pros:** **more robust to outliers** than k-means, and the centres are **interpretable** (real objects). **Cons:** doesn't scale to large data, still needs k, sensitive to initialisation.

**Primary difference (official sample):** k-means updates a centre as the **mean** of its objects. K-medoids picks an **actual object** as the centre.

### Hierarchical clustering

- **Agglomerative (bottom-up, AGNES):** start with n singleton clusters and repeatedly **merge the closest pair**, updating the distance matrix, until one cluster remains (or a termination condition such as the desired k is met).
- **Divisive (top-down, DIANA):** start with all objects in one cluster and split repeatedly until every object is alone or a condition is met.
- The result is a **dendrogram** (hierarchy tree). Cutting it at a level gives clusters.

**Inter-cluster distance:**

- **Single link** = the **shortest** distance between any two points in the two clusters.
- **Complete link** = the **greatest** distance.
- **Average link** = the **average** of all pairwise distances.

**Example:** {A(1,1), B(2,1)} and {C(4,5), D(5,5)}. The pairwise distances are AC = 5, AD = 5.66, BC = 4.47, BD = 5. Single = 4.47, complete = 5.66, average = 20.13/4 = 5.03.

AGNES with single link on A–F merges A+B (1), C+D (1), then +E (1), then +F (3), then the AB group (4.47).

**Pros:** simple, an informative hierarchy, **deterministic** (no random initialisation), **no need to pre-specify k**. **Cons:** merges and splits **cannot be undone**, sensitive to outliers, at least **O(n²)** so it doesn't scale.

### Common exam traps

- K-means **is** sensitive to the initial centroids, **needs k**, does **not** guarantee a global optimum, and does **not** work for every cluster shape. (Official Q1: "needs to pre-specify the number of clusters" is the true one.)
- A k-means centroid can be a point that isn't in the data. A medoid is always a real object.
- Hierarchical clustering doesn't need k up front and is deterministic. K-means is neither.
- Single link = minimum, complete link = maximum.
- Silhouette uses the **nearest other** cluster for b, and divides by the **max** of a and b.
- Clustering is unsupervised. Classification uses predefined labels.

### 📄 One-page formula sheet (all weeks)

#### Week 3: Fairness

Demographic parity: P(Ŷ=1|A=a) = P(Ŷ=1|A=b) · Equal opportunity: equal TPR, i.e. P(Ŷ=1|Y=1,A) · Equalised odds: equal TPR and FPR · Predictive parity: equal PPV and NPV  

Disparate impact DI = rate_unpriv / rate_priv, and DI < 0.8 is flagged (80% rule) · Imbalance ratio = majority / minority

#### Week 4: GDPR

6 lawful bases: Consent, Contract, Legal obligation, Vital interests, Public task, Legitimate interests · 7 principles: Lawful/fair/transparent, Purpose limitation, Minimisation, Accuracy, Storage limitation, Integrity and confidentiality, Accountability · 8 rights: Informed, Access, Rectification, Erasure, Restrict, Portability, Object, Automated decisions · Maximum fine €20M or 4% of global turnover · AU Privacy Act 1988: 13 APPs, OAIC, $50M

#### Week 7: Similarity and distance

Jaccard J = |A∩B| / |A∪B| = q/(q+r+s) · Euclidean = √Σ(xₖ−yₖ)² · Minkowski = (Σ|xₖ−yₖ|^r)^(1/r): r=1 Manhattan, r=2 Euclidean, r→∞ max|xₖ−yₖ| · Cosine = x·y / (‖x‖‖y‖), where ‖x‖ = √Σxₖ² · Categorical distance = (p − m)/p

#### Week 8: Summary statistics

Mean x̄ = Σx/m · Population σ² = Σ(x−μ)²/N · Sample s² = Σ(x−x̄)²/(m−1) · SD = √var · IQR = Q3 − Q1 · Outlier if < Q1 − 1.5·IQR or > Q3 + 1.5·IQR · Normal: ±1σ 68%, ±2σ 95%, ±3σ 99.7% · Right skew: mean > median > mode. Left skew: mean < median < mode.

#### Week 9: Normalisation

Min–max v' = (v−min)/(max−min)·(new_max−new_min) + new_min · Z-score v' = (v − μ)/σ, with |z| > 3 an outlier · Decimal scaling v' = v/10ʲ, the smallest j with max|v'| < 1 · Binning smoothing by bin means or by the nearest bin boundary

#### Week 10: Association

sup(X⇒Y) = count(X∪Y)/N · conf(X⇒Y) = sup(X∪Y)/sup(X) · Lift = conf(X⇒Y)/sup(Y) = sup(X∪Y)/(sup(X)·sup(Y)): >1 positive, =1 independent, <1 negative · A k-itemset gives 2ᵏ − 2 rules · Join k-itemsets sharing k−1 items and prune candidates with infrequent subsets

#### Week 11: Classification

Entropy H(D) = −Σ pᵢ log₂pᵢ · H_A(D) = Σ(|Dⱼ|/|D|)H(Dⱼ) · Gain(A) = H(D) − H_A(D), pick the max · Gini(D) = 1 − Σpᵢ² · Gini_A(D) = Σ(|Dⱼ|/|D|)Gini(Dⱼ), pick the min (max ΔGini = Gini(D) − Gini_A(D))  

Naïve Bayes: choose the max of P(Cᵢ)·Π P(xⱼ|Cᵢ). P(Cᵢ) = |Cᵢ|/|D|. Laplace: (count+1)/(n + #values)  

Precision = TP/(TP+FP) · Recall = TP/(TP+FN) · F = 2PR/(P+R) · Accuracy = (TP+TN)/all · MSE = Σ(y−ŷ)²/n · RMSE = √MSE  

log₂ values: 0.5 → −1, 0.25 → −2, 0.75 → −0.415, 0.6 → −0.737, 0.4 → −1.322, 1/3 → −1.585, 2/3 → −0.585, 0.8 → −0.322, 0.2 → −2.322, 0.7 → −0.515, 0.3 → −1.737

#### Week 12: Clustering

Centroid = mean of members · SSE = ΣΣ dist(X, Aᵢ)² · Silhouette s = (b − a)/max(a, b), from −1 to 1 · Single link = min distance, complete = max, average = mean · K-means is O(tkn). Hierarchical is O(n²).
