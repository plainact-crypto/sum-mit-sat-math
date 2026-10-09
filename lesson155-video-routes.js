const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist','advanced-math','nonlinear-functions','converting-between-representations');
const scenes=[
['One relationship, four views','An equation, table, graph, and context describe the same ordered pairs.'],
['Equation to table','For y=x²-4 and x=-2,-1,0,1,2, outputs are 0,-3,-4,-3,0.'],
['Linear patterns','Constant first differences signal a linear relationship for equal x steps.'],
['Quadratic patterns','Constant second differences signal a quadratic for equal x steps.'],
['Exponential patterns','Constant output ratios signal an exponential for equal x steps.'],
['Table to equation','The values 3,6,12,24 at x=0,1,2,3 match y=3·2^x.'],
['Vertex to equation','Vertex (2,-1), point (3,2): y=3(x-2)²-1.'],
['Roots to equation','Zeros -1 and 5 with y-intercept -5 give y=(x+1)(x-5).'],
['Context and domain','500 people growing 8 percent annually: P(t)=500(1.08)^t for t≥0.'],
['Final checks','Identify the family, transfer anchor features, check one point, preserve units and domain.']
];
const nav='<nav><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../answers/">Answers</a> · <a href="../../test/">Test</a></nav>';
for(const lang of ['english','arabic']){
const dir=path.join(base,'video',lang);fs.mkdirSync(dir,{recursive:true});
const lines=scenes.map((s,i)=>'<section class="lesson-section"><h2>Scene '+(i+1)+': '+s[0]+'</h2><p>'+s[1]+'</p></section>').join('');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Converting Between Representations — Full Lesson</title></head><body><main class="page-shell"><section class="lesson-card"><div class="page-type">FULL LESSON VIDEO / '+lang+'</div><div class="lesson-title">Converting Between Representations</div><article class="lesson-content">'+lines+'</article>'+nav+'</section></main></body></html>';
fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log('Lesson 155 full lesson video content routes generated');