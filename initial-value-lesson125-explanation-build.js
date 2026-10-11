const {load,esc,page,write,nav}=require('./initial-value-lesson125-common');
const d=load('explanation');
if(d.slug!=='initial-value'||d.classification!=='DESMOS'||d.sections.length<12)throw Error('Explanation data incomplete');
const body='<!-- SUMMIT_RETROFIT:initial-value:DESMOS --><p><strong>Lesson objective:</strong> Find the initial value of an exponential function, including shifted models.</p>'+d.sections.map((s,i)=>'<section class="lesson-section"><span class="section-kicker">'+String(i+1).padStart(2,'0')+' · '+esc(s[0])+'</span><h2>'+esc(s[1])+'</h2><p>'+s[2]+'</p></section>').join('')+nav;
if(!body.includes('DESMOS STRATEGY'))throw Error('Desmos strategy missing');
write('explanation',page('Explanation',body));
