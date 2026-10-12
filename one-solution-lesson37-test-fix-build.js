const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist/algebra/systems-of-linear-equations/one-solution/test/index.html');
let s=fs.readFileSync(file,'utf8');
const changes=[
 ["Solve 2x + y = 11 and x - y = 1.","Solve 3x + 2y = 20 and 2x - y = 4."],
 ["c:['(3, 5)','(4, 3)','(5, 1)','(6, -1)'],a:1,why:'From x - y = 1, y = x - 1. Substitute: 2x + x - 1 = 11, so 3x = 12 and x = 4; then y = 3.'", "c:['(2, 7)','(3, 5)','(4, 4)','(5, 2)'],a:2,why:'From 2x - y = 4, y = 2x - 4. Substitute: 3x + 2(2x - 4) = 20, so 7x = 28 and x = 4; then y = 4. Check: 3(4) + 2(4) = 20 and 2(4) - 4 = 4.'"]
];
for(const [oldText,newText] of changes){if(!s.includes(oldText))throw Error('Lesson 37 expected original test content missing');s=s.replace(oldText,newText)}
if(3*4+2*4!==20||2*4-4!==4)throw Error('Lesson 37 mathematical check failed');
fs.writeFileSync(file,s);console.log('Lesson 37 test Q3 replaced; independent (4,4) substitution PASS');
