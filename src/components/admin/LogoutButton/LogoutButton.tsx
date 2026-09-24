"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className?: string }): React.ReactElement {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
