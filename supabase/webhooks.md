# Supabase Database Webhooks Setup

## Overview
The `send-notification-email` Edge Function handles all transactional emails.
Webhooks must be created in the Supabase dashboard — they cannot be defined in SQL.

## Deploy the Edge Function first

```bash
npx supabase functions deploy send-notification-email --project-ref <your-project-ref>
```

Set the required secret:
```bash
npx supabase secrets set RESEND_API_KEY=<your-resend-key> --project-ref <your-project-ref>
```

## Create webhooks in Supabase Dashboard

Go to: **Database → Webhooks → Create a new hook**

Create one webhook per table below. All point to the same Edge Function URL:
```
https://<your-project-ref>.supabase.co/functions/v1/send-notification-email
```

### Webhook 1 — quote_requests
- Name: `notify_quote_status`
- Table: `public.quote_requests`
- Events: `INSERT`, `UPDATE`
- HTTP method: POST
- URL: (Edge Function URL above)

### Webhook 2 — orders
- Name: `notify_order_status`
- Table: `public.orders`
- Events: `UPDATE`
- HTTP method: POST
- URL: (Edge Function URL above)

### Webhook 3 — approvals
- Name: `notify_approval_status`
- Table: `public.approvals`
- Events: `INSERT`, `UPDATE`
- HTTP method: POST
- URL: (Edge Function URL above)

## Emails sent per trigger

| Table           | Trigger         | Email sent                          |
|----------------|-----------------|-------------------------------------|
| quote_requests | INSERT (submitted) | "We received your quote"         |
| quote_requests | UPDATE status → in-review | "Quote under review"    |
| quote_requests | UPDATE status → quoted | "Your quote is ready"        |
| quote_requests | UPDATE status → approved | "Quote approved"           |
| quote_requests | UPDATE status → rejected | "Quote not progressed"     |
| quote_requests | UPDATE status → converted | "Order confirmed"         |
| orders         | UPDATE status → confirmed | "Order confirmed"         |
| orders         | UPDATE status → in-production | "Production started"  |
| orders         | UPDATE status → quality-control | "QC in progress"    |
| orders         | UPDATE status → shipped | "Order shipped — balance due" |
| orders         | UPDATE status → delivered | "Order delivered"         |
| approvals      | INSERT (pending) | "Action required: approval needed"  |
| approvals      | UPDATE status → approved | "Approval accepted"        |
| approvals      | UPDATE status → changes-requested | "Changes requested" |

## From address
Update `FROM_EMAIL` in the Edge Function to match your verified Resend domain.
