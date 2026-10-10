const fs=require('fs'),path=require('path'),d=require('./experiments-lesson218-data.json'),sections=require('./experiments-lesson218-explanation.json');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nav=['problems','answers','test','video/english','video/arabic'].map(x=>'<a href="/'+d.base+'/'+x+'/">'+x+'</a>').join(' · ');
const body=sections.map((s,i)=>'<section class="lesson-section"><span class="section-kicker">'+(i+1)+' · '+esc(s[0])+'</span><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p></section>').join('');
const html='<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"><title>'+d.title+' — Explanation</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Statistical Studies</div><h1>'+d.title+'</h1><!-- SUMMIT_RETROFIT:experiments:NEITHER --><article class="lesson-content">'+body+'</article><nav>'+nav+'</nav></section></main></body></html>';
const dir=path.join(__dirname,'dist',d.base,'explanation');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
