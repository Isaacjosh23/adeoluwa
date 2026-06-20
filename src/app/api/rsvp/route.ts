import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { generateRsvpConfirmationEmail } from "@/lib/email-templates/rsvp-confirmation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

interface RsvpPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  guestCount: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RsvpPayload = await req.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.guestCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Check if RSVP deadline has passed
    const now = new Date();
    const deadline = new Date("2026-07-31T23:59:59Z");
    if (now > deadline) {
      return NextResponse.json(
        { error: "RSVP deadline has passed" },
        { status: 403 },
      );
    }

    // Insert into Supabase (triggers will handle guest_id and edit_token)
    const { data, error } = await supabase.from("rsvps").insert([
      {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        guest_count: parseInt(body.guestCount),
        attending: "reception", // Default value as per requirement
        message: body.message || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit RSVP" },
        { status: 500 },
      );
    }

    // Get the inserted record to retrieve edit_token
    const { data: rsvpData, error: fetchError } = await supabase
      .from("rsvps")
      .select("id, guest_id, edit_token")
      .eq("email", body.email)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError) {
      console.error("Error fetching RSVP:", fetchError);
      return NextResponse.json(
        { error: "Failed to retrieve RSVP details" },
        { status: 500 },
      );
    }

    // Generate edit link
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://adeoluwa@26.vercel.app";
    const editLink = `${baseUrl}/rsvp/edit/${rsvpData.edit_token}`;

    // Send confirmation email via Resend
    try {
      const emailHtml = generateRsvpConfirmationEmail({
        firstName: body.firstName,
        guestId: rsvpData.guest_id,
        guestCount: body.guestCount,
        message: body.message,
        editLink: editLink,
      });

      await resend.emails.send({
        from: "Adedamola & Oluwaseun <onboarding@resend.dev>",
        to: body.email,
        subject: "Your RSVP Confirmation - Ada & Emmanuel",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Resend email error:", emailError);
      // Don't fail the RSVP submission if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "RSVP submitted successfully",
        guestId: rsvpData.guest_id,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
