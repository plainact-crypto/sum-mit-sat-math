'use strict';
const {shell,write}=require('./repeated-percent-change-lesson178-layout');
const s=[
['01 · LESSON OBJECTIVE','Compute final or original values after two or more percentage changes. Every new percentage applies to the updated amount.'],
['02 · WHAT YOU NEED TO KNOW','A percent increase multiplies by a factor greater than one. A percent decrease multiplies by a factor less than one.'],
['03 · KEY DEFINITIONS','Original is the starting amount. Final is the ending amount. A multiplier is one plus or minus a percentage as a decimal.'],
['04 · CORE RULE','Final = Original × (1 + r1/100) × (1 + r2/100) × … . For reverse problems, Original = Final ÷ combined multiplier.'],
['05 · HOW IT WORKS','Convert each change into a factor, multiply all factors without premature rounding, then multiply by the original or divide the final by the product.'],
['06 · WORKED EXAMPLE 1','A $100 price rises 10% twice: 100 × 1.10 × 1.10 = $121. The total increase is 21%, not 20%.'],
['07 · WORKED EXAMPLE 2','A $200 value falls 10% twice: 200 × 0.90 × 0.90 = $162. The total decrease is 19%, not 20%.'],
['08 · WORKED EXAMPLE 3','A $250 balance falls 20% and then rises 20%: 250 × 0.80 × 1.20 = $240. Opposite equal percentages do not cancel.'],
['09 · WORKED EXAMPLE 4','A $1,000 value rises 5% then falls 5%: 1.05 × 0.95 = 0.9975. Final = 1000 × 0.9975 = $997.50.'],
['10 · WORKED EXAMPLE 5','A price rises 20% then 5%, ending at $378. Combined multiplier = 1.20 × 1.05 = 1.26. Original = 378 ÷ 1.26 = $300.'],
['11 · WORKED EXAMPLE 6','A price rises 10%, falls 30%, then rises 25%: factor = 1.10 × 0.70 × 1.25 = 0.9625. Starting at $800 gives $770.'],
['12 · COMMON MISTAKES','Do not add successive percent changes or treat an equal increase and decrease as canceling. Keep 0.9975, not a rounded 1.'],
['13 · EXAM STRATEGY','Write the multiplier chain first. Multiply factors in one calculator expression. For a reverse problem divide the final amount by the full product.'],
['14 · QUICK CHECK','Try: 100 rises 20% then falls 10%; 300 falls 10% then rises 10%. <details><summary>Reveal answers</summary>108 and 297, respectively.</details>'],
['15 · LESSON RECAP','Multiply the percent-change factors in sequence. Use the product to find the final or to reverse back to the original.'],
['16 · NEXT STEP','Continue with <a href="../problems/">18 practice questions</a>, <a href="../answers/">18 aligned solutions</a>, <a href="../test/">five test questions</a>, and the full English or Arabic video lessons.']
];
const body='<article class="lesson-content"><!-- SUMMIT_RETROFIT:repeated-percent-change:NEITHER -->'+s.map(x=>'<section class="lesson-section"><span class="section-kicker">'+x[0]+'</span><p>'+x[1]+'</p></section>').join('')+'</article>';
if(s.length!==16)throw Error('Explanation sections');
write('explanation',shell('Explanation',body));
