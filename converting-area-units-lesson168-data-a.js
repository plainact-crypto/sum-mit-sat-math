module.exports=[
{q:'Convert 3 m² to cm².',a:'30,000 cm²',why:'One meter is 100 centimeters, so one square meter is 100² = 10,000 cm². Multiply 3 × 10,000.',check:()=>3*100**2===30000},
{q:'Convert 450 cm² to m².',a:'0.045 m²',why:'Divide by 10,000 square centimeters per square meter: 450/10,000 = 0.045.',check:()=>450/10000===0.045},
{q:'Convert 7 ft² to in².',a:'1,008 in²',why:'One foot is 12 inches, so 1 ft² = 12² = 144 in². Multiply 7 × 144.',check:()=>7*144===1008},
{q:'Convert 2.4 m² to cm².',a:'24,000 cm²',why:'Multiply by 100² = 10,000: 2.4 × 10,000 = 24,000.',check:()=>2.4*10000===24000},
{q:'Convert 6,500 mm² to cm².',a:'65 cm²',why:'One centimeter is 10 millimeters, so 1 cm² = 100 mm². Divide 6,500 by 100.',check:()=>6500/100===65},
{q:'Convert 0.75 km² to m².',a:'750,000 m²',why:'One kilometer is 1,000 meters, so 1 km² = 1,000,000 m². Multiply by 0.75.',check:()=>.75*1000**2===750000},
{q:'Convert 18 yd² to ft².',a:'162 ft²',why:'One yard is 3 feet, so 1 yd² = 9 ft². Multiply 18 × 9.',check:()=>18*9===162},
{q:'A rectangular tile measures 20 cm by 30 cm. Find its area in m².',a:'0.06 m²',why:'Area = 600 cm². Divide by 10,000 to get 0.06 m².',check:()=>20*30/10000===.06},
{q:'A garden is 8 m by 5 m. Find its area in cm².',a:'400,000 cm²',why:'Area = 8 × 5 = 40 m². Convert 40 × 10,000 = 400,000 cm².',check:()=>8*5*10000===400000}
];