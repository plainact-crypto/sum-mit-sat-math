// SUMMIT Worker 5 lesson 130: six canonical routes generated from verified lesson data.
require('./lesson130-explanation-answers.js');
require('./lesson130-practice.js');
require('./lesson130-test.js');
require('./lesson130-video.js');
const fs=require('fs'),path=require('path'),data=require('./lesson130-data.json');
const base=path.join(__dirname,'dist',data.base);
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){
if(!fs.existsSync(path.join(base,route,'index.html')))throw Error('Lesson130 missing '+route);
}
if(data.practice.length!==18||data.test.length!==5)throw Error('Lesson130 count QA');
console.log('Lesson130 built: 18 practice, 18 aligned solutions, 5 test, 6 routes');