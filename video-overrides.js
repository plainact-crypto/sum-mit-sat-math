const fs=require('fs');
const path=require('path');

const dist=path.join(__dirname,'dist');
const lesson='Solving One-Step Linear Equations';
const marker='Video Explanation · English';
const oldBody='<div class="soon">VIDEO PAGE</div><p class="video-note">This is a separate independent video route for this lesson. Video content can be added here without changing Explanation, Problems, or Answers.</p>';

const tracks=[
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/456b66d3-864a-4cc4-8571-695f43ef8147.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/353e6da9-e718-4126-891b-3be795bc0eca.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/1e75e135-209c-41dd-8725-564fc70b91bf.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/4d151e22-0931-4eea-8cf8-8b3509c7f6a0.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/c9c03961-6998-4966-b5c7-d53aec888e0f.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/24a68866-ed3f-4413-afca-caea3cbf9d60.mp3',
'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/1b64a0d4-425d-48e3-9b39-33e636fd9cb4.mp3'
];

const scenes=[
['ONE-STEP EQUATIONS','Get the variable by itself','x + a = b','Use the inverse operation on BOTH sides'],
['ADDITION','x + 7 = 19','x + 7 − 7 = 19 − 7','x = 12'],
['SUBTRACTION & MULTIPLICATION','x − 13 = −5','x = 8','4x = 28  →  x = 7'],
['DIVISION','x / 6 = 9','6(x / 6) = 6(9)','x = 54'],
['WORD PROBLEM','Original price − discount = final price','x − 7 = 18','x = 25'],
['COMMON MISTAKES','Keep both sides balanced','Use the inverse operation','Protect negative signs'],
['QUICK CHECK','x + 9 = 17  →  x = 8','7x = 49  →  x = 7','−3x = 24  →  x = −8']
];

