/* Lesson #225 release builder: full English and Arabic narrated 16:9 routes. */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const d=require('./vertical-angles-lesson225-data.js');
const c=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync('curriculum.json.gz.b64','utf8').trim(),'base64')));
const ls=[];for(const s of c)for(const a of s.sections||[]){ls.push(...a.leaves||[]);for(const g of a.groups||[])ls.push(...g.leaves||[]);}
if(ls.length!==298||ls[224].title!=='Vertical Angles')throw Error('Wrong lesson #225');
require('./vertical-angles-lesson225-content-build.js');
const base=path.join('dist',ls[224].base.split('/').filter(Boolean).join(path.sep));
const enFile=path.join(base,'video','english','index.html'),arFile=path.join(base,'video','arabic','index.html');
let h=fs.readFileSync(enFile,'utf8');
const a=h.indexOf('const scenes='),b=h.indexOf(';let i=0,play=false;',a);
if(a<0||b<a||d.arabicScenes.length!==16)throw Error('Narration scenes missing');
h=h.slice(0,a)+'const scenes='+JSON.stringify(d.arabicScenes)+h.slice(b);
h=h.replace('Full English Lesson · 16:9','الدرس الكامل بالعربية · 16:9').replace('Play narrated lesson','تشغيل الدرس').replace('Pause','إيقاف مؤقت').replace('Next','التالي').replace('u.lang="en-US"','u.lang="ar-EG"').replace('<html lang="en">','<html lang="ar" dir="rtl">');
fs.writeFileSync(arFile,h);
for(const r of ['explanation','problems','answers','test','video/english','video/arabic'])if(!fs.existsSync(path.join(base,r,'index.html')))throw Error('Missing route '+r);
console.log('Lesson #225: all six routes including full Arabic and English narrated lessons');
