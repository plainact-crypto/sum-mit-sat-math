const fs=require('fs');
const path=require('path');

const dist=path.join(__dirname,'dist');
const VIDEO_URL='https://videozero.ai/view/?id=1190e0ec-259c-4708-8be4-db999314325e';
const lesson='Solving One-Step Linear Equations';
const marker='Video Explanation · English';
const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const newBody=`<div class="summit-video-shell"><a class="summit-video-launch" href="${VIDEO_URL}" target="_blank" rel="noopener" aria-label="Play ${lesson} whiteboard lesson"><div class="summit-video-board"><div class="summit-video-kicker">WHITEBOARD LESSON</div><div class="summit-video-equation">x + 7 = 19</div><div class="summit-video-step">x + 7 − 7 = 19 − 7</div><div class="summit-video-answer">x = 12</div><span class="summit-video-play">▶</span></div><span class="summit-video-cta">Play lesson</span></a><p class="video-note">English · Handwritten whiteboard explanation</p></div><style>.summit-video-shell{margin:24px 0 10px}.summit-video-launch{display:block;text-decoration:none;color:inherit}.summit-video-board{position:relative;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,#fffef9,#f5f7f6);border:1px solid rgba(20,36,61,.14);box-shadow:0 18px 45px rgba(20,36,61,.14);padding:clamp(18px,4vw,38px);box-sizing:border-box;text-align:left}.summit-video-kicker{font:800 clamp(11px,2vw,14px)/1.2 Inter,system-ui,sans-serif;letter-spacing:.18em;color:#2860dc;margin-bottom:clamp(16px,3vw,28px)}.summit-video-equation,.summit-video-step,.summit-video-answer{font-family:Georgia,serif;color:#15243c}.summit-video-equation{font-size:clamp(28px,6vw,54px)}.summit-video-step{font-size:clamp(18px,4.2vw,36px);color:#2c6fd1;margin-top:clamp(12px,2vw,20px)}.summit-video-answer{display:inline-block;font-size:clamp(30px,7vw,62px);margin-top:clamp(12px,2vw,22px);padding:2px 16px 7px;border:4px solid #d6453d;border-radius:50%;transform:rotate(-3deg)}.summit-video-play{position:absolute;right:clamp(16px,4vw,34px);bottom:clamp(16px,4vw,30px);width:clamp(52px,12vw,76px);height:clamp(52px,12vw,76px);display:grid;place-items:center;border-radius:50%;background:#14243d;color:white;font-size:clamp(20px,5vw,30px);box-shadow:0 10px 28px rgba(20,36,61,.28)}.summit-video-cta{display:block;width:max-content;margin:14px auto 0;background:#14243d;color:#fff;border-radius:999px;padding:12px 22px;font:800 14px/1 Inter,system-ui,sans-serif}.video-note{text-align:center;margin:14px 0 0;color:#697386;font-size:.95rem}@media(max-width:640px){.summit-video-shell{margin-top:18px}.summit-video-board{border-radius:18px;padding:18px}.summit-video-kicker{margin-bottom:12px}.summit-video-answer{border-width:3px}.summit-video-cta{margin-top:12px;padding:11px 18px}}</style>`;

const matches=[];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const p=path.join(dir,name),st=fs.statSync(p);
    if(st.isDirectory()) walk(p);
    else if(name==='index.html'){
      const h=fs.readFileSync(p,'utf8');
      if(h.includes(lesson)&&h.includes(marker)) matches.push([p,h]);
    }
  }
}
walk(dist);
if(matches.length!==1){
  console.error(`Expected exactly one English video page for ${lesson}; found ${matches.length}`);
  process.exit(1);
}
const [file,html]=matches[0];
if(!html.includes(oldBody)){
  console.error('English video page placeholder marker not found');
  process.exit(1);
}
fs.writeFileSync(file,html.replace(oldBody,newBody));
console.log(`Embedded SUMMIT English lesson video at ${path.relative(dist,file)}`);
