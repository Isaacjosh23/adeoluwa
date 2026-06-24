import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    // Fetch all push subscriptions
    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth");

    if (error || !subscriptions || subscriptions.length === 0) {
      return NextResponse.json(
        { message: "No subscriptions found" },
        { status: 200 },
      );
    }

    const payload = JSON.stringify({
      title: "New RSVP",
      body: `${body.guestName} just confirmed attendance`,
      url: "/admin/guests",
    });

    // Send to all subscribed coordinators
    await Promise.allSettled(
      subscriptions.map((sub) =>
        webpush
          .sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload,
          )
          .catch(async (err) => {
            // If subscription is expired/invalid, remove it
            if (err.statusCode === 410) {
              await supabase
                .from("push_subscriptions")
                .delete()
                .eq("endpoint", sub.endpoint);
            }
          }),
      ),
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Push send error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
