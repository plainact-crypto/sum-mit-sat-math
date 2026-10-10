module.exports=[
{q:'If y = 6x, what is y when x = 5?',choices:['11','25','30','36'],correct:2,why:'6 × 5 = 30.',check:()=>6*5===30},
{q:'A direct proportion includes (2,7) and (5,17.5). Find y when x = 8.',choices:['20','24','28','32'],correct:2,why:'k = 7/2 = 3.5; y = 3.5 × 8 = 28.',check:()=>7/2===17.5/5&&3.5*8===28},
{q:'Four tickets cost $38 without a fixed fee. What do 11 tickets cost?',choices:['$99','$104.50','$110','$114'],correct:1,why:'Unit price = $9.50; 11 × $9.50 = $104.50.',check:()=>38/4*11===104.5},
{q:'In y = kx, increasing x by 4 raises y by 18. Find y at x = 13.',choices:['52','54','58.5','72'],correct:2,why:'k = 18/4 = 4.5; y = 4.5 × 13 = 58.5.',check:()=>18/4*13===58.5},
{q:'Machine A makes 84 parts in 7 min; B makes 90 in 6 min. Together, how long for 810 parts?',choices:['24','27','30','36'],correct:2,why:'Rates are 12 and 15 parts/min, so 810/(12+15) = 30 min.',check:()=>84/7===12&&90/6===15&&810/27===30}
];