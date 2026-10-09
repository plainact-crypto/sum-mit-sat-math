const {sec,write}=require('./lesson130-shell');
const scenes=[
['Introduction','A rational expression is a fraction made of polynomials.'],
['Multiplication','Multiply numerators and denominators.'],
['Restrictions','Original denominators must never be zero.'],
['Simple example','x over 3 times 6 over x is 2, with x not zero.'],
['Factoring','x squared minus nine is x minus three times x plus three.'],
['Cancellation','Cancel whole factors, not added terms.'],
['Exam example','Factor everything and keep original excluded values.'],
['Recap','Restrictions, factor, cancel, multiply and check.']
];
const body=sec('FULL LESSON VIDEO','<h2>Full lesson — narrated scene sequence</h2>'+scenes.map((s,i)=>'<section class="lesson-section"><h3>Scene '+(i+1)+': '+s[0]+'</h3><p>'+s[1]+'</p></section>').join(''));
write('video/english',body);write('video/arabic',body);