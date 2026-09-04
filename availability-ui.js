(()=>{
  const basePrefix=location.hostname.endsWith('github.io')?'/sum-mit-sat-math':'';
  let map=new Map();
  const style=document.createElement('style');
  style.textContent=`
    .content-readiness{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;font-size:12px;font-weight:800;line-height:1;white-space:nowrap;border:1px solid var(--line,#d8dee8);background:var(--card,#fff);color:var(--muted,#617083)}
    .content-readiness.ready{color:#147a46;border-color:rgba(20,122,70,.25);background:rgba(20,122,70,.08)}
    .content-readiness.scheduled{color:#805b12;border-color:rgba(128,91,18,.24);background:rgba(199,150,42,.10)}
    .content-readiness .dot{width:7px;height:7px;border-radius:50%;background:currentColor;display:inline-block}
    @media(max-width:700px){.content-readiness{width:100%;justify-content:center;margin-top:2px}}
  `;
  document.head.appendChild(style);
  function clean(s){return (s||'').replace(location.origin,'').replace(basePrefix,'').replace(/\/explanation\/?$/,'/').replace(/\/+/g,'/');}
  function formatDate(iso){
    if(!iso)return 'Scheduled';
    const d=new Date(iso);
    const date=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',month:'short',day:'numeric'}).format(d);
    const time=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);
    return `Completes ${date} · ${time}`;
  }
  function decorate(){
    document.querySelectorAll('.progress-leaf').forEach(leaf=>{
      if(leaf.dataset.readinessDone==='1')return;
      const a=leaf.querySelector('.leaf-actions a[href*="/explanation/"]');
      if(!a)return;
      const rec=map.get(clean(a.getAttribute('href')));
      if(!rec)return;
      const badge=document.createElement('span');
      badge.className='content-readiness '+(rec.complete?'ready':'scheduled');
      badge.innerHTML=`<span class="dot"></span><span>${rec.complete?'Content 100% ready':formatDate(rec.scheduledComplete)}</span>`;
      leaf.querySelector('.leaf-actions')?.appendChild(badge);
      leaf.dataset.readinessDone='1';
    });
  }
  fetch(basePrefix+'/lesson-availability.json',{cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(new Error('availability failed')))
    .then(rows=>{map=new Map(rows.map(r=>[clean(r.base),r]));decorate();new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});})
    .catch(console.error);
})();
