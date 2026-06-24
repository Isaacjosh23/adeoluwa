"use client";

import { useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useAdminRealtime() {
  const router = useRouter();
  const supabase = createClient();

  // ── SUBSCRIBE TO PUSH NOTIFICATIONS ──
  const subscribeToPush = useCallback(async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Check if already subscribed
      const existing = await registration.pushManager.getSubscription();
      if (existing) return;

      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });

      const { endpoint, keys } = subscription.toJSON() as {
        endpoint: string;
        keys: { p256dh: string; auth: string };
      };

      // Save subscription to DB
      await fetch("/api/admin/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
        }),
      });
    } catch (err) {
      console.error("Push subscription error:", err);
    }
  }, []);

  // ── SUPABASE REALTIME ──
  useEffect(() => {
    // Subscribe to push on mount
    subscribeToPush();

    // Subscribe to rsvps table changes
    const channel = supabase
      .channel("rsvps-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rsvps" },
        () => {
          // Refresh the current page data when any change happens
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, subscribeToPush, supabase]);
}

// Helper to convert VAPID key
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; i++) {
    view[i] = rawData.charCodeAt(i);
  }
  return buffer;
}
