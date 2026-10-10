'use strict';
const fs=require('fs'),path=require('path'),d=require('./linear-association-lesson198-math-data.json'),sections=require('./linear-association-lesson198-explanation-content.json'),tools=require('./explanation-tools');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
if(d.classification!=='BOTH'||sections.length!==17||sections[10][0]!=='GRAPH / VISUAL BLOCK'||sections[11][0]!=='DESMOS STRATEGY')throw Error('Explanation section/order/classification QA');
function r(P){const n=P.length,sx=P.reduce((a,p)=>a+p[0],0),sy=P.reduce((a,p)=>a+p[1],0),xx=P.reduce((a,p)=>a+p[0]*p[0],0),yy=P.reduce((a,p)=>a+p[1]*p[1],0),xy=P.reduce((a,p)=>a+p[0]*p[1],0);return (n*xy-sx*sy)/Math.sqrt((n*xx-sx*sx)*(n*yy-sy*sy))}
const g=d.graphs;if(Math.abs(r(g.positive.points)-1)>1e-9||Math.abs(r(g.negative.points)+1)>1e-9||Math.abs(r(g.none.points))>1e-9||!(r(g.weak.points)>0&&r(g.weak.points)<.6))throw Error('Graph correlation QA');
const charts=[
['positive',2,0,'Perfect positive: y = 2x',0],
['negative',-2,12,'Perfect negative: y = 12 - 2x',6],
['none',0,4,'No linear trend: horizontal fitted line y = 4',null],
['outlier',3,-1,'Outlier (4,18) changes the fitted line to y = 3x - 1',1/3]
];
const chartHtml=charts.map(([key,m,b,caption,intercept])=>{const P=g[key].points;const spec={bounds:{xMin:0,xMax:6,yMin:0,yMax:20},lines:[{m,b,qaX:[1,3,5],yIntercept:b,...(intercept===null?{}:{xIntercept:intercept})}],points:P.map(([x,y])=>({x,y,label:'('+x+','+y+')'})),caption,ariaLabel:'Exact scatterplot '+key};tools.verifyGraphSpec(spec);return '<div class="scatter-card"><h3>'+esc(g[key].title)+'</h3><div data-summit-graph="'+esc(JSON.stringify(spec))+'"></div></div>'}).join('');
const body=sections.map(([title,copy],i)=>'<section class="lesson-section"'+(i===10?' data-retrofit-graph="true"':'')+'><h2>'+(i+1)+'. '+esc(title)+'</h2><p>'+esc(copy)+'</p>'+(i===10?'<div class="scatter-grid">'+chartHtml+'</div>':'')+'</section>').join('');
const nav=['problems','answers','test','video/english','video/arabic'].map(s=>'<a href="/'+d.base+'/'+s+'/">'+esc(s)+'</a>').join(' · ');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><script defer src="/explanation-tools.js"></script><title>'+esc(d.title)+' — Explanation | SUMMIT SAT MATH</title><style>.scatter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem}.scatter-card{border:1px solid #d4deeb;border-radius:12px;padding:1rem}.scatter-card svg{max-width:100%;height:auto}</style></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · Two-Variable Data</div><div class="page-type">Explanation</div><h1>'+esc(d.title)+'</h1><!-- SUMMIT_RETROFIT:linear-association:BOTH -->'+body+'<nav>'+nav+'</nav></section></main></body></html>';
const out=path.join(__dirname,'dist',d.base,'explanation');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'index.html'),html);
console.log('Lesson 198: 17 explanation sections, 4 verified scatterplots, Desmos strategy');
