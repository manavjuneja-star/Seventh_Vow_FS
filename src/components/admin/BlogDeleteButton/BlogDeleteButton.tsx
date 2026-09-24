"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "@/app/admin/admin.module.css";

export function BlogDeleteButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}): React.ReactElement {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className={styles.btnDanger}
      disabled={busy}
      onClick={async () => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
        setBusy(true);
        await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
        router.refresh();
      }}
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}
