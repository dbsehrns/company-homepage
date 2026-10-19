"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import LanguageSwitcher from "./LanguageSwitcher";
import PsiViewer from "./PsiViewer";
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

// Display meshes of each guide on its bone, without the engraved serial.
// viewFrom is the opening camera direction in model axes (+x patient left,
// +y superior, +z anterior).
const psiModels = [
  { id: "humerus", url: "/models/psi-humerus.glb", viewFrom: [-0.32, 0.34, 0.88] },
  { id: "glenoid", url: "/models/psi-glenoid.glb", viewFrom: [0.88, 0.34, 0.32] },
] as const;

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

const solutionCard = "grid items-center gap-6 rounded-2xl bg-black/60 p-6 lg:gap-8";
const solutionMedia = "lg:aspect-[16/11]";

function SolutionText({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div>
      <h3
        className="mb-5 px-5 py-2 text-3xl font-black text-black"
        style={{ backgroundColor: pointColor }}
      >
        {title}
      </h3>
      <p className="text-lg leading-8 text-gray-100">{description}</p>
      <DotList
        items={features}
        className="mt-5 space-y-2 text-sm leading-6 text-gray-200 md:text-base md:leading-7"
      />
    </div>
  );
}

// Bullets in the accent color; each dot is centred on its item's first line.
function DotList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="flex h-[1lh] shrink-0 items-center">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pointColor }} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MemberHeading({ role, name }: { role: string; name: string }) {
  return (
    <h4
      className="flex flex-wrap items-center gap-x-2 px-5 py-3 text-lg font-black text-black sm:text-xl lg:min-h-[4.5rem]"
      style={{ backgroundColor: pointColor }}
    >
      <span className="whitespace-nowrap">{role} |</span>
      <span className="whitespace-nowrap">{name}</span>
    </h4>
  );
}

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
  const rtptialSlides = rtptialImages.map((src, index) => ({
    src,
    alt: dict.solutions.rtptial.imageAlts[index],
  }));
  const psiViewerModels = psiModels.map((model) => ({
    ...model,
    label: dict.solutions.rtptial.viewer.models[model.id],
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

        {/* Wider than the other sections, so the text runs long beside a
            full-size 3D view. */}
        <div className="relative z-10 mx-auto max-w-[96rem]">
          <h2
            className="mb-10 text-right text-5xl font-black"
            style={{ color: pointColor }}
          >
            Solutions
          </h2>

          {/* lg: half and half. xl: the media keeps 600px and the text takes the
              rest. The media alternates sides, and comes first when stacked. */}
          <div className="space-y-8">
            <div
              className={`${solutionCard} lg:grid-cols-2 xl:grid-cols-[600px_minmax(0,1fr)]`}
              style={{ border: `1px solid ${pointColor}` }}
            >
              <PsiViewer
                models={psiViewerModels}
                fallback={rtptialSlides}
                accentColor={pointColor}
                labels={dict.solutions.rtptial.viewer}
                className={`aspect-square sm:aspect-[4/3] ${solutionMedia}`}
              />
              <SolutionText
                title="RTPtial-PSI"
                description={dict.solutions.rtptial.description}
                features={dict.solutions.rtptial.features}
              />
            </div>

            <div
              className={`${solutionCard} lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_600px]`}
              style={{ border: `1px solid ${pointColor}` }}
            >
              <ImageSlider
                slides={arthroSpacerSlides}
                accentColor={pointColor}
                labels={dict.slider}
                className={`media-stage aspect-[4/3] rounded-xl border border-white/10 lg:order-last ${solutionMedia}`}
              />
              <SolutionText
                title="ArthroSpacer"
                description={dict.solutions.arthroSpacer.description}
                features={dict.solutions.arthroSpacer.features}
              />
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

          {/* Below lg every portrait floats left of its list, magazine style, so
              phones and tablets don't stack a small photo over a long list. The
              photos are only ~240px wide, so they are never shown larger. */}
          <article
            className="overflow-hidden rounded-2xl bg-black/70 lg:grid lg:grid-cols-[340px_1fr]"
            style={{ border: `1px solid ${pointColor}` }}
          >
            <div className="hidden p-3 lg:block">
              <img
                src="/CEO-Profile.png"
                alt={`${ceo.role} ${ceo.name}`}
                className="h-full max-h-[440px] w-full rounded-xl object-cover object-top"
              />
            </div>

            <div>
              <h3
                className="px-5 py-3 text-2xl font-black text-black sm:px-6 sm:text-3xl"
                style={{ backgroundColor: pointColor }}
              >
                {ceo.role} | {ceo.name}
              </h3>

              <div className="flow-root p-5 sm:p-6">
                <img
                  src="/CEO-Profile.png"
                  alt={`${ceo.role} ${ceo.name}`}
                  className="float-left mb-3 mr-4 aspect-[4/5] w-28 rounded-lg object-cover object-top sm:mr-6 sm:w-44 lg:hidden"
                />
                <DotList
                  items={ceo.items}
                  className="space-y-1.5 text-sm leading-6 text-gray-100 md:text-base md:leading-7"
                />
              </div>
            </div>
          </article>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {mainTeamMembers.map(({ id, image }) => {
              const member = members[id];
              return (
                <article
                  key={id}
                  className="overflow-hidden rounded-2xl bg-black/70"
                  style={{ border: `1px solid ${pointColor}` }}
                >
                  <MemberHeading role={member.role} name={member.name} />

                  <div className="flow-root p-5">
                    <img
                      src={image}
                      alt={`${member.role} ${member.name}`}
                      className="float-left mb-3 mr-4 block aspect-[4/5] w-28 rounded-lg object-cover object-top sm:mr-6 sm:w-40 lg:float-none lg:mx-auto lg:mb-5 lg:w-44"
                    />
                    <DotList
                      items={member.items}
                      className="space-y-1.5 text-sm leading-6 text-gray-100 lg:text-[13px] lg:leading-5"
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subTeamMembers.map((id) => {
              const member = members[id];
              return (
                <article
                  key={id}
                  className="overflow-hidden rounded-2xl bg-black/70"
                  style={{ border: `1px solid ${pointColor}` }}
                >
                  <MemberHeading role={member.role} name={member.name} />
                  <DotList
                    items={member.items}
                    className="space-y-1.5 p-5 text-sm leading-6 text-gray-100"
                  />
                </article>
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
