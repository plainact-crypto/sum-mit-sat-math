'use strict';
const rows=[
['25% of a number is 18. Find the number.',25,18,72],
['10% of a number is 7. Find the number.',10,7,70],
['Half of a quantity is 46. Find the whole.',50,46,92],
['9 students are 20% of a class. Find class size.',20,9,45],
['24 notebooks sold are 15% of stock. Find stock.',15,24,160],
['30 liters are 12% of tank capacity. Find capacity.',12,30,250],
['68 voters are 40% of a survey. Find group size.',40,68,170],
['54 pages are 75% of a book. Find total pages.',75,54,72],
['$5 is 2.5% of a monthly budget. Find the budget.',2.5,5,200],
['90 cm is 120% of a reference length. Find the reference.',120,90,75],
['A $3 fee is 0.5% of an account balance. Find balance.',0.5,3,600],
['A jacket is $84 after a 30% discount. Find original price.',70,84,120],
['A bill totals $162 including 8% tax. Find pretax price.',108,162,150],
['49 students are 35% of a club. Find membership.',35,49,140],
['Three-eighths of a supply is 45 units. Find the whole.',37.5,45,120],
['96 yes votes are 64% of respondents. Find total.',64,96,150],
['20% of tickets are canceled; 144 remain. Find original.',80,144,180],
['A price rises 10% then falls 20%; final $220. Find original.',88,220,250]
];
const practice=rows.map(([q,p,part,whole],i)=>({q,p,part,whole,steps:(i===11?'30% off leaves 70%. ':i===12?'8% tax means 108% of the original. ':i===14?'3/8 = 37.5%. ':i===16?'20% canceled leaves 80%. ':i===17?'Successive changes give 1.10 × 0.80 = 0.88, or 88%. ':'')+(p/100)+' × W = '+part+'; W = '+part+' ÷ '+(p/100)+' = '+whole+'. Check: '+whole+' × '+(p/100)+' = '+part+'.'}));
const test=[
['14 is 20% of what number?',20,14,70,['28','70','140','7'],1],
['28 students are 35% of a grade. Find grade size.',35,28,80,['63','98','80','20'],2],
['$12 is 7.5% of a fund. Find the whole fund.',7.5,12,160,['160','90','16','900'],0],
['A backpack costs $136 after 15% off. Find original price.',85,136,160,['$115.60','$151','$200','$160'],3],
['A price rises 20% then falls 25%, ending at $189. Find original.',90,189,210,['$180','$210','$189','$252'],1]
].map(([q,p,part,whole,choices,correct])=>({q,p,part,whole,choices,correct,why:(p===85?'15% off leaves 85%. ':p===90?'1.20 × 0.75 = 0.90. ':'')+(p/100)+' × W = '+part+', so W = '+whole+'.'}));
for(const [name,arr,n] of [['practice',practice,18],['test',test,5]]){if(arr.length!==n||new Set(arr.map(x=>x.q)).size!==n)throw Error(name+' uniqueness/count');for(const x of arr){if(Math.abs(x.whole*x.p/100-x.part)>1e-8)throw Error(name+' math');if(name==='test'&&(!x.choices[x.correct].includes(String(x.whole))||new Set(x.choices).size!==4))throw Error('test answer')}}
module.exports={practice,test};
