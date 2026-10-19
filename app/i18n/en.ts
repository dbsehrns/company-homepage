// English is the reference dictionary: ko and ja must match its shape.
const en = {
  meta: {
    title: "EASO | Easy Solution",
    description:
      "Driving AX Transformation and Smart Manufacturing for Precision Orthopedic Surgery. AI-based patient-specific instrument (PSI) design platform and hybrid arthroscopic cannula by EASO Co. Ltd.",
  },
  languageLabel: "Language",
  contactButton: "Contact Us",
  hero: {
    lines: [
      "Driving AX transformation and smart manufacturing for precision orthopedic surgery.",
      "Our intelligent AI systems augment surgeons' capabilities and eliminate uncertainty.",
    ],
  },
  about: {
    paragraphs: [
      "EASO Co. Ltd. builds intelligent systems that redefine how precision medicine is practiced.",
      "Through advanced AI, we turn complex, manual workflows into automated processes that deliver accuracy, consistency, and efficiency.",
    ],
    emphasis: "We don't just improve the process. We redefine it with AI.",
  },
  solutions: {
    rtptial: {
      // Photos shown when the 3D viewer can't run.
      imageAlts: ["RTPtial PSI 1", "RTPtial PSI 2"],
      viewer: {
        label: "Interactive 3D view of RTPtial-PSI guides",
        models: { humerus: "Humeral PSI", glenoid: "Glenoid PSI" },
        loading: "Loading 3D model…",
        hintRotate: "Drag to rotate",
        hintClickZoom: "Click, then scroll to zoom",
        hintScroll: "Scroll to zoom",
        hintPinch: "Pinch to zoom",
        tapToExplore: "Tap to explore in 3D",
        done: "Done",
        bone: "Show bone",
        reset: "Reset view",
        expand: "Full screen",
        collapse: "Exit full screen",
      },
      description:
        "RTPtial-PSI is an AI-based, fully automated design and fabrication platform for 3D-printed patient-specific instruments (PSI) in total joint arthroplasty. It gives surgeons consistent outcomes and reduces risk in the most critical steps of surgery.",
      features: [
        "Humeral head resection PSI, printed in resin or metal",
        "Upload images, one-click design, final PSI in under 3 minutes",
        "Automatic retroversion in 0.1° steps with canal entry axis guide",
        "Simple, rigid saw guide with built-in fixation pin guides",
        "Web-based, no installation: review, print, automated fabrication",
      ],
    },
    arthroSpacer: {
      // Same order as the photos in HomePage.
      slideAlts: [
        "ArthroSpacer hybrid cannulas, set of three",
        "ArthroSpacer hybrid cannulas, side view",
        "ArthroSpacer cannula, standing",
        "ArthroSpacer cannula, standing side view",
        "ArthroSpacer cannula, oblique view",
        "ArthroSpacer cannula, lying side view",
        "ArthroSpacer cannula, multi-wing detail",
        "ArthroSpacer cannula, instrument port detail",
        "ArthroSpacer cannula, detail collage",
      ],
      description:
        "ArthroSpacer is a clinical data-based hybrid cannula for arthroscopy, redesigned to hold securely throughout surgery and minimize fluid leakage. It keeps the surgical field clear for a more efficient and reliable arthroscopic experience.",
      features: [
        "Ring-tie fixation for a secure hold and less dislodgement",
        "Multi-wing tissue retraction",
        "Dual seals prevent fluid leakage",
        "Wider lumen prevents suture tangles",
        "Arrowhead tip and tuned silicone hardness for easy insertion with less tissue trauma",
      ],
    },
  },
  slider: {
    previous: "Previous image",
    next: "Next image",
    show: "Show image {n} of {total}",
  },
  team: {
    intro:
      "A team of core members and hands-on experts who have worked together at a previous company across the entire medical device lifecycle, from development and regulatory approval to clinical validation and commercialization.",
    ceo: {
      role: "CEO",
      name: "Louis Youn, Ph.D.",
      items: [
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
      ],
    },
    members: {
      coo: {
        role: "COO / Deputy CEO",
        name: "Moo-Sub Kim, Ph.D.",
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
      cso: {
        role: "CSO / Director",
        name: "Hyeonjoo Kim, M.S.",
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
      cmo: {
        role: "CMO / Director",
        name: "Young Dae Jeon, M.D., Ph.D.",
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
      qa: {
        role: "QA Engineer",
        name: "Da-Young Lee",
        items: [
          "B.S. in Multimedia, Seoul Women’s University",
          "QA Engineer, EASO Co. Ltd.",
          "Former Data Quality Team Lead, KAVILAB Co. Ltd.",
          "Former Data Manager, Data Science Team, Medical IP Co. Ltd.",
          "Medical image data & annotation",
          "Database setup & quality control",
        ],
      },
      hw: {
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
      sw: {
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
      intern: {
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
    },
  },
  contact: {
    officesLabel: "EASO offices",
    offices: {
      hq: {
        tab: "HQ · Ulsan",
        name: "EASO Headquarters, University of Ulsan College of Medicine",
      },
      rnd: {
        tab: "R&D Center · Seoul",
        name: "EASO R&D Center, Bangbae-AcroRiver Bldg 104",
      },
    },
    mapTitlePrefix: "Google Map: ",
    openInMaps: "Open in Google Maps",
    addresses: {
      hq: {
        label: "HQ",
        text: "#301-1, College of Medicine, University of Ulsan, 30 Badeurae 1-gil, Dong-gu, Ulsan, Republic of Korea",
      },
      rnd: {
        label: "R&D",
        text: "Bldg 104, #B107, Bangbae-AcroRiver, 207-10 Bangbaejungang-ro, Seocho-gu, Seoul, Republic of Korea",
      },
    },
    lines: [
      "Tel: +82-70-4077-0601",
      "Mobile: +82-10-3115-3758",
      "Fax: +82-70-7507-6666",
      "Email: louis@easo.co.kr",
      "Web: easo.co.kr",
    ],
    careers: {
      heading: "Careers (Rolling Recruitment)",
      lines: [
        "Positions: QA / HW / SW / Data Engineer (medical device experience preferred)",
        "Responsibilities: Assigned by position according to experience and skills",
        "Requirements: Open to all education levels and career stages",
        "Salary: Negotiable",
        "Working hours: Mon-Fri, 9:00-18:00",
        "Process: Document screening, 1st interview, 2nd interview, offer",
        "Documents: Resume and portfolio (free format)",
        "How to apply: Email to louis@easo.co.kr",
      ],
    },
  },
};

export type Dictionary = typeof en;

export default en;
