(()=>{
  const originalCreateClient=window.supabase?.createClient;
  if(!originalCreateClient)return;
  const TIMEOUT_MS=12000;
  const withTimeout=(promise,label)=>Promise.race([
    promise,
    new Promise(resolve=>setTimeout(()=>resolve({data:{session:null,user:null},error:new Error(`${label} timed out. Check your connection and try again.`)}),TIMEOUT_MS))
  ]);
  window.supabase.createClient=function(...args){
    const client=originalCreateClient.apply(this,args);
    const signIn=client.auth.signInWithPassword.bind(client.auth);
    const signUp=client.auth.signUp.bind(client.auth);
    const resend=client.auth.resend?.bind(client.auth);
    client.auth.signInWithPassword=payload=>withTimeout(signIn(payload),'Sign in');
    client.auth.signUp=async payload=>{
      const result=await withTimeout(signUp(payload),'Sign up');
      if(result?.error){
        const m=String(result.error.message||'').toLowerCase();
        if(m.includes('rate limit')||m.includes('email rate')){
          result.error.message='Too many confirmation emails were requested. Please wait a little before trying again. Your details are safe.';
        }
      }
      return result;
    };
    if(resend){
      client.auth.resend=async payload=>{
        const result=await withTimeout(resend(payload),'Resend confirmation');
        if(result?.error){
          const m=String(result.error.message||'').toLowerCase();
          if(m.includes('rate limit')||m.includes('email rate')) result.error.message='Email sending is temporarily rate-limited. Please wait a little, then try once.';
        }
        return result;
      };
    }
    window.__summitSupabaseClient=client;
    return client;
  };

  window.addEventListener('DOMContentLoaded',()=>{
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
        p.querySelector('button').disabled=true;
        p.querySelector('button').textContent='Sending…';
        const {error}=await client.auth.resend({type:'signup',email,options:{emailRedirectTo:location.hostname.endsWith('github.io')?`${location.origin}/sum-mit-sat-math/`:`${location.origin}/`}});
        p.querySelector('button').disabled=false;
        p.querySelector('button').textContent='Resend confirmation';
        if(error){signupMessage.textContent=error.message;signupMessage.className='auth-message error';}
        else{signupMessage.textContent='Confirmation email sent. Use the newest email only.';signupMessage.className='auth-message success';}
      });
    }
  });
})();
