"use client";

import { useEffect, useState } from "react";

const heroImages = ["/Hero1.png", "/Hero2.png", "/Hero3.png"];
const pointColor = "rgb(190, 242, 100)";

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);

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
            <img src="/LOGO.png" alt="EASO logo" className="h-9 w-auto" />
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
            문의하기
          </a>
        </div>
      </header>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentHero ? "opacity-100" : "opacity-0"
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
              Easy Solution을 통해 정밀의료의 미래를 선도합니다.
              <br />
              지능형 AI 시스템이 인간의 역량을 강화하고 불확실성을 제거합니다.
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
              주식회사 이소는 정밀의료의 방식을 재정의하는 지능형 시스템을
              구축합니다.
            </p>
            <p>
              첨단 AI를 통해 복잡하고 수동적인 워크플로우를 자동화된 프로세스로
              전환하여 정확성, 일관성, 효율성을 실현합니다.
            </p>
            <p className="font-bold text-white">
              단순히 프로세스를 개선하는 것이 아닙니다. AI를 통해 프로세스를
              재정의합니다.
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
                  RTPtial-PSI는 인공관절전치환술을 위한 환자 맞춤형 수술
                  가이드 설계를 자동화하는 3D 프린팅 기반 AI 시스템입니다.
                  이를 통해 전문의는 일관된 수술 결과를 얻고, 중요한 수술
                  과정의 위험을 줄일 수 있습니다.
                </p>
              </div>
            </div>

            <div
              className="grid gap-6 rounded-2xl bg-black/60 p-6 md:grid-cols-[360px_1fr]"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <div className="flex items-center justify-center bg-black/50 p-4">
                <img src="/ArthroSpacer1.png" alt="ArthroSpacer" className="max-h-64 object-contain" />
              </div>

              <div>
                <h3
                  className="mb-4 px-5 py-2 text-3xl font-black text-black"
                  style={{ backgroundColor: pointColor }}
                >
                  ArthroSpacer
                </h3>
                <p className="text-lg leading-8 text-gray-100">
                  ArthroSpacer는 수술 중 안정적인 고정을 유지하고 체액 누출을
                  최소화하도록 재설계된 관절경 캐뉼라입니다. 깨끗한 수술 시야를
                  확보하고 더욱 효율적이고 신뢰할 수 있는 관절경 수술 경험을
                  제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative overflow-hidden bg-black px-6 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/AboutUS_Back.png')" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="mb-10 text-5xl font-black" style={{ color: pointColor }}>
            Team
          </h2>

          <div className="grid gap-6 md:grid-cols-[360px_1fr]">
            <div
              className="rounded-xl bg-black/70 p-4"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <img
                src="/CEO-Profile.png"
                alt="CEO Louis Youn"
                className="h-full max-h-[520px] w-full rounded-lg object-cover object-top"
              />
            </div>

            <div
              className="rounded-xl bg-black/70 p-6"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <h3
                className="mb-5 px-5 py-2 text-3xl font-black text-black"
                style={{ backgroundColor: pointColor }}
              >
                CEO | Louis Youn
              </h3>
              <ul className="space-y-1 text-sm leading-6 text-gray-100 md:text-base md:leading-7">
                <li>- 가톨릭대학교 의과대학 의공학 박사</li>
                <li>- 현 주식회사 이소 대표이사</li>
                <li>- 현 연세대학교 의과대학 융합의학과 겸임교수</li>
                <li>- 전 주식회사 카비랩 부대표 / 최고기술책임자 / 품질책임자</li>
                <li>- 전 신한대학교 마이크로디그리대학 기업전문교수</li>
                <li>- 전 싱가포르 Proton Therapy Pte. Ltd. 임상조교수 & 의학물리학자</li>
                <li>- 전 일본 Nagoya Proton Therapy Center 인턴 의학물리학자</li>
                <li>- 전 일본 Kindai University Hospital 파트타임 강사</li>
                <li>- 전 가톨릭대학교 의과대학 연구조교수</li>
                <li>- 전 미국 Stanford University MIPS 연구소 Collaboration Researcher</li>
                <li>- 전 미국 UC DAVIS BMEGG 연구소 Collaboration Researcher</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                role: "부대표/COO",
                name: "김무섭",
                items: [
                  "가톨릭대학교 의과대학 의공학 박사",
                  "현 주식회사 이소 부대표 / 공장장 / 최고운영책임자",
                  "전 주식회사 카비랩 부대표 / 최고운영책임자",
                  "전 연세대학교 의과대학 융합의학과 겸임교수",
                  "전 신한대학교 마이크로디그리대학 기업전문교수",
                  "전 가톨릭대학교 의과대학 생체의공학연구소 연구원",
                  "전 서울성모병원 정형외과 전임연구원",
                  "의료기기 연구개발 경력 10년",
                  "다수의 SCI 논문 게재 및 특허 등록",
                  "정부지원 R&D 사업 연구책임자 자격 수주 다수",
                ],
              },
              {
                role: "CSO",
                name: "김현주",
                items: [
                  "연세대학교 의과대학 의료기기산업학 석사",
                  "현 주식회사 이소 최고전략책임자",
                  "전 주식회사 카비랩 RA/QA 팀장",
                  "전 Medical IP RA/QA",
                  "GMP / DGMP 인증 경험",
                  "의료기기 품목허가 1, 2, 3등급 허가 자체 수행",
                  "FDA, CE MDR 등 글로벌 인허가 전주기 수행",
                  "의료기기 임상시험 및 성능평가 설계·수행",
                  "ISO 13485 및 MDSAP 기반 QMS 구축 및 운영",
                  "GMP·내부감사·PMS 관리 경험",
                ],
              },
              {
                role: "CMO",
                name: "전영대",
                items: [
                  "울산대학교 의과대학 정형외과학 박사",
                  "현 주식회사 이소 최고의료책임자",
                  "현 울산대학교 의과대학 정형외과학교실 조교수",
                  "전 주식회사 카비랩 최고의료책임자",
                  "전 분당서울대학교병원 정형외과 견관절 전임의",
                  "대한견주관절의학회 국제협력위원회 위원",
                  "대한관절경학회 학술위원회 위원",
                  "대한정형외과스포츠의학회 보험위원",
                  "아시아·태평양 정형외과 수부상지학회 학술위원회 위원",
                  "대한정형외과학회 학회지 편집운영위원회 간사",
                ],
              },
              {
                role: "QA Engineer",
                name: "이다영",
                items: [
                  "서울여자대학교 멀티미디어학사",
                  "현 주식회사 이소 QA Engineer",
                  "전 주식회사 카비랩 데이터팀장",
                  "전 메디컬아이피 MCC팀 데이터관리자",
                ],
              },
              {
                role: "HW Engineer",
                name: "김범수",
                items: [
                  "동남보건대학교 보건3D프린팅융합 전문학사",
                  "현 주식회사 이소 HW Engineer",
                  "전 주식회사 카비랩 기술지원팀장",
                ],
              },
              {
                role: "SW/AI Engineer",
                name: "어정호",
                items: [
                  "호서대학교 컴퓨터공학사",
                  "현 주식회사 이소 SW/AI Engineer",
                  "전 주식회사 카비랩 SW/AI Engineer",
                ],
              },
            ].map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="rounded-xl bg-black/75 p-5"
                style={{ border: `1px solid ${pointColor}` }}
              >
                <h4
                  className="mb-4 px-3 py-2 text-lg font-black text-black"
                  style={{ backgroundColor: pointColor }}
                >
                  {member.role} | {member.name}
                </h4>

                <ul className="space-y-1 text-sm leading-6 text-gray-200">
                  {member.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-5xl font-black" style={{ color: pointColor }}>
            Contact
          </h2>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div
              className="overflow-hidden rounded-xl bg-white"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <img src="/MAP.png" alt="EASO location map" className="w-full" />
            </div>

            <div
              className="rounded-xl bg-black/70 p-8 text-lg leading-9 text-gray-100"
              style={{ border: `1px solid ${pointColor}` }}
            >
              <p>서울특별시 서초구 방배중앙로 207-10, 방배아크로리버 104동 지하1층 B107호</p>
              <p className="mt-4">Tel: 010-3115-3758</p>
              <p>Fax: 010-3115-3758</p>
              <p>Contact: dbsehrns@naver.com</p>
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