const newBody=`<div class="summit-video-shell">
  <div class="summit-native-player" id="summitNativeLesson">
    <div class="summit-board" aria-live="polite">
      <div class="summit-board-kicker" id="svKicker"></div>
      <div class="summit-board-main" id="svMain"></div>
      <div class="summit-board-step" id="svStep"></div>
      <div class="summit-board-answer" id="svAnswer"></div>
      <div class="summit-marker-line"></div>
    </div>
    <div class="summit-controls">
      <button id="svPlay" type="button" class="summit-play-btn">▶ <span>Play lesson</span></button>
      <div class="summit-progress"><span id="svProgress"></span></div>
      <span class="summit-counter" id="svCounter">1 / ${tracks.length}</span>
      <button id="svFullscreen" type="button" class="summit-fullscreen-btn" aria-label="Fullscreen">⛶</button>
    </div>
    <audio id="svAudio" preload="metadata"></audio>
  </div>
  <p class="video-note">English · Handwritten whiteboard explanation · Narrated</p>
</div>
<style>
.summit-video-shell{margin:22px 0 8px}.summit-native-player{width:100%;border-radius:22px;overflow:hidden;background:#0f172a;box-shadow:0 18px 45px rgba(20,36,61,.16)}
.summit-board{position:relative;aspect-ratio:16/9;box-sizing:border-box;padding:clamp(18px,4vw,40px);background:linear-gradient(160deg,#fffef9,#eef3f5);overflow:hidden;text-align:left}
.summit-board:after{content:"";position:absolute;inset:auto -20% 10% -20%;height:28%;background:rgba(44,111,209,.045);transform:rotate(-4deg)}
.summit-board-kicker{position:relative;z-index:2;font:900 clamp(11px,2vw,15px)/1.2 Inter,system-ui,sans-serif;letter-spacing:.18em;color:#2860dc;margin-bottom:clamp(12px,2vw,22px)}
.summit-board-main,.summit-board-step,.summit-board-answer{position:relative;z-index:2;font-family:Georgia,serif;color:#14243d;animation:svWrite .45s ease both}
.summit-board-main{font-size:clamp(26px,6vw,58px);line-height:1.06}.summit-board-step{font-size:clamp(17px,4vw,34px);color:#2c6fd1;margin-top:clamp(14px,2.5vw,24px)}
.summit-board-answer{display:inline-block;font-size:clamp(22px,5.4vw,50px);margin-top:clamp(14px,2.5vw,24px);padding:2px 12px 5px;color:#14243d}
.summit-marker-line{position:absolute;left:8%;right:8%;bottom:10%;height:4px;border-radius:999px;background:#d6453d;transform:rotate(-1.5deg);opacity:.7}
.summit-controls{display:flex;align-items:center;gap:12px;padding:13px 14px;background:#111827;color:#fff}.summit-play-btn,.summit-fullscreen-btn{border:0;background:#fff;color:#14243d;font-weight:900;cursor:pointer}.summit-play-btn{border-radius:999px;padding:10px 15px;display:flex;align-items:center;gap:7px;white-space:nowrap}.summit-fullscreen-btn{width:42px;height:42px;border-radius:12px;font-size:22px;display:grid;place-items:center;flex:0 0 auto}
.summit-progress{height:7px;flex:1;background:rgba(255,255,255,.18);border-radius:99px;overflow:hidden}.summit-progress span{display:block;height:100%;width:0;background:#fff;transition:width .2s linear}.summit-counter{font:700 12px/1 Inter,system-ui,sans-serif;opacity:.8;min-width:36px;text-align:right}
.video-note{text-align:center;margin:14px 0 0;color:#697386;font-size:.95rem}@keyframes svWrite{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.summit-native-player:fullscreen,.summit-native-player:-webkit-full-screen{width:100vw;height:100vh;border-radius:0;display:flex;flex-direction:column;background:#0f172a}.summit-native-player:fullscreen .summit-board,.summit-native-player:-webkit-full-screen .summit-board{flex:1;aspect-ratio:auto;display:flex;flex-direction:column;justify-content:center;padding:clamp(28px,6vw,80px)}.summit-native-player:fullscreen .summit-board-main,.summit-native-player:-webkit-full-screen .summit-board-main{font-size:clamp(42px,7vw,96px)}.summit-native-player:fullscreen .summit-board-step,.summit-native-player:-webkit-full-screen .summit-board-step{font-size:clamp(28px,4.8vw,62px)}.summit-native-player:fullscreen .summit-board-answer,.summit-native-player:-webkit-full-screen .summit-board-answer{font-size:clamp(34px,6vw,76px)}
@media(max-width:640px){.summit-video-shell{margin-top:16px}.summit-native-player{border-radius:18px}.summit-board{padding:18px}.summit-controls{gap:8px;padding:10px}.summit-play-btn{padding:9px 12px;font-size:12px}.summit-play-btn span{display:none}.summit-counter{font-size:11px}.summit-fullscreen-btn{width:38px;height:38px;font-size:20px}}
</style>
<script>(()=>{
const tracks=${JSON.stringify(tracks)};
const scenes=${JSON.stringify(scenes)};
const player=document.getElementById('summitNativeLesson'),audio=document.getElementById('svAudio'),play=document.getElementById('svPlay'),full=document.getElementById('svFullscreen'),bar=document.getElementById('svProgress'),counter=document.getElementById('svCounter');
const k=document.getElementById('svKicker'),m=document.getElementById('svMain'),s=document.getElementById('svStep'),a=document.getElementById('svAnswer');
let i=0,playing=false;
function draw(){const x=scenes[i];k.textContent=x[0];m.textContent=x[1];s.textContent=x[2];a.textContent=x[3];counter.textContent=(i+1)+' / '+tracks.length;[k,m,s,a].forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation=''})}
function load(){audio.src=tracks[i];bar.style.width='0%';draw()}
function setPlay(v){playing=v;play.innerHTML=v?'❚❚ <span>Pause</span>':'▶ <span>Play lesson</span>'}
function isFull(){return document.fullscreenElement===player||document.webkitFullscreenElement===player}
async function enterFull(){try{if(player.requestFullscreen)await player.requestFullscreen();else if(player.webkitRequestFullscreen)player.webkitRequestFullscreen();if(screen.orientation&&screen.orientation.lock){try{await screen.orientation.lock('landscape')}catch(_){}}}catch(_){}}
async function exitFull(){try{if(document.exitFullscreen)await document.exitFullscreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen()}catch(_){}}
full.addEventListener('click',()=>{if(isFull())exitFull();else enterFull()});
function syncFullIcon(){full.textContent=isFull()?'⤢':'⛶';full.setAttribute('aria-label',isFull()?'Exit fullscreen':'Fullscreen')}
document.addEventListener('fullscreenchange',syncFullIcon);document.addEventListener('webkitfullscreenchange',syncFullIcon);
play.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>setPlay(true)).catch(()=>setPlay(false))}else{audio.pause();setPlay(false)}});
audio.addEventListener('timeupdate',()=>{if(audio.duration)bar.style.width=((audio.currentTime/audio.duration)*100)+'%'});
audio.addEventListener('ended',()=>{if(i<tracks.length-1){i++;load();audio.play().then(()=>setPlay(true))}else{setPlay(false);bar.style.width='100%'}});
audio.addEventListener('pause',()=>{if(!audio.ended)setPlay(false)});audio.addEventListener('play',()=>setPlay(true));
load();
})();</script>`;

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
console.log(`Embedded native narrated SUMMIT lesson at ${path.relative(dist,file)}`);
