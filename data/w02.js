/* Week 2 — Data Ethics */
QB.addWeek({
  week: 2,
  title: "Data Ethics",
  notes: [
    { h: "Ethics and data ethics", html: `
<p><b>Ethics</b> is the branch of philosophy that judges what is right and wrong in human behaviour. Ethical questions are <b>context-dependent</b> and have no single answer. "How do I build a neural network to classify bird calls?" is a <i>technical</i> question. "Should we build a system that predicts gender identity from faces?" is an <i>ethical</i> one.</p>
<p><b>Data ethics</b> is the branch of ethics that studies moral problems related to <b>data</b> (generation, recording, curation, processing, dissemination, sharing, use), <b>algorithms</b> (AI, ML, robots) and the <b>practices</b> around them (responsible innovation, programming, hacking, professional codes). Its aim is to support morally good solutions. It should be <b>proactive</b> and considered at every step.</p>
<p>The technical side of data science is about what we <b>could</b> do. The ethical side is about what we <b>should</b> do. <b>You can't outsource ethics</b>: responsibility stays with the people who build, deploy or use a system, so you cannot say "the algorithm did it" or "I followed policy".</p>
<p>"The problem is not with the algorithms, it's with the data we give them" (rubbish in, rubbish out). Algorithms simplify and <b>amplify</b> our biases. Example: dermatology deep learning that works well only on lighter skin.</p>` },
    { h: "Three major ethical frameworks", html: `
<table><tr><th>Framework</th><th>An action is right iff…</th><th>Focus</th><th>Drawback</th><th>Trolley problem</th></tr>
<tr><td><b>Virtue ethics</b></td><td>it is what a person of good character (a virtuous agent) would do in the circumstances</td><td>Character traits needed to flourish: compassion, courage, wisdom, honesty</td><td>Vague guidance</td><td>Depends on what a virtuous person would do</td></tr>
<tr><td><b>Deontology</b> (duty-based)</td><td>it follows moral rules, principles or duties</td><td>Rights and duties regardless of outcome</td><td><b>Rigid</b></td><td>Don't pull the lever, because "do not kill" is a rule</td></tr>
<tr><td><b>Consequentialism / Utilitarianism</b></td><td>it promotes the best consequences (the greatest good for the greatest number)</td><td>Weigh costs and benefits</td><td><b>Hard to predict consequences</b></td><td>Pull the lever: sacrifice 1 to save 5</td></tr></table>
<p><b>Exam pattern (sample short answer):</b> for an AI system that is efficient overall but may wrongly deny some vulnerable people, <b>utilitarianism most likely supports</b> deployment (net benefit), <b>deontology most likely opposes</b> it (duty to protect each individual's rights), and virtue ethics is balanced (support only with safeguards, transparency and human oversight).</p>` },
    { h: "Major ethical concerns in data science", html: `
<ul>
<li><b>Privacy</b>: ubiquitous collection, weak informed consent, profiling and tracking, third-party sharing. Your data is being sold.</li>
<li><b>Algorithmic bias / fairness</b>: biased data is perpetuated and amplified.</li>
<li><b>Transparency</b>: opaque "black box" processes.</li>
<li><b>Accountability</b>, <b>Security</b> (breaches), <b>Consent and control</b>.</li>
</ul>
<p>The Good (healthcare, safety, innovation, social good), the Bad (bias, black boxes, breaches, manipulation) and the Creepy (surveillance, micro-targeting, predictive profiling without consent).</p>` },
    { h: "Case studies (match each to its main concern)", html: `
<table><tr><th>Case</th><th>Main concern</th><th>Lesson</th></tr>
<tr><td>Facebook–Cambridge Analytica (up to 87M profiles harvested through a quiz app, political micro-targeting)</td><td>Privacy breach, no informed consent, manipulation of opinion</td><td>Transparency and consent, stricter governance. Facebook then applied GDPR worldwide.</td></tr>
<tr><td>Amazon hiring algorithm (trained on 10 years of male-dominated resumes, downgraded "women's")</td><td>Discrimination, inadequate testing</td><td>Diverse datasets, continuous auditing, human oversight</td></tr>
<tr><td>Facial recognition and darker skin (error up to 34% higher for dark-skinned females)</td><td>Discrimination, inadequate testing</td><td>Diverse datasets, monitoring and audits</td></tr>
<tr><td>British Airways 2018, Facebook 533M leak 2021, QUT 2022 cyber attack</td><td>Data security</td><td>Protect stored data</td></tr>
<tr><td>Uber "God mode" (employees tracked celebrities and ex-partners)</td><td>Data privacy</td><td>Understand app trade-offs and terms</td></tr>
<tr><td>Apple Card credit limits (men got higher limits than wives)</td><td><b>Transparency</b>. Investigation found no deliberate or disparate-impact discrimination.</td><td>Lenders cannot consider sex or gender</td></tr></table>` },
    { h: "Benefits, harms, stakeholders", html: `
<p>Harms and benefits are <b>ethically significant</b> when they affect people's chances of living well and flourishing together.</p>
<p><b>Three ethically significant benefits:</b> (1) increase understanding of the world so we act more intelligently; (2) improve the function of social, institutional and economic systems; (3) tailor actions to be more effective for specific individuals, groups and circumstances.</p>
<p><b>Three ethically significant harms:</b> (1) compromise <b>privacy and security</b> (reputations, livelihoods, even fatal); (2) harm <b>fairness and justice</b>; (3) obscure <b>transparency</b> (seeing how systems work) and limit <b>autonomy</b> (steering your own life).</p>
<p><b>Stakeholders:</b> data subjects, data scientists (if you work with the data you are a stakeholder too, because your reputation is at stake), engineers and IT, business leaders, regulators, end users, marginalised and vulnerable groups, employees, future generations.</p>` },
    { h: "Key ethical principles and frameworks", html: `
<p><b>Beneficence</b> (do good), <b>non-maleficence</b> (do no harm), <b>fairness/justice</b>, <b>autonomy/consent</b>, <b>privacy</b>, <b>transparency</b>, <b>accountability</b>, <b>accuracy and quality</b>, <b>security</b>. The first four come from bioethics (Beauchamp and Childress). Principles can <b>conflict</b>: privacy vs research, fairness vs accuracy, transparency vs IP or security.</p>
<p><b>Regulations and frameworks:</b> data protection (EU GDPR, California CCPA), AI (OECD AI Principles, UNESCO, EU AI Act, NY hiring-AI bias law), platforms (EU Digital Services Act).</p>
<p><b>Working ethically:</b> adopt an ethical framework, detect and mitigate bias (fairness-aware ML, audits), train staff, update guidelines regularly, ensure transparency through external audits.</p>` },
    { h: "Data ethics in Australia and Indigenous data", html: `
<ul>
<li>Australia must balance data innovation with privacy protection (e.g. the 2016 Census DDoS incident).</li>
<li><b>Privacy Act 1988</b> is the cornerstone law. The <b>Consumer Data Right (CDR)</b> gives control over data in banking and telecoms. <b>Australia's AI Ethics Principles are entirely voluntary.</b></li>
<li>The whole-of-government <b>Data Ethics Framework</b> rests on the <b>TRI principles</b>: <b>Transparency</b> (clear purpose, openness, traceable lineage and explainability), <b>Respect</b> (engage those affected, fairness, manage bias), <b>Integrity</b> (use consistent with purpose and legal authority, comply with law and Privacy Principles, stewardship).</li>
<li><b>Indigenous data</b>: data generated <b>by, about or for</b> Indigenous peoples, collectively or individually.</li>
<li><b>Indigenous Data Sovereignty (IDS)</b>: the right of Indigenous peoples to exercise <b>ownership</b> over Indigenous data (creation, collection, access, analysis, interpretation, management, dissemination, reuse).</li>
<li><b>Indigenous Data Governance</b>: the right to autonomously decide what, how and why Indigenous data are collected, accessed and used.</li>
<li><b>CARE principles</b>: <b>C</b>ollective benefit, <b>A</b>uthority to control, <b>R</b>esponsibility, <b>E</b>thics. These are people and purpose oriented. <b>FAIR</b> (Findable, Accessible, Interoperable, Reusable) is technical. FAIR asks "<i>can</i> it be reused?" and CARE asks "<i>should</i> it, and who decides?"</li>
<li><b>Framework for Governance of Indigenous Data</b> (APS), four guidelines: <b>Partner</b> with Aboriginal and Torres Strait Islander people, <b>Build data-related capabilities</b>, <b>Provide knowledge of data assets</b>, <b>Build an inclusive data system</b>.</li>
<li><b>AIATSIS Code of Ethics</b> (2020), four principles: <b>Indigenous self-determination, Indigenous leadership, Impact and value, Sustainability and accountability</b>. Its core value is integrity.</li>
<li><b>UNDRIP</b> (UN 2007) includes <b>Free, Prior and Informed Consent (FPIC)</b>.</li>
<li>Best practice across the Indigenous data lifecycle: involve Indigenous peoples from conceptualisation, obtain FPIC in a culturally safe way, give easy access, engage them in analysis and interpretation, and partner on dissemination.</li>
</ul>` },
    { h: "Common exam traps", html: `
<ul>
<li>"Greatest good for the greatest number" or "sacrifice 1 to save 5" → <b>utilitarian</b>. "Rules or duties regardless of outcome" → <b>deontology</b>. "What would a person of good character do" → <b>virtue</b>.</li>
<li>Indigenous data scenarios: the right answer is almost always <b>partner with Indigenous communities from the outset</b> on ownership, access and use. Generic consent forms, separate storage without consultation, or de-identification alone are not enough.</li>
<li>Technically FAIR data can still violate CARE.</li>
<li>Australia's AI Ethics Principles are <b>voluntary</b>, not law.</li>
<li>Apple Card was a <b>transparency</b> issue. Investigators found no evidence of deliberate discrimination.</li>
</ul>` }
  ],
  questions: [
    { t: "Ethical frameworks",
      q: "A data team argues: <i>\"Deploying this predictive policing model is justified because it will reduce overall crime for the majority, even if a few individuals are wrongly flagged.\"</i> Which ethical framework does this reasoning reflect?",
      o: ["Virtue ethics", "Deontology (duty-based ethics)", "Consequentialism (utilitarianism)", "Indigenous data sovereignty"],
      a: 2,
      s: "Justifying an action by its overall net benefit to the majority is utilitarian reasoning.",
      c: "Utilitarianism: an action is right if and only if it promotes the best consequences, the greatest good for the greatest number. It weighs costs against benefits. Its drawback is that consequences are hard to predict.",
      w: ["Wrong: virtue ethics asks what a person of good character would do, not what produces the best total outcome.", "Wrong: deontology would object that wrongly flagging innocent people breaks a duty to treat each person justly, whatever the overall benefit.", "Correct: weighing majority benefit against harm to a few is classic utilitarian cost-benefit reasoning.", "Wrong: that is a data-governance principle, not an ethical framework."] },

    { t: "Ethical frameworks",
      q: "Which statement about the three major ethical frameworks is <b>NOT</b> true?",
      o: ["Virtue ethics: an action is right if it is what a virtuous agent would do in the circumstances.", "Deontology: an action is right if it accords with moral rules or duties. A drawback is that it can be rigid.", "Utilitarianism: a drawback is that consequences can be hard to predict.", "Deontology would pull the lever in the trolley problem because saving five lives maximises overall good."],
      a: 3,
      s: "Maximising overall good is utilitarian reasoning. Deontology usually would not pull the lever.",
      c: "Trolley problem: utilitarianism pulls the lever (5 > 1). Deontology does not, because actively killing an innocent violates a duty. Virtue ethics depends on what a compassionate, wise person would do.",
      w: ["True: this is the lecture's definition of virtue ethics.", "True: rigidity is the stated drawback of duty-based ethics.", "True: unpredictability of outcomes is the stated drawback of consequentialism.", "NOT true, so this is the answer: it gives a utilitarian justification and wrongly attributes it to deontology."] },

    { t: "Ethical frameworks",
      q: "A government AI system will speed up aged-care allocation for most applicants but may wrongly deny some vulnerable seniors. Which framework is <b>most likely to oppose</b> deployment?",
      o: ["Utilitarianism, because it focuses on aggregate benefit", "Deontology, because the agency has a duty to protect each individual's rights", "Virtue ethics, because it always rejects technology", "None, because all frameworks would support deployment"],
      a: 1,
      s: "Deontology stresses duties and rights regardless of overall benefit, so wrongly denying individuals is unacceptable.",
      c: "This is the week 13 sample short-answer pattern. Utilitarianism most likely supports deployment (net social benefit). Deontology most likely opposes it (duty to each person). Virtue ethics is balanced and supports deployment only with safeguards and human oversight.",
      w: ["Wrong: utilitarianism is the framework <i>most likely to support</i> deployment.", "Correct: deontology objects to violating any individual's right to fair treatment, even for majority gain.", "Wrong: virtue ethics does not reject technology. It asks whether the agency acts with compassion and responsibility, and might support deployment with safeguards.", "Wrong: the frameworks reach different verdicts here."] },

    { t: "Data ethics definition",
      q: "\"You can't outsource ethics\" means that:",
      o: ["Ethics can only be studied by in-house staff.", "Ethical responsibility for a data system's harms stays with the people who build, deploy or use it. It cannot be handed to a policy or an algorithm.", "Companies should not hire external ethics auditors.", "Ethics is only a concern for legal teams."],
      a: 1,
      s: "You can delegate tasks but not moral responsibility.",
      c: "If a facial recognition system causes a wrongful arrest, the blame cannot be shifted to 'the system'. People who create, implement or use algorithms remain accountable.",
      w: ["Wrong: the phrase is about responsibility, not who studies ethics.", "Correct: humans must make and own ethical decisions.", "Wrong: external audits are recommended by the lecture as a transparency practice.", "Wrong: ethics is everyone's responsibility, not just legal's."] },

    { t: "Benefits and harms",
      q: "According to the lecture, which is <b>NOT</b> one of the three categories of ethically significant <b>harms</b> of data?",
      o: ["Compromising privacy and security", "Harming the fairness and justice with which we are treated", "Obscuring transparency and limiting autonomy", "Increasing the computational cost of data storage"],
      a: 3,
      s: "Computational cost is not an ethical harm, because it does not affect people's chances of living well.",
      c: "Harms and benefits become ethically significant when they affect people's chances of having a good life and flourishing in society. The three harm categories are privacy and security, fairness and justice, transparency and autonomy.",
      w: ["This is a listed harm (damage to reputations, livelihoods, even fatal).", "This is a listed harm.", "This is a listed harm. Transparency = seeing how systems work. Autonomy = steering your own life.", "Correct answer: a technical or financial cost, not an ethically significant harm."] },

    { t: "Case studies",
      q: "Match each case to its <b>primary</b> ethical concern:<br>1. Facebook–Cambridge Analytica  2. Amazon hiring algorithm  3. Apple Card credit limits  4. British Airways website attack<br>(i) Transparency  (ii) Data security  (iii) Privacy/consent and manipulation  (iv) Discrimination/bias",
      o: ["1-(iii), 2-(iv), 3-(i), 4-(ii)", "1-(iv), 2-(iii), 3-(ii), 4-(i)", "1-(iii), 2-(i), 3-(iv), 4-(ii)", "1-(ii), 2-(iv), 3-(i), 4-(iii)"],
      a: 0,
      s: "CA = privacy, consent, manipulation. Amazon = bias from male-dominated data. Apple Card = transparency. BA = security breach.",
      c: "The lecture labels each case with its ethical concern. Apple Card is a trap: the regulator found <b>no</b> evidence of deliberate or disparate-impact discrimination, only deficiencies in <b>transparency</b> and customer service.",
      w: ["Correct: every pairing matches the lecture.", "Wrong: Amazon is bias, not privacy, and BA is security, not transparency.", "Wrong: Amazon is bias. Apple Card was officially a transparency issue, not proven discrimination.", "Wrong: Cambridge Analytica was primarily privacy, consent and manipulation, not a security breach of stored data."] },

    { t: "Case studies",
      q: "Amazon's hiring algorithm penalised resumes containing the word \"women's\". According to the lecture, the <b>root cause</b> was:",
      o: ["A coding bug in the ranking function", "Historical training data dominated by male resumes, so the model learned existing bias", "Too few computational resources", "Applicants formatting their resumes incorrectly"],
      a: 1,
      s: "The problem is not the algorithm but the data it learns from.",
      c: "Algorithms simplify and <i>amplify</i> associations, biases and stereotypes in their training data. Lessons: diverse datasets, continuous monitoring and auditing, human oversight.",
      w: ["Wrong: the model behaved as designed on biased data.", "Correct: 10 years of male-dominated resumes taught the model to downgrade women.", "Wrong: resources are irrelevant to the bias.", "Wrong: formatting has nothing to do with gendered outcomes."] },

    { t: "Ethical principles",
      q: "Consider the statements:<br>A. Beneficence means \"do good\".<br>B. Non-maleficence means \"maximise profit while staying legal\".<br>C. Accountability means organisations take responsibility for ethical lapses.<br>D. Ethical principles never conflict with each other.<br>Which are true?",
      o: ["A and C", "A and B", "C and D", "A, C and D"],
      a: 0,
      s: "A and C are true. Non-maleficence means 'do no harm', and principles can conflict (e.g. fairness vs accuracy).",
      c: "Key principles: beneficence, non-maleficence, fairness/justice, autonomy/consent, privacy, transparency, accountability, accuracy and quality, security. They can conflict: privacy vs research benefit, fairness vs accuracy, transparency vs IP or security.",
      w: ["Correct: both definitions match the lecture.", "Wrong: B is false because non-maleficence is 'do no harm'.", "Wrong: D is false.", "Wrong: D is false. The lecture explicitly lists conflicts between principles."] },

    { t: "Data ethics in Australia",
      q: "What are the three <b>TRI</b> data ethics principles in the Australian Government Data Ethics Framework?",
      o: ["Trust, Reliability, Inclusion", "Transparency, Respect, Integrity", "Transparency, Responsibility, Independence", "Truth, Rights, Indigenous sovereignty"],
      a: 1,
      s: "TRI = Transparency, Respect, Integrity.",
      c: "Transparency: clear purpose, openness, traceable lineage and explainability. Respect: engage those affected, put fairness at the centre, manage bias. Integrity: use consistent with purpose and legal authority, comply with legislation and Privacy Principles, stewardship.",
      w: ["Wrong: plausible-sounding but not the framework.", "Correct.", "Wrong: 'Responsibility' belongs to CARE, not TRI.", "Wrong: invented acronym expansion."] },

    { t: "Data ethics in Australia",
      q: "Which statement about data ethics in Australia is <b>true</b>?",
      o: ["Australia's AI Ethics Principles are legally binding on all businesses.", "The Privacy Act 1988 is the cornerstone of Australian data protection legislation.", "The Consumer Data Right restricts individuals from accessing their own banking data.", "Australia has no legislation about personal information."],
      a: 1,
      s: "The Privacy Act 1988 is the cornerstone law for handling personal information fairly.",
      c: "Australian landscape: Privacy Act 1988 (cornerstone), Consumer Data Right (gives individuals more control and data sharing in banking and telecoms), AI Ethics Principles (entirely voluntary), whole-of-government Data Ethics Framework (TRI).",
      w: ["Wrong: the AI Ethics Principles are entirely voluntary and aspirational.", "Correct.", "Wrong: the CDR <i>empowers</i> individuals with greater control over their data.", "Wrong: the Privacy Act 1988 exists."] },

    { t: "Indigenous data",
      q: "<b>Indigenous Data Sovereignty</b> is best defined as:",
      o: ["Government ownership of all data collected about Indigenous communities", "The right of Indigenous peoples to exercise ownership over Indigenous data, including its creation, collection, access, analysis, interpretation, management, dissemination and reuse", "Storing Indigenous data on servers located on Indigenous land", "Removing all identifying information from Indigenous datasets"],
      a: 1,
      s: "IDS is about Indigenous peoples' ownership of and authority over their data.",
      c: "Indigenous data = data generated by, about or for Indigenous peoples. IDS is a global movement asserting the importance of data for Indigenous self-determination.",
      w: ["Wrong: this is the opposite of sovereignty for Indigenous peoples.", "Correct: the lecture's definition.", "Wrong: physical server location is not the concept.", "Wrong: de-identification alone does not give ownership or control."] },

    { t: "Indigenous data",
      q: "What does <b>CARE</b> stand for in the CARE principles for Indigenous data governance?",
      o: ["Consent, Access, Reuse, Equity", "Collective benefit, Authority to control, Responsibility, Ethics", "Collection, Analysis, Reporting, Evaluation", "Culture, Autonomy, Respect, Engagement"],
      a: 1,
      s: "CARE = Collective benefit, Authority to control, Responsibility, Ethics.",
      c: "CARE is people and purpose oriented and complements the technical FAIR principles (Findable, Accessible, Interoperable, Reusable). FAIR asks 'can the data be reused?'. CARE asks 'should it be reused, and who decides?'",
      w: ["Wrong: these sound related but are not the acronym.", "Correct.", "Wrong: these are generic project phases.", "Wrong: these are values, not the CARE acronym."] },

    { t: "Indigenous data",
      q: "A research dataset about an Indigenous community has rich metadata, persistent identifiers, standard formats and an open licence, and is published openly without community consent. Which statement is correct?",
      o: ["It satisfies both FAIR and CARE, so it is fully ethical.", "It may be technically FAIR but can still violate the CARE principles.", "It violates FAIR because open licences are not allowed.", "It satisfies CARE because the data is accessible to everyone."],
      a: 1,
      s: "FAIR is technical stewardship. CARE requires Indigenous authority and benefit, so open sharing without consent violates CARE.",
      c: "The lecture's own example: 'A dataset about Indigenous communities may be technically FAIR. But sharing it openly without consent may violate CARE principles.'",
      w: ["Wrong: FAIR compliance does not imply CARE compliance.", "Correct: Authority to control and Collective benefit are ignored when there is no consent.", "Wrong: licensing for reuse is part of FAIR (Reusable).", "Wrong: accessibility is a FAIR property. CARE is about who controls and benefits."] },

    { t: "Indigenous data",
      q: "Which is <b>NOT</b> one of the four guidelines of the Australian Government <b>Framework for Governance of Indigenous Data</b>?",
      o: ["Partner with Aboriginal and Torres Strait Islander people", "Build data-related capabilities", "Provide knowledge of data assets", "Centralise all Indigenous data in a single national database without consultation"],
      a: 3,
      s: "The four guidelines are Partner, Build capabilities, Provide knowledge of data assets, and Build an inclusive data system.",
      c: "The Framework puts Aboriginal and Torres Strait Islander peoples at its core and emphasises their say in decisions about data used in policy-making.",
      w: ["This is a guideline.", "This is a guideline.", "This is a guideline (straightforward ways to know what data is held, its use and access).", "Correct answer: centralising without consultation contradicts the Framework. The fourth guideline is 'build an inclusive data system'."] },

    { t: "Indigenous data",
      q: "The four principles of the <b>AIATSIS</b> Code of Ethics for Aboriginal and Torres Strait Islander Research are:",
      o: ["Indigenous self-determination; Indigenous leadership; Impact and value; Sustainability and accountability", "Transparency; Respect; Integrity; Accountability", "Collective benefit; Authority to control; Responsibility; Ethics", "Findable; Accessible; Interoperable; Reusable"],
      a: 0,
      s: "AIATSIS: self-determination, leadership, impact and value, sustainability and accountability. Its core value is integrity.",
      c: "These are easy to mix up. TRI = Australian Government Data Ethics Framework. CARE = Indigenous data governance (GIDA). FAIR = technical data stewardship. AIATSIS = research ethics framework.",
      w: ["Correct.", "Wrong: that is TRI plus accountability.", "Wrong: that is CARE.", "Wrong: that is FAIR."] },

    { t: "Benefits and harms",
      q: "Which is a correct example of an ethically significant <b>benefit</b> of data, in the lecture's category \"tailoring actions to be more effective for specific individuals, groups and circumstances\"?",
      o: ["A health app personalising treatment reminders to a patient's condition", "Selling user location history to advertisers", "Uber employees viewing celebrity trip data", "Micro-targeted political ads that exploit psychological profiles"],
      a: 0,
      s: "Personalised, consented health support is a tailored benefit.",
      c: "Three benefit categories: (1) increased understanding of the world, (2) improved function of social, institutional and economic systems, (3) tailored actions for specific individuals and groups.",
      w: ["Correct: personalisation that helps the individual flourish.", "Wrong: this is surveillance-capitalism harm.", "Wrong: this is the Uber 'God mode' privacy violation.", "Wrong: this is Cambridge-Analytica-style manipulation, a harm."] }
  ]
});
