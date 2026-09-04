(()=>{
  const SUPABASE_URL='https://ymnawoeifbdnmxrsiaxa.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY='sb_publishable_dkUGSA4UXU9GMbvMp5Z91w_CNcvmKw5';
  const LESSON_PAGE=/\/(explanation|problems|answers|test|video\/arabic|video\/english)\/?$/i;
  if(!LESSON_PAGE.test(location.pathname)) return;
  if(!window.supabase?.createClient) return;

  const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
  let activeType='issue';
  let currentUser=null;

  const style=document.createElement('style');
  style.textContent=`
    .summit-feedback-tools{position:fixed;right:16px;bottom:16px;z-index:9995;display:flex;flex-direction:column;gap:9px;align-items:flex-end;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    .summit-feedback-btn{border:1px solid rgba(20,36,61,.16);background:rgba(255,253,247,.96);color:#14243d;border-radius:999px;padding:10px 14px;box-shadow:0 10px 30px rgba(20,36,61,.14);font-weight:800;font-size:13px;display:flex;align-items:center;gap:8px;cursor:pointer;backdrop-filter:blur(12px)}
    .summit-feedback-btn .ico{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:#edf3ff;color:#2860dc;font-size:13px}
    .summit-feedback-btn.clarify .ico{background:#eef8f5;color:#1f8f80}
    .summit-feedback-modal{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(9,18,31,.58);backdrop-filter:blur(6px)}
    .summit-feedback-modal.open{display:flex}
    .summit-feedback-card{width:min(560px,100%);max-height:88vh;overflow:auto;background:#fffdf8;color:#14243d;border-radius:24px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.28)}
    .summit-feedback-card h3{margin:0 0 6px;font:800 28px/1.1 Georgia,serif}.summit-feedback-card p{margin:0 0 18px;color:#697386;line-height:1.55}
    .summit-feedback-close{float:right;border:0;background:#f2efe7;width:38px;height:38px;border-radius:12px;font-size:22px;cursor:pointer}
    .summit-feedback-card label{display:grid;gap:7px;font-weight:800;margin:14px 0}.summit-feedback-card textarea{width:100%;min-height:120px;box-sizing:border-box;border:1px solid #d9d6cc;border-radius:14px;padding:13px;font:inherit;resize:vertical;background:#fff}
    .summit-feedback-meta{display:grid;gap:6px;background:#f6f4ee;border-radius:14px;padding:12px;font-size:12px;color:#657083;word-break:break-word}.summit-feedback-meta b{color:#14243d}
    .summit-feedback-check{display:flex!important;grid-template-columns:none!important;align-items:flex-start;gap:9px!important;font-weight:600!important;color:#526071}.summit-feedback-check input{margin-top:3px}
    .summit-feedback-submit{width:100%;border:0;border-radius:14px;padding:14px 16px;background:#2860dc;color:#fff;font-weight:900;font-size:15px;cursor:pointer}.summit-feedback-submit:disabled{opacity:.55;cursor:wait}
    .summit-feedback-status{min-height:20px;margin-top:10px;font-size:13px;font-weight:700}.summit-feedback-status.ok{color:#14785f}.summit-feedback-status.err{color:#b42318}
    @media(max-width:640px){.summit-feedback-tools{right:10px;bottom:10px}.summit-feedback-btn{padding:9px 11px;font-size:12px}.summit-feedback-card{border-radius:20px;padding:20px}}
  `;
  document.head.appendChild(style);

  const tools=document.createElement('div');
  tools.className='summit-feedback-tools';
  tools.innerHTML=`
    <button class="summit-feedback-btn clarify" type="button" data-feedback="clarification"><span class="ico">✦</span><span>Explain this better</span></button>
    <button class="summit-feedback-btn" type="button" data-feedback="issue"><span class="ico">⚑</span><span>Report an issue</span></button>`;
  document.body.appendChild(tools);

  const modal=document.createElement('div');
  modal.className='summit-feedback-modal';
  modal.innerHTML=`<section class="summit-feedback-card" role="dialog" aria-modal="true">
    <button class="summit-feedback-close" type="button" aria-label="Close">×</button>
    <div class="summit-feedback-kicker"></div>
    <h3 class="summit-feedback-title"></h3>
    <p class="summit-feedback-subtitle"></p>
    <label><span class="summit-feedback-label"></span><textarea id="summitFeedbackText" maxlength="2000" placeholder="Tell us what happened or what you want explained more clearly..."></textarea></label>
    <label class="summit-feedback-check"><input id="summitFeedbackScreenshot" type="checkbox" checked><span>Include a screenshot of what I can currently see on this page</span></label>
    <div class="summit-feedback-meta" id="summitFeedbackMeta"></div>
    <button class="summit-feedback-submit" id="summitFeedbackSubmit" type="button">Send</button>
    <div class="summit-feedback-status" id="summitFeedbackStatus"></div>
  </section>`;
  document.body.appendChild(modal);

  const $=s=>modal.querySelector(s);
  const close=()=>{modal.classList.remove('open');document.body.style.overflow=''};
  $('.summit-feedback-close').onclick=close;
  modal.addEventListener('click',e=>{if(e.target===modal)close()});

  function pageKind(){const p=location.pathname.toLowerCase();if(p.includes('/problems/'))return'Practice';if(p.includes('/answers/'))return'Answers';if(p.includes('/test/'))return'Test';if(p.includes('/video/'))return'Video';return'Explanation'}
  function lessonPath(){return location.pathname.replace(/\/(explanation|problems|answers|test|video\/arabic|video\/english)\/?$/i,'/').replace(/^\/sum-mit-sat-math/,'')}
  function lessonName(){const h=document.querySelector('h1,.lesson-title,[data-lesson-title]');return h?.textContent?.trim()||document.title.split('—')[0].trim()||'Lesson'}

  async function getUser(){
    if(currentUser) return currentUser;
    const {data}=await client.auth.getUser();
    currentUser=data?.user||null;
    return currentUser;
  }

  async function loadHtml2Canvas(){
    if(window.html2canvas)return window.html2canvas;
    await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
    return window.html2canvas;
  }

  async function captureViewport(){
    const h2c=await loadHtml2Canvas();
    tools.style.display='none';modal.style.visibility='hidden';
    try{
      const canvas=await h2c(document.body,{useCORS:true,allowTaint:false,backgroundColor:getComputedStyle(document.body).backgroundColor||'#ffffff',x:window.scrollX,y:window.scrollY,width:window.innerWidth,height:window.innerHeight,scrollX:-window.scrollX,scrollY:-window.scrollY,windowWidth:document.documentElement.clientWidth,windowHeight:document.documentElement.clientHeight,scale:Math.min(1.5,window.devicePixelRatio||1)});
      return await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.78));
    }finally{tools.style.display='';modal.style.visibility=''}
  }

  function open(type){
    activeType=type;
    const isIssue=type==='issue';
    $('.summit-feedback-kicker').textContent=isIssue?'REPORT':'CLARIFICATION REQUEST';
    $('.summit-feedback-title').textContent=isIssue?'Something wrong here?':'Want a clearer explanation?';
    $('.summit-feedback-subtitle').textContent=isIssue?'Tell us what looks wrong. We will capture the lesson, page, device details, and—if you allow it—a screenshot.':'Tell us what part needs more detail so we can improve this exact lesson.';
    $('.summit-feedback-label').textContent=isIssue?'What is wrong?':'What should be explained more clearly?';
    $('#summitFeedbackText').value='';$('#summitFeedbackStatus').textContent='';$('#summitFeedbackStatus').className='summit-feedback-status';
    $('#summitFeedbackMeta').innerHTML=`<div><b>Lesson:</b> ${lessonName()}</div><div><b>Page:</b> ${pageKind()}</div><div><b>Location:</b> ${location.pathname}</div><div><b>Screen:</b> ${window.innerWidth}×${window.innerHeight}</div>`;
    modal.classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>$('#summitFeedbackText').focus(),80);
  }

  tools.querySelectorAll('[data-feedback]').forEach(b=>b.onclick=()=>open(b.dataset.feedback));

  $('#summitFeedbackSubmit').onclick=async()=>{
    const btn=$('#summitFeedbackSubmit'),status=$('#summitFeedbackStatus'),message=$('#summitFeedbackText').value.trim();
    const user=await getUser();
    if(!user){status.textContent='Please sign in before sending feedback so we can link it to your account.';status.className='summit-feedback-status err';return}
    if(!message){status.textContent='Please add a short note first.';status.className='summit-feedback-status err';return}
    btn.disabled=true;btn.textContent='Sending…';status.textContent='';
    try{
      let screenshot_path=null;
      if($('#summitFeedbackScreenshot').checked){
        try{
          const blob=await captureViewport();
          if(blob){
            screenshot_path=`${user.id}/${Date.now()}-${activeType}.jpg`;
            const {error:uploadError}=await client.storage.from('lesson-feedback').upload(screenshot_path,blob,{contentType:'image/jpeg',upsert:false});
            if(uploadError) screenshot_path=null;
          }
        }catch(_){screenshot_path=null}
      }
      const payload={user_id:user.id,report_type:activeType,lesson_path:lessonPath(),page_url:location.href,page_title:document.title,message,screenshot_path,user_email:user.email||null,user_agent:navigator.userAgent,viewport:`${window.innerWidth}x${window.innerHeight}@${window.devicePixelRatio||1}`};
      const {error}=await client.from('lesson_feedback_reports').insert(payload);
      if(error)throw error;
      status.textContent=activeType==='issue'?'Report sent. Thank you.':'Request sent. We will use it to improve this lesson.';
      status.className='summit-feedback-status ok';
      setTimeout(close,1100);
    }catch(error){status.textContent=error?.message||'Could not send this report. Please try again.';status.className='summit-feedback-status err'}
    finally{btn.disabled=false;btn.textContent='Send'}
  };
})();