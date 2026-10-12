'use strict';
// Independent option-level mathematical QA. This complements the inequality-coefficient proofs.
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'dist/algebra/linear-inequalities/reversing-the-inequality-sign');
const read=part=>fs.readFileSync(path.join(root,part,'index.html'),'utf8');
function literal(html,start,end){
  const a=html.indexOf(start);
  if(a<0)throw Error('Missing '+start);
  const b=html.indexOf(end,a+start.length);
  if(b<0)throw Error('Missing terminator '+end);
  return vm.runInNewContext('('+html.slice(a+start.length,b)+')');
}
const groups=literal(read('problems'),'const groups=',';let n=');
const practice=groups.flatMap(g=>g[2]);
const test=literal(read('test'),'const qs=',';const root=');
const expectedPractice=[
 'x<-4','x>=-10','x<=-3','x>-3','x<=-5','x<-5',
 'x>=4','x<-6','x<=8','x<4','x>=-2','10',
 'h>6','8','m<10','w>=7','x<-1','x>-2'
];
const expectedTest=['x<-5','x>=-4','x<1','5','x>1'];
const norm=s=>String(s).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')
  .replace(/[−–]/g,'-').replace(/≤/g,'<=').replace(/≥/g,'>=').replace(/\s+/g,'').toLowerCase();
function verify(qs,expected,label){
  if(qs.length!==expected.length)throw Error(label+' count mismatch');
  for(let i=0;i<qs.length;i++){
    const q=qs[i],choices=label==='Practice'?q[1]:q.c,key=label==='Practice'?q[2]:q.a;
    if(!Array.isArray(choices)||choices.length!==4||!Number.isInteger(key)||key<0||key>3)
      throw Error(label+' '+(i+1)+' invalid options/key');
    const hits=choices.map(norm).filter(x=>x===norm(expected[i]));
    if(hits.length!==1||norm(choices[key])!==norm(expected[i]))
      throw Error(label+' '+(i+1)+' mathematically wrong or ambiguous choice: '+JSON.stringify(choices));
  }
}
if(JSON.stringify(groups.map(g=>g[2].length))!=='[3,8,5,2]')throw Error('Practice grouping mismatch');
verify(practice,expectedPractice,'Practice');
verify(test,expectedTest,'Test');
const final=[...read('answers').matchAll(/<div class="final">Answer:\s*([A-D])\)\s*([^<]+)<\/div>/g)];
if(final.length!==18)throw Error('Expected 18 Answer finals');
for(let i=0;i<18;i++){
  const letter=String.fromCharCode(65+practice[i][2]);
  if(final[i][1]!==letter||norm(final[i][2])!==norm(expectedPractice[i]))
    throw Error('Answer '+(i+1)+' does not match independently solved choice');
}
console.log('Lesson 47 option-level math QA PASS: 18 Practice choices, 18 Answer finals, 5 Test choices');
