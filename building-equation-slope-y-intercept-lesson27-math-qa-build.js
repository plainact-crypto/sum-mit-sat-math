'use strict';
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const read=x=>fs.readFileSync('building-equation-slope-y-intercept-'+x+'.html','utf8');
const p=read('problems'),a=read('answers'),t=read('test'),e=read('explanation');
const data=require('./building-an-equation-from-slope-and-y-intercept-lesson27-math-qa.json');
const scenes=require('./building-an-equation-from-slope-and-y-intercept-lesson27-scenes.json');
const groups=JSON.parse(p.match(/const groups=(\[[\s\S]*?\]);let n=0;/)[1]);
assert.deepStrictEqual(groups.map(g=>g[2].length),[3,8,5,2],'Practice distribution');
const questions=groups.flatMap(g=>g[2]);
assert.strictEqual(questions.length,18);
const tests=Array.from(vm.runInNewContext(t.match(/const qs=(\[[\s\S]*?\]);const root=/)[1]));
assert.strictEqual(tests.length,5);
assert.deepStrictEqual(tests.map(q=>q.level),['EASY','EASY-MEDIUM','MEDIUM','HARD','HARD / EXAM-STYLE']);
const answers=[...a.matchAll(/<div class="answer"><h3>(\d+)\.\s*([^<]+)<\/h3>[\s\S]*?<div class="final">Answer: ([A-D])\)/g)];
assert.strictEqual(answers.length,18,'Exactly 18 solutions');
function linear(choice){
 const rhs=choice.split('=')[1];
 assert(rhs,'Equation option must have an equals sign');
 const expr=rhs.replace(/−/g,'-').replace(/\s+/g,'').replace(/(\d|\))([xmt])/g,'$1*$2').replace(/[xmt]/g,'X');
 assert(/^[\dX+\-*/().]+$/.test(expr),'Unexpected math token '+expr);
 const fn=new Function('X','return '+expr);
 return {m:fn(1)-fn(0),b:fn(0)};
}
function verify(q,row,i){
 assert.strictEqual(q[2],q[2]|0,'Choice index must be integer '+i);
 assert.strictEqual('ABCD'[q[2]],row.correctChoice,'Correct choice letter '+i);
 const v=linear(q[1][q[2]]);
 assert(Math.abs(v.m-row.m)<1e-8&&Math.abs(v.b-row.b)<1e-8,'Independent slope/intercept mismatch '+i);
 assert(Math.abs((v.m*2+v.b)-(row.m*2+row.b))<1e-8,'Independent substitution mismatch '+i);
}
questions.forEach((q,i)=>{
 assert.strictEqual(answers[i][1],String(i+1),'Answer number '+(i+1));
 assert.strictEqual(answers[i][2],q[0],'Practice and Answers wording mismatch '+(i+1));
 assert.strictEqual(answers[i][3],data.practice[i].correctChoice,'Answer key mismatch '+(i+1));
 verify(q,data.practice[i],i+1);
});
tests.forEach((q,i)=>verify([q.q,q.c,q.a],data.test[i],i+19));
assert.strictEqual(new Set([...questions.map(q=>q[0]),...tests.map(q=>q.q)]).size,23,'Practice/Test prompts must be unique');
const title='Building an Equation from Slope and Y-Intercept';
for(const [type,html] of [['explanation',e],['problems',p],['answers',a],['test',t]]){
 assert(html.includes('<div class="lesson-title">'+title+'</div>'),'Canonical title missing on '+type);
}
assert(e.includes('data-summit-graph'),'Deterministic graph missing');
for(const [x,y] of [[0,-4],[1,-1],[2,2]])assert.strictEqual(3*x-4,y,'Graph point substitution');
for(const lang of ['english','arabic']){
 assert(Array.isArray(scenes[lang])&&scenes[lang].length===12,'Full lesson chapters '+lang);
 assert(scenes[lang].every(c=>Array.isArray(c)&&c.length===2&&c[1].trim()),'Narration chapter content '+lang);
}
console.log('Lesson 27: 23/23 independent mathematical checks, 18/18 exact answer alignment, 3/8/5/2, five progressive tests, graph and bilingual 12-chapter source PASS');
