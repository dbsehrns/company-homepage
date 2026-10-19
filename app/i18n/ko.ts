import type { Dictionary } from "./en";

// Keeps the wording of the Korean site from before the English switch
// (916b7b5) and fills in what the English site added since.
const ko: Dictionary = {
  meta: {
    title: "EASO | Easy Solution",
    description:
      "정밀 정형외과 수술을 위한 AX 전환과 스마트 제조를 이끕니다. 주식회사 이소의 AI 기반 환자 맞춤형 수술 가이드(PSI) 설계 플랫폼과 하이브리드 관절경 캐뉼라.",
  },
  languageLabel: "언어",
  contactButton: "문의하기",
  hero: {
    lines: [
      "Easy Solution을 통해 정밀의료의 미래를 선도합니다.",
      "지능형 AI 시스템이 인간의 역량을 강화하고 불확실성을 제거합니다.",
    ],
  },
  about: {
    paragraphs: [
      "주식회사 이소는 정밀의료의 방식을 재정의하는 지능형 시스템을 구축합니다.",
      "첨단 AI를 통해 복잡하고 수동적인 워크플로우를 자동화된 프로세스로 전환하여 정확성, 일관성, 효율성을 실현합니다.",
    ],
    emphasis: "단순히 프로세스를 개선하는 것이 아닙니다. AI를 통해 프로세스를 재정의합니다.",
  },
  solutions: {
    rtptial: {
      imageAlts: ["RTPtial PSI 1", "RTPtial PSI 2"],
      viewer: {
        label: "RTPtial-PSI 가이드 3D 뷰어",
        models: { humerus: "상완골 PSI", glenoid: "관절와 PSI" },
        loading: "3D 모델을 불러오는 중…",
        hintRotate: "드래그로 회전",
        hintClickZoom: "클릭 후 스크롤로 확대",
        hintScroll: "스크롤로 확대",
        hintPinch: "두 손가락으로 확대",
        tapToExplore: "탭하여 3D로 보기",
        done: "완료",
        bone: "뼈 표시",
        reset: "처음 시점으로",
        expand: "전체 화면",
        collapse: "전체 화면 닫기",
      },
      description:
        "RTPtial-PSI는 인공관절전치환술을 위한 환자 맞춤형 수술 가이드 설계를 자동화하는 3D 프린팅 기반 AI 시스템입니다. 이를 통해 전문의는 일관된 수술 결과를 얻고, 중요한 수술 과정의 위험을 줄일 수 있습니다.",
      features: [
        "레진 또는 금속으로 출력하는 상완골두 절제용 PSI",
        "영상 업로드 후 원클릭 설계, 3분 이내 최종 PSI 완성",
        "0.1° 단위 후염각 자동 설정 및 골수강 진입축 가이드",
        "고정 핀 가이드가 내장된 단순하고 견고한 절삭 가이드",
        "설치 없는 웹 기반: 검토, 출력, 자동 제작까지",
      ],
    },
    arthroSpacer: {
      slideAlts: [
        "ArthroSpacer 하이브리드 캐뉼라 3종 세트",
        "ArthroSpacer 하이브리드 캐뉼라 측면",
        "ArthroSpacer 캐뉼라 세운 모습",
        "ArthroSpacer 캐뉼라 세운 모습 측면",
        "ArthroSpacer 캐뉼라 비스듬한 모습",
        "ArthroSpacer 캐뉼라 눕힌 측면",
        "ArthroSpacer 캐뉼라 멀티 윙 상세",
        "ArthroSpacer 캐뉼라 기구 삽입구 상세",
        "ArthroSpacer 캐뉼라 상세 모음",
      ],
      description:
        "ArthroSpacer는 수술 중 안정적인 고정을 유지하고 체액 누출을 최소화하도록 재설계된 관절경 캐뉼라입니다. 깨끗한 수술 시야를 확보하고 더욱 효율적이고 신뢰할 수 있는 관절경 수술 경험을 제공합니다.",
      features: [
        "링 타이 고정으로 안정적으로 고정되고 빠짐이 적음",
        "멀티 윙 구조로 조직 견인",
        "이중 실링으로 체액 누출 방지",
        "넓은 내강으로 봉합사 엉킴 방지",
        "화살촉형 팁과 최적화된 실리콘 경도로 조직 손상을 줄이며 쉽게 삽입",
      ],
    },
  },
  slider: {
    previous: "이전 이미지",
    next: "다음 이미지",
    show: "{total}장 중 {n}번째 이미지 보기",
  },
  team: {
    intro:
      "의료기기 개발부터 인허가, 임상 검증, 사업화까지 의료기기 전 주기를 이전 회사에서 함께 수행해 온 핵심 멤버와 실무 전문가로 구성된 팀입니다.",
    ceo: {
      role: "CEO",
      name: "Louis Youn",
      items: [
        "가톨릭대학교 의과대학 의공학 박사",
        "현 주식회사 이소 대표이사",
        "현 연세대학교 의과대학 융합의학과 겸임교수",
        "전 주식회사 카비랩 부대표 / 최고기술책임자 / 품질책임자 (엑시트 완료)",
        "전 신한대학교 마이크로디그리대학 기업전문교수",
        "전 싱가포르 Proton Therapy Pte. Ltd. 임상조교수 & 의학물리학자",
        "전 일본 Nagoya Proton Therapy Center 인턴 의학물리학자",
        "전 일본 Kindai University Hospital 파트타임 강사",
        "전 가톨릭대학교 의과대학 연구조교수",
        "전 미국 Stanford University MIPS 연구소 Collaboration Researcher",
        "전 미국 UC DAVIS BMEGG 연구소 Collaboration Researcher",
      ],
    },
    members: {
      coo: {
        role: "부대표/COO",
        name: "김무섭",
        items: [
          "가톨릭대학교 의과대학 의공학 박사",
          "현 주식회사 이소 부대표 / 공장장 / 최고운영책임자",
          "전 주식회사 카비랩 부대표 / 최고운영책임자 (엑시트 완료)",
          "전 연세대학교 의과대학 융합의학과 겸임교수",
          "전 신한대학교 마이크로디그리대학 기업전문교수",
          "전 가톨릭대학교 의과대학 생체의공학연구소 연구원",
          "전 서울성모병원 정형외과 전임연구원",
          "의료기기 연구개발 경력 12년",
          "다수의 SCI 논문 게재 및 특허 등록",
          "정부지원 R&D 사업 연구책임자 자격 수주 다수",
        ],
      },
      cso: {
        role: "CSO",
        name: "김현주",
        items: [
          "연세대학교 의과대학 의료기기산업학 석사",
          "현 주식회사 이소 최고전략책임자",
          "전 주식회사 카비랩 RA/QA 팀장",
          "전 Medical IP RA/QA",
          "RA/QA 경력 10년",
          "의료영상 관련 AI기반 디지털의료제품 사업기획",
          "국내외 시장 진출 전략 및 경영 전략 수립",
          "국내외 의료기기 품목허가 및 제품화 전주기 수행 (국내 1~3등급, FDA / CE MDR)",
          "ISO 13485 및 MDSAP 기반 QMS 구축 및 운영",
          "의료기기 / 디지털의료기기 GMP 인증, 내부 심사 및 시판 후 관리(PMS)",
          "의료기기 임상시험·성능평가 설계 및 통계분석",
        ],
      },
      // The society names here differ from the English profile; kept as the
      // Korean site had them until the CMO confirms which is current.
      cmo: {
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
      qa: {
        role: "QA Engineer",
        name: "이다영",
        items: [
          "서울여자대학교 멀티미디어학사",
          "현 주식회사 이소 QA Engineer",
          "전 주식회사 카비랩 데이터팀장",
          "전 메디컬아이피 Data Science팀 데이터관리자",
          "의료영상 데이터 및 어노테이션",
          "데이터베이스 구축 및 품질 관리",
        ],
      },
      hw: {
        role: "HW Engineer",
        name: "김범수",
        items: [
          "동남보건대학교 보건3D프린팅융합 전문학사",
          "현 주식회사 이소 HW Engineer",
          "전 주식회사 카비랩 기술지원팀장",
          "3D 프린팅 의료기기 설계 및 제작",
          "장비 운영 및 기술 지원",
          "생산 품질 관리",
        ],
      },
      sw: {
        role: "SW/AI Engineer",
        name: "어정호",
        items: [
          "호서대학교 컴퓨터공학사",
          "현 주식회사 이소 SW/AI Engineer",
          "전 주식회사 카비랩 SW/AI Engineer",
          "의료 AI 소프트웨어 개발",
          "IT 시스템 운영",
          "AI 기반 자동 설계 플랫폼",
        ],
      },
      intern: {
        role: "Intern",
        name: "신중훈",
        items: [
          "건국대학교 소프트웨어학과 학사",
          "현 주식회사 이소 인턴",
          "의료 AI 소프트웨어 개발",
          "IT 시스템 운영",
          "AI 기반 자동 설계 플랫폼",
        ],
      },
    },
  },
  contact: {
    officesLabel: "EASO 사업장",
    offices: {
      hq: {
        tab: "본사 · 울산",
        name: "EASO 본사 · 울산대학교 의과대학",
      },
      rnd: {
        tab: "R&D센터 · 서울",
        name: "EASO R&D센터 · 방배아크로리버 104동",
      },
    },
    mapTitlePrefix: "구글 지도: ",
    openInMaps: "Google 지도에서 보기",
    addresses: {
      hq: {
        label: "본사",
        text: "울산광역시 동구 바드래1길 30, 울산대학교 의과대학 301-1호",
      },
      rnd: {
        label: "R&D센터",
        text: "서울특별시 서초구 방배중앙로 207-10, 방배아크로리버 104동 지하1층 B107호",
      },
    },
    lines: [
      "Tel: 070-4077-0601",
      "Mobile: 010-3115-3758",
      "Fax: 070-7507-6666",
      "Email: louis@easo.co.kr",
      "Web: easo.co.kr",
    ],
    careers: {
      heading: "수시 채용",
      lines: [
        "채용 포지션: QA/HW/SW/Data Engineer (의료기기 관련 경력 우대)",
        "담당 업무: 포지션 별로 경력과 능력에 따른 차등 업무 할당",
        "자격 요건: 학력 및 경력 무관",
        "연봉 조건: 협의",
        "근무 조건: 월-금 9:00 - 18:00",
        "전형: 서류 - 1차 면접 - 2차 면접 - 합격",
        "제출 서류: 이력서 및 포트폴리오 (자유 양식)",
        "제출 방법: louis@easo.co.kr 메일 제출",
      ],
    },
  },
};

export default ko;
