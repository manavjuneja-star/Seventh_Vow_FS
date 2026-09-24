"use client";

import { useRef, useState } from "react";

import styles from "@/app/admin/admin.module.css";

/** Upload-and-preview control shared by every admin form that stores an
 *  image URL (portfolio photos, blog images, destination/venue photos).
 *  Uploads immediately on file choice via `/api/admin/upload`, then reports
 *  the resulting public URL back to the parent form's state. */
export function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const onFile = async (file: File): Promise<void> => {
    setUploading(true);
    setError(false);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("upload_failed");
      const data = (await res.json()) as { url: string };
      onChange(data.url);
    } catch {
      setError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{ width: 160, height: 110, objectFit: "cover", borderRadius: 6 }}
        />
      )}
      <div className={styles.btnRow}>
        <button
          type="button"
          className={styles.btnSecondary}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button type="button" className={styles.btnSecondary} onClick={() => onChange("")}>
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onFile(file);
          e.target.value = "";
        }}
      />
      {error && <span className={styles.error}>Upload failed — try again.</span>}
    </div>
  );
}
