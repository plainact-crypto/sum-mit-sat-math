const fs=require('fs'),path=require('path');
const dist=path.join(__dirname,'dist');
const base=path.join(dist,'advanced-math','quadratic-equations','vertex-form','video');
const english=path.join(base,'english');
fs.mkdirSync(english,{recursive:true});
const scenes=[
 ['Vertex Form','y = a(x − h)² + k'],
 ['Read the vertex','The vertex is (h, k). The sign inside the parentheses is opposite: (x − 3)² means h = 3, while (x + 4)² means h = −4.'],
 ['Direction and shape','a > 0 opens up and gives a minimum. a < 0 opens down and gives a maximum. The size of |a| controls vertical stretch or compression.'],
 ['Worked example','y = −2(x − 3)² + 5 has vertex (3,5), axis x = 3, opens down, and has maximum value 5.'],
 ['Convert from standard form','Complete the square: x² − 6x + 11 = (x − 3)² + 2, so the vertex is (3,2).'],
 ['SAT shortcut','When vertex form is given, read h and k before doing algebra. Use k for the maximum/minimum value and h for the x-value where it occurs.'],
 ['Quick check','For y = 3(x + 2)² − 7: vertex (−2,−7), axis x = −2, opens up, minimum −7.']
];
const cards=scenes.map((s,i)=>`<section class="video-scene"><div class="scene-count">${i+1}/${scenes.length}</div><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join('');
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Vertex Form — English Video | SUMMIT MATH</title><style>.video-scene{min-height:62vh;display:flex;flex-direction:column;justify-content:center;padding:3rem;border-bottom:1px solid #ddd}.scene-count{opacity:.6}.video-scene h2{font-size:2.4rem}.video-scene p{font-size:1.4rem;line-height:1.6}.video-links{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}.video-links a{font-weight:700}</style></head><body><main class="page-shell"><section class="lesson-card"><div class="page-type">Full Lesson Video · English</div><div class="lesson-title">Vertex Form</div><!-- SUMMIT_EXPLAINER:vertex-form -->${cards}<div class="video-links"><a href="../../explanation/">Explanation</a><a href="../../problems/">Practice</a><a href="../../answers/">Answers</a><a href="../../test/">Test</a></div></section></main></body></html>`;
fs.writeFileSync(path.join(english,'index.html'),html);
fs.mkdirSync(base,{recursive:true});
fs.writeFileSync(path.join(base,'index.html'),html);
console.log('Vertex Form full English lesson video routes built; no Shorts created.');
