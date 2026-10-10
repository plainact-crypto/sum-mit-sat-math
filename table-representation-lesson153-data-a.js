module.exports=[
['x:0,1,2; f:2,4,8. Find f(3).','16','Each step doubles: 8·2=16.','2*2**x',3,16],
['x:−1,0,1; f:1,3,9. Find f(2).','27','Each step triples: 9·3=27.','3*3**x',2,27],
['x:0,1,2; f:1,4,9. Find f(3).','16','The rule is (x+1)², so f(3)=16.','(x+1)**2',3,16],
['x:−2,−1,0,1; f:4,1,0,1. Find f(2).','4','The rule is x², so f(2)=4.','x**2',2,4],
['x:0,1,2,3; f:5,8,11,14. Linear or nonlinear?','Linear','Constant first differences of 3 mean linear.','3*x+5',3,14],
['x:0,1,2; f:2,6,18. Find f(3).','54','Common ratio 3: 18·3=54.','2*3**x',3,54],
['x:0,1,2; f:4,7,12. Find f(3).','19','First differences 3,5,7 imply x²+2x+4.','x*x+2*x+4',3,19],
['x:0,1,2; f:10,5,2.5. Find f(3).','1.25','Multiply by 1/2 each step.','10*.5**x',3,1.25],
['x:−2,−1,0,1,2; f:4,1,0,1,4. Find minimum.','(0,0)','Squares are nonnegative and zero at x=0.','x*x',0,0]
];