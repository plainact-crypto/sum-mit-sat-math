module.exports=[
{q:'Convert 2 hectares to square meters. (1 hectare = 10,000 m².)',a:'20,000 m²',why:'Multiply 2 × 10,000 = 20,000 m².',check:()=>2*10000===20000},
{q:'Convert 2,592 in² to yd².',a:'2 yd²',why:'One yard is 36 inches, so 1 yd² = 36² = 1,296 in². Divide 2,592 by 1,296.',check:()=>2592/36**2===2},
{q:'A room is 4.5 m by 3.2 m. Find its floor area in cm².',a:'144,000 cm²',why:'Area = 4.5 × 3.2 = 14.4 m². Multiply by 10,000 to get 144,000 cm².',check:()=>4.5*3.2*10000===144000},
{q:'A board measures 120 cm by 80 cm. Find its area in m².',a:'0.96 m²',why:'Area = 9,600 cm². Divide by 10,000: 0.96 m².',check:()=>120*80/10000===.96},
{q:'A rug is 4 ft by 6 ft. Find its area in square inches.',a:'3,456 in²',why:'Area = 24 ft². Multiply by 144 in²/ft²: 24 × 144 = 3,456.',check:()=>4*6*144===3456},
{q:'Fabric covers 2,500 cm². At $24 per m², what is its cost?',a:'$6',why:'2,500 cm² = 0.25 m². Cost = 0.25 × $24 = $6.',check:()=>2500/10000*24===6},
{q:'A 0.5-acre lot is covered by 9-ft² paving units. How many units? (1 acre = 43,560 ft².)',a:'2,420 units',why:'Area = 0.5 × 43,560 = 21,780 ft². Divide by 9 ft² per unit to get 2,420.',check:()=>.5*43560/9===2420},
{q:'A 0.012-km² plot reserves 3/5 of its area. How many m² remain?',a:'4,800 m²',why:'Total = 0.012 × 1,000,000 = 12,000 m². Remaining fraction = 2/5; 12,000 × 2/5 = 4,800.',check:()=>.012*1000000*2/5===4800},
{q:'A floor is 15 ft by 12 ft. It uses 6-in by 6-in tiles. How many tiles including 10% extra?',a:'792 tiles',why:'Floor = 180 ft² = 25,920 in². Tile = 36 in², so 720 tiles. Add 10%: 720 × 1.10 = 792.',check:()=>15*12*144/36===720&&720*11/10===792}
];