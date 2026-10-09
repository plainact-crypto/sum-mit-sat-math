'use strict';
const fs=require('fs'),path=require('path'),d=require('./line-of-best-fit-lesson200-data.json'),sections=require('./line-of-best-fit-lesson200-explanation.json');
const sx=x=>50+x/6*620,sy=y=>350-y/14*300;
const dots=d.graph.points.map(p=>'<circle cx="'+sx(p.x)+'" cy="'+sy(p.y)+'" r="7" fill="#1b7fb5"/><text x="'+(sx(p.x)+7)+'" y="'+(sy(p.y)-9)+'">'+p.label+'</text>').join('');
const graph='<svg viewBox="0 0 720 400" role="img" aria-label="Line of best fit and scattered observations" style="max-width:100%"><line x1="50" y1="350" x2="670" y2="350" stroke="#24517d"/><line x1="50" y1="350" x2="50" y2="50" stroke="#24517d"/><line x1="'+sx(0)+'" y1="'+sy(1)+'" x2="'+sx(6)+'" y2="'+sy(13)+'" stroke="#147b96" stroke-width="3"/>'+dots+'</svg>';
const body=sections.map((s,i)=>'<section class="lesson-section"'+(i===10?' data-retrofit-graph="true"':'')+'><h2>'+(i+1)+'. '+s[0]+'</h2><p>'+s[1]+'</p>'+(i===10?graph:'')+'</section>').join('');
const nav=['problems','answers','test','video/english','video/arabic'].map(s=>'<a href="/'+d.base+'/'+s+'/">'+s+'</a>').join(' · ');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+d.title+' — Explanation | SUMMIT SAT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · Two-Variable Data</div><div class="page-type">Explanation</div><h1>'+d.title+'</h1><!-- SUMMIT_RETROFIT:line-of-best-fit:GRAPH -->'+body+'<nav>'+nav+'</nav></section></main></body></html>';
const dir=path.join(__dirname,'dist',d.base,'explanation');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
