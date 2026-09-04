import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ADMIN_TO = "plainact@gmail.com";
const MAX_BCC = 90;

const esc = (v: unknown) => String(v ?? "").replace(/[&<>\"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c] || c));

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const token = Deno.env.get("SUMMIT_BROADCAST_TOKEN");
    const supplied = req.headers.get("x-summit-broadcast-token");
    if (!token || supplied !== token) return new Response("Forbidden", { status: 403 });

    const body = await req.json();
    const eventKey = String(body.event_key || "").trim();
    const lessonName = String(body.lesson_name || "").trim();
    const itemType = String(body.item_type || "Update").trim();
    const route = String(body.route || "").trim();
    const summary = String(body.summary || "").trim();
    const catalog = String(body.catalog || "").trim();

    if (!eventKey || !lessonName || !route) {
      return Response.json({ ok:false, reason:"missing_required_fields" }, { status:400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY")!;
    if (!supabaseUrl || !serviceRole || !resendKey) {
      return Response.json({ ok:false, reason:"missing_server_secret" }, { status:500 });
    }

    const seen = await fetch(`${supabaseUrl}/rest/v1/broadcast_log?event_key=eq.${encodeURIComponent(eventKey)}&select=event_key,status`, {
      headers: { apikey: serviceRole, Authorization: `Bearer ${serviceRole}` }
    });
    const seenRows = await seen.json();
    if (Array.isArray(seenRows) && seenRows.length) {
      return Response.json({ ok:true, duplicate:true, status:seenRows[0].status });
    }

    const usersResp = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=1&per_page=1000`, {
      headers: { apikey: serviceRole, Authorization: `Bearer ${serviceRole}` }
    });
    if (!usersResp.ok) return Response.json({ ok:false, reason:"user_list_failed", status:usersResp.status }, { status:500 });

    const usersData = await usersResp.json();
    const users = Array.isArray(usersData?.users) ? usersData.users : [];
    const emails = [...new Set(users.map((u:any)=>u.email).filter((e:any)=>typeof e === "string" && e.includes("@")))];
    if (!emails.length) return Response.json({ ok:false, reason:"no_recipients" }, { status:400 });

    const subject = `SUMMIT Math — ${lessonName}: ${itemType} is now available`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#16243b;max-width:680px;margin:auto">
        <h1 style="margin-bottom:8px">SUMMIT Math</h1>
        <h2 style="margin-top:0">${esc(lessonName)}</h2>
        <p><strong>${esc(itemType)}</strong> is now available.</p>
        ${summary ? `<p>${esc(summary)}</p>` : ""}
        <p><a href="${esc(route)}" style="display:inline-block;padding:12px 18px;background:#16243b;color:#fff;text-decoration:none;border-radius:10px">Open this update</a></p>
        ${catalog ? `<h3>Currently available on SUMMIT</h3><p>${esc(catalog).replace(/\n/g,"<br>")}</p>` : ""}
        <p>More lessons and videos are being added continuously.</p>
      </div>`;

    let sentCount = 0;
    const providerIds: string[] = [];
    let failure = "";

    for (let i = 0; i < emails.length; i += MAX_BCC) {
      const batch = emails.slice(i, i + MAX_BCC);
      const mail = await fetch("https://api.resend.com/emails", {
        method:"POST",
        headers:{ Authorization:`Bearer ${resendKey}`, "Content-Type":"application/json" },
        body:JSON.stringify({
          from:Deno.env.get("FEEDBACK_FROM_EMAIL") || "SUMMIT <onboarding@resend.dev>",
          to:[ADMIN_TO],
          bcc:batch,
          subject,
          html
        })
      });
      const mailText = await mail.text();
      if (!mail.ok) {
        failure = mailText.slice(0,500);
        break;
      }
      sentCount += batch.length;
      try { const id = JSON.parse(mailText)?.id; if (id) providerIds.push(id); } catch {}
    }

    const ok = sentCount === emails.length;
    await fetch(`${supabaseUrl}/rest/v1/broadcast_log`, {
      method:"POST",
      headers:{ apikey:serviceRole, Authorization:`Bearer ${serviceRole}`, "Content-Type":"application/json", Prefer:"return=minimal" },
      body:JSON.stringify({
        event_key:eventKey,
        recipient_count:sentCount,
        provider_message_id:providerIds[0] || null,
        status:ok ? "sent" : "failed",
        detail:ok ? null : failure
      })
    });

    return Response.json({ ok, sent:ok, recipient_count:sentCount, total_recipients:emails.length, provider_message_ids:providerIds });
  } catch (e) {
    return Response.json({ ok:false, reason:String((e as any)?.message || e) }, { status:500 });
  }
});
