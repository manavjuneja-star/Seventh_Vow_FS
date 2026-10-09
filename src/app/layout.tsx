import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { EnquiryModal } from "@/components/EnquiryModal/EnquiryModal";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { JsonLd } from "@/components/Seo/JsonLd";
import { SupportScripts } from "@/components/SupportScripts/SupportScripts";
import { SITE, SITE_URL } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";

import "@/styles/globals.css";

const GA_ID = "G-H2P26F99YF";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wedding Planners in India | The Seventh Vow Weddings",
    template: "%s | The Seventh Vow Weddings",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE.name,
    title: "Wedding Planners in India | The Seventh Vow Weddings",
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "The Seventh Vow Weddings, wedding planners in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Planners in India | The Seventh Vow Weddings",
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "wedding planning",
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
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
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
