const fs=require('fs'),path=require('path'),vm=require('vm');
const base=path.join(__dirname,'dist/algebra/systems-of-linear-equations/one-solution');
const read=n=>fs.readFileSync(path.join(base,n,'index.html'),'utf8');
function extract(s,start,end){const a=s.indexOf(start);if(a<0)throw Error('Missing '+start);const b=s.indexOf(end,a+start.length);if(b<0)throw Error('Missing '+end);return vm.runInNewContext('('+s.slice(a+start.length,b)+')')}
const groups=extract(read('problems'),'const groups=',';let n=');
const test=extract(read('test'),'const qs=',';const root=');
if(JSON.stringify(groups.map(g=>g[2].length))!=='[3,8,5,2]'||test.length!==5)throw Error('Wrong lesson distribution');
const practice=groups.flatMap(g=>g[2]);if(practice.length!==18)throw Error('Wrong practice count');
const expected=[1,2,2,1,1,2,1,2,1,1,2,2,2,1,1,1,3,0];
const testExpected=[1,2,2,2,2];
const proofs=[
  3+2===-3+8,1!==-2,6+3===9&&6-3===3,2*2+1===-2+7,
  2*4+3===11&&4-3===1,3*4+2*2===16&&4+2*2===8,
  4*4-9===4+3,4+3*3===13&&2*4-3===5,
  5*3-3===13&&2*3+3===9,1!==-2,
  .5*6+3===6&&6-3===3,4*5+6===2*5+16,
  15*4+40===25*4,4/2===6/3&&30!==2*18,
  2*(5/3)+7===-(5/3)+12,12*4+18===15*4+6,
  (8+1)*2-2===5*2+6,2/3*(45/8)+13/4===7&&45/8-13/8===4
];
const testProofs=[3+4===-3+10,1!==-3,3*4+2===14&&4-2===2,5*4+18===8*4+6,3-1===2];
if(proofs.some(x=>!x)||testProofs.some(x=>!x))throw Error('Independent algebra QA failed');
const answers=read('answers');const answerHeads=[...answers.matchAll(/<div class="answer"><h3>(\d+)\.\s*([^<]+)<\/h3>/g)];if(answerHeads.length!==18||answerHeads.some((h,i)=>Number(h[1])!==i+1||h[2]!==practice[i][0]))throw Error('Practice and Answers statement alignment failed');const finals=[...answers.matchAll(/<div class="final">Answer:\\s*([A-D])\\)\\s*([^<]+)<\\/div>/g)];
if(finals.length!==18)throw Error('Expected 18 worked answers, got '+finals.length);
for(let i=0;i<18;i++){if(practice[i][2]!==expected[i]||finals[i][1]!==String.fromCharCode(65+expected[i]))throw Error('Practice/answers mismatch Q'+(i+1))}
for(let i=0;i<5;i++)if(test[i].a!==testExpected[i])throw Error('Test answer mismatch Q'+(i+1));
if(!test[2].q.includes('3x + y = 14')||!test[2].why.includes('4x = 16'))throw Error('Independent test correction not applied');
if(practice.some(q=>test.some(t=>t.q===q[0]&&t.c.join('|')===q[1].join('|'))))throw Error('Practice/test item duplicated');
console.log('Lesson 37 mathematical QA PASS: 18 practice, 18 aligned answers, 5 tests; independently checked');
