'use strict';
const chatDialog=document.querySelector('#bulldog-dialog');
const launchButton=document.querySelector('#bulldog-launcher');
const chatScroll=document.querySelector('#chat-scroll');
let chatReturnFocus=null;
chatScroll.append(document.querySelector('#conversation'));
document.querySelector('#chat-composer-slot').append(document.querySelector('#composer-area'));
function updateChatIntro(){document.querySelector('#chat-intro').hidden=!!document.querySelector('#conversation').children.length;document.querySelector('#conversation').hidden=!document.querySelector('#conversation').children.length;chatScroll.scrollTop=chatScroll.scrollHeight;}
function openBulldogChat(){if(chatDialog.open)return;chatReturnFocus=document.activeElement;updateChatIntro();chatDialog.showModal();document.body.classList.add('chat-is-open');launchButton.setAttribute('aria-expanded','true');document.querySelector('#question').focus({preventScroll:true});}
function closeBulldogChat(){if(!chatDialog.open)return;chatDialog.close();}
chatDialog.addEventListener('close',()=>{document.body.classList.remove('chat-is-open');launchButton.setAttribute('aria-expanded','false');if(chatReturnFocus?.isConnected)chatReturnFocus.focus({preventScroll:true});else launchButton.focus();});
chatDialog.addEventListener('click',e=>{if(e.target===chatDialog)closeBulldogChat();});
launchButton.addEventListener('click',openBulldogChat);
document.querySelectorAll('[data-open-chat]').forEach(b=>b.addEventListener('click',openBulldogChat));
document.querySelector('#close-chat').addEventListener('click',closeBulldogChat);
document.querySelector('#reset-chat').addEventListener('click',()=>{document.querySelector('#conversation').replaceChildren();document.querySelector('#question').value='';updateChatIntro();chatScroll.scrollTop=0;document.querySelector('#question').focus();});
document.querySelector('#new-chat').addEventListener('click',()=>{updateChatIntro();chatScroll.scrollTop=0;});
const topicSearch=document.querySelector('#chat-topic-search');
function renderChatTopics(){const query=topicSearch.value.toLowerCase().trim();const found=knowledge.filter(k=>[k.title,k.source,k.body,k.question,k.group].join(' ').toLowerCase().includes(query));const results=document.querySelector('#chat-topic-results');results.replaceChildren();for(const item of found){const button=element('button','chat-topic-button',item.template?item.title:item.source);button.addEventListener('click',()=>{const row=element('article','message user');row.append(element('div','bubble',item.template?item.question:item.source));document.querySelector('#conversation').append(row);addAnswer(item);document.querySelector('#conversation').hidden=false;chatScroll.scrollTop=chatScroll.scrollHeight;document.querySelector('#question').focus();});results.append(button);}document.querySelector('#chat-topic-count').textContent=found.length?found.length+' topics · Answers link to official sources':'No topics found. Try another keyword.';}
topicSearch.addEventListener('input',renderChatTopics);renderChatTopics();
