const fs=require('fs');const path=require('path');
const dist=path.join(__dirname,'dist');const index=path.join(dist,'index.html');
if(!fs.existsSync(index))process.exit(0);
for(const file of ['beta-growth.js','beta-growth.css']){const src=path.join(__dirname,file);if(fs.existsSync(src))fs.copyFileSync(src,path.join(dist,file));}
let html=fs.readFileSync(index,'utf8');
if(!html.includes('beta-growth.css'))html=html.replace('</head>','<link rel="stylesheet" href="./beta-growth.css"></head>');
if(!html.includes('beta-growth.js'))html=html.replace('</body>','<script src="./beta-growth.js"></script></body>');
fs.writeFileSync(index,html);
console.log('Founding Beta growth assets wired into dist/index.html');
// Build marker: founding beta acquisition + referral unlock enabled.
