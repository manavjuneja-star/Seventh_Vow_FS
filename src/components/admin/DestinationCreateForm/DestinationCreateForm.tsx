"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImagePicker } from "@/components/admin/ImagePicker/ImagePicker";
import type { DestinationCategory } from "@/lib/destinations";

import styles from "@/app/admin/admin.module.css";

export function DestinationCreateForm(): React.ReactElement {
  const router = useRouter();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState<DestinationCategory>("domestic");
  const [image, setImage] = useState("");
  const [blurb, setBlurb] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (): Promise<void> => {
    if (!name || !region || !image || !blurb) {
      setError("Fill in name, region, image and blurb first.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, region, category, image, blurb }),
      });
      if (!res.ok) throw new Error("save_failed");
      const data = (await res.json()) as { destination: { slug: string } };
      router.push(`/admin/destinations/${data.destination.slug}`);
    } catch {
      setError("Couldn't create that — try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Region</span>
          <input
            className={styles.input}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Category</span>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value as DestinationCategory)}
        >
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
      </label>
      <ImagePicker label="Hero photo" value={image} onChange={setImage} />
      <label className={styles.field}>
        <span className={styles.label}>Blurb</span>
        <textarea
          className={styles.textarea}
          rows={2}
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
        />
      </label>
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.btnRow}>
        <button type="button" className={styles.btn} disabled={saving} onClick={onSubmit}>
          {saving ? "Adding…" : "Add destination"}
        </button>
      </div>
    </div>
  );
}
