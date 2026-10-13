const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,read=f=>fs.readFileSync(path.join(root,f),'utf8');
const parse=(s,a,b)=>vm.runInNewContext(s.split(a)[1].split(b)[0],Object.create(null),{timeout:1000});
const groups=parse(read('greatest-common-factor-problems.html'),'const groups=',';let n=0');
const questions=groups.flatMap(g=>g[1]),answers=read('greatest-common-factor-answers.html');
const cards=[...answers.matchAll(/<div class="answer"><h3>(\d+)\. ([\s\S]*?)<\/h3>[\s\S]*?<div class="result">Answer: ([A-D])\) ([\s\S]*?)<\/div>/g)];
if(groups.length!==4||groups.map(g=>g[1].length).join('/')!=='3/8/5/2'||questions.length!==18||cards.length!==18)throw Error('GCF 18-question structure');
for(let i=0;i<18;i++){const q=questions[i],m=cards[i];if(Number(m[1])!==i+1||m[2]!==q[0]||m[3]!==String.fromCharCode(65+q[2])||m[4]!==q[1][q[2]])throw Error('GCF Answer mismatch '+(i+1))}
const tests=parse(read('greatest-common-factor-test.html'),'const qs=',';const root=');
if(tests.length!==5||tests.map(q=>q.level).join('|')!=='EASY|EASY-MEDIUM|MEDIUM|HARD|HARD / EXAM-STYLE')throw Error('GCF Test progression');
if(tests.some(q=>questions.some(p=>p[0]===q.q)))throw Error('GCF Test duplicates Practice');
console.log('[lesson67] 18/18 exact Answers; 3/8/5/2 groups; five progressive Test questions: PASS');
