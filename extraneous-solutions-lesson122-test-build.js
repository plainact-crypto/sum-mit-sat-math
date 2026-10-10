const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist/advanced-math/nonlinear-equations-and-functions/extraneous-solutions/test/index.html');
const qs=require('./extraneous-solutions-lesson122-test-data.json');
if(qs.length!==5)throw Error('Exactly 5 questions required');
const html=qs.map((q,i)=>'<section class="lesson-test-question"><h3>'+(i+1)+'. '+q.difficulty+'</h3><p>'+q.question+'</p>'+q.choices.map((c,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'">'+c+'</label>').join('')+'</section>').join('');
const old=fs.readFileSync(base,'utf8');
fs.writeFileSync(base,old.replace(/<article class="lesson-content">[\\s\\S]*?<\\/article>/,'<article class="lesson-content">'+html+'<button type="button" id="submitTest">Submit Test</button></article>'));
