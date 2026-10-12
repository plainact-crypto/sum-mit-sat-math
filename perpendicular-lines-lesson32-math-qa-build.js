const near=(a,b)=>Math.abs(a-b)<1e-9;
const slopes=[
3*(-1/3),(-2/5)*(5/2),2*(-1/2),-4*(1/4),(3/2)*(-2/3),(1/3)*(-3),2*(-2/4),-5*(.4/2),-1,-1,-.5*2,2.5*(-.4),-.5*2,(-2/3)*(3/2),(7/2)*(-2/7),5*(-.2),(4/3)*(8/(6-50/3)),-.5*2,
2*(-.5),-3*(1/3),2*(-2/4),(-3/6)*2,.8*(-1.25)
];
if(slopes.length!==23||slopes.some(x=>!near(x,-1)))throw Error('Lesson 32 mathematical QA failed');
if(!near(-.4*4+16.6,15)||!near(-1.25*10+17.5,5)||!near(2*1+4,6))throw Error('Lesson 32 point check failed');
console.log('[Lesson 32] 23 independent mathematical checks PASS');
