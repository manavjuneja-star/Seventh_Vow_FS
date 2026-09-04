import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact-page/ContactDetails/ContactDetails";
import { ContactForm } from "@/components/contact-page/ContactForm/ContactForm";
import { ContactHero } from "@/components/contact-page/ContactHero/ContactHero";
import { NextSteps } from "@/components/contact-page/NextSteps/NextSteps";
import { Instagram } from "@/components/Instagram/Instagram";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact — The Seventh Vow Weddings",
  description:
    "Reach the studio directly — email, phone or the enquiry form. A real planner writes back within two working days.",
};

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <ContactHero />
      <section className={styles.board}>
        <div className={styles.grid}>
          <div className={styles.detailsWrap}>
            <ContactDetails />
          </div>
          <div data-reveal="0" className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
        <p className={styles.promise}>
          <span className={styles.promiseMark}>♥</span>
          However you reach us, we write back within two working days.
        </p>
      </section>
      <NextSteps />
      <div className={styles.instaWrap}>
        <Instagram />
      </div>
    </>
  );
}
