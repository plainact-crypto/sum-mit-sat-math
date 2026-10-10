const {d,esc,page,save}=require('./vertical-translation-build-core');
function scenes(lang){return '<section class="lesson-section"><span class="section-kicker">STANDARD FULL LESSON · '+lang.toUpperCase()+'</span><h2>'+esc(lang==='arabic'?'الإزاحة الرأسية':'Vertical Translation')+'</h2><p>Complete lesson presentation with worked examples, exam strategy, and recap.</p></section>'+d.video[lang].map((x,i)=>'<section class="lesson-section"><span class="section-kicker">SCENE '+(i+1)+' / '+d.video[lang].length+'</span><h2>'+esc(x[0])+'</h2><p>'+esc(x[1])+'</p></section>').join('');}
save('video/english',page('Video Explanation · English',scenes('english')));
save('video/arabic',page('Video Explanation · Arabic',scenes('arabic'),'ar'));
save('video',page('Video Explanation · English',scenes('english')));
