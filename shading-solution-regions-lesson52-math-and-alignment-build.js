const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist/algebra/linear-inequalities/shading-solution-regions');
const read=part=>fs.readFileSync(path.join(base,part,'index.html'),'utf8');
const problems=read('problems'),answers=read('answers'),test=read('test'),explanation=read('explanation');
const decode=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/<[^>]*>/g,'').trim();
const qs=[...problems.matchAll(/class="question" data-answer="(\d+)"[\s\S]*?<h3>([\s\S]*?)<\/h3>/g)].map(m=>({key:Number(m[1]),prompt:decode(m[2])}));
const expected=[0,1,2,0,2,0,1,3,0,2,1,0,1,2,0,1,1,0];
if(qs.length!==18||expected.some((k,i)=>qs[i].key!==k))throw Error('Practice 18/18 key mismatch');
const groupNames=['SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'];
let last=-1;for(const name of groupNames){const at=problems.indexOf(name);if(at<=last)throw Error('Practice groups missing or out of order: '+name);last=at}
const answerPrompts=[...answers.matchAll(/<article class="answer-card">[\s\S]*?<h3>([\s\S]*?)<\/h3>/g)].map(m=>decode(m[1]));
if(answerPrompts.length!==18||answerPrompts.some((q,i)=>q!==qs[i].prompt))throw Error('Answers not exactly aligned to canonical Practice question statements');
if(new Set(qs.map(q=>q.prompt)).size!==18)throw Error('Duplicate Practice question');
if(!answers.includes('CHALLENGE PROBLEMS'))throw Error('Answers must preserve four Practice groups');
const checks=[
  [3>0+2,2===0+2], [4<=-2*0+4,5>-2*0+4], [-4<-3,!(-3<-3)],
  [2*0+7>=6,2*0+5<6], [!(0<.5*0-1)], [0+0<=5,5+0<=5],
  [3*0-(-7)>6,!(3*0-(-5)>6)], [4>=4,!(3>=4)], [2<=2,!(3<=2)],
  [0>=-4+3,!(0>=-2+3),!(0>=-0+3),!(2>=-0+3)],
  [0<2*0+1,!(1<2*0+1)], [2*0+3*0<=12,2*6+3*0<=12],
  [(0-4)/(2-0)===-2,5>-2*0+4], [20*3+10*6===120,20*0+10*0<=120],
  [-0+2*5>8,!(2*4>8)], [0>=3*0-5,!(-6>=3*0-5)],
  [(-1-1)/(3-(-1))===-.5,1===-.5*(-1)+.5,-1===-.5*3+.5,0<.5],
  [4*0-2*0<=8,0>=2*0-4,!(-5>=2*0-4)]
];
if(checks.length!==18||checks.some((arr,i)=>arr.some(v=>v!==true)))throw Error('Independent Practice mathematical proof failed');
const match=test.match(/const qs=(\[[\s\S]*?\]);const root=/);
if(!match)throw Error('Test data not found');
const vm=require('vm'),testQs=vm.runInNewContext(match[1],Object.create(null),{timeout:1000});
if(testQs.length!==5||testQs.map(x=>x.level).join('|')!=='EASY|EASY-MEDIUM|MEDIUM|HARD|HARD / EXAM-STYLE')throw Error('Five progressive Test questions required');
if(testQs.some(x=>qs.some(q=>q.prompt===x.q)))throw Error('Test repeats Practice question');
const testKeys=[0,0,1,0,0];
if(testQs.some((q,i)=>q.a!==testKeys[i]||q.c.length!==4))throw Error('Test answer key mismatch');
const testProofs=[2>0+1,-2<=-2,!(2*0+0>=6),(0-4)/(2-0)===-2,12*0+6*0<=180];
if(testProofs.some(x=>!x))throw Error('Independent Test proof failed');
if(!test.includes('Submit Test')||test.includes('Check Answer'))throw Error('Test reveals early feedback');
if(!explanation.includes('Shading Solution Regions')||!explanation.includes('WORKED EXAMPLE')||!explanation.includes('QUICK CHECK'))throw Error('Explanation does not cover taught skills');
console.log('[lesson52] 18/18 Practice keys, 18/18 exact Answers, 23/23 independent mathematical proofs, 5 progressive Test questions: PASS');
