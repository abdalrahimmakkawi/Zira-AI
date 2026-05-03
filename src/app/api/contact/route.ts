import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").insert({ name, email, message, service, status: "new" });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
