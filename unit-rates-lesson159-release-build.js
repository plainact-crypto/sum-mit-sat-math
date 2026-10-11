'use strict';
const fs=require('fs'),path=require('path');
const data=require('./unit-rates-lesson159-data-loader');
const shell=require('./unit-rates-lesson159-shell');
const manifest=require('./lesson-releases/unit-rates.json');
const check=(ok,msg)=>{if(!ok)throw Error('[Lesson 159] '+msg)};
check(manifest.lesson==='unit-rates','slug');
check(manifest.builders.length===1&&manifest.builders[0]==='unit-rates-lesson159-release-build.js','builder');
check(JSON.stringify(manifest.routes)===JSON.stringify(shell.routes.map(r=>'/'+shell.base+'/'+r+'/')),'routes');
check(data.explanation.length>=13&&data.practice.length===18&&data.test.length===5,'counts');
check(data.videos.english.length===8&&data.videos.arabic.length===8,'video scenes');
const groups=[...Array(3).fill('Skill Check'),...Array(8).fill('Core Practice'),...Array(5).fill('Exam-Style Practice'),...Array(2).fill('Challenge Problems')];
check(data.practice.every((x,i)=>x[0]===groups[i]&&x[3]),'aligned practice groups');
require('./unit-rates-lesson159-explanation-answers')();
require('./unit-rates-lesson159-problems-view')();
require('./unit-rates-lesson159-test-view')();
require('./unit-rates-lesson159-video-view')();
for(const route of shell.routes){const f=path.join(__dirname,'dist',shell.base,route,'index.html');check(fs.existsSync(f)&&fs.statSync(f).size>1200,'missing route '+route)}
console.log('[Lesson 159] six canonical routes generated and checked');
