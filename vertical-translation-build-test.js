const {d,esc,page,save}=require('./vertical-translation-build-core');
let html='<p>Answer all five questions before submitting. The score and explanations appear after submission.</p>';
for(const q of d.test){html+='<section class="lesson-section"><h3>'+q.number+'. '+esc(q.question)+'</h3><p>'+esc(q.difficulty)+'</p>';html+=q.options.map((o,i)=>'<label class="vt-option"><input type="radio" name="q'+q.number+'" value="'+i+'"> '+esc('ABCD'[i]+'. '+o)+'</label>').join('');html+='</section>';}
html+='<button id="submitTest">Submit Test</button><pre id="testResult" aria-live="polite"></pre>';
html+='<script src="/vertical-translation-test.js"></script>';
save('test',page('Test',html));
