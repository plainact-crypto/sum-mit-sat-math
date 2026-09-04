(()=>{
  const originalCreateClient=window.supabase?.createClient;
  if(!originalCreateClient)return;

  // GitHub project pages live below /sum-mit-sat-math/. Keep legacy root
  // requests inside the project instead of accidentally hitting the user-site root.
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

  window.supabase.createClient=function(...args){
    const client=originalCreateClient.apply(this,args);
    const signIn=client.auth.signInWithPassword.bind(client.auth);
    const signUp=client.auth.signUp.bind(client.auth);
    const resend=client.auth.resend?.bind(client.auth);

    client.auth.signInWithPassword=payload=>safeAuth(signIn(payload),'Sign in');
    client.auth.signUp=async payload=>{
      const result=await safeAuth(signUp(payload),'Sign up');
      if(result?.error){
        const m=String(result.error.message||'').toLowerCase();
        if(m.includes('rate limit')||m.includes('email rate')){
          result.error.message='Email delivery is temporarily busy. Please do not keep retrying. Try again later or use sign in if this account already exists.';
        }
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
    window.__summitSupabaseClient=client;
    return client;
  };

  // Absolute last-resort UI guard: no auth button is allowed to remain spinning forever.
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
          if(box && !box.textContent){
            box.textContent='The request took too long. Please try again.';
            box.className='auth-message error';
          }
        },TIMEOUT_MS+1500);
        form.addEventListener('reset',()=>clearTimeout(fallback),{once:true});
      },true);
    });

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
        const {error}=await client.auth.resend({type:'signup',email,options:{emailRedirectTo:location.hostname.endsWith('github.io')?`${location.origin}/sum-mit-sat-math/`:`${location.origin}/`}});
        button.disabled=false;button.textContent='Resend confirmation';
        if(error){signupMessage.textContent=error.message;signupMessage.className='auth-message error';}
        else{signupMessage.textContent='Confirmation email sent. Use the newest email only.';signupMessage.className='auth-message success';}
      });
    }
  });
})();
