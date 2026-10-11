'use strict';
module.exports=[{
slug:'cosine-on-the-unit-circle',lesson:'Cosine on the Unit Circle',classification:'BOTH',
graph:{bounds:{xMin:-1.5,xMax:1.5,yMin:-1.5,yMax:1.5},lines:[{m:0,b:0,qaX:[-1,0,1]}],points:[{x:-1,y:0,line:0,label:'180°'},{x:1,y:0,line:0,label:'0°'},{x:0,y:0,line:0,label:'center'}],circle:{center:[0,0],radius:1,verifiedPoints:[[1,0],[0,1],[-1,0],[0,-1],[-.5,Math.sqrt(3)/2]]},ariaLabel:'Unit circle x squared plus y squared equals one with verified horizontal diameter',caption:'Cosine is x. At 120 degrees the unit-circle x-coordinate is negative one half.'},
desmos:{enter:'x^2+y^2=1; cos(120°)',lookFor:'The unit circle and cosine negative 0.5',useIt:'Check the 120-degree x-coordinate.',why:'Cosine is the horizontal coordinate on the unit circle.',faster:'Reference angles are faster for exact values.',crossCheck:'(-1/2)^2+(√3/2)^2=1 and cos120°=-1/2.'}
}];
