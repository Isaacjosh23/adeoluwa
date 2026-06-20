import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { generateRsvpConfirmationEmail } from "@/lib/email-templates/rsvp-confirmation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. UPDATE GET ROUTE: Change type to Promise and add await
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }, // <-- Type changed to Promise
) {
  try {
    const { token } = await params; // <-- Await the params here

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Check if deadline has passed
    const now = new Date();
    const deadline = new Date("2026-07-31T23:59:59Z");
    if (now > deadline) {
      return NextResponse.json(
        { error: "RSVP edit window has closed" },
        { status: 403 },
      );
    }

    // Fetch RSVP by edit_token
    const { data, error } = await supabase
      .from("rsvps")
      .select(
        "id, guest_id, first_name, last_name, email, phone, guest_count, attending, message, status, submitted_at",
      )
      .eq("edit_token", token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: data.id,
        guestId: data.guest_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        guestCount: data.guest_count,
        attending: data.attending,
        message: data.message,
        status: data.status,
        submittedAt: data.submitted_at,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 2. UPDATE PATCH ROUTE: Change type to Promise and add await
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }, // <-- Type changed to Promise
) {
  try {
    const { token } = await params; // <-- Await the params here
    const body = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Check if deadline has passed
    const now = new Date();
    const deadline = new Date("2026-07-31T23:59:59Z");
    if (now > deadline) {
      return NextResponse.json(
        { error: "RSVP edit window has closed" },
        { status: 403 },
      );
    }

    // Fetch existing RSVP
    const { data: existingRsvp, error: fetchError } = await supabase
      .from("rsvps")
      .select("*")
      .eq("edit_token", token)
      .single();

    if (fetchError || !existingRsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }

    // Handle cancellation
    if (body.action === "cancel") {
      const { error: updateError } = await supabase
        .from("rsvps")
        .update({ status: "cancelled" })
        .eq("edit_token", token);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return NextResponse.json(
          { error: "Failed to cancel RSVP" },
          { status: 500 },
        );
      }

      // Send cancellation email
      try {
        await resend.emails.send({
          from: "Adedamola & Oluwaseun <onboarding@resend.dev>",
          to: existingRsvp.email,
          subject: "RSVP Cancelled - Ada & Emmanuel",
          html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h2 style="text-align: center; color: #d4af37;">RSVP Cancelled</h2>
              <p>Hi ${existingRsvp.first_name},</p>
              <p>Your RSVP has been successfully cancelled.</p>
              <p>If you change your mind, you can RSVP again by visiting our website.</p>
              <p style="text-align: center; margin-top: 40px; color: #d4af37; font-style: italic;">
                #AdaAndEmma2026
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
      }

      return NextResponse.json(
        {
          success: true,
          message: "RSVP cancelled successfully",
        },
        { status: 200 },
      );
    }

    // Handle update
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      body.guestCount === ""
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { error: updateError } = await supabase
      .from("rsvps")
      .update({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        guest_count: parseInt(body.guestCount),
        message: body.message || null,
      })
      .eq("edit_token", token);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update RSVP" },
        { status: 500 },
      );
    }

    // Send updated confirmation email
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "https://adeoluwa@26.vercel.app";
      const editLink = `${baseUrl}/rsvp/edit/${token}`;

      const emailHtml = generateRsvpConfirmationEmail({
        firstName: body.firstName,
        guestId: existingRsvp.guest_id,
        guestCount: body.guestCount,
        message: body.message,
        editLink: editLink,
      });

      await resend.emails.send({
        from: "Adedamola & Oluwaseun <onboarding@resend.dev>",
        to: body.email,
        subject: "Your Updated RSVP - Ada & Emmanuel",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "RSVP updated successfully",
        guestId: existingRsvp.guest_id,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
