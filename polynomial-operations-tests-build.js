const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const items=[
['advanced-math/polynomial-operations/polynomial-addition/test/','polynomial-addition-test.html'],
['advanced-math/polynomial-operations/polynomial-subtraction/test/','polynomial-subtraction-test.html'],
['advanced-math/polynomial-operations/polynomial-multiplication/test/','polynomial-multiplication-test.html'],
['advanced-math/polynomial-operations/special-polynomial-products/test/','special-polynomial-products-test.html'],
['advanced-math/polynomial-operations/polynomial-division/test/','polynomial-division-test.html']
];
for(const [route,source] of items){const src=path.join(root,source);if(!fs.existsSync(src))throw new Error(`Missing persistent source: ${source}`);const target=path.join(dist,route);fs.mkdirSync(target,{recursive:true});fs.copyFileSync(src,path.join(target,'index.html'));}
