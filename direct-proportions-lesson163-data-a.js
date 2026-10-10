module.exports=[
{q:'For y = 4x, find y when x = 7.',a:'28',why:'Substitute 7: 4 × 7 = 28.',check:()=>4*7===28},
{q:'The pairs (2,9) and (6,27) belong to a relation. Is it directly proportional? Find k.',a:'Yes; k = 4.5',why:'9/2 = 27/6 = 4.5, so y = 4.5x.',check:()=>9/2===27/6},
{q:'Is a relation through (3,12) and (6,25) directly proportional?',a:'No',why:'The ratios 12/3 = 4 and 25/6 are unequal.',check:()=>12/3!==25/6},
{q:'Notebooks cost $5.50 each without a fixed fee. Cost of 8?',a:'$44',why:'8 × $5.50 = $44.',check:()=>5.5*8===44},
{q:'y is proportional to x; y = 36 at x = 9. Find y at x = 14.',a:'56',why:'k = 36/9 = 4; 4 × 14 = 56.',check:()=>36/9*14===56},
{q:'A proportional graph passes through (0,0) and (4,10). Write y = kx.',a:'y = 2.5x',why:'The slope k = 10/4 = 2.5 and intercept is zero.',check:()=>10/4===2.5},
{q:'A recipe needs 360 g flour for 6 servings. How much for 15?',a:'900 g',why:'360/6 = 60 g per serving; 60 × 15 = 900 g.',check:()=>360/6*15===900},
{q:'Proportional pairs are (3,12), (5,20), (8,32). Find y at x = 11.',a:'44',why:'The common ratio y/x is 4, so y = 4 × 11 = 44.',check:()=>12/3===20/5&&20/5===32/8&&4*11===44},
{q:'In a direct proportion y = 18 when x = 7. What is y at x = 14?',a:'36',why:'Doubling x doubles y, giving 36.',check:()=>18/7*14===36}
];