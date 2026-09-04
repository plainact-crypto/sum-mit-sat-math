const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'dist');
const token=String.fromCharCode(83,65,84);
const forbidden=new RegExp(`\\b${token}\\b`);
const hits=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const file=path.join(dir,name);const st=fs.statSync(file);if(st.isDirectory())walk(file);else if(/\.(html|js|json|css|txt)$/i.test(name)){const text=fs.readFileSync(file,'utf8');if(forbidden.test(text))hits.push(path.relative(dist,file))}}}
if(fs.existsSync(dist))walk(dist);
if(hits.length){console.error('General-math brand audit failed:',hits);process.exit(1)}
console.log('General-math brand audit passed: no legacy exam-specific brand token in production.');
