const fs=require('fs');
const path=require('path');

const root=__dirname;
const token=String.fromCharCode(83,65,84);
const exact=new RegExp(`\\b${token}\\b`,'g');
const replacements=[
  [new RegExp(`SUMMIT ${token} MATH`,'g'),'SUMMIT MATH'],
  [new RegExp(`SUMMIT<small>${token} MATH<\\/small>`,'g'),'SUMMIT<small>MATH</small>'],
  [new RegExp(`SUMMIT <small>${token} MATH<\\/small>`,'g'),'SUMMIT <small>MATH</small>'],
  [new RegExp(`YOUR ${token} MATH WORKSPACE`,'g'),'YOUR MATH WORKSPACE'],
  [new RegExp(`BUILT FOR ${token} MATH`,'g'),'BUILT FOR MATH MASTERY'],
  [new RegExp(`${token} Math`,'g'),'Math'],
  [new RegExp(`${token}-style`,'g'),'Exam-style'],
  [new RegExp(`${token} Style`,'g'),'Exam Style'],
  [new RegExp(`${token} STYLE`,'g'),'EXAM STYLE'],
  [new RegExp(`${token} Strategy`,'g'),'Exam Strategy'],
  [new RegExp(`${token} STRATEGY`,'g'),'EXAM STRATEGY'],
  [new RegExp(`${token} connection`,'g'),'Exam connection'],
  [new RegExp(`${token} Connection`,'g'),'Exam Connection'],
  [new RegExp(`${token} note`,'g'),'Exam note'],
  [new RegExp(`${token} Note`,'g'),'Exam Note'],
  [exact,'exam']
];
function clean(text){for(const [from,to] of replacements)text=text.replace(from,to);return text}
function walk(dir){for(const name of fs.readdirSync(dir)){if(['.git','dist','node_modules','.github'].includes(name))continue;const file=path.join(dir,name);const st=fs.statSync(file);if(st.isDirectory())walk(file);else if(/\.(html|js|md|json|txt)$/i.test(name)&&!['source-neutralize.js','brand-audit.js'].includes(name)){const src=fs.readFileSync(file,'utf8');const next=clean(src);if(next!==src)fs.writeFileSync(file,next)}}}
walk(root);
console.log('Legacy source copy normalized for general-math build.');
