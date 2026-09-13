const base=require('./explanation-retrofit-registry-base');
module.exports=[
  ...base,
  {slug:'combining-like-terms',lesson:'Combining Like Terms',classification:'NEITHER',graph:null,desmos:null},
  {slug:'expanding-expressions',lesson:'Expanding Expressions',classification:'NEITHER',graph:null,desmos:null},
  {slug:'factoring-expressions',lesson:'Factoring Expressions',classification:'NEITHER',graph:null,desmos:null},
  {slug:'rewriting-equivalent-expressions',lesson:'Rewriting Equivalent Expressions',classification:'DESMOS',graph:null,desmos:{enter:'y=4(x+3)-2x and y=2x+12',lookFor:'The two graphs overlap exactly for every x shown.',useIt:'Use the overlap to verify that the rewritten expression matches the original across inputs, especially after distribution or combining like terms.',why:'Equivalent expressions define the same output for every allowed input, so their function graphs coincide.',faster:'Usually not for the rewrite itself. Algebra is faster; Desmos is useful as a verification step when signs or answer choices are easy to misread.',crossCheck:'4(x+3)-2x = 4x+12-2x = 2x+12, so the overlap is mathematically expected.'}},
  {slug:'polynomial-addition',lesson:'Polynomial Addition',classification:'NEITHER',graph:null,desmos:null},
  {slug:'polynomial-subtraction',lesson:'Polynomial Subtraction',classification:'NEITHER',graph:null,desmos:null},
  {slug:'polynomial-multiplication',lesson:'Polynomial Multiplication',classification:'NEITHER',graph:null,desmos:null},
  {slug:'special-polynomial-products',lesson:'Special Polynomial Products',classification:'NEITHER',graph:null,desmos:null},
  {slug:'polynomial-division',lesson:'Polynomial Division',classification:'NEITHER',graph:null,desmos:null},
  {slug:'greatest-common-factor',lesson:'Greatest Common Factor',classification:'NEITHER',graph:null,desmos:null},
  {slug:'factoring-trinomials',lesson:'Factoring Trinomials',classification:'DESMOS',graph:null,desmos:{enter:'y=x^2+7x+12',lookFor:'the x-intercepts at x = -4 and x = -3',useIt:'use the zeros to check the factorization (x+4)(x+3)',why:'a zero r of the quadratic corresponds to a linear factor (x-r), so roots -4 and -3 correspond to factors (x+4) and (x+3)',faster:'Usually not for straightforward integer factoring. Algebra is faster; Desmos is useful for checking roots, signs, and a proposed factorization.',crossCheck:'For x^2+7x+12, substituting x=-4 gives 16-28+12=0 and x=-3 gives 9-21+12=0. Expanding (x+4)(x+3) gives x^2+7x+12.'}}
];
