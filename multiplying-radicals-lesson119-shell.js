'use strict';
const {fs,path,root}=require('./multiplying-radicals-lesson119-lib');
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const sec=(title,body)=>'<section class="lesson-section"><span class="section-kicker">'+title+'</span>'+body+'</section>';
function write(route,title,body){const dir=path.join(root,route);fs.mkdirSync(dir,{recursive:true});const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Multiplying Radicals — '+title+'</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Radical Expressions and Equations</div><div class="page-type">'+title+'</div><div class="lesson-title">Multiplying Radicals</div><article class="lesson-content">'+body+'</article></section></main></body></html>';fs.writeFileSync(path.join(dir,'index.html'),html)}
module.exports={esc,sec,write};
