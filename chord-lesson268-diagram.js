'use strict';
const radius=5,offset=3,half=Math.sqrt(radius**2-offset**2);
const left=[-half,offset],right=[half,offset],mid=[0,offset];
if(half!==4||Math.hypot(...left)!==5||Math.hypot(...right)!==5||mid[0]!==0)throw Error('Chord diagram failed independent geometry QA');
const x=a=>260+40*a,y=a=>260-40*a;
const line=(a,b,color,width=3)=>'<line x1="'+x(a[0])+'" y1="'+y(a[1])+'" x2="'+x(b[0])+'" y2="'+y(b[1])+'" stroke="'+color+'" stroke-width="'+width+'"/>';
const svg='<figure data-retrofit-graph="true"><svg viewBox="0 0 520 520" role="img" aria-label="Circle radius five with chord length eight at center distance three"><circle cx="260" cy="260" r="200" fill="none" stroke="#26739a" stroke-width="3"/>'+line(left,right,'#b35127',5)+line([0,0],left,'#26739a')+line([0,0],right,'#26739a')+line([0,0],mid,'#196e56')+'<path d="M260 154 H274 V140" stroke="#196e56" fill="none" stroke-width="2"/><text x="80" y="120">A</text><text x="425" y="120">B</text><text x="275" y="280">O</text><text x="274" y="135">M</text><text x="165" y="167">4</text><text x="348" y="167">4</text><text x="270" y="210">3</text><text x="165" y="215">5</text></svg><figcaption>Verified r=5, OM=3, AM=MB=4, AB=8.</figcaption></figure>';
module.exports=svg;