"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImagePicker } from "@/components/admin/ImagePicker/ImagePicker";
import {
  BLOG_CATEGORIES,
  type BlogPost,
  type ChaptersContent,
  type EditorialContent,
  type GuideContent,
  type PhotoEssayContent,
  type PostFormat,
} from "@/lib/blogShared";

import styles from "@/app/admin/admin.module.css";

type BaseFields = {
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string;
  readMinutes: number;
  featured: boolean;
};

function defaultBase(initial?: BlogPost): BaseFields {
  return {
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    cover: initial?.cover ?? "",
    category: initial?.category ?? BLOG_CATEGORIES[0],
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    readMinutes: initial?.readMinutes ?? 5,
    featured: initial?.featured ?? false,
  };
}

function defaultContent(format: PostFormat, initial?: BlogPost): unknown {
  if (initial?.format === format) return initial.content;
  switch (format) {
    case "editorial":
      return { standfirst: "", facts: [], sections: [] } satisfies EditorialContent;
    case "photo-essay":
      return { intro: "", frames: [], closing: "" } satisfies PhotoEssayContent;
    case "guide":
      return { intro: "", steps: [] } satisfies GuideContent;
    case "chapters":
      return { intro: "", chapters: [] } satisfies ChaptersContent;
  }
}

export function BlogPostForm({
  format,
  initial,
}: {
  format: PostFormat;
  initial?: BlogPost;
}): React.ReactElement {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [base, setBase] = useState<BaseFields>(defaultBase(initial));
  const [content, setContent] = useState<Record<string, unknown>>(
    defaultContent(format, initial) as Record<string, unknown>,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const setBaseField = <K extends keyof BaseFields>(key: K, value: BaseFields[K]): void =>
    setBase((b) => ({ ...b, [key]: value }));

  const onSubmit = async (): Promise<void> => {
    if (!base.title || !base.cover || !base.excerpt) {
      setError("Title, excerpt and cover image are required.");
      return;
    }
    setSaving(true);
    setError("");
    const body = { ...base, format, content };
    try {
      const res = await fetch(
        isEdit ? `/api/admin/blog/${initial!.slug}` : "/api/admin/blog",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) throw new Error("save_failed");
      const data = (await res.json()) as { post: BlogPost };
      router.push(`/admin/blog/${data.post.slug}`);
      router.refresh();
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
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              className={styles.input}
              value={base.title}
              onChange={(e) => setBaseField("title", e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Excerpt</span>
            <textarea
              className={styles.textarea}
              rows={2}
              value={base.excerpt}
              onChange={(e) => setBaseField("excerpt", e.target.value)}
            />
          </label>
          <ImagePicker
            label="Cover image"
            value={base.cover}
            onChange={(url) => setBaseField("cover", url)}
          />
          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Category</span>
              <select
                className={styles.select}
                value={base.category}
                onChange={(e) => setBaseField("category", e.target.value)}
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Date</span>
              <input
                type="date"
                className={styles.input}
                value={base.date}
                onChange={(e) => setBaseField("date", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.row2}>
            <label className={styles.field}>
              <span className={styles.label}>Read minutes</span>
              <input
                type="number"
                className={styles.input}
                value={base.readMinutes}
                onChange={(e) => setBaseField("readMinutes", Number(e.target.value))}
              />
            </label>
            <label className={styles.checkboxRow} style={{ alignSelf: "end", paddingBottom: 10 }}>
              <input
                type="checkbox"
                checked={base.featured}
                onChange={(e) => setBaseField("featured", e.target.checked)}
              />
              Feature at the top of the Journal
            </label>
          </div>
        </div>
      </div>

      {format === "editorial" && (
        <EditorialFields content={content as EditorialContent} onChange={setContent} />
      )}
      {format === "photo-essay" && (
        <PhotoEssayFields content={content as PhotoEssayContent} onChange={setContent} />
      )}
      {format === "guide" && <GuideFields content={content as GuideContent} onChange={setContent} />}
      {format === "chapters" && (
        <ChaptersFields content={content as ChaptersContent} onChange={setContent} />
      )}

      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.btnRow}>
        <button type="button" className={styles.btn} disabled={saving} onClick={onSubmit}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
      </div>
    </div>
  );
}

// --- Editorial ---------------------------------------------------------

function EditorialFields({
  content,
  onChange,
}: {
  content: EditorialContent;
  onChange: (c: EditorialContent) => void;
}): React.ReactElement {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>Editorial content</h2>
      <div className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Standfirst</span>
          <textarea
            className={styles.textarea}
            rows={2}
            value={content.standfirst}
            onChange={(e) => onChange({ ...content, standfirst: e.target.value })}
          />
        </label>

        <span className={styles.label}>Facts strip</span>
        {content.facts.map((fact, i) => (
          <div key={i} className={styles.row2}>
            <input
              className={styles.input}
              placeholder="Label"
              value={fact.label}
              onChange={(e) =>
                onChange({
                  ...content,
                  facts: content.facts.map((f, j) => (j === i ? { ...f, label: e.target.value } : f)),
                })
              }
            />
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className={styles.input}
                placeholder="Value"
                value={fact.value}
                onChange={(e) =>
                  onChange({
                    ...content,
                    facts: content.facts.map((f, j) =>
                      j === i ? { ...f, value: e.target.value } : f,
                    ),
                  })
                }
              />
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => onChange({ ...content, facts: content.facts.filter((_, j) => j !== i) })}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => onChange({ ...content, facts: [...content.facts, { label: "", value: "" }] })}
        >
          + Add fact
        </button>

        <span className={styles.label}>Sections</span>
        {content.sections.map((section, i) => (
          <div key={i} className={styles.repeatItem}>
            <div className={styles.repeatHead}>
              <span className={styles.label}>Section {i + 1}</span>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() =>
                  onChange({ ...content, sections: content.sections.filter((_, j) => j !== i) })
                }
              >
                Remove
              </button>
            </div>
            <input
              className={styles.input}
              placeholder="Heading (optional)"
              value={section.heading ?? ""}
              onChange={(e) =>
                onChange({
                  ...content,
                  sections: content.sections.map((s, j) =>
                    j === i ? { ...s, heading: e.target.value } : s,
                  ),
                })
              }
            />
            <textarea
              className={styles.textarea}
              rows={4}
              placeholder="Paragraphs — separate each with a blank line"
              value={section.paragraphs.join("\n\n")}
              onChange={(e) =>
                onChange({
                  ...content,
                  sections: content.sections.map((s, j) =>
                    j === i
                      ? { ...s, paragraphs: e.target.value.split(/\n\s*\n/).filter(Boolean) }
                      : s,
                  ),
                })
              }
            />
            <input
              className={styles.input}
              placeholder="Pull quote (optional)"
              value={section.pullQuote ?? ""}
              onChange={(e) =>
                onChange({
                  ...content,
                  sections: content.sections.map((s, j) =>
                    j === i ? { ...s, pullQuote: e.target.value } : s,
                  ),
                })
              }
            />
            <ImagePicker
              label="Section image (optional)"
              value={section.image?.src ?? ""}
              onChange={(url) =>
                onChange({
                  ...content,
                  sections: content.sections.map((s, j) =>
                    j === i
                      ? { ...s, image: url ? { src: url, alt: s.image?.alt ?? "" } : undefined }
                      : s,
                  ),
                })
              }
            />
            {section.image && (
              <input
                className={styles.input}
                placeholder="Image alt text"
                value={section.image.alt}
                onChange={(e) =>
                  onChange({
                    ...content,
                    sections: content.sections.map((s, j) =>
                      j === i && s.image ? { ...s, image: { ...s.image, alt: e.target.value } } : s,
                    ),
                  })
                }
              />
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() =>
            onChange({ ...content, sections: [...content.sections, { paragraphs: [] }] })
          }
        >
          + Add section
        </button>
      </div>
    </div>
  );
}

// --- Photo essay ---------------------------------------------------------

function PhotoEssayFields({
  content,
  onChange,
}: {
  content: PhotoEssayContent;
  onChange: (c: PhotoEssayContent) => void;
}): React.ReactElement {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>Photo essay content</h2>
      <div className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Intro</span>
          <textarea
            className={styles.textarea}
            rows={3}
            value={content.intro}
            onChange={(e) => onChange({ ...content, intro: e.target.value })}
          />
        </label>

        {content.frames.map((frame, i) => (
          <div key={i} className={styles.repeatItem}>
            <div className={styles.repeatHead}>
              <span className={styles.label}>Frame {i + 1}</span>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => onChange({ ...content, frames: content.frames.filter((_, j) => j !== i) })}
              >
                Remove
              </button>
            </div>
            <ImagePicker
              label="Image"
              value={frame.src}
              onChange={(url) =>
                onChange({
                  ...content,
                  frames: content.frames.map((f, j) => (j === i ? { ...f, src: url } : f)),
                })
              }
            />
            <input
              className={styles.input}
              placeholder="Alt text"
              value={frame.alt}
              onChange={(e) =>
                onChange({
                  ...content,
                  frames: content.frames.map((f, j) => (j === i ? { ...f, alt: e.target.value } : f)),
                })
              }
            />
            <textarea
              className={styles.textarea}
              rows={2}
              placeholder="Caption"
              value={frame.caption}
              onChange={(e) =>
                onChange({
                  ...content,
                  frames: content.frames.map((f, j) =>
                    j === i ? { ...f, caption: e.target.value } : f,
                  ),
                })
              }
            />
          </div>
        ))}
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() =>
            onChange({ ...content, frames: [...content.frames, { src: "", alt: "", caption: "" }] })
          }
        >
          + Add frame
        </button>

        <label className={styles.field}>
          <span className={styles.label}>Closing</span>
          <textarea
            className={styles.textarea}
            rows={2}
            value={content.closing}
            onChange={(e) => onChange({ ...content, closing: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}

// --- Guide & Chapters (identical shape: intro + repeatable {title,body,image}) ---

function StepList({
  intro,
  items,
  itemLabel,
  onIntroChange,
  onItemsChange,
}: {
  intro: string;
  items: { title: string; body: string; image: { src: string; alt: string } }[];
  itemLabel: string;
  onIntroChange: (v: string) => void;
  onItemsChange: (items: { title: string; body: string; image: { src: string; alt: string } }[]) => void;
}): React.ReactElement {
  return (
    <div className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Intro</span>
        <textarea className={styles.textarea} rows={3} value={intro} onChange={(e) => onIntroChange(e.target.value)} />
      </label>

      {items.map((item, i) => (
        <div key={i} className={styles.repeatItem}>
          <div className={styles.repeatHead}>
            <span className={styles.label}>
              {itemLabel} {i + 1}
            </span>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => onItemsChange(items.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
          <input
            className={styles.input}
            placeholder="Title"
            value={item.title}
            onChange={(e) =>
              onItemsChange(items.map((it, j) => (j === i ? { ...it, title: e.target.value } : it)))
            }
          />
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Body"
            value={item.body}
            onChange={(e) =>
              onItemsChange(items.map((it, j) => (j === i ? { ...it, body: e.target.value } : it)))
            }
          />
          <ImagePicker
            label="Image"
            value={item.image.src}
            onChange={(url) =>
              onItemsChange(
                items.map((it, j) => (j === i ? { ...it, image: { ...it.image, src: url } } : it)),
              )
            }
          />
          <input
            className={styles.input}
            placeholder="Image alt text"
            value={item.image.alt}
            onChange={(e) =>
              onItemsChange(
                items.map((it, j) =>
                  j === i ? { ...it, image: { ...it.image, alt: e.target.value } } : it,
                ),
              )
            }
          />
        </div>
      ))}
      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => onItemsChange([...items, { title: "", body: "", image: { src: "", alt: "" } }])}
      >
        + Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function GuideFields({
  content,
  onChange,
}: {
  content: GuideContent;
  onChange: (c: GuideContent) => void;
}): React.ReactElement {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>Guide content</h2>
      <StepList
        intro={content.intro}
        items={content.steps}
        itemLabel="Step"
        onIntroChange={(intro) => onChange({ ...content, intro })}
        onItemsChange={(steps) => onChange({ ...content, steps })}
      />
    </div>
  );
}

function ChaptersFields({
  content,
  onChange,
}: {
  content: ChaptersContent;
  onChange: (c: ChaptersContent) => void;
}): React.ReactElement {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>Chapters content</h2>
      <StepList
        intro={content.intro}
        items={content.chapters}
        itemLabel="Chapter"
        onIntroChange={(intro) => onChange({ ...content, intro })}
        onItemsChange={(chapters) => onChange({ ...content, chapters })}
      />
    </div>
  );
}
