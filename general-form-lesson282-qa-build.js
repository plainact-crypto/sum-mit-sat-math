'use strict';
const fs=require('fs'),path=require('path');
const read=f=>JSON.parse(fs.readFileSync(path.join(__dirname,'general-form-lesson282-'+f+'.json'),'utf8'));
const e=[1,2,3,4,5,6].flatMap(i=>read('explanation-part'+i));
const p='abcdefghij'.split('').flatMap(c=>read('practice-'+c));
const t='abc'.split('').flatMap(c=>read('test-'+c));
if(e.length!==16||e.filter(s=>s[0].startsWith('WORKED EXAMPLE')).length!==5||p.length!==18||t.length!==5)throw Error('lesson counts');
let o=0;for(const [group,n] of [['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge Problems',2]]){for(let i=0;i<n;i++)if(p[o++].group!==group)throw Error('group order');}
if(t.map(x=>x.group).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('test progression');
const term=(n,v='')=>n===0?'':(n>0?'+':'−')+(Math.abs(n)===1&&v?'':Math.abs(n))+v;
const eq=(D,E,F)=>'x²+y²'+term(D,'x')+term(E,'y')+term(F)+'=0';
const norm=s=>String(s).replace(/-/g,'−').replace(/\s/g,'');
function expected(q){
const a=q.qa,D=a.D||0,E=a.E||0,F=a.F||0,h=-D/2,k=-E/2,r2=(D*D+E*E)/4-F;
switch(a.kind){
case 'D':return ''+D;case 'E':return ''+E;case 'center':return '('+h+', '+k+')';
case 'radius':return ''+Math.sqrt(r2);
case 'standard':return '(x'+term(-h)+')²+(y'+term(-k)+')²='+r2;
case 'general':return eq(-2*a.h,-2*a.k,a.h*a.h+a.k*a.k-a.r2);
case 'centerRadius':return '('+h+', '+k+'), radius '+Math.sqrt(r2);
case 'classify':return r2<0?'No real points':r2===0?'Single point ('+h+', '+k+')':'Real circle';
case 'through':return eq(-2*a.h,-2*a.k,a.h*a.h+a.k*a.k-((a.x-a.h)**2+(a.y-a.k)**2));
case 'FfromRadius':return ''+((D*D+E*E)/4-a.r2);
case 'xintercepts':{const z=Math.sqrt(D*D-4*F);return '('+((-D-z)/2)+', 0) and ('+((-D+z)/2)+', 0)';}
case 'threshold':return 'k < '+((D*D+E*E)/4);
case 'radicalAxis':if(a.E1!==a.E2||a.D1===a.D2)throw Error('radical-axis setup');return 'x = '+(-(a.F1-a.F2)/(a.D1-a.D2));
case 'classifyBoolean':return r2>0?'Yes':'No';
case 'tangentYAxis':return ''+(E*E/4);
default:throw Error('unknown QA '+a.kind);
}}
const prompts=new Set();for(const q of [...p,...t]){if(norm(expected(q))!==norm(q.answer))throw Error('incorrect '+q.prompt);if(!Array.isArray(q.choices)||q.choices.length!==4||new Set(q.choices).size!==4||!q.choices.includes(q.answer))throw Error('invalid choices');if(prompts.has(q.prompt))throw Error('duplicate');prompts.add(q.prompt);}
console.log('Lesson 282 mathematical QA PASS 23/23; practice 3/8/5/2; test 5; answer alignment 18/18.');

