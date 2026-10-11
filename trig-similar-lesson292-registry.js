'use strict';
module.exports=[{
slug:'trigonometric-ratios-in-similar-triangles',
lesson:'Trigonometric Ratios in Similar Triangles',
classification:'BOTH',
graph:{
bounds:{xMin:-1,xMax:9,yMin:-1,yMax:7},
lines:[{m:0,b:0,qaX:[0,4,8]},{m:0.75,b:0,qaX:[0,4,8]}],
verticals:[{x:4},{x:8}],
points:[{x:0,y:0,line:0,label:'A'},{x:4,y:3,line:1,label:'C'},{x:8,y:6,line:1,label:'C prime'}],
ariaLabel:'Similar triangles with legs three four and six eight',
caption:'The 3-4-5 and 6-8-10 right triangles have equal sine three fifths.'
},
desmos:{
enter:'3/5; 6/10; 3/4; 6/8',
lookFor:'Equal pairs 0.6 and 0.75',
useIt:'Verify that corresponding sine and tangent ratios are unchanged.',
why:'A common positive scale factor cancels from the ratio.',
faster:'Simplification is faster for simple fractions; Desmos checks decimal ratios.',
crossCheck:'3/5=6/10 and 3/4=6/8 exactly.'
}
}];
