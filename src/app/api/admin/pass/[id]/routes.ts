import { generateEventPassPDF } from "@/lib/generate-pass";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch guest
    const { data: guest, error } = await supabase
      .from("rsvps")
      .select(
        "guest_id, first_name, last_name, email, guest_count, attending, status",
      )
      .eq("id", id)
      .single();

    if (error || !guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    if (guest.status !== "confirmed") {
      return NextResponse.json(
        { error: "Cannot generate pass for cancelled RSVP" },
        { status: 400 },
      );
    }

    const pdfBuffer = await generateEventPassPDF(guest);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${guest.first_name}_${guest.last_name}_EventPass.pdf"`,
      },
    });
  } catch (err) {
    console.error("Pass generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate pass" },
      { status: 500 },
    );
  }
}
