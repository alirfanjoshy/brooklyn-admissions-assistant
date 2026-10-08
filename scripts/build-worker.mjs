import {readFile,writeFile,mkdir,copyFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(root,'public');
const out=path.join(root,'dist');
const template=await readFile(path.join(publicRoot,'template-knowledge.js'),'utf8');
const app=await readFile(path.join(publicRoot,'app.js'),'utf8');
const chatSource=(await readFile(path.join(root,'server/chat.mjs'),'utf8')).replace('export function makeChatHandler','function makeChatHandler');
const knowledge=JSON.parse(vm.runInNewContext(template+'\n'+app.split('const $=')[0]+'\nJSON.stringify(knowledge)'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp'};
const assets={};
async function collect(dir){for(const item of await readdir(dir)){const abs=path.join(dir,item);const info=await stat(abs);if(info.isDirectory()){await collect(abs);continue;}if(item==='brooklyn-campus-illustration.png')continue;const rel='/'+path.relative(publicRoot,abs).split(path.sep).join('/');const bytes=await readFile(abs);assets[rel]={type:mime[path.extname(item).toLowerCase()]||'application/octet-stream',data:bytes.toString('base64')};}}
await collect(publicRoot);
const source=await readFile(path.join(root,'worker/index.js'),'utf8');
const built=source.replace("import {makeChatHandler} from './chat.mjs';",chatSource).replace('__KNOWLEDGE__',JSON.stringify(knowledge)).replace('__ASSETS__',JSON.stringify(assets));
if(built.includes('__KNOWLEDGE__')||built.includes('__ASSETS__'))throw new Error('Worker template placeholders were not replaced.');
await mkdir(path.join(out,'server'),{recursive:true});
await mkdir(path.join(out,'.openai/drizzle'),{recursive:true});
await writeFile(path.join(out,'server/index.js'),built);
await writeFile(path.join(out,'server/package.json'),' {"type":"module"}\n');
await copyFile(path.join(root,'.openai/hosting.json'),path.join(out,'.openai/hosting.json'));
for(const name of await readdir(path.join(root,'drizzle'))){await copyFile(path.join(root,'drizzle',name),path.join(out,'.openai/drizzle',name));}
console.log(`Built Worker with ${Object.keys(assets).length} web assets and ${knowledge.length} knowledge topics.`);
