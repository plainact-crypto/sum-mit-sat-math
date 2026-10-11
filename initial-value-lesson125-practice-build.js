const {load,esc,page,write,nav}=require('./initial-value-lesson125-common');
const d=load('practice'),qs=d.questions;
if(d.slug!=='initial-value'||qs.length!==18||d.groups.join(',')!=='3,8,5,2')throw Error('18/3-8-5-2 practice contract failed');
const names=['SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'];
let offset=0,problems='',answers='';
for(let g=0;g<4;g++){const group=qs.slice(offset,offset+d.groups[g]);let p='',a='';
for(let j=0;j<group.length;j++){const n=offset+j+1,q=group[j];if(q[1].length!==4||q[2]<0||q[2]>3||!q[3])throw Error('Bad question '+n);
p+='<div class="q" data-answer="'+q[2]+'"><h3>'+n+'. '+esc(q[0])+'</h3>'+q[1].map((c,k)=>'<label style="display:block;margin:7px"><input type="radio" name="p'+n+'" value="'+k+'"> '+String.fromCharCode(65+k)+') '+esc(c)+'</label>').join('')+'<button class="check" type="button">Check Answer</button><div class="feedback" aria-live="polite"></div></div>';
a+='<div class="solution"><h3>'+n+'. '+esc(q[0])+'</h3><strong>Answer: '+String.fromCharCode(65+q[2])+') '+esc(q[1][q[2]])+'</strong><p>'+esc(q[3])+'</p></div>';
}problems+='<section><h2>'+names[g]+'</h2>'+p+'</section>';answers+='<section><h2>'+names[g]+'</h2>'+a+'</section>';offset+=d.groups[g];}
const script="document.querySelectorAll('.check').forEach(b=>b.onclick=()=>{const q=b.closest('.q'),r=q.querySelector('input:checked'),f=q.querySelector('.feedback');f.textContent=!r?'Select an answer first.':Number(r.value)===Number(q.dataset.answer)?'Correct!':'Try again.';});";
write('problems',page('Practice Problems','<h2>18 questions · 3 Skill Check / 8 Core / 5 Exam-Style / 2 Challenge</h2>'+problems+nav,script));
write('answers',page('Answers & Solutions','<h2>18 aligned worked solutions</h2>'+answers+nav));
