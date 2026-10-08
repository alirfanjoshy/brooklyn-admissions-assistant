import {makeChatHandler} from './chat.mjs';

const knowledge=__KNOWLEDGE__;
const assets=__ASSETS__;
const chat=makeChatHandler(knowledge);
const rateWindows=new Map();
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});

function allowRequest(request,bucket,limit=30){
  const now=Date.now();const key=`${bucket}:${request.headers.get('CF-Connecting-IP')||'shared'}`;const current=rateWindows.get(key);
  if(!current||now-current.start>=60000){rateWindows.set(key,{start:now,count:1});if(rateWindows.size>1000)for(const [entry,value] of rateWindows)if(now-value.start>=60000)rateWindows.delete(entry);return true;}
  if(current.count>=limit)return false;current.count++;return true;
}

async function record(request,env){
  if(request.method!=='POST')return json({error:'Method not allowed'},405);
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Invalid origin'},403);
  if(!allowRequest(request,'record'))return json({error:'Too many saved turns. Please wait a minute and try again.'},429);
  if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'Expected JSON'},415);
  if(!env.DB)return json({error:'Conversation storage is unavailable.'},503);
  let data;try{const raw=await request.text();if(raw.length>12000)return json({error:'Conversation record too large.'},413);data=JSON.parse(raw);}catch{return json({error:'Invalid request.'},400);}
  if(data?.consent!==true||typeof data.conversationId!=='string'||!/^[0-9a-f-]{36}$/i.test(data.conversationId)||typeof data.question!=='string'||!data.question.trim()||data.question.length>1500||typeof data.answer!=='string'||!data.answer.trim()||data.answer.length>4000)return json({error:'A valid consented chat turn is required.'},400);
  const conversationId=data.conversationId;const now=new Date().toISOString();
  const knownIds=new Set(knowledge.map(item=>item.id));
  const sourceId=typeof data.sourceId==='string'&&knownIds.has(data.sourceId)?data.sourceId:null;
  try{
    await env.DB.prepare("DELETE FROM conversations WHERE last_activity_at < datetime('now', '-30 days')").run();
    await env.DB.prepare('INSERT INTO conversations(id,consented_at,created_at,last_activity_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET last_activity_at=excluded.last_activity_at').bind(conversationId,now,now,now).run();
    await env.DB.batch([
      env.DB.prepare('INSERT INTO conversation_messages(conversation_id,role,content,source_id,created_at) VALUES(?,?,?,?,?)').bind(conversationId,'user',data.question.trim(),sourceId,now),
      env.DB.prepare('INSERT INTO conversation_messages(conversation_id,role,content,source_id,created_at) VALUES(?,?,?,?,?)').bind(conversationId,'assistant',data.answer.trim(),sourceId,now),
    ]);
    return json({saved:true,expiresInDays:30});
  }catch{return json({error:'Conversation storage is temporarily unavailable.'},503);}
}

function assetResponse(request,path){
  const found=assets[path];if(!found)return null;
  const bytes=Uint8Array.from(atob(found.data),char=>char.charCodeAt(0));
  const headers=new Headers({'Content-Type':found.type,'X-Content-Type-Options':'nosniff','Cache-Control':path.endsWith('.html')?'no-cache':'public, max-age=3600'});
  return new Response(request.method==='HEAD'?null:bytes,{headers});
}

export default {async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/api/chat/status'&&request.method==='GET')return json({available:!!env.OPENAI_API_KEY,mode:env.OPENAI_API_KEY?'ai':'faq',storage:'opt-in'});
  if(url.pathname==='/api/record')return record(request,env);
  if(url.pathname==='/api/chat'&&!allowRequest(request,'chat',20))return json({error:'Too many questions. Please wait a minute and try again.'},429);
  if(url.pathname==='/api/chat')return makeChatHandler(knowledge,{env:{OPENAI_API_KEY:env.OPENAI_API_KEY,OPENAI_MODEL:env.OPENAI_MODEL}})(request);
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
  const path=url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname);
  return assetResponse(request,path)||new Response('Not found',{status:404});
}};
