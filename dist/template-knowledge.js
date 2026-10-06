'use strict';
// Adapted from the user-supplied 2020 templates; current sources reviewed 2026-10-06.
const templateKnowledge = [
  {
    "id": "review",
    "title": "Understanding “under review”",
    "pattern": "\\b(under review|being reviewed|application.*complete|complete.*application|missing.*document|incomplete|checklist)\\b",
    "body": "An “under review” message is not an admission decision. Check your application details and any outstanding items in CUNYfirst to see whether documents are still requested.\n\nIf your application shows as complete, wait for the official decision or ask Admissions for an update. A complete application does not guarantee admission, and this guide cannot predict when your decision will arrive.\n\nI cannot access your application or verify receipt of documents.",
    "url": "https://www.cuny.edu/admissions/undergraduate/apply/",
    "source": "CUNY application and status guidance",
    "question": "What does under review mean?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "status",
    "title": "Check your application status",
    "pattern": "\\b(application status|check.*status|status.*application|decision|denial|rejected|denied|hear back)\\b",
    "body": "Log in to CUNYfirst using the account associated with your application and open your application details for Brooklyn College. Review the status, decision, and any outstanding requirements.\n\nFollow the instructions in your official decision notice. For an unclear status or a question about a decision, contact Undergraduate Admissions. I cannot view your records or tell you whether you were admitted.",
    "url": "https://www.cuny.edu/admissions/undergraduate/apply/",
    "source": "CUNY application status",
    "question": "How do I check my application status?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "late",
    "title": "If you missed an application deadline",
    "pattern": "\\b(too late|late application|missed.*deadline|deadline.*missed|next semester|reapply)\\b",
    "body": "Ask Admissions whether applications and outstanding documents are still being accepted for your intended term. CUNY says applications after a deadline may be considered where space remains.\n\nIf the term is closed, ask which application and documents are needed for a later term. Do not assume an earlier application or its documents will automatically carry forward. This guide cannot reopen an application or forward documents.",
    "url": "https://www.cuny.edu/admissions/undergraduate/apply/",
    "source": "CUNY application deadlines",
    "question": "Is it too late to complete my application?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "choice",
    "title": "Changing your college choice",
    "pattern": "\\b(college choice|change.*college|reallocation|first choice)\\b",
    "body": "If you want to change a CUNY college choice to Brooklyn College, ask Undergraduate Admissions for the current change-of-choice process and whether it is available for your intended term.\n\nThe supplied 2020 template mentions a form and a 15-business-day processing period. That turnaround has not been confirmed, so this guide does not promise it or claim your form has been received.",
    "url": "https://www.brooklyn.edu/admissions-aid/first-year/",
    "source": "Undergraduate Admissions",
    "question": "How do I change my college choice?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": true,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "decline",
    "title": "Declining an admission offer",
    "pattern": "\\b(decline|declining|reject.*offer|not attend|not attending|turn down)\\b",
    "body": "If you decide not to attend, use the response instructions in your official admission offer or ask Admissions how to record your decision.\n\nA message in this chat does not decline your offer. If you already accepted, paid a deposit, or registered for classes, contact the appropriate college offices about the additional steps and any applicable deadlines.",
    "url": "https://www.brooklyn.edu/admissions-aid/first-year/",
    "source": "Undergraduate Admissions",
    "question": "How do I decline my admission offer?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": true,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "deposit",
    "title": "Your commitment deposit",
    "pattern": "\\b(deposit|commitment payment|commitment fee)\\b",
    "body": "Follow your admission offer and CUNYfirst instructions to confirm whether a commitment deposit is required and how to pay it. Confirm the current amount and due date with Admissions before paying.\n\nCUNY’s new-student guide describes deposit waivers and recommends contacting your college if your financial situation has changed. I cannot determine your waiver eligibility or process a payment.",
    "url": "https://www.cuny.edu/admissions/new-students/",
    "source": "CUNY new-student deposit guidance",
    "question": "How do I pay the commitment deposit?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "accept",
    "title": "Accepting your admission offer",
    "pattern": "\\b(accept.*offer|acceptance|accepted|admitted|admission offer|offer of admission)\\b",
    "body": "If you have received an official offer, follow Brooklyn College’s Accept & Commit instructions and review the next steps for your student type. Complete any required commitment, account, and registration steps through the college’s systems.\n\nThis chat cannot accept your offer or confirm enrollment. Use your official offer for term-specific requirements.",
    "url": "https://www.brooklyn.edu/lp/first-year/commit/",
    "source": "Brooklyn College Accept & Commit",
    "question": "How do I accept my admission offer?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "summer",
    "title": "Summer courses before your first semester",
    "pattern": "\\bsummer\\b",
    "body": "If you have been admitted for a later term and want to start with summer courses, ask Admissions and an academic adviser whether your admission can support summer enrollment and which requirements you must complete first.\n\nConfirm prerequisites, course availability, tuition, financial aid, and how the courses fit your degree plan before registering. Acceptance for a later term alone does not confirm summer registration eligibility.",
    "url": "https://www.brooklyn.edu/lp/transfer/accept-commit-transfer/",
    "source": "Transfer student enrollment steps",
    "question": "Can admitted transfer students take summer classes?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": true,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "advisement",
    "title": "Plan your first semester with an adviser",
    "pattern": "\\b(smart|advisement|orientation|registration|register for classes|academic advis[eo]r|schedule.*appointment|book.*appointment)\\b",
    "body": "Use the current admitted-student checklist to arrange academic advisement and registration. Review your intended major, any transfer credit evaluation, and outstanding enrollment requirements with your adviser.\n\nThe 2020 document calls the appointment system “SMART.” Verify the current scheduling route through the college’s checklist rather than relying on those older screen-by-screen instructions.\n\nI can explain the next steps, but cannot book or confirm an appointment.",
    "url": "https://www.brooklyn.edu/lp/first-year/commit/",
    "source": "Advisement and enrollment checklist",
    "question": "How do I schedule a SMART or advisement appointment?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "webcentral",
    "title": "Set up your college accounts",
    "pattern": "\\b(webcentral|web central|claim.*account|create.*account|activate.*account|cunyfirst|cuny first|login|log in|password)\\b",
    "body": "Use the college’s current enrollment checklist to activate the accounts you need. CUNYfirst and Brooklyn College WebCentral are separate systems; follow the instructions for the account you are setting up.\n\nFor an account error, use the official support options linked by the college. Do not share your password, security answers, student ID, or verification codes in this chat.",
    "url": "https://www.brooklyn.edu/lp/transfer/accept-commit-transfer/",
    "source": "College account and enrollment steps",
    "question": "How do I activate WebCentral?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "declare",
    "title": "Confirm or declare your major",
    "pattern": "\\b(declar.*major|confirm.*major|change.*major|major.*confirm|major.*declar)\\b",
    "body": "Review your intended major with an academic adviser and use the college’s current instructions for declaring or confirming it. The major selected on an application may require additional steps after admission.\n\nFor transfer students, review how evaluated credits apply to the intended major in DegreeWorks before planning courses.",
    "url": "https://www.brooklyn.edu/lp/transfer/accept-commit-transfer/",
    "source": "Advisement and degree planning",
    "question": "How do I confirm my major?",
    "group": "After admission",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "sat",
    "title": "SAT and ACT requirements",
    "pattern": "\\b(sat|act|test.optional|1080|test scores|score report)\\b",
    "body": "CUNY currently lists test-optional admissions through spring 2027. The 2020 template’s statement that SAT/ACT scores are required is outdated.\n\nFor a later entry term or a program with separate requirements, confirm the applicable policy with Admissions. Do not use the old template’s minimum scores as a current admission cutoff. If you choose to submit scores, follow the current CUNY submission instructions.",
    "url": "https://www.cuny.edu/admissions/undergraduate/",
    "source": "CUNY undergraduate testing policy",
    "question": "Are SAT or ACT scores required?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "english",
    "title": "English proficiency scores and exemptions",
    "pattern": "\\b(toefl|ielts|pte|duolingo|english proficiency|english.*exempt|exempt.*english|language.*waiver)\\b",
    "body": "Ask Undergraduate Admissions which English proficiency tests, scores, and exemptions apply to your education history and intended entry term. Use the international applicant pathway for the current documentation instructions.\n\nThe supplied document contains a 2020 score-comparison table and exemption list. Those thresholds and exemptions have not been verified for current admission, so this preview does not use them to assess you. Do not assume an exemption based only on residency or immigration status.",
    "url": "https://www.brooklyn.edu/admissions-aid/take-the-next-step/apply/",
    "source": "Current application pathways",
    "question": "What TOEFL, IELTS, or PTE score do I need?",
    "group": "International & English",
    "template": "2020 Admissions Inquiry Templates",
    "review": true,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "esl",
    "title": "English classes and adult literacy",
    "pattern": "\\b(esl|esol|english classes|learn english|american language academy|ala|adult literacy|ged classes)\\b",
    "body": "Brooklyn College’s Adult Literacy Program offers tuition-free ESOL and GED preparation for eligible New York State residents age 18 or older. The program lists a photo ID requirement and a waitlist.\n\nIts current page says it does not accept international students or process immigration documents, and directs international learners to CUNY English Language Institutes.\n\nThe old American Language Academy listing has not been confirmed; use the current Adult Literacy page for available options.",
    "url": "https://www.brooklyn.edu/literacy/",
    "source": "Adult Literacy Program",
    "question": "Does Brooklyn College offer ESL classes?",
    "group": "International & English",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "graduate",
    "title": "Questions about graduate study",
    "pattern": "\\b(graduate admissions?|graduate student|graduate program|graduate school|master|masters|phd|m\\.a\\.|m\\.s\\.)\\b",
    "body": "For master’s programs or other graduate admissions questions, contact the Office of Graduate Admissions or the adviser for your intended program. Requirements vary by department.\n\nThe current graduate admissions page lists 222 West Quad Center and 718.951.4536. Use that page to explore programs and appointment options. I have not forwarded your inquiry.",
    "url": "https://www.brooklyn.edu/admissions-aid/graduate/",
    "source": "Office of Graduate Admissions",
    "question": "Who can help with graduate admissions?",
    "group": "Other study options",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "seek",
    "title": "Applying to SEEK as a transfer student",
    "pattern": "\\b(seek|heop|eop|college discovery|special programs transfer)\\b",
    "body": "Brooklyn College’s SEEK page explains how students transfer between opportunity programs. Submit the CUNY transfer application, then complete the Special Programs Transfer Request Form with your current campus.\n\nThe SEEK team must review your eligibility and required documentation. This guide cannot approve participation. Review the program’s own deadlines and orientation requirements on the linked page.",
    "url": "https://www.brooklyn.edu/seek/apply-to-seek/",
    "source": "Apply to SEEK",
    "question": "How do transfer students apply to SEEK?",
    "group": "Support programs",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "asap",
    "title": "ASAP support at Brooklyn College",
    "pattern": "\\b(asap|ace|accelerated study|accelerate complete)\\b",
    "body": "Brooklyn College now has a CUNY ASAP program that supports bachelor’s-degree completion. The 2020 template’s statement that Brooklyn College does not offer ASAP is outdated.\n\nThe current program page lists full-time enrollment, eligible residency, approved majors, graduation timelines, and other requirements. It also states that students in SEEK or Macaulay Honors cannot participate in ASAP.\n\nReview the current eligibility page and contact the program team to learn whether you can join.",
    "url": "https://www.brooklyn.edu/cuny-asap/",
    "source": "Brooklyn College CUNY ASAP",
    "question": "Does Brooklyn College offer ASAP or ACE?",
    "group": "Support programs",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "nondegree",
    "title": "Take courses without pursuing a degree",
    "pattern": "\\b(non.degree|nondegree|nonmatriculated|personal enrichment)\\b",
    "body": "An undergraduate nondegree student takes credit-bearing courses without pursuing a Brooklyn College degree. Apply through the official Nondegree Applicants page and submit its required documents.\n\nNondegree registration is space-available, and admission does not guarantee a seat in a class. The current page says nondegree students are not eligible for financial aid, scholarships, or grants.\n\nIf you are enrolled in a degree program at another college, review the visiting-student pathway instead.",
    "url": "https://www.brooklyn.edu/admissions-aid/first-year/how-to-apply/non-degree-applicants/",
    "source": "Nondegree applicants",
    "question": "How do I apply as a non-degree student?",
    "group": "Other study options",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "visiting",
    "title": "Take a course as a visiting student",
    "pattern": "\\b(visiting student|e.?permit|another college.*course|non.cuny)\\b",
    "body": "Students at a non-CUNY college can review Brooklyn College’s visiting-student application and transcript instructions. Visiting status is valid for one semester; a new application is required for each semester.\n\nStudents attending another CUNY college should consult their home college about an ePermit. Approval and course registration are separate steps. Confirm prerequisites and immunization requirements before registering.",
    "url": "https://www.brooklyn.edu/admissions-aid/nontraditional/visiting-students/",
    "source": "Visiting students and ePermit",
    "question": "Can I attend as a visiting student?",
    "group": "Other study options",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "waiver",
    "title": "Application fee waiver options",
    "pattern": "\\b(fee waiver|waive.*fee|application fee|free application|application.*cost)\\b",
    "body": "CUNY lists application fee waiver pathways, including qualifying current CUNY students, veterans and spouses, certain high school applicants, and economic-hardship applicants. The route and documentation depend on your circumstances.\n\nUse the current application-fee section on CUNY’s How to Apply page. A waiver request in this chat is not submitted or approved, and a tuition waiver is different from an application fee waiver.",
    "url": "https://www.cuny.edu/admissions/undergraduate/apply/",
    "source": "CUNY application fee waivers",
    "question": "Can I get an application fee waiver?",
    "group": "Costs & aid",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "tuition",
    "title": "Understand your tuition and fees",
    "pattern": "\\b(tuition|cost of attendance|per credit|semester cost|student fees|how much.*cost)\\b",
    "body": "Tuition varies by New York residency, degree or nondegree status, and course load. Student fees and other costs may be additional.\n\nUse Brooklyn College’s current undergraduate tuition table to identify the applicable rate, and check the cost-of-attendance information for expenses such as books, housing, and transportation. The Bursar can explain your bill; this guide cannot calculate an official individual balance.",
    "url": "https://www.brooklyn.edu/bursar/tuition-and-fees/undergraduate/",
    "source": "Undergraduate tuition and fees",
    "question": "How much are undergraduate tuition and fees?",
    "group": "Costs & aid",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "credit-evaluation",
    "title": "How your transfer credits are evaluated",
    "pattern": "\\b(transfer.*credits?|transferring credits|credit.*transfer|credit evaluation|course equivalen|ap credit|ib credit|clep)\\b",
    "body": "The Transfer Evaluations Office processes prior college and eligible exam credit for matriculated undergraduate students. Its page links to Transfer Explorer, evaluation tools, credit policies, and office support.\n\nAn equivalency preview is useful for planning, but it is not a final award of credit. Review your official evaluation and consult an adviser about how accepted credits fit your degree.",
    "url": "https://www.brooklyn.edu/teo/",
    "source": "Transfer Evaluations Office",
    "question": "How are my transfer credits evaluated?",
    "group": "Transfer students",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "completion",
    "title": "How long will your degree take?",
    "pattern": "\\b(how long.*degree|finish.*degree|degree.*finish|graduate in|two years|2 years|core curriculum|pathways|general education)\\b",
    "body": "Your graduation timeline depends on accepted credits, remaining major and general education requirements, prerequisites, and the number of courses you can complete each term.\n\nReview your official credit evaluation and DegreeWorks audit with an adviser to make a semester-by-semester plan. The 2020 template’s two-year example and older Core Curriculum rules are not an individual graduation guarantee.",
    "url": "https://www.brooklyn.edu/lp/transfer/accept-commit-transfer/",
    "source": "Transfer advisement and degree planning",
    "question": "How long will it take to finish my degree after transferring?",
    "group": "Transfer students",
    "template": "2020 Admissions Inquiry Templates",
    "review": false,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  },
  {
    "id": "accreditation",
    "title": "High school diploma and accreditation questions",
    "pattern": "\\b(accreditation|accredited|online high school|virtual high school|correspondence school|diploma.*accepted|homeschool|home school)\\b",
    "body": "Ask CUNY Admissions to review the acceptability of your specific high school credential and tell you which supporting documents are required.\n\nThe 2020 document includes a staff-only accreditation list and broad statements about online schools. These have not been confirmed as current policy. This preview cannot approve or reject a diploma or tell you to obtain an equivalency credential based only on the type of school.",
    "url": "https://www.cuny.edu/admissions/undergraduate/apply/",
    "source": "CUNY document requirements",
    "question": "Will my high school diploma be accepted?",
    "group": "Applying",
    "template": "2020 Admissions Inquiry Templates",
    "review": true,
    "follow": [
      "How can I contact admissions?",
      "What are the application deadlines?"
    ]
  }
];
