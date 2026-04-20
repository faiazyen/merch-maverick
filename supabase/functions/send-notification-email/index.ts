import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const GMAIL_USER = Deno.env.get("GMAIL_USER")!;
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_NAME = "Merch Maverick";

type WebhookPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Record<string, unknown>;
  old_record: Record<string, unknown> | null;
};

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

async function sendEmail(payload: EmailPayload): Promise<void> {
  const client = new SmtpClient();
  await client.connectTLS({
    hostname: "smtp.gmail.com",
    port: 465,
    username: GMAIL_USER,
    password: GMAIL_APP_PASSWORD,
  });
  await client.send({
    from: `${FROM_NAME} <${GMAIL_USER}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });
  await client.close();
}

function emailWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">
        <tr><td style="background:#0a0a0a;padding:24px 32px">
          <p style="margin:0;color:#ffffff;font-size:18px;font-weight:600;letter-spacing:0.5px">Merch Maverick</p>
        </td></tr>
        <tr><td style="padding:32px">
          <h2 style="margin:0 0 16px;color:#0a0a0a;font-size:22px;font-weight:600">${title}</h2>
          ${body}
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0">
          <p style="margin:0;color:#999;font-size:13px">
            You're receiving this because you have an active account with Merch Maverick.<br>
            Questions? Reply to this email or visit your
            <a href="https://merchmaverick.com/portal" style="color:#0a0a0a">client portal</a>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function pill(text: string): string {
  return `<span style="display:inline-block;background:#f0f0f0;color:#333;padding:4px 12px;border-radius:100px;font-size:13px;font-weight:500">${text}</span>`;
}

function ctaButton(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:24px;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:600">${label}</a>`;
}

function quoteSubmittedEmail(quote: Record<string, unknown>) {
  return {
    subject: `We received your quote — ${quote.title}`,
    html: emailWrapper("Quote received", `
      <p style="color:#555;line-height:1.6">We've received your quote request for <strong>${quote.title}</strong>. Our team will review it shortly.</p>
      <table style="width:100%;border:1px solid #e5e5e5;border-radius:6px;border-collapse:collapse;margin:20px 0">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px;width:40%">Product</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.product_name}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px">Quantity</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.quantity} units</td></tr>
        <tr><td style="padding:12px 16px;color:#999;font-size:13px">Status</td><td style="padding:12px 16px">${pill("Submitted")}</td></tr>
      </table>
      ${ctaButton("View in portal", "https://merchmaverick.com/portal/quotes")}`
    ),
  };
}

function guestQuoteAdminEmail(quote: Record<string, unknown>) {
  const notes = String(quote.notes ?? "No notes provided");
  const notesHtml = notes.replace(/\n/g, "<br>");
  return {
    subject: `New guest quote — ${quote.title}`,
    html: emailWrapper("New guest quote received", `
      <p style="color:#555;line-height:1.6">A visitor submitted a quote request. No portal account exists — follow up directly via the contact details below.</p>
      <table style="width:100%;border:1px solid #e5e5e5;border-radius:6px;border-collapse:collapse;margin:20px 0">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px;width:40%">Title</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.title}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px">Product</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.product_name}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px">Quantity</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.quantity} units</td></tr>
        <tr><td style="padding:12px 16px;color:#999;font-size:13px">Contact &amp; Notes</td><td style="padding:12px 16px;font-size:13px;line-height:1.7">${notesHtml}</td></tr>
      </table>
      ${ctaButton("View in admin CRM", "https://merchmaverick.com/admin")}`
    ),
  };
}

function quoteStatusEmail(quote: Record<string, unknown>, status: string) {
  const map: Record<string, { subject: string; headline: string; body: string }> = {
    "in-review": {
      subject: `Your quote is being reviewed — ${quote.title}`,
      headline: "Quote under review",
      body: "Our team is reviewing your quote. We'll send you the full pricing breakdown shortly.",
    },
    "quoted": {
      subject: `Your quote is ready — ${quote.title}`,
      headline: "Quote ready for review",
      body: "Your custom pricing quote is ready. Log in to review the details and approve or request changes.",
    },
    "approved": {
      subject: `Quote approved — ${quote.title}`,
      headline: "Quote approved",
      body: "Your quote has been approved. Our team will be in touch to confirm next steps and deposit details.",
    },
    "rejected": {
      subject: `Update on your quote — ${quote.title}`,
      headline: "Quote not progressed",
      body: "Unfortunately we're unable to proceed with this quote as submitted. Please contact your account manager or submit a revised request.",
    },
    "converted": {
      subject: `Your order is confirmed — ${quote.title}`,
      headline: "Order confirmed",
      body: "Your quote has been converted to a confirmed order. You can now track production progress in your portal.",
    },
  };

  const msg = map[status];
  if (!msg) return null;

  return {
    subject: msg.subject,
    html: emailWrapper(msg.headline, `
      <p style="color:#555;line-height:1.6">${msg.body}</p>
      <table style="width:100%;border:1px solid #e5e5e5;border-radius:6px;border-collapse:collapse;margin:20px 0">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px;width:40%">Quote</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${quote.title}</td></tr>
        <tr><td style="padding:12px 16px;color:#999;font-size:13px">Status</td><td style="padding:12px 16px">${pill(status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))}</td></tr>
      </table>
      ${ctaButton("View quote", "https://merchmaverick.com/portal/quotes")}`
    ),
  };
}

function orderStatusEmail(order: Record<string, unknown>, status: string) {
  const map: Record<string, { subject: string; headline: string; body: string; cta?: string }> = {
    "confirmed": {
      subject: `Order confirmed — ${order.order_number}`,
      headline: "Order confirmed",
      body: "Your order is confirmed and your production slot is secured. We'll notify you as it progresses.",
    },
    "in-production": {
      subject: `Your order is in production — ${order.order_number}`,
      headline: "Production started",
      body: "Artwork has been approved and your order has entered production.",
    },
    "quality-control": {
      subject: `Quality check underway — ${order.order_number}`,
      headline: "Quality control in progress",
      body: "Your order is in final quality review and packing control before dispatch.",
    },
    "shipped": {
      subject: `Your order has shipped — ${order.order_number}`,
      headline: "Order shipped — final balance due",
      body: "Your order is on its way. The remaining 40% balance is now due before final release.",
      cta: "Arrange payment",
    },
    "delivered": {
      subject: `Order delivered — ${order.order_number}`,
      headline: "Order delivered",
      body: "Your order has been successfully delivered. Thank you for working with Merch Maverick.",
    },
  };

  const msg = map[status];
  if (!msg) return null;

  return {
    subject: msg.subject,
    html: emailWrapper(msg.headline, `
      <p style="color:#555;line-height:1.6">${msg.body}</p>
      <table style="width:100%;border:1px solid #e5e5e5;border-radius:6px;border-collapse:collapse;margin:20px 0">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px;width:40%">Order</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${order.order_number}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px">Product</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${order.product_name}</td></tr>
        <tr><td style="padding:12px 16px;color:#999;font-size:13px">Status</td><td style="padding:12px 16px">${pill(status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))}</td></tr>
      </table>
      ${ctaButton(msg.cta ?? "Track order", "https://merchmaverick.com/portal/orders")}`
    ),
  };
}

function approvalStatusEmail(approval: Record<string, unknown>, status: string) {
  const map: Record<string, { subject: string; headline: string; body: string }> = {
    "pending": {
      subject: `Action required: approval needed — ${approval.title}`,
      headline: "Your approval is needed",
      body: "An item requires your review and approval. Please log in to your portal to take action.",
    },
    "approved": {
      subject: `Approval confirmed — ${approval.title}`,
      headline: "Approval accepted",
      body: "Your approval has been recorded. The associated order or artwork will now proceed.",
    },
    "changes-requested": {
      subject: `Changes requested — ${approval.title}`,
      headline: "Changes have been requested",
      body: "Your team has requested changes on this item. Please log in to review the feedback.",
    },
  };

  const msg = map[status];
  if (!msg) return null;

  return {
    subject: msg.subject,
    html: emailWrapper(msg.headline, `
      <p style="color:#555;line-height:1.6">${msg.body}</p>
      <table style="width:100%;border:1px solid #e5e5e5;border-radius:6px;border-collapse:collapse;margin:20px 0">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;color:#999;font-size:13px;width:40%">Item</td><td style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font-size:14px">${approval.title}</td></tr>
        <tr><td style="padding:12px 16px;color:#999;font-size:13px">Status</td><td style="padding:12px 16px">${pill(status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))}</td></tr>
      </table>
      ${ctaButton("Review in portal", "https://merchmaverick.com/portal")}`
    ),
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { type, table, record, old_record } = payload;

  const statusChanged = type === "UPDATE" && record.status !== old_record?.status;
  const isNewQuote = type === "INSERT" && table === "quote_requests" && record.status === "submitted";
  const isNewApproval = type === "INSERT" && table === "approvals" && record.status === "pending";

  if (!statusChanged && !isNewQuote && !isNewApproval) {
    return new Response(JSON.stringify({ skipped: true }), { status: 200 });
  }

  const userId = record.user_id as string | null;
  const newStatus = record.status as string;

  // Guest quote — no portal account, notify admin directly
  if (isNewQuote && !userId) {
    const emailContent = guestQuoteAdminEmail(record);
    try {
      await sendEmail({ to: GMAIL_USER, ...emailContent });
      console.log(`Guest quote admin notification sent for ${record.id}`);
      return new Response(JSON.stringify({ sent: true }), { status: 200 });
    } catch (err) {
      console.error("Guest quote admin email failed:", err);
      return new Response(JSON.stringify({ error: "Email failed" }), { status: 500 });
    }
  }

  if (!userId) {
    return new Response(JSON.stringify({ skipped: true, reason: "No user_id for non-guest event" }), { status: 200 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", userId)
    .single();

  if (error || !profile?.email) {
    console.error("Could not fetch profile email:", error);
    return new Response(JSON.stringify({ error: "Profile not found" }), { status: 500 });
  }

  let emailContent: { subject: string; html: string } | null = null;

  if (isNewQuote) {
    emailContent = quoteSubmittedEmail(record);
  } else if (isNewApproval) {
    emailContent = approvalStatusEmail(record, "pending");
  } else if (table === "quote_requests") {
    emailContent = quoteStatusEmail(record, newStatus);
  } else if (table === "orders") {
    emailContent = orderStatusEmail(record, newStatus);
  } else if (table === "approvals") {
    emailContent = approvalStatusEmail(record, newStatus);
  }

  if (!emailContent) {
    return new Response(JSON.stringify({ skipped: true, reason: "No email for this status" }), { status: 200 });
  }

  try {
    await sendEmail({ to: profile.email, ...emailContent });
    console.log(`Email sent to ${profile.email} for ${table} ${newStatus}`);
    return new Response(JSON.stringify({ sent: true }), { status: 200 });
  } catch (err) {
    console.error("Email send failed:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), { status: 500 });
  }
});
