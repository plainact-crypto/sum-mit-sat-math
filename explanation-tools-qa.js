const fs=require('fs');
const path=require('path');
const tools=require('./explanation-tools.js');

function assert(cond,msg){if(!cond)throw new Error(msg)}
function decodeAttr(s){return s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')}

// Core mathematical self-tests.
for(const spec of [
  {lines:[{m:2,b:1,yIntercept:1,xIntercept:-0.5}],points:[{x:0,y:1,line:0},{x:2,y:5,line:0}],bounds:{xMin:-3,xMax:3,yMin:-3,yMax:7}},
  {lines:[{m:0,b:7,yIntercept:7}],bounds:{xMin:-5,xMax:5,yMin:0,yMax:10}},
  {verticals:[{x:4}],bounds:{xMin:0,xMax:8,yMin:-5,yMax:5}},
  {lines:[{m:2,b:1},{m:-1,b:7}],intersections:[{a:0,b:1,x:2,y:5}],bounds:{xMin:-2,xMax:8,yMin:-2,yMax:10}}
]) tools.verifyGraphSpec(spec);
assert(tools.nearly(tools.linearY(2,1,2),5),'linearY self-test failed');
assert(tools.nearly(tools.linearXIntercept(2,1),-0.5),'x-intercept self-test failed');
const hit=tools.intersection({m:2,b:1},{m:-1,b:7});assert(hit&&tools.nearly(hit.x,2)&&tools.nearly(hit.y,5),'intersection self-test failed');

const root=__dirname;
const files=fs.readdirSync(root).filter(f=>/-explanation\.html$/.test(f));
let graphs=0,desmos=0;
for(const file of files){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  const graphRe=/data-summit-graph=(?:"([^"]+)"|'([^']+)')/g;
  for(let m;(m=graphRe.exec(html));){
    graphs++; let spec;
    try{spec=JSON.parse(decodeAttr(m[1]||m[2]))}catch(e){throw new Error(`${file}: invalid data-summit-graph JSON`)}
    try{tools.verifyGraphSpec(spec)}catch(e){throw new Error(`${file}: ${e.message}`)}
  }
  if(/data-summit-desmos=["']true["']/.test(html)||/DESMOS STRATEGY/i.test(html)){
    desmos++;
    const required=['Enter','Look for','Use it to answer','Why it works','Faster or not?'];
    for(const label of required) assert(html.toLowerCase().includes(label.toLowerCase()),`${file}: Desmos block missing ${label}`);
  }
}
console.log(JSON.stringify({graphMathSelfTests:'PASS',desmosStructureQA:'PASS',standaloneExplanationFiles:files.length,graphSpecsValidated:graphs,desmosBlocksValidated:desmos},null,2));
