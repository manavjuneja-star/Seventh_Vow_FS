"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImagePicker } from "@/components/admin/ImagePicker/ImagePicker";
import type {
  Destination,
  DestinationCategory,
  MonthClimate,
  Venue,
  Weather,
} from "@/lib/destinations";

import styles from "@/app/admin/admin.module.css";

const BLANK_MONTHS: MonthClimate[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
].map((month) => ({ month, tempC: 0, rain: 0 }));

export function DestinationEditForm({
  destination,
}: {
  destination: Destination;
}): React.ReactElement {
  const router = useRouter();
  const [form, setForm] = useState<Destination>(destination);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Destination>(key: K, value: Destination[K]): void => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const saveMainFields = async (): Promise<void> => {
    setSaving(true);
    setError("");
    try {
      const { venues: _venues, ...patch } = form;
      const res = await fetch(`/api/admin/destinations/${destination.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("save_failed");
      const data = (await res.json()) as { destination: Destination };
      setSaved(true);
      if (data.destination.slug !== destination.slug) {
        router.push(`/admin/destinations/${data.destination.slug}`);
      } else {
        setForm(data.destination);
        router.refresh();
      }
    } catch {
      setError("Couldn't save that — try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteDestination = async (): Promise<void> => {
    if (!confirm(`Delete ${destination.name}? This can't be undone.`)) return;
    await fetch(`/api/admin/destinations/${destination.slug}`, { method: "DELETE" });
    router.push("/admin/destinations");
  };

  // --- Why choose paragraphs ---
  const whyChoose = form.whyChoose ?? [];
  const setWhyChoose = (next: string[]): void => set("whyChoose", next);

  // --- Weather ---
  const weather = form.weather;
  const setWeather = (next: Weather | undefined): void => set("weather", next);
  const setMonth = (i: number, patch: Partial<MonthClimate>): void => {
    if (!weather) return;
    setWeather({
      ...weather,
      months: weather.months.map((m, j) => (j === i ? { ...m, ...patch } : m)),
    });
  };

  // --- Venues (each action hits its own endpoint immediately) ---
  const [venues, setVenues] = useState<Venue[]>(destination.venues ?? []);
  const [venueBusy, setVenueBusy] = useState(false);
  const [newVenueName, setNewVenueName] = useState("");
  const [newVenueImage, setNewVenueImage] = useState("");

  const addVenue = async (): Promise<void> => {
    if (!newVenueName || !newVenueImage) return;
    setVenueBusy(true);
    try {
      const res = await fetch(`/api/admin/destinations/${destination.slug}/venues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newVenueName, image: newVenueImage }),
      });
      const data = (await res.json()) as { destination: Destination };
      setVenues(data.destination.venues ?? []);
      setNewVenueName("");
      setNewVenueImage("");
    } finally {
      setVenueBusy(false);
    }
  };

  const updateVenue = async (index: number, patch: Partial<Venue>): Promise<void> => {
    setVenues((vs) => vs.map((v, i) => (i === index ? { ...v, ...patch } : v)));
    await fetch(`/api/admin/destinations/${destination.slug}/venues/${index}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  };

  const removeVenue = async (index: number): Promise<void> => {
    setVenueBusy(true);
    try {
      const res = await fetch(`/api/admin/destinations/${destination.slug}/venues/${index}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { destination: Destination };
      setVenues(data.destination.venues ?? []);
    } finally {
      setVenueBusy(false);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Details</h2>
        <div className={styles.form}>
          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Region</span>
              <input
                className={styles.input}
                value={form.region}
                onChange={(e) => set("region", e.target.value)}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Category</span>
            <select
              className={styles.select}
              value={form.category}
              onChange={(e) => set("category", e.target.value as DestinationCategory)}
            >
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </label>
          <ImagePicker label="Hero photo" value={form.image} onChange={(url) => set("image", url)} />
          <label className={styles.field}>
            <span className={styles.label}>Blurb</span>
            <textarea
              className={styles.textarea}
              rows={2}
              value={form.blurb}
              onChange={(e) => set("blurb", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Why choose {form.name}</h2>
        <div className={styles.form}>
          {whyChoose.map((para, i) => (
            <div key={i} className={styles.repeatItem}>
              <textarea
                className={styles.textarea}
                rows={3}
                value={para}
                onChange={(e) =>
                  setWhyChoose(whyChoose.map((p, j) => (j === i ? e.target.value : p)))
                }
              />
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setWhyChoose(whyChoose.filter((_, j) => j !== i))}
              >
                Remove paragraph
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setWhyChoose([...whyChoose, ""])}
          >
            + Add paragraph
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Best time to celebrate</h2>
        {weather ? (
          <div className={styles.form}>
            <div className={styles.row2}>
              <label className={styles.field}>
                <span className={styles.label}>Best window</span>
                <input
                  className={styles.input}
                  value={weather.bestWindow}
                  onChange={(e) => setWeather({ ...weather, bestWindow: e.target.value })}
                />
              </label>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Summary</span>
              <textarea
                className={styles.textarea}
                rows={2}
                value={weather.summary}
                onChange={(e) => setWeather({ ...weather, summary: e.target.value })}
              />
            </label>
            <div className={styles.form} style={{ gap: 8 }}>
              {weather.months.map((m, i) => (
                <div key={m.month} className={styles.row2}>
                  <label className={styles.field}>
                    <span className={styles.label}>{m.month} — temp °C</span>
                    <input
                      type="number"
                      className={styles.input}
                      value={m.tempC}
                      onChange={(e) => setMonth(i, { tempC: Number(e.target.value) })}
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>{m.month} — rainfall (0–100)</span>
                    <input
                      type="number"
                      className={styles.input}
                      value={m.rain}
                      onChange={(e) => setMonth(i, { rain: Number(e.target.value) })}
                    />
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setWeather(undefined)}
            >
              Remove weather section
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() =>
              setWeather({ bestWindow: "", summary: "", months: BLANK_MONTHS })
            }
          >
            + Add weather section
          </button>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
      {saved && <span className={styles.success}>Saved.</span>}
      <div className={styles.btnRow}>
        <button type="button" className={styles.btn} disabled={saving} onClick={saveMainFields}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button type="button" className={styles.btnDanger} onClick={deleteDestination}>
          Delete destination
        </button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Venues ({venues.length})</h2>
        <div className={styles.form}>
          {venues.map((venue, i) => (
            <div key={i} className={styles.repeatItem}>
              <div className={styles.repeatHead}>
                <span className={styles.label}>Venue {i + 1}</span>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  disabled={venueBusy}
                  onClick={() => removeVenue(i)}
                >
                  Remove
                </button>
              </div>
              <ImagePicker
                label="Photo"
                value={venue.image}
                onChange={(url) => updateVenue(i, { image: url })}
              />
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input
                  className={styles.input}
                  defaultValue={venue.name}
                  onBlur={(e) => updateVenue(i, { name: e.target.value })}
                />
              </label>
            </div>
          ))}

          <div className={styles.repeatItem}>
            <span className={styles.label}>Add a venue</span>
            <ImagePicker label="Photo" value={newVenueImage} onChange={setNewVenueImage} />
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                className={styles.input}
                value={newVenueName}
                onChange={(e) => setNewVenueName(e.target.value)}
              />
            </label>
            <button
              type="button"
              className={styles.btnSecondary}
              disabled={venueBusy}
              onClick={addVenue}
            >
              + Add venue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
