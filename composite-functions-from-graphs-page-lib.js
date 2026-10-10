'use strict';
const fs=require('fs'),path=require('path');
const data=require('./composite-functions-from-graphs-lesson-data.json');
const base=path.join(__dirname,'dist','advanced-math','functions','composite-functions-from-graphs');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sec=(heading,body)=>'<section class="lesson-section"><span class="section-kicker">'+heading+'</span>'+body+'</section>';
function write(route,label,body){
 if(!fs.existsSync(path.join(base,'explanation','index.html')))throw Error('Canonical lesson route missing');
 const html='<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+data.lesson+' — '+label+' | SUMMIT SAT MATH</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Functions</div><div class="page-type">'+label+'</div><div class="lesson-title">'+data.lesson+'</div><article class="lesson-content">'+body+'</article><a class="back" href="/#subjects">← Back to curriculum tree</a></section></main></body></html>';
 const dir=path.join(base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
module.exports={data,esc,sec,write};
