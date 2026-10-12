const fs=require('fs'),path=require('path');
const base='dist/algebra/linear-inequalities/reversing-the-inequality-sign/video';
for(const lang of ['english','arabic']){
 const scenes=require('./reversing-the-inequality-sign-lesson47-'+lang+'-scenes.json');
 if(scenes.length!==12)throw Error('Expected twelve chapters');
 const dir=path.join(base,lang);fs.mkdirSync(dir,{recursive:true});
 const items=scenes.map((s,i)=>'<section><h2>'+(i+1)+'. '+s[0]+'</h2><p>'+s[1]+'</p></section>').join('');
 fs.writeFileSync(path.join(dir,'index.html'),'<html><head><title>Reversing the Inequality Sign</title></head><body><h1>Full Lesson '+lang+'</h1>'+items+'</body></html>');
}
