const fs=require('fs'),path=require('path'),vm=require('vm');
const slug='systems-of-inequalities-word-problems',base=path.join(__dirname,'dist/algebra/systems-of-linear-inequalities',slug);
const read=x=>fs.readFileSync(path.join(base,x,'index.html'),'utf8');
const practice=read('problems'),answers=read('answers'),test=read('test'),explanation=read('explanation');
const start=practice.indexOf('const groups='),end=practice.indexOf(';let n=0;',start);
if(start<0||end<0)throw Error('Missing Practice question data');
const groups=JSON.parse(practice.slice(start+'const groups='.length,end));
if(groups.length!==4||groups.map(g=>g[2].length).join('/')!=='3/8/5/2')throw Error('Practice distribution must be 3/8/5/2');
const qs=groups.flatMap(g=>g[2]);if(qs.length!==18||new Set(qs.map(q=>q[0])).size!==18)throw Error('Practice must have 18 unique questions');
const decode=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const headings=[...answers.matchAll(/<div class="answer"><h3>(\d+)\. ([\s\S]*?)<\/h3>/g)];
const finals=[...answers.matchAll(/<div class="final">Answer: ([A-D])\)/g)];
if(headings.length!==18||finals.length!==18)throw Error('Exactly 18 Answer cards and final answers required');
for(let i=0;i<18;i++){
 if(Number(headings[i][1])!==i+1||decode(headings[i][2])!==qs[i][0])throw Error('Practice/Answers prompt mismatch Q'+(i+1));
 if(finals[i][1]!==String.fromCharCode(65+qs[i][2]))throw Error('Practice/Answers key mismatch Q'+(i+1));
}
for(const title of ['SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'])if(!answers.includes(title))throw Error('Answer grouping missing: '+title);
const pairs=(a,fn)=>a.map(([x,y])=>fn(x,y));
const proof=[
 [true,false,false,false],
 pairs([[8,6],[12,4],[4,5],[10,8]],(x,y)=>3*x+2*y<=42&&x+y>=10),
 [true,false,false,false],
 pairs([[2,6],[5,3],[7,1],[5,4]],(x,y)=>8*x+20*y>=120&&x+y<=8),
 pairs([[30,20],[20,30],[45,20],[25,20]],(x,y)=>x+y<=60&&2*x+1.5*y>=90),
 pairs([[6,2],[5,3],[4,3],[3,2]],(x,y)=>x+y<=8&&x>=2*y),
 [true,false,false,false],
 pairs([[10,12],[16,10],[8,9],[7,15]],(x,y)=>x+y<=25&&x>=8&&y>=10),
 pairs([[14,10],[20,3],[10,15],[18,4]],(x,y)=>4*x+7*y<=140&&x+y>=24),
 pairs([[8,8],[13,6],[6,5],[4,7]],(x,y)=>3*x+2*y<=48&&x+y>=12&&y>=4),
 pairs([[6,5],[7,5],[4,5],[8,3]],(x,y)=>2*x+y<=18&&x+y>=10),
 pairs([[50,150],[60,120],[40,160],[100,110]],(x,y)=>x+y<=200&&50*x+30*y>=7000&&x>=40),
 [1,2,3,4].map(k=>20+10<=35&&2*20+k*10<=70&&k===3),
 [10,11,12,13].map(y=>4*12+6*y<=120&&12+y>=24),
 pairs([[20,30],[25,20],[10,35],[30,20]],(x,y)=>x+y<50&&10*x+5*y>=350),
 [false,false,true,false],
 [7,8,9,10].map(n=>n===Array.from({length:11},(_,x)=>Array.from({length:11},(_,y)=>x>=4&&y>=3&&x+y<=10?1:0).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0)),
 [38,40,42,44].map(n=>n===Math.max(...Array.from({length:13},(_,x)=>Array.from({length:13},(_,y)=>x+y<=12&&2*x+3*y<=30?3*x+4*y:0)).flat()))
];
if(proof.length!==18)throw Error('Independent Practice proof count invalid');
for(let i=0;i<18;i++){const a=proof[i];if(a.length!==4||a.filter(Boolean).length!==1||!a[qs[i][2]])throw Error('Practice mathematical key failed at Q'+(i+1));}
const ts=test.indexOf('const qs='),te=test.indexOf(';const root=',ts);
if(ts<0||te<0)throw Error('Test data not found');
const testQs=vm.runInNewContext(test.slice(ts,te)+';qs',Object.create(null),{timeout:1000});
if(testQs.length!==5||testQs.map(x=>x.level).join('|')!=='EASY|EASY-MEDIUM|MEDIUM|HARD|HARD / EXAM-STYLE')throw Error('Test difficulty progression invalid');
if(testQs.some(t=>qs.some(q=>q[0]===t.q)))throw Error('Test duplicates Practice');
const testProof=[
 [true,false,false,false],
 pairs([[18,14],[16,12],[22,9],[10,21]],(x,y)=>x+y<=30&&2*x+4*y<=80),
 [2,3,4,5].map(k=>12+8<=24&&3*12+k*8<=60&&k===3),
 pairs([[20,25],[18,24],[15,30],[25,20]],(x,y)=>x+y<45&&12*x+6*y>=360),
 [38,40,42,44].map(n=>n===Math.max(...Array.from({length:11},(_,x)=>Array.from({length:11},(_,y)=>x+y<=10&&2*x+3*y<=24?4*x+5*y:0)).flat()))
];
for(let i=0;i<5;i++){if(testProof[i].filter(Boolean).length!==1||!testProof[i][testQs[i].a]||testQs[i].c.length!==4)throw Error('Test mathematical proof failed at Q'+(i+1));}
if(!test.includes('Submit Test')||test.includes('Check Answer'))throw Error('Test must reveal only after submission');
if(!explanation.includes('Systems of Inequalities Word Problems'))throw Error('Explanation missing');
for(const lang of ['english','arabic']){const h=read('video/'+lang);if(!h.includes('Play full lesson')&&!h.includes('تشغيل الدرس بالكامل'))throw Error('Missing full '+lang+' lesson');}
console.log('[lesson57] 18/18 exact aligned solutions, 23/23 independent mathematical option proofs, 3/8/5/2 groups, 5 progressive Test questions, two full-lesson video routes: PASS');
