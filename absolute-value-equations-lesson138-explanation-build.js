// Lesson 138 explanation; classification DESMOS.
const fs=require('fs'),path=require('path'),base=path.join(__dirname,'dist/advanced-math/absolute-value/absolute-value-equations');
const sections=[
['LESSON OBJECTIVE','Solve absolute value equations by cases, including zero, impossible negative targets, and variable targets.'],
['CORE IDEA','Absolute value measures distance from zero. If |A|=k>0, the inside A may equal k or −k.'],
['KEY DEFINITIONS','An extraneous solution is a candidate that fails the original equation.'],
['CORE RULE','For k>0: |A|=k gives A=k or A=−k. For k=0: A=0. For k<0: no real solution.'],
['HOW IT WORKS','Isolate the absolute value, inspect the target, solve each permitted case, then substitute into the original equation.'],
['WORKED EXAMPLES','<h3>Basic</h3><p>|x−3|=5 → x−3=±5 → x=8 or −2.</p><h3>Isolate first</h3><p>2|x−1|=10 → |x−1|=5 → x=6 or −4.</p><h3>Impossible</h3><p>|3x+6|=−4 has no solution.</p><h3>Variable target</h3><p>|2x−1|=x+4 → 2x−1=x+4 or −2x+1=x+4 → x=5 or −1. Both check.</p><h3>Two absolute values</h3><p>|2x+5|=|x−1| → 2x+5=±(x−1) → x=−6 or −4/3.</p>'],
['DESMOS STRATEGY','<p><b>Enter:</b> y=abs(2x−1) and y=x+4.</p><p><b>Look for:</b> intersections (−1,3) and (5,9).</p><p><b>Use it to answer:</b> x=−1 or 5.</p><p><b>Why it works:</b> intersections give equal outputs.</p><p><b>Faster or not?</b> Algebra is faster for a basic equation; Desmos is useful for variable-target or piecewise checks.</p><p><b>Independent check:</b> at x=−1 both sides are 3; at x=5 both sides are 9.</p>'],
['COMMON MISTAKES','Do not split before isolating | |. Negative targets are impossible. Check both cases in the original equation.'],
['EXAM STRATEGY','For a positive constant target use two linear cases. For variable targets, check every candidate or verify with a graph.'],
['QUICK CHECK','Solve |x+1|=4.<details><summary>Reveal</summary><p>x=3 or −5.</p></details>'],
['LESSON RECAP','Positive target: two cases. Zero: one. Negative: none. Verify all answers.'],
['NEXT STEP','<a href="../problems/">Practice</a> · <a href="../answers/">Solutions</a> · <a href="../test/">Test</a> · <a href="../video/english/">English Video</a> · <a href="../video/arabic/">Arabic Video</a>']
];
const body=sections.map((s,i)=>'<section><h2>'+(i+1)+'. '+s[0]+'</h2>'+(s[1].startsWith('<')?s[1]:'<p>'+s[1]+'</p>')+'</section>').join('');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Absolute Value Equations — Explanation | SUMMIT</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Absolute Value</div><div class="page-type">Explanation</div><h1>Absolute Value Equations</h1><article data-explanation-classification="DESMOS">'+body+'</article></section></main></body></html>';
const dir=path.join(base,'explanation');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
