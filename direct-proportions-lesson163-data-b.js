module.exports=[
{q:'At constant speed, a train travels 210 km in 3.5 h. How far in 6 h?',a:'360 km',why:'Speed = 210/3.5 = 60 km/h; distance = 60 × 6 = 360 km.',check:()=>210/3.5*6===360},
{q:'Plan A: 6 tickets cost $51. Plan B: 4 cost $36. Which saves more for 10 tickets, and how much?',a:'Plan A; $5',why:'A is $8.50/ticket; B is $9/ticket. Ten cost $85 versus $90.',check:()=>51/6===8.5&&36/4===9&&10*(9-8.5)===5},
{q:'A rectangle has constant width 7.5 cm. How much does area grow if length rises from 8 to 12 cm?',a:'30 cm²',why:'A = 7.5L; change = 7.5 × (12 − 8) = 30 cm².',check:()=>7.5*(12-8)===30},
{q:'A proportional relation gives y = 12.5 at x = 5. Find y at x = 18.',a:'45',why:'k = 12.5/5 = 2.5; y = 2.5 × 18 = 45.',check:()=>12.5/5*18===45},
{q:'Twelve identical printers make 540 pages in 15 min. How many pages can 20 make in 10 min?',a:'600 pages',why:'Each printer makes 540/(12 × 15) = 3 pages/min; total = 3 × 20 × 10 = 600.',check:()=>540/(12*15)*20*10===600}
];