(()=>{
  const originalCreateClient=window.supabase?.createClient;
  if(!originalCreateClient)return;

  const originalFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{
    if(typeof input==='string' && input.startsWith('/') && location.hostname.endsWith('github.io')){
      const projectBase='/sum-mit-sat-math/';
      if(!input.startsWith(projectBase)) input=projectBase+input.replace(/^\//,'');
    }
    return originalFetch(input,init);
  };

  const TIMEOUT_MS=10000;
  const safeAuth=async(promise,label)=>{
    try{
      return await Promise.race([
        Promise.resolve(promise),
        new Promise(resolve=>setTimeout(()=>resolve({data:{session:null,user:null},error:new Error(`${label} timed out. Please check your connection and try again.`)}),TIMEOUT_MS))
      ]);
    }catch(error){
      return {data:{session:null,user:null},error:error instanceof Error?error:new Error(`${label} failed. Please try again.`)};
    }
  };

  const returnUrl=()=>location.hostname.endsWith('github.io')?`${location.origin}/sum-mit-sat-math/`:`${location.origin}/`;

  function showRecoveryPanel(client){
    const card=document.querySelector('.auth-card');
    if(!card || document.querySelector('#passwordRecoveryPanel')) return;
    const panel=document.createElement('div');
    panel.id='passwordRecoveryPanel';
    panel.style.cssText='position:absolute;inset:0;z-index:20;background:var(--surface,#fff);padding:28px;display:flex;flex-direction:column;justify-content:center;gap:14px;border-radius:inherit';
    panel.innerHTML=`<div class="auth-kicker">RESET PASSWORD</div><h2 style="margin:0">Choose a new password.</h2><p style="margin:0;color:var(--muted)">Enter a new password for your SUMMIT account.</p><label style="display:grid;gap:7px;font-weight:700">New password<input id="newRecoveryPassword" type="password" minlength="8" autocomplete="new-password" placeholder="At least 8 characters" style="width:100%;box-sizing:border-box;padding:14px;border-radius:12px;border:1px solid var(--line,#ddd)"></label><div class="auth-message" id="recoveryMessage" aria-live="polite"></div><button type="button" class="auth-submit" id="saveRecoveryPassword">Save new password</button>`;
    card.style.position='relative';
    card.appendChild(panel);
    panel.querySelector('#saveRecoveryPassword').addEventListener('click',async()=>{
      const password=panel.querySelector('#newRecoveryPassword').value;
      const msg=panel.querySelector('#recoveryMessage');
      const btn=panel.querySelector('#saveRecoveryPassword');
      if(password.length<8){msg.textContent='Password must be at least 8 characters.';msg.className='auth-message error';return;}
      btn.disabled=true;btn.textContent='Saving…';
      const {error}=await safeAuth(client.auth.updateUser({password}),'Password update');
      btn.disabled=false;btn.textContent='Save new password';
      if(error){msg.textContent=error.message;msg.className='auth-message error';return;}
      msg.textContent='Password updated. You are signed in.';msg.className='auth-message success';
      setTimeout(()=>panel.remove(),900);
    });
  }

  window.supabase.createClient=function(...args){
    const client=originalCreateClient.apply(this,args);
    const signIn=client.auth.signInWithPassword.bind(client.auth);
    const signUp=client.auth.signUp.bind(client.auth);
    const resend=client.auth.resend?.bind(client.auth);
    const reset=client.auth.resetPasswordForEmail?.bind(client.auth);

    client.auth.signInWithPassword=payload=>safeAuth(signIn(payload),'Sign in');
    client.auth.signUp=async payload=>{
      const result=await safeAuth(signUp(payload),'Sign up');
      if(result?.error){
        const m=String(result.error.message||'').toLowerCase();
        if(m.includes('rate limit')||m.includes('email rate')) result.error.message='Email delivery is temporarily busy. Please do not keep retrying. Try again later or use sign in if this account already exists.';
      }
      return result;
    };
    if(resend){
      client.auth.resend=async payload=>{
        const result=await safeAuth(resend(payload),'Resend confirmation');
        if(result?.error){
          const m=String(result.error.message||'').toLowerCase();
          if(m.includes('rate limit')||m.includes('email rate')) result.error.message='Email delivery is temporarily busy. Please try again later.';
        }
        return result;
      };
    }
    if(reset) client.auth.resetPasswordForEmail=payload=>safeAuth(reset(payload),'Password reset');

    client.auth.onAuthStateChange((event)=>{
      if(event==='PASSWORD_RECOVERY') setTimeout(()=>showRecoveryPanel(client),0);
    });

    window.__summitSupabaseClient=client;
    return client;
  };

  window.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('#signinForm,#signupForm').forEach(form=>{
      form.addEventListener('submit',()=>{
        const button=form.querySelector('.auth-submit');
        if(!button)return;
        const fallback=setTimeout(()=>{
          if(!button.disabled)return;
          button.disabled=false;
          button.textContent=button.dataset.label|| (form.id==='signinForm'?'Sign in to SUMMIT':'Create my account');
          const box=document.querySelector(form.id==='signinForm'?'#signinMessage':'#signupMessage');
          if(box && !box.textContent){box.textContent='The request took too long. Please try again.';box.className='auth-message error';}
        },TIMEOUT_MS+1500);
        form.addEventListener('reset',()=>clearTimeout(fallback),{once:true});
      },true);
    });

    const signinForm=document.querySelector('#signinForm');
    const signinMessage=document.querySelector('#signinMessage');
    if(signinForm && !document.querySelector('#forgotPassword')){
      const row=document.createElement('p');
      row.className='auth-switch';
      row.style.marginTop='-4px';
      row.innerHTML='<button type="button" id="forgotPassword">Forgot password?</button>';
      const submit=signinForm.querySelector('.auth-submit');
      signinForm.insertBefore(row,submit);
      row.querySelector('button').addEventListener('click',async()=>{
        const email=document.querySelector('#signinEmail')?.value.trim();
        if(!email){signinMessage.textContent='Enter your email first.';signinMessage.className='auth-message error';return;}
        const client=window.__summitSupabaseClient;
        if(!client?.auth?.resetPasswordForEmail){signinMessage.textContent='Password reset is not available right now.';signinMessage.className='auth-message error';return;}
        const button=row.querySelector('button');
        button.disabled=true;button.textContent='Sending reset link…';
        const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:returnUrl()});
        button.disabled=false;button.textContent='Forgot password?';
        if(error){signinMessage.textContent=error.message;signinMessage.className='auth-message error';}
        else{signinMessage.textContent='Password reset email sent. Open the newest email and choose a new password.';signinMessage.className='auth-message success';}
      });
    }

    const signupForm=document.querySelector('#signupForm');
    const signupMessage=document.querySelector('#signupMessage');
    if(signupForm && !document.querySelector('#resendConfirmation')){
      const p=document.createElement('p');
      p.className='auth-switch';
      p.innerHTML='Already created an account but did not get a working email? <button type="button" id="resendConfirmation">Resend confirmation</button>';
      signupForm.appendChild(p);
      p.querySelector('button').addEventListener('click',async()=>{
        const email=document.querySelector('#signupEmail')?.value.trim();
        if(!email){signupMessage.textContent='Enter your email first.';signupMessage.className='auth-message error';return;}
        const client=window.__summitSupabaseClient;
        if(!client?.auth?.resend){signupMessage.textContent='Resend is not available right now.';signupMessage.className='auth-message error';return;}
        const button=p.querySelector('button');
        button.disabled=true;button.textContent='Sending…';
        const {error}=await client.auth.resend({type:'signup',email,options:{emailRedirectTo:returnUrl()}});
        button.disabled=false;button.textContent='Resend confirmation';
        if(error){signupMessage.textContent=error.message;signupMessage.className='auth-message error';}
        else{signupMessage.textContent='Confirmation email sent. Use the newest email only.';signupMessage.className='auth-message success';}
      });
    }
  });
})();
