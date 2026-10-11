const {load,esc,page,write,nav}=require('./initial-value-lesson125-common');
for(const [route,file,lang] of [['english','en-chapters','en-US'],['arabic','ar-chapters','ar-EG']]){
const d=load(file);if(d.chapters.length!==12)throw Error('Missing lesson chapters');
const body='<div style="aspect-ratio:16/9;background:#13253d;color:white;padding:30px;border-radius:18px"><h2>Initial Value · Full Lesson</h2><p>12 instructional chapters · '+lang+'</p></div>'+d.chapters.map((c,i)=>'<section><h3>'+(i+1)+'. '+esc(c[0])+'</h3><p>'+esc(c[1])+'</p></section>').join('')+nav;
write('video/'+route,page('Video Explanation · '+route,body,'',lang==='ar-EG'?'ar':'en'));
}
