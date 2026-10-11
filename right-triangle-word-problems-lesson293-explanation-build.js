'use strict';
const lesson=require('./right-triangle-word-problems-lesson293-common.js');
require('./right-triangle-word-problems-lesson293-math-qa.js');
const html=lesson.explanations.map(s=>'<section class="lesson-section"><h2>'+lesson.esc(s[0])+'</h2><p>'+lesson.esc(s[1])+'</p></section>').join('');
lesson.write('explanation',lesson.page('Explanation','<!-- SUMMIT_RETROFIT:right-triangle-word-problems:DESMOS -->'+html));
console.log('Lesson 293 explanation generated');
