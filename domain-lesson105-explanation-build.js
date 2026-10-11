'use strict';
const fs=require('fs'),path=require('path'),d=require('./domain-lesson105-data.json');
if(d.lesson_index!==105||d.slug!=='domain')throw Error('Canonical mismatch');
const base=d.base;
const blocks=[
['LESSON OBJECTIVE','Find the real domain of polynomial, rational and radical functions, including combined restrictions and physical contexts.'],
['WHAT YOU NEED TO KNOW','A domain contains exactly the allowed inputs. Start with all real numbers, then remove values that make a formula undefined.'],
['KEY DEFINITIONS','Domain: set of permitted inputs. Radicand: expression under a root. Excluded value: an input that makes a denominator zero. Interval: a compact notation for an input range.'],
['CORE RULE','Polynomials accept every real input. A denominator must be nonzero. A real square-root radicand must be at least zero; when that root is itself in a denominator, the radicand must be strictly positive. Intersect all conditions.'],
['HOW IT WORKS','Step 1: locate denominators and even roots. Step 2: solve each restriction. Step 3: intersect allowed sets. Step 4: check endpoints and context.'],
['WORKED EXAMPLE 1','For 1/(x−3), require x−3≠0. Domain: x≠3.'],
['WORKED EXAMPLE 2','For √(7−2x), require 7−2x≥0. Dividing by −2 reverses the sign, so x≤7/2.'],
['WORKED EXAMPLE 3','For 1/√(x−4), require x−4>0, so x>4. Equality is forbidden because the denominator would be zero.'],
['WORKED EXAMPLE 4','For √(x²−9), factor (x−3)(x+3)≥0. Domain: x≤−3 or x≥3, with endpoints included.'],
['WORKED EXAMPLE 5','For √[(x−2)/(x+1)], use a sign chart at −1 and 2. Domain: x<−1 or x≥2; x=−1 is excluded.'],
['WORKED EXAMPLE 6','For √(x+2)/(x−4), intersect x≥−2 with x≠4. The domain is [−2,4)∪(4,∞).'],
['COMMON MISTAKES','Never include a denominator zero, even after canceling a factor. Do include zero under a standalone square root. Reverse inequality signs when dividing by a negative. Check every restriction simultaneously.'],
['EXAM STRATEGY','Write each condition separately and combine them with intersection. Test a sample input from every interval in rational-radicand problems. Translate physical conditions such as elapsed time≥0 into extra restrictions.'],
['QUICK CHECK','Domain of √(x+4): x≥−4. Domain of 1/√(5−x): x<5. Domain of (x²−1)/(x−1): x≠1, even after cancellation.'],
['LESSON RECAP','Polynomials: all real. Denominator: not zero. Square-root radicand: ≥0. Root denominator: >0. Combine all conditions and inspect endpoints.'],
['NEXT STEP','Solve 18 practice questions, study the 18 aligned answers, and complete the five-question test. English and Arabic full-lesson routes are available.']
];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nav=['problems','answers','test','video/english','video/arabic'].map(r=>'<a href="'+base+'/'+r+'/">'+r+'</a>').join(' · ');
const body=blocks.map(([h,t])=>'<section class="lesson-section"><h2>'+esc(h)+'</h2><p>'+esc(t)+'</p></section>').join('');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Domain — Explanation</title></head><body><header class="topbar"><a href="/">SUMMIT MATH</a></header><main class="page-shell"><article class="lesson-card lesson-content"><div class="crumb">Advanced Math · Functions</div><h1>Domain</h1>'+body+'<nav>'+nav+'</nav></article></main></body></html>';
const dir=path.join(__dirname,'dist',base.slice(1),'explanation');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
console.log('[lesson105] explanation built');