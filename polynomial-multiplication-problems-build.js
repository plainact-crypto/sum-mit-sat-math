const fs=require('fs'),path=require('path');
const root=__dirname;
const routeBase=path.join('advanced-math','polynomial-operations','polynomial-multiplication');
function copyChecked(sourceName,routeName,markers){
  const src=path.join(root,sourceName),out=path.join(root,'dist',routeBase,routeName,'index.html');
  if(!fs.existsSync(src))throw new Error(`Missing ${sourceName}`);
  const html=fs.readFileSync(src,'utf8');
  for(const marker of markers)if(!html.includes(marker))throw new Error(`${sourceName} failed marker: ${marker}`);
  fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(src,out);return html;
}
copyChecked('polynomial-multiplication-problems.html','problems',['Polynomial Multiplication','18 questions','CHALLENGE PROBLEMS']);
const answers=copyChecked('polynomial-multiplication-answers.html','answers',['ANSWERS &amp; SOLUTIONS','Polynomial Multiplication','Practice Questions 1–18','Answer: A) 6x² + 15x','Answer: A) 1']);
const answerCount=(answers.match(/class="answer"/g)||[]).length;if(answerCount!==18)throw new Error(`Answers must contain exactly 18 solutions; found ${answerCount}`);
const test=copyChecked('polynomial-multiplication-test.html','test',['LESSON TEST','Polynomial Multiplication','Answer all five questions','Submit Test','HARD / EXAM-STYLE']);
const testQuestionCount=(test.match(/level:'/g)||[]).length;if(testQuestionCount!==5)throw new Error(`Lesson Test must contain exactly 5 questions; found ${testQuestionCount}`);
if(!test.includes("box.style.display='block'"))throw new Error('Lesson Test feedback must stay hidden until Submit Test');
const route='/advanced-math/polynomial-operations/polynomial-multiplication/test/';
const schedulePath=path.join(root,'dist','schedule.json');
function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(schedulePath)){
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8')),schedule=original.filter(r=>r.route!==route),removed=original.length-schedule.length;
  if(removed>1)throw new Error(`Expected at most one scheduled Polynomial Multiplication test route; removed ${removed}`);
  if(removed>0){
    const interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;
    schedule.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});
    fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
    const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
    fs.writeFileSync(path.join(root,'dist','schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');
  }
}
console.log('Built Polynomial Multiplication problems, answers, and test routes');
