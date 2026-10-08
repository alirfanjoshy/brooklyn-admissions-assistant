import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';

const calls=[];
const db={
  prepare(sql){return{sql,values:[],bind(...values){this.values=values;return this;},async run(){calls.push({sql:this.sql,values:this.values});return{success:true};}};},
  async batch(statements){for(const statement of statements)calls.push({sql:statement.sql,values:statement.values});return statements.map(()=>({success:true}));},
};
const env={DB:db};
const root=await worker.fetch(new Request('https://assistant.test/'),env);
assert.equal(root.status,200);assert.match(root.headers.get('content-type'),/text\/html/);assert.match(await root.text(),/How the admissions guide works/);
const status=await worker.fetch(new Request('https://assistant.test/api/chat/status'),env);
assert.deepEqual(await status.json(),{available:false,mode:'faq',storage:'opt-in'});
const payload={conversationId:'123e4567-e89b-42d3-a456-426614174000',consent:true,question:'How do I apply?',answer:'Use the CUNY application.',sourceId:'apply'};
const unconsented=await worker.fetch(new Request('https://assistant.test/api/record',{method:'POST',headers:{Origin:'https://assistant.test','Content-Type':'application/json'},body:JSON.stringify({...payload,consent:false})}),env);
assert.equal(unconsented.status,400);
const wrongOrigin=await worker.fetch(new Request('https://assistant.test/api/record',{method:'POST',headers:{Origin:'https://other.test','Content-Type':'application/json'},body:JSON.stringify(payload)}),env);
assert.equal(wrongOrigin.status,403);
const saved=await worker.fetch(new Request('https://assistant.test/api/record',{method:'POST',headers:{Origin:'https://assistant.test','Content-Type':'application/json'},body:JSON.stringify(payload)}),env);
assert.equal(saved.status,200);assert.deepEqual(await saved.json(),{saved:true,expiresInDays:30});
assert.equal(calls.length,4);assert.match(calls[0].sql,/last_activity_at < datetime\('now', '-30 days'\)/);assert.match(calls[1].sql,/INSERT INTO conversations/);assert.match(calls[2].sql,/INSERT INTO conversation_messages/);assert.match(calls[3].sql,/INSERT INTO conversation_messages/);
const missingDb=await worker.fetch(new Request('https://assistant.test/api/record',{method:'POST',headers:{Origin:'https://assistant.test','Content-Type':'application/json'},body:JSON.stringify(payload)}),{});
assert.equal(missingDb.status,503);
console.log('Worker route checks passed: assets, status, opt-in persistence, origin validation, and expiry cleanup.');
