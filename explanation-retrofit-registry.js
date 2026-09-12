const base=require('./explanation-retrofit-registry-base');
module.exports=[
  ...base,
  {slug:'combining-like-terms',lesson:'Combining Like Terms',classification:'NEITHER',graph:null,desmos:null},
  {slug:'expanding-expressions',lesson:'Expanding Expressions',classification:'NEITHER',graph:null,desmos:null},
  {slug:'factoring-expressions',lesson:'Factoring Expressions',classification:'NEITHER',graph:null,desmos:null},
  {slug:'rewriting-equivalent-expressions',lesson:'Rewriting Equivalent Expressions',classification:'DESMOS',graph:null,desmos:{enter:'y=4(x+3)-2x and y=2x+12',lookFor:'The two graphs overlap exactly for every x shown.',useIt:'Use the overlap to verify that the rewritten expression matches the original across inputs, especially after distribution or combining like terms.',why:'Equivalent expressions define the same output for every allowed input, so their function graphs coincide.',faster:'Usually not for the rewrite itself. Algebra is faster; Desmos is useful as a verification step when signs or answer choices are easy to misread.',crossCheck:'4(x+3)-2x = 4x+12-2x = 2x+12, so the overlap is mathematically expected.'}},
  {slug:'polynomial-addition',lesson:'Polynomial Addition',classification:'NEITHER',graph:null,desmos:null}
];
