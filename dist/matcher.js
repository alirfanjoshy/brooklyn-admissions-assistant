'use strict';
function resolveAdmissions(input,knowledge){
 const text=input.normalize('NFKC').replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
 const order=['late','decline','deposit','waiver','seek','asap','english','sat','esl','accreditation','nondegree','visiting','graduate','choice','completion','credit-evaluation','declare','summer','review','status','advisement','webcentral','accept','tuition','international','transfer','aid','major','visit','apply','contact','deadlines'];
 // Specific intents precede broad words such as application, transfer, or program.
 for(const id of order){const k=knowledge.find(item=>item.id===id);if(!k)continue;
 if(id==='deadlines'){if(/\b(deadline|deadlines|date|dates|fall|spring)\b/i.test(text))return k;continue;}
 if(id==='apply'&&/\b(deadline|deadlines|date|dates)\b/i.test(text))continue;
 if(k.terms.test(text))return k;
 }
 if(/^(hi|hello|hey|thanks|thank you)[!. ]*$/i.test(text))return {title:'Hi! It’s good to have you here.',body:'Ask about applying, your application status, deposits, advisement, transferring, financial aid, or campus visits. You can also browse all topics in the resource library.',follow:['How do I check my application status?','How do I apply as a first-year student?']};
 return {title:'Let’s find the right answer.',body:'I do not have a verified answer to that question in this template-based preview. Please contact Undergraduate Admissions for individual guidance. You can also browse the resource library for the available topics.\n\nI cannot access records, submit forms, or make admissions decisions.',url:'https://www.brooklyn.edu/admissions-aid/first-year/',source:'Ask undergraduate admissions',follow:['How can I contact admissions?','How do I check my application status?']};
}
if(typeof module!=='undefined')module.exports={resolveAdmissions};
