const fs=require('fs'),path=require('path');
const read=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'diameter-lesson267-'+n+'.json'),'utf8'));
const test=[...read('test-a'),...read('test-b')];
if(test.length!==5)throw Error('Test count');
const p=path.join(__dirname,'dist/geometry-and-trigonometry/circles/diameter/test/index.html');
fs.mkdirSync(path.dirname(p),{recursive:true});
fs.writeFileSync(p,'<!doctype html><html><link rel="stylesheet" href="/styles.css"><div class="page-type">Test</div><div class="lesson-title">Diameter</div><h1>Diameter Test</h1>'+test.map(x=>'<h2>'+x.number+'. '+x.question+'</h2>'+x.choices.join(' / ')).join('')+'</html>');
