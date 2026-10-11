const assert=require('assert');
const {d,groups}=require('./vertical-translation-build-core');
const norm=s=>String(s).replace(/[−–]/g,'-').replace(/\s+/g,' ').trim();
const expected=[
  'Up '+5+' units.',
  'Down '+4+' units.',
  'Up '+7+' units; vertex (0,'+(-3+7)+').',
  '(2,'+(-1+6)+')',
  'Vertex (0,'+(3-8)+'); maximum '+(3-8)+'.',
  '(3,'+(7-4)+')',
  'k='+(-2-4),
  'g(x)=(x+4)²'+(2-9)+'; vertex ('+(-4)+','+(2-9)+').',
  'Minimum '+(-3+5)+' at x=1.',
  'Down '+5+' units; axis x=3.',
  '(0,'+(-6+10)+')',
  'Vertex (2,'+((2*2-4*2+7)-3)+'); it touches the x-axis once.',
  'Up '+(8-3)+' units; maximum '+8+'.',
  'k='+(9-(-2)),
  'q='+(2-(3*3-6*3+5)),
  '0 real x-intercepts.',
  'k='+(-10)+'; intercept (3,0).',
  'k='+(10-(5*5-4*5+1))+'; vertex (2,'+((2*2-4*2+1)+(10-(5*5-4*5+1)))+'); no real x-intercepts.'
];
assert.strictEqual(d.index,92);
assert.strictEqual(d.slug,'vertical-translation');
assert.strictEqual(d.practice.length,18);
let n=0;
for(const [group,count] of groups)for(let j=0;j<count;j++){
  const q=d.practice[n];
  assert.strictEqual(q.number,n+1);
  assert.strictEqual(q.group,group);
  assert.strictEqual(norm(q.answer),norm(expected[n]),'Math answer mismatch on practice '+(n+1));
  assert(q.solution&&q.solution.length>25,'Missing worked solution '+(n+1));
  n++;
}
assert.strictEqual(n,18);
assert.strictEqual(new Set(d.practice.map(q=>q.question)).size,18,'Duplicate practice');
assert.strictEqual(d.test.length,5);
const testExpected=[
  'Down '+7,
  '('+(-1)+','+(4+3)+')',
  String(-1-(-5)),
  'g has minimum '+((-1)**2-4+5)+' and no x-intercepts',
  String(-4)
];
const difficulty=['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'];
for(let i=0;i<5;i++){
  const q=d.test[i];
  assert.strictEqual(q.number,i+1);
  assert.strictEqual(q.difficulty,difficulty[i]);
  assert.strictEqual(q.options.length,4);
  assert.strictEqual(norm(q.options[q.correct]),norm(testExpected[i]),'Math answer mismatch on test '+(i+1));
  assert(q.solution&&q.solution.length>25,'Missing test explanation '+(i+1));
}
assert.strictEqual(d.explanation.length,13);
assert(d.explanation.some(s=>s[0]==='COMMON MISTAKES'));
assert(d.explanation.some(s=>s[0]==='LESSON RECAP'));
assert.strictEqual(d.video.english.length,8);
assert.strictEqual(d.video.arabic.length,8);
for(const x of [0,1,2,3]){
  const f=(x-1)**2,g=f-3;
  assert.strictEqual(g-f,-3);
}
assert.deepStrictEqual(d.graph.originalVertex,[1,0]);
assert.deepStrictEqual(d.graph.translatedVertex,[1,-3]);
console.log('Lesson 92 independent math QA PASS: 18/18 practice, 5/5 test, graph, structure.');
