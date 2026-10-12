const fs=require('fs'),path=require('path'),vm=require('vm');
const base=path.join(__dirname,'dist/algebra/linear-inequalities/reversing-the-inequality-sign');
const read=n=>fs.readFileSync(path.join(base,n,'index.html'),'utf8');
function extract(s,start,end){const a=s.indexOf(start),b=s.indexOf(end,a+start.length);if(a<0||b<0)throw Error('Missing data '+start);return vm.runInNewContext('('+s.slice(a+start.length,b)+')')}
const groups=extract(read('problems'),'const groups=',';let n='),test=extract(read('test'),'const qs=',';const root=');
if(JSON.stringify(groups.map(g=>g[2].length))!=='[3,8,5,2]'||test.length!==5)throw Error('Wrong question distribution');
const practice=groups.flatMap(g=>g[2]);if(practice.length!==18)throw Error('Wrong practice count');
const keys=[1,1,1,1,1,1,1,1,1,0,1,2,1,2,1,1,1,1],testKeys=[1,1,1,1,1];
const specs=[
[-3,0,'>',0,12,'<',-4],[-.2,0,'<=',0,2,'>=',-10],[-2,2,'>=',0,8,'<=',-3],
[-4,7,'<',0,19,'>',-3],[-3,5,'>=',0,20,'<=',-5],[-6,-12,'>',0,18,'<',-5],
[-2,9,'<=',0,1,'>=',4],[-.5,0,'>',0,3,'<',-6],[-.25,0,'>=',0,-2,'<=',8],
[2,-5,'<',-1,7,'<',4],[-7,4,'<=',0,18,'>=',-2],[-8,120,'>=',0,40,'<=',10],
[-2.5,18,'<',0,3,'>',6],[-75,900,'>=',0,300,'<=',8],[-3.5,50,'>',0,15,'<',10],
[-4,100,'<=',0,72,'>=',7],[-6,15,'>',4,25,'<',-1],[-2.5,10,'<',0,15,'>',-2]];
const tests=[[-4,0,'>',0,20,'<',-5],[-2,7,'<=',0,15,'>=',-4],[-6,15,'>',0,9,'<',1],[-6,50,'>=',0,20,'<=',5],[-10,-1,'<',3,-14,'>',1]];
const flip={'<':'>','>':'<','<=':'>=','>=':'<='};
function prove(s){const [a,b,op,c,d,want,bound]=s;const coeff=a-c;if(coeff===0)throw Error('Degenerate inequality');const result=coeff<0?flip[op]:op;const value=(d-b)/coeff;if(result!==want||Math.abs(value-bound)>1e-9)throw Error('Independent inequality proof failed: '+JSON.stringify(s))}
specs.forEach(prove);tests.forEach(prove);
const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');const heads=[...read('answers').matchAll(/<div class="answer"><h3>(\d+)\.\s*([^<]+)<\/h3>/g)];if(heads.length!==18||heads.some((h,i)=>Number(h[1])!==i+1||h[2]!==esc(practice[i][0])))throw Error('Exact Practice/Answers statement alignment failed');
const finals=[...read('answers').matchAll(/<div class="final">Answer:\s*([A-D])\)\s*([^<]+)<\/div>/g)];
if(finals.length!==18)throw Error('Expected 18 aligned solutions');
for(let i=0;i<18;i++)if(practice[i][2]!==keys[i]||finals[i][1]!==String.fromCharCode(65+keys[i]))throw Error('Practice/answers mismatch '+(i+1));
for(let i=0;i<5;i++)if(test[i].a!==testKeys[i])throw Error('Test answer mismatch '+(i+1));
if(practice.some(q=>test.some(t=>t.q===q[0]&&t.c.join('|')===q[1].join('|'))))throw Error('Duplicate practice/test item');
console.log('Lesson 47 independent inequality QA PASS: 18 practice, 18 aligned solutions, 5 test items');
