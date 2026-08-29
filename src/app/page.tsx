import { About } from "@/components/About/About";
import { EnquiryModal } from "@/components/EnquiryModal/EnquiryModal";
import { GuestBook } from "@/components/GuestBook/GuestBook";
import { Hero } from "@/components/Hero/Hero";
import { Instagram } from "@/components/Instagram/Instagram";
import { Portfolio } from "@/components/Portfolio/Portfolio";
import { Services } from "@/components/Services/Services";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SupportScripts } from "@/components/SupportScripts/SupportScripts";
import { Threshold } from "@/components/Threshold/Threshold";
import { Veil } from "@/components/Veil/Veil";
import { Vows } from "@/components/Vows/Vows";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Veil />
      <SiteHeader />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Vows />
      <GuestBook />
      <Threshold />
      <Instagram />
      <SiteFooter />
      <EnquiryModal />
      <SupportScripts />
    </>
  );
}
