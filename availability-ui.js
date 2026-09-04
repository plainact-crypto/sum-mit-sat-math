(()=>{
  const basePrefix=location.hostname.endsWith('github.io')?'/sum-mit-sat-math':'';
  let map=new Map();
  const style=document.createElement('style');
  style.textContent=`
    .lesson-content-status{display:flex;align-items:center;gap:7px;margin:10px 0 4px;padding:9px 11px;border-radius:12px;font-size:12px;font-weight:800;line-height:1.25;border:1px solid var(--line,#d8dee8);background:var(--card,#fff);color:var(--muted,#617083)}
    .lesson-content-status.ready{color:#147a46;border-color:rgba(20,122,70,.25);background:rgba(20,122,70,.08)}
    .lesson-content-status.scheduled{color:#805b12;border-color:rgba(128,91,18,.24);background:rgba(199,150,42,.10)}
    .lesson-content-status .dot{width:8px;height:8px;border-radius:50%;background:currentColor;display:inline-block;flex:0 0 auto}
    .lesson-content-status b{font-weight:900}
    .lesson-content-status small{font-size:11px;font-weight:700;opacity:.78;margin-left:auto}
    @media(max-width:700px){.lesson-content-status{width:100%;box-sizing:border-box;margin-top:10px}.lesson-content-status small{display:none}}
  `;
  document.head.appendChild(style);

  function normalizePath(value){
    let s=String(value||'');
    try{s=new URL(s,location.href).pathname}catch{}
    if(basePrefix&&s.startsWith(basePrefix))s=s.slice(basePrefix.length)||'/';
    s=s.replace(/\/(explanation|problems|answers|test)\/?$/,'/');
    s=s.replace(/\/video\/(arabic|english)\/?$/,'/');
    s=s.replace(/\/+/g,'/');
    if(!s.startsWith('/'))s='/'+s;
    if(!s.endsWith('/'))s+='/';
    return s;
  }

  function formatDate(iso){
    if(!iso)return 'Scheduled';
    const d=new Date(iso);
    const date=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',month:'short',day:'numeric'}).format(d);
    const time=new Intl.DateTimeFormat('en',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);
    return `${date} · ${time}`;
  }

  function findRecord(leaf){
    const links=[...leaf.querySelectorAll('.leaf-actions a[href]')];
    for(const a of links){
      const rec=map.get(normalizePath(a.getAttribute('href')));
      if(rec)return rec;
    }
    return null;
  }

  function decorate(){
    document.querySelectorAll('.progress-leaf').forEach(leaf=>{
      if(leaf.dataset.availabilityDecorated==='1')return;
      const rec=findRecord(leaf);
      if(!rec)return;
      const cls=rec.complete?'ready':'scheduled';
      const text=rec.complete?'Content 100% ready':'Content still being completed';
      const meta=rec.complete?'Open any lesson item':`Completes ${formatDate(rec.scheduledComplete)}`;
      const badge=document.createElement('div');
      badge.className='lesson-content-status '+cls;
      badge.innerHTML=`<span class="dot"></span><b>${text}</b><small>${meta}</small>`;
      const actions=leaf.querySelector('.leaf-actions');
      if(actions)actions.parentNode.insertBefore(badge,actions);
      else leaf.appendChild(badge);
      leaf.dataset.availabilityDecorated='1';
    });
  }

  fetch(basePrefix+'/lesson-availability.json?v='+Date.now(),{cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(new Error('availability failed '+r.status)))
    .then(rows=>{
      map=new Map(rows.map(r=>[normalizePath(r.base),r]));
      decorate();
      setTimeout(decorate,500);
      setTimeout(decorate,1500);
    })
    .catch(err=>console.error('SUMMIT lesson availability:',err));
})();
