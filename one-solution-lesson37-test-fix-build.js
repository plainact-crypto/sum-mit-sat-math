const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist/algebra/systems-of-linear-equations/one-solution/test/index.html');
let s=fs.readFileSync(file,'utf8');
const changes=[
 ["Solve 3x + y = 14 and x - y = 2.","Solve 3x + 2y = 20 and 2x - y = 4."],
 ["c:['(3, 5)','(4, 2)','(5, -1)','(6, -4)'],a:1,why:'Add 3x + y = 14 and x - y = 2 to obtain 4x = 16, so x = 4. Then 4 - y = 2 gives y = 2. Both equations check.'", "c:['(2, 7)','(3, 5)','(4, 4)','(5, 2)'],a:2,why:'From 2x - y = 4, y = 2x - 4. Substitute: 3x + 2(2x - 4) = 20, so 7x = 28 and x = 4; then y = 4. Check: 3(4) + 2(4) = 20 and 2(4) - 4 = 4.'"]
];
for(const [oldText,newText] of changes){if(!s.includes(oldText))throw Error('Lesson 37 expected original test content missing');s=s.replace(oldText,newText)}
if(3*4+2*4!==20||2*4-4!==4)throw Error('Lesson 37 mathematical check failed');
fs.writeFileSync(file,s);console.log('Lesson 37 test Q3 replaced; independent (4,4) substitution PASS');
