const {d,esc,page,save}=require('./vertical-translation-build-core');
const graph=require('./vertical-translation-build-graph');
let html='<!-- SUMMIT_RETROFIT:vertical-translation:DESMOS -->';
for(let i=0;i<d.explanation.length;i++){
const x=d.explanation[i];
html+='<section class="lesson-section"><span class="section-kicker">'+esc(x[0])+'</span><h2>'+esc(x[1])+'</h2><p>'+esc(x[2])+'</p></section>';
if(i===8){
html+='<section class="lesson-section" data-retrofit-graph="true"><span class="section-kicker">DETERMINISTIC GRAPH</span><h2>Every point moves down three units.</h2>'+graph()+'<p>Blue: f(x)=(x−1)²; orange: g(x)=(x−1)²−3. The vertices are (1,0) and (1,−3). At x=0,1,2, the output difference is −3. Every plotted point is computed from its equation.</p></section>';
const fields=[['Enter','enter'],['Look for','lookFor'],['Use it to answer','useIt'],['Why it works','why'],['Faster or not?','faster']];
html+='<section class="lesson-section summit-desmos-strategy"><span class="section-kicker">DESMOS STRATEGY</span><h2>Verify the shift graphically</h2>'+fields.map(([a,b])=>'<h3>'+a+'</h3><p>'+esc(d.desmos[b])+'</p>').join('')+'<p><b>Independent math check:</b> '+esc(d.desmos.mathCheck)+'</p></section>';
}}
html+='<section class="lesson-section next-step"><span class="section-kicker">NEXT STEP</span><h2>Apply the rule</h2><p>Work through the 18 practice questions, review the 18 aligned solutions, then complete the five-question Lesson Test. Full English and Arabic lesson video routes are linked below.</p></section>';
save('explanation',page('Explanation',html));
