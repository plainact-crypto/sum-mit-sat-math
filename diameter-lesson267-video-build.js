const fs=require('fs'),path=require('path');
const read=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'diameter-lesson267-video-'+n+'.json'),'utf8'));
for(const lang of ['en','ar']){
const scenes='abcd'.split('').flatMap(x=>read(lang+'-'+x));
if(scenes.length!==12)throw Error('Scene count');
const dir=path.join(__dirname,'dist/geometry-and-trigonometry/circles/diameter/video',lang==='en'?'english':'arabic');
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'index.html'),'<html><h1>Diameter</h1>'+scenes.map(s=>'<h2>'+s.title+'</h2><p>'+s.narration+'</p><p>'+s.math+'</p>').join('')+'</html>');
}
