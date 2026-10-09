const fs=require('fs'),path=require('path');
const {sec,write}=require('./lesson130-shell');
const body=sec('FULL LESSON VIDEO','<h2>Full narrated lesson · eight scenes</h2><p>Press Play for the complete English lesson narration, not a short-form cut.</p><div style="min-height:210px;padding:2rem;border:1px solid #bac4d5"><h3 id="scene-title"></h3><p id="scene-body"></p></div><button id="play-video">▶ Play full lesson</button> <button id="stop-video">■ Stop</button>')+'<script src="/assets/lesson130-video-client.js"></script>';
write('video/english',body);write('video/arabic',body);
const src=path.join(__dirname,'lesson130-video-client.js'),dst=path.join(__dirname,'dist/assets/lesson130-video-client.js');
fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);