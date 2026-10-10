(function model(){
const practice=[...require('./lesson160-practice-part1'),...require('./lesson160-practice-part2'),...require('./lesson160-practice-part3')].map((a,i)=>({prompt:a[0],answer:a[1],solution:a[2],options:[a[1],...a[3]],group:i<3?'Skill Check':i<11?'Core Practice':i<16?'Exam-Style Practice':'Challenge Problems'}));
const test=require('./lesson160-test').map(a=>({prompt:a[0],answer:a[1],solution:a[2],options:[a[1],...a[3]]}));
const explanation=[...require('./lesson160-explanation-part1'),...require('./lesson160-explanation-part2')];
const videos={english:[...require('./lesson160-video-en-part1'),...require('./lesson160-video-en-part2')],arabic:[...require('./lesson160-video-ar-part1'),...require('./lesson160-video-ar-part2')]};
if(practice.length!==18||test.length!==5||explanation.length!==16||videos.english.length!==12||videos.arabic.length!==12)throw Error('lesson160 counts');
if(new Set(practice.map(x=>x.prompt)).size!==18)throw Error('duplicate practice');
for(const q of [...practice,...test])if(q.options.length!==4||new Set(q.options).size!==4||q.options[0]!==q.answer)throw Error('options/answer mismatch');
module.exports={practice,test,explanation,videos,base:'problem-solving-and-data-analysis/rates/unit-rates',title:'Unit Rates'};
})();
