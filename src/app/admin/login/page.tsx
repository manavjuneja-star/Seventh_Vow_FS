"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import styles from "@/app/admin/admin.module.css";

type Step = "email" | "code";

export default function AdminLoginPage(): React.ReactElement {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const requestCode = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Always advance — the endpoint never reveals whether the email
      // matched, so this step can't be used to probe valid admin emails.
      setStep("code");
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) throw new Error("invalid");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("That code didn't work — check it and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.shell}>
      <div className={styles.main} style={{ maxWidth: 420, paddingTop: 80 }}>
        <h1 className={styles.h1} style={{ marginBottom: 8 }}>
          Studio admin
        </h1>
        <p className={styles.hint} style={{ marginBottom: 24 }}>
          Sign in with the studio&apos;s admin email — a one-time code will be sent to it.
        </p>

        {step === "email" ? (
          <form className={styles.form} onSubmit={requestCode}>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                required
                autoFocus
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="manavjuneja@theseventhvowweddings.com"
              />
            </label>
            <button type="submit" className={styles.btn} disabled={busy}>
              {busy ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={verifyCode}>
            <p className={styles.hint}>Code sent to {email}.</p>
            <label className={styles.field}>
              <span className={styles.label}>6-digit code</span>
              <input
                type="text"
                inputMode="numeric"
                required
                autoFocus
                maxLength={6}
                className={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.btnRow}>
              <button type="submit" className={styles.btn} disabled={busy}>
                {busy ? "Checking…" : "Sign in"}
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => setStep("email")}
              >
                Use a different email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
