const {load,esc,page,write,nav}=require('./initial-value-lesson125-common');
const qs=load('test').questions;
if(qs.length!==5)throw Error('Five test questions required');
let body='<h2>Five-question final test</h2>';
qs.forEach((q,i)=>{body+='<section><b>'+esc(q[0])+'</b><h3>'+(i+1)+'. '+esc(q[1])+'</h3>'+q[2].map((c,j)=>'<label style="display:block"><input type="radio" name="t'+i+'" value="'+j+'"> '+String.fromCharCode(65+j)+') '+esc(c)+'</label>').join('')+'</section>';});
body+='<button id="submitTest">Submit Test</button><pre id="result" aria-live="polite"></pre>'+nav;
const key=qs.map(q=>q[3]),solutions=qs.map(q=>q[4]),choices=qs.map(q=>q[2]);
const script='const key='+JSON.stringify(key)+',why='+JSON.stringify(solutions)+',choices='+JSON.stringify(choices)+';let done=false;document.getElementById("submitTest").onclick=function(){if(done)return;done=true;this.disabled=true;let score=0,review=[];key.forEach((a,i)=>{let r=document.querySelector("input[name=t"+i+"]:checked"),v=r?Number(r.value):-1;if(v===a)score++;review.push("Q"+(i+1)+": "+(v===a?"Correct":"Incorrect")+"; answer "+choices[i][a]+"; "+why[i])});document.querySelectorAll("input").forEach(x=>x.disabled=true);document.getElementById("result").textContent="Score: "+score+"/5\n"+review.join("\n")};';
write('test',page('Lesson Test',body,script));
