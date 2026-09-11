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
  }
];
