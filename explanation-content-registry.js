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
  },
  {
    slug:'solving-by-substitution',lesson:'Solving by Substitution',classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:7,yMin:-2,yMax:9},lines:[{m:1,b:1,qaX:[0,1,3],yIntercept:1},{m:-1,b:7,qaX:[0,2,3],yIntercept:7}],intersections:[{a:0,b:1,x:3,y:4}],points:[{x:3,y:4,line:0,label:'solution (3, 4)'}],ariaLabel:'Lines y = x + 1 and y = -x + 7 intersecting at the substitution solution (3, 4)'},
    desmos:D('y = x + 1 and x + y = 7','the intersection point (3, 4)','verify the ordered pair found by substitution','the intersection is the point that satisfies both equations, exactly matching the algebraic definition of a system solution','Substitution is faster when a variable is already isolated; Desmos is useful for checking the result and connecting it to the graph.','Substitute y=x+1 into x+y=7: x+(x+1)=7, so 2x=6, x=3, y=4. Check: 4=3+1 and 3+4=7.')
  },
  {
    slug:'solving-by-elimination',lesson:'Solving by Elimination',classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:6,yMin:-5,yMax:9},lines:[{m:-2,b:7,qaX:[0,1,3],yIntercept:7},{m:1,b:-2,qaX:[0,2,3],yIntercept:-2}],intersections:[{a:0,b:1,x:3,y:1}],points:[{x:3,y:1,line:0,label:'solution (3, 1)'}],ariaLabel:'Lines 2x plus y equals 7 and x minus y equals 2 intersecting at the elimination solution (3, 1)'},
    desmos:D('2x + y = 7 and x - y = 2','the intersection point (3, 1)','verify the ordered pair found by elimination','adding the equations cancels y while preserving every common solution; the remaining x-value locates the same intersection','Elimination is fastest when coefficients are already opposite; Desmos is useful for checking the result and connecting algebra to the graph.','Add the equations: 3x=9, so x=3. Then 3-y=2 gives y=1. Check: 2(3)+1=7 and 3-1=2. For graph QA, y=-2x+7 gives 7,5,1 at x=0,1,3; y=x-2 gives -2,0,1 at x=0,2,3.')
  },
  {
    slug:'solving-graphically',lesson:'Solving Graphically',classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:6,yMin:-2,yMax:10},lines:[{m:2,b:1,qaX:[0,1,2],yIntercept:1},{m:-1,b:7,qaX:[0,2,4],yIntercept:7}],intersections:[{a:0,b:1,x:2,y:5}],points:[{x:2,y:5,line:0,label:'solution (2, 5)'}],ariaLabel:'Lines y equals 2x plus 1 and y equals negative x plus 7 intersecting at the graphical solution (2, 5)'},
    desmos:D('y = 2x + 1 and y = -x + 7','the intersection point (2, 5)','read the system solution from the common point, then verify it in both equations','every point on each graph satisfies its equation, so the intersection satisfies both equations at the same time','For graph-based questions, Desmos is often the fastest accurate tool; algebra is useful for confirming an exact intersection.','Set 2x+1=-x+7: 3x=6, so x=2 and y=5. Graph QA: y=2x+1 gives 1,3,5 at x=0,1,2; y=-x+7 gives 7,5,3 at x=0,2,4. Both give y=5 at x=2.')
  },
  {
    slug:'systems-with-parameters',lesson:'Systems with Parameters',classification:'DESMOS',graph:null,
    desmos:D('2x + y = 7 and kx + 2y = c','how the relationship changes as you try k=4,c=14; k=4,c=10; and k=6,c=14','verify whether a chosen parameter case gives infinitely many solutions, no solution, or one solution','the parameter values change the coefficient and constant relationships, which determines whether the equations are identical, parallel, or intersect once','Coefficient comparison is usually faster for exact parameter questions; Desmos is useful for checking cases and seeing how sliders change the system.','Double the first equation to get 4x+2y=14. Thus k=4,c=14 gives the same equation; k=4,c=10 gives 4x+2y=14 and 4x+2y=10, a contradiction; k=6,c=14 gives x=0,y=7. More generally the coefficient determinant is 4-k, so k≠4 gives one unique solution.')
  },
  {
    slug:'systems-word-problems',lesson:'Systems Word Problems',classification:'DESMOS',graph:null,
    desmos:D('x + y = 18 and 9x + 5y = 126','the intersection (9, 9)','verify the adult-ticket and student-ticket counts after building the model','a common ordered pair satisfies both the total-count equation and the revenue equation, so it satisfies both facts in the situation','Building the equations is the main skill; elimination is faster for this clean system, while Desmos is useful for checking the model and solution.','From x+y=18, multiply by 5 to get 5x+5y=90. Subtract from 9x+5y=126: 4x=36, so x=9 and y=9. Check: 9+9=18 and 9(9)+5(9)=126.')
  },
  {
    slug:'solving-one-variable-inequalities',lesson:'Solving One-Variable Inequalities',classification:'DESMOS',graph:null,
    desmos:D('3x + 5 < 20','the solution region x < 5','verify the algebraic solution and test the boundary value','the inequality is true exactly for the x-values that make the left side smaller than 20, so the displayed solution region represents the same solution set','For a simple one-variable inequality, algebra is usually faster; Desmos is useful for checking the solution set and catching a sign or boundary mistake.','Subtract 5 to get 3x<15, then divide by positive 3 to get x<5. At x=4, 3(4)+5=17<20; at x=5, 20<20 is false.')
  }
];
