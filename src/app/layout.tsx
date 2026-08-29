import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "The Seventh Vow Weddings — Bespoke Wedding Design House",
  description:
    "A bespoke wedding design house crafting cinematic, deeply personal celebrations, one union at a time, never repeated twice.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
