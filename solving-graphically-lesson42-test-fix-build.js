const fs=require('fs');
const file=__dirname+'/dist/algebra/systems-of-linear-equations/solving-graphically/test/index.html';
let s=fs.readFileSync(file,'utf8');
const changes=[
['y = 0.5x + 1 and y = -0.25x + 7','y = 0.75x + 2 and y = -0.25x + 10'],
["c:['(6, 4)','(8, 5)','(10, 6)','(12, 7)']","c:['(6, 6.5)','(8, 8)','(10, 9.5)','(12, 11)']"],
['Solve 0.5x + 1 = -0.25x + 7. Then 0.75x = 6, so x = 8 and y = 5. Both original equations give 5.','Solve 0.75x + 2 = -0.25x + 10. Then x = 8 and y = 8. Both original equations give 8.']
];
for(const [a,b] of changes){if(!s.includes(a))throw Error('Unexpected test content');s=s.replace(a,b)}
fs.writeFileSync(file,s);
