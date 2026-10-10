'use strict';
const rows=[
['A $100 price rises 10%, then rises 10% again. Find the final price.',100,[10,10],'final'],
['A $200 value falls 10%, then falls another 10%. Find the final value.',200,[-10,-10],'final'],
['An $80 item rises 25%, then falls 20%. Find the final price.',80,[25,-20],'final'],
['A $150 fee rises 20%, then rises 10%. Find the final fee.',150,[20,10],'final'],
['A $250 balance falls 20%, then rises 20%. Find the balance.',250,[-20,20],'final'],
['A $120 item rises 50%, then falls 10%. Find the final price.',120,[50,-10],'final'],
['A $400 value falls 25%, then falls 10%. Find the final value.',400,[-25,-10],'final'],
['A $60 fee rises 10%, then rises 50%. Find the final fee.',60,[10,50],'final'],
['A $500 investment grows 8%, then 5%. Find its new value.',500,[8,5],'final'],
['A $240 bill falls 15%, then 10%. Find the final bill.',240,[-15,-10],'final'],
['A $1,000 value rises 5%, then falls 5%. Find its final value.',1000,[5,-5],'final'],
['A price rises 10% twice and ends at $242. Find its original price.',200,[10,10],'original'],
['A value falls 20%, then rises 25%, ending at $300. Find its original value.',300,[-20,25],'original'],
['A price rises 20%, then falls 10%, ending at $270. Find the original.',250,[20,-10],'original'],
['A quantity falls 10%, then rises 30%, ending at 468. Find the original.',400,[-10,30],'original'],
['A price falls 25%, then rises 10%, ending at $528. Find the original.',640,[-25,10],'original'],
['A value rises 40%, then falls 20%, ending at $420. Find its starting value.',375,[40,-20],'original'],
['A price rises 10%, falls 30%, then rises 25%, ending at $770. Find the original.',800,[10,-30,25],'original']
];
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
const factor=changes=>changes.reduce((p,x)=>p*(1+x/100),1);
const practice=rows.map(([q,start,changes,mode])=>{const f=factor(changes),end=round(start*f),answer=mode==='original'?start:end;return{q,start,changes,mode,end,answer,steps:'Multiply the successive factors '+changes.map(x=>(1+x/100).toFixed(2)).join(' × ')+' = '+round(f)+'. '+(mode==='original'?'Original = '+end+' ÷ '+round(f)+' = '+start+'.':'Final = '+start+' × '+round(f)+' = '+end+'.')+' Check by applying each change in order.'}});
const test=[
['A $100 price rises 20%, then falls 10%. Find final price.',100,[20,-10],'final',['$110','$108','$112','$90'],1],
['A $300 value falls 10%, then rises 10%. Find final value.',300,[-10,10],'final',['$300','$270','$297','$330'],2],
['A $250 price rises 20%, then falls 20%. Find final price.',250,[20,-20],'final',['$240','$250','$260','$200'],0],
['A price rises 20%, then 5%, ending at $378. Find the original.',300,[20,5],'original',['$315','$350','$320','$300'],3],
['A price falls 20%, then rises 10%, ending at $528. Find the original.',600,[-20,10],'original',['$480','$600','$528','$660'],1]
].map(([q,start,changes,mode,choices,correct])=>{const f=factor(changes),end=round(start*f),answer=mode==='original'?start:end;return{q,start,changes,mode,end,answer,choices,correct,why:'Combined multiplier = '+changes.map(x=>(1+x/100).toFixed(2)).join(' × ')+' = '+round(f)+'. '+(mode==='original'?'Original = '+end+' ÷ '+round(f)+' = '+start+'.':'Final = '+start+' × '+round(f)+' = '+end+'.')}});
for(const [name,a,n] of [['practice',practice,18],['test',test,5]]){if(a.length!==n||new Set(a.map(x=>x.q)).size!==n)throw Error(name+' count');for(const x of a){if(Math.abs(x.end-round(x.start*factor(x.changes)))>1e-7)throw Error(name+' arithmetic');if(name==='test'&&(!x.choices[x.correct].includes(String(x.answer))||new Set(x.choices).size!==4))throw Error('test choices')}}
module.exports={practice,test,factor,round};
