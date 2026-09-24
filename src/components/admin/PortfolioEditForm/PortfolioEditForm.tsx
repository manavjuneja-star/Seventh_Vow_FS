"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImagePicker } from "@/components/admin/ImagePicker/ImagePicker";
import type { PhotoSize, PortfolioEntry, PortfolioPhoto } from "@/lib/portfolio";

import styles from "@/app/admin/admin.module.css";

const SIZES: PhotoSize[] = ["sm", "md", "tall", "wide", "lg"];

export function PortfolioEditForm({ entry }: { entry: PortfolioEntry }): React.ReactElement {
  const router = useRouter();
  const [form, setForm] = useState<PortfolioEntry>(entry);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof PortfolioEntry>(key: K, value: PortfolioEntry[K]): void => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const setPhoto = (i: number, patch: Partial<PortfolioPhoto>): void => {
    set(
      "photos",
      form.photos.map((p, j) => (j === i ? { ...p, ...patch } : p)),
    );
  };

  const removePhoto = (i: number): void => {
    set(
      "photos",
      form.photos.filter((_, j) => j !== i),
    );
  };

  const addPhoto = (): void => {
    set("photos", [...form.photos, { src: "", alt: "", size: "sm" }]);
  };

  const onSubmit = async (): Promise<void> => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/portfolio/${entry.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("save_failed");
      const data = (await res.json()) as { entry: PortfolioEntry };
      setSaved(true);
      if (data.entry.slug !== entry.slug) {
        router.push(`/admin/portfolio/${data.entry.slug}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Couldn't save that — try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Details</h2>
        <div className={styles.form}>
          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Couple names</span>
              <input
                className={styles.input}
                value={form.coupleNames}
                onChange={(e) => set("coupleNames", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Location</span>
              <input
                className={styles.input}
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Date</span>
              <input
                className={styles.input}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Duration</span>
              <input
                className={styles.input}
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Description</span>
            <textarea
              className={styles.textarea}
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </label>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
            />
            Feature this on the homepage (the bigger card)
          </label>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Hero image</h2>
        <div className={styles.form}>
          <ImagePicker
            label="Hero photo"
            value={form.heroImage}
            onChange={(url) => set("heroImage", url)}
          />
          <label className={styles.field}>
            <span className={styles.label}>Hero image alt text</span>
            <input
              className={styles.input}
              value={form.heroAlt}
              onChange={(e) => set("heroAlt", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Gallery ({form.photos.length} photos)</h2>
        <div className={styles.form}>
          {form.photos.map((photo, i) => (
            <div key={i} className={styles.repeatItem}>
              <div className={styles.repeatHead}>
                <span className={styles.label}>Photo {i + 1}</span>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => removePhoto(i)}
                >
                  Remove
                </button>
              </div>
              <ImagePicker
                label="Image"
                value={photo.src}
                onChange={(url) => setPhoto(i, { src: url })}
              />
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.label}>Alt text</span>
                  <input
                    className={styles.input}
                    value={photo.alt}
                    onChange={(e) => setPhoto(i, { alt: e.target.value })}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Size in the layout</span>
                  <select
                    className={styles.select}
                    value={photo.size}
                    onChange={(e) => setPhoto(i, { size: e.target.value as PhotoSize })}
                  >
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}
          <button type="button" className={styles.btnSecondary} onClick={addPhoto}>
            + Add photo
          </button>
        </div>
      </div>

      {error && <span className={styles.error}>{error}</span>}
      {saved && <span className={styles.success}>Saved.</span>}
      <div className={styles.btnRow}>
        <button type="button" className={styles.btn} disabled={saving} onClick={onSubmit}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
