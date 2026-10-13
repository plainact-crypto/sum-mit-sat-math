const fs=require('fs'),path=require('path'),vm=require('vm');
const root=__dirname,base='/advanced-math/polynomial-operations/polynomial-addition/';
function read(name){return fs.readFileSync(path.join(root,name),'utf8')}
function literal(s,a,b){const i=s.indexOf(a),j=s.indexOf(b,i+a.length);if(i<0||j<0)throw Error('Cannot find '+a);return vm.runInNewContext(s.slice(i+a.length,j),Object.create(null),{timeout:1000})}
const groups=literal(read('polynomial-addition-problems.html'),'const groups=',';let n=0');
const qs=literal(read('polynomial-addition-test.html'),'const qs=',';const root=');
const answers=read('polynomial-addition-answers.html');
if(groups.length!==4||groups.map(g=>g[2].length).join('/')!=='3/8/5/2')throw Error('Practice must be 3/8/5/2');
const problems=groups.flatMap(g=>g[2]);
if(problems.length!==18||new Set(problems.map(x=>x[0])).size!==18)throw Error('Practice must have 18 unique questions');
const cards=[...answers.matchAll(/<div class="answer"><h3>(\d+)\. ([\s\S]*?)<\/h3><div class="final">Answer: ([A-D])\) ([\s\S]*?)<\/div>/g)];
if(cards.length!==18)throw Error('Answers must contain exactly 18 solutions');
for(let i=0;i<18;i++){const q=problems[i],m=cards[i];if(Number(m[1])!==i+1||m[2]!==q[0]||m[3]!==String.fromCharCode(65+q[2])||m[4]!==q[1][q[2]])throw Error('Answer alignment mismatch at '+(i+1))}
if(qs.length!==5||qs.map(q=>q.level).join('|')!=='EASY|EASY-MEDIUM|MEDIUM|HARD|HARD / EXAM-STYLE')throw Error('Five progressive Test questions required');
if(qs.some(q=>q.c.length!==4||q.a<0||q.a>3||problems.some(p=>p[0]===q.q)))throw Error('Test choices or uniqueness invalid');
for(const route of ['explanation','problems','answers','test']){const f=path.join(root,'dist',base,route,'index.html');if(!fs.existsSync(f)||/COMING SOON/.test(read(path.relative(root,f))))throw Error('Required route missing: '+route)}
console.log('[lesson62] 18/18 exact Answer alignment; 3/8/5/2 Practice; 5 progressive Test questions: PASS');
