'use strict';
const {data,esc,sec,write}=require('./composite-functions-from-graphs-page-lib');
const gallery=require('./composite-functions-from-graphs-graph-lib');
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
if(data.practice.length!==18||data.groups.join('/')!=='3/8/5/2'||new Set(data.practice.map(q=>q[1])).size!==18||data.practice.some(q=>q.length!==4))throw Error('18-question QA failed');
const practice='<p>Use the graphs below. Worked solutions appear on the Answers page.</p>'+gallery()+groups.map(g=>sec(g[0],data.practice.slice(g[1],g[2]).map((q,i)=>'<div class="question"><h3>Question '+(g[1]+i+1)+' · Graph '+q[0]+'</h3><p>'+esc(q[1])+'</p></div>').join(''))).join('');
const answers='<p>Each solution matches the identically numbered Practice question.</p>'+gallery()+groups.map(g=>sec(g[0],data.practice.slice(g[1],g[2]).map((q,i)=>'<div class="solution"><h3>Solution '+(g[1]+i+1)+' · Graph '+q[0]+'</h3><p>'+esc(q[1])+'</p><p>'+esc(q[3])+'</p><strong>Answer: '+esc(q[2])+'</strong></div>').join(''))).join('');
write('problems','Practice Problems',practice);write('answers','Answers & Solutions',answers);
console.log('Lesson 109: 18 practice (3/8/5/2) and 18 aligned solutions');
