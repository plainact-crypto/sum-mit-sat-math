const fs=require('fs');
const path=require('path');

const dist=path.join(__dirname,'dist');
const VIDEO_URL='https://videozero.ai/view/?id=1190e0ec-259c-4708-8be4-db999314325e';
const lesson='Solving One-Step Linear Equations';
const marker='Video Explanation · English';
const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';
const newBody=`<div class="summit-video-shell"><div class="summit-video-frame"><iframe src="${VIDEO_URL}" title="${lesson} — English Video" loading="eager" allow="autoplay; fullscreen" allowfullscreen></iframe></div><p class="video-note">Whiteboard lesson · English</p><p class="video-fallback">If the player does not load, <a href="${VIDEO_URL}" target="_blank" rel="noopener">open the video directly</a>.</p></div><style>.summit-video-shell{margin-top:24px}.summit-video-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;background:#111;box-shadow:0 18px 50px rgba(0,0,0,.16)}.summit-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.video-fallback{margin-top:10px;font-size:.9rem;opacity:.75}.video-fallback a{text-decoration:underline}</style>`;

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
