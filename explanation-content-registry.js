const D=(enter,lookFor,useIt,why,faster,crossCheck)=>({enter,lookFor,useIt,why,faster,crossCheck});
module.exports=[
  {
    slug:'one-solution',
    lesson:'One Solution',
    classification:'BOTH',
    graph:{
      bounds:{xMin:-2,xMax:6,yMin:-2,yMax:10},
      lines:[
        {m:2,b:1,qaX:[0,1,2],yIntercept:1},
        {m:-1,b:7,qaX:[0,2,4],yIntercept:7}
      ],
      intersections:[{a:0,b:1,x:2,y:5}],
      points:[{x:2,y:5,line:0,label:'solution (2, 5)'}],
      ariaLabel:'Two lines y = 2x + 1 and y = -x + 7 intersecting at (2, 5)'
    },
    desmos:D(
      'y = 2x + 1 and y = -x + 7',
      'the single intersection point (2, 5)',
      'identify and verify the system’s unique solution',
      'an intersection point satisfies both equations, so one intersection means exactly one common ordered pair',
      'For simple equations, algebra is usually faster; Desmos is excellent for confirming the intersection and interpreting the graph.',
      'Set 2x+1=-x+7: 3x=6, so x=2 and y=5. Also 2(2)+1=5 and -(2)+7=5.'
    )
  }
];
