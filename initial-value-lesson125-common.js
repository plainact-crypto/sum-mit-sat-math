const fs=require('fs'),path=require('path');
const base='advanced-math/exponential-functions/initial-value';
const title='Initial Value';
const load=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'initial-value-lesson125-'+n+'.json'),'utf8'));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function page(type,body,script='',lang='en'){
const header='<header class="topbar"><a class="brand" href="/"><span class="brand-mark"></span><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header>';
return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+title+' — '+type+'</title></head><body>'+header+'<main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Exponential Functions</div><div class="page-type">'+type+'</div><div class="lesson-title">'+title+'</div><div class="subject-label">Advanced Math</div><article class="lesson-content">'+body+'</article></section></main><script>'+script+'</script></body></html>';
}
function write(route,html){const f=path.join(__dirname,'dist',base,route,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);console.log('[lesson125] '+route);}
const nav='<p><a href="../explanation/">Explanation</a> · <a href="../problems/">Problems</a> · <a href="../answers/">Answers</a> · <a href="../test/">Test</a> · <a href="../video/english/">English</a> · <a href="../video/arabic/">Arabic</a></p>';
module.exports={load,esc,page,write,nav};
