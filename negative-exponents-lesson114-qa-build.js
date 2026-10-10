'use strict';
const {P,T,E,fs,path,root}=require('./negative-exponents-lesson114-lib');
function eq(a,b){if(Math.abs(a-b)>1e-9)throw Error('Lesson 114 math QA: '+a+' != '+b)}
for(const [x,y] of [[2,3],[3,5],[-2,4]]){
 eq(6*x**(-2)/(3*x**3),2/x**5);
 eq((2*x**(-2)*y**3)/(4*x*y**(-1)),y**4/(2*x**3));
 eq((x**(-2)+y**(-2))/(x**(-2)*y**(-2)),x*x+y*y);
 eq((1/x-1/y)/(1/(x*y)),y-x);
 eq(((2/x**3)*y**2)**(-2)/(4*x*x/y),x**4/(16*y**3));
 eq(((y**3/x**2)/(x/y))**(-2),x**6/y**8);
 eq((2*y/x**2)**(-3)/(4*x/y**2),x**5/(32*y));
}
if(P.length!==18||T.length!==5||E.length!==12)throw Error('Content counts mismatch');
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){
 const f=path.join(root,route,'index.html');if(!fs.existsSync(f)||fs.readFileSync(f,'utf8').length<700)throw Error('Missing/empty route '+route);
}
console.log('Lesson 114 independent numeric and six-route QA passed');
