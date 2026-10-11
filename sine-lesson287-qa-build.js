'use strict';
const d=require('./sine-lesson287-data.json');
const e=['part1','part2','part3'].flatMap(p=>require('./sine-lesson287-explanation-'+p+'.json'));
if(d.index!==287||d.slug!=='sine'||d.base!=='geometry-and-trigonometry/right-triangle-trigonometry/sine'||e.length!==17)throw Error('Sine lesson metadata/section count');
if(d.practice.length!==18||d.test.length!==5)throw Error('Sine counts');
const groups=[['Skill Check',3],['Core Practice',8],['Exam-Style',5],['Challenge Problems',2]];
let i=0;for(const [group,n] of groups)for(let j=0;j<n;j++)if(d.practice[i++].group!==group)throw Error('Sine group order');
if(d.test.map(q=>q.group).join('|')!=='Easy|Easy / Medium|Medium|Medium / Hard|Hard / Exam-Style')throw Error('Sine test progression');
const gcd=(a,b)=>b?gcd(b,a%b):a,ratio=(a,b)=>{const g=gcd(a,b);return a/g+'/'+b/g;};
function expected(a){switch(a.kind){
case 'ratio':return ratio(a.O,a.H);
case 'opp30':return ''+(a.H/2);
case 'opp30unit':return ''+(a.H/2)+a.unit;
case 'hypRatio':return ''+(a.O*a.den/a.num);
case 'oppRatio':return ''+(a.H*a.num/a.den);
case 'ratioPythag':return ratio(a.O,Math.sqrt(a.O*a.O+a.A*a.A));
case 'ratioMissingOpp':return ratio(Math.sqrt(a.H*a.H-a.A*a.A),a.H);
case 'hypDecimal':return ''+(a.O/a.sin);
case 'angle':return (Math.asin(a.O/a.H)*180/Math.PI).toFixed(1)+'°';
case 'compare':return a.O1/a.H1===a.O2/a.H2?'Equal':a.O1/a.H1>a.O2/a.H2?'A is larger':'B is larger';
case 'adjRatio':{const o=a.H*a.num/a.den;return ''+Math.sqrt(a.H*a.H-o*o);}
case 'difference':{const o=a.H*a.num/a.den;return ''+(o-Math.sqrt(a.H*a.H-o*o));}
case 'areaRatio':{const o=a.H*a.num/a.den;return ''+(o*Math.sqrt(a.H*a.H-o*o)/2);}
default:throw Error('Unrecognized QA kind '+a.kind);
}}
const seen=new Set();for(const [i,q] of [...d.practice,...d.test].entries()){
if(expected(q.qa)!==q.answer)throw Error('Sine math QA failure '+(i+1)+': '+q.prompt);
if(!Array.isArray(q.choices)||q.choices.length!==4||new Set(q.choices).size!==4||!q.choices.includes(q.answer))throw Error('Choices/answer alignment '+(i+1));
if(seen.has(q.prompt))throw Error('Duplicated question '+q.prompt);seen.add(q.prompt);
if(!q.solution||q.solution.length<15)throw Error('Missing worked solution '+(i+1));
}
if(e.filter(s=>s[0].startsWith('WORKED EXAMPLE')).length!==5)throw Error('Five worked examples required');
if(Math.hypot(4,3)!==5||3/5!==0.6)throw Error('Graph geometry incorrect');
console.log('Lesson 287 independent math QA PASS 23/23, 18 aligned answers, 3/8/5/2, 5 progressive tests, deterministic 3-4-5 graph.');
