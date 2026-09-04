const fs=require('fs');
const path=require('path');
const dist=path.join(__dirname,'dist');
if(!fs.existsSync(dist)) process.exit(0);
for(const f of ['explanation-tools.js','explanation-tools.css']) fs.copyFileSync(path.join(__dirname,f),path.join(dist,f));
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name==='index.html'){let h=fs.readFileSync(p,'utf8');if(!/page-type\">Explanation</.test(h))continue;if(!h.includes('/explanation-tools.css'))h=h.replace('</head>','<link rel="stylesheet" href="/explanation-tools.css"></head>');if(!h.includes('/explanation-tools.js'))h=h.replace('</body>','<script src="/explanation-tools.js" defer></script></body>');fs.writeFileSync(p,h)}}}
walk(dist);
console.log('Explanation tools injected into Explanation routes.');
