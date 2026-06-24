"use client";

import { useAdminRealtime } from "@/hooks/useAdminRealtime";

export default function AdminRealtimeProvider() {
  useAdminRealtime();
  return null;
}
