const D=(enter,lookFor,useIt,why,faster,crossCheck)=>({enter,lookFor,useIt,why,faster,crossCheck});
module.exports=[
  {
    slug:'one-solution',lesson:'One Solution',classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:6,yMin:-2,yMax:10},lines:[{m:2,b:1,qaX:[0,1,2],yIntercept:1},{m:-1,b:7,qaX:[0,2,4],yIntercept:7}],intersections:[{a:0,b:1,x:2,y:5}],points:[{x:2,y:5,line:0,label:'solution (2, 5)'}],ariaLabel:'Two lines y = 2x + 1 and y = -x + 7 intersecting at (2, 5)'},
    desmos:D('y = 2x + 1 and y = -x + 7','the single intersection point (2, 5)','identify and verify the system’s unique solution','an intersection point satisfies both equations, so one intersection means exactly one common ordered pair','For simple equations, algebra is usually faster; Desmos is excellent for confirming the intersection and interpreting the graph.','Set 2x+1=-x+7: 3x=6, so x=2 and y=5. Also 2(2)+1=5 and -(2)+7=5.')
  },
  {
    slug:'no-solution',lesson:'No Solution',classification:'BOTH',
    graph:{bounds:{xMin:-3,xMax:5,yMin:-8,yMax:12},lines:[{m:2,b:1,qaX:[0,1,2],yIntercept:1},{m:2,b:-3,qaX:[0,1,2],yIntercept:-3}],points:[],ariaLabel:'Parallel lines y = 2x + 1 and y = 2x - 3 with no intersection'},
    desmos:D('y = 2x + 1 and y = 2x - 3','two distinct parallel lines with no intersection','confirm that the system has no common ordered pair','both lines have slope 2 but different y-intercepts, so their vertical separation stays constant and they never meet','Slope comparison is faster here; Desmos is useful for visual confirmation.','For x=0,1,2 the first line gives 1,3,5 and the second gives -3,-1,1; each pair differs by 4. Setting the equations equal gives 1=-3, a contradiction.')
  },
  {
    slug:'infinitely-many-solutions',lesson:'Infinitely Many Solutions',classification:'BOTH',
    graph:{bounds:{xMin:-3,xMax:5,yMin:-6,yMax:12},lines:[{m:2,b:1,qaX:[0,1,2],yIntercept:1},{m:2,b:1,qaX:[0,1,2],yIntercept:1}],points:[{x:0,y:1,line:0,label:'shared (0, 1)'},{x:1,y:3,line:0,label:'shared (1, 3)'},{x:2,y:5,line:0,label:'shared (2, 5)'}],ariaLabel:'Coincident lines y = 2x + 1 and 2y = 4x + 2 showing infinitely many shared points'},
    desmos:D('y = 2x + 1 and 2y = 4x + 2','the two graphs lying exactly on top of each other','confirm that every point on the visible line satisfies both equations','the second equation simplifies to y = 2x + 1, so both equations have the same solution set','Simplifying proportional equations is usually faster; Desmos is useful for confirming that the graphs coincide.','Divide 2y=4x+2 by 2 to get y=2x+1. At x=0,1,2 both equations give y=1,3,5, so the verified lines coincide.')
  }
];
