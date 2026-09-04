const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'dist');

const replacements=[
  [/SUMMIT SAT MATH/g,'SUMMIT MATH'],
  [/SUMMIT<small>SAT MATH<\/small>/g,'SUMMIT<small>MATH</small>'],
  [/SUMMIT <small>SAT MATH<\/small>/g,'SUMMIT <small>MATH</small>'],
  [/YOUR SAT MATH WORKSPACE/g,'YOUR MATH WORKSPACE'],
  [/BUILT FOR SAT MATH/g,'BUILT FOR MATH MASTERY'],
  [/SAT Math/g,'Math'],
  [/SAT-style/g,'Exam-style'],
  [/SAT Style/g,'Exam Style'],
  [/SAT STYLE/g,'EXAM STYLE'],
  [/SAT Strategy/g,'Exam Strategy'],
  [/SAT STRATEGY/g,'EXAM STRATEGY'],
  [/SAT connection/g,'Exam connection'],
  [/SAT Connection/g,'Exam Connection'],
  [/SAT note/g,'Exam note'],
  [/SAT Note/g,'Exam Note'],
  [/\bSAT\b/g,'exam']
];

function clean(text){for(const [from,to] of replacements)text=text.replace(from,to);return text}
function walk(dir){for(const name of fs.readdirSync(dir)){const file=path.join(dir,name);const stat=fs.statSync(file);if(stat.isDirectory())walk(file);else if(/\.(html|js|json|css)$/i.test(name)){const src=fs.readFileSync(file,'utf8');const next=clean(src);if(next!==src)fs.writeFileSync(file,next)}}}
if(fs.existsSync(dist))walk(dist);
console.log('Brand guard complete: production build is exam-neutral.');
