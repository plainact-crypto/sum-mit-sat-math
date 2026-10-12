const fs=require('fs'),path=require('path'),vm=require('vm');
const base=path.join(__dirname,'dist/algebra/systems-of-linear-equations/solving-graphically');
const read=n=>fs.readFileSync(path.join(base,n,'index.html'),'utf8');
function extract(s,key){const token='const '+key+'=';const i=s.indexOf(token);if(i<0)throw Error('Missing '+key);const a=i+token.length;const b=s.indexOf(';',a);if(b<0)throw Error('Missing terminator '+key);return vm.runInNewContext('('+s.slice(a,b)+')')}
const groups=extract(read('problems'),'groups'),test=extract(read('test'),'qs');
if(JSON.stringify(groups.map(g=>g[2].length))!=='[3,8,5,2]')throw Error('Wrong practice distribution');
const practice=groups.flatMap(g=>g[2]);if(practice.length!==18||test.length!==5)throw Error('Wrong question count');
const expected=['(2, 3)','(3, 5)','(2, 2)','(3, 5)','(4, 4)','(3, 1)','(3, 3)','No solutions','The same line, so infinitely many solutions','(2, 4)','(3, 5)','6','6','The unique solution is (5, -2)','(8, 5)','They are parallel and have no solution','(4, 1)','1'];
const testExpected=['(2, 4)','They are parallel, so the system has no solution','(3, 3)','(8, 8)','Day 6'];
const eq=(a,b)=>Math.abs(a-b)<1e-10;
const proof=[eq(3,2+1)&&eq(3,-2+5),eq(5,2*3-1)&&eq(5,3+2),eq(2,-2+4)&&eq(2,.5*2+1),eq(5,3*3-4)&&eq(5,-3+8),eq(4,.5*4+2)&&eq(4,-4+8),eq(1,-2*3+7)&&eq(1,3-2),eq(3,3/3+2)&&eq(3,-2*3/3+5),4===4&&1!==-6,eq(2*(3*1+2),6*1+4),eq(2+4,6)&&eq(4,2*2),eq(2*3-5,1)&&eq(3+5,8),eq(15+4*6,27+2*6),eq(1.5*6+3,.5*6+9),eq(5,5)&&eq(-2,-2),eq(-.25*8+7,.5*8+1),eq((5-(-1))/(3-0),2)&&5!==-1,eq(.75*4-2,-.5*4+3),eq(1*2+4,6)&&eq(-2*2+10,6)];
const testProof=[eq(2+2,-2+6),1===1&&2!==3,eq(2*3-3,-3+6),eq(.75*8+2,-.25*8+10),eq(12*6+18,8*6+42)];
if(proof.some(x=>!x)||testProof.some(x=>!x))throw Error('Independent algebra QA failed');
const answers=read('answers');const heads=[...answers.matchAll(/<div class="answer"><h3>(\d+)\.\s*([^<]+)<\/h3>/g)];if(heads.length!==18||heads.some((h,i)=>Number(h[1])!==i+1||h[2]!==practice[i][0]))throw Error('Practice/Answers exact statement alignment failed');const finals=[...answers.matchAll(/<div class="final">Answer:\s*([A-D])\)\s*([^<]+)<\/div>/g)];
if(finals.length!==18)throw Error('18 aligned worked answers required; found '+finals.length);
for(let i=0;i<18;i++){
 const [q,expectedAnswer]=[practice[i],expected[i]];const actual=q[1][q[2]];
 if(actual!==expectedAnswer)throw Error('Practice answer wrong Q'+(i+1)+': '+actual);
 const normalized=finals[i][2].trim().replace(/−/g,'-').replace(/\s+hours$/,'');
 if(finals[i][1]!==String.fromCharCode(65+q[2])||normalized!==expectedAnswer)throw Error('Answers misaligned Q'+(i+1));
}
for(let i=0;i<5;i++)if(test[i].c[test[i].a]!==testExpected[i])throw Error('Test answer wrong Q'+(i+1));
const overlap=practice.map(q=>q[0]).filter(q=>test.some(t=>t.q===q));if(overlap.length)throw Error('Duplicate practice/test questions: '+overlap.join('; '));
console.log('Lesson 42 mathematical QA PASS: 18 practice, 18 aligned solutions, 5 progressive test answers; no exact duplicates');
