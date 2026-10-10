const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist/advanced-math/radical-expressions-and-equations/multiplying-radicals');
const load=x=>require('./multiplying-radicals-lesson119-'+x+'.json');
const P='abcdefgh'.split('').flatMap(x=>load('practice-'+x));
const E='abc'.split('').flatMap(x=>load('explanation-'+x));
const T=load('test');
module.exports={fs,path,root,load,P,E,T};
