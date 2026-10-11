const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist/advanced-math/nonlinear-functions/converting-between-representations/video');
const en=[
['One relationship','Equations, tables, graphs, and contexts must represent the same ordered pairs.'],
['Identify the family','Constant first differences suggest linear; constant second differences suggest quadratic; constant ratios suggest exponential.'],
['Equation to table','For y equals x squared minus four, inputs negative two, negative one, zero, one, and two give zero, negative three, negative four, negative three, zero.'],
['Table to exponential','Outputs three, six, twelve, twenty four at consecutive inputs follow y equals three times two to the x.'],
['Vertex form','A vertex at two, negative one gives y equals a times x minus two squared minus one.'],
['Determine the coefficient','The point three, two makes two equal a minus one, so a equals three.'],
['Roots and intercept','Zeros negative one and five imply y equals a times x plus one times x minus five. An intercept negative five gives a equals one.'],
['Context and domain','A population starting at five hundred and growing eight percent each year follows five hundred times one point zero eight to the t for t at least zero.'],
['Check invariants','Substitute an anchor point, verify intercepts and vertex, and preserve any domain restrictions and units.'],
['Exam method','Identify the function family, transfer defining features, and reject any choice that fails an anchor point.']
];
const ar=[
['علاقة واحدة','المعادلة والجدول والرسم البياني والوصف اللفظي تمثل الأزواج المرتبة نفسها.'],
['تحديد نوع الدالة','الفروق الأولى الثابتة تشير إلى علاقة خطية، والفروق الثانية إلى تربيعية، والنسب الثابتة إلى أسية.'],
['من المعادلة إلى الجدول','في الدالة صاد تساوي سين تربيع ناقص أربعة، نعوض بقيم سين ونحسب قيم صاد بدقة.'],
['من الجدول إلى الدالة الأسية','القيم ثلاثة وستة واثنا عشر وأربعة وعشرون تتضاعف، لذلك الدالة ثلاثة في اثنين أس سين.'],
['صيغة الرأس','إذا كان رأس القطع المكافئ اثنين وسالب واحد، نكتب صاد تساوي ألف في سين ناقص اثنين تربيع ناقص واحد.'],
['إيجاد المعامل','بالتعويض بالنقطة ثلاثة واثنين، نحصل على اثنين يساوي ألف ناقص واحد، إذن ألف تساوي ثلاثة.'],
['الجذور والمقطع','الجذران سالب واحد وخمسة يعطيان الصيغة ألف في سين زائد واحد في سين ناقص خمسة. المقطع سالب خمسة يجعل ألف تساوي واحداً.'],
['السياق والمجال','عدد يبدأ بخمسمائة وينمو ثمانية بالمائة سنوياً يمثله خمسمائة في واحد فاصلة صفر ثمانية أس الزمن، والزمن غير سالب.'],
['التحقق من الثوابت','نتحقق من نقطة معروفة ومن الرأس والمقاطع، ونحافظ على المجال والوحدات.'],
['طريقة الاختبار','حدد نوع الدالة، وانقل خصائصها الأساسية، واستبعد أي اختيار لا يحقق نقطة معلومة.']
];
for(const [lang,scenes,voice] of [['english',en,'en-US'],['arabic',ar,'ar-EG']]){
 const file=path.join(base,lang,'index.html');
 let html=fs.readFileSync(file,'utf8');
 const body='<h2>'+ (lang==='arabic'?'الشرح الكامل بالعربية':'Full narrated lesson') +'</h2><div lang="'+(lang==='arabic'?'ar':'en')+'" dir="'+(lang==='arabic'?'rtl':'ltr')+'"><h3 id="sceneTitle"></h3><p id="sceneText"></p><p id="sceneCount"></p><button type="button" id="previous">Previous / السابق</button> <button type="button" id="play">Play / تشغيل</button> <button type="button" id="next">Next / التالي</button></div>';
 const script='<script>const scenes='+JSON.stringify(scenes)+';let index=0;function show(){document.getElementById("sceneTitle").textContent=scenes[index][0];document.getElementById("sceneText").textContent=scenes[index][1];document.getElementById("sceneCount").textContent=(index+1)+"/"+scenes.length}function play(){if(!("speechSynthesis" in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(scenes[index][1]);u.lang="'+voice+'";u.rate=.9;speechSynthesis.speak(u)}document.getElementById("previous").onclick=()=>{index=Math.max(0,index-1);show();play()};document.getElementById("next").onclick=()=>{index=Math.min(scenes.length-1,index+1);show();play()};document.getElementById("play").onclick=play;show();</script>';
 html=html.replace(/<article class="lesson-content">[\s\S]*?<\/article>/,'<article class="lesson-content">'+body+'</article>').replace('</body>',script+'</body>').replace('<html lang="en">','<html lang="'+(lang==='arabic'?'ar':'en')+'" dir="'+(lang==='arabic'?'rtl':'ltr')+'">');
 fs.writeFileSync(file,html);
}
if(en.length!==10||ar.length!==10)throw Error('Missing full lesson chapters');
console.log('Lesson155: ten narrated scenes per language; no short clips.');
