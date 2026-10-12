const fs=require('fs');
const file='dist/algebra/linear-inequalities/reversing-the-inequality-sign/explanation/index.html';
let html=fs.readFileSync(file,'utf8');
const anchor='<a href="../answers/">Answers & Solutions<span>Check your work</span></a>';
if(!html.includes(anchor))throw Error('Lesson 47 next-step anchor missing');
if(!html.includes('href="../test/"'))html=html.replace(anchor,anchor+'<a href="../test/">Lesson Test<span>Five progressive questions</span></a>');
fs.writeFileSync(file,html);
