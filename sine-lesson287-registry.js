'use strict';
module.exports=[{
slug:'sine',lesson:'Sine',classification:'BOTH',
graph:{
 bounds:{xMin:-1,xMax:5,yMin:-1,yMax:4},
 lines:[{m:0,b:0,qaX:[0,2,4]},{m:0.75,b:0,qaX:[0,2,4]}],
 verticals:[{x:4}],
 points:[{x:0,y:0,line:0,label:'A'},{x:4,y:0,line:0,label:'B'},{x:4,y:3,line:1,label:'C'}],
 ariaLabel:'Right triangle A zero zero B four zero C four three',
 caption:'AB=4, BC=3, AC=5; sin angle A=3/5.'
},
desmos:{
 enter:'sin(30°); arcsin(12/13)',
 lookFor:'0.5 and approximately 67.38 degrees',
 useIt:'Find the opposite leg or check an angle using the opposite/hypotenuse ratio.',
 why:'In a right triangle sine is opposite divided by hypotenuse.',
 faster:'Mental math is faster for 30 degrees; inverse sine is faster with a calculator.',
 crossCheck:'sin 30 degrees=1/2; arcsin(12/13) is approximately 67.38 degrees.'
}
}];
