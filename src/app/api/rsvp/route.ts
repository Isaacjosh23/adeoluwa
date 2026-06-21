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

    if (!body.firstName || !body.lastName || !body.email || !body.guestCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const now = new Date();
    const deadline = new Date("2026-07-31T23:59:59Z");
    if (now > deadline) {
      return NextResponse.json(
        { error: "RSVP deadline has passed" },
        { status: 403 },
      );
    }

    const guestCountNum = parseInt(body.guestCount, 10);
    if (isNaN(guestCountNum) || guestCountNum < 1) {
      return NextResponse.json(
        { error: "Guest count must be a valid number" },
        { status: 400 },
      );
    }

    const { data: rsvpData, error } = await supabase
      .from("rsvps")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone || null,
          guest_count: guestCountNum,
          attending: "reception",
          message: body.message || null,
        },
      ])
      .select("id, guest_id, edit_token")
      .single();

    if (error || !rsvpData) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit RSVP" },
        { status: 500 },
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://adeoluwa26.vercel.app";
    const editLink = `${baseUrl}/rsvp/edit/${rsvpData.edit_token}`;

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
        subject: "Your RSVP Confirmation - Adedamola & Oluwaseun",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Resend email error:", emailError);
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
