module.exports=[
{q:'For y = kx, increasing x by 6 increases y by 21. Find y when x = 14.',a:'49',why:'k = 21/6 = 3.5; y = 3.5 × 14 = 49.',check:()=>21/6*14===49},
{q:'Gym A costs $12 plus $8/class; Gym B costs $10/class, no fee. Which is proportional? Compare 6 classes.',a:'Only Gym B; both cost $60',why:'A = 12 + 8n has a fixed fee; B = 10n has no fixed fee. Both cost $60 for six classes.',check:()=>12+8*6===60&&10*6===60},
{q:'y and z vary directly with x. y=45 at x=15; z=70 at x=14. Find x if y+z=144.',a:'18',why:'y = 3x, z = 5x, so 8x = 144 and x = 18.',check:()=>45/15===3&&70/14===5&&8*18===144},
{q:'Pump A transfers 180 L in 12 min; Pump B transfers 112 L in 8 min. Together, how long for 870 L?',a:'30 minutes',why:'Rates are 15 and 14 L/min, total 29 L/min. 870/29 = 30 min.',check:()=>180/12===15&&112/8===14&&870/29===30}
];