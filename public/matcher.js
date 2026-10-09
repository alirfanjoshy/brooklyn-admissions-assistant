'use strict';
function resolveAdmissions(input,knowledge){
 const text=input.normalize('NFKC').replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
 const order=['late','decline','deposit','waiver','seek','asap','english','sat','esl','accreditation','nondegree','visiting','graduate','choice','completion','credit-evaluation','declare','summer','review','status','advisement','webcentral','accept','tuition','international','transfer','aid','major','visit','apply','contact','deadlines'];
 if(/\bhow are you\b|\bhow're you\b|\bhow is it going\b/i.test(text))return {title:'I’m doing well, thanks for asking!',body:'I’m the Brooklyn College admissions bulldog, here to make your next steps a little easier. What can I help you with today?',follow:['How do I apply?','What are the application deadlines?','How can I talk to an admissions counselor?']};
 if(/\b(?:talk|speak|connect|transfer|reach|chat)\b.{0,35}\b(?:human|person|someone|counselor|advisor|adviser|agent|representative)\b|\b(?:real person|live agent|human agent)\b/i.test(text))return knowledge.find(item=>item.id==='contact');
 // Specific intents precede broad words such as application, transfer, or program.
 for(const id of order){const k=knowledge.find(item=>item.id===id);if(!k)continue;
 if(id==='deadlines'){if(/\b(deadline|deadlines|date|dates|fall|spring)\b/i.test(text))return k;continue;}
 if(id==='apply'&&/\b(deadline|deadlines|date|dates)\b/i.test(text))continue;
 if(k.terms.test(text))return k;
 }
 if(/^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i.test(text))return {title:'Hi, welcome to Brooklyn College!',body:'I’m the admissions bulldog. Ask me about applying, transferring, deadlines, financial aid, or visiting campus. If I can’t verify something, I’ll point you to the right official resource.',follow:['How do I check my application status?','How do I apply as a first-year student?']};
 if(/^(thanks|thank you|thx)[!. ]*$/i.test(text))return {title:'You’re welcome!',body:'Glad I could help. What else can I clear up for you?'};
 return {title:'I’m not sure enough to give you a reliable answer.',body:'I don’t want to guess about a Brooklyn College policy. I can’t transfer this chat directly, but the Office of Undergraduate Admissions can help: call 718-951-5001 or use the official page to schedule an appointment with a counselor.\n\nYou can also try asking with a little more detail, or browse the admissions Resource Library for source-linked guidance. Please don’t share passwords, IDs, or private documents here.',url:'https://www.brooklyn.edu/admissions-aid/first-year/',source:'Contact Undergraduate Admissions or schedule a counselor appointment',follow:['How can I talk to an admissions counselor?','How do I apply as a first-year student?','What are the application deadlines?']};
}
if(typeof module!=='undefined')module.exports={resolveAdmissions};
