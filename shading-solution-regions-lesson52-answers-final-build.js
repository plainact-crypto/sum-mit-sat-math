const fs=require('fs'),path=require('path'),vm=require('vm');
const root=__dirname,base='/algebra/linear-inequalities/shading-solution-regions/';
const problemCode=fs.readFileSync(path.join(root,'shading-solution-regions-build.js'),'utf8');
const answerCode=fs.readFileSync(path.join(root,'shading-solution-regions-answers-build.js'),'utf8');
function literal(src,beginMarker,endMarker){
 const i=src.indexOf(beginMarker),j=src.indexOf(endMarker,i+beginMarker.length);
 if(i<0||j<0)throw Error('Lesson 52 canonical data not found: '+beginMarker);
 return vm.runInNewContext(src.slice(i+beginMarker.length,j+1),Object.create(null),{timeout:1000});
}
const groups=literal(problemCode,'const groups=','];'+String.fromCharCode(10)+'const esc=');
const answers=literal(answerCode,'const answers=','];'+String.fromCharCode(10)+'if(answers.length');
if(groups.length!==4||groups.map(g=>g[2].length).join('/')!=='3/8/5/2'||answers.length!==18)throw Error('Canonical 18-question structure invalid');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let index=0;
const sections=groups.map(g=>{
 const cards=g[2].map(item=>{
  const a=answers[index],letter=String.fromCharCode(65+item[2]),number=++index;
  if(!a||a[0]!==letter)throw Error('Solution letter does not match Practice Q'+number);
  return '<article class="answer-card"><div class="answer-top"><span class="qnum">'+number+'</span><strong>'+letter+') '+esc(item[1][item[2]])+'</strong></div><h3>'+esc(item[0])+'</h3><p>'+esc(a[1])+'</p></article>';
 }).join('');
 return '<section class="answer-group"><span class="section-kicker">'+esc(g[0])+'</span><h2>'+esc(g[1])+'</h2><div class="answer-grid">'+cards+'</div></section>';
}).join('');
if(index!==18)throw Error('Answer count not 18');
const css='<style>.answers-wrap{width:min(980px,100%);margin:auto}.answers-head{text-align:center;margin-bottom:28px}.answers-head h1{font-size:clamp(34px,5vw,54px);margin:10px auto 12px}.answer-group{margin:22px 0}.answer-group h2{margin:8px 0 14px}.answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.answer-card{padding:20px;border:1px solid var(--line);background:var(--surface);border-radius:18px;box-shadow:var(--shadow)}.answer-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}.qnum{min-width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--surface2);font-weight:800;color:var(--blue)}.answer-top strong{font-size:15px}.answer-card h3{font-size:16px;line-height:1.55;margin:0 0 10px}.answer-card p{margin:0;line-height:1.65}.answers-footer{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:28px}.answers-footer a{padding:13px 17px;border-radius:13px;border:1px solid var(--line);font-weight:800}@media(max-width:700px){.answer-grid{grid-template-columns:1fr}}</style>';
const html='<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Shading Solution Regions — Answers &amp; Solutions | SUMMIT MATH</title>'+css+'</head><body><header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a><a href="/#subjects">Progress</a></nav><div class="actions"><button class="lang">EN <span>|</span> عربي</button><button id="themeToggle" class="theme">◐</button></div></header><main class="page-shell"><div class="answers-wrap"><div class="answers-head"><div class="crumb">Algebra · Linear Inequalities</div><div class="page-type">ANSWERS &amp; SOLUTIONS</div><h1>Shading Solution Regions</h1><p>All 18 questions reproduced exactly from Practice, with verified answers and reasoning.</p></div>'+sections+'<div class="answers-footer"><a href="../problems/">← Back to Problems</a><a href="../explanation/">Review Explanation</a><a href="../test/">Take Lesson Test →</a></div></div></main><script>const saved=localStorage.getItem("summit-theme")||"light";document.documentElement.dataset.theme=saved;document.getElementById("themeToggle").onclick=()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("summit-theme",next)};</script></body></html>';
const target=path.join(root,'dist',base,'answers');fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'index.html'),html);
console.log('[lesson52] canonical Answers aligned: 18/18 across 3/8/5/2');
