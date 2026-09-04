(()=>{
const SUPABASE_URL='https://ymnawoeifbdnmxrsiaxa.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_dkUGSA4UXU9GMbvMp5Z91w_CNcvmKw5';
if(!window.supabase?.createClient)return;
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const parts=location.pathname.split('/').filter(Boolean);
const projectIdx=parts[0]==='sum-mit-sat-math'?1:0;
const type=parts[parts.length-1]||'';
const valid=['explanation','problems','answers','test'];
if(!valid.includes(type))return;
const lessonParts=parts.slice(projectIdx,-1);
const lessonBase='/'+lessonParts.join('/')+'/';
const pageKey=type==='problems'?'practice':type;
const title=(document.querySelector('.lesson-title,.practice-head h1,h1')?.textContent||lessonParts.at(-1)||'Lesson').trim();
const subject=(document.querySelector('.subject-label,.crumb')?.textContent||lessonParts[0]||'Math').split('·')[0].trim();
let user=null;
async function save(fields){if(!user)return;const now=new Date().toISOString();const row={user_id:user.id,lesson_base:lessonBase,subject,lesson_title:title,last_activity:now,updated_at:now,...fields};await client.from('lesson_progress').upsert(row,{onConflict:'user_id,lesson_base'});}
async function start(){const {data:{session}}=await client.auth.getSession();user=session?.user||null;if(!user)return;await save({[`${pageKey}_viewed`]:true});
  if(pageKey==='explanation'||pageKey==='answers'){
    let done=false;const finish=()=>{if(done)return;done=true;save({[`${pageKey}_completed`]:true})};
    const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(max>0&&scrollY/max>=.72)finish()};
    addEventListener('scroll',onScroll,{passive:true});setTimeout(()=>{if(document.visibilityState==='visible')finish()},45000);
  }
  if(pageKey==='practice'){
    const check=()=>{const qs=[...document.querySelectorAll('.question')];if(qs.length&&qs.every(q=>q.querySelector('.feedback')?.textContent.trim()))save({practice_completed:true})};
    document.addEventListener('click',e=>{if(e.target.closest('.check-btn'))setTimeout(check,80)});
  }
  if(pageKey==='test'){
    document.addEventListener('click',e=>{const b=e.target.closest('button,input[type=submit]');if(!b)return;const txt=(b.textContent||b.value||'').toLowerCase();if(!txt.includes('submit'))return;setTimeout(()=>{const body=document.body.innerText;const m=body.match(/(?:score\s*[:\-]?\s*)?(\d+)\s*\/\s*(5|\d+)/i);const fields={test_completed:true};if(m){fields.test_score=Number(m[1]);fields.test_total=Number(m[2])}save(fields)},250)});
  }
}
start();
})();