const fs=require('fs');
const path=require('path');
const root=__dirname;

// Worker 5 canonical package gate. The content builder performs the structural
// QA for exactly 18 practice questions (3/8/5/2), 18 aligned solutions and 5 tests.
require('./two-real-solutions-content-build.js');

const staged=path.join(root,'dist','lessons','advanced-math','quadratic-equations','two-real-solutions');
const live=path.join(root,'dist','advanced-math','quadratic-equations','two-real-solutions');
if(!fs.existsSync(staged)) throw new Error('Two Real Solutions staged package missing');
fs.mkdirSync(live,{recursive:true});
for(const name of ['index.html','problems','answers','test']){
  const src=path.join(staged,name),dst=path.join(live,name);
  if(!fs.existsSync(src)) throw new Error('Two Real Solutions package component missing: '+name);
  fs.cpSync(src,dst,{recursive:true,force:true});
}

// Keep the standard full lesson video route tied to this lesson. Shorts/social
// video are intentionally not touched by this production gate.
require('./video-two-real-solutions-explainer.js');

for(const rel of ['index.html','problems/index.html','answers/index.html','test/index.html','video/english/index.html']){
  const p=path.join(live,rel);
  if(!fs.existsSync(p)) throw new Error('Two Real Solutions live route missing after build: '+rel);
}
const practice=fs.readFileSync(path.join(live,'problems','index.html'),'utf8');
const answers=fs.readFileSync(path.join(live,'answers','index.html'),'utf8');
const test=fs.readFileSync(path.join(live,'test','index.html'),'utf8');
const video=fs.readFileSync(path.join(live,'video','english','index.html'),'utf8');
for(const marker of ['Skill Check','Core Practice','Exam-Style','Challenge']) if(!practice.includes(marker)) throw new Error('Practice alignment marker missing: '+marker);
if((answers.match(/<article class="lesson-card">/g)||[]).length!==18) throw new Error('Two Real Solutions must have exactly 18 aligned answers');
if((test.match(/<article class="lesson-card">/g)||[]).length!==5) throw new Error('Two Real Solutions must have exactly 5 test questions');
if(!video.includes('SUMMIT_EXPLAINER:two-real-solutions')) throw new Error('Two Real Solutions standard video embed missing');
console.log('Two Real Solutions production package QA passed: explanation + 18 practice (3/8/5/2) + 18 solutions + 5 tests + full English video.');
