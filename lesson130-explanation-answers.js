const {data,esc,code,sec,write}=require('./lesson130-shell');
const parts=[
['LESSON OBJECTIVE','Multiply rational expressions, simplify, and preserve original denominator restrictions.'],
['WHAT YOU NEED TO KNOW','Rational expressions are algebraic fractions. Multiply numerators and denominators; denominators must never equal zero.'],
['KEY DEFINITIONS','Factor: an expression in a product. Excluded value: a zero of an original denominator. Common factor: identical multiplied factor.'],
['CORE RULE','(A/B) × (C/D) = AC/BD for B ≠ 0 and D ≠ 0. Cancel factors, not added terms.'],
['HOW IT WORKS','Identify original restrictions; factor every polynomial; cancel identical factors; multiply remaining factors; report exclusions.'],
['WORKED EXAMPLE 1','(x/3) × (6/x) = 6x/(3x) = 2. The original domain excludes x=0.'],
['WORKED EXAMPLE 2','((x²−9)/(x+3)) × (2/(x−3)) = 2. Factor x²−9=(x−3)(x+3); exclude −3 and 3.'],
['WORKED EXAMPLE 3','((x²+5x+6)/(x+2)) × (1/(x+3)) = 1. Factor (x+2)(x+3); exclude −3 and −2.'],
['WORKED EXAMPLE 4','((x²−25)/(x²+3x−10)) × ((x+5)/(x−5)) = (x+5)/(x−2). Exclude −5, 2, 5.'],
['WORKED EXAMPLE 5','((x²−9)/(x²−6x+9)) × ((x−3)/(x²+6x+9)) = 1/(x+3). Exclude −3 and 3.'],
['COMMON MISTAKES','Never cancel x from x+3. Never forget restrictions after canceling. Factor x²−9 as (x−3)(x+3).'],
['EXAM STRATEGY','Factor before expanding. SAT distractors may cancel terms or omit excluded values. Algebra is usually faster than graphing.'],
['QUICK CHECK','(x/4) × (8/x) = 2, x≠0; ((x²−4)/(x+2)) × (1/(x−2)) = 1, x≠−2,2.'],
['LESSON RECAP','Restrictions → factor → cancel common factors → multiply → verify.'],
['NEXT STEP','Continue to 18 practice questions, 18 aligned solutions, the five-question test and full lesson video.']
];
write('explanation','<!-- EXPLANATION_CLASSIFICATION: NEITHER -->'+parts.map((p,i)=>sec((i+1)+' · '+p[0],'<h2>'+p[0]+'</h2><p>'+p[1]+'</p>')).join(''));
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
const answers=sec('ANSWERS & SOLUTIONS','<h2>18 aligned worked solutions</h2>')+groups.map(([name,a,b])=>sec(name,data.practice.slice(a,b).map((q,j)=>'<div class="summit-q"><h3>'+(a+j+1)+'. '+code(q[0])+'</h3><p><b>'+code(q[1])+'</b></p><p>'+esc(q[2])+'</p><p>Original exclusions: x = '+esc(q[3])+'</p></div>').join(''))).join('');
write('answers',answers);
if(data.practice.length!==18)throw Error('Lesson 130 must have 18 solutions');