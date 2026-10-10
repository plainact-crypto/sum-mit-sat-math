// Lesson 143 — infinitely many solutions of absolute value equations.
module.exports={
q:[
['|x|=x','x≥0','Absolute value equals its input exactly when the input is nonnegative.','Math.abs(x)','x','ge',0],
['|x|=−x','x≤0','Absolute value equals the opposite of its input when the input is nonpositive.','Math.abs(x)','-x','le',0],
['|x−2|=x−2','x≥2','Require x−2≥0.','Math.abs(x-2)','x-2','ge',2],
['|x+3|=x+3','x≥−3','Require x+3≥0.','Math.abs(x+3)','x+3','ge',-3],
['|x−4|=4−x','x≤4','Require x−4≤0.','Math.abs(x-4)','4-x','le',4],
['|2x−6|=2x−6','x≥3','Require 2x−6≥0.','Math.abs(2*x-6)','2*x-6','ge',3],
['|3x+6|=−(3x+6)','x≤−2','Require 3x+6≤0.','Math.abs(3*x+6)','-(3*x+6)','le',-2],
['|x−1|=|1−x|','All real x','Opposite inputs have equal absolute value.','Math.abs(x-1)','Math.abs(1-x)','all',0],
['|2x+8|=2|x+4|','All real x','Factor 2 inside absolute value: |2(x+4)|=2|x+4|.','Math.abs(2*x+8)','2*Math.abs(x+4)','all',0],
['|x−3|+x−3=0','x≤3','Rearrange to |x−3|=3−x; this holds when x−3≤0.','Math.abs(x-3)+x-3','0','le',3],
['|x+1|−(x+1)=0','x≥−1','Rearrange to |x+1|=x+1, requiring x+1≥0.','Math.abs(x+1)-(x+1)','0','ge',-1],
['|4−2x|=2x−4','x≥2','Right side must be nonnegative: 2x−4≥0. Then |4−2x|=2x−4.','Math.abs(4-2*x)','2*x-4','ge',2],
['|x−2|+|x+1|=3','−1≤x≤2','The sum of distances to −1 and 2 equals their separation 3 exactly for points between them.','Math.abs(x-2)+Math.abs(x+1)','3','between',-1,2],
['|x−5|+|x+1|=6','−1≤x≤5','The sum of distances to −1 and 5 equals 6 exactly for points between them.','Math.abs(x-5)+Math.abs(x+1)','6','between',-1,5],
['|x−4|−|x+1|=5','x≤−1','For x≤−1, distances are 4−x and −x−1, whose difference is 5; other regions do not satisfy.','Math.abs(x-4)-Math.abs(x+1)','5','le',-1],
['|x−1|−|x−5|=4','x≥5','For x≥5, distances are x−1 and x−5, whose difference is 4; other regions do not satisfy.','Math.abs(x-1)-Math.abs(x-5)','4','ge',5],
['|2x−4|+|x−2|=3(x−2)','x≥2','Left side is 3|x−2|. Equality with 3(x−2) requires x−2≥0.','Math.abs(2*x-4)+Math.abs(x-2)','3*(x-2)','ge',2],
['|x−2|+|x+2|=4','−2≤x≤2','The sum of distances to −2 and 2 equals 4 for every point between them.','Math.abs(x-2)+Math.abs(x+2)','4','between',-2,2]
],
tests:[
['|x|=x',['x≥0','x≤0','x=0 only','All real'],0,'The input must be nonnegative.','Math.abs(x)','x','ge',0],
['|x+3|=x+3',['x≤−3','x≥−3','x=−3 only','All real'],1,'x+3≥0, so x≥−3.','Math.abs(x+3)','x+3','ge',-3],
['|2x−6|=6−2x',['x≥3','x=3 only','x≤3','All real'],2,'The input 2x−6 must be nonpositive, so x≤3.','Math.abs(2*x-6)','6-2*x','le',3],
['|x−2|+|x+1|=3',['−1≤x≤2','x≤−1','x≥2','All real'],0,'Distance sum equals 3 between the endpoints −1 and 2.','Math.abs(x-2)+Math.abs(x+1)','3','between',-1,2],
['|x−4|−|x+2|=6',['x≥4','−2≤x≤4','x≤−2','No solution'],2,'For x≤−2, (4−x)−(−x−2)=6; elsewhere the difference is smaller.','Math.abs(x-4)-Math.abs(x+2)','6','le',-2]
]};
