(function testBuild(){
"use strict";
const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist','advanced-math','quadratic-functions','standard-form','y-intercept','test','index.html');
if(!fs.existsSync(file))throw Error('Lesson 90 canonical test route missing');
let html=fs.readFileSync(file,'utf8');
const marker='if(submitted)return;submitted=true;';
const old="document.getElementById('submitTest').onclick=()=>{const expected=";
if(!html.includes(marker)){
  if(!html.includes(old))throw Error('Lesson 90 test handler changed; refusing unsafe rewrite');
  let n=0;
  html=html.replace(/data-answer="[^"]*"/g,()=> 'data-qid="'+(++n)+'"');
  if(n!==5)throw Error('Lesson 90 expected five test answer fields, found '+n);
  const prefix="let submitted=false;document.getElementById('submitTest').onclick=()=>{if(submitted)return;submitted=true;const button=document.getElementById('submitTest');button.disabled=true;button.textContent='Test Submitted';const expected=";
  html=html.replace(old,prefix);
  const target="inputs=[...document.querySelectorAll('input[data-answer]')];let score=0;";
  const replacement="inputs=[...document.querySelectorAll('input[data-qid]')];inputs.forEach(input=>{input.disabled=true});let score=0;";
  if(!html.includes(target))throw Error('Lesson 90 input selector changed; refusing unsafe rewrite');
  html=html.replace(target,replacement);
}
if((html.match(/data-qid="[1-5]"/g)||[]).length!==5||!html.includes(marker)||!html.includes('Test Submitted')||!html.includes('Score: '))throw Error('Lesson 90 submit-once QA failed');
fs.writeFileSync(file,html);
console.log('Lesson 90 test: five questions, no early feedback, submit-once, disabled inputs PASS');
})();
