(()=>{
  const SUPABASE_URL='https://ymnawoeifbdnmxrsiaxa.supabase.co';
  const SUPABASE_KEY='sb_publishable_dkUGSA4UXU9GMbvMp5Z91w_CNcvmKw5';
  const qs=new URLSearchParams(location.search);
  const acquisition={
    source:qs.get('utm_source')||localStorage.getItem('summit_utm_source')||'',
    medium:qs.get('utm_medium')||localStorage.getItem('summit_utm_medium')||'',
    campaign:qs.get('utm_campaign')||localStorage.getItem('summit_utm_campaign')||'',
    ref:qs.get('ref')||localStorage.getItem('summit_ref')||''
  };
  for(const [k,v] of Object.entries(acquisition)) if(v) localStorage.setItem(`summit_${k==='ref'?'ref':'utm_'+k}`,v);

  function mount(){
    if(document.getElementById('foundingBeta')) return;
    const target=document.querySelector('.promo-strip');
    if(!target) return;
    const section=document.createElement('section');
    section.id='foundingBeta'; section.className='founding-beta';
    section.innerHTML=`<div class="beta-shell"><div class="beta-copy"><span class="beta-kicker">FOUNDING BETA · FIRST 50 LEARNERS</span><h2>Help shape SUMMIT while everything is open.</h2><p>The first 50 learners get full beta access to every lesson, practice set, lesson test and new release at no cost during the beta.</p><div class="beta-points"><span>No card</span><span>Full beta access</span><span>New releases included</span></div><div class="beta-actions"><button type="button" class="beta-primary" data-beta-signup>Join the first 50</button><a href="#subjects">See what’s inside</a></div><div class="beta-meter"><div class="beta-meter-top"><strong id="betaClaimed">—</strong><span id="betaRemaining">Checking spots…</span></div><div class="beta-track"><i id="betaFill"></i></div></div></div><aside class="beta-referral"><span class="beta-ref-kicker">FOUNDING LEARNER BONUS</span><h3>Bring 2 friends. Unlock real exam simulations.</h3><p>Share your personal invite link. When two friends create accounts, Exam Simulation Beta unlocks automatically on your account.</p><div id="betaReferralState" class="beta-ref-state">Create your account to get your invite link.</div></aside></div>`;
    target.insertAdjacentElement('afterend',section);
    section.querySelector('[data-beta-signup]')?.addEventListener('click',()=>document.querySelector('[data-auth-open="signup"]')?.click());
  }

  async function client(){
    if(!window.supabase?.createClient) return null;
    if(!window.__summitGrowthClient) window.__summitGrowthClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
    return window.__summitGrowthClient;
  }

  async function refreshStats(){
    const c=await client(); if(!c) return;
    const {data}=await c.rpc('get_beta_stats'); const row=Array.isArray(data)?data[0]:data;
    if(!row) return;
    const claimed=Number(row.claimed||0), remaining=Number(row.remaining||0), capacity=Number(row.capacity||50);
    const claimedEl=document.getElementById('betaClaimed'), remEl=document.getElementById('betaRemaining'), fill=document.getElementById('betaFill'), btn=document.querySelector('[data-beta-signup]');
    if(claimedEl) claimedEl.textContent=`${Math.min(claimed,capacity)} / ${capacity} claimed`;
    if(remEl) remEl.textContent=remaining>0?`${remaining} founding spots left`:'Founding Beta full · Join the waitlist';
    if(fill) fill.style.width=`${Math.min(100,(claimed/capacity)*100)}%`;
    if(btn && remaining<=0) btn.textContent='Join the waitlist';
  }

  async function refreshUser(){
    const c=await client(); if(!c) return;
    const {data:{session}}=await c.auth.getSession(); if(!session?.user) return;
    if(acquisition.ref) await c.rpc('claim_referral',{code:acquisition.ref});
    await c.rpc('record_beta_acquisition',{p_source:acquisition.source||'direct',p_medium:acquisition.medium||'site',p_campaign:acquisition.campaign||'founding_beta',p_landing_path:location.pathname+location.search});
    const {data}=await c.rpc('get_my_referral_status'); const row=Array.isArray(data)?data[0]:data;
    if(!row) return;
    const state=document.getElementById('betaReferralState'); if(!state) return;
    const link=`${location.origin}${location.pathname}?ref=${encodeURIComponent(row.referral_code)}&utm_source=referral&utm_medium=invite&utm_campaign=founding_beta`;
    const count=Number(row.referral_count||0);
    state.innerHTML=`<div class="beta-ref-progress"><b>${count}/2 friends joined</b><span>${row.exam_sim_unlocked?'Exam Simulation Beta unlocked':'Invite '+Math.max(0,2-count)+' more to unlock'}</span></div><div class="beta-share"><input id="betaInviteLink" readonly value="${link.replace(/"/g,'&quot;')}"><button id="betaCopyInvite" type="button">Copy invite</button></div>${row.founding_beta?`<small>Founding learner #${row.beta_position}</small>`:'<small>Waitlist member</small>'}`;
    document.getElementById('betaCopyInvite')?.addEventListener('click',async e=>{await navigator.clipboard.writeText(link);e.currentTarget.textContent='Copied';setTimeout(()=>e.currentTarget.textContent='Copy invite',1200)});
  }

  document.addEventListener('DOMContentLoaded',async()=>{mount();await refreshStats();await refreshUser();const c=await client();c?.auth.onAuthStateChange(()=>setTimeout(()=>{refreshStats();refreshUser()},250));});
})();
