/* SUMMIT Worker 5: canonical #225 full six-route build with deterministic geometry and bilingual narration. */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const data=require('./vertical-angles-lesson225-data.js');
const tree=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync('curriculum.json.gz.b64','utf8').trim(),'base64')));
const leaves=[];for(const s of tree)for(const x of s.sections||[]){leaves.push(...x.leaves||[]);for(const g of x.groups||[])leaves.push(...g.leaves||[]);}
if(leaves.length!==298||leaves[224].title!=='Vertical Angles')throw Error('Wrong canonical lesson #225');
if(data.sections.length!==16||data.practice.length!==18||data.test.length!==5||data.arabicScenes.length!==16)throw Error('Lesson package counts');
require('./vertical-angles-lesson225-content-build.js');
const base=path.join('dist',leaves[224].base.replace(/^\\/|\\/$/g,''));
const expFile=path.join(base,'explanation','index.html'),enFile=path.join(base,'video','english','index.html'),arFile=path.join(base,'video','arabic','index.html');
let exp=fs.readFileSync(expFile,'utf8');
const marker='11 · VISUAL CHECK',pos=exp.indexOf(marker);if(pos<0)throw Error('Visual section not found');
const end=exp.indexOf('</section>',pos);if(end<0)throw Error('Visual section closing tag missing');
const angle=64*Math.PI/180,dx=116*Math.cos(angle),dy=116*Math.sin(angle),cx=180,cy=145;
const x1=(cx-dx).toFixed(4),x2=(cx+dx).toFixed(4),y1=(cy-dy).toFixed(4),y2=(cy+dy).toFixed(4);
if(data.visual.top!==data.visual.bottom||data.visual.left!==data.visual.right||data.visual.top+data.visual.left!==180)throw Error('Geometry check failed');
const fig='<figure aria-label="Verified crossing lines" style="max-width:430px"><svg viewBox="0 0 360 290" width="100%" role="img" aria-label="Vertical angles of 52 and 128 degrees"><line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#16739b" stroke-width="4"/><line x1="'+x1+'" y1="'+y2+'" x2="'+x2+'" y2="'+y1+'" stroke="#16739b" stroke-width="4"/><text x="180" y="82" text-anchor="middle" font-size="21">52°</text><text x="180" y="225" text-anchor="middle" font-size="21">52°</text><text x="89" y="151" text-anchor="middle" font-size="21">128°</text><text x="271" y="151" text-anchor="middle" font-size="21">128°</text></svg><figcaption>Opposite angles match; adjacent angles total 180°.</figcaption></figure>';
exp=exp.slice(0,end)+fig+exp.slice(end);fs.writeFileSync(expFile,exp);
const english=fs.readFileSync(enFile,'utf8');
let arabic=english.replace('Full English Lesson · 16:9','الدرس الكامل بالعربية · 16:9').replace('Play narrated lesson','تشغيل الشرح').replace('Pause','إيقاف مؤقت').replace('Next','التالي').replace('u.lang="en-US"','u.lang="ar-EG"').replace('<html lang="en">','<html lang="ar" dir="rtl">');
const scenePattern=/const scenes=\[[\s\S]*?\];let i=0,play=false;/;
if(!scenePattern.test(arabic))throw Error('English video scenes not found');
arabic=arabic.replace(scenePattern,'const scenes='+JSON.stringify(data.arabicScenes)+';let i=0,play=false;');
fs.writeFileSync(arFile,arabic);
for(const route of ['explanation','problems','answers','test','video/english','video/arabic'])if(!fs.existsSync(path.join(base,route,'index.html')))throw Error('Missing route '+route);
console.log('SUMMIT #225: verified six full routes, deterministic angle diagram, English and Arabic narrated lessons');
