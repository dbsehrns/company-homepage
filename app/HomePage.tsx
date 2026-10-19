"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "./i18n/en";
import type { Locale } from "./i18n/locales";
import { restorePosition } from "./scrollPosition";

const heroImages = ["/Hero1.png", "/Hero2.png", "/Hero3.png"];
const pointColor = "rgb(190, 242, 100)";

type MemberId = keyof Dictionary["team"]["members"];

const mainTeamMembers: { id: MemberId; image: string }[] = [
  { id: "coo", image: "/COO-Profile.png" },
  { id: "cso", image: "/CSO-Profile.png" },
  { id: "cmo", image: "/CMO-Profile.png" },
];

const subTeamMembers: MemberId[] = ["qa", "hw", "sw", "intern"];

type OfficeId = "hq" | "rnd";

// Map queries stay in English for every locale: they are what geocodes.
const offices: { id: OfficeId; query: string }[] = [
  {
    id: "hq",
    // Address query: the institution name geocodes to the wrong district.
    query: "30 Badeurae 1-gil, Dong-gu, Ulsan, South Korea",
  },
  {
    id: "rnd",
    // Verified on Google Maps: the building is on Bangbaejungang-ro, not Bangbae-ro.
    query: "207-10 Bangbaejungang-ro, Seocho-gu, Seoul, South Korea",
  },
];

// Google Maps, labelled in the page's language. With NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
// set, the official Maps Embed API is used; without a key, the public embed URL is used.
const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

function mapEmbedUrl(query: string, locale: Locale) {
  const q = encodeURIComponent(query);
  return mapsEmbedKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsEmbedKey}&q=${q}&language=${locale}&zoom=16`
    : `https://www.google.com/maps?q=${q}&hl=${locale}&z=16&output=embed`;
}

