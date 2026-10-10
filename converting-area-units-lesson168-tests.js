module.exports=[
{q:'Convert 5 cm² to mm².',choices:['50','500','5,000','0.5'],correct:1,why:'Each side scales by 10, so area scales by 100: 5 × 100 = 500 mm².',check:()=>5*100===500},
{q:'Convert 0.4 m² to cm².',choices:['40','400','4,000','40,000'],correct:2,why:'One square meter is 10,000 square centimeters; 0.4 × 10,000 = 4,000.',check:()=>.4*10000===4000},
{q:'Convert 27 ft² to square inches.',choices:['324','1,944','3,888','46,656'],correct:2,why:'One square foot is 144 square inches; 27 × 144 = 3,888.',check:()=>27*144===3888},
{q:'Convert 1.2 hectares to m². One hectare is 10,000 m².',choices:['120','1,200','12,000','120,000'],correct:2,why:'1.2 × 10,000 = 12,000 square meters.',check:()=>1.2*10000===12000},
{q:'A 2.5-m by 1.8-m floor uses 30-cm by 30-cm tiles. How many tiles including 10% extra?',choices:['50','53','55','60'],correct:2,why:'Floor = 4.5 m². Each tile = 0.09 m². 4.5/0.09 = 50; with 10% extra, 55 tiles.',check:()=>2.5*1.8/(.3*.3)*1.1===55}
];