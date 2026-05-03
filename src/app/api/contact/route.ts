import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { Twilio } from "twilio";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").insert({ name, email, message, service, status: "new" });
    if (error) throw error;

    // Fire-and-forget email notification via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        resend.emails.send({
          to: "abdalrahimmakkawi@gmail.com",
          from: "onboarding@resend.dev",
          subject: `New Zira AI Lead — ${name}`,
          html: `<h2>New lead from Zira AI</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Service:</strong> ${service || "Not specified"}</p><p><strong>Message:</strong> ${message || "No message"}</p>`,
        }).catch(console.error);
      }
    } catch (e) {
      console.error("Resend error:", e);
    }

    // Fire-and-forget WhatsApp notification via Twilio
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        twilio.messages.create({
          from: "whatsapp:+14155238886",
          to: "whatsapp:+249912605808",
          body: `🔔 New Zira AI Lead\nName: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}`,
        }).catch(console.error);
      }
    } catch (e) {
      console.error("Twilio error:", e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