function mapLinkUrl(query: string, locale: Locale) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&hl=${locale}`;
}

const rtptialImages = ["/RTPtial-PSI1.png", "/RTPtial-PSI2.png"];

// Alt texts come from the dictionary, in this order.
const arthroSpacerImages = [
  "/cannula-set-3.webp",
  "/cannula-set-3-side.webp",
  "/cannula-standing.webp",
  "/cannula-standing-side.webp",
  "/cannula-oblique.webp",
  "/cannula-lying-side.webp",
  "/cannula-detail-wings.webp",
  "/cannula-detail-instrument-port.webp",
  "/cannula-detail-collage.webp",
];

type HomePageProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function HomePage({ locale, dict }: HomePageProps) {
  const [currentHero, setCurrentHero] = useState(0);
  const [activeOffice, setActiveOffice] = useState<OfficeId>("hq");
  const activeOfficeInfo = offices.find((office) => office.id === activeOffice) ?? offices[0];
  const { ceo, members } = dict.team;
  const arthroSpacerSlides = arthroSpacerImages.map((src, index) => ({
    src,
    alt: dict.solutions.arthroSpacer.slideAlts[index],
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // After a language switch, reopen at the section the reader was on. Layout
  // effect, so the page never paints at the wrong position first.
  useLayoutEffect(() => {
    restorePosition();
  }, []);

  // The root layout is shared by every locale, so <html lang> is set here.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main lang={locale} className="min-h-screen bg-black text-white">
      <header
        className="fixed left-0 top-0 z-50 w-full border-b bg-white shadow-sm"
        style={{ borderColor: pointColor }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3">
          <a href="#home" className="flex shrink-0 items-center">
            <img
              src="/logo.svg"
              alt="EASO Easy Solution"
              className="hidden h-11 w-auto md:block"
            />
            <img
              src="/logo-compact.svg"
              alt="EASO"
              className="h-9 w-auto md:hidden"
            />
          </a>

          <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-bold text-black md:flex lg:gap-8">
            <a href="#about" className="hover:opacity-60">About Us</a>
            <a href="#solutions" className="hover:opacity-60">Solutions</a>
            <a href="#team" className="hover:opacity-60">Team</a>
            <a href="#contact" className="hover:opacity-60">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Hidden where the bar runs out of room: narrow phones, and tablets,
                where the nav already has a Contact link. */}
            <a
              href="#contact"
              className="hidden whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold text-black hover:opacity-80 sm:block md:hidden lg:block"
              style={{ backgroundColor: pointColor }}
            >
              {dict.contactButton}
            </a>

            <LanguageSwitcher current={locale} label={dict.languageLabel} accentColor={pointColor} />
          </div>
        </div>
      </header>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentHero ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-lg font-bold" style={{ color: pointColor }}>
              Precision Starts with Vision.
            </p>

            <h1
              className="mb-6 text-5xl font-black leading-tight md:text-7xl"
              style={{ color: pointColor }}
            >
              Improve Your Surgery
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-white md:text-xl">
              {dict.hero.lines[0]}
              <br />
              {dict.hero.lines[1]}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, index) => (
            <span
              key={index}
              className="h-2 w-8 rounded-full"
              style={{
                backgroundColor:
                  index === currentHero ? pointColor : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </section>

      <section id="about" className="relative overflow-hidden px-6 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/AboutUS_Back.png')" }}
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-black" style={{ color: pointColor }}>
            Redefining Precision Through AI
          </h2>

          <div className="max-w-4xl space-y-5 text-lg leading-9 text-gray-100">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-bold text-white">{dict.about.emphasis}</p>
          </div>
        </div>
      </section>

      <section id="solutions" className="relative overflow-hidden px-6 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/Solutions_Back.png')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2
            className="mb-10 text-right text-5xl font-black"
            style={{ color: pointColor }}
          >
            Solutions
          </h2>

          <div className="space-y-8">
            <div
              className="grid gap-6 rounded-2xl bg-black/60 p-6 md:grid-cols-[360px_1fr]"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <div className="grid grid-cols-2 gap-4">
                {rtptialImages.map((src, index) => (
                  <div key={src} className="flex items-center justify-center bg-black/50 p-4">
                    <img
                      src={src}
                      alt={dict.solutions.rtptial.imageAlts[index]}
                      className="max-h-52 object-contain"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3
                  className="mb-4 px-5 py-2 text-3xl font-black text-black"
                  style={{ backgroundColor: pointColor }}
                >
                  RTPtial-PSI
                </h3>
                <p className="text-lg leading-8 text-gray-100">
                  {dict.solutions.rtptial.description}
                </p>
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-200 md:text-base md:leading-7">
                  {dict.solutions.rtptial.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="grid gap-6 rounded-2xl bg-black/60 p-6 md:grid-cols-[360px_1fr]"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <ImageSlider
                slides={arthroSpacerSlides}
                accentColor={pointColor}
                labels={dict.slider}
                className="h-64 bg-black/50 md:h-auto md:min-h-[18rem]"
              />

              <div>
                <h3
                  className="mb-4 px-5 py-2 text-3xl font-black text-black"
                  style={{ backgroundColor: pointColor }}
                >
                  ArthroSpacer
                </h3>
                <p className="text-lg leading-8 text-gray-100">
                  {dict.solutions.arthroSpacer.description}
                </p>
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-200 md:text-base md:leading-7">
                  {dict.solutions.arthroSpacer.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative overflow-hidden bg-black px-6 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/AboutUS_Back.png')" }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="mb-8 text-5xl font-black" style={{ color: pointColor }}>
            Team
          </h2>

          <p className="mb-8 max-w-4xl text-lg leading-8 text-gray-100">
            {dict.team.intro}
          </p>

          <div className="grid gap-5 md:grid-cols-[360px_1fr]">
            <div
              className="rounded-lg bg-black/70 p-2"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <img
                src="/CEO-Profile.png"
                alt={`${ceo.role} ${ceo.name}`}
                className="h-full max-h-[420px] w-full rounded-md object-cover object-top"
              />
            </div>

            <div
              className="overflow-hidden rounded-lg bg-black/70"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <h3
                className="px-6 py-3 text-3xl font-black text-black"
                style={{ backgroundColor: pointColor }}
              >
                {ceo.role} | {ceo.name}
              </h3>

              <ul className="space-y-1 px-6 py-5 text-sm leading-6 text-gray-100 md:text-base md:leading-7">
                {ceo.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {mainTeamMembers.map(({ id, image }) => {
              const member = members[id];
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-lg bg-black/70"
                  style={{ border: `1px solid ${pointColor}` }}
                >
                  <h4
                    className="flex flex-wrap items-center gap-x-2 px-4 py-2 text-xl font-black text-black lg:min-h-[4.5rem]"
                    style={{ backgroundColor: pointColor }}
                  >
                    <span className="whitespace-nowrap">{member.role} |</span>
                    <span className="whitespace-nowrap">{member.name}</span>
                  </h4>

                  <div className="p-4">
                    <div className="mb-4 flex justify-center">
                      <img
                        src={image}
                        alt={`${member.role} ${member.name}`}
                        className="h-[250px] w-[210px] object-cover object-top"
                      />
                    </div>

                    <ul className="space-y-1 text-xs leading-5 text-gray-100">
                      {member.items.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {subTeamMembers.map((id) => {
              const member = members[id];
              return (
                <div
                  key={id}
                  className="overflow-hidden rounded-lg bg-black/70"
                  style={{ border: `1px solid ${pointColor}` }}
                >
                  <h4
                    className="flex flex-wrap items-center gap-x-2 px-4 py-2 text-xl font-black text-black lg:min-h-[4.5rem]"
                    style={{ backgroundColor: pointColor }}
                  >
                    <span className="whitespace-nowrap">{member.role} |</span>
                    <span className="whitespace-nowrap">{member.name}</span>
                  </h4>

                  <ul className="space-y-1 px-5 py-5 text-sm leading-6 text-gray-100">
                    {member.items.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-black px-6 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/AboutUS_Back.png')" }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2
            className="mb-14 text-6xl font-black"
            style={{ color: pointColor }}
          >
            Contact
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div
              className="flex flex-col overflow-hidden rounded-lg bg-black/70"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <div role="tablist" aria-label={dict.contact.officesLabel} className="flex">
                {offices.map((office) => {
                  const active = office.id === activeOffice;
                  return (
                    <button
                      key={office.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveOffice(office.id)}
                      className={`flex-1 px-4 py-3 text-sm font-bold transition-colors md:text-base ${
                        active ? "text-black" : "text-white hover:bg-white/10"
                      }`}
                      style={active ? { backgroundColor: pointColor } : undefined}
                    >
                      {dict.contact.offices[office.id].tab}
                    </button>
                  );
                })}
              </div>

              {offices.map((office) => (
                <iframe
                  key={office.id}
                  title={`${dict.contact.mapTitlePrefix}${dict.contact.offices[office.id].name}`}
                  src={mapEmbedUrl(office.query, locale)}
                  className={`${
                    office.id === activeOffice ? "block" : "hidden"
                  } h-[320px] w-full border-0 bg-white md:h-[460px]`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ))}

              <div className="flex flex-col gap-2 px-5 py-4 text-sm text-gray-200 md:flex-row md:items-center md:justify-between">
                <span>{dict.contact.offices[activeOfficeInfo.id].name}</span>
                <a
                  href={mapLinkUrl(activeOfficeInfo.query, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: pointColor }}
                >
                  {dict.contact.openInMaps}
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="rounded-lg bg-[#2f342f]/95 p-8 text-lg leading-8 text-white md:text-xl"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <p>
                  <span className="font-bold" style={{ color: pointColor }}>
                    {dict.contact.addresses.hq.label}
                  </span>{" "}
                  {dict.contact.addresses.hq.text}
                </p>
                <p className="mt-3">
                  <span className="font-bold" style={{ color: pointColor }}>
                    {dict.contact.addresses.rnd.label}
                  </span>{" "}
                  {dict.contact.addresses.rnd.text}
                </p>
                <div className="mt-5 space-y-1">
                  {dict.contact.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div
                className="rounded-lg bg-[#2f342f]/95 p-8 text-lg leading-8 text-white md:text-xl"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <p className="font-bold" style={{ color: pointColor }}>
                  {dict.contact.careers.heading}
                </p>
                {dict.contact.careers.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="border-t bg-black px-6 py-8 text-center text-sm text-gray-400"
        style={{ borderColor: pointColor }}
      >
        © 2026 EASO Co. Ltd. All rights reserved.
      </footer>
    </main>
  );
}
