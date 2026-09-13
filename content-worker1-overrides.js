const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const items=[
['algebra/linear-functions/perpendicular-lines/answers/','perpendicular-lines-answers.html'],
['algebra/linear-functions/perpendicular-lines/test/','perpendicular-lines-test.html'],
['algebra/linear-functions/linear-function-tables/answers/','linear-function-tables-answers.html'],
['algebra/linear-functions/linear-function-tables/test/','linear-function-tables-test.html'],
['algebra/linear-functions/linear-function-word-problems/problems/','linear-function-word-problems-problems.html'],
['algebra/linear-functions/linear-function-word-problems/test/','linear-function-word-problems-test.html'],
['algebra/systems-of-linear-equations/no-solution/explanation/','no-solution-explanation.html'],
['algebra/systems-of-linear-equations/no-solution/problems/','no-solution-problems.html'],
['algebra/systems-of-linear-equations/solving-graphically/explanation/','solving-graphically-explanation.html'],
['algebra/systems-of-linear-equations/systems-with-parameters/explanation/','systems-with-parameters-explanation.html'],
['algebra/systems-of-linear-equations/systems-with-parameters/problems/','systems-with-parameters-problems.html'],
['algebra/systems-of-linear-equations/systems-with-parameters/test/','systems-with-parameters-test.html'],
['algebra/systems-of-linear-equations/systems-word-problems/answers/','systems-word-problems-answers.html'],
['algebra/linear-inequalities/solving-one-variable-inequalities/explanation/','solving-one-variable-inequalities-explanation.html'],
['algebra/linear-inequalities/solving-one-variable-inequalities/answers/','solving-one-variable-inequalities-answers.html'],
['algebra/linear-inequalities/solving-one-variable-inequalities/test/','solving-one-variable-inequalities-test.html'],
['algebra/linear-inequalities/reversing-the-inequality-sign/explanation/','reversing-the-inequality-sign-explanation.html'],
['algebra/linear-inequalities/reversing-the-inequality-sign/test/','reversing-the-inequality-sign-test.html'],
['algebra/linear-inequalities/compound-inequalities/explanation/','compound-inequalities-explanation.html'],
['algebra/linear-inequalities/compound-inequalities/problems/','compound-inequalities-problems.html'],
['algebra/linear-inequalities/two-variable-linear-inequalities/test/','two-variable-linear-inequalities-test.html'],
['advanced-math/factoring/greatest-common-factor/answers/','greatest-common-factor-answers.html']
];
for(const [route,file] of items){const target=path.join(dist,route);fs.mkdirSync(target,{recursive:true});fs.copyFileSync(path.join(root,file),path.join(target,'index.html'));}
