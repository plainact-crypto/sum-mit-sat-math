'use strict';
const fs=require('fs'),path=require('path'),d=require('./circle-standard-form-lesson277-data.json');
const file=path.join(__dirname,'dist',d.base,'explanation','index.html');
const h=3,k=-2,r=5,u=22,sx=x=>(x+4)*u,sy=y=>(6-y)*u;
let svg='<svg viewBox="0 0 308 352" role="img" aria-label="Exact circle center (3,-2), radius 5" style="max-width:440px;width:100%">';
for(let x=-4;x<=10;x++)svg+='<line x1="'+sx(x)+'" y1="0" x2="'+sx(x)+'" y2="352" stroke="#e2e8f0"/>';
for(let y=-10;y<=6;y++)svg+='<line x1="0" y1="'+sy(y)+'" x2="308" y2="'+sy(y)+'" stroke="#e2e8f0"/>';
svg+='<line x1="'+sx(0)+'" y1="0" x2="'+sx(0)+'" y2="352" stroke="#64748b"/><line x1="0" y1="'+sy(0)+'" x2="308" y2="'+sy(0)+'" stroke="#64748b"/><circle cx="'+sx(h)+'" cy="'+sy(k)+'" r="'+r*u+'" fill="none" stroke="#0284c7" stroke-width="3"/>';
for(const [x,y] of [[8,-2],[-2,-2],[3,3],[3,-7]]){if((x-h)**2+(y-k)**2!==25)throw Error('circle math mismatch');svg+='<circle cx="'+sx(x)+'" cy="'+sy(y)+'" r="4" fill="#0369a1"/><text x="'+(sx(x)+5)+'" y="'+(sy(y)-5)+'" font-size="10">('+x+','+y+')</text>'}
svg+='</svg>';
const visual='<section class="lesson-section" data-retrofit-graph="true"><h2>Verified coordinate circle</h2>'+svg+'<p>Equal x/y scale; every labeled point satisfies (x−3)²+(y+2)²=25.</p></section>';
let html=fs.readFileSync(file,'utf8');if(!html.includes('SUMMIT_RETROFIT:circle-standard-form:BOTH'))throw Error('classification marker missing');
html=html.replace('</article>',visual+'</article>');fs.writeFileSync(file,html);
console.log('Circle Standard Form: four exact cardinal points verified, SVG graph added.');
