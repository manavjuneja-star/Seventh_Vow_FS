import { About } from "@/components/About/About";
import { GuestBook } from "@/components/GuestBook/GuestBook";
import { Hero } from "@/components/Hero/Hero";
import { Instagram } from "@/components/Instagram/Instagram";
import { Portfolio } from "@/components/Portfolio/Portfolio";
import { Services } from "@/components/Services/Services";
import { FooterDivider } from "@/components/SiteFooter/SiteFooter";
import { Threshold } from "@/components/Threshold/Threshold";
import { Veil } from "@/components/Veil/Veil";
import { WhoWeAre } from "@/components/WhoWeAre/WhoWeAre";
import { Vows } from "@/components/Vows/Vows";

export const dynamic = "force-dynamic";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Veil />
      <Hero />
      <WhoWeAre />
      <About />
      <Services />
      <Portfolio />
      <Vows />
      <GuestBook />
      <Threshold />
      <Instagram />
      <FooterDivider />
    </>
  );
}
