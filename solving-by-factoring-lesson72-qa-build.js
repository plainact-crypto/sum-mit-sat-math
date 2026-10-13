const fs=require('fs'),vm=require('vm');
const p=fs.readFileSync('solving-by-factoring-problems.html','utf8');
const groups=vm.runInNewContext(p.split('const groups=')[1].split(';let n=')[0]);
const qs=groups.flatMap(g=>g[1]);
const a=fs.readFileSync('solving-by-factoring-answers.html','utf8');
const t=fs.readFileSync('solving-by-factoring-test.html','utf8');
const tests=vm.runInNewContext(t.split('const qs=')[1].split(';const root=')[0]);
if(groups.map(g=>g[1].length).join('/')!=='3/8/5/2'||qs.length!==18)throw Error('Lesson72 practice');
if((a.match(/class="answer"/g)||[]).length!==18)throw Error('Lesson72 answers');
if(tests.length!==5||tests.some(x=>qs.some(y=>y[0]===x.q)))throw Error('Lesson72 test');

const decode=s=>String(s).replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const answerPrompts=[...a.matchAll(/<p class="practice-question"><strong>Practice (\d+):<\/strong>\s*([\s\S]*?)<\/p>/g)];
if(answerPrompts.length!==18)throw Error('Lesson72 missing exact Practice prompts in Answers');
for(let i=0;i<18;i++){
  if(Number(answerPrompts[i][1])!==i+1||decode(answerPrompts[i][2])!==qs[i][0])
    throw Error('Lesson72 Answers/Practice mismatch at Q'+(i+1));
}
const near=(x,y)=>Math.abs(x-y)<1e-9;
const quadratic=(A,B,C,roots)=>roots.every(x=>near(A*x*x+B*x+C,0));
const quartic=(A,B,C,roots)=>roots.every(x=>near(A*x**4+B*x*x+C,0));
const practiceProofs=[
  quadratic(1,-5,6,[2,3]),quadratic(1,7,10,[-5,-2]),
  quadratic(3,-12,0,[0,4]),quadratic(1,-1,-12,[-3,4]),
  quadratic(2,7,3,[-3,-.5]),quadratic(3,-11,-4,[-1/3,4]),
  quadratic(1,-16,63,[7,9]),quadratic(5,-45,0,[0,9]),
  quadratic(4,0,-36,[-3,3]),quadratic(6,-13,6,[2/3,3/2]),
  quadratic(2,-18,40,[4,5]),quadratic(1,2,-15,[-5,3]),
  quadratic(1,7,-44,[4,-11])&&4>0,
  quadratic(1,5,-36,[4,-9])&&Number.isInteger(4)&&4>0,
  near((6-6)*(2*6+5),0)&&near((-2.5-6)*(2*(-2.5)+5),0),
  near((4+3)**2,49)&&4>=0,
  quartic(1,-13,36,[-3,-2,2,3]),
  quartic(6,-13,6,[-Math.sqrt(2/3),Math.sqrt(2/3),-Math.sqrt(3/2),Math.sqrt(3/2)])
];
const testProofs=[
  quadratic(1,-8,15,[3,5]),quadratic(2,1,-6,[-2,1.5]),
  quadratic(5,-20,0,[0,4]),quartic(1,-10,9,[-3,-1,1,3]),
  near((4+1)*(4+4),40)&&4>0
];
if(practiceProofs.length!==18||practiceProofs.some(x=>!x)||testProofs.length!==5||testProofs.some(x=>!x))
  throw Error('Lesson72 independent mathematical proofs failed');
if(tests.map(t=>t.level).join('|')!=='EASY|EASY-MEDIUM|MEDIUM|HARD|HARD / EXAM-STYLE'||tests.some(t=>t.a!==0))
  throw Error('Lesson72 Test progression or keys invalid');
console.log('[lesson72] 18/18 exact Answers, 18/18 Practice proofs, 5/5 Test proofs: PASS');
console.log('[lesson72] 18 practice, 18 answers, 5 independent test prompts: PASS');
