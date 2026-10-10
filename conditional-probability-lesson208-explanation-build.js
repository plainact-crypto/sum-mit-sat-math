const fs=require('fs'),path=require('path'),p='conditional-probability-lesson208-',b='problem-solving-and-data-analysis/probability/conditional-probability';
const a=['sections-1','sections-2','sections-3','sections-4a','sections-4b','sections-5'].flatMap(n=>require('./'+p+n+'.json'));
if(a.length!==15||a[0][0]!=='LESSON OBJECTIVE'||a[14][0]!=='NEXT STEP')throw Error('Explanation order QA');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const nav=['problems','answers','test','video/english','video/arabic'].map(n=>'<a href="/'+b+'/'+n+'/">'+n+'</a>').join(' · ');
const body=a.map((v,i)=>'<section class="lesson-section"><h2>'+(i+1)+'. '+esc(v[0])+'</h2><p>'+esc(v[1])+'</p></section>').join('');
const h='<!doctype html><html lang="en"><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>Conditional Probability — Explanation</title><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis · Probability</div><h1>Conditional Probability</h1><!-- SUMMIT_RETROFIT:conditional-probability:NEITHER -->'+body+'<nav>'+nav+'</nav></section></main></html>';
const d=path.join('dist',b,'explanation');fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),h);