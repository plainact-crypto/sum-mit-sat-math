(function(){
 const button=document.getElementById('submitTest');
 if(!button)return;
 let submitted=false;
 button.addEventListener('click',function(){
   if(submitted)return;
   const questions=Array.from(document.querySelectorAll('.lesson-test-question'));
   const selections=questions.map((q,i)=>q.querySelector('input[name="q'+i+'"]:checked'));
   const output=document.getElementById('result');
   if(selections.some(x=>!x)){output.textContent='Please answer all five questions before submitting.';return;}
   submitted=true;let score=0;
   const review=questions.map((q,i)=>{
     const correct=Number(selections[i].value)===Number(q.dataset.answer);
     if(correct)score++;
     const options=Array.from(q.querySelectorAll('input'));
     const answer=options.find(x=>Number(x.value)===Number(q.dataset.answer));
     return 'Question '+(i+1)+': '+(correct?'Correct':'Incorrect')+'. Answer: '+(answer?answer.parentNode.textContent.trim():'')+'. '+q.dataset.explain;
   });
   output.textContent='Score: '+score+'/5\n\n'+review.join('\n\n');
   questions.forEach(q=>q.querySelectorAll('input').forEach(x=>x.disabled=true));
   button.disabled=true;
 });
})();
