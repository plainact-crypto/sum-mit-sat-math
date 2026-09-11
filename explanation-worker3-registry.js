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
  }
];
