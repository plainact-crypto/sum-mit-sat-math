const D=(enter,lookFor,useIt,why,faster,crossCheck)=>({enter,lookFor,useIt,why,faster,crossCheck});
module.exports=[
  {
    slug:'linear-inequality-word-problems',
    lesson:'Linear Inequality Word Problems',
    classification:'DESMOS',
    graph:null,
    desmos:D(
      '5 + 2.5m <= 30; then enter 75 + 15w >= 240 on a separate line',
      'the boundary m = 10 for the budget model and w = 11 for the savings model, together with the allowed side of each boundary',
      'verify the translated inequality, confirm the exact boundary, and then apply any whole-number restriction required by the context',
      'an inequality describes every input that keeps the modeled expression within a limit or goal; equality locates the boundary and the inequality direction selects the allowed side',
      'For a short one- or two-step inequality, algebra is usually faster; Desmos is most useful for checking the model, boundary, and inequality direction.',
      '5+2.5(10)=30 while 5+2.5(11)=32.5, so m<=10. Also 75+15(11)=240 while 75+15(10)=225, so w>=11.'
    )
  },
  {
    slug:'overlapping-solution-regions',
    lesson:'Overlapping Solution Regions',
    classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:6,yMin:-1,yMax:9},lines:[{m:1,b:1,qaX:[-1,0,3],yIntercept:1,xIntercept:-1},{m:-1,b:7,qaX:[-1,0,3],yIntercept:7,xIntercept:7}],intersections:[{a:0,b:1,x:3,y:4}],points:[{x:3,y:4,line:0,label:'boundary intersection (3, 4)'},{x:0,y:3,label:'overlap solution (0, 3)'},{x:2,y:4,label:'overlap solution (2, 4)'}],caption:'For y ≥ x + 1 and y ≤ −x + 7, the overlap is between the two verified boundaries for x ≤ 3.',ariaLabel:'Boundary lines y equals x plus 1 and y equals negative x plus 7 meeting at (3, 4), with verified overlap points (0, 3) and (2, 4)'},
    desmos:D(
      'Enter y >= x + 1 and y <= -x + 7 on separate lines.',
      'the common shaded region between the two boundaries and the meeting point (3, 4)',
      'identify the overlap, read its limiting intersection, and check whether a candidate point belongs to every shaded region',
      'Desmos shades each inequality separately, and the common shading represents ordered pairs that satisfy both conditions at the same time',
      'For a graphing or feasible-region question, Desmos is often the fastest accurate visual check; algebra is faster for proving an exact intersection and endpoint.',
      'Set x+1=-x+7: 2x=6, so x=3 and y=4. Graph QA: y=x+1 gives 0,1,4 at x=-1,0,3; y=-x+7 gives 8,7,4. Also (0,3) satisfies 3>=1 and 3<=7; (2,4) satisfies 4>=3 and 4<=5; (4,4) fails 4>=5.'
    )
  },
  {
    slug:'testing-points-in-a-system',
    lesson:'Testing Points in a System',
    classification:'BOTH',
    graph:{bounds:{xMin:-2,xMax:6,yMin:-1,yMax:9},lines:[{m:1,b:1,qaX:[-1,0,2],yIntercept:1,xIntercept:-1},{m:-1,b:7,qaX:[0,2,4],yIntercept:7,xIntercept:7}],intersections:[{a:0,b:1,x:3,y:4}],points:[{x:2,y:4,label:'solution (2, 4)'},{x:4,y:4,label:'not a solution (4, 4)'},{x:3,y:4,line:0,label:'boundary intersection (3, 4)'}],caption:'For y ≥ x + 1 and y ≤ −x + 7, (2, 4) satisfies both inequalities while (4, 4) does not.',ariaLabel:'Two verified boundary lines for a system, with solution point (2, 4), non-solution point (4, 4), and boundary intersection (3, 4)'},
    desmos:D(
      'Enter y >= x + 1 and y <= -x + 7 on separate lines, then plot the points (2,4) and (4,4).',
      'whether each plotted point lies inside the overlap of the two shaded solution regions; the boundaries meet at (3, 4)',
      'verify the substitution decision: (2,4) belongs to the system, while (4,4) does not',
      'the overlap contains exactly the ordered pairs that make every inequality true, so plotting a candidate point provides a visual check of the same substitution test',
      'For one or two candidate points, direct substitution is faster; Desmos is useful when the system is already graphed or when several candidates must be checked visually.',
      'For (2,4): 4>=2+1 and 4<=-2+7, so both are true. For (4,4): 4>=5 is false and 4<=3 is false. Boundary QA: y=x+1 gives 0,1,3 at x=-1,0,2; y=-x+7 gives 7,5,3 at x=0,2,4. Solving x+1=-x+7 gives (3,4).'
    )
  },
  {
    slug:'systems-of-inequalities-word-problems',
    lesson:'Systems of Inequalities Word Problems',
    classification:'BOTH',
    graph:{bounds:{xMin:-1,xMax:11,yMin:-1,yMax:11},lines:[{m:-1,b:10,qaX:[0,4,8],yIntercept:10,xIntercept:10},{m:-0.5,b:6,qaX:[0,4,8],yIntercept:6,xIntercept:12}],intersections:[{a:0,b:1,x:8,y:2}],points:[{x:8,y:2,line:0,label:'boundary intersection (8, 2)'},{x:4,y:5,label:'feasible (4, 5)'},{x:2,y:3,label:'not feasible (2, 3)'}],caption:'For x + y ≤ 10 and x + 2y ≥ 12, feasible first-quadrant choices lie at or below y = 10 − x and at or above y = 6 − 0.5x.',ariaLabel:'Verified boundary lines y equals 10 minus x and y equals 6 minus one half x meeting at (8, 2), with feasible point (4, 5) and non-feasible point (2, 3)'},
    desmos:D(
      'Enter x + y <= 10, x + 2y >= 12, x >= 0, and y >= 0 on separate lines.',
      'the common first-quadrant region between the two boundary lines; the main boundaries meet at (8, 2)',
      'verify the feasible region, confirm whether a candidate point satisfies every condition, and then keep whole-number coordinates when the variables count objects',
      'each inequality shades exactly the ordered pairs satisfying one real-world condition, so their overlap contains the choices satisfying all conditions simultaneously',
      'Desmos is very useful for visualizing several constraints; direct substitution is faster when you only need to test one candidate point.',
      'Boundary QA: y=10-x gives 10,6,2 at x=0,4,8; y=6-0.5x gives 6,4,2. Setting them equal gives (8,2). Candidate (4,5): 4+5=9<=10 and 4+2(5)=14>=12. Candidate (2,3) fails the second condition because 2+2(3)=8<12.'
    )
  }
];
