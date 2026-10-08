export function createPool(connectionString){
 if(!connectionString)return null;
 // Load pg only when a hosted database is configured so FAQ-only local use stays lightweight.
 return import('pg').then(({Pool})=>new Pool({connectionString,ssl:connectionString.includes('.render.com')?{rejectUnauthorized:false}:undefined,max:5}));
}

async function resolvePool(value){return value&&typeof value.then==='function'?await value:value;}

export async function recordTurn(poolValue,data,knowledge){
 if(data?.consent!==true)throw Object.assign(new Error('Explicit consent is required.'),{status:400});
 if(typeof data.conversationId!=='string'||!/^[0-9a-f-]{36}$/i.test(data.conversationId)||typeof data.question!=='string'||!data.question.trim()||data.question.length>1500||typeof data.answer!=='string'||!data.answer.trim()||data.answer.length>4000)throw Object.assign(new Error('A valid consented chat turn is required.'),{status:400});
 const pool=await resolvePool(poolValue);
 if(!pool)throw Object.assign(new Error('Conversation storage is not configured.'),{status:503});
 const id=data.conversationId, now=new Date();
 const sourceId=knowledge.some(item=>item.id===data.sourceId)?data.sourceId:null;
 const client=await pool.connect();
 try{
  await client.query('BEGIN');
  await client.query('DELETE FROM conversations WHERE last_activity_at < NOW() - INTERVAL \'30 days\'');
  await client.query('INSERT INTO conversations(id,consented_at,created_at,last_activity_at) VALUES($1,$2,$2,$2) ON CONFLICT(id) DO UPDATE SET last_activity_at=EXCLUDED.last_activity_at',[id,now]);
  await client.query('INSERT INTO conversation_messages(conversation_id,role,content,source_id,created_at) VALUES($1,$2,$3,$4,$5),($1,$6,$7,$4,$5)',[id,'user',data.question.trim(),sourceId,now,'assistant',data.answer.trim()]);
  await client.query('COMMIT');
  return new Response(JSON.stringify({saved:true}),{status:200,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
 }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}

export async function initializeDatabase(poolValue){
 const pool=await resolvePool(poolValue);if(!pool)return;
 await pool.query(`CREATE TABLE IF NOT EXISTS conversations(
  id UUID PRIMARY KEY, consented_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL, last_activity_at TIMESTAMPTZ NOT NULL
 )`);
 await pool.query(`CREATE TABLE IF NOT EXISTS conversation_messages(
  id BIGSERIAL PRIMARY KEY, conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK(role IN ('user','assistant')), content TEXT NOT NULL, source_id TEXT, created_at TIMESTAMPTZ NOT NULL
 )`);
 await pool.query('CREATE INDEX IF NOT EXISTS conversation_messages_conversation_idx ON conversation_messages(conversation_id, created_at)');
}
