/* Week 4 — Data Privacy and Protection */
QB.addWeek({
  week: 4,
  title: "Data Privacy and Protection",
  notes: [
    { h: "Privacy vs protection", html: `
<p><b>Data privacy (information privacy)</b> is the right of individuals or organisations to <b>control their personal information</b>. It makes sure personal data is processed legally, stored securely and used for its intended purpose. It is a human right and an ethical matter.</p>
<p><b>Data protection</b> is the broader practice of making sure data is properly managed, stored and used, with a focus on privacy and regulatory compliance. <b>Data security is a subset of data protection.</b> Methods include anonymisation and pseudonymisation, retention policies, legal compliance, backups and disaster recovery.</p>
<p><b>Key questions:</b> what data is collected, why, how it will be used, who has access, and how long it is kept.</p>` },
    { h: "Key definitions (GDPR Art. 4)", html: `
<ul>
<li><b>Personal data</b>: any information relating to an identified or identifiable <b>living</b> individual, directly or indirectly. Examples: name, DOB, email, phone, photos, location, IP address, cookies, RFID, CCTV, signatures, credit information, voice prints and facial biometrics, employee records. (The Australian Privacy Act doesn't cover people who have died.)</li>
<li><b>Special category data</b> (sensitive) is a <b>subset</b> of personal data that needs higher protection: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade-union membership, <b>genetic</b>, <b>biometric</b> (fingerprint, face for ID), <b>health</b> (medical, heart rate, sickness records), criminal convictions, sex life or orientation.</li>
<li>Photographs are <b>not automatically</b> special category. They are only special category if processed as biometric data (e.g. face ID at the border).</li>
<li><b>Processing</b>: <i>any</i> operation on personal data, including collecting, organising, altering or combining, disclosing, using, holding and deleting.</li>
<li><b>Data subject</b>: the living person the data is about (a patient, a student). <b>Data controller</b>: decides <b>why and how</b> data is processed (the university). <b>Data processor</b>: processes data <b>on behalf of</b> the controller (outsourced payroll, cloud provider, market research firm), not the controller's own employees.</li>
</ul>
<table><tr><th></th><th>Personal data</th><th>Special category data</th></tr>
<tr><td>Legal basis</td><td>One of the 6 GDPR bases</td><td>A lawful basis <b>plus</b> an additional condition (e.g. explicit consent)</td></tr>
<tr><td>Security</td><td>Standard (access controls)</td><td>Extra: DPIA, encryption</td></tr>
<tr><td>Consent</td><td>Implicit or explicit</td><td><b>Explicit</b> when consent is relied on</td></tr>
<tr><td>Breach risk</td><td>Moderate</td><td>High, often mandatory reporting</td></tr></table>` },
    { h: "Laws", html: `
<ul>
<li><b>GDPR (EU)</b> applies to <b>any organisation processing personal data of individuals in the EU, regardless of where the organisation is</b>. Key provisions: data subject rights, accountability, data protection by design and by default. <b>Maximum fine: €20 million or 4% of annual global turnover</b>. Examples: Meta €1.2B, Amazon €746M, TikTok €530M.</li>
<li><b>Australia: Privacy Act 1988 (Cth)</b> has <b>13 Australian Privacy Principles (APPs)</b>, applies to government agencies and some private organisations, requires explicit consent for sensitive information, includes <b>data breach notification</b> and cross-border rules, and is enforced by the <b>OAIC</b>. Fines up to <b>$50 million</b>.</li>
<li><b>Queensland Privacy Act 2009</b> covers Qld <b>public sector agencies only</b>. It has Information Privacy Principles (IPPs) and National Privacy Principles (NPPs, for health agencies), overseen by the OIC.</li>
<li>Others: UK Data Protection Act 2018 (aligns with GDPR), <b>CCPA</b> (California), <b>COPPA</b> (US, children under 13), <b>HIPAA</b> (US medical information), China <b>PIPL</b> (2021), Brazil LGPD. The US has no single federal privacy law. About 137 countries have privacy laws.</li>
<li>Breaches: Equifax 2017 (147M people, $1.4B), Optus 2022 (10M Australians).</li>
</ul>` },
    { h: "GDPR: 6 lawful bases (at least one must apply)", html: `
<table><tr><th>Basis</th><th>When</th><th>Example</th></tr>
<tr><td><b>Consent</b></td><td>Freely given, specific, informed, unambiguous, and can be withdrawn</td><td>Opt-in checkbox for marketing emails</td></tr>
<tr><td><b>Contract</b></td><td>Necessary to perform a contract with the subject</td><td>Address needed to deliver an online order</td></tr>
<tr><td><b>Legal obligation</b></td><td>Required by law</td><td>Payroll data for tax. QUT collecting student data under the QUT Act, tax and migration law.</td></tr>
<tr><td><b>Vital interests</b></td><td>Protect someone's life (rarely used)</td><td>Hospital shares history with paramedics in an emergency</td></tr>
<tr><td><b>Public task / interest</b></td><td>Official authority, mainly the public sector</td><td>Council voter registration, welfare eligibility</td></tr>
<tr><td><b>Legitimate interests</b></td><td>Justified business interest balanced against individuals' rights. The <b>most flexible</b> basis.</td><td>CCTV for security with signage</td></tr></table>
<p>Consent should be freely given. In employment it may not be, because employees may fear consequences. When getting consent, explain what, why, who, how, and how to withdraw.</p>
<p><b>Special category data</b> processing is prohibited unless there is e.g. explicit consent, an employment or social-security obligation, vital interests, the data was manifestly made public by the subject, or substantial public interest.</p>` },
    { h: "GDPR: 7 principles", html: `
<ol>
<li><b>Lawfulness, fairness and transparency</b>: process legally and openly, and tell people what is collected and why.</li>
<li><b>Purpose limitation</b>: collect for specified, explicit purposes and don't reuse for unrelated ones.</li>
<li><b>Data minimisation</b>: only what is necessary (don't ask for DOB for a dance party, or political opinion for a health check).</li>
<li><b>Accuracy</b>: correct and up to date.</li>
<li><b>Storage limitation</b>: keep no longer than necessary.</li>
<li><b>Integrity and confidentiality (security)</b>: protect against unauthorised access or loss.</li>
<li><b>Accountability</b>: the controller must <b>demonstrate</b> compliance (policies, training, audit logs, DPIAs).</li>
</ol>` },
    { h: "GDPR: 8 data subject rights", html: `
<ol>
<li><b>Right to be informed</b>: what, why and how (privacy notice).</li>
<li><b>Right of access</b>: get a copy of your data (Subject Access Request), within 3 months.</li>
<li><b>Right to rectification</b>: correct inaccurate data, without delay.</li>
<li><b>Right to erasure ("right to be forgotten")</b>: deletion in certain circumstances, done promptly.</li>
<li><b>Right to restrict processing</b> (blocking): data stored but not processed while a dispute is checked.</li>
<li><b>Right to data portability</b>: receive data in a structured, machine-readable format and transmit it to <b>another controller</b>, including a competitor.</li>
<li><b>Right to object</b>: to processing based on legitimate interests or public task, direct marketing, or research.</li>
<li><b>Rights related to automated decision-making and profiling</b>: not to be subject to decisions based solely on automated processing, to human intervention, and to an explanation.</li>
</ol>
<p>The rights do <b>not</b> include: accessing <i>other people's</i> data, forcing publication of proprietary source code, stopping a service in your city, or refusing to pay fares.</p>` },
    { h: "International transfers, threats, safeguards", html: `
<ul>
<li><b>Why control transfers?</b> Data could lose its legal protection when it crosses a border, so the rules stop controllers escaping responsibility and prevent "data havens".</li>
<li>Three mechanisms: <b>adequacy decision</b> (the European Commission decides the destination's protection is essentially equivalent), <b>appropriate safeguards</b> (Standard Contractual Clauses, certification), <b>derogations</b> (explicit consent, contract, public interest, legal claims, vital interest).</li>
<li><b>Recipient</b>: anyone data is disclosed to. Employees of the controller are recipients but not third parties. Authorities in a particular inquiry (e.g. police) are not regarded as recipients.</li>
<li>Transfers between institutions must be <b>necessary</b> for the recipient's legitimate tasks. Sender and recipient should keep up a dialogue (no blind transfers).</li>
<li><b>Threats:</b> identity theft, data breach (lost, stolen, destroyed, changed or accessed without permission), ransomware, phishing.</li>
<li><b>Safeguards:</b> technical (antivirus, patching, firewall, backups, strong passwords, encryption, licensed software) and physical (locks, guards, cameras, alarms).</li>
</ul>` },
    { h: "Common exam traps", html: `
<ul>
<li>Heart rate, fingerprints and health data are special category. A profile photo, username, location or IP address is personal but <b>not</b> special category.</li>
<li>Marketing emails with an opt-in checkbox → <b>consent</b>, not legitimate interests or contract.</li>
<li>Encryption does <b>not</b> fix collecting too much data or vague purposes (minimisation and purpose limitation are separate principles).</li>
<li>A provider deleting the whole account when you only asked to stop marketing is wrong. That request is the right to object, not erasure.</li>
<li>"Technical constraints" do not excuse refusing rectification. Refusing to send data to a competitor violates portability.</li>
<li>The controller decides why and how. The processor acts on the controller's instructions.</li>
</ul>` }
  ],
  questions: [
    { t: "Roles",
      q: "A university decides to collect student data for enrolment and hires a cloud company to store and process it according to the university's instructions. Which statement is correct?",
      o: ["The university is the data processor and the cloud company is the data controller.", "The university is the data controller and the cloud company is the data processor.", "Both are data subjects.", "The students are the data controllers."],
      a: 1,
      s: "The controller decides why and how. The processor processes on the controller's behalf.",
      c: "GDPR roles: data subject (the person the data is about), data controller (determines purposes and means), data processor (processes on behalf of and under the instruction of the controller, e.g. outsourced payroll or a cloud provider).",
      w: ["Wrong: reversed.", "Correct.", "Wrong: data subjects are the individuals whom the data is about (the students).", "Wrong: students are data subjects."] },

    { t: "Personal vs special category data",
      q: "Which of the following is <b>special category</b> personal data under the GDPR?",
      o: ["A customer's email address", "A user's IP address", "An employee's trade-union membership", "A shopper's delivery address"],
      a: 2,
      s: "Trade-union membership is listed as special category data.",
      c: "Special category data: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade-union membership, genetic, biometric, health, sex life or orientation (criminal convictions are also treated as sensitive). It needs a lawful basis plus an additional condition.",
      w: ["Personal data, but not special category.", "Personal data (an online identifier), but not special category.", "Correct.", "Personal data, but not special category."] },

    { t: "Personal vs special category data",
      q: "Under the GDPR, when do photographs count as special category data?",
      o: ["Always, because faces are personal", "Never", "Only when processed as biometric data, e.g. facial recognition used to identify someone", "Only when taken in public places"],
      a: 2,
      s: "Photos are not systematically special category. They are only special category when processed as biometric data.",
      c: "GDPR states that processing photographs should not systematically be considered processing of special categories. A facial image or fingerprint used to log in or pass the border is biometric, so special category.",
      w: ["Wrong: a photo is personal data but not automatically special category.", "Wrong: biometric use makes it special category.", "Correct.", "Wrong: location is not the test."] },

    { t: "Processing",
      q: "Which statement about \"processing\" under the GDPR is <b>NOT</b> true?",
      o: ["Collecting personal data is processing.", "Storing data for future use is processing.", "Deleting personal data is processing.", "Simply holding data without using it is not processing."],
      a: 3,
      s: "Holding or keeping data is processing too. Processing is any operation on personal data.",
      c: "Processing (Art. 4(2)) includes collecting, organising, altering or combining, disclosing, using, holding for future use, and deleting.",
      w: ["True.", "True.", "True: deletion is an operation on the data.", "NOT true, so this is the answer: 'holding the information for future use' is explicitly listed as processing."] },

    { t: "Lawful bases",
      q: "Match each scenario with the most appropriate GDPR lawful basis:<br>1. An online store uses your address to deliver your order.<br>2. An employer sends salary data to the tax office.<br>3. Paramedics receive an unconscious patient's medical history.<br>4. A council processes data for voter registration.<br>(i) Vital interests  (ii) Contract  (iii) Public task  (iv) Legal obligation",
      o: ["1-(ii), 2-(iv), 3-(i), 4-(iii)", "1-(iv), 2-(ii), 3-(i), 4-(iii)", "1-(ii), 2-(iii), 3-(iv), 4-(i)", "1-(i), 2-(iv), 3-(ii), 4-(iii)"],
      a: 0,
      s: "Delivery = contract, tax reporting = legal obligation, emergency = vital interests, voter roll = public task.",
      c: "Six lawful bases: consent, contract, legal obligation, vital interests, public task, legitimate interests. Pick the most appropriate one. At least one must apply.",
      w: ["Correct.", "Wrong: delivery is needed to perform the contract, and tax reporting is required by law.", "Wrong: tax reporting is a legal obligation, not a public task, and the emergency is vital interests.", "Wrong: delivery is contract, not vital interests."] },

    { t: "Lawful bases",
      q: "Which GDPR lawful basis is described as the <b>most flexible</b>, because it relies on a justified purpose balanced against individuals' rights (e.g. CCTV for security)?",
      o: ["Consent", "Legitimate interests", "Vital interests", "Legal obligation"],
      a: 1,
      s: "Legitimate interests is the most flexible basis. It must be balanced against the data subject's rights, especially for children.",
      c: "Legitimate interests applies unless overridden by the data subject's interests or fundamental rights. The CCTV example needs proper signage, purpose, operator contact, and cameras pointed only at authorised premises.",
      w: ["Wrong: consent must be freely given, specific and unambiguous, which is far from flexible.", "Correct.", "Wrong: vital interests is narrow (protecting life) and rarely used.", "Wrong: it depends on a specific law."] },

    { t: "Principles",
      q: "A fitness app asks users for their <b>political opinions</b> when they register for workout tracking. Which GDPR principle is most clearly violated?",
      o: ["Accuracy", "Data minimisation", "Storage limitation", "Accountability"],
      a: 1,
      s: "Collecting data that isn't necessary for the purpose violates data minimisation.",
      c: "Data minimisation: personal data must be adequate, relevant and limited to what is necessary. The lecture's examples: DOB for a dance party, political opinion for a health check.",
      w: ["Wrong: accuracy concerns correctness, not necessity.", "Correct.", "Wrong: storage limitation is about retention time.", "Wrong: accountability is about demonstrating compliance."] },

    { t: "Principles",
      q: "Which list contains only GDPR <b>principles</b> (not rights or lawful bases)?",
      o: ["Purpose limitation, Accuracy, Storage limitation, Accountability", "Consent, Contract, Legal obligation, Public task", "Right of access, Right to erasure, Right to object, Portability", "Purpose limitation, Consent, Right of access, Accuracy"],
      a: 0,
      s: "The seven principles: lawfulness/fairness/transparency, purpose limitation, minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.",
      c: "Keep the three GDPR lists apart: 6 lawful bases, 7 principles, 8 data subject rights.",
      w: ["Correct.", "Wrong: these are lawful bases.", "Wrong: these are data subject rights.", "Wrong: it mixes a basis (consent) and a right (access) with principles."] },

    { t: "Data subject rights",
      q: "Lena asks a streaming service to export her playlists and preferences in a machine-readable format so she can import them into a <b>competitor's</b> service. Which right is she exercising?",
      o: ["Right to rectification", "Right to data portability", "Right to restrict processing", "Right to be informed"],
      a: 1,
      s: "Portability = receive your data in a structured, machine-readable format and transmit it to another controller.",
      c: "Portability is not limited to companies in the same corporate group. A refusal on those grounds would violate the right (a distractor in the week 4 sample question).",
      w: ["Wrong: rectification corrects inaccurate data.", "Correct.", "Wrong: restriction blocks processing temporarily.", "Wrong: being informed concerns privacy notices."] },

    { t: "Data subject rights",
      q: "A loan applicant is automatically rejected by an AI credit system with no human involvement and asks for a person to review the decision. Which GDPR right applies?",
      o: ["Right to data portability", "Rights related to automated decision-making and profiling", "Right to erasure", "Right of access only"],
      a: 1,
      s: "GDPR gives the right not to be subject solely to automated decisions, and to human intervention and an explanation.",
      c: "Special rights for automated individual decisions: not to be subject to decisions based solely on automated processing (with exceptions), human intervention to contest, explanation, and safeguards for special categories.",
      w: ["Wrong: portability is about moving data.", "Correct.", "Wrong: erasure deletes data.", "Wrong: access gives a copy of the data but doesn't provide human review."] },

    { t: "Data subject rights",
      q: "Which response by a company <b>correctly</b> honours a GDPR request?",
      o: ["A user asks to stop marketing emails, so the company deletes the user's entire account.", "A user asks for a copy of their data, so the company also sends other users' travel histories.", "A user disputes the accuracy of their data, so the company restricts processing of it until the issue is resolved.", "A user asks for a correction, so the company refuses because of technical constraints and suggests a new account."],
      a: 2,
      s: "Restricting processing during an accuracy dispute is exactly the right to restrict processing.",
      c: "Right to restrict processing (blocking): data may be stored but not further processed while accuracy or lawfulness is checked. Rectification must happen 'without delay', and erasure and blocking 'promptly'.",
      w: ["Wrong: objecting to marketing doesn't mean erasing everything. That over-reacts and isn't what was asked.", "Wrong: disclosing other people's data is a breach. Access applies only to your own data.", "Correct.", "Wrong: technical constraints don't override the right to rectification."] },

    { t: "Laws",
      q: "A company based in Australia sells online to customers living in France. Does the GDPR apply to its processing of those customers' data?",
      o: ["No, because the company is outside the EU", "Yes, because GDPR applies to any organisation processing personal data of individuals in the EU, regardless of location", "Only if the company has an office in France", "Only for special category data"],
      a: 1,
      s: "GDPR's territorial scope follows the data subjects in the EU, not the company's location.",
      c: "GDPR applies to any organisation processing personal data of individuals in the EU. Maximum fines: €20M or 4% of annual global turnover, whichever is higher.",
      w: ["Wrong: location of the organisation doesn't matter.", "Correct.", "Wrong: no establishment is needed.", "Wrong: it applies to all personal data."] },

    { t: "Laws",
      q: "Which statement about Australian privacy law is <b>true</b>?",
      o: ["The Privacy Act 1988 contains 13 Australian Privacy Principles and is enforced by the OAIC.", "The Queensland Privacy Act 2009 applies to all private companies in Queensland.", "Australia's Privacy Act protects the personal information of deceased persons.", "Australia has no data breach notification requirement."],
      a: 0,
      s: "13 APPs, enforced by the Office of the Australian Information Commissioner.",
      c: "Privacy Act 1988: 13 APPs, applies to government agencies and some private organisations, higher protection and explicit consent for sensitive information, data breach notification, cross-border transfer rules, OAIC enforcement, fines up to $50M. Qld Privacy Act 2009: Qld public sector only (IPPs and NPPs, overseen by the OIC).",
      w: ["Correct.", "Wrong: it applies to Queensland public sector agencies, not private organisations.", "Wrong: the Act doesn't cover someone who has died.", "Wrong: serious breaches that could cause harm must be reported."] },

    { t: "Laws",
      q: "What is the maximum GDPR fine?",
      o: ["€1 million or 1% of turnover", "€20 million or 4% of annual global turnover", "$50 million AUD flat", "€746 million"],
      a: 1,
      s: "Up to €20M or 4% of annual global turnover.",
      c: "Australia's Privacy Act amendments allow fines up to $50M. Real fines: Meta €1.2B (data transfers), Amazon €746M, TikTok €530M.",
      w: ["Wrong.", "Correct.", "Wrong: that is the Australian maximum.", "Wrong: that was Amazon's specific fine, not the cap."] },

    { t: "International transfers",
      q: "Why do privacy laws place special controls on <b>international transfers</b> of personal data?",
      o: ["To make cloud storage illegal", "Because personal data could lose its legal protection when it crosses a border, so adequate protection must continue (preventing 'data havens')", "To increase taxes on data", "Because foreign servers are always slower"],
      a: 1,
      s: "Transfers must keep an adequate level of protection so controllers cannot escape responsibility.",
      c: "GDPR transfer mechanisms: adequacy decision (essentially equivalent protection), appropriate safeguards (Standard Contractual Clauses, certification), derogations (explicit consent, contract, public interest, legal claims, vital interest).",
      w: ["Wrong: cloud storage abroad is allowed with safeguards (QUT does this).", "Correct.", "Wrong: nothing to do with tax.", "Wrong: performance is irrelevant."] },

    { t: "Privacy vs protection",
      q: "Consider the statements:<br>A. Data security is a subset of data protection.<br>B. Data protection focuses only on preventing hacking.<br>C. Anonymisation, retention policies and backups are data protection methods.<br>D. Data privacy is the right of individuals to control their personal information.<br>Which are true?",
      o: ["A, C and D", "A and B", "B and D", "All of them"],
      a: 0,
      s: "A, C and D are true. Data protection is broader than security (compliance, lifecycle, backups).",
      c: "Data protection is the broader practice of managing, storing and using data properly, with a focus on privacy and compliance: regulatory compliance, preventing loss, lifecycle management, anonymisation and pseudonymisation, retention, disaster recovery.",
      w: ["Correct.", "Wrong: B is false.", "Wrong: B is false.", "Wrong: B is false. Protection goes beyond security."] }
  ]
});
