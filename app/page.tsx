"use client";

import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";

const heroImages = ["/Hero1.png", "/Hero2.png", "/Hero3.png"];
const pointColor = "rgb(190, 242, 100)";

const ceoProfile = [
  "Ph.D. in Biomedical Engineering, College of Medicine, The Catholic University of Korea",
  "CEO, EASO Co. Ltd.",
  "Adjunct Professor, Department of Integrative Medicine, Yonsei University College of Medicine",
  "Former Deputy CEO, Chief Technology Officer, and Head of Quality, KAVILAB Co. Ltd. (exited)",
  "Former Industry Professor, Micro-degree College, Shinhan University",
  "Former Clinical Assistant Professor and Medical Physicist, Proton Therapy Pte. Ltd., Singapore",
  "Former Medical Physics Intern, Nagoya Proton Therapy Center, Japan",
  "Former Part-Time Lecturer, Kindai University Hospital, Japan",
  "Former Research Assistant Professor, College of Medicine, The Catholic University of Korea",
  "Former Collaborating Researcher, MIPS, Stanford University, USA",
  "Former Collaborating Researcher, BMEGG, University of California, Davis, USA",
];

const mainTeamMembers = [
  {
    role: "COO / Deputy CEO",
    name: "Moo-Sub Kim, Ph.D.",
    image: "/COO-Profile.png",
    items: [
      "Ph.D. in Biomedical Engineering, College of Medicine, The Catholic University of Korea",
      "Deputy CEO / COO, EASO Co. Ltd.",
      "Former Deputy CEO / COO, KAVILAB Co. Ltd. (exit completed)",
      "Former Adjunct Professor, Department of Integrative Medicine, Yonsei University College of Medicine",
      "Former Industry Professor, Shinhan University",
      "Former Biomedical Engineering Researcher, The Catholic University of Korea",
      "Former Medical Device Researcher, Seoul St. Mary’s Hospital",
      "12 years in medical device R&D",
      "SCI papers & licensed patents",
      "PI, multiple government-funded R&D projects",
    ],
  },
  {
    role: "CSO / Director",
    name: "Hyeonjoo Kim, M.S.",
    image: "/CSO-Profile.png",
    items: [
      "M.S. in Regulatory Affairs, Yonsei University College of Medicine",
      "CSO, EASO Co. Ltd.",
      "Former RA/QA Head, KAVILAB Co. Ltd.",
      "Former RA/QA, Medical IP Co. Ltd.",
      "10 years in RA/QA",
      "Business planning for AI-based digital medical products in medical imaging",
      "Domestic and global market-entry and business strategy",
      "Korean Class I-III device approvals; Global RA: FDA / CE MDR",
      "ISO 13485 / MDSAP-based QMS setup & operation",
      "GMP / DGMP certification, internal audits, and PMS",
      "Clinical & performance study design",
    ],
  },
  {
    role: "CMO / Director",
    name: "Young Dae Jeon, M.D., Ph.D.",
    image: "/CMO-Profile.png",
    items: [
      "Ph.D. in Orthopaedic Surgery, University of Ulsan College of Medicine",
      "CMO, EASO Co. Ltd.",
      "Assistant Professor, Department of Orthopaedic Surgery, University of Ulsan College of Medicine",
      "Former CMO, KAVILAB Co. Ltd.",
      "Former Shoulder & Elbow Fellow, Seoul National University Bundang Hospital",
      "International Exchange Committee, Korean Arthroscopy Society",
      "Scientific Committee, Korean Shoulder & Elbow Society",
      "Certified Orthopaedic Sports Specialist",
      "Scientific Committee, Shoulder & Elbow, Asia Pacific Orthopaedic Association",
      "Editorial Operations Secretary, Korean Shoulder & Elbow Society",
    ],
  },
];

const subTeamMembers = [
  {
    role: "QA Engineer",
    name: "Da-Youn Lee",
    items: [
      "B.S. in Multimedia, Seoul Women’s University",
      "QA Engineer, EASO Co. Ltd.",
      "Former Data Quality Team Lead, KAVILAB Co. Ltd.",
      "Former Data Manager, Data Science Team, Medical IP Co. Ltd.",
      "Medical image data & annotation",
      "Database setup & quality control",
    ],
  },
  {
    role: "HW Engineer",
    name: "Beom-Su Kim",
    items: [
      "A.S. in Healthcare 3D Printing, Dongnam Health University",
      "HW Engineer, EASO Co. Ltd.",
      "Former Tech Support Team Lead, KAVILAB Co. Ltd.",
      "3D-printed device design & fabrication",
      "Equipment operation & tech support",
      "Production QA",
    ],
  },
  {
    role: "SW/AI Engineer",
    name: "Jungho Uh",
    items: [
      "B.S. in Computer Engineering, Hoseo University",
      "SW/AI Engineer, EASO Co. Ltd.",
      "Former SW/AI Engineer, KAVILAB Co. Ltd.",
      "Medical AI software development",
      "IT system operation",
      "AI-driven automated design platforms",
    ],
  },
  {
    role: "Intern",
    name: "JoongHoon Shin",
    items: [
      "B.S. in Software Technology, Konkuk University",
      "Intern, EASO Co. Ltd.",
      "Medical AI software development",
      "IT system operation",
      "AI-driven automated design platforms",
    ],
  },
];

