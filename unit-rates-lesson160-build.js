'use strict';
require('./lesson160-core-build.js');
require('./lesson160-video-build.js');
const fs=require('fs'),path=require('path'),base=path.join(__dirname,'dist','problem-solving-and-data-analysis/rates/unit-rates');
for(const route of ['explanation','problems','answers','test','video/english','video/arabic'])if(!fs.existsSync(path.join(base,route,'index.html')))throw Error('lesson160 missing '+route);
console.log('Lesson 160 Unit Rates: 6 routes, 18 practice, 18 answers, 5 tests, full bilingual lesson video.');
