import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { generateEventPassPDF } from "@/lib/generate-pass";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { guestIds } = await req.json();
    if (!guestIds || !Array.isArray(guestIds) || guestIds.length === 0) {
      return NextResponse.json(
        { error: "No guest IDs provided" },
        { status: 400 },
      );
    }

    // Fetch all guests
    const { data: guests, error } = await supabase
      .from("rsvps")
      .select(
        "id, guest_id, first_name, last_name, email, guest_count, attending, status",
      )
      .in("id", guestIds)
      .eq("status", "confirmed");

    if (error || !guests || guests.length === 0) {
      return NextResponse.json(
        { error: "No confirmed guests found" },
        { status: 404 },
      );
    }

    // Generate a PDF for each guest and add to ZIP
    const zip = new JSZip();

    await Promise.all(
      guests.map(async (guest) => {
        const pdf = await generateEventPassPDF(guest);
        zip.file(
          `${guest.first_name}_${guest.last_name}_${guest.guest_id}.pdf`,
          pdf,
        );
      }),
    );

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="event-passes.zip"`,
      },
    });
  } catch (err) {
    console.error("Bulk pass error:", err);
    return NextResponse.json(
      { error: "Failed to generate passes" },
      { status: 500 },
    );
  }
}
