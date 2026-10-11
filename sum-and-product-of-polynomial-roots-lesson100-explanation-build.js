'use strict';
const fs=require('fs'),path=require('path'),d=require('./sum-and-product-of-polynomial-roots-lesson100-data.json');
const base='/advanced-math/polynomial-equations/sum-and-product-of-polynomial-roots';
if(d.slug!=='sum-and-product-of-polynomial-roots'||d.lesson_index!==100)throw Error('Canonical mismatch');
const blocks=[
['LESSON OBJECTIVE','Find root sums and products from polynomial coefficients without solving.'],
['WHAT YOU NEED TO KNOW','Factoring a polynomial as a(x−r₁)(x−r₂)…(x−rₙ) connects roots to coefficients, including repeated and complex roots.'],
['KEY DEFINITIONS','A root makes f(x)=0. Monic means leading coefficient 1. Pairwise products of three roots are r₁r₂+r₁r₃+r₂r₃.'],
['CORE RULE','For ax²+bx+c=0: sum=−b/a, product=c/a. For ax³+bx²+cx+d=0: sum=−b/a, pairwise sum=c/a, total product=−d/a. Degree n product=(−1)ⁿ constant/leading coefficient.'],
['HOW IT WORKS','Identify the leading coefficient, choose the relevant Vieta formula, substitute signs carefully, then solve for any unknown parameter.'],
['WORKED EXAMPLE 1','2x²−7x+3=0: sum=7/2 and product=3/2.'],
['WORKED EXAMPLE 2','Roots 2 and −5: sum −3, product −10, so x²+3x−10=0. Check (x−2)(x+5).'],
['WORKED EXAMPLE 3','x³−6x²+11x−6=0: sum 6, pairwise sum 11, product 6. Roots 1,2,3 verify each relation.'],
['WORKED EXAMPLE 4','Roots of 5x²−mx+20=0 sum to 6: m/5=6, hence m=30.'],
['WORKED EXAMPLE 5','Quartic roots 1,2,−3,k have constant −24: −6k=−24 gives k=4. Sum=4 so x³ coefficient −4.'],
['DESMOS STRATEGY','Enter: y=x²−7x+10. Look for: zeros x=2 and x=5. Use it to answer: sum=7, product=10. Why it works: roots are graph zeros. Faster or not? No, coefficient rules are quicker; check algebraically (x−2)(x−5)=x²−7x+10.'],
['COMMON MISTAKES','Divide by the leading coefficient; distinguish cubic pairwise sum from total product; watch the alternating product sign.'],
['EXAM STRATEGY','If only a sum or product is asked, use coefficients directly instead of solving the polynomial.'],
['QUICK CHECK','Sum for 3x²−12x+5=0 is 4; cubic product for 2x³−3x²−8x+12=0 is −6.'],
['LESSON RECAP','Quadratic: sum −b/a, product c/a. Cubic: pairwise sum c/a, total product −d/a.'],
['NEXT STEP','Continue to the 18 problems, 18 aligned answers, five-question test, and English/Arabic full-lesson routes.']
];
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nav=['problems','answers','test','video/english','video/arabic'].map(r=>'<a href="'+base+'/'+r+'/">'+r+'</a>').join(' · ');
const body=blocks.map(([h,t])=>'<section class="lesson-section"><h2>'+escape(h)+'</h2><p>'+escape(t)+'</p></section>').join('');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+d.lesson+' — Explanation</title></head><body><header class="topbar"><a href="/">SUMMIT MATH</a></header><main class="page-shell"><article class="lesson-card lesson-content"><div class="crumb">Advanced Math · Polynomial Equations</div><span class="page-type">Explanation</span><h1>'+d.lesson+'</h1><!-- SUMMIT_RETROFIT:sum-and-product-of-polynomial-roots:DESMOS -->'+body+'<nav>'+nav+'</nav></article></main></body></html>';
const dir=path.join(__dirname,'dist',base.slice(1),'explanation');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
console.log('[lesson100] explanation built');