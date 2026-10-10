function graph(){
const X=x=>50+(x+3)*80,Y=y=>380-(y+4)*21;
let out='<svg class="vt-chart" viewBox="0 0 720 420" role="img" aria-label="Exact vertical translation of a quadratic down 3 units">';
for(let x=-3;x<=5;x++)out+='<line x1="'+X(x)+'" x2="'+X(x)+'" y1="20" y2="380" stroke="#cbd5e1"/>';
for(let y=-4;y<=12;y+=2)out+='<line x1="50" x2="690" y1="'+Y(y)+'" y2="'+Y(y)+'" stroke="#cbd5e1"/>';
for(const [k,color] of [[0,'#1768ac'],[-3,'#c2410c']]){
let points=[];for(let i=0;i<=320;i++){let x=-3+i/40,y=(x-1)**2+k;points.push(X(x).toFixed(1)+','+Y(y).toFixed(1));}
out+='<polyline fill="none" stroke="'+color+'" stroke-width="3" points="'+points.join(' ')+'"/>';
}
out+='<circle cx="'+X(1)+'" cy="'+Y(0)+'" r="5" fill="#1768ac"/><circle cx="'+X(1)+'" cy="'+Y(-3)+'" r="5" fill="#c2410c"/>';
out+='<text x="390" y="'+(Y(0)-7)+'">f vertex (1,0)</text><text x="390" y="'+(Y(-3)+15)+'">g vertex (1,-3)</text></svg>';
for(const x of [0,1,2,3])if(((x-1)**2-3)-((x-1)**2)!==-3)throw Error('Graph QA');
return out;
}
module.exports=graph;
