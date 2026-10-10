const {d,esc,groups,page,save}=require('./vertical-translation-build-core');
let problems='',answers='',start=0;
for(const [label,count] of groups){
problems+='<section class="lesson-section"><h2>'+esc(label)+'</h2>';
answers+='<section class="lesson-section"><h2>'+esc(label)+'</h2>';
for(const q of d.practice.slice(start,start+count)){
problems+='<div class="vt-item"><h3>'+q.number+'. '+esc(q.question)+'</h3><p>'+esc(q.group)+'</p></div>';
answers+='<div class="vt-item"><h3>'+q.number+'. '+esc(q.question)+'</h3><p><strong>Answer: '+esc(q.answer)+'</strong></p><p>'+esc(q.solution)+'</p></div>';
}
problems+='</section>';answers+='</section>';start+=count;
}
if(start!==18)throw Error('Incorrect problem/answer count');
save('problems',page('Problems',problems));
save('answers',page('Answers',answers));
