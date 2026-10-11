const fs=require('fs'),path=require('path');
const root=__dirname;
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.copyFileSync(path.join(root,'combined-events-lesson207-test.js'),path.join(root,'dist','combined-events-lesson207-test.js'));
console.log('Lesson 207 test grading asset ready');
