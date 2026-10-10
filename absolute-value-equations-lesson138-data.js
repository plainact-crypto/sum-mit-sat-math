// Lesson 138 data. Each item: question, final answer, worked reasoning, LHS, RHS, numeric roots.
module.exports={
q:[
['|x|=6','x=−6 or 6','x=6 or x=−6.','Math.abs(x)','6',[-6,6]],
['|x−3|=5','x=−2 or 8','x−3=±5; x=−2,8.','Math.abs(x-3)','5',[-2,8]],
['|x+4|=2','x=−6 or −2','x+4=±2; x=−6,−2.','Math.abs(x+4)','2',[-6,-2]],
['|2x|=10','x=−5 or 5','2x=±10; x=±5.','Math.abs(2*x)','10',[-5,5]],
['|3x−6|=9','x=−1 or 5','3x−6=±9; x=−1,5.','Math.abs(3*x-6)','9',[-1,5]],
['|2x+1|=7','x=−4 or 3','2x+1=±7; x=−4,3.','Math.abs(2*x+1)','7',[-4,3]],
['|x−7|=0','x=7','x−7=0; x=7.','Math.abs(x-7)','0',[7]],
['|4x−8|=12','x=−1 or 5','4x−8=±12; x=−1,5.','Math.abs(4*x-8)','12',[-1,5]],
['2|x−1|=10','x=−4 or 6','|x−1|=5; x−1=±5; x=−4,6.','2*Math.abs(x-1)','10',[-4,6]],
['|5x+10|=15','x=−5 or 1','5x+10=±15; x=−5,1.','Math.abs(5*x+10)','15',[-5,1]],
['3|2x−4|=18','x=−1 or 5','|2x−4|=6; x=−1,5.','3*Math.abs(2*x-4)','18',[-1,5]],
['5+|x+2|=12','x=−9 or 5','|x+2|=7; x=−9,5.','5+Math.abs(x+2)','12',[-9,5]],
['|3x+6|=−4','No real solution','Absolute value is nonnegative; it cannot equal −4.','Math.abs(3*x+6)','-4',[]],
['2|x−3|+1=9','x=−1 or 7','|x−3|=4; x=−1,7.','2*Math.abs(x-3)+1','9',[-1,7]],
['|4x−1|=3x+5','x=−4/7 or 6','Cases 4x−1=3x+5 and −4x+1=3x+5 yield 6 and −4/7; both check.','Math.abs(4*x-1)','3*x+5',[-4/7,6]],
['|2x+5|=|x−1|','x=−6 or −4/3','Set 2x+5=x−1 or 2x+5=−(x−1); x=−6,−4/3.','Math.abs(2*x+5)','Math.abs(x-1)',[-6,-4/3]],
['|x−4|+|x+2|=8','x=−3 or 5','Break at −2 and 4. Outer intervals yield −3 and 5; between the breakpoints the sum is 6.','Math.abs(x-4)+Math.abs(x+2)','8',[-3,5]],
['|2x−1|=x+4','x=−1 or 5','Solve 2x−1=x+4 or −2x+1=x+4; x=5 or −1, both check.','Math.abs(2*x-1)','x+4',[-1,5]]
],
tests:[
['|x|=9',['9 only','−9 only','−9 or 9','No solution'],2,'x=±9.','Math.abs(x)','9',[-9,9]],
['|x+3|=5',['2 or −8','8 or −2','−2 only','No solution'],0,'x+3=±5 gives 2 and −8.','Math.abs(x+3)','5',[-8,2]],
['2|3x−1|=8',['5/3 only','−1 or 5/3','−5/3 or 1','−1 or 3'],1,'3x−1=±4 gives −1 and 5/3.','2*Math.abs(3*x-1)','8',[-1,5/3]],
['|x−2|=−1',['1','3','−1 or 1','No real solution'],3,'Absolute value cannot be negative.','Math.abs(x-2)','-1',[]],
['|2x+1|=x+4',['−5/3 or 3','−3 or 5/3','3 only','No solution'],0,'Cases 2x+1=x+4 and −2x−1=x+4 yield 3 and −5/3.','Math.abs(2*x+1)','x+4',[-5/3,3]]
]};