type OfficeId = "hq" | "rnd";

const offices: { id: OfficeId; tab: string; name: string; query: string }[] = [
  {
    id: "hq",
    tab: "HQ · Ulsan",
    name: "EASO Headquarters, University of Ulsan College of Medicine",
    // Address query: the institution name geocodes to the wrong district.
    query: "30 Badeurae 1-gil, Dong-gu, Ulsan, South Korea",
  },
  {
    id: "rnd",
    tab: "R&D Center · Seoul",
    name: "EASO R&D Center, Bangbae-AcroRiver Bldg 104",
    // Verified on Google Maps: the building is on Bangbaejungang-ro, not Bangbae-ro.
    query: "207-10 Bangbaejungang-ro, Seocho-gu, Seoul, South Korea",
  },
];

// Google Maps, English labels. With NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY set, the
// official Maps Embed API is used; without a key, the public embed URL is used.
const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

function mapEmbedUrl(query: string) {
  const q = encodeURIComponent(query);
  return mapsEmbedKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsEmbedKey}&q=${q}&language=en&zoom=16`
    : `https://www.google.com/maps?q=${q}&hl=en&z=16&output=embed`;
}

function mapLinkUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&hl=en`;
}

const rtptialFeatures = [
  "Humeral head resection PSI, printed in resin or metal",
  "Upload images, one-click design, final PSI in under 3 minutes",
  "Automatic retroversion in 0.1° steps with canal entry axis guide",
  "Simple, rigid saw guide with built-in fixation pin guides",
  "Web-based, no installation: review, print, automated fabrication",
];

const arthroSpacerSlides = [
  { src: "/cannula-set-3.webp", alt: "ArthroSpacer hybrid cannulas, set of three" },
  { src: "/cannula-set-3-side.webp", alt: "ArthroSpacer hybrid cannulas, side view" },
  { src: "/cannula-standing.webp", alt: "ArthroSpacer cannula, standing" },
  { src: "/cannula-standing-side.webp", alt: "ArthroSpacer cannula, standing side view" },
  { src: "/cannula-oblique.webp", alt: "ArthroSpacer cannula, oblique view" },
  { src: "/cannula-lying-side.webp", alt: "ArthroSpacer cannula, lying side view" },
  { src: "/cannula-detail-wings.webp", alt: "ArthroSpacer cannula, multi-wing detail" },
  { src: "/cannula-detail-instrument-port.webp", alt: "ArthroSpacer cannula, instrument port detail" },
  { src: "/cannula-detail-collage.webp", alt: "ArthroSpacer cannula, detail collage" },
];

const arthroSpacerFeatures = [
  "Ring-tie fixation for a secure hold and less dislodgement",
  "Multi-wing tissue retraction",
  "Dual seals prevent fluid leakage",
  "Wider lumen prevents suture tangles",
  "Arrowhead tip and tuned silicone hardness for easy insertion with less tissue trauma",
];

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [activeOffice, setActiveOffice] = useState<OfficeId>("hq");
  const activeOfficeInfo = offices.find((office) => office.id === activeOffice) ?? offices[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <header
        className="fixed left-0 top-0 z-50 w-full border-b bg-white shadow-sm"
        style={{ borderColor: pointColor }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#home" className="flex items-center">
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

          <nav className="hidden items-center gap-8 text-sm font-bold text-black md:flex">
            <a href="#about" className="hover:opacity-60">About Us</a>
            <a href="#solutions" className="hover:opacity-60">Solutions</a>
            <a href="#team" className="hover:opacity-60">Team</a>
            <a href="#contact" className="hover:opacity-60">Contact</a>
          </nav>

          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-xs font-bold text-black hover:opacity-80"
            style={{ backgroundColor: pointColor }}
          >
            Contact Us
          </a>
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
              Driving AX transformation and smart manufacturing for precision
              orthopedic surgery.
              <br />
              Our intelligent AI systems augment surgeons&apos; capabilities and
              eliminate uncertainty.
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
            <p>
              EASO Co. Ltd. builds intelligent systems that redefine how
              precision medicine is practiced.
            </p>
            <p>
              Through advanced AI, we turn complex, manual workflows into
              automated processes that deliver accuracy, consistency, and
              efficiency.
            </p>
            <p className="font-bold text-white">
              We don&apos;t just improve the process. We redefine it with AI.
            </p>
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
                <div className="flex items-center justify-center bg-black/50 p-4">
                  <img src="/RTPtial-PSI1.png" alt="RTPtial PSI 1" className="max-h-52 object-contain" />
                </div>
                <div className="flex items-center justify-center bg-black/50 p-4">
                  <img src="/RTPtial-PSI2.png" alt="RTPtial PSI 2" className="max-h-52 object-contain" />
                </div>
              </div>

              <div>
                <h3
                  className="mb-4 px-5 py-2 text-3xl font-black text-black"
                  style={{ backgroundColor: pointColor }}
                >
                  RTPtial-PSI
                </h3>
                <p className="text-lg leading-8 text-gray-100">
                  RTPtial-PSI is an AI-based, fully automated design and
                  fabrication platform for 3D-printed patient-specific
                  instruments (PSI) in total joint arthroplasty. It gives
                  surgeons consistent outcomes and reduces risk in the most
                  critical steps of surgery.
                </p>
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-200 md:text-base md:leading-7">
                  {rtptialFeatures.map((feature) => (
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
                  ArthroSpacer is a clinical data-based hybrid cannula for
                  arthroscopy, redesigned to hold securely throughout surgery
                  and minimize fluid leakage. It keeps the surgical field clear
                  for a more efficient and reliable arthroscopic experience.
                </p>
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-200 md:text-base md:leading-7">
                  {arthroSpacerFeatures.map((feature) => (
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
            A team of core members and hands-on experts who have worked together
            at a previous company across the entire medical device lifecycle,
            from development and regulatory approval to clinical validation and
            commercialization.
          </p>

          <div className="grid gap-5 md:grid-cols-[360px_1fr]">
            <div
              className="rounded-lg bg-black/70 p-2"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <img
                src="/CEO-Profile.png"
                alt="CEO Louis Youn"
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
                CEO | <span className="text-white">Louis Youn, Ph.D.</span>
              </h3>

              <ul className="space-y-1 px-6 py-5 text-sm leading-6 text-gray-100 md:text-base md:leading-7">
                {ceoProfile.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {mainTeamMembers.map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="overflow-hidden rounded-lg bg-black/70"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <h4
                  className="flex flex-wrap items-center gap-x-2 px-4 py-2 text-xl font-black text-black lg:min-h-[4.5rem]"
                  style={{ backgroundColor: pointColor }}
                >
                  <span className="whitespace-nowrap">{member.role} |</span>
                  <span className="whitespace-nowrap text-white">{member.name}</span>
                </h4>

                <div className="p-4">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={member.image}
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
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {subTeamMembers.map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="overflow-hidden rounded-lg bg-black/70"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <h4
                  className="flex flex-wrap items-center gap-x-2 px-4 py-2 text-xl font-black text-black lg:min-h-[4.5rem]"
                  style={{ backgroundColor: pointColor }}
                >
                  <span className="whitespace-nowrap">{member.role} |</span>
                  <span className="whitespace-nowrap text-white">{member.name}</span>
                </h4>

                <ul className="space-y-1 px-5 py-5 text-sm leading-6 text-gray-100">
                  {member.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
              <div role="tablist" aria-label="EASO offices" className="flex">
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
                      {office.tab}
                    </button>
                  );
                })}
              </div>

              {offices.map((office) => (
                <iframe
                  key={office.id}
                  title={`Google Map: ${office.name}`}
                  src={mapEmbedUrl(office.query)}
                  className={`${
                    office.id === activeOffice ? "block" : "hidden"
                  } h-[320px] w-full border-0 bg-white md:h-[460px]`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ))}

              <div className="flex flex-col gap-2 px-5 py-4 text-sm text-gray-200 md:flex-row md:items-center md:justify-between">
                <span>{activeOfficeInfo.name}</span>
                <a
                  href={mapLinkUrl(activeOfficeInfo.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: pointColor }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="rounded-lg bg-[#2f342f]/95 p-8 text-lg leading-8 text-white md:text-xl"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <p>
                  <span className="font-bold" style={{ color: pointColor }}>HQ</span>{" "}
                  #301-1, College of Medicine, University of Ulsan, 30 Badeurae
                  1-gil, Dong-gu, Ulsan, Republic of Korea
                </p>
                <p className="mt-3">
                  <span className="font-bold" style={{ color: pointColor }}>R&amp;D</span>{" "}
                  Bldg 104, #B107, Bangbae-AcroRiver, 207-10 Bangbaejungang-ro,
                  Seocho-gu, Seoul, Republic of Korea
                </p>
                <div className="mt-5 space-y-1">
                  <p>Tel: +82-70-4077-0601</p>
                  <p>Mobile: +82-10-3115-3758</p>
                  <p>Fax: +82-70-7507-6666</p>
                  <p>Email: louis@easo.co.kr</p>
                  <p>Web: easo.co.kr</p>
                </div>
              </div>

              <div
                className="rounded-lg bg-[#2f342f]/95 p-8 text-lg leading-8 text-white md:text-xl"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <p className="font-bold" style={{ color: pointColor }}>
                  Careers (Rolling Recruitment)
                </p>
                <p>
                  Positions: QA / HW / SW / Data Engineer
                  &#40;medical device experience preferred&#41;
                </p>
                <p>Responsibilities: Assigned by position according to experience and skills</p>
                <p>Requirements: Open to all education levels and career stages</p>
                <p>Salary: Negotiable</p>
                <p>Working hours: Mon-Fri, 9:00-18:00</p>
                <p>Process: Document screening, 1st interview, 2nd interview, offer</p>
                <p>Documents: Resume and portfolio &#40;free format&#41;</p>
                <p>How to apply: Email to louis@easo.co.kr</p>
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
