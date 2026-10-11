'use strict';
const fs=require('fs'),path=require('path');
const sections=[1,2,3,4,5,6].flatMap(i=>require('./general-form-lesson282-explanation-part'+i+'.json'));
const base='geometry-and-trigonometry/circles/circle-equation/general-form',root=path.join(__dirname,'dist',base,'explanation');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D=-6,E=4,F=-12,h=-D/2,k=-E/2,r=Math.sqrt((D*D+E*E)/4-F),scale=16,cx=175,cy=150;
if(h!==3||k!==-2||r!==5)throw Error('graph source invalid');
const pts=[[h+r,k],[h-r,k],[h,k+r],[h,k-r]];
for(const [x,y] of pts)if(x*x+y*y+D*x+E*y+F!==0)throw Error('graph point incorrect');
const originX=cx-h*scale,originY=cy+k*scale;
let svg='<svg viewBox="0 0 360 310" role="img" aria-label="Circle centered at 3 comma minus 2 with radius 5, four verified points" style="max-width:440px;width:100%"><path d="M0 '+originY+' H360 M'+originX+' 0 V310" stroke="#64748b" stroke-width="1.5"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r*scale)+'" fill="none" stroke="#2563eb" stroke-width="3"/><circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#e11d48"/><text x="'+(cx+7)+'" y="'+(cy+16)+'" font-size="12">C(3,−2)</text>';
for(const [x,y] of pts){const px=cx+(x-h)*scale,py=cy-(y-k)*scale;svg+='<circle cx="'+px+'" cy="'+py+'" r="4" fill="#0f766e"/><text x="'+(px+5)+'" y="'+(py-7)+'" font-size="11">('+x+','+y+')</text>';}svg+='</svg><figcaption>From x²+y²−6x+4y−12=0: center (3,−2), radius 5; all labeled points verified by substitution.</figcaption>';
const desmos='<div class="lesson-section desmos-strategy"><h3>DESMOS STRATEGY</h3><p><b>Enter:</b> x^2+y^2-6x+4y-12=0</p><p><b>Look for:</b> center (3,−2), radius 5, and endpoints (−2,−2), (8,−2).</p><p><b>Use it to answer:</b> confirm the center and radius from completing squares.</p><p><b>Why it works:</b> the equation is equivalent to (x−3)²+(y+2)²=25.</p><p><b>Faster or not?</b> Algebra is faster for exact values; Desmos is useful for a visual check.</p></div>';
const nav=['explanation','problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+base+'/'+x+'/">'+esc(x)+'</a>').join(' · ');
let body='<article class="lesson-content"><!-- SUMMIT_RETROFIT:general-form:BOTH -->';
sections.forEach((s,i)=>{body+='<section class="lesson-section"><span class="section-kicker">'+String(i+1).padStart(2,'0')+' · '+esc(s[0])+'</span><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>';if(i===10)body+='<figure data-retrofit-graph="true">'+svg+'</figure>';if(i===11)body+=desmos;if(i===14)body+='<details><summary>Reveal quick-check answers</summary><p>'+esc(s[2])+'</p></details>';else body+='<p class="tip-line">'+esc(s[2])+'</p>';body+='</section>';});body+='</article>';
const html='<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>General Form — Explanation | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT <small>SAT MATH</small></a><nav><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Geometry and Trigonometry · Circles · Circle Equation</div><div class="page-type">Explanation</div><div class="lesson-title">General Form</div>'+body+'<nav class="next-links">'+nav+'</nav></section></main></body></html>';
fs.mkdirSync(root,{recursive:true});fs.writeFileSync(path.join(root,'index.html'),html);console.log('Lesson 282 explanation: 16 sections, deterministic graph, verified Desmos.');

