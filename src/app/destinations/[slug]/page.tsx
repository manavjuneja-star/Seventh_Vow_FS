import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { VenuesGrid } from "@/components/destinations-page/VenuesGrid/VenuesGrid";
import { WeatherDiagram } from "@/components/destinations-page/WeatherDiagram/WeatherDiagram";
import { getDestination, getDestinations } from "@/lib/destinations";

import styles from "./page.module.css";

type DestinationPageProps = { params: { slug: string } };

export function generateStaticParams(): Array<{ slug: string }> {
  return getDestinations().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: DestinationPageProps): Metadata {
  const destination = getDestination(params.slug);
  if (!destination) return { title: "Destinations — The Seventh Vow Weddings" };
  return {
    title: `${destination.name} — The Seventh Vow Weddings`,
    description: destination.blurb,
  };
}

export default function DestinationPage({
  params,
}: DestinationPageProps): React.ReactElement {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  const hasVenues = Boolean(destination.venues && destination.venues.length > 0);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.bg} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={destination.image} alt="" />
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.inner}>
          <Link href="/destinations" className={styles.back}>
            ← All destinations
          </Link>
          <span className={styles.eyebrow}>{destination.region}</span>
          <h1 className={styles.title}>{destination.name}</h1>
          <p className={styles.sub}>{destination.blurb}</p>
        </div>

        <svg
          className={styles.wave}
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,18 C240,64 480,0 720,26 C960,54 1200,8 1440,32 L1440,64 L0,64 Z"
            fill="var(--blush)"
            opacity="0.97"
          />
        </svg>
      </section>

      {destination.whyChoose && destination.whyChoose.length > 0 && (
        <section className={styles.why}>
          <div className={styles.whyInner}>
            <span className={styles.whyMark} aria-hidden="true">
              &#10098;
            </span>
            <span className={styles.venuesEyebrow}>Why choose {destination.name}</span>
            {destination.whyChoose.map((para, i) => (
              <p key={i} className={styles.whyPara}>
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      <section className={styles.venues}>
        <div className={styles.venuesInner}>
          <span className={styles.venuesEyebrow}>Venues &amp; Stays</span>
          <h2 className={styles.venuesHeading}>
            The palaces, villas and resorts we work with in {destination.name}
          </h2>

          {hasVenues ? (
            <>
              <p className={styles.venuesNote}>
                A studio-curated shortlist — each partnered independently and vetted
                for how well it stages a wedding, not just a stay.
              </p>
              <div className={styles.venuesGridWrap}>
                <VenuesGrid venues={destination.venues ?? []} />
              </div>
            </>
          ) : (
            <p className={styles.venuesNote}>
              This list is being put together with the studio&apos;s partners.
              In the meantime, tell us the celebration you have in mind and we
              will send the shortlist that fits it.
            </p>
          )}

          <a data-enquiry-open="1" href="#enquiry" className={styles.venuesCta}>
            Begin an enquiry
          </a>
        </div>
      </section>

      {destination.weather && (
        <section className={styles.weather}>
          <div className={styles.weatherInner}>
            <span className={styles.venuesEyebrow}>Best time to marry here</span>
            <h2 className={styles.venuesHeading}>{destination.weather.bestWindow}</h2>
            <p className={styles.venuesNote}>{destination.weather.summary}</p>
            <div className={styles.weatherDiagramWrap}>
              <WeatherDiagram weather={destination.weather} />
              <div className={styles.weatherLegend}>
                <span className={styles.legendItem}>
                  <span className={styles.legendSwatchLine} /> Average daytime temp
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendSwatchBar} /> Relative rainfall
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
