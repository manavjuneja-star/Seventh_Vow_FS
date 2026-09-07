import type { Metadata, Viewport } from "next";

import { EnquiryModal } from "@/components/EnquiryModal/EnquiryModal";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SupportScripts } from "@/components/SupportScripts/SupportScripts";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;if(sessionStorage.getItem('svVeilShown')){d.setAttribute('data-veil-seen','')}else if(location.pathname==='/'){d.classList.add('sv-veil-active')}}catch(e){}",
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <EnquiryModal />
        <SupportScripts />
      </body>
    </html>
  );
}
