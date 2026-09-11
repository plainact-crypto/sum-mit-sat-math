const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist'),source=path.join(root,'distributive-property-test.html');
if(!fs.existsSync(source))throw new Error('Missing distributive-property-test.html');
const route='/advanced-math/equivalent-expressions/distributive-property/test/';
const html=fs.readFileSync(source,'utf8');
if(!html.includes("if(qs.length!==5)throw new Error('Lesson Test must contain exactly 5 questions')"))throw new Error('Test must enforce exactly 5 questions');
if(!html.includes('Results and explanations appear only after Submit Test.'))throw new Error('Test feedback must be withheld until submit');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
console.log('Built Distributive Property test.');