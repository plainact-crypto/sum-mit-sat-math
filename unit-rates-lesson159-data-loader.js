'use strict';
const fs=require('fs');
const path=require('path');
const read=name=>JSON.parse(fs.readFileSync(path.join(__dirname,name),'utf8'));
const explanation=read('unit-rates-lesson159-explanation.json');
const practice=[...read('unit-rates-lesson159-practice-a.json'),...read('unit-rates-lesson159-practice-b.json'),...read('unit-rates-lesson159-practice-c.json')];
const test=read('unit-rates-lesson159-test.json');
const videos={english:read('unit-rates-lesson159-video-english.json'),arabic:read('unit-rates-lesson159-video-arabic.json')};
module.exports={fs,path,read,explanation,practice,test,videos};
