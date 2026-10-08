import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {makeChatHandler} from './chat.mjs';
import {createPool, initializeDatabase, recordTurn} from './postgres.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{process.loadEnvFile(path.join(root,'.env.local'));}catch(e){if(e.code!=='ENOENT')throw e;}
const template=await readFile(path.join(root,'dist/template-knowledge.js'),'utf8');
const app=await readFile(path.join(root,'dist/app.js'),'utf8');
const knowledge=JSON.parse(vm.runInNewContext(template+'\n'+app.split('const $=')[0]+'\nJSON.stringify(knowledge)'));
const handle=makeChatHandler(knowledge,{env:process.env});
const pool=createPool(process.env.DATABASE_URL);
const port=Number(process.env.PORT||4173);
const hostAddress=process.env.HOST|| (process.env.RENDER?'0.0.0.0':'127.0.0.1');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'};
let active=0;
const server=http.createServer(async(req,res)=>{
 try{
 const url=new URL(req.url,`http://127.0.0.1:${port}`);
  if(url.pathname.startsWith('/api/')){
  if(active>=4){res.writeHead(429,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Too many requests. Please try again shortly.'}));return;}
  const host=req.headers.host||`localhost:${port}`;
  const scheme=(req.headers['x-forwarded-proto']||'http').split(',')[0].trim();
  let raw='';for await(const chunk of req){raw+=chunk.toString();if(Buffer.byteLength(raw)>24000){res.writeHead(413);res.end();return;}}
  active++;try{
   let response;
   if(url.pathname==='/api/record'&&req.method==='POST'){
    try{
     if(req.headers.origin!==`${scheme}://${host}`)throw Object.assign(new Error('Invalid origin.'),{status:403});
     response=await recordTurn(pool,JSON.parse(raw),knowledge);
    }catch(error){response=new Response(JSON.stringify({error:error.status?error.message:'Invalid request.'}),{status:error.status||400,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}
   }else response=await handle(new Request(`${scheme}://${host}${url.pathname}`,{method:req.method,headers:req.headers,...(req.method==='POST'?{body:raw}:{})}));
   res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());
  }finally{active--;}return;
 }
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 const relative=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);
 const file=path.resolve(root,'public','.'+relative);
 if(!file.startsWith(path.join(root,'public')+path.sep)||relative.split('/').some(s=>s.startsWith('.'))){res.writeHead(403);res.end();return;}
 const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404);res.end('Not found');}
});
await initializeDatabase(pool);
server.listen(port,hostAddress,()=>console.log(`Admissions assistant listening on ${hostAddress}:${port}\nAI: ${process.env.OPENAI_API_KEY?'configured':'not connected — FAQ mode'}\nDatabase: ${pool?'configured':'not configured'}`));
