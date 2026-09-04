(()=>{
  if(!window.supabase?.createClient)return;
  const originalCreateClient=window.supabase.createClient.bind(window.supabase);
  window.supabase.createClient=function(...args){
    const client=originalCreateClient(...args);
    const originalFrom=client.from.bind(client);
    client.from=function(table){
      const query=originalFrom(table);
      if(table!=='lesson_feedback_reports' || !query?.insert)return query;
      const originalInsert=query.insert.bind(query);
      query.insert=async function(values,...rest){
        const result=await originalInsert(values,...rest);
        if(!result?.error){
          try{
            const payload=Array.isArray(values)?values[0]:values;
            let screenshot_url=null;
            if(payload?.screenshot_path){
              const {data}=await client.storage.from('lesson-feedback').createSignedUrl(payload.screenshot_path,86400);
              screenshot_url=data?.signedUrl||null;
            }
            await client.functions.invoke('send-feedback-email',{body:{
              ...payload,
              lesson_name:document.querySelector('h1,.lesson-title,[data-lesson-title]')?.textContent?.trim()||document.title.split('—')[0].trim()||'Lesson',
              page_kind:location.pathname.includes('/problems/')?'Practice':location.pathname.includes('/answers/')?'Answers':location.pathname.includes('/test/')?'Test':location.pathname.includes('/video/')?'Video':'Explanation',
              screenshot_url
            }});
          }catch(e){console.warn('Feedback email notification failed',e)}
        }
        return result;
      };
      return query;
    };
    return client;
  };
})